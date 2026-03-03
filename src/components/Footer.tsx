import { useLanguage } from '../i18n/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-left">
          <span className="footer-logo">Pablo Toledo<span className="logo-dot">.</span></span>
          <p className="footer-text">{t('footer.rights')}</p>
        </div>

        <div className="footer-right">
          <div className="footer-links">
            <a href="https://github.com/PabloToledoGit?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/pablo-toledo-371256275/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          padding: var(--space-10) 0;
          border-top: 1px solid var(--border);
          background: var(--bg);
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          align-items: center;
          text-align: center;
        }

        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        .footer-logo {
          font-size: 1.25rem;
          font-weight: 800;
          display: block;
          margin-bottom: var(--space-2);
        }

        .logo-dot {
          color: var(--muted);
        }

        .footer-text {
          font-size: 12px;
          color: var(--muted);
        }

        .footer-links {
          display: flex;
          gap: var(--space-6);
          font-size: 12px;
          font-weight: 600;
          color: var(--muted);
        }

        .footer-links a:hover {
          color: var(--text);
        }
      `}</style>
    </footer>
  );
};
