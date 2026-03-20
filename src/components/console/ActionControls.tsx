import { motion } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';

interface ActionControlsProps {
  onSimulate: () => void;
  isProcessing: boolean;
  label: string;
  processingLabel: string;
}

export function ActionControls({
  onSimulate,
  isProcessing,
  label,
  processingLabel,
}: ActionControlsProps) {
  return (
    <div className="action-controls">
      <motion.button
        className="action-controls__btn"
        onClick={onSimulate}
        disabled={isProcessing}
        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
      >
        {isProcessing ? (
          <>
            <Loader2 size={18} className="action-controls__icon--spin" />
            <span>{processingLabel}</span>
          </>
        ) : (
          <>
            <Play size={18} />
            <span>{label}</span>
          </>
        )}
      </motion.button>
      <style>{`
        .action-controls__btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-5);
          background: var(--accent);
          color: var(--bg);
          border: none;
          border-radius: var(--radius-md);
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .action-controls__btn:hover:not(:disabled) {
          opacity: 0.92;
        }

        .action-controls__btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .action-controls__icon--spin {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
