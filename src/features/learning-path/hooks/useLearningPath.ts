import { useMemo } from "react";
import { useHskStore } from "../../../store/useHskStore";
import { useUserStore } from "../../../store/useUserStore";
import { useContentCatalog, useLearningPathByCode } from "../../../hooks/useContent";
import { calculateProgressFromCatalog } from "../../../utils/contentProgress";
import { LevelProgress } from "../types";

export function useLearningPath(level: number, trackParam?: string) {
  const settings = useUserStore((s) => s.settings);
  const lessonProgress = useHskStore((s) => s.lessonProgress);
  const activeTrack =
    trackParam || settings?.learningPath?.split("-")[0] || "new";
  const pathCode = `${activeTrack}-${level}`;
  const { data: catalog, loading, error } = useContentCatalog();
  const { path: learningPath } = useLearningPathByCode(pathCode);

  const hskLevel = useMemo(() => {
    if (!catalog) return null;
    return catalog.levels.find((l) => l.level === level) || null;
  }, [catalog, level]);

  const progress: LevelProgress | null = useMemo(
    () => calculateProgressFromCatalog(lessonProgress, level, catalog || null),
    [lessonProgress, level, catalog]
  );

  const units = useMemo(() => {
    if (!hskLevel?.units) return [];
    return hskLevel.units.map((topic) => ({
      ...topic,
      lessonProgress,
      unitProgressCount: (topic.lessons || []).filter(
        (l: any) => lessonProgress[l.id]
      ).length,
    }));
  }, [hskLevel, lessonProgress]);

  const pathName =
    learningPath?.name || hskLevel?.name || `HSK ${level}`;
  const pathDesc =
    learningPath?.description || hskLevel?.description || "";

  return {
    loading,
    error,
    hskLevel,
    progress,
    units,
    pathName,
    pathDesc,
    lessonProgress,
  };
}
