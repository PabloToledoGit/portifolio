import { useLanguage } from '../../i18n/LanguageContext';
import { markdownToHtml } from '../../lib/markdown';
import { Loader2 } from 'lucide-react';
import type { GuideMessage } from '../../hooks/useGuideConversation';

interface GuideMessageListProps {
  messages: GuideMessage[];
  emptyKey: string;
  isSending?: boolean;
}

export const GuideMessageList = ({ messages, emptyKey, isSending }: GuideMessageListProps) => {
  const { t } = useLanguage();

  if (messages.length === 0 && !isSending) {
    return (
      <div className="guide-message-empty">
        <p>{t(emptyKey as 'assistant.subtitle')}</p>
      </div>
    );
  }

  return (
    <div className="guide-message-list">
      {messages.map((msg) => {
        if (msg.role === 'user') {
          return (
            <div key={msg.id} className="guide-message guide-message-user">
              <span className="guide-message-content">{msg.content}</span>
            </div>
          );
        }
        const parts = msg.content.split('\n\n');
        const hasTitle = parts.length > 1;
        const bodyHtml = markdownToHtml(hasTitle ? parts.slice(1).join('\n\n') : msg.content);
        return (
          <div
            key={msg.id}
            className="guide-message guide-message-assistant"
            role="status"
            aria-live="polite"
          >
            <div className="guide-response-card">
              {hasTitle && (
                <strong className="guide-response-title">{parts[0]}</strong>
              )}
              <div
                className="guide-response-body"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            </div>
          </div>
        );
      })}
      {messages.length > 0 && isSending && (
        <div className="guide-message guide-message-assistant">
          <div className="guide-response-card guide-loading-card">
            <Loader2 size={20} className="guide-loading-icon" />
            <span>{t('guide.loading')}</span>
          </div>
        </div>
      )}
      <style>{`
        .guide-message-empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-12);
          min-height: 120px;
        }
        .guide-message-empty p {
          font-size: 0.9375rem;
          color: var(--muted);
          text-align: center;
          line-height: 1.5;
        }
        .guide-message-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          padding: var(--space-4);
        }
        .guide-message {
          flex-shrink: 0;
        }
        .guide-message-user {
          margin-left: var(--space-6);
          padding: var(--space-3) var(--space-4);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 0.9375rem;
        }
        .guide-message-assistant {
          margin-right: var(--space-4);
        }
        .guide-response-card {
          padding: var(--space-5);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .guide-response-title {
          display: block;
          font-size: 1rem;
          margin-bottom: var(--space-2);
        }
        .guide-response-body {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--text);
        }
        .guide-response-body code {
          font-size: 0.875em;
          padding: 0.1em 0.3em;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
        }
        .guide-message-loading {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          padding: var(--space-8);
          color: var(--muted);
          font-size: 0.9375rem;
        }
        .guide-loading-card {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          color: var(--muted);
          font-size: 0.875rem;
        }
        .guide-loading-icon {
          animation: guide-spin 0.8s linear infinite;
        }
        @keyframes guide-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
