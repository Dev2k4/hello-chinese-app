import { ContentTopic, ContentLessonMeta } from "../../../types/content.types";

export interface UnitWithProgress extends ContentTopic {
  lessonProgress: Record<string, boolean>;
  unitProgressCount: number;
}

export interface LevelProgress {
  overallPercent: number;
  completedLessons: number;
  totalLessons: number;
  learnedWords: number;
  totalWords: number;
}
