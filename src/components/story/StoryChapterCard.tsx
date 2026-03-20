import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKeys } from '../../i18n/translations';
import type { StoryChapter } from '../../data/storyChapters';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StoryTechCluster } from './StoryTechCluster';
import { StoryMilestoneBadge } from './StoryMilestoneBadge';

interface StoryChapterCardProps {
  chapter: StoryChapter;
  isExpanded: boolean;
  onToggle: () => void;
}

export const StoryChapterCard = ({ chapter, isExpanded, onToggle }: StoryChapterCardProps) => {
  const { t } = useLanguage();
  const period = chapter.periodKey ? t(chapter.periodKey as TranslationKeys) : chapter.period;

  return (
    <motion.article
      className={`story-chapter-card ${isExpanded ? 'expanded' : ''}`}
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
    >
      <button
        type="button"
        className="story-card-trigger"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <div className="story-card-header">
          <span className="story-card-period">{period}</span>
          <StoryMilestoneBadge phaseType={chapter.phaseType} />
        </div>
        <h3 className="story-card-title">{t(chapter.titleKey as TranslationKeys)}</h3>
        <ChevronDown
          size={20}
          className={`story-card-chevron ${isExpanded ? 'open' : ''}`}
        />
      </button>
      <motion.div
        className="story-card-body"
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="story-card-inner">
          <p className="story-card-summary">{t(chapter.summaryKey as TranslationKeys)}</p>
          <div className="story-card-blocks">
            <div className="story-block">
              <span className="story-block-label">{t('story.label_context')}</span>
              <p>{t(chapter.contextKey as TranslationKeys)}</p>
            </div>
            <div className="story-block">
              <span className="story-block-label">{t('story.label_challenge')}</span>
              <p>{t(chapter.challengeKey as TranslationKeys)}</p>
            </div>
            <div className="story-block">
              <span className="story-block-label">{t('story.label_evolution')}</span>
              <p>{t(chapter.evolutionKey as TranslationKeys)}</p>
            </div>
            {chapter.insightKey && (
              <div className="story-block story-block-insight">
                <span className="story-block-label">{t('story.label_insight')}</span>
                <p>{t(chapter.insightKey as TranslationKeys)}</p>
              </div>
            )}
          </div>
          <StoryTechCluster tech={chapter.tech} />
        </div>
      </motion.div>
      <style>{`
        .story-chapter-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .story-chapter-card.expanded {
          border-color: rgba(255,255,255,0.15);
        }
        .story-card-trigger {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--space-2);
          padding: var(--space-5);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--text);
          position: relative;
        }
        .story-card-header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .story-card-period {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }
        .story-card-title {
          font-size: 1.125rem;
          font-weight: 700;
          line-height: 1.3;
        }
        .story-card-chevron {
          position: absolute;
          right: var(--space-5);
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          transition: transform var(--transition-base);
        }
        .story-card-chevron.open {
          transform: translateY(-50%) rotate(180deg);
        }
        .story-card-body {
          overflow: hidden;
        }
        .story-card-inner {
          padding: 0 var(--space-5) var(--space-6);
        }
        .story-card-summary {
          font-size: 0.9375rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: var(--space-4);
        }
        .story-card-blocks {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }
        .story-block-label {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted);
        }
        .story-block p {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text);
        }
        .story-block-insight p {
          font-style: italic;
          color: var(--muted);
        }
      `}</style>
    </motion.article>
  );
};
