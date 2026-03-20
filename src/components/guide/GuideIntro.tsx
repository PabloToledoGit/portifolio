import { useLanguage } from '../../i18n/LanguageContext';
import { motion } from 'framer-motion';

interface GuideIntroProps {
  onLaunch: () => void;
}

export const GuideIntro = ({ onLaunch }: GuideIntroProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      className="guide-intro"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="guide-intro-label">{t('guide.label')}</span>
      <h2 className="guide-intro-title">{t('guide.title')}</h2>
      <p className="guide-intro-copy">{t('guide.description')}</p>
      <ul className="guide-intro-signals">
        <li>{t('guide.signal_1')}</li>
        <li>{t('guide.signal_2')}</li>
        <li>{t('guide.signal_3')}</li>
      </ul>
      <button
        type="button"
        className="guide-launch-btn"
        onClick={onLaunch}
        aria-label={t('guide.launch_label')}
      >
        {t('guide.launch')}
      </button>
      <style>{`
        .guide-intro {
          max-width: 560px;
        }
        .guide-intro-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
          margin-bottom: var(--space-2);
        }
        .guide-intro-title {
          font-size: var(--h2);
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: var(--space-4);
          letter-spacing: -0.02em;
        }
        .guide-intro-copy {
          font-size: var(--body);
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: var(--space-6);
        }
        .guide-intro-signals {
          list-style: none;
          margin-bottom: var(--space-8);
        }
        .guide-intro-signals li {
          font-size: 0.9375rem;
          color: var(--text);
          padding: var(--space-2) 0;
          padding-left: var(--space-5);
          position: relative;
        }
        .guide-intro-signals li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
        }
        .guide-launch-btn {
          padding: var(--space-4) var(--space-6);
          background: var(--accent);
          color: var(--bg);
          font-size: 0.9375rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          transition: var(--transition-fast);
        }
        .guide-launch-btn:hover {
          opacity: 0.92;
        }
      `}</style>
    </motion.div>
  );
};
