import { useState, useCallback } from 'react';
import {
  initialDashboardMetrics,
  type DashboardMetrics,
  type MetricDelta,
} from '../data/dashboardSeed';

export function useMetricUpdates() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({ ...initialDashboardMetrics });
  const [deltas, setDeltas] = useState<Partial<Record<keyof DashboardMetrics, MetricDelta>>>({});

  const applyDelta = useCallback((delta: Partial<DashboardMetrics>) => {
    setMetrics((prev) => {
      const next = { ...prev };
      const newDeltas: Partial<Record<keyof DashboardMetrics, MetricDelta>> = {};
      for (const key of Object.keys(delta) as (keyof DashboardMetrics)[]) {
        const val = delta[key];
        if (val != null && val > 0) {
          next[key] = prev[key] + val;
          newDeltas[key] = { metricKey: key, value: val, direction: 'up' };
        }
      }
      setDeltas((d) => ({ ...d, ...newDeltas }));
      setTimeout(() => setDeltas({}), 2500);
      return next;
    });
  }, []);

  const clearDelta = useCallback((key: keyof DashboardMetrics) => {
    setDeltas((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  return { metrics, deltas, applyDelta, clearDelta };
}
