import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKeys } from '../../i18n/translations';
import { systemInsightSteps } from '../../data/systemInsightSteps';
import type { RuntimeTrace } from '../../hooks/useGuideRuntime';
import type { RuntimeMode } from '../../hooks/useGuideRuntime';
import { motion } from 'framer-motion';

interface GuideSystemInsightPanelProps {
  traces: RuntimeTrace[];
  mode: RuntimeMode;
  traceRef: React.RefObject<HTMLDivElement | null>;
}

const statusIcons: Record<RuntimeTrace['status'], string> = {
  checking: '○',
  ready: '✓',
  curated: '✓',
  unavailable: '○',
  completed: '✓',
};

export const GuideSystemInsightPanel = ({
  traces,
  mode,
  traceRef,
}: GuideSystemInsightPanelProps) => {
  const { t } = useLanguage();

  return (
    <div className="guide-system-insight">
      <div className="guide-insight-header">
        <span className="guide-insight-title">{t('guide.insight_title')}</span>
        {mode !== null && (
          <span className={`guide-insight-mode ${mode}`}>
            {mode === 'live' ? t('guide.mode_live') : t('guide.mode_curated')}
          </span>
        )}
      </div>
      <div className="guide-insight-trace" ref={traceRef}>
        {traces.map((trace, i) => {
          const step = systemInsightSteps[trace.key];
          return (
            <motion.div
              key={trace.id}
              className={`guide-trace-entry ${trace.status}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
            >
              <span className="guide-trace-status">{statusIcons[trace.status]}</span>
              <div className="guide-trace-content">
                <span className="guide-trace-label">
                  {step ? t(step.statusLabelKey as TranslationKeys) : trace.key}
                </span>
                {step?.descKey && (
                  <span className="guide-trace-desc">{t(step.descKey as TranslationKeys)}</span>
                )}
                {step?.code && (
                  <pre className="guide-trace-code">
                    <code>{step.code}</code>
                  </pre>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="guide-insight-signals">
        <p className="guide-signal">{t('guide.security_signal')}</p>
        <p className="guide-signal">{t('guide.resilience_signal')}</p>
      </div>
      <style>{`
        .guide-system-insight {
          display: flex;
          flex-direction: column;
          min-height: 0;
          background: var(--surface2);
          border-left: 1px solid var(--border);
        }
        .guide-insight-header {
          padding: var(--space-4);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-3);
        }
        .guide-insight-title {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }
        .guide-insight-mode {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
        }
        .guide-insight-mode.live {
          background: rgba(134, 239, 172, 0.15);
          color: #86efac;
        }
        .guide-insight-mode.curated {
          background: rgba(255, 255, 255, 0.08);
          color: var(--muted);
        }
        .guide-insight-trace {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          font-size: 0.75rem;
          font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
        }
        .guide-trace-entry {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-3);
          border-radius: var(--radius-sm);
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border);
        }
        .guide-trace-entry.ready .guide-trace-status,
        .guide-trace-entry.curated .guide-trace-status,
        .guide-trace-entry.completed .guide-trace-status {
          color: #86efac;
        }
        .guide-trace-entry.checking .guide-trace-status {
          color: var(--muted);
        }
        .guide-trace-entry.unavailable .guide-trace-status {
          color: var(--muted);
        }
        .guide-trace-status {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }
        .guide-trace-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .guide-trace-label {
          font-size: 0.6875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--accent);
        }
        .guide-trace-desc {
          font-size: 0.6875rem;
          line-height: 1.4;
          color: var(--muted);
        }
        .guide-trace-code {
          margin: var(--space-2) 0 0;
          padding: var(--space-2);
          background: rgba(0, 0, 0, 0.4);
          border-radius: var(--radius-sm);
          overflow-x: auto;
          font-size: 0.5625rem;
          line-height: 1.5;
          font-family: inherit;
          color: var(--text);
          white-space: pre;
        }
        .guide-insight-signals {
          padding: var(--space-4);
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .guide-signal {
          font-size: 0.65rem;
          line-height: 1.4;
          color: var(--muted);
        }
        @media (max-width: 768px) {
          .guide-system-insight {
            border-left: none;
            border-top: 1px solid var(--border);
            max-height: 280px;
          }
          .guide-trace-code {
            font-size: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};
