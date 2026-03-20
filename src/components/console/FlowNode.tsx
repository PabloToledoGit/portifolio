import { motion } from 'framer-motion';
import type { FlowStep } from '../../data/systemFlows';

interface FlowNodeProps {
  step: FlowStep;
  isActive: boolean;
  isCompleted: boolean;
}

export function FlowNode({ step, isActive, isCompleted }: FlowNodeProps) {
  return (
    <motion.div
      className={`flow-node ${isActive ? 'flow-node--active' : ''} ${isCompleted ? 'flow-node--completed' : ''}`}
      animate={{
        scale: isActive ? 1.05 : 1,
        opacity: isActive ? 1 : isCompleted ? 0.9 : 0.6,
      }}
      transition={{ duration: 0.25 }}
    >
      <span className="flow-node__label">{step.shortLabel}</span>
      {isActive && (
        <motion.span
          className="flow-node__pulse"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
