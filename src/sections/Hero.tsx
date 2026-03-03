import { useLanguage } from '../i18n/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export const Hero = () => {
  const { t } = useLanguage();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="hero section-padding">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="hero-badge">
            {t('hero.badge')}
          </motion.div>

          <motion.h1 variants={item} className="hero-title text-balance">
            {t('hero.headline')}
          </motion.h1>

          <motion.p variants={item} className="hero-subtitle">
            {t('hero.subheadline')}
          </motion.p>

          <motion.div variants={item} className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              {t('hero.cta_projects')}
              <ArrowUpRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              {t('hero.cta_contact')}
            </a>
          </motion.div>

          <motion.div variants={item} className="hero-proof-grid">
            <div className="proof-item">
              <span className="proof-value">+{t('hero.proof.faturamento')}</span>
              <span className="proof-label">{t('hero.proof.label_results')}</span>
            </div>
            <div className="proof-item">
              <span className="proof-value">{t('hero.proof.disponibilidade')} </span>
              <span className="proof-label">{t('hero.proof.label_status')}</span>
            </div>
            <div className="proof-item">
              <span className="proof-value">{t('hero.proof.equipe')}</span>
              <span className="proof-label">{t('hero.proof.label_leadership')}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding-top: var(--space-16);
        }

        .hero-content {
          max-width: 900px;
        }

        .hero-badge {
          display: inline-block;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
          padding: 6px 14px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-5);
          color: var(--muted);
        }

        .hero-title {
          font-size: var(--h1);
          margin-bottom: var(--space-5);
        }

        .hero-subtitle {
          font-size: var(--h3);
          color: var(--muted);
          margin-bottom: var(--space-8);
          max-width: 700px;
          font-weight: 400;
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          margin-bottom: var(--space-12);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: 14px 28px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          transition: var(--transition-base);
        }

        .btn-primary {
          background: var(--text);
          color: var(--bg);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }

        .btn-secondary:hover {
          background: var(--surface);
          border-color: var(--muted);
        }

        .hero-proof-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: var(--space-6);
          padding-top: var(--space-8);
          border-top: 1px solid var(--border);
        }

        .proof-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .proof-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text);
        }

        .proof-label {
          font-size: var(--small);
          color: var(--muted);
        }

        @media (max-width: 768px) {
          .hero-proof-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
