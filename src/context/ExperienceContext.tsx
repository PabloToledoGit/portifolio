import { createContext, useContext, useCallback, useReducer, useEffect } from 'react';
import {
  INSIGHTS,
  getStageForXp,
  getProgressToNextStage,
  type InsightId,
} from '../data/experienceMilestones';
import { SECTIONS } from '../data/experienceMap';

const STORAGE_V1 = 'pf_gamification_v1';
const STORAGE_V2 = 'pf_experience_v2';

export type ActionType =
  | 'open_assistant'
  | 'assistant_message'
  | 'expand_timeline_phase'
  | 'open_case_study'
  | 'simulate_dashboard'
  | 'visit_timeline'
  | 'visit_projects'
  | 'visit_console'
  | 'discover_hidden';

export interface ExperienceState {
  xp: number;
  unlockedInsights: InsightId[];
  unlockedProjectIds: string[];
  actions: Record<ActionType, number>;
  timelinePhasesVisited: Set<string>;
  toastQueue: { id: string; messageKey: string }[];
}

interface StoredV2 {
  xp: number;
  unlockedInsights: InsightId[];
  unlockedProjectIds: string[];
  actions: Record<ActionType, number>;
  timelinePhasesVisited: string[];
}

interface StoredV1 {
  xp: number;
  badges: string[];
  unlockedProjectIds: string[];
  actions: Record<ActionType, number>;
  timelinePhasesVisited: string[];
}

const BADGE_TO_INSIGHT: Record<string, InsightId> = {
  explorer: 'explorer',
  system_analyst: 'system_analyst',
  backend_detective: 'backend_detective',
  product_mindset: 'product_mindset',
  saas_operator: 'saas_operator',
};

const XP_REWARDS: Partial<Record<ActionType, number>> = {
  open_assistant: 25,
  assistant_message: 5,
  expand_timeline_phase: 15,
  open_case_study: 20,
  simulate_dashboard: 30,
  visit_timeline: 10,
  visit_projects: 10,
  visit_console: 15,
  discover_hidden: 50,
};

const initialState: ExperienceState = {
  xp: 0,
  unlockedInsights: [],
  unlockedProjectIds: [],
  actions: {
    open_assistant: 0,
    assistant_message: 0,
    expand_timeline_phase: 0,
    open_case_study: 0,
    simulate_dashboard: 0,
    visit_timeline: 0,
    visit_projects: 0,
    visit_console: 0,
    discover_hidden: 0,
  },
  timelinePhasesVisited: new Set(),
  toastQueue: [],
};

function migrateFromV1(): ExperienceState {
  try {
    const raw = localStorage.getItem(STORAGE_V1);
    if (!raw) return initialState;
    const parsed: StoredV1 = JSON.parse(raw);
    const insights: InsightId[] = (parsed.badges ?? [])
      .map((b) => BADGE_TO_INSIGHT[b])
      .filter((b): b is InsightId => !!b);
    const unlocked: string[] = [...(parsed.unlockedProjectIds ?? [])];
    if (insights.includes('saas_operator') && !unlocked.includes('secret')) {
      unlocked.push('secret');
    }
    return {
      ...initialState,
      xp: parsed.xp ?? 0,
      unlockedInsights: insights,
      unlockedProjectIds: unlocked,
      actions: parsed.actions ?? initialState.actions,
      timelinePhasesVisited: new Set(parsed.timelinePhasesVisited ?? []),
      toastQueue: [],
    };
  } catch {
    return initialState;
  }
}

function loadState(): ExperienceState {
  try {
    const rawV2 = localStorage.getItem(STORAGE_V2);
    if (rawV2) {
      const parsed: StoredV2 = JSON.parse(rawV2);
      return {
        ...initialState,
        ...parsed,
        timelinePhasesVisited: new Set(parsed.timelinePhasesVisited ?? []),
        toastQueue: [],
      };
    }
    const migrated = migrateFromV1();
    saveState(migrated);
    return migrated;
  } catch {
    return initialState;
  }
}

function saveState(state: ExperienceState) {
  try {
    const toStore: StoredV2 = {
      xp: state.xp,
      unlockedInsights: state.unlockedInsights,
      unlockedProjectIds: state.unlockedProjectIds,
      actions: state.actions,
      timelinePhasesVisited: Array.from(state.timelinePhasesVisited),
    };
    localStorage.setItem(STORAGE_V2, JSON.stringify(toStore));
  } catch {
    // ignore
  }
}

