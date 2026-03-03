import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { TrendingUp, Layout, Zap } from 'lucide-react';

export const Highlights = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: <TrendingUp size={32} />,
      title: t('highlights.card_business'),
      description: t('highlights.business'),
      metric: '+R$ 150k',
    },
    {
      icon: <Layout size={32} />,
      title: t('highlights.card_scale'),
      description: t('highlights.community'),
      metric: t('highlights.metric_scale'),
    },
    {
      icon: <Zap size={32} />,
      title: t('highlights.card_leadership'),
      description: t('highlights.leadership'),
      metric: t('highlights.metric_experts'),
    },
  ];

  return (
    <section className="highlights section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('highlights.title')}</h2>
          <p className="section-subtitle">{t('highlights.subtitle')}</p>
        </div>

        <div className="highlights-grid">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="highlight-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className="highlight-icon">{item.icon}</div>
              <div className="highlight-content">
                <span className="highlight-metric">{item.metric}</span>
                <h3 className="highlight-title">{item.title}</h3>
                <p className="highlight-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .section-header {
          margin-bottom: var(--space-10);
        }

        .section-title {
          font-size: var(--h2);
          margin-bottom: var(--space-2);
        }

        .section-subtitle {
          font-size: var(--body);
          color: var(--muted);
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-6);
        }

        .highlight-card {
          padding: var(--space-8);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          transition: var(--transition-base);
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .highlight-card:hover {
          border-color: var(--muted);
          background: var(--surface2);
          transform: translateY(-4px);
        }

        .highlight-icon {
          color: var(--accent);
          opacity: 0.8;
        }

        .highlight-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .highlight-metric {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted);
        }

        .highlight-title {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .highlight-description {
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};
