/**
 * System flow definitions for the Operations Console.
 * Represents real backend flows: user → payment → webhook → processing → output.
 */

export type FlowStepId =
  | 'user_action'
  | 'payment_intent'
  | 'payment_approved'
  | 'webhook_received'
  | 'backend_process'
  | 'queue_enter'
  | 'processing'
  | 'output_generated'
  | 'delivery'
  | 'state_updated';

export interface FlowStep {
  id: FlowStepId;
  label: string;
  shortLabel: string;
  description: string;
}

export const FLOW_STEPS: FlowStep[] = [
  { id: 'user_action', label: 'User Action', shortLabel: 'User', description: 'User initiates action' },
  { id: 'payment_intent', label: 'Payment Intent', shortLabel: 'Intent', description: 'Payment intent created' },
  { id: 'payment_approved', label: 'Payment Approved', shortLabel: 'Payment', description: 'Payment approved' },
  { id: 'webhook_received', label: 'Webhook Received', shortLabel: 'Webhook', description: 'Webhook received' },
  { id: 'backend_process', label: 'Backend Process', shortLabel: 'Backend', description: 'Backend processes event' },
  { id: 'queue_enter', label: 'Queue', shortLabel: 'Queue', description: 'Job enters queue' },
  { id: 'processing', label: 'Processing', shortLabel: 'Process', description: 'Processing begins' },
  { id: 'output_generated', label: 'Output Generated', shortLabel: 'Output', description: 'PDF/report generated' },
  { id: 'delivery', label: 'Delivery', shortLabel: 'Delivery', description: 'Email sent' },
  { id: 'state_updated', label: 'State Updated', shortLabel: 'Done', description: 'System state updated' },
];

export interface FlowEventPayload {
  stepId: FlowStepId;
  message: string;
  metricDelta?: {
    mrr?: number;
    activeUsers?: number;
    conversionsToday?: number;
    reportsGenerated?: number;
    queueProcessed?: number;
  };
}

export const PURCHASE_FLOW_EVENTS: FlowEventPayload[] = [
  { stepId: 'user_action', message: '[Client] Purchase event triggered' },
  { stepId: 'payment_intent', message: '[Payment] Intent created — plan_id: premium_monthly' },
  { stepId: 'payment_approved', message: '[Payment] R$ 97,00 approved — Mercado Pago' },
  { stepId: 'webhook_received', message: '[Webhook] payment.confirmed received' },
  { stepId: 'backend_process', message: '[Backend] Event processed, plan_generation queued' },
  { stepId: 'queue_enter', message: '[Queue] Job plan_generation queued' },
  { stepId: 'processing', message: '[Queue] Job plan_generation processing' },
  { stepId: 'output_generated', message: '[Output] PDF plan generated' },
  { stepId: 'delivery', message: '[Delivery] Plan delivered to user' },
  {
    stepId: 'state_updated',
    message: '[System] State updated — MRR +R$ 97',
    metricDelta: {
      mrr: 97,
      activeUsers: 1,
      conversionsToday: 1,
      reportsGenerated: 1,
      queueProcessed: 1,
    },
  },
];
