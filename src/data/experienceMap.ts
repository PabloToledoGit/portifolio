/**
 * Portfolio sections for the exploration map.
 * visited is derived from actions / state.
 */

export type SectionId = 'trajectory' | 'projects' | 'console' | 'guide';

export interface Section {
  id: SectionId;
  labelKey: string;
  /** Returns true when section is considered explored */
  isVisited: (state: { actions: Record<string, number> }) => boolean;
}

export const SECTIONS: Section[] = [
  {
    id: 'trajectory',
    labelKey: 'exploration.section.trajectory',
    isVisited: (s) => (s.actions.visit_timeline ?? 0) >= 1,
  },
  {
    id: 'projects',
    labelKey: 'exploration.section.projects',
    isVisited: (s) => (s.actions.visit_projects ?? 0) >= 1,
  },
  {
    id: 'console',
    labelKey: 'exploration.section.console',
    isVisited: (s) => (s.actions.visit_console ?? 0) >= 1,
  },
  {
    id: 'guide',
    labelKey: 'exploration.section.guide',
    isVisited: (s) => (s.actions.open_assistant ?? 0) >= 1,
  },
];
