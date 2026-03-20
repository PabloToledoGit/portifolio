export interface UnderHoodStep {
  id: string;
  titleKey: string;
  descKey: string;
  code: string;
  lang?: string;
}

export const underHoodSteps: Record<string, UnderHoodStep> = {
  under_hood_init: {
    id: 'init',
    titleKey: 'hood.step_init_title',
    descKey: 'hood.step_init_desc',
    code: `useEffect(() => {
  if (isOpen) {
    setUnderHoodLogs([]);
    runConnectionFlow();
  }
}, [isOpen, runConnectionFlow]);`,
    lang: 'typescript',
  },
  under_hood_backend: {
    id: 'backend',
    titleKey: 'hood.step_backend_title',
    descKey: 'hood.step_backend_desc',
    code: `const res = await fetch(\`\${API_BASE}/api/health\`);
const data = await res.json();
// API_BASE = '' em dev (proxy Vite → :3001)`,
    lang: 'typescript',
  },
  under_hood_openai: {
    id: 'openai',
    titleKey: 'hood.step_openai_title',
    descKey: 'hood.step_openai_desc',
    code: `// server/index.js
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;
// Chave nunca exposta no cliente`,
    lang: 'javascript',
  },
  under_hood_ready: {
    id: 'ready',
    titleKey: 'hood.step_ready_title',
    descKey: 'hood.step_ready_desc',
    code: `// Backend + OpenAI OK
setBackendReady(true);
// Próximas mensagens → POST /api/chat`,
    lang: 'typescript',
  },
  under_hood_fallback: {
    id: 'fallback',
    titleKey: 'hood.step_fallback_title',
    descKey: 'hood.step_fallback_desc',
    code: `// Backend indisponível ou sem API key
setBackendReady(false);
// Usa matchUserMessage() + respostas curadas
// em src/lib/assistantMatch.ts`,
    lang: 'typescript',
  },
  under_hood_sending: {
    id: 'sending',
    titleKey: 'hood.step_sending_title',
    descKey: 'hood.step_sending_desc',
    code: `await fetch(\`\${API_BASE}/api/chat\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: trimmed,
    messages: history.slice(-10)
  }),
});`,
    lang: 'typescript',
  },
  under_hood_processing: {
    id: 'processing',
    titleKey: 'hood.step_processing_title',
    descKey: 'hood.step_processing_desc',
    code: `// server/index.js
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: message }
  ],
  max_tokens: 800,
  temperature: 0.7,
});`,
    lang: 'javascript',
  },
  under_hood_received: {
    id: 'received',
    titleKey: 'hood.step_received_title',
    descKey: 'hood.step_received_desc',
    code: `const content = completion.choices[0]?.message?.content;
res.json({ content, model, usage });
// Frontend: markdownToHtml(content) → render`,
    lang: 'javascript',
  },
  under_hood_error: {
    id: 'error',
    titleKey: 'hood.step_error_title',
    descKey: 'hood.step_error_desc',
    code: `catch (err) {
  setUnderHoodLogs(prev => 
    addLog(prev, 'under_hood_error', 'success')
  );
  // Fallback: getLocalResponse(trimmed)
}`,
    lang: 'typescript',
  },
};
