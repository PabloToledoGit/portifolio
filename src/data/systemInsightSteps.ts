/**
 * System Insight — operational flow steps with product-grade terminology.
 * Presents the runtime as a curated architecture narrative, not raw logs.
 */

export type RuntimeStatus = 'idle' | 'checking' | 'ready' | 'curated' | 'unavailable' | 'processing' | 'completed';

export interface SystemInsightStep {
  id: string;
  key: string;
  statusLabelKey: string;
  descKey: string;
  code?: string;
  lang?: string;
}

export const systemInsightSteps: Record<string, SystemInsightStep> = {
  guide_runtime_init: {
    id: 'init',
    key: 'guide_runtime_init',
    statusLabelKey: 'guide.runtime.init',
    descKey: 'guide.runtime.init_desc',
    code: `useEffect(() => {
  if (isOpen) {
    runConnectionFlow();
  }
}, [isOpen]);`,
    lang: 'typescript',
  },
  guide_runtime_backend: {
    id: 'backend',
    key: 'guide_runtime_backend',
    statusLabelKey: 'guide.runtime.backend',
    descKey: 'guide.runtime.backend_desc',
    code: `const res = await fetch('/api/health');
const data = await res.json();`,
    lang: 'typescript',
  },
  guide_runtime_validation: {
    id: 'validation',
    key: 'guide_runtime_validation',
    statusLabelKey: 'guide.runtime.validation',
    descKey: 'guide.runtime.validation_desc',
    code: `// Server-side only
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;`,
    lang: 'javascript',
  },
  guide_runtime_ready: {
    id: 'ready',
    key: 'guide_runtime_ready',
    statusLabelKey: 'guide.runtime.ready',
    descKey: 'guide.runtime.ready_desc',
    code: `setRuntimeMode('live');
// Messages → POST /api/chat`,
    lang: 'typescript',
  },
  guide_runtime_curated: {
    id: 'curated',
    key: 'guide_runtime_curated',
    statusLabelKey: 'guide.runtime.curated',
    descKey: 'guide.runtime.curated_desc',
    code: `setRuntimeMode('curated');
// Curated portfolio intelligence
// matchUserMessage() + guideTopics`,
    lang: 'typescript',
  },
  guide_runtime_sending: {
    id: 'sending',
    key: 'guide_runtime_sending',
    statusLabelKey: 'guide.runtime.sending',
    descKey: 'guide.runtime.sending_desc',
    code: `await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message, history }),
});`,
    lang: 'typescript',
  },
  guide_runtime_processing: {
    id: 'processing',
    key: 'guide_runtime_processing',
    statusLabelKey: 'guide.runtime.processing',
    descKey: 'guide.runtime.processing_desc',
    code: `const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [...history, { role: 'user', content }],
});`,
    lang: 'javascript',
  },
  guide_runtime_completed: {
    id: 'completed',
    key: 'guide_runtime_completed',
    statusLabelKey: 'guide.runtime.completed',
    descKey: 'guide.runtime.completed_desc',
    code: `res.json({ content });
// markdownToHtml(content) → render`,
    lang: 'javascript',
  },
  guide_runtime_fallback: {
    id: 'fallback',
    key: 'guide_runtime_fallback',
    statusLabelKey: 'guide.runtime.fallback',
    descKey: 'guide.runtime.fallback_desc',
    code: `// Curated response
getLocalResponse(trimmed);`,
    lang: 'typescript',
  },
};
