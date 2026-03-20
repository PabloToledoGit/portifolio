import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKeys } from '../../i18n/translations';
import { useExperience } from '../../context/ExperienceContext';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export function ExperienceToast() {
  const { t } = useLanguage();
  const { state, dismissToast } = useExperience();
  const shouldReduceMotion = useReducedMotion();
  const current = state.toastQueue[0];

  if (!current) return null;

  return (
    <div className="experience-toast-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="experience-toast"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
        >
          <span className="experience-toast__message">{t(current.messageKey as TranslationKeys)}</span>
          <button
            type="button"
            className="experience-toast__dismiss"
            onClick={() => dismissToast(current.id)}
            aria-label={t('exploration.dismiss_toast')}
          >
            ×
          </button>
        </motion.div>
      </AnimatePresence>
      <style>{`
        .experience-toast-container {
          position: fixed;
          bottom: var(--space-5);
          left: 50%;
          transform: translateX(-50%);
          z-index: 1103;
          pointer-events: none;
        }

        .experience-toast-container > * {
          pointer-events: auto;
        }

        .experience-toast {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          font-size: 0.8125rem;
          color: var(--text);
        }

        .experience-toast__message {
          flex: 1;
        }

        .experience-toast__dismiss {
          flex-shrink: 0;
          background: none;
          border: none;
          color: var(--muted);
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: color var(--transition-fast);
        }

        .experience-toast__dismiss:hover {
          color: var(--text);
        }

        @media (max-width: 768px) {
          .experience-toast-container {
            left: var(--space-4);
            right: var(--space-4);
            transform: none;
            bottom: calc(var(--space-5) + 60px);
          }
        }
      `}</style>
    </div>
  );
}
