import { useState, useCallback, useEffect } from 'react';

const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || '');

export type RuntimeMode = 'live' | 'curated' | null;

export interface RuntimeTrace {
  id: string;
  key: string;
  status: 'checking' | 'ready' | 'curated' | 'unavailable' | 'completed';
  ts: number;
}

function addTrace(traces: RuntimeTrace[], key: string, status: RuntimeTrace['status']): RuntimeTrace[] {
  return [...traces, { id: `trace_${Date.now()}`, key, status, ts: Date.now() }];
}

export function useGuideRuntime(isOpen: boolean) {
  const [traces, setTraces] = useState<RuntimeTrace[]>([]);
  const [mode, setMode] = useState<RuntimeMode>(null);

  const runConnectionFlow = useCallback(async () => {
    setTraces((prev) => addTrace(prev, 'guide_runtime_init', 'checking'));

    await new Promise((r) => setTimeout(r, 280));
    setTraces((prev) => {
      const next = [...prev];
      next[next.length - 1].status = 'ready';
      return addTrace(next, 'guide_runtime_backend', 'checking');
    });

    try {
      const res = await fetch(`${API_BASE}/api/health`);
      const data = await res.json();

      await new Promise((r) => setTimeout(r, 350));
      setTraces((prev) => {
        const next = [...prev];
        next[next.length - 1].status = 'ready';
        return addTrace(next, 'guide_runtime_validation', data.openai ? 'ready' : 'unavailable');
      });

      await new Promise((r) => setTimeout(r, 250));
      setTraces((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last.key === 'guide_runtime_validation') last.status = data.openai ? 'ready' : 'unavailable';
        const flowKey = data.openai ? 'guide_runtime_ready' : 'guide_runtime_curated';
        return addTrace(next, flowKey, data.openai ? 'ready' : 'curated');
      });

      setMode(!!data.openai ? 'live' : 'curated');
    } catch {
      setTraces((prev) => {
        const next = [...prev];
        next[next.length - 1].status = 'unavailable';
        return addTrace(addTrace(next, 'guide_runtime_validation', 'unavailable'), 'guide_runtime_curated', 'curated');
      });
      setMode('curated');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTraces([]);
      setMode(null);
      runConnectionFlow();
    }
  }, [isOpen, runConnectionFlow]);

  const addMessageTrace = useCallback((key: string, status: RuntimeTrace['status']) => {
    setTraces((prev) => addTrace(prev, key, status));
  }, []);

  return { traces, mode, addMessageTrace };
}
