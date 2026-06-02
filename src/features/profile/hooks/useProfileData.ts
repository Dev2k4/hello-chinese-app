import { useMemo } from "react";
import { useUserStore } from "../../../store/useUserStore";
import { useHskStore } from "../../../store/useHskStore";
import { useContentCatalog } from "../../../hooks/useContent";
import { calculateProgressFromCatalog } from "../../../utils/contentProgress";
import { getPathLabel } from "../../../types/user.types";
import { StatCard, SkillInfo, AllHskProgress } from "../types";

export function useProfileData() {
  const settings = useUserStore((s) => s.settings);
  const lessonProgress = useHskStore((s) => s.lessonProgress);
  const srsItems = useHskStore((s) => s.srsItems);
  const {
    data: catalog,
    loading: catalogLoading,
    error: catalogError,
  } = useContentCatalog();

  const allProgress: AllHskProgress[] = useMemo(() => {
    if (!catalog) return [];
    return catalog.levels.map((hsk) => ({
      ...hsk,
      ...calculateProgressFromCatalog(lessonProgress, hsk.id, catalog),
    }));
  }, [lessonProgress, catalog]);

  const totalLearned = allProgress.reduce((s, p) => s + p.learnedWords, 0);
  const totalLessonsDone = allProgress.reduce(
    (s, p) => s + p.completedLessons,
    0
  );
  const reviewedCount = srsItems.filter((i) => i.repetitions > 0).length;
  const avgPercent =
    allProgress.length > 0
      ? allProgress.reduce((s, p) => s + p.overallPercent, 0) /
        allProgress.length
      : 0;

  const skills: SkillInfo[] = useMemo(
    () => [
      {
        key: "vocabulary",
        label: "Từ vựng",
        value: Math.min(100, avgPercent + 10),
        icon: "spellcheck",
      },
      {
        key: "grammar",
        label: "Ngữ pháp",
        value: Math.min(100, avgPercent - 5),
        icon: "article",
      },
      {
        key: "listening",
        label: "Nghe",
        value: Math.min(100, avgPercent - 10),
        icon: "headphones",
      },
      {
        key: "reading",
        label: "Đọc",
        value: Math.min(100, avgPercent + 5),
        icon: "visibility",
      },
    ],
    [avgPercent]
  );

  const statCards: StatCard[] = useMemo(
    () => [
      {
        icon: "spellcheck",
        label: "Từ đã học",
        value: totalLearned,
        color: "#4CAF50",
      },
      {
        icon: "menu-book",
        label: "Bài học",
        value: totalLessonsDone,
        color: "#FF7043",
      },
      {
        icon: "autorenew",
        label: "Đã ôn tập",
        value: reviewedCount,
        color: "#7C4DFF",
      },
      {
        icon: "layers",
        label: "SRS",
        value: srsItems.length,
        color: "#00BCD4",
      },
    ],
    [totalLearned, totalLessonsDone, reviewedCount, srsItems.length]
  );

  return {
    settings,
    catalogLoading,
    catalogError,
    allProgress,
    statCards,
    skills,
    avgPercent,
    pathLabel: settings ? getPathLabel(settings.learningPath) : "",
    dailyTarget: settings?.targetMinutesPerDay ?? 0,
  };
}