type ExperienceAction =
  | { type: 'TRACK_INTERACTION'; payload: { action: ActionType; phaseId?: string } }
  | { type: 'UNLOCK_PROJECT'; payload: string }
  | { type: 'DISMISS_TOAST'; payload: string }
  | { type: 'RESET' };

function reducer(state: ExperienceState, action: ExperienceAction): ExperienceState {
  switch (action.type) {
    case 'TRACK_INTERACTION': {
      const { action: actionType, phaseId } = action.payload;
      const newActions = { ...state.actions, [actionType]: state.actions[actionType] + 1 };
      let newXp = state.xp;
      const cap = actionType === 'assistant_message' ? 50 : Infinity;
      if (newActions[actionType] <= cap && XP_REWARDS[actionType]) {
        newXp += XP_REWARDS[actionType] as number;
      }

      const newPhases = new Set(state.timelinePhasesVisited);
      if (phaseId) newPhases.add(phaseId);

      const candidateState: ExperienceState = {
        ...state,
        xp: newXp,
        actions: newActions,
        timelinePhasesVisited: newPhases,
      };

      const conditionState = {
        actions: newActions,
        timelinePhasesVisited: newPhases,
        unlockedInsights: state.unlockedInsights,
      };

      let newInsights = [...state.unlockedInsights];
      let newUnlocked = [...state.unlockedProjectIds];
      const newToasts: { id: string; messageKey: string }[] = [...state.toastQueue];

      for (const insight of INSIGHTS) {
        if (insight.condition(conditionState)) {
          newInsights = [...newInsights, insight.id];
          conditionState.unlockedInsights = newInsights;
          newToasts.push({ id: `toast_${insight.id}_${Date.now()}`, messageKey: insight.toastKey });
          if (insight.unlocksSecret && !newUnlocked.includes('secret')) {
            newUnlocked = [...newUnlocked, 'secret'];
          }
        }
      }

      const next: ExperienceState = {
        ...candidateState,
        unlockedInsights: newInsights,
        unlockedProjectIds: newUnlocked,
        toastQueue: newToasts,
      };
      saveState({ ...next, toastQueue: [] });
      return next;
    }
    case 'UNLOCK_PROJECT': {
      const next = {
        ...state,
        unlockedProjectIds: state.unlockedProjectIds.includes(action.payload)
          ? state.unlockedProjectIds
          : [...state.unlockedProjectIds, action.payload],
      };
      saveState({ ...next, toastQueue: [] });
      return next;
    }
    case 'DISMISS_TOAST': {
      return {
        ...state,
        toastQueue: state.toastQueue.filter((t) => t.id !== action.payload),
      };
    }
    case 'RESET':
      saveState(initialState);
      return initialState;
    default:
      return state;
  }
}

export interface ExperienceContextValue {
  state: ExperienceState;
  trackInteraction: (action: ActionType, phaseId?: string) => void;
  unlockProject: (projectId: string) => void;
  dismissToast: (id: string) => void;
  reset: () => void;
  stage: ReturnType<typeof getStageForXp>;
  progressToNext: number;
  sections: typeof SECTIONS;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => loadState());

  useEffect(() => {
    saveState({ ...state, toastQueue: [] });
  }, [state.xp, state.unlockedInsights, state.unlockedProjectIds, state.actions, state.timelinePhasesVisited]);

  const trackInteraction = useCallback((action: ActionType, phaseId?: string) => {
    dispatch({ type: 'TRACK_INTERACTION', payload: { action, phaseId } });
  }, []);

  const unlockProject = useCallback((projectId: string) => {
    dispatch({ type: 'UNLOCK_PROJECT', payload: projectId });
  }, []);

  const dismissToast = useCallback((id: string) => {
    dispatch({ type: 'DISMISS_TOAST', payload: id });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const stage = getStageForXp(state.xp);
  const progressToNext = getProgressToNextStage(state.xp);

  return (
    <ExperienceContext.Provider
      value={{
        state,
        trackInteraction,
        unlockProject,
        dismissToast,
        reset,
        stage,
        progressToNext,
        sections: SECTIONS,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error('useExperience must be used within ExperienceProvider');
  return ctx;
}
