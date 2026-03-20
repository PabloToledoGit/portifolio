/**
 * Guide topics — extends assistant knowledge with cluster mapping.
 * Used for matching user input and organizing responses.
 */

export type GuideTopicId =
  | 'projects_main'
  | 'stack'
  | 'nutrify'
  | 'backend_experience'
  | 'business_results'
  | 'strongest_area'
  | 'portfolio_different'
  | 'dashboard_explain'
  | 'current_role'
  | 'mobile_experience'
  | 'fallback';

export interface GuideTopic {
  id: GuideTopicId;
  keywords: string[];
  keywordsPt: string[];
  responseTitleKey: string;
  responseBodyKey: string;
}

export const guideTopics: GuideTopic[] = [
  {
    id: 'projects_main',
    keywords: ['projects', 'main', 'show', 'built', 'work', 'portfolio'],
    keywordsPt: ['projetos', 'principais', 'mostrar', 'construiu', 'trabalhos', 'portfólio'],
    responseTitleKey: 'assistant.response_projects_main_title',
    responseBodyKey: 'assistant.response_projects_main_body',
  },
  {
    id: 'stack',
    keywords: ['stack', 'technologies', 'tech', 'tools', 'use', 'skills'],
    keywordsPt: ['stack', 'tecnologias', 'ferramentas', 'usa', 'habilidades'],
    responseTitleKey: 'assistant.response_stack_title',
    responseBodyKey: 'assistant.response_stack_body',
  },
  {
    id: 'nutrify',
    keywords: ['nutrify', 'explain', 'tell', 'about', 'product'],
    keywordsPt: ['nutrify', 'explicar', 'conte', 'sobre', 'produto'],
    responseTitleKey: 'assistant.response_nutrify_title',
    responseBodyKey: 'assistant.response_nutrify_body',
  },
  {
    id: 'backend_experience',
    keywords: ['backend', 'systems', 'api', 'server', 'architecture'],
    keywordsPt: ['backend', 'sistemas', 'api', 'servidor', 'arquitetura'],
    responseTitleKey: 'assistant.response_backend_experience_title',
    responseBodyKey: 'assistant.response_backend_experience_body',
  },
  {
    id: 'business_results',
    keywords: ['business', 'results', 'revenue', 'faturamento', 'impact', 'value'],
    keywordsPt: ['negócio', 'resultados', 'faturamento', 'impacto', 'valor'],
    responseTitleKey: 'assistant.response_business_results_title',
    responseBodyKey: 'assistant.response_business_results_body',
  },
  {
    id: 'strongest_area',
    keywords: ['strongest', 'best', 'strong', 'area', 'expertise', 'forte'],
    keywordsPt: ['forte', 'melhor', 'área', 'expertise', 'destaque'],
    responseTitleKey: 'assistant.response_strongest_area_title',
    responseBodyKey: 'assistant.response_strongest_area_body',
  },
  {
    id: 'portfolio_different',
    keywords: ['different', 'unique', 'diferente', 'portfolio', 'destaque'],
    keywordsPt: ['diferente', 'único', 'portfólio', 'destaque'],
    responseTitleKey: 'assistant.response_portfolio_different_title',
    responseBodyKey: 'assistant.response_portfolio_different_body',
  },
  {
    id: 'dashboard_explain',
    keywords: ['dashboard', 'console', 'panel', 'simulation', 'simulação'],
    keywordsPt: ['dashboard', 'console', 'painel', 'simulação'],
    responseTitleKey: 'assistant.response_dashboard_explain_title',
    responseBodyKey: 'assistant.response_dashboard_explain_body',
  },
  {
    id: 'current_role',
    keywords: ['current', 'role', 'job', 'position', 'cargo', 'atual'],
    keywordsPt: ['cargo', 'atual', 'função', 'posição', 'trabalho'],
    responseTitleKey: 'guide.response_current_role_title',
    responseBodyKey: 'guide.response_current_role_body',
  },
  {
    id: 'mobile_experience',
    keywords: ['mobile', 'flutter', 'app', 'aplicativo'],
    keywordsPt: ['mobile', 'flutter', 'app', 'aplicativo'],
    responseTitleKey: 'guide.response_mobile_title',
    responseBodyKey: 'guide.response_mobile_body',
  },
  {
    id: 'fallback',
    keywords: [],
    keywordsPt: [],
    responseTitleKey: 'assistant.response_fallback_title',
    responseBodyKey: 'assistant.response_fallback_body',
  },
];
