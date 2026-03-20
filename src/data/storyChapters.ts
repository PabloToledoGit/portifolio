/**
 * Story chapters — narrative model for the trajectory section.
 * Each chapter represents a professional milestone with editorial structure.
 */

export type ChapterPhaseType =
  | 'exposure'
  | 'operations'
  | 'systems'
  | 'automation'
  | 'fullstack'
  | 'saas'
  | 'backend'
  | 'ai'
  | 'ecosystem'
  | 'product'
  | 'professional';

export interface StoryChapter {
  id: string;
  index: number;
  period: string;
  periodKey?: string;
  phaseType: ChapterPhaseType;
  titleKey: string;
  summaryKey: string;
  contextKey: string;
  challengeKey: string;
  evolutionKey: string;
  insightKey?: string;
  tech: string[];
  milestoneRef?: string;
}

export const storyChapters: StoryChapter[] = [
  {
    id: 'origins',
    index: 0,
    period: '~2015',
    phaseType: 'exposure',
    titleKey: 'story.phase_origins.title',
    summaryKey: 'story.phase_origins.summary',
    contextKey: 'story.phase_origins.context',
    challengeKey: 'story.phase_origins.challenge',
    evolutionKey: 'story.phase_origins.evolution',
    insightKey: 'story.phase_origins.insight',
    tech: ['HTML', 'CSS'],
  },
  {
    id: 'admin',
    index: 1,
    period: '2023',
    phaseType: 'operations',
    titleKey: 'story.phase_admin.title',
    summaryKey: 'story.phase_admin.summary',
    contextKey: 'story.phase_admin.context',
    challengeKey: 'story.phase_admin.challenge',
    evolutionKey: 'story.phase_admin.evolution',
    insightKey: 'story.phase_admin.insight',
    tech: ['Office Suite', 'Excel', 'System support'],
    milestoneRef: 'experience.sarton',
  },
  {
    id: 'internal_systems',
    index: 2,
    period: '2023',
    phaseType: 'systems',
    titleKey: 'story.phase_internal_systems.title',
    summaryKey: 'story.phase_internal_systems.summary',
    contextKey: 'story.phase_internal_systems.context',
    challengeKey: 'story.phase_internal_systems.challenge',
    evolutionKey: 'story.phase_internal_systems.evolution',
    insightKey: 'story.phase_internal_systems.insight',
    tech: ['PHP', 'MySQL'],
  },
  {
    id: 'automation',
    index: 3,
    period: '2023',
    phaseType: 'automation',
    titleKey: 'story.phase_automation.title',
    summaryKey: 'story.phase_automation.summary',
    contextKey: 'story.phase_automation.context',
    challengeKey: 'story.phase_automation.challenge',
    evolutionKey: 'story.phase_automation.evolution',
    insightKey: 'story.phase_automation.insight',
    tech: ['Google Forms', 'Google Sheets'],
    milestoneRef: 'experience.sarton',
  },
  {
    id: 'fullstack',
    index: 4,
    period: '2023–2024',
    phaseType: 'fullstack',
    titleKey: 'story.phase_fullstack.title',
    summaryKey: 'story.phase_fullstack.summary',
    contextKey: 'story.phase_fullstack.context',
    challengeKey: 'story.phase_fullstack.challenge',
    evolutionKey: 'story.phase_fullstack.evolution',
    insightKey: 'story.phase_fullstack.insight',
    tech: ['JavaScript', 'Node.js', 'Firebase', 'APIs'],
  },
  {
    id: 'saas',
    index: 5,
    period: '2024',
    phaseType: 'saas',
    titleKey: 'story.phase_saas.title',
    summaryKey: 'story.phase_saas.summary',
    contextKey: 'story.phase_saas.context',
    challengeKey: 'story.phase_saas.challenge',
    evolutionKey: 'story.phase_saas.evolution',
    insightKey: 'story.phase_saas.insight',
    tech: ['Node.js', 'Firebase', 'Tailwind', 'Stripe', 'Mercado Pago', 'Vercel'],
    milestoneRef: 'experience.nutrify',
  },
  {
    id: 'webhooks',
    index: 6,
    period: '2024',
    phaseType: 'backend',
    titleKey: 'story.phase_webhooks.title',
    summaryKey: 'story.phase_webhooks.summary',
    contextKey: 'story.phase_webhooks.context',
    challengeKey: 'story.phase_webhooks.challenge',
    evolutionKey: 'story.phase_webhooks.evolution',
    insightKey: 'story.phase_webhooks.insight',
    tech: ['Webhooks', 'APIs', 'Firebase', 'Serverless'],
    milestoneRef: 'experience.nutrify',
  },
  {
    id: 'ai',
    index: 7,
    period: '2024',
    phaseType: 'ai',
    titleKey: 'story.phase_ai.title',
    summaryKey: 'story.phase_ai.summary',
    contextKey: 'story.phase_ai.context',
    challengeKey: 'story.phase_ai.challenge',
    evolutionKey: 'story.phase_ai.evolution',
    insightKey: 'story.phase_ai.insight',
    tech: ['OpenAI API', 'Prompt engineering'],
    milestoneRef: 'experience.nutrify',
  },
  {
    id: 'complex',
    index: 8,
    period: '2025',
    phaseType: 'ecosystem',
    titleKey: 'story.phase_complex.title',
    summaryKey: 'story.phase_complex.summary',
    contextKey: 'story.phase_complex.context',
    challengeKey: 'story.phase_complex.challenge',
    evolutionKey: 'story.phase_complex.evolution',
    insightKey: 'story.phase_complex.insight',
    tech: ['React', 'Node.js', 'Firebase', 'Automation tools'],
  },
  {
    id: 'product',
    index: 9,
    period: '2025',
    phaseType: 'product',
    titleKey: 'story.phase_product.title',
    summaryKey: 'story.phase_product.summary',
    contextKey: 'story.phase_product.context',
    challengeKey: 'story.phase_product.challenge',
    evolutionKey: 'story.phase_product.evolution',
    insightKey: 'story.phase_product.insight',
    tech: ['Fullstack', 'Payments', 'Analytics', 'Automation'],
  },
  {
    id: 'junior_dev',
    index: 10,
    period: '2026',
    periodKey: 'story.phase_junior_dev.period',
    phaseType: 'professional',
    titleKey: 'story.phase_junior_dev.title',
    summaryKey: 'story.phase_junior_dev.summary',
    contextKey: 'story.phase_junior_dev.context',
    challengeKey: 'story.phase_junior_dev.challenge',
    evolutionKey: 'story.phase_junior_dev.evolution',
    insightKey: 'story.phase_junior_dev.insight',
    tech: ['React', 'Node.js', 'Firebase', 'Flutter', 'APIs'],
    milestoneRef: 'experience.sels_jr',
  },
];

export const TOTAL_CHAPTERS = storyChapters.length;
