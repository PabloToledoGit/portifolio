import { useState, useCallback } from 'react';
import { createLogEntry, type LogEntry, type LogEventType } from '../data/dashboardSeed';

const MAX_LOGS = 80;

const stepToEventType: Record<string, LogEventType> = {
  user_action: 'user_action',
  payment_intent: 'payment',
  payment_approved: 'payment',
  webhook_received: 'webhook',
  backend_process: 'processing',
  queue_enter: 'queue',
  processing: 'queue',
  output_generated: 'output',
  delivery: 'success',
  state_updated: 'success',
};

export function useEventStream() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [sequence, setSequence] = useState(0);

  const addEvent = useCallback(
    (stepId: string, message: string) => {
      const type = stepToEventType[stepId] ?? 'system';
      const nextSeq = sequence + 1;
      setSequence(nextSeq);
      const entry = createLogEntry(type, message, undefined, nextSeq);
      setLogs((prev) => [...prev, entry].slice(-MAX_LOGS));
      return entry;
    },
    [sequence]
  );

  const clear = useCallback(() => {
    setLogs([]);
    setSequence(0);
  }, []);

  return { logs, addEvent, clear };
}
