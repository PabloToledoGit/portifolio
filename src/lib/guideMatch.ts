import { guideTopics, type GuideTopicId } from '../data/guideTopics';

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function matchUserMessage(message: string): GuideTopicId {
  const normalized = normalize(message);
  if (!normalized || normalized.length < 2) return 'fallback';

  let bestMatch: GuideTopicId = 'fallback';
  let bestScore = 0;

  for (const topic of guideTopics) {
    if (topic.id === 'fallback') continue;
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

export function getResponseKeys(topicId: GuideTopicId): { titleKey: string; bodyKey: string } {
  const topic = guideTopics.find((t) => t.id === topicId);
  if (topic) {
    return { titleKey: topic.responseTitleKey, bodyKey: topic.responseBodyKey };
  }
  return {
    titleKey: 'assistant.response_fallback_title',
    bodyKey: 'assistant.response_fallback_body',
  };
}
