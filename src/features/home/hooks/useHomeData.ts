import { useMemo } from "react";
import { useUserStore } from "../../../store/useUserStore";
import { useHskStore, getDueSrsItems } from "../../../store/useHskStore";
import { useContentCatalog } from "../../../hooks/useContent";
import { calculateProgressFromCatalog } from "../../../utils/contentProgress";
import { getTrackFromPath } from "../../../types/user.types";
import { HskCardData } from "../types";

export function useHomeData() {
  const settings = useUserStore((s) => s.settings);
  const user = useUserStore((s) => s.user);
  const lessonProgress = useHskStore((s) => s.lessonProgress);
  const srsItems = useHskStore((s) => s.srsItems);
  const { data: catalog, loading: catalogLoading, error: catalogError } =
    useContentCatalog();

  const currentLevel = settings?.learningPath
    ? parseInt(settings.learningPath.split("-")[1], 10)
    : 1;
  const currentTrack = settings?.learningPath
    ? getTrackFromPath(settings.learningPath)
    : "new";

  const totalXp = useMemo(() => {
    if (!catalog) return 0;
    return catalog.levels.reduce((s, p) => {
      const prog = calculateProgressFromCatalog(lessonProgress, p.id, catalog);
      return s + prog.completedLessons * 10;
    }, 0);
  }, [lessonProgress, catalog]);

  const dueItemsCount = useMemo(
    () => getDueSrsItems(srsItems).length,
    [srsItems]
  );

  const currentProgress = useMemo(
    () =>
      catalog
        ? calculateProgressFromCatalog(lessonProgress, currentLevel, catalog)
        : null,
    [lessonProgress, currentLevel, catalog]
  );

  const hskCards: HskCardData[] = useMemo(() => {
    if (!catalog) return [];
    return catalog.levels.map((hsk) => ({
      ...hsk,
      progress: calculateProgressFromCatalog(lessonProgress, hsk.id, catalog),
    }));
  }, [lessonProgress, catalog]);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Chào buổi sáng";
    if (h < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  return {
    totalXp,
    dueItemsCount,
    currentLevel,
    currentTrack,
    currentProgress,
    hskCards,
    userDisplayName: user?.username || "bạn",
    greeting: getGreeting(),
    catalogLoading,
    catalogError: !!catalogError,
  };
}
