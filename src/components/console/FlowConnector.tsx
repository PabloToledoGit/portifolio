import { motion } from 'framer-motion';

interface FlowConnectorProps {
  isFilled: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export function FlowConnector({ isFilled, orientation = 'horizontal' }: FlowConnectorProps) {
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={`flow-connector ${isVertical ? 'flow-connector--vertical' : ''} ${isFilled ? 'flow-connector--filled' : ''}`}
    >
      <motion.div
        className="flow-connector__line"
        initial={false}
        animate={
          isVertical
            ? { scaleY: isFilled ? 1 : 0 }
            : { scaleX: isFilled ? 1 : 0 }
        }
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: isVertical ? 'top' : 'left' }}
      />
    </div>
  );
}
