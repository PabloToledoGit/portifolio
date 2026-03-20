/**
 * Experience milestones: stages and insights.
 * XP logic preserved internally; UI shows stages and insights only.
 *
 * Stage thresholds (calibrated from legacy XP):
 * - Stage 0: 0–199
 * - Stage 1: 200–399
 * - Stage 2: 400–599
 * - Stage 3: 600+
 */

export type InsightId =
  | 'explorer'
  | 'system_analyst'
  | 'backend_detective'
  | 'product_mindset'
  | 'saas_operator';

export interface ExperienceStateForConditions {
  actions: Record<string, number>;
  timelinePhasesVisited: Set<string>;
  unlockedInsights: InsightId[];
}

export interface Stage {
  index: number;
  labelKey: string;
  /** XP threshold (inclusive) to reach this stage */
  xpThreshold: number;
}

export const STAGES: Stage[] = [
  { index: 0, labelKey: 'exploration.stage.initial', xpThreshold: 0 },
  { index: 1, labelKey: 'exploration.stage.awareness', xpThreshold: 200 },
  { index: 2, labelKey: 'exploration.stage.understanding', xpThreshold: 400 },
  { index: 3, labelKey: 'exploration.stage.full_context', xpThreshold: 600 },
];

export interface Insight {
  id: InsightId;
  titleKey: string;
  descriptionKey: string;
  whyKey: string;
  toastKey: string;
  /** Returns true when this insight should be unlocked */
  condition: (state: ExperienceStateForConditions) => boolean;
  /** When true, also unlocks project 'secret' */
  unlocksSecret?: boolean;
}

const allPhases = 11;

export const INSIGHTS: Insight[] = [
  {
    id: 'explorer',
    titleKey: 'exploration.insight.explorer.title',
    descriptionKey: 'exploration.insight.explorer.description',
    whyKey: 'exploration.insight.explorer.why',
    toastKey: 'exploration.toast.trajectory_complete',
    condition: (s) => s.timelinePhasesVisited.size >= allPhases && !s.unlockedInsights.includes('explorer'),
  },
  {
    id: 'system_analyst',
    titleKey: 'exploration.insight.system_analyst.title',
    descriptionKey: 'exploration.insight.system_analyst.description',
    whyKey: 'exploration.insight.system_analyst.why',
    toastKey: 'exploration.toast.system_flow_understood',
    condition: (s) => (s.actions.open_case_study ?? 0) >= 1 && !s.unlockedInsights.includes('system_analyst'),
  },
  {
    id: 'backend_detective',
    titleKey: 'exploration.insight.backend_detective.title',
    descriptionKey: 'exploration.insight.backend_detective.description',
    whyKey: 'exploration.insight.backend_detective.why',
    toastKey: 'exploration.toast.event_pipeline_observed',
    condition: (s) => (s.actions.simulate_dashboard ?? 0) >= 1 && !s.unlockedInsights.includes('backend_detective'),
  },
  {
    id: 'product_mindset',
    titleKey: 'exploration.insight.product_mindset.title',
    descriptionKey: 'exploration.insight.product_mindset.description',
    whyKey: 'exploration.insight.product_mindset.why',
    toastKey: 'exploration.toast.product_logic_recognized',
    condition: (s) => (s.actions.assistant_message ?? 0) >= 3 && !s.unlockedInsights.includes('product_mindset'),
  },
  {
    id: 'saas_operator',
    titleKey: 'exploration.insight.saas_operator.title',
    descriptionKey: 'exploration.insight.saas_operator.description',
    whyKey: 'exploration.insight.saas_operator.why',
    toastKey: 'exploration.toast.full_system_interaction',
    unlocksSecret: true,
    condition: (s) =>
      (s.actions.simulate_dashboard ?? 0) >= 1 &&
      (s.actions.open_case_study ?? 0) >= 2 &&
      !s.unlockedInsights.includes('saas_operator'),
  },
];

export function getStageForXp(xp: number): Stage {
  let stage = STAGES[0];
  for (const s of STAGES) {
    if (xp >= s.xpThreshold) stage = s;
  }
  return stage;
}

export function getProgressToNextStage(xp: number): number {
  const current = getStageForXp(xp);
  const next = STAGES.find((s) => s.index === current.index + 1);
  if (!next) return 1;
  const range = next.xpThreshold - current.xpThreshold;
  const progress = xp - current.xpThreshold;
  return Math.min(1, Math.max(0, progress / range));
}
