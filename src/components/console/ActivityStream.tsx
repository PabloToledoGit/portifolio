import { AnimatePresence } from 'framer-motion';
import { EventItem } from './EventItem';
import type { LogEntry } from '../../data/dashboardSeed';

interface ActivityStreamProps {
  logs: LogEntry[];
  emptyMessage: string;
  label?: string;
}

export function ActivityStream({ logs, emptyMessage, label = 'Event stream' }: ActivityStreamProps) {
  return (
    <div className="activity-stream">
      <span className="activity-stream__label">{label}</span>
      <div className="activity-stream__container">
        <div className="activity-stream__list">
          {logs.length === 0 ? (
            <p className="activity-stream__empty">{emptyMessage}</p>
          ) : (
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <EventItem key={log.id} log={log} />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
      <style>{`
        .activity-stream {
          flex: 1;
          min-width: 0;
        }

        .activity-stream__label {
          display: block;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-bottom: var(--space-2);
        }

        .activity-stream__container {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: visible;
        }

        /* Altura natural: sem scroll interno; a página rola como um todo */
        .activity-stream__list {
          padding: var(--space-2);
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .activity-stream__empty {
          font-size: 0.8125rem;
          color: var(--muted);
          padding: var(--space-6);
          text-align: center;
        }

        .event-item {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-2) var(--space-3);
          font-size: 0.75rem;
          font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.02);
        }

        .event-item__time {
          flex-shrink: 0;
          color: var(--muted);
          min-width: 72px;
        }

        .event-item__message {
          color: var(--text);
          word-break: break-word;
        }

        .event-item--system .event-item__message { color: var(--muted); }
        .event-item--user .event-item__message { color: #93c5fd; }
        .event-item--payment .event-item__message { color: #86efac; }
        .event-item--webhook .event-item__message { color: #7dd3fc; }
        .event-item--processing .event-item__message { color: #c4b5fd; }
        .event-item--queue .event-item__message { color: #fcd34d; }
        .event-item--output .event-item__message { color: #a5f3fc; }
        .event-item--success .event-item__message { color: #86efac; }
        .event-item--warning .event-item__message { color: #fbbf24; }
      `}</style>
    </div>
  );
}
