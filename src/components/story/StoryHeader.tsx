import { useLanguage } from '../../i18n/LanguageContext';
import { motion } from 'framer-motion';

interface StoryHeaderProps {
  progress?: number;
}

export const StoryHeader = ({ progress = 0 }: StoryHeaderProps) => {
  const { t } = useLanguage();

  return (
    <motion.header
      className="story-header"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="story-eyebrow">{t('story.eyebrow')}</span>
      <span className="story-index">02</span>
      <h2 className="story-title">{t('story.title')}</h2>
      <p className="story-description">{t('story.description')}</p>
      {progress > 0 && (
        <div className="story-progress-bar">
          <motion.div
            className="story-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
      <style>{`
        .story-header {
          margin-bottom: var(--space-12);
          max-width: 640px;
        }
        .story-eyebrow {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
          margin-bottom: var(--space-2);
        }
        .story-index {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--muted);
          opacity: 0.6;
          margin-right: var(--space-2);
        }
        .story-title {
          font-size: var(--h2);
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: var(--space-4);
          letter-spacing: -0.02em;
        }
        .story-description {
          font-size: var(--body);
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: var(--space-6);
        }
        .story-progress-bar {
          height: 2px;
          background: var(--border);
          border-radius: var(--radius-full);
          overflow: hidden;
          max-width: 200px;
        }
        .story-progress-fill {
          height: 100%;
          background: var(--accent);
          border-radius: var(--radius-full);
        }
      `}</style>
    </motion.header>
  );
};
