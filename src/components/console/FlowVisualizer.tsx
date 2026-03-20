import { motion } from 'framer-motion';
import { FLOW_STEPS, type FlowStepId } from '../../data/systemFlows';
import { FlowNode } from './FlowNode';
import { FlowConnector } from './FlowConnector';

interface FlowVisualizerProps {
  activeStep: FlowStepId | null;
  completedSteps: Set<FlowStepId>;
}

export function FlowVisualizer({ activeStep, completedSteps }: FlowVisualizerProps) {
  const total = FLOW_STEPS.length;

  return (
    <div className="flow-visualizer">
      <ol className="flow-visualizer__list">
        {FLOW_STEPS.map((step, index) => {
          const isActive = activeStep === step.id;
          const isCompleted = completedSteps.has(step.id);
          return (
            <li key={step.id} className="flow-visualizer__item">
              <div className="flow-visualizer__rail">
                <motion.span
                  className={`flow-visualizer__dot ${isActive ? 'flow-visualizer__dot--active' : ''} ${isCompleted ? 'flow-visualizer__dot--done' : ''}`}
                  animate={{
                    scale: isActive ? 1.12 : 1,
                  }}
                  transition={{ duration: 0.22 }}
                />
                {index < total - 1 && (
                  <div className="flow-visualizer__rail-connector">
                    <FlowConnector
                      orientation="vertical"
                      isFilled={completedSteps.has(step.id)}
                    />
                  </div>
                )}
              </div>
              <div className="flow-visualizer__stage">
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 1 : isCompleted ? 1 : 0.62 }}
                  transition={{ duration: 0.2 }}
                >
                  <FlowNode
                    step={step}
                    isActive={isActive}
                    isCompleted={isCompleted}
                  />
                </motion.div>
              </div>
            </li>
          );
        })}
      </ol>

      <style>{`
        .flow-visualizer {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-4);
          overflow: hidden;
        }

        .flow-visualizer__list {
          list-style: none;
          margin: 0 auto;
          padding: 0;
          max-width: 520px;
        }

        .flow-visualizer__item {
          display: grid;
          grid-template-columns: 36px minmax(0, 1fr);
          gap: 0 var(--space-3);
          align-items: start;
        }

        .flow-visualizer__rail {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 0.55rem;
        }

        .flow-visualizer__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--surface);
          border: 2px solid var(--border);
          box-sizing: border-box;
        }

        .flow-visualizer__dot--done {
          border-color: rgba(134, 239, 172, 0.65);
          background: rgba(134, 239, 172, 0.18);
        }

        .flow-visualizer__dot--active {
          border-color: var(--accent);
          background: var(--accent);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        }

        .flow-visualizer__rail-connector {
          display: flex;
          justify-content: center;
          flex: 1;
          min-height: 10px;
          padding: 2px 0 6px;
        }

        .flow-visualizer__stage {
          min-width: 0;
          padding-bottom: var(--space-2);
        }

        .flow-visualizer__item:last-child .flow-visualizer__stage {
          padding-bottom: 0;
        }

        .flow-node {
          position: relative;
          display: block;
          width: 100%;
          padding: var(--space-2) var(--space-3);
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          text-align: left;
        }

        .flow-node--active {
          color: var(--text);
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent);
        }

        .flow-node--completed {
          color: var(--text);
          border-color: rgba(134, 239, 172, 0.4);
        }

        .flow-node__pulse {
          position: absolute;
          inset: -4px;
          border-radius: var(--radius-sm);
          margin: -4px;
          background: var(--accent);
          opacity: 0.15;
          pointer-events: none;
        }

        .flow-connector--vertical {
          width: 2px;
          height: 100%;
          min-height: 14px;
          max-height: 28px;
          background: transparent;
          overflow: hidden;
          align-self: stretch;
        }

        .flow-connector--vertical .flow-connector__line {
          width: 100%;
          height: 100%;
          background: var(--muted);
        }

        .flow-connector--vertical.flow-connector--filled .flow-connector__line {
          background: rgba(134, 239, 172, 0.8);
        }
      `}</style>
    </div>
  );
}
