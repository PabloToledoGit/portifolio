export type AssistantTopicId =
  | 'projects_main'
  | 'stack'
  | 'nutrify'
  | 'sigbl'
  | 'backend_experience'
  | 'business_results'
  | 'strongest_area'
  | 'portfolio_different'
  | 'dashboard_explain'
  | 'fallback';

export interface AssistantTopic {
  id: AssistantTopicId;
  keywords: string[];
  keywordsPt: string[];
}

export const assistantTopics: AssistantTopic[] = [
  {
    id: 'projects_main',
    keywords: ['projects', 'main', 'show', 'built', 'work', 'portfolio'],
    keywordsPt: ['projetos', 'principais', 'mostrar', 'construiu', 'trabalhos', 'portfólio'],
  },
  {
    id: 'stack',
    keywords: ['stack', 'technologies', 'tech', 'tools', 'use', 'skills'],
    keywordsPt: ['stack', 'tecnologias', 'ferramentas', 'usa', 'habilidades'],
  },
  {
    id: 'nutrify',
    keywords: ['nutrify', 'explain', 'tell', 'about', 'product'],
    keywordsPt: ['nutrify', 'explicar', 'conte', 'sobre', 'produto'],
  },
  {
    id: 'sigbl',
    keywords: [
      'sigbl',
      'milk bank',
      'human milk',
      'donor',
      'healthcare',
      'volta redonda',
      'institutional',
    ],
    keywordsPt: [
      'sigbl',
      'banco de leite',
      'leite humano',
      'doadora',
      'doador',
      'volta redonda',
      'institucional',
    ],
  },
  {
    id: 'backend_experience',
    keywords: ['backend', 'systems', 'api', 'server', 'architecture'],
    keywordsPt: ['backend', 'sistemas', 'api', 'servidor', 'arquitetura'],
  },
  {
    id: 'business_results',
    keywords: ['business', 'results', 'revenue', 'faturamento', 'impact', 'value'],
    keywordsPt: ['negócio', 'resultados', 'faturamento', 'impacto', 'valor'],
  },
  {
    id: 'strongest_area',
    keywords: ['strongest', 'best', 'strong', 'area', 'expertise', 'forte'],
    keywordsPt: ['forte', 'melhor', 'área', 'expertise', 'destaque'],
  },
  {
    id: 'portfolio_different',
    keywords: ['different', 'unique', 'diferente', 'portfolio', 'destaque'],
    keywordsPt: ['diferente', 'único', 'portfólio', 'destaque'],
  },
  {
    id: 'dashboard_explain',
    keywords: ['dashboard', 'console', 'panel', 'simulation', 'simulação'],
    keywordsPt: ['dashboard', 'console', 'painel', 'simulação'],
  },
];
