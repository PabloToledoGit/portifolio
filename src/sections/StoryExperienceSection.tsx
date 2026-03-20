import { useRef, useCallback } from 'react';
import { useExperience } from '../context/ExperienceContext';
import { storyChapters, TOTAL_CHAPTERS } from '../data/storyChapters';
import { StoryHeader } from '../components/story/StoryHeader';
import { StoryProgressRail } from '../components/story/StoryProgressRail';
import { StoryStage } from '../components/story/StoryStage';
import { StoryChapterCard } from '../components/story/StoryChapterCard';
import { StoryProgressFeedback } from '../components/story/StoryProgressFeedback';
import { useStoryProgress } from '../hooks/useStoryProgress';
import { useStoryGamification } from '../hooks/useStoryGamification';

export const StoryExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { trackInteraction, state } = useExperience();

  const {
    activeId,
    exploredIds,
    selectChapter,
  } = useStoryProgress(null);

  const { recordChapterExpand } = useStoryGamification(sectionRef);

  const exploredCount = new Set([...exploredIds, ...state.timelinePhasesVisited]).size;

  const activeChapter = activeId
    ? storyChapters.find((c) => c.id === activeId) ?? null
    : null;

  const handleSelectChapter = useCallback(
    (id: string) => {
      const wasSelected = activeId === id;
      selectChapter(wasSelected ? '' : id);
      if (!wasSelected) recordChapterExpand(id);
    },
    [activeId, selectChapter, recordChapterExpand]
  );

  const handleAskAssistant = useCallback(() => {
    trackInteraction('open_assistant');
    window.dispatchEvent(new CustomEvent('openAssistant'));
  }, [trackInteraction]);

  const progressPercent = TOTAL_CHAPTERS > 0 ? (exploredCount / TOTAL_CHAPTERS) * 100 : 0;
  const isComplete = exploredCount >= TOTAL_CHAPTERS;

  return (
    <section
      id="trajectory"
      className="story-experience section-padding"
      ref={sectionRef}
    >
      <div className="story-container">
        <StoryHeader progress={progressPercent} />

        {/* Desktop: Rail + Stage */}
        <div className="story-desktop-layout">
          <StoryProgressRail
            chapters={storyChapters}
            activeId={activeId}
            onSelect={handleSelectChapter}
          />
          <div className="story-stage-wrapper">
            <StoryStage
              chapter={activeChapter}
              onAskAssistant={handleAskAssistant}
            />
            <StoryProgressFeedback
              exploredCount={exploredCount}
              totalCount={TOTAL_CHAPTERS}
              isComplete={isComplete}
            />
          </div>
        </div>

        {/* Mobile: Chapter cards */}
        <div className="story-mobile-layout">
          {storyChapters.map((chapter) => (
            <StoryChapterCard
              key={chapter.id}
              chapter={chapter}
              isExpanded={activeId === chapter.id}
              onToggle={() => handleSelectChapter(chapter.id)}
            />
          ))}
          <StoryProgressFeedback
            exploredCount={exploredCount}
            totalCount={TOTAL_CHAPTERS}
            isComplete={isComplete}
          />
        </div>
      </div>

      <style>{`
        .story-experience {
          background: var(--bg);
        }
        .story-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-5);
        }
        .story-desktop-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: var(--space-10);
          align-items: start;
        }
        .story-stage-wrapper {
          min-width: 0;
        }
        .story-mobile-layout {
          display: none;
        }
        @media (max-width: 991px) {
          .story-desktop-layout {
            display: none;
          }
          .story-mobile-layout {
            display: flex;
            flex-direction: column;
            gap: var(--space-4);
          }
        }
      `}</style>
    </section>
  );
};
