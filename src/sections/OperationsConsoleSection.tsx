import { useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useExperience } from '../context/ExperienceContext';
import { useFlowState } from '../hooks/useFlowState';
import { useEventStream } from '../hooks/useEventStream';
import { useMetricUpdates } from '../hooks/useMetricUpdates';
import { useSystemSimulation } from '../hooks/useSystemSimulation';
import { ConsoleHeader } from '../components/console/ConsoleHeader';
import { FlowVisualizer } from '../components/console/FlowVisualizer';
import { ActivityStream } from '../components/console/ActivityStream';
import { ActionControls } from '../components/console/ActionControls';
import { SystemFeedback } from '../components/console/SystemFeedback';
import { ConsoleInsights } from '../components/console/ConsoleInsights';

export function OperationsConsoleSection() {
  const { t } = useLanguage();
  const { trackInteraction } = useExperience();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRecordedVisit = useRef(false);

  const flowState = useFlowState();
  const eventStream = useEventStream();
  const metricUpdates = useMetricUpdates();

  const onFlowComplete = useCallback(() => {
    trackInteraction('simulate_dashboard');
  }, [trackInteraction]);

  const simulation = useSystemSimulation(
    flowState,
    eventStream,
    metricUpdates,
    onFlowComplete
  );

  useEffect(() => {
    if (!sectionRef.current || hasRecordedVisit.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          hasRecordedVisit.current = true;
          trackInteraction('visit_console');
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [trackInteraction]);

  return (
    <section id="console" className="operations-console section-padding" ref={sectionRef}>
      <div className="container">
        <ConsoleHeader
          sectionLabel={`04 // ${t('console.title')}`}
          title={t('console.display_title')}
          description={t('console.description')}
          status={flowState.status}
        />

        <div className="operations-console__main">
          <div className="operations-console__overview">
            <div className="operations-console__flow">
              <span className="operations-console__flow-label">
                {t('console.flow_label')}
              </span>
              <FlowVisualizer
                activeStep={flowState.activeStep}
                completedSteps={flowState.completedSteps}
              />
            </div>

            <div className="operations-console__actions">
              <ActionControls
                onSimulate={simulation.runPurchaseFlow}
                isProcessing={flowState.status === 'processing'}
                label={t('console.simulate_flow')}
                processingLabel={t('console.simulating')}
              />
              <SystemFeedback
                show={flowState.status === 'success'}
                message={t('console.flow_complete')}
              />
            </div>
          </div>

          <div className="operations-console__stream">
            <ActivityStream
              logs={eventStream.logs}
              emptyMessage={t('console.empty_log')}
              label={t('console.activity_log')}
            />
          </div>
        </div>

        <ConsoleInsights />
      </div>

      <style>{`
        .operations-console {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .operations-console__main {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
        }

        @media (min-width: 900px) {
          .operations-console__main {
            flex-direction: row;
            align-items: flex-start;
            gap: var(--space-8);
          }

          .operations-console__overview {
            flex: 1;
            min-width: 0;
          }

          .operations-console__stream {
            width: 380px;
            flex-shrink: 0;
          }
        }

        .operations-console__flow {
          margin-bottom: var(--space-6);
        }

        .operations-console__flow-label {
          display: block;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-bottom: var(--space-2);
        }

        .operations-console__actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
      `}</style>
    </section>
  );
}
