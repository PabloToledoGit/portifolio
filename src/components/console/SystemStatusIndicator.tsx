import { motion } from 'framer-motion';
import type { SystemStatus } from '../../hooks/useFlowState';

interface SystemStatusIndicatorProps {
  status: SystemStatus;
}

const statusConfig: Record<SystemStatus, { label: string; className: string }> = {
  idle: { label: 'Live', className: 'system-status--idle' },
  processing: { label: 'Processing', className: 'system-status--processing' },
  success: { label: 'Complete', className: 'system-status--success' },
};

export function SystemStatusIndicator({ status }: SystemStatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div className={`system-status ${config.className}`}>
      <motion.span
        className="system-status__dot"
        animate={{
          opacity: status === 'processing' ? [0.6, 1, 0.6] : 1,
          scale: status === 'processing' ? [1, 1.1, 1] : 1,
        }}
        transition={
          status === 'processing'
            ? { duration: 1.2, repeat: Infinity }
            : { duration: 0.2 }
        }
      />
      <span className="system-status__label">{config.label}</span>
      <style>{`
        .system-status {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .system-status__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .system-status--idle .system-status__dot {
          background: #22c55e;
          color: #22c55e;
        }

        .system-status--processing .system-status__dot {
          background: #f59e0b;
          color: #f59e0b;
        }

        .system-status--success .system-status__dot {
          background: #22c55e;
          color: #22c55e;
        }

        .system-status--idle { color: var(--muted); }
        .system-status--processing { color: #f59e0b; }
        .system-status--success { color: #22c55e; }
      `}</style>
    </div>
  );
}
