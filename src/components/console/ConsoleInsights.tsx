import { useLanguage } from '../../i18n/LanguageContext';

export function ConsoleInsights() {
  const { t } = useLanguage();

  return (
    <div className="console-insights">
      <p className="console-insights__text">{t('console.insight')}</p>
      <a href="#projects" className="console-insights__link">
        {t('console.link_nutrify')}
      </a>
      <style>{`
        .console-insights {
          margin-top: var(--space-8);
          padding-top: var(--space-6);
          border-top: 1px solid var(--border);
        }

        .console-insights__text {
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.6;
          margin: 0 0 var(--space-3);
          max-width: 52ch;
        }

        .console-insights__link {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          transition: opacity var(--transition-fast);
        }

        .console-insights__link:hover {
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}
