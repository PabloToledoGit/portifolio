import { useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useExperience } from '../../context/ExperienceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useGuideRuntime } from '../../hooks/useGuideRuntime';
import { useGuideConversation } from '../../hooks/useGuideConversation';
import { GuidePromptClusters } from './GuidePromptClusters';
import { GuideMessageList } from './GuideMessageList';
import { GuideComposer } from './GuideComposer';
import { GuideSystemInsightPanel } from './GuideSystemInsightPanel';

interface GuideExperienceShellProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideExperienceShell = ({ isOpen, onClose }: GuideExperienceShellProps) => {
  const { t } = useLanguage();
  const { trackInteraction } = useExperience();
  const inputRef = useRef<HTMLInputElement>(null);
  const traceRef = useRef<HTMLDivElement>(null);
  const hasRecordedOpen = useRef(false);

  const { traces, mode, addMessageTrace } = useGuideRuntime(isOpen);
  const {
    messages,
    input,
    setInput,
    isSending,
    sendMessage,
    listRef: messagesListRef,
  } = useGuideConversation({
    mode,
    onSendTrace: addMessageTrace,
    onMessageSent: () => trackInteraction('assistant_message'),
  });

  useEffect(() => {
    if (isOpen && !hasRecordedOpen.current) {
      hasRecordedOpen.current = true;
      trackInteraction('open_assistant');
    }
  }, [isOpen, trackInteraction]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const el = traceRef.current;
    if (!el) return;
    const scrollToBottom = () => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToBottom);
    });
  }, [traces]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, onClose]);

  const handleSubmit = () => {
    sendMessage(input);
  };

  const handlePrompt = (text: string) => {
    sendMessage(text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="guide-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="guide-shell"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={t('guide.title')}
          >
            <div className="guide-shell-inner">
              <div className="guide-conversation-column">
                <div className="guide-conversation-header">
                  <div>
                    <h2 className="guide-conversation-title">{t('guide.title')}</h2>
                    <p className="guide-conversation-subtitle">{t('guide.subtitle')}</p>
                  </div>
                  <button
                    className="guide-close-btn"
                    onClick={onClose}
                    aria-label={t('projects.close')}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="guide-prompts-wrap">
                  <GuidePromptClusters
                    onSelectPrompt={handlePrompt}
                    disabled={isSending}
                  />
                </div>

                <div className="guide-messages-wrap" ref={messagesListRef}>
                  <GuideMessageList
                    messages={messages}
                    emptyKey="guide.empty_state"
                    isSending={isSending}
                  />
                </div>

                <GuideComposer
                  value={input}
                  onChange={setInput}
                  onSubmit={handleSubmit}
                  disabled={isSending}
                  inputRef={inputRef}
                />
              </div>

              <GuideSystemInsightPanel
                traces={traces}
                mode={mode}
                traceRef={traceRef}
              />
            </div>
          </motion.div>
        </>
      )}
      <style>{`
        .guide-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1100;
          backdrop-filter: blur(6px);
        }
        .guide-shell {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 980px;
          height: 100vh;
          background: var(--surface);
          border-left: 1px solid var(--border);
          z-index: 1101;
          display: flex;
          flex-direction: column;
          box-shadow: -12px 0 48px rgba(0, 0, 0, 0.5);
        }
        .guide-shell-inner {
          display: grid;
          grid-template-columns: 1fr 320px;
          height: 100%;
          overflow: hidden;
        }
        .guide-conversation-column {
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
        }
        .guide-conversation-header {
          flex-shrink: 0;
          padding: var(--space-6);
          border-bottom: 1px solid var(--border);
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .guide-conversation-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: var(--space-1);
        }
        .guide-conversation-subtitle {
          font-size: 0.8125rem;
          color: var(--muted);
        }
        .guide-close-btn {
          padding: var(--space-2);
          color: var(--muted);
        }
        .guide-close-btn:hover {
          color: var(--text);
        }
        .guide-prompts-wrap {
          padding: var(--space-4);
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .guide-messages-wrap {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
        }
        @media (max-width: 768px) {
          .guide-shell-inner {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};
