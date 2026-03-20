import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKeys } from '../../i18n/translations';
import { useExperience } from '../../context/ExperienceContext';
import { INSIGHTS } from '../../data/experienceMilestones';
import { InsightCard } from './InsightCard';

interface ExperiencePanelProps {
  /** Quando true, o título fica no cabeçalho do drawer (ExperienceIndicator) */
  hideHeader?: boolean;
}

export function ExperiencePanel({ hideHeader = false }: ExperiencePanelProps) {
  const { t } = useLanguage();
  const { state, sections } = useExperience();

  return (
    <div className={`experience-panel ${hideHeader ? 'experience-panel--embedded' : ''}`}>
      {!hideHeader && (
        <div className="experience-panel__header">
          <span className="experience-panel__title">{t('exploration.panel_title')}</span>
        </div>
      )}

      <div className="experience-panel__section">
        <span className="experience-panel__label">{t('exploration.exploration_progress')}</span>
        <ul className="experience-panel__map">
          {sections.map((s) => {
            const visited = s.isVisited(state);
            return (
              <li key={s.id} className={`experience-panel__map-item ${visited ? 'visited' : ''}`}>
                <span className="experience-panel__map-mark">{visited ? '✔' : '○'}</span>
                <span>{t(s.labelKey as TranslationKeys)}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="experience-panel__section">
        <span className="experience-panel__label">{t('exploration.insights_title')}</span>
        <ul className="experience-panel__insights">
          {INSIGHTS.map((insight) => (
            <li key={insight.id}>
              <InsightCard
                titleKey={insight.titleKey}
                descriptionKey={insight.descriptionKey}
                whyKey={insight.whyKey}
                isUnlocked={state.unlockedInsights.includes(insight.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .experience-panel {
          min-width: 260px;
          max-width: min(340px, 100%);
          max-height: min(70dvh, 560px);
          overflow-x: hidden;
          overflow-y: auto;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
        }

        .experience-panel__header {
          padding: var(--space-3);
          border-bottom: 1px solid var(--border);
        }

        .experience-panel__title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .experience-panel__section {
          padding: var(--space-3);
          border-bottom: 1px solid var(--border);
        }

        .experience-panel__section:last-of-type {
          border-bottom: none;
        }

        .experience-panel__label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          margin-bottom: var(--space-2);
        }

        .experience-panel__map {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .experience-panel__map-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: 0.8125rem;
        }

        .experience-panel__map-item.visited {
          color: var(--text);
        }

        .experience-panel__map-item:not(.visited) {
          color: var(--muted);
          opacity: 0.7;
        }

        .experience-panel__map-mark {
          flex-shrink: 0;
          width: 16px;
          text-align: center;
          font-size: 0.75rem;
          color: var(--accent);
        }

        .experience-panel__map-item:not(.visited) .experience-panel__map-mark {
          color: var(--muted);
        }

        .experience-panel__insights {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
      `}</style>
    </div>
  );
}
