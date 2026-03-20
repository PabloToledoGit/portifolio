import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { AssistantDrawer } from '../components/assistant/AssistantDrawer';

export const AssistantSection = () => {
  const { t } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsDrawerOpen(true);
    window.addEventListener('openAssistant', handler);
    return () => window.removeEventListener('openAssistant', handler);
  }, []);

  return (
    <section id="guide" className="assistant-section section-padding">
      <div className="container">
        <motion.div
          className="assistant-cta-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="assistant-cta-content">
            <MessageCircle size={32} className="assistant-cta-icon" />
            <div>
              <h2 className="assistant-cta-title">{t('assistant.title')}</h2>
              <p className="assistant-cta-subtitle">{t('assistant.subtitle')}</p>
            </div>
          </div>
          <button
            className="assistant-cta-btn"
            data-assistant-trigger
            onClick={() => setIsDrawerOpen(true)}
          >
            {t('assistant.title')}
          </button>
        </motion.div>
      </div>

      <AssistantDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <style>{`
        .assistant-section {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }

        .assistant-cta-block {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          padding: var(--space-8);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          align-items: stretch;
        }

        @media (min-width: 640px) {
          .assistant-cta-block {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .assistant-cta-content {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
        }

        .assistant-cta-icon {
          flex-shrink: 0;
          color: var(--accent);
        }

        .assistant-cta-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: var(--space-1);
        }

        .assistant-cta-subtitle {
          font-size: 0.9375rem;
          color: var(--muted);
          max-width: 400px;
        }

        .assistant-cta-btn {
          flex-shrink: 0;
          padding: var(--space-3) var(--space-5);
          background: var(--accent);
          color: var(--bg);
          border-radius: var(--radius-md);
          font-size: 0.9375rem;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .assistant-cta-btn:hover {
          opacity: 0.9;
        }

        .assistant-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1100;
          backdrop-filter: blur(4px);
        }

        .assistant-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 960px;
          height: 100vh;
          background: var(--surface);
          border-left: 1px solid var(--border);
          z-index: 1101;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 32px rgba(0, 0, 0, 0.4);
        }

        .assistant-drawer-inner {
          display: grid;
          grid-template-columns: 1fr 340px;
          height: 100%;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .assistant-drawer-inner {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
          }
          .assistant-hood-column {
            max-height: 240px;
            border-top: 1px solid var(--border);
            border-left: none;
          }
          .hood-code {
            font-size: 0.5625rem;
          }
        }

        .assistant-chat-column {
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 0;
        }

        .assistant-hood-column {
          display: flex;
          flex-direction: column;
          background: var(--surface2);
          border-left: 1px solid var(--border);
        }

        .assistant-hood-header {
          padding: var(--space-3);
          border-bottom: 1px solid var(--border);
        }

        .assistant-hood-title {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .assistant-hood-log {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          font-size: 0.75rem;
          font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
        }

        .assistant-hood-entry {
          display: flex;
          gap: var(--space-2);
          padding: var(--space-3);
          border-radius: var(--radius-sm);
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border);
        }

        .assistant-hood-entry.pending {
          border-color: var(--muted);
        }

        .assistant-hood-entry.success {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .assistant-hood-entry.error {
          border-color: rgba(248, 113, 113, 0.3);
        }

        .hood-status {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }

        .assistant-hood-entry.pending .hood-status { color: var(--muted); }
        .assistant-hood-entry.success .hood-status { color: #86efac; }
        .assistant-hood-entry.error .hood-status { color: #f87171; }

        .hood-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .hood-title {
          font-size: 0.6875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent);
        }

        .hood-desc {
          font-size: 0.6875rem;
          line-height: 1.4;
          color: var(--muted);
        }

        .hood-code {
          margin: var(--space-1) 0 0;
          padding: var(--space-2);
          background: rgba(0, 0, 0, 0.4);
          border-radius: var(--radius-sm);
          overflow-x: auto;
          font-size: 0.625rem;
          line-height: 1.5;
          font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
          color: var(--text);
          white-space: pre;
        }

        .hood-code code {
          font-family: inherit;
        }

        .assistant-header {
          padding: var(--space-6);
          border-bottom: 1px solid var(--border);
          position: relative;
        }

        .assistant-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: var(--space-1);
        }

        .assistant-subtitle {
          font-size: 0.8125rem;
          color: var(--muted);
        }

        .assistant-close {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          padding: var(--space-2);
          color: var(--muted);
        }

        .assistant-close:hover {
          color: var(--text);
        }

        .assistant-chips {
          padding: var(--space-4);
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          border-bottom: 1px solid var(--border);
        }

        .assistant-chip {
          padding: var(--space-2) var(--space-3);
          font-size: 0.75rem;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
          transition: var(--transition-fast);
        }

        .assistant-chip:hover {
          background: var(--surface);
          border-color: var(--muted);
        }

        .assistant-thread {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .assistant-empty {
          font-size: 0.9375rem;
          color: var(--muted);
          text-align: center;
          padding: var(--space-8);
        }

        .assistant-message {
          padding: var(--space-4);
          border-radius: var(--radius-md);
          font-size: 0.9375rem;
          line-height: 1.6;
          flex-shrink: 0;
        }

        .assistant-message .message-body {
          word-wrap: break-word;
        }

        .assistant-message .message-body code {
          font-size: 0.875em;
          padding: 0.1em 0.3em;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
        }

        .assistant-message.user {
          background: var(--surface2);
          margin-left: var(--space-4);
          border: 1px solid var(--border);
        }

        .assistant-message.assistant {
          background: rgba(255, 255, 255, 0.03);
          margin-right: var(--space-4);
          border: 1px solid var(--border);
        }

        .message-content {
          display: block;
        }

        .message-title {
          display: block;
          margin-bottom: var(--space-2);
          font-size: 1rem;
        }

        .message-body {
          display: block;
          font-weight: 400;
        }

        .assistant-form {
          display: flex;
          gap: var(--space-2);
          padding: var(--space-4);
          border-top: 1px solid var(--border);
        }

        .assistant-input {
          flex: 1;
          padding: var(--space-3) var(--space-4);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text);
          font-size: 0.9375rem;
          font-family: inherit;
        }

        .assistant-input::placeholder {
          color: var(--muted);
        }

        .assistant-input:focus {
          outline: none;
          border-color: var(--muted);
        }

        .assistant-send {
          padding: var(--space-3);
          background: var(--accent);
          color: var(--bg);
          border-radius: var(--radius-md);
          flex-shrink: 0;
        }

        .assistant-send:hover {
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
}
