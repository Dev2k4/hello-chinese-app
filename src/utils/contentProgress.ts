import { ContentCatalogIndex } from "../types/content.types";
import { LessonProgress, HskProgress } from "../types";

function getLevelLessons(catalog: ContentCatalogIndex, levelId: number | string) {
  const levelIdNum = Number(levelId);
  const level = catalog.levels?.find((l) => l.level === levelIdNum);
  if (!level) return [];
  return level.units?.flatMap((u) => u.lessons || []) || [];
}

export function calculateProgressFromCatalog(
  lessonProgress: Record<string, LessonProgress>,
  levelId: number | string,
  catalog: ContentCatalogIndex | null
): HskProgress {
  if (!catalog) {
    return {
      hskLevel: Number(levelId),
      totalWords: 0, learnedWords: 0,
      totalGrammar: 0, learnedGrammar: 0,
      totalUnits: 0, completedUnits: 0,
      totalLessons: 0, completedLessons: 0,
      overallPercent: 0, lastActivityDate: "",
    };
  }

  const levelIdNum = Number(levelId);
  const level = catalog.levels?.find((l) => l.level === levelIdNum);
  const lessons = getLevelLessons(catalog, levelId);

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter((l) => lessonProgress[l.id]).length;

  const topicIds = new Set(level?.units?.map((u) => u.id) || []);
  const completedTopicIds = new Set<string>();
  if (level?.units) {
    for (const topic of level.units) {
      const topicLessons = topic.lessons || [];
      const allDone = topicLessons.every((l) => lessonProgress[l.id]);
      if (allDone && topicLessons.length > 0) completedTopicIds.add(topic.id);
    }
  }

  const learnedWords = Math.min(completedLessons * 3, level?.totalWords || 0);

  return {
    hskLevel: levelIdNum,
    totalWords: level?.totalWords || 0,
    learnedWords,
    totalGrammar: level?.totalGrammar || 0,
    learnedGrammar: Math.min(Math.floor(completedLessons * 0.5), level?.totalGrammar || 0),
    totalUnits: topicIds.size,
    completedUnits: completedTopicIds.size,
    totalLessons,
    completedLessons,
    overallPercent: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
    lastActivityDate: new Date().toISOString(),
  };
}
