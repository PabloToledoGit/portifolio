import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

const WA_NUMBER = '5524998630185';
const EMAIL = 'pablotoledoemail@gmail.com';

const itemReveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export const Contact = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const waPrefill = encodeURIComponent(t('contact.whatsapp_prefill'));
  const waUrl = `https://wa.me/${WA_NUMBER}`;
  const waProjectUrl = `${waUrl}?text=${waPrefill}`;

  const copyEmail = () => {
    void navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="contact__glow" aria-hidden />
      <div className="container">
        <div className="contact__shell">
          <header className="contact__header">
            <motion.span
              className="contact__eyebrow section-label"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
            >
              05 // {t('contact.eyebrow')}
            </motion.span>
            <motion.h2
              className="contact__headline text-balance"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              {t('contact.headline')}
            </motion.h2>
            <motion.p
              className="contact__lead"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('contact.lead')}
            </motion.p>
            <motion.p
              className="contact__bridge"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14 }}
            >
              <Sparkles size={14} className="contact__bridge-icon" aria-hidden />
              {t('contact.bridge')}
            </motion.p>
          </header>

          <div className="contact__main">
            <motion.div
              className="contact__value"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
            >
              <motion.div className="contact__value-block" variants={itemReveal}>
                <h3 className="contact__value-title">{t('contact.value_title')}</h3>
                <p className="contact__value-text">{t('contact.value_body')}</p>
              </motion.div>
              <motion.div className="contact__value-block" variants={itemReveal}>
                <h3 className="contact__value-title">{t('contact.work_title')}</h3>
                <p className="contact__value-text">{t('contact.work_body')}</p>
              </motion.div>
              <motion.p className="contact__value-highlight" variants={itemReveal}>
                {t('contact.projects_line')}
              </motion.p>
              <motion.div className="contact__availability" variants={itemReveal}>
                {t('contact.availability')}
              </motion.div>
            </motion.div>

            <motion.div
              className="contact__actions"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
              }}
            >
              <motion.article
                className="contact-card contact-card--email"
                variants={itemReveal}
              >
                <div className="contact-card__top">
                  <span className="contact-card__icon-wrap" aria-hidden>
                    <Mail size={22} strokeWidth={1.75} />
                  </span>
                  <div className="contact-card__meta">
                    <span className="contact-card__label">{t('contact.email_label')}</span>
                    <span className="contact-card__value">{EMAIL}</span>
                  </div>
                </div>
                <div className="contact-card__footer">
                  <motion.button
                    type="button"
                    className="contact-card__btn contact-card__btn--ghost"
                    onClick={copyEmail}
                    whileTap={{ scale: 0.98 }}
                  >
                    {copied ? <Check size={16} className="contact-card__btn-icon contact-card__btn-icon--ok" /> : <Copy size={16} className="contact-card__btn-icon" />}
                    {copied ? t('contact.copied') : t('contact.email_copy')}
                  </motion.button>
                  <motion.a
                    className="contact-card__btn contact-card__btn--primary"
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(language === 'pt' ? 'Contato via portfólio' : 'Portfolio contact')}`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('contact.email_send')}
                    <ArrowUpRight size={16} />
                  </motion.a>
                </div>
              </motion.article>

              <motion.a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card contact-card--wa"
                variants={itemReveal}
              >
                <div className="contact-card__top">
                  <span className="contact-card__icon-wrap contact-card__icon-wrap--wa" aria-hidden>
                    <MessageCircle size={22} strokeWidth={1.75} />
                  </span>
                  <div className="contact-card__meta">
                    <span className="contact-card__label">{t('contact.whatsapp_label')}</span>
                    <p className="contact-card__desc">{t('contact.whatsapp_desc')}</p>
                  </div>
                </div>
                <span className="contact-card__cta">
                  {t('contact.whatsapp_cta')}
                  <ArrowUpRight size={16} />
                </span>
              </motion.a>

              <motion.a
                href={waProjectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card contact-card--project"
                variants={itemReveal}
              >
                <div className="contact-card__top">
                  <span className="contact-card__icon-wrap contact-card__icon-wrap--accent" aria-hidden>
                    <ArrowUpRight size={22} strokeWidth={1.75} />
                  </span>
                  <div className="contact-card__meta">
                    <span className="contact-card__label">{t('contact.project_card_title')}</span>
                    <p className="contact-card__desc">{t('contact.project_card_desc')}</p>
                  </div>
                </div>
                <span className="contact-card__cta contact-card__cta--emphasis">
                  {t('contact.project_card_cta')}
                  <ArrowUpRight size={16} />
                </span>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="contact__trust"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <span className="contact__trust-item">{t('contact.trust_1')}</span>
            <span className="contact__trust-item">{t('contact.trust_2')}</span>
            <span className="contact__trust-item">{t('contact.trust_3')}</span>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact {
          position: relative;
          overflow: hidden;
          background: var(--surface);
          border-top: 1px solid var(--border);
        }

        .contact__glow {
          pointer-events: none;
          position: absolute;
          inset: -20% -10% auto;
          height: 55%;
          background: radial-gradient(ellipse 70% 80% at 50% 0%, rgba(255, 255, 255, 0.06), transparent 65%);
        }

        .contact__shell {
          position: relative;
          z-index: 1;
          max-width: 1120px;
          margin: 0 auto;
        }

        .contact__header {
          text-align: center;
          max-width: 44rem;
          margin: 0 auto var(--space-12);
        }

        .contact__eyebrow {
          display: block;
          margin-bottom: var(--space-3);
        }

        .contact__headline {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0 0 var(--space-4);
        }

        .contact__lead {
          font-size: clamp(1rem, 1.2vw, 1.125rem);
          line-height: 1.65;
          color: var(--muted);
          margin: 0 0 var(--space-4);
        }

        .contact__bridge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text);
          padding: var(--space-2) var(--space-4);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
        }

        .contact__bridge-icon {
          flex-shrink: 0;
          opacity: 0.85;
        }

        .contact__main {
          display: grid;
          gap: var(--space-10);
          align-items: start;
        }

        @media (min-width: 900px) {
          .contact__header {
            text-align: left;
            margin-left: 0;
            margin-right: 0;
            max-width: 36rem;
          }

          .contact__main {
            grid-template-columns: minmax(0, 1fr) minmax(280px, 380px);
            gap: var(--space-12);
            align-items: stretch;
          }
        }

        .contact__value {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .contact__value-block {
          padding-bottom: var(--space-5);
          border-bottom: 1px solid var(--border);
        }

        .contact__value-block:last-of-type {
          border-bottom: none;
          padding-bottom: 0;
        }

        .contact__value-title {
          font-size: 0.6875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          margin: 0 0 var(--space-2);
        }

        .contact__value-text {
          margin: 0;
          font-size: 1rem;
          line-height: 1.65;
          color: var(--text);
        }

        .contact__value-highlight {
          margin: 0;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--muted);
          padding: var(--space-4);
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
        }

        .contact__availability {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--muted);
          padding: var(--space-3) var(--space-4);
          border-left: 2px solid var(--accent);
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.04), transparent);
        }

        .contact__actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .contact-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          padding: var(--space-5);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background: var(--surface2);
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          text-align: left;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.2s ease;
        }

        .contact-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.2);
        }

        .contact-card--email {
          cursor: default;
        }

        .contact-card__top {
          display: flex;
          gap: var(--space-4);
          align-items: flex-start;
        }

        .contact-card__icon-wrap {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border);
          color: var(--text);
        }

        .contact-card__icon-wrap--wa {
          background: rgba(37, 211, 102, 0.08);
          border-color: rgba(37, 211, 102, 0.25);
          color: #4ade80;
        }

        .contact-card__icon-wrap--accent {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent);
          color: var(--accent);
        }

        .contact-card__meta {
          min-width: 0;
          flex: 1;
        }

        .contact-card__label {
          display: block;
          font-size: 0.625rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          margin-bottom: var(--space-1);
        }

        .contact-card__value {
          font-size: 0.9375rem;
          font-weight: 600;
          word-break: break-all;
        }

        .contact-card__desc {
          margin: 0;
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--muted);
        }

        .contact-card__footer {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          padding-top: var(--space-1);
        }

        .contact-card__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          font-size: 0.8125rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: opacity var(--transition-fast), background var(--transition-fast);
        }

        .contact-card__btn--ghost {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--muted);
        }

        .contact-card__btn--ghost:hover {
          color: var(--text);
          border-color: var(--muted);
          background: rgba(255, 255, 255, 0.04);
        }

        .contact-card__btn--primary {
          flex: 1;
          min-width: 140px;
          background: var(--accent);
          color: var(--bg);
        }

        .contact-card__btn--primary:hover {
          opacity: 0.92;
        }

        .contact-card__btn-icon--ok {
          color: #4ade80;
        }

        .contact-card__cta {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text);
          margin-top: auto;
        }

        .contact-card__cta--emphasis {
          color: var(--accent);
        }

        .contact-card--wa:hover .contact-card__cta,
        .contact-card--project:hover .contact-card__cta {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .contact-card--wa {
          border-color: rgba(37, 211, 102, 0.2);
        }

        .contact-card--wa:hover {
          border-color: rgba(37, 211, 102, 0.45);
        }

        .contact-card--project {
          border-color: rgba(255, 255, 255, 0.15);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), var(--surface2));
        }

        .contact-card--project:hover {
          border-color: rgba(255, 255, 255, 0.28);
        }

        .contact__trust {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          justify-content: center;
          margin-top: var(--space-12);
          padding-top: var(--space-8);
          border-top: 1px solid var(--border);
        }

        @media (min-width: 900px) {
          .contact__trust {
            justify-content: flex-start;
          }
        }

        .contact__trust-item {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.02);
        }

        @media (max-width: 899px) {
          .contact__header {
            text-align: center;
          }

          .contact__bridge {
            margin-left: auto;
            margin-right: auto;
          }

          .contact-card__footer {
            flex-direction: column;
          }

          .contact-card__btn--primary {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
