import { assistantTopics, type AssistantTopicId } from '../data/assistantKnowledge';

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function matchUserMessage(message: string): AssistantTopicId {
  const normalized = normalize(message);
  if (!normalized || normalized.length < 2) return 'fallback';

  let bestMatch: AssistantTopicId = 'fallback';
  let bestScore = 0;

  for (const topic of assistantTopics) {
    const allKeywords = [...topic.keywords, ...topic.keywordsPt];
    let score = 0;
    for (const kw of allKeywords) {
      if (normalized.includes(normalize(kw))) {
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = topic.id;
    }
  }

  return bestMatch;
}

export function getResponseKeys(topicId: AssistantTopicId): { titleKey: string; bodyKey: string } {
  const key = topicId === 'fallback' ? 'fallback' : topicId;
  const titleKey = `assistant.response_${key}_title` as const;
  const bodyKey = `assistant.response_${key}_body` as const;
  return { titleKey, bodyKey };
}
