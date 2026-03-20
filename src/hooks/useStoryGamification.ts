import { useEffect, useRef } from 'react';
import { useExperience } from '../context/ExperienceContext';

export function useStoryGamification(
  sectionRef: React.RefObject<HTMLElement | null>,
  onChapterExpand?: (chapterId: string) => void
) {
  const { trackInteraction, state } = useExperience();
  const hasRecordedVisit = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || hasRecordedVisit.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          hasRecordedVisit.current = true;
          trackInteraction('visit_timeline');
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [sectionRef, trackInteraction]);

  const recordChapterExpand = (chapterId: string) => {
    if (!state.timelinePhasesVisited.has(chapterId)) {
      trackInteraction('expand_timeline_phase', chapterId);
      onChapterExpand?.(chapterId);
    }
  };

  return {
    recordChapterExpand,
    timelinePhasesVisited: state.timelinePhasesVisited,
  };
}
