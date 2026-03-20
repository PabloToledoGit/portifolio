import { useState, useCallback } from 'react';

export function useStoryProgress(initialId: string | null = null) {
  const [activeId, setActiveId] = useState<string | null>(initialId);
  const [exploredIds, setExploredIds] = useState<Set<string>>(
    initialId ? new Set([initialId]) : new Set()
  );

  const selectChapter = useCallback((id: string) => {
    if (id) {
      setActiveId(id);
      setExploredIds((prev) => new Set([...prev, id]));
    } else {
      setActiveId(null);
    }
  }, []);

  const clearSelection = useCallback(() => {
    setActiveId(null);
  }, []);

  return {
    activeId,
    exploredIds,
    selectChapter,
    clearSelection,
    exploredCount: exploredIds.size,
  };
}
