/**
 * Prompt clusters for the Portfolio Guide.
 * Organized by recruiter-oriented categories.
 */

export type PromptClusterId = 'explore_work' | 'technical_depth' | 'current_role';

export interface PromptCluster {
  id: PromptClusterId;
  labelKey: string;
  prompts: string[];
}

export const guidePromptClusters: PromptCluster[] = [
  {
    id: 'explore_work',
    labelKey: 'guide.cluster.explore_work',
    prompts: [
      'guide.prompt.projects_main',
      'guide.prompt.nutrify',
      'guide.prompt.saas_systems',
    ],
  },
  {
    id: 'technical_depth',
    labelKey: 'guide.cluster.technical_depth',
    prompts: [
      'guide.prompt.stack',
      'guide.prompt.backend',
      'guide.prompt.dashboard',
    ],
  },
  {
    id: 'current_role',
    labelKey: 'guide.cluster.current_role',
    prompts: [
      'guide.prompt.current_role',
      'guide.prompt.mobile',
      'guide.prompt.building_now',
    ],
  },
];
