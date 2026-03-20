import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKeys } from '../../i18n/translations';
import type { StoryChapter } from '../../data/storyChapters';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryTechCluster } from './StoryTechCluster';
import { StoryMilestoneBadge } from './StoryMilestoneBadge';
import { StoryLinkBridge } from './StoryLinkBridge';

interface StoryStageProps {
  chapter: StoryChapter | null;
  onAskAssistant?: () => void;
}

export const StoryStage = ({ chapter, onAskAssistant }: StoryStageProps) => {
  const { t } = useLanguage();

  return (
    <div className="story-stage">
      <AnimatePresence mode="wait">
        {chapter ? (
          <motion.article
            key={chapter.id}
            className="story-stage-content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="story-stage-meta">
              <span className="story-stage-period">
                {chapter.periodKey ? t(chapter.periodKey as TranslationKeys) : chapter.period}
              </span>
              <StoryMilestoneBadge phaseType={chapter.phaseType} />
            </div>
            <h3 className="story-stage-title">{t(chapter.titleKey as TranslationKeys)}</h3>
            <p className="story-stage-summary">{t(chapter.summaryKey as TranslationKeys)}</p>
            <div className="story-stage-blocks">
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
            <StoryLinkBridge onAskAssistant={onAskAssistant} />
          </motion.article>
        ) : (
          <motion.div
            key="placeholder"
            className="story-stage-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="story-placeholder-text">{t('story.placeholder')}</p>
            <span className="story-placeholder-hint">{t('story.placeholder_hint')}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .story-stage {
          min-height: 420px;
          padding: var(--space-8);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        .story-stage-meta {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }
        .story-stage-period {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted);
        }
        .story-stage-title {
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: var(--space-3);
          letter-spacing: -0.02em;
        }
        .story-stage-summary {
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: var(--space-6);
        }
        .story-stage-blocks {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
          margin-bottom: var(--space-6);
        }
        .story-block {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .story-block-label {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted);
        }
        .story-block p {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--text);
        }
        .story-block-insight p {
          font-style: italic;
          color: var(--muted);
        }
        .story-stage-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 380px;
          gap: var(--space-2);
          color: var(--muted);
        }
        .story-placeholder-text {
          font-size: 1rem;
        }
        .story-placeholder-hint {
          font-size: 0.75rem;
          opacity: 0.7;
        }
        @media (max-width: 768px) {
          .story-stage {
            min-height: 360px;
            padding: var(--space-6);
          }
        }
      `}</style>
    </div>
  );
};
