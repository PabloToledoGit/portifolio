import { motion, AnimatePresence } from 'framer-motion';

interface SystemFeedbackProps {
  show: boolean;
  message: string;
}

export function SystemFeedback({ show, message }: SystemFeedbackProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="system-feedback"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25 }}
        >
          {message}
          <style>{`
            .system-feedback {
              font-size: 0.8125rem;
              color: #86efac;
              padding: var(--space-2) 0;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
