import { useLanguage } from '../../i18n/LanguageContext';
import type { ChapterPhaseType } from '../../data/storyChapters';
import { motion } from 'framer-motion';

interface StoryMilestoneBadgeProps {
  phaseType: ChapterPhaseType;
}

const phaseTypeKeys: Record<ChapterPhaseType, string> = {
  exposure: 'story.phase_type.exposure',
  operations: 'story.phase_type.operations',
  systems: 'story.phase_type.systems',
  automation: 'story.phase_type.automation',
  fullstack: 'story.phase_type.fullstack',
  saas: 'story.phase_type.saas',
  backend: 'story.phase_type.backend',
  ai: 'story.phase_type.ai',
  ecosystem: 'story.phase_type.ecosystem',
  product: 'story.phase_type.product',
  professional: 'story.phase_type.professional',
};

export const StoryMilestoneBadge = ({ phaseType }: StoryMilestoneBadgeProps) => {
  const { t } = useLanguage();
  const key = phaseTypeKeys[phaseType];

  return (
    <motion.span
      className="story-milestone-badge"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {t(key as 'story.phase_type.exposure')}
      <style>{`
        .story-milestone-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted);
          padding: 4px 10px;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
        }
      `}</style>
    </motion.span>
  );
};
