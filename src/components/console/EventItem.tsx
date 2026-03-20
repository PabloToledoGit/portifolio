import { motion } from 'framer-motion';
import type { LogEntry } from '../../data/dashboardSeed';

interface EventItemProps {
  log: LogEntry;
}

const typeStyles: Record<LogEntry['type'], string> = {
  system: 'event-item--system',
  info: 'event-item--system',
  user_action: 'event-item--user',
  payment: 'event-item--payment',
  webhook: 'event-item--webhook',
  processing: 'event-item--processing',
  queue: 'event-item--queue',
  output: 'event-item--output',
  success: 'event-item--success',
  warning: 'event-item--warning',
};

export function EventItem({ log }: EventItemProps) {
  return (
    <motion.div
      className={`event-item ${typeStyles[log.type]}`}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <span className="event-item__time">
        {log.timestamp.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </span>
      <span className="event-item__message">{log.message}</span>
    </motion.div>
  );
}
