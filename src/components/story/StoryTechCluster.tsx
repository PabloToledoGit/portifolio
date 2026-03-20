import { motion } from 'framer-motion';

interface StoryTechClusterProps {
  tech: string[];
}

export const StoryTechCluster = ({ tech }: StoryTechClusterProps) => {
  return (
    <div className="story-tech-cluster">
      {tech.map((item, i) => (
        <motion.span
          key={item}
          className="story-tech-tag"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.03, duration: 0.25 }}
        >
          {item}
        </motion.span>
      ))}
      <style>{`
        .story-tech-cluster {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .story-tech-tag {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 6px 12px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--muted);
          letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
};
