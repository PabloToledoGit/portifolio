import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKeys } from '../i18n/translations';
import { useExperience } from '../context/ExperienceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { timelinePhases } from '../data/timelinePhases';
import { ChevronRight } from 'lucide-react';

export const StoryTimeline = () => {
  const { t } = useLanguage();
  const { trackInteraction, state } = useExperience();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasRecordedVisit = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || hasRecordedVisit.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          hasRecordedVisit.current = true;
          trackInteraction('visit_timeline');
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [trackInteraction]);

  const handleSelectPhase = (phaseId: string) => {
    const wasSelected = selectedId === phaseId;
    setSelectedId(wasSelected ? null : phaseId);
    if (!wasSelected && !state.timelinePhasesVisited.has(phaseId)) {
      trackInteraction('expand_timeline_phase', phaseId);
    }
  };

  const selectedPhase = selectedId ? timelinePhases.find((p) => p.id === selectedId) : null;

  return (
    <section id="trajectory" className="story-timeline section-padding" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">02 // {t('timeline.title')}</span>
          <h2 className="section-title">{t('timeline.subtitle')}</h2>
        </div>

        <div className="story-timeline-layout">
          <div className="story-phases">
            {timelinePhases.map((phase, index) => (
              <motion.button
                key={phase.id}
                className={`story-phase-trigger ${selectedId === phase.id ? 'selected' : ''}`}
                onClick={() => handleSelectPhase(phase.id)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <span className="phase-year">{phase.yearLabelKey ? t(phase.yearLabelKey as TranslationKeys) : phase.yearLabel}</span>
                <span className="phase-title">{t(phase.titleKey as TranslationKeys)}</span>
                <ChevronRight
                  size={18}
                  className={`phase-chevron ${selectedId === phase.id ? 'open' : ''}`}
                />
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedPhase ? (
              <motion.div
                key={selectedPhase.id}
                className="story-detail-panel"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="detail-title">{t(selectedPhase.titleKey as TranslationKeys)}</h3>
                {selectedPhase.yearLabelKey && (
                  <span className="detail-year">{t(selectedPhase.yearLabelKey as TranslationKeys)}</span>
                )}
                <p className="detail-summary">{t(selectedPhase.summaryKey as TranslationKeys)}</p>

                <div className="detail-sections">
                  <div className="detail-block">
                    <span className="detail-label">{t('timeline.label_context')}</span>
                    <p>{t(selectedPhase.detailContextKey as TranslationKeys)}</p>
                  </div>
                  <div className="detail-block">
                    <span className="detail-label">{t('timeline.label_challenge')}</span>
                    <p>{t(selectedPhase.detailChallengeKey as TranslationKeys)}</p>
                  </div>
                  <div className="detail-block">
                    <span className="detail-label">{t('timeline.label_evolution')}</span>
                    <p>{t(selectedPhase.detailEvolutionKey as TranslationKeys)}</p>
                  </div>
                </div>

                <div className="detail-tech">
                  {selectedPhase.tech.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="story-detail-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>{t('timeline.subtitle')}</p>
                <span className="placeholder-hint">{t('timeline.placeholder_hint')}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .story-timeline-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-8);
          margin-top: var(--space-10);
        }

        @media (min-width: 992px) {
          .story-timeline-layout {
            grid-template-columns: 320px 1fr;
            align-items: start;
          }
        }

        .story-phases {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .story-phase-trigger {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          text-align: left;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text);
          transition: var(--transition-base);
        }

        .story-phase-trigger:hover {
          background: var(--surface2);
          border-color: var(--muted);
        }

        .story-phase-trigger.selected {
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.03);
        }

        .phase-year {
          flex-shrink: 0;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          min-width: 48px;
        }

        .phase-title {
          flex: 1;
          font-size: 0.9375rem;
          font-weight: 600;
        }

        .phase-chevron {
          flex-shrink: 0;
          color: var(--muted);
          transition: transform 0.2s;
        }

        .phase-chevron.open {
          transform: rotate(90deg);
          color: var(--accent);
        }

        .story-detail-panel {
          padding: var(--space-8);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          min-height: 320px;
        }

        .detail-title {
          font-size: 1.5rem;
          margin-bottom: var(--space-2);
          font-weight: 700;
        }

        .detail-year {
          display: block;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-bottom: var(--space-2);
        }

        .detail-summary {
          font-size: 1rem;
          color: var(--muted);
          margin-bottom: var(--space-6);
          line-height: 1.6;
        }

        .detail-sections {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .detail-block {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .detail-label {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .detail-block p {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text);
          max-width: none;
        }

        .detail-tech {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .tech-tag {
          font-size: 0.75rem;
          font-weight: 600;
          padding: var(--space-1) var(--space-2);
          background: var(--surface2);
          border-radius: var(--radius-sm);
          color: var(--muted);
        }

        .story-detail-placeholder {
          padding: var(--space-8);
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: var(--radius-lg);
          min-height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          color: var(--muted);
          font-size: 0.9375rem;
        }

        .placeholder-hint {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .story-detail-panel,
          .story-detail-placeholder {
            min-height: 260px;
          }
        }
      `}</style>
    </section>
  );
};
