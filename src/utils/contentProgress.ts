import { ContentCatalogIndex } from "../types/content.types";
import { LessonProgress, HskProgress } from "../types";

export function calculateProgressFromCatalog(
  lessonProgress: Record<string, LessonProgress>,
  levelId: number,
  catalog: ContentCatalogIndex | null
): HskProgress {
  const level = catalog?.levels?.find((l) => l.id === levelId);
  const lessons = catalog?.lessons?.filter((l) => l.levelId === levelId) || [];

  if (!level) {
    return {
      hskLevel: levelId,
      totalWords: 0,
      learnedWords: 0,
      totalGrammar: 0,
      learnedGrammar: 0,
      totalUnits: 0,
      completedUnits: 0,
      totalLessons: 0,
      completedLessons: 0,
      overallPercent: 0,
      lastActivityDate: "",
    };
  }

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter((l) => lessonProgress[l.id]).length;

  const topicIds = new Set(lessons.map((l) => l.topicId));
  const completedTopicIds = new Set<string>();
  for (const topicId of topicIds) {
    const topicLessons = lessons.filter((l) => l.topicId === topicId);
    const allDone = topicLessons.every((l) => lessonProgress[l.id]);
    if (allDone && topicLessons.length > 0) completedTopicIds.add(topicId);
  }

  const learnedWords = Math.min(completedLessons * 3, level.totalWords);

  return {
    hskLevel: levelId,
    totalWords: level.totalWords,
    learnedWords,
    totalGrammar: level.totalGrammar,
    learnedGrammar: Math.min(Math.floor(completedLessons * 0.5), level.totalGrammar),
    totalUnits: topicIds.size,
    completedUnits: completedTopicIds.size,
    totalLessons,
    completedLessons,
    overallPercent: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
    lastActivityDate: new Date().toISOString(),
  };
}
