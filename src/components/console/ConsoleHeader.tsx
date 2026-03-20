import { SystemStatusIndicator } from './SystemStatusIndicator';
import type { SystemStatus } from '../../hooks/useFlowState';

interface ConsoleHeaderProps {
  sectionLabel: string;
  title: string;
  description: string;
  status: SystemStatus;
}

export function ConsoleHeader({
  sectionLabel,
  title,
  description,
  status,
}: ConsoleHeaderProps) {
  return (
    <div className="console-header">
      <div className="console-header__top">
        <span className="console-header__label">{sectionLabel}</span>
        <SystemStatusIndicator status={status} />
      </div>
      <h2 className="console-header__title">{title}</h2>
      <p className="console-header__description">{description}</p>
      <style>{`
        .console-header {
          margin-bottom: var(--space-8);
        }

        .console-header__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-2);
        }

        .console-header__label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }

        .console-header__title {
          font-size: var(--h2);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin: 0 0 var(--space-2);
        }

        .console-header__description {
          font-size: var(--body);
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
          max-width: 42ch;
        }
      `}</style>
    </div>
  );
}
