import { useLanguage } from '../../i18n/LanguageContext';
import { motion } from 'framer-motion';

interface StoryProgressFeedbackProps {
  exploredCount: number;
  totalCount: number;
  isComplete: boolean;
}

export const StoryProgressFeedback = ({ exploredCount, totalCount, isComplete }: StoryProgressFeedbackProps) => {
  const { t } = useLanguage();

  if (exploredCount === 0) return null;

  return (
    <motion.div
      className="story-progress-feedback"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isComplete ? (
        <span className="story-feedback-complete">{t('story.journey_complete')}</span>
      ) : (
        <span className="story-feedback-progress">
          {exploredCount} {t('story.of')} {totalCount} {t('story.chapters_explored')}
        </span>
      )}
      <style>{`
        .story-progress-feedback {
          margin-top: var(--space-4);
          padding: var(--space-3) var(--space-4);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
          color: var(--muted);
        }
        .story-feedback-complete {
          font-weight: 600;
          color: var(--text);
        }
      `}</style>
    </motion.div>
  );
};
