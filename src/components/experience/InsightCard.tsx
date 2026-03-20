import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKeys } from '../../i18n/translations';

interface InsightCardProps {
  titleKey: string;
  descriptionKey: string;
  whyKey: string;
  isUnlocked: boolean;
}

export function InsightCard({ titleKey, descriptionKey, whyKey, isUnlocked }: InsightCardProps) {
  const { t } = useLanguage();

  return (
    <div className={`insight-card ${isUnlocked ? 'insight-card--unlocked' : 'insight-card--locked'}`}>
      <span className="insight-card__mark">{isUnlocked ? '✓' : '○'}</span>
      <div className="insight-card__content">
        <h4 className="insight-card__title">{t(titleKey as TranslationKeys)}</h4>
        {isUnlocked ? (
          <>
            <p className="insight-card__description">{t(descriptionKey as TranslationKeys)}</p>
            <p className="insight-card__why">{t(whyKey as TranslationKeys)}</p>
          </>
        ) : (
          <p className="insight-card__placeholder">{t('exploration.insight_placeholder' as TranslationKeys)}</p>
        )}
      </div>
      <style>{`
        .insight-card {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-3);
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }

        .insight-card--unlocked {
          background: rgba(255, 255, 255, 0.03);
        }

        .insight-card--locked {
          opacity: 0.6;
        }

        .insight-card__mark {
          flex-shrink: 0;
          width: 18px;
          text-align: center;
          font-size: 0.75rem;
          color: var(--accent);
        }

        .insight-card--locked .insight-card__mark {
          color: var(--muted);
        }

        .insight-card__content {
          flex: 1;
          min-width: 0;
        }

        .insight-card__title {
          font-size: 0.8125rem;
          font-weight: 600;
          margin: 0 0 var(--space-1);
        }

        .insight-card__description,
        .insight-card__why,
        .insight-card__placeholder {
          font-size: 0.75rem;
          line-height: 1.5;
          margin: 0;
          color: var(--muted);
        }

        .insight-card__why {
          margin-top: var(--space-2);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
