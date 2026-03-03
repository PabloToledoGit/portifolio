import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Heart, Brain, Rocket } from 'lucide-react';

export const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-text-side"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">01 // {t('about.title')}</span>
            <h2 className="section-title text-balance">{t('about.headline')}</h2>

            <div className="about-paragraphs">
              <p className="about-p">{t('about.p1')}</p>
              <p className="about-p">{t('about.p2')}</p>
              <p className="about-p">{t('about.p3')}</p>
            </div>

            <div className="personal-highlights">
              <div className="p-highlight">
                <MapPin size={18} className="icon" />
                <span>{t('about.item_location')}</span>
              </div>
              <div className="p-highlight">
                <Heart size={18} className="icon" />
                <span>{t('about.item_family')}</span>
              </div>
              <div className="p-highlight">
                <Brain size={18} className="icon" />
                <span>{t('about.item_focus')}</span>
              </div>
              <div className="p-highlight">
                <Rocket size={18} className="icon" />
                <span>{t('about.item_mission')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-side-block"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="now-card premium">
              <div className="now-indicator">
                <span className="status-dot pulse"></span>
                <span className="now-label">{t('about.now_label')}</span>
              </div>
              <h3 className="now-headline">{t('about.now_headline')}</h3>
              <ul className="now-list">
                <li>{t('about.now_item1')}</li>
                <li>{t('about.now_item2')}</li>
                <li>{t('about.now_item3')}</li>
                <li>{t('about.now_item4')}</li>
              </ul>
            </div>

            <div className="image-minimal">
              <div className="minimal-overlay"></div>
              <span className="initials">PT</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          align-items: start;
        }

        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }

        .section-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
          margin-bottom: var(--space-4);
          font-weight: 700;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          line-height: 1.1;
          margin-bottom: var(--space-8);
          letter-spacing: -0.04em;
        }

        .about-paragraphs {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          margin-bottom: var(--space-10);
        }

        .about-p {
          font-size: 1.25rem;
          line-height: 1.7;
          color: var(--muted);
          max-width: 600px;
        }

        .personal-highlights {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-4);
        }

        .p-highlight {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text);
        }

        .p-highlight .icon {
          color: var(--accent);
        }

        .about-side-block {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .now-card.premium {
          padding: var(--space-8);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          position: relative;
        }

        .now-indicator {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }

        .pulse {
          animation: status-pulse 2s infinite;
        }

        @keyframes status-pulse {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }

        .now-label {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .now-headline {
          font-size: 1.25rem;
          margin-bottom: var(--space-4);
          font-weight: 700;
        }

        .now-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .now-list li {
          font-size: var(--small);
          color: var(--muted);
          padding-left: var(--space-4);
          position: relative;
        }

        .now-list li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--accent);
        }

        .image-minimal {
          aspect-ratio: 16/9;
          background: var(--surface2);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .initials {
          font-size: 4rem;
          font-weight: 900;
          opacity: 0.1;
          letter-spacing: -0.05em;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.25rem;
          }
          .about-p {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </section>
  );
};
