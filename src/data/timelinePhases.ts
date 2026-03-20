export interface TimelinePhase {
  id: string;
  yearLabel: string;
  yearLabelKey?: string;
  titleKey: string;
  summaryKey: string;
  detailContextKey: string;
  detailChallengeKey: string;
  detailEvolutionKey: string;
  tech: string[];
  milestoneRef?: string;
}

export const timelinePhases: TimelinePhase[] = [
  {
    id: 'origins',
    yearLabel: '~2015',
    titleKey: 'timeline.phase_origins.title',
    summaryKey: 'timeline.phase_origins.summary',
    detailContextKey: 'timeline.phase_origins.context',
    detailChallengeKey: 'timeline.phase_origins.challenge',
    detailEvolutionKey: 'timeline.phase_origins.evolution',
    tech: ['HTML', 'CSS'],
  },
  {
    id: 'admin',
    yearLabel: '2023',
    titleKey: 'timeline.phase_admin.title',
    summaryKey: 'timeline.phase_admin.summary',
    detailContextKey: 'timeline.phase_admin.context',
    detailChallengeKey: 'timeline.phase_admin.challenge',
    detailEvolutionKey: 'timeline.phase_admin.evolution',
    tech: ['Office Suite', 'Excel', 'System support'],
    milestoneRef: 'experience.sarton',
  },
  {
    id: 'internal_systems',
    yearLabel: '2023',
    titleKey: 'timeline.phase_internal_systems.title',
    summaryKey: 'timeline.phase_internal_systems.summary',
    detailContextKey: 'timeline.phase_internal_systems.context',
    detailChallengeKey: 'timeline.phase_internal_systems.challenge',
    detailEvolutionKey: 'timeline.phase_internal_systems.evolution',
    tech: ['PHP', 'MySQL'],
  },
  {
    id: 'automation',
    yearLabel: '2023',
    titleKey: 'timeline.phase_automation.title',
    summaryKey: 'timeline.phase_automation.summary',
    detailContextKey: 'timeline.phase_automation.context',
    detailChallengeKey: 'timeline.phase_automation.challenge',
    detailEvolutionKey: 'timeline.phase_automation.evolution',
    tech: ['Google Forms', 'Google Sheets'],
    milestoneRef: 'experience.sarton',
  },
  {
    id: 'fullstack',
    yearLabel: '2023-2024',
    titleKey: 'timeline.phase_fullstack.title',
    summaryKey: 'timeline.phase_fullstack.summary',
    detailContextKey: 'timeline.phase_fullstack.context',
    detailChallengeKey: 'timeline.phase_fullstack.challenge',
    detailEvolutionKey: 'timeline.phase_fullstack.evolution',
    tech: ['JavaScript', 'Node.js', 'Firebase', 'APIs'],
  },
  {
    id: 'saas',
    yearLabel: '2024',
    titleKey: 'timeline.phase_saas.title',
    summaryKey: 'timeline.phase_saas.summary',
    detailContextKey: 'timeline.phase_saas.context',
    detailChallengeKey: 'timeline.phase_saas.challenge',
    detailEvolutionKey: 'timeline.phase_saas.evolution',
    tech: ['Node.js', 'Firebase', 'Tailwind', 'Stripe', 'Mercado Pago', 'Vercel'],
    milestoneRef: 'experience.nutrify',
  },
  {
    id: 'webhooks',
    yearLabel: '2024',
    titleKey: 'timeline.phase_webhooks.title',
    summaryKey: 'timeline.phase_webhooks.summary',
    detailContextKey: 'timeline.phase_webhooks.context',
    detailChallengeKey: 'timeline.phase_webhooks.challenge',
    detailEvolutionKey: 'timeline.phase_webhooks.evolution',
    tech: ['Webhooks', 'APIs', 'Firebase', 'Serverless'],
    milestoneRef: 'experience.nutrify',
  },
  {
    id: 'ai',
    yearLabel: '2024',
    titleKey: 'timeline.phase_ai.title',
    summaryKey: 'timeline.phase_ai.summary',
    detailContextKey: 'timeline.phase_ai.context',
    detailChallengeKey: 'timeline.phase_ai.challenge',
    detailEvolutionKey: 'timeline.phase_ai.evolution',
    tech: ['OpenAI API', 'Prompt engineering'],
    milestoneRef: 'experience.nutrify',
  },
  {
    id: 'complex',
    yearLabel: '2025',
    titleKey: 'timeline.phase_complex.title',
    summaryKey: 'timeline.phase_complex.summary',
    detailContextKey: 'timeline.phase_complex.context',
    detailChallengeKey: 'timeline.phase_complex.challenge',
    detailEvolutionKey: 'timeline.phase_complex.evolution',
    tech: ['React', 'Node.js', 'Firebase', 'Automation tools'],
  },
  {
    id: 'product',
    yearLabel: '2025',
    titleKey: 'timeline.phase_product.title',
    summaryKey: 'timeline.phase_product.summary',
    detailContextKey: 'timeline.phase_product.context',
    detailChallengeKey: 'timeline.phase_product.challenge',
    detailEvolutionKey: 'timeline.phase_product.evolution',
    tech: ['Fullstack', 'Payments', 'Analytics', 'Automation'],
  },
  {
    id: 'junior_dev',
    yearLabel: '2026',
    yearLabelKey: 'timeline.phase_junior_dev.year',
    titleKey: 'timeline.phase_junior_dev.title',
    summaryKey: 'timeline.phase_junior_dev.summary',
    detailContextKey: 'timeline.phase_junior_dev.context',
    detailChallengeKey: 'timeline.phase_junior_dev.challenge',
    detailEvolutionKey: 'timeline.phase_junior_dev.evolution',
    tech: ['React', 'Node.js', 'Firebase', 'Flutter', 'APIs'],
    milestoneRef: 'experience.sels_jr',
  },
];
