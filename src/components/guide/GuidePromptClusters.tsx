import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKeys } from '../../i18n/translations';
import { guidePromptClusters } from '../../data/guidePrompts';
import { motion } from 'framer-motion';

interface GuidePromptClustersProps {
  onSelectPrompt: (promptKey: string) => void;
  disabled?: boolean;
}

export const GuidePromptClusters = ({ onSelectPrompt, disabled }: GuidePromptClustersProps) => {
  const { t } = useLanguage();

  return (
    <div className="guide-prompt-clusters">
      {guidePromptClusters.map((cluster, i) => (
        <motion.div
          key={cluster.id}
          className="guide-cluster"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
        >
          <span className="guide-cluster-label">{t(cluster.labelKey as TranslationKeys)}</span>
          <div className="guide-cluster-prompts">
            {cluster.prompts.map((promptKey) => (
              <button
                key={promptKey}
                type="button"
                className="guide-prompt-chip"
                onClick={() => onSelectPrompt(t(promptKey as TranslationKeys))}
                disabled={disabled}
              >
                {t(promptKey as TranslationKeys)}
              </button>
            ))}
          </div>
        </motion.div>
      ))}
      <style>{`
        .guide-prompt-clusters {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .guide-cluster-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          margin-bottom: var(--space-2);
        }
        .guide-cluster-prompts {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .guide-prompt-chip {
          padding: var(--space-2) var(--space-3);
          font-size: 0.8125rem;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
          transition: var(--transition-fast);
          text-align: left;
        }
        .guide-prompt-chip:hover:not(:disabled) {
          background: var(--surface);
          border-color: var(--muted);
        }
        .guide-prompt-chip:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};
