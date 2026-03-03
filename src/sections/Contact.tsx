import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const Contact = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const email = 'pablotoledoemail@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <div className="contact-panel">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">04 // {t('contact.title')}</span>
            <h2 className="contact-title text-balance">{t('contact.headline')}</h2>
            <p className="contact-subtitle">{t('contact.subtitle')}</p>
          </motion.div>

          <div className="contact-actions">
            <button className="contact-btn email-btn" onClick={copyEmail}>
              <Mail size={24} />
              <div className="btn-text">
                <span className="label">E-mail</span>
                <span className="value">{email}</span>
              </div>
              {copied ? <Check className="copy-icon success" /> : <Copy className="copy-icon" />}
            </button>

            <a href="https://wa.me/5524998630185" target="_blank" rel="noopener noreferrer" className="contact-btn whatsapp-btn">
              <MessageCircle size={24} />
              <div className="btn-text">
                <span className="label">WhatsApp</span>
                <span className="value">{t('contact.whatsapp')}</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .contact-panel {
          padding: var(--space-12);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-10);
          align-items: center;
          text-align: center;
        }

        @media (min-width: 992px) {
          .contact-panel {
            flex-direction: row;
            text-align: left;
            justify-content: space-between;
          }
        }

        .contact-title {
          font-size: var(--h2);
          margin-bottom: var(--space-2);
        }

        .contact-subtitle {
          font-size: 1.25rem;
          color: var(--muted);
        }

        .contact-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          width: 100%;
          max-width: 400px;
        }

        .contact-btn {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-5);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          transition: var(--transition-base);
          position: relative;
          text-align: left;
          width: 100%;
        }

        .contact-btn:hover {
          border-color: var(--muted);
          background: var(--bg);
        }

        .btn-text {
          display: flex;
          flex-direction: column;
        }

        .btn-text .label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          font-weight: 800;
        }

        .btn-text .value {
          font-size: 1rem;
          font-weight: 600;
        }

        .copy-icon {
          position: absolute;
          right: var(--space-5);
          color: var(--muted);
        }

        .copy-icon.success {
          color: #4ade80;
        }

        .whatsapp-btn {
          background: rgba(37, 211, 102, 0.05);
          border-color: rgba(37, 211, 102, 0.2);
        }

        .whatsapp-btn:hover {
          background: rgba(37, 211, 102, 0.1);
          border-color: rgba(37, 211, 102, 0.4);
        }
      `}</style>
    </section>
  );
};
