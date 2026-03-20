import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
}

export function MetricCard({ label, value, suffix = '', prefix = '' }: MetricCardProps) {
  return (
    <div className="metric-card">
      <span className="metric-label">{label}</span>
      <motion.span
        className="metric-value"
        key={value}
        initial={{ opacity: 0.5, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </motion.span>
    </div>
  );
}
