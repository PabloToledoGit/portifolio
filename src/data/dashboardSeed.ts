export interface DashboardMetrics {
  mrr: number;
  activeUsers: number;
  conversionsToday: number;
  reportsGenerated: number;
  queueProcessed: number;
}

export const initialDashboardMetrics: DashboardMetrics = {
  mrr: 12450,
  activeUsers: 342,
  conversionsToday: 18,
  reportsGenerated: 1247,
  queueProcessed: 89,
};

export type LogEventType =
  | 'system'
  | 'info' // alias for system, backward compat
  | 'user_action'
  | 'payment'
  | 'webhook'
  | 'processing'
  | 'queue'
  | 'output'
  | 'success'
  | 'warning';

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: LogEventType;
  message: string;
  tag?: string;
  sequence?: number;
}

export const createLogEntry = (
  type: LogEntry['type'],
  message: string,
  tag?: string,
  sequence?: number
): LogEntry => ({
  id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
  timestamp: new Date(),
  type,
  message,
  tag,
  sequence,
});

export interface MetricDelta {
  metricKey: keyof DashboardMetrics;
  value: number;
  direction: 'up' | 'down';
}
