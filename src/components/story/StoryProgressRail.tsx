import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKeys } from '../../i18n/translations';
import type { StoryChapter } from '../../data/storyChapters';
import { motion } from 'framer-motion';

interface StoryProgressRailProps {
  chapters: StoryChapter[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export const StoryProgressRail = ({ chapters, activeId, onSelect }: StoryProgressRailProps) => {
  const { t } = useLanguage();

  return (
    <nav className="story-progress-rail" aria-label="Navegação por capítulos">
      <div className="story-rail-track">
        {chapters.map((ch, i) => {
          const isActive = activeId === ch.id;
          const period = ch.periodKey ? t(ch.periodKey as TranslationKeys) : ch.period;
          return (
            <motion.button
              key={ch.id}
              type="button"
              className={`story-rail-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(ch.id)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="story-rail-marker" />
              <span className="story-rail-period">{period}</span>
              <span className="story-rail-title">{t(ch.titleKey as TranslationKeys)}</span>
            </motion.button>
          );
        })}
      </div>
      <style>{`
        .story-progress-rail {
          position: sticky;
          top: calc(var(--space-10) + 60px);
        }
        .story-rail-track {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-left: var(--space-4);
          border-left: 1px solid var(--border);
        }
        .story-rail-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          padding: var(--space-3) 0 var(--space-3) var(--space-4);
          margin-left: -1px;
          background: none;
          border: none;
          border-left: 2px solid transparent;
          cursor: pointer;
          text-align: left;
          color: var(--muted);
          transition: all var(--transition-base);
        }
        .story-rail-item:hover {
          color: var(--text);
        }
        .story-rail-item.active {
          border-left-color: var(--accent);
          color: var(--text);
        }
        .story-rail-marker {
          position: absolute;
          left: -5px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border);
          transition: all var(--transition-base);
        }
        .story-rail-item.active .story-rail-marker {
          background: var(--accent);
          box-shadow: 0 0 12px rgba(255,255,255,0.2);
        }
        .story-rail-period {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          opacity: 0.8;
        }
        .story-rail-title {
          font-size: 0.8125rem;
          font-weight: 600;
          line-height: 1.3;
          max-width: 180px;
        }
        @media (max-width: 991px) {
          .story-progress-rail {
            position: static;
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};
