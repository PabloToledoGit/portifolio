import { useState, useCallback } from 'react';
import type { FlowStepId } from '../data/systemFlows';

export type SystemStatus = 'idle' | 'processing' | 'success';

export function useFlowState() {
  const [status, setStatus] = useState<SystemStatus>('idle');
  const [activeStep, setActiveStep] = useState<FlowStepId | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<FlowStepId>>(new Set());

  const setProcessing = useCallback(() => {
    setStatus('processing');
    setActiveStep(null);
    setCompletedSteps(new Set());
  }, []);

  const setStepActive = useCallback((stepId: FlowStepId) => {
    setActiveStep(stepId);
  }, []);

  const setStepComplete = useCallback((stepId: FlowStepId) => {
    setCompletedSteps((prev) => new Set([...prev, stepId]));
    setActiveStep(null);
  }, []);

  const setSuccess = useCallback(() => {
    setStatus('success');
    setActiveStep(null);
    setTimeout(() => setStatus('idle'), 2000);
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setActiveStep(null);
    setCompletedSteps(new Set());
  }, []);

  return {
    status,
    activeStep,
    completedSteps,
    setProcessing,
    setStepActive,
    setStepComplete,
    setSuccess,
    reset,
  };
}
