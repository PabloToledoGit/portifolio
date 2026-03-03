import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';

export const Experience = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      id: 'sels_jr',
      role: t('experience.sels_jr.role'),
      company: t('experience.sels_jr.company'),
      period: t('experience.sels_jr.period'),
      description: t('experience.sels_jr.description'),
    },
    {
      id: 'sels_freelance',
      role: t('experience.sels_freelance.role'),
      company: t('experience.sels_freelance.company'),
      period: t('experience.sels_freelance.period'),
      description: t('experience.sels_freelance.description'),
    },
    {
      id: 'nutrify',
      role: t('experience.nutrify.role'),
      company: t('experience.nutrify.company'),
      period: t('experience.nutrify.period'),
      description: t('experience.nutrify.description'),
    },
    {
      id: 'sarton',
      role: t('experience.sarton.role'),
      company: t('experience.sarton.company'),
      period: t('experience.sarton.period'),
      description: t('experience.sarton.description'),
    },
  ];

  return (
    <section id="experience" className="experience section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-label">02 // {t('experience.title')}</span>
          <h2 className="section-title">{t('experience.subtitle')}</h2>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="exp-period">{exp.period}</span>
                <div className="exp-header">
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-company">{exp.company}</span>
                </div>
                <p className="exp-description">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .timeline {
          position: relative;
          max-width: 800px;
          margin-top: var(--space-10);
          padding-left: var(--space-8);
          border-left: 1px solid var(--border);
        }

        .timeline-item {
          position: relative;
          padding-bottom: var(--space-12);
        }

        .timeline-item:last-child {
          padding-bottom: 0;
        }

        .timeline-marker {
          position: absolute;
          left: calc(-1 * var(--space-8) - 5px);
          top: 8px;
          width: 9px;
          height: 9px;
          background: var(--text);
          border-radius: 50%;
          border: 2px solid var(--bg);
          z-index: 2;
        }

        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .exp-period {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .exp-header {
          display: flex;
          flex-direction: column;
          margin-bottom: var(--space-2);
        }

        .exp-role {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .exp-company {
          font-size: 1rem;
          color: var(--muted);
          font-weight: 500;
        }

        .exp-description {
          line-height: 1.6;
          color: var(--muted);
        }
      `}</style>
    </section>
  );
};
