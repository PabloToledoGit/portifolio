import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKeys } from '../../i18n/translations';
import { useExperience } from '../../context/ExperienceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { matchUserMessage, getResponseKeys } from '../../lib/assistantMatch';
import { markdownToHtml } from '../../lib/markdown';
import { underHoodSteps } from '../../data/underHoodSteps';
import type { AssistantTopicId } from '../../data/assistantKnowledge';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  topicId?: AssistantTopicId;
}

interface UnderHoodLog {
  id: string;
  key: string;
  status: 'pending' | 'success' | 'error';
  ts: number;
}

interface AssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_PROMPTS = [
  'assistant.suggested_1',
  'assistant.suggested_2',
  'assistant.suggested_3',
  'assistant.suggested_4',
  'assistant.suggested_5',
] as const;

const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || '');

function addLog(logs: UnderHoodLog[], key: string, status: UnderHoodLog['status']): UnderHoodLog[] {
  return [...logs, { id: `log_${Date.now()}`, key, status, ts: Date.now() }];
}

export function AssistantDrawer({ isOpen, onClose }: AssistantDrawerProps) {
  const { t } = useLanguage();
  const { trackInteraction } = useExperience();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [underHoodLogs, setUnderHoodLogs] = useState<UnderHoodLog[]>([]);
  const [backendReady, setBackendReady] = useState<boolean | null>(null);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hoodRef = useRef<HTMLDivElement>(null);
  const hasRecordedOpen = useRef(false);

  const runConnectionFlow = useCallback(async () => {
    setUnderHoodLogs((prev) => addLog(prev, 'under_hood_init', 'pending'));

    await new Promise((r) => setTimeout(r, 300));
    setUnderHoodLogs((prev) => {
      const next = addLog(prev, 'under_hood_backend', 'pending');
      next[next.length - 2].status = 'success';
      return next;
    });

    try {
      const res = await fetch(`${API_BASE}/api/health`);
      const data = await res.json();

      await new Promise((r) => setTimeout(r, 400));
      setUnderHoodLogs((prev) => {
        const next = [...prev];
        next[next.length - 1].status = 'success';
        return addLog(next, 'under_hood_openai', data.openai ? 'success' : 'error');
      });

      await new Promise((r) => setTimeout(r, 300));
      setUnderHoodLogs((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last.key === 'under_hood_openai') last.status = data.openai ? 'success' : 'error';
        return addLog(next, data.openai ? 'under_hood_ready' : 'under_hood_fallback', data.openai ? 'success' : 'success');
      });

      setBackendReady(!!data.openai);
    } catch {
      setUnderHoodLogs((prev) => {
        const next = [...prev];
        next[next.length - 1].status = 'error';
        return addLog(addLog(next, 'under_hood_openai', 'error'), 'under_hood_fallback', 'success');
      });
      setBackendReady(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && !hasRecordedOpen.current) {
      hasRecordedOpen.current = true;
      trackInteraction('open_assistant');
    }
  }, [isOpen, trackInteraction]);

  useEffect(() => {
    if (isOpen) {
      setUnderHoodLogs([]);
      setBackendReady(null);
      runConnectionFlow();
      inputRef.current?.focus();
    }
  }, [isOpen, runConnectionFlow]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const el = hoodRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [underHoodLogs]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, onClose]);

  const getLocalResponse = (text: string): string => {
    const topicId = matchUserMessage(text);
    const { titleKey, bodyKey } = getResponseKeys(topicId);
    return `${t(titleKey as TranslationKeys)}\n\n${t(bodyKey as TranslationKeys)}`;
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));

    if (backendReady) {
      setUnderHoodLogs((prev) => addLog(prev, 'under_hood_sending', 'pending'));
      await new Promise((r) => setTimeout(r, 200));
      setUnderHoodLogs((prev) => {
        const next = [...prev];
        next[next.length - 1].status = 'success';
        return addLog(next, 'under_hood_processing', 'pending');
      });

      try {
        const res = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, messages: history }),
        });
        const data = await res.json();

        setUnderHoodLogs((prev) => {
          const next = [...prev];
          next[next.length - 1].status = 'success';
          return addLog(next, 'under_hood_received', 'success');
        });

        const content = data.content || getLocalResponse(trimmed);
        setMessages((prev) => [
          ...prev,
          { id: `a_${Date.now()}`, role: 'assistant', content },
        ]);
      } catch {
        setUnderHoodLogs((prev) => {
          const next = [...prev];
          next[next.length - 1].status = 'error';
          return addLog(next, 'under_hood_error', 'success');
        });
        const content = getLocalResponse(trimmed);
        setMessages((prev) => [
          ...prev,
          { id: `a_${Date.now()}`, role: 'assistant', content },
        ]);
      }
    } else {
      const content = getLocalResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: `a_${Date.now()}`, role: 'assistant', content },
      ]);
    }

    setIsSending(false);
    trackInteraction('assistant_message');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleChip = (key: (typeof SUGGESTED_PROMPTS)[number]) => {
    sendMessage(t(key));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="assistant-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="assistant-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            role="dialog"
            aria-label={t('assistant.title')}
          >
            <div className="assistant-drawer-inner">
              <div className="assistant-chat-column">
                <div className="assistant-header">
                  <h2 className="assistant-title">{t('assistant.title')}</h2>
                  <p className="assistant-subtitle">{t('assistant.subtitle')}</p>
                  <button
                    className="assistant-close"
                    onClick={onClose}
                    aria-label={t('projects.close')}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="assistant-chips">
                  {SUGGESTED_PROMPTS.map((key) => (
                    <button
                      key={key}
                      className="assistant-chip"
                      onClick={() => handleChip(key)}
                      disabled={isSending}
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>

                <div className="assistant-thread" ref={listRef}>
                  {messages.length === 0 ? (
                    <p className="assistant-empty">{t('assistant.subtitle')}</p>
                  ) : (
                    messages.map((msg) => {
                      if (msg.role === 'user') {
                        return (
                          <div
                            key={msg.id}
                            className="assistant-message user"
                          >
                            <span className="message-content">{msg.content}</span>
                            <span className="sr-only">Você</span>
                          </div>
                        );
                      }
                      const parts = msg.content.split('\n\n');
                      const hasTitle = parts.length > 1;
                      const bodyHtml = markdownToHtml(hasTitle ? parts.slice(1).join('\n\n') : msg.content);
                      return (
                        <div
                          key={msg.id}
                          className="assistant-message assistant"
                          role="status"
                          aria-live="polite"
                        >
                          {hasTitle ? (
                            <>
                              <strong className="message-title">{parts[0]}</strong>
                              <div
                                className="message-body"
                                dangerouslySetInnerHTML={{ __html: bodyHtml }}
                              />
                            </>
                          ) : (
                            <div
                              className="message-body"
                              dangerouslySetInnerHTML={{ __html: bodyHtml }}
                            />
                          )}
                          <span className="sr-only">Assistente</span>
                        </div>
                      );
                    })
                  )}
                </div>

                <form className="assistant-form" onSubmit={handleSubmit}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('assistant.placeholder')}
                    className="assistant-input"
                    aria-label={t('assistant.placeholder')}
                    disabled={isSending}
                  />
                  <button type="submit" className="assistant-send" aria-label={t('assistant.send')} disabled={isSending}>
                    <Send size={18} />
                  </button>
                </form>
              </div>

              <div className="assistant-hood-column">
                <div className="assistant-hood-header">
                  <span className="assistant-hood-title">{t('assistant.under_hood_title')}</span>
                </div>
                <div className="assistant-hood-log" ref={hoodRef}>
                  {underHoodLogs.map((log) => {
                    const step = underHoodSteps[log.key];
                    return (
                      <div key={log.id} className={`assistant-hood-entry ${log.status}`}>
                        <span className="hood-status">
                          {log.status === 'pending' && '⏳'}
                          {log.status === 'success' && '✓'}
                          {log.status === 'error' && '✗'}
                        </span>
                        <div className="hood-content">
                          <span className="hood-title">
                            {step ? t(step.titleKey as TranslationKeys) : t(log.key as TranslationKeys)}
                          </span>
                          {step?.descKey && (
                            <span className="hood-desc">{t(step.descKey as TranslationKeys)}</span>
                          )}
                          {step?.code && (
                            <pre className="hood-code">
                              <code>{step.code}</code>
                            </pre>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
