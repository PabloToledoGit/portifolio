import { useCallback, useRef } from 'react';
import { PURCHASE_FLOW_EVENTS, FLOW_STEPS } from '../data/systemFlows';
import type { FlowStepId } from '../data/systemFlows';
import type { useFlowState } from './useFlowState';
import type { useEventStream } from './useEventStream';
import type { useMetricUpdates } from './useMetricUpdates';

const STEP_DELAY_MS = 450;

export function useSystemSimulation(
  flowState: ReturnType<typeof useFlowState>,
  eventStream: ReturnType<typeof useEventStream>,
  metricUpdates: ReturnType<typeof useMetricUpdates>,
  onComplete?: () => void
) {
  const isRunningRef = useRef(false);

  const runPurchaseFlow = useCallback(async () => {
    if (isRunningRef.current || flowState.status === 'processing') return;
    isRunningRef.current = true;
    flowState.setProcessing();
    eventStream.clear();

    try {
      for (let i = 0; i < PURCHASE_FLOW_EVENTS.length; i++) {
        const ev = PURCHASE_FLOW_EVENTS[i];
        const stepId = ev.stepId as FlowStepId;

        flowState.setStepActive(stepId);
        eventStream.addEvent(stepId, ev.message);

        if (ev.metricDelta) {
          metricUpdates.applyDelta(ev.metricDelta);
        }

        flowState.setStepComplete(stepId);

        if (i < PURCHASE_FLOW_EVENTS.length - 1) {
          await new Promise((r) => setTimeout(r, STEP_DELAY_MS));
        }
      }

      flowState.setSuccess();
      onComplete?.();
    } finally {
      isRunningRef.current = false;
    }
  }, [
    flowState.status,
    flowState.setProcessing,
    flowState.setStepActive,
    flowState.setStepComplete,
    flowState.setSuccess,
    eventStream.addEvent,
    eventStream.clear,
    metricUpdates.applyDelta,
    onComplete,
  ]);

  return {
    runPurchaseFlow,
    steps: FLOW_STEPS,
    eventPayloads: PURCHASE_FLOW_EVENTS,
  };
}
