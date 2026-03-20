import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useExperience } from '../../context/ExperienceContext';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKeys } from '../../i18n/translations';
import { ProgressRing } from './ProgressRing';
import { ExperiencePanel } from './ExperiencePanel';
import { Menu, X } from 'lucide-react';

const DRAWER_TRANSITION = { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const };

export function ExperienceIndicator() {
  const { t } = useLanguage();
  const { stage, progressToNext } = useExperience();
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className="experience-indicator-wrapper">
        <button
          type="button"
          className="experience-indicator-trigger"
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-controls="experience-exploration-drawer"
          aria-label={t('exploration.open_panel')}
        >
          <ProgressRing progress={progressToNext} size={28} strokeWidth={2} />
          <span className="experience-indicator__stage">{t(stage.labelKey as TranslationKeys)}</span>
          {isOpen ? <X size={16} className="experience-indicator__icon" /> : <Menu size={16} className="experience-indicator__icon" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="experience-menu-backdrop"
              className="experience-menu-backdrop"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsOpen(false)}
              aria-hidden
            />
            <motion.div
              key="experience-menu-drawer"
              id="experience-exploration-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="experience-drawer-title"
              className="experience-menu-drawer"
              initial={shouldReduceMotion ? false : { x: '-100%' }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? {} : { x: '-100%' }}
              transition={DRAWER_TRANSITION}
            >
              <div className="experience-menu-drawer__inner">
                <div className="experience-menu-drawer__head">
                  <h2 id="experience-drawer-title" className="experience-menu-drawer__title">
                    {t('exploration.panel_title')}
                  </h2>
                  <button
                    type="button"
                    className="experience-menu-drawer__close"
                    onClick={() => setIsOpen(false)}
                    aria-label={t('projects.close')}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="experience-menu-drawer__body">
                  <ExperiencePanel hideHeader />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .experience-indicator-wrapper {
          position: fixed;
          bottom: max(var(--space-5), env(safe-area-inset-bottom, 0px));
          left: max(var(--space-5), env(safe-area-inset-left, 0px));
          z-index: 1104;
          font-size: var(--small);
        }

        .experience-indicator-trigger {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text);
          transition: var(--transition-fast);
          box-shadow: var(--shadow-md);
        }

        .experience-indicator-trigger:hover {
          background: var(--surface2);
          border-color: var(--muted);
        }

        .experience-indicator__stage {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--muted);
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .experience-indicator__icon {
          flex-shrink: 0;
          color: var(--muted);
        }

        .experience-menu-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1102;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.55);
        }

        .experience-menu-drawer {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 1103;
          width: min(400px, 92vw);
          max-width: 100%;
          display: flex;
          flex-direction: column;
          padding-top: env(safe-area-inset-top, 0px);
          padding-bottom: env(safe-area-inset-bottom, 0px);
          padding-left: env(safe-area-inset-left, 0px);
          background: var(--surface);
          border-right: 1px solid var(--border);
          box-shadow: 12px 0 40px rgba(0, 0, 0, 0.35);
        }

        .experience-menu-drawer__inner {
          display: flex;
          flex-direction: column;
          min-height: 0;
          flex: 1;
          overflow: hidden;
        }

        .experience-menu-drawer__head {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-4) var(--space-3);
          border-bottom: 1px solid var(--border);
        }

        .experience-menu-drawer__title {
          margin: 0;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .experience-menu-drawer__close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          margin: -8px -8px -8px 0;
          border: none;
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: color var(--transition-fast), background var(--transition-fast);
        }

        .experience-menu-drawer__close:hover {
          color: var(--text);
          background: rgba(255, 255, 255, 0.06);
        }

        .experience-menu-drawer__body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: var(--space-3) var(--space-4) var(--space-6);
          -webkit-overflow-scrolling: touch;
        }

        /* Painel embutido: sem caixa duplicada, ocupa largura do drawer */
        .experience-menu-drawer__body .experience-panel {
          min-width: unset;
          max-width: none;
          width: 100%;
          max-height: none;
          overflow: visible;
          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
        }

        @media (max-width: 768px) {
          .experience-indicator-wrapper {
            bottom: max(var(--space-4), env(safe-area-inset-bottom, 0px));
            left: max(var(--space-4), env(safe-area-inset-left, 0px));
          }
        }
      `}</style>
    </>
  );
}
