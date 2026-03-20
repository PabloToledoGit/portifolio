import { LogEntry } from '../../data/dashboardSeed';

interface ActivityLogProps {
  logs: LogEntry[];
  emptyMessage: string;
}

const typeStyles: Record<LogEntry['type'], string> = {
  system: 'log-info',
  info: 'log-info',
  success: 'log-success',
  webhook: 'log-webhook',
  payment: 'log-payment',
  queue: 'log-queue',
  user_action: 'log-info',
  processing: 'log-queue',
  output: 'log-success',
  warning: 'log-info',
};

export function ActivityLog({ logs, emptyMessage }: ActivityLogProps) {
  return (
    <div className="activity-log">
      <div className="log-list">
        {logs.length === 0 ? (
          <p className="log-empty">{emptyMessage}</p>
        ) : (
          [...logs].reverse().map((log) => (
            <div key={log.id} className={`log-entry ${typeStyles[log.type]}`}>
              <span className="log-time">
                {log.timestamp.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
              <span className="log-message">{log.message}</span>
            </div>
          ))
        )}
      </div>
      <style>{`
        .activity-log {
          background: var(--surface2);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          overflow: hidden;
        }

        .log-list {
          max-height: 200px;
          overflow-y: auto;
          padding: var(--space-2);
        }

        .log-empty {
          font-size: 0.8125rem;
          color: var(--muted);
          padding: var(--space-4);
          text-align: center;
        }

        .log-entry {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-2) var(--space-3);
          font-size: 0.75rem;
          font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-1);
        }

        .log-entry:last-child {
          margin-bottom: 0;
        }

        .log-time {
          flex-shrink: 0;
          color: var(--muted);
          min-width: 72px;
        }

        .log-message {
          color: var(--text);
          word-break: break-word;
        }

        .log-info .log-message { color: var(--muted); }
        .log-success .log-message { color: var(--accent); }
        .log-webhook .log-message { color: #7dd3fc; }
        .log-payment .log-message { color: #86efac; }
        .log-queue .log-message { color: #fcd34d; }
      `}</style>
    </div>
  );
}
