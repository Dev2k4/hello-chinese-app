export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
}

export interface UserProgress {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  totalLessonsCompleted: number;
  totalReviewsCompleted: number;
}

export type LearningPathCode = `new-${number}` | `exp-${number}` | `review-${number}`;

export function getTrackFromPath(code: LearningPathCode): "new" | "exp" | "review" {
  return code.split("-")[0] as "new" | "exp" | "review";
}

export function getLevelFromPath(code: LearningPathCode): number {
  return parseInt(code.split("-")[1], 10);
}

export function getHskLabel(code: LearningPathCode): string {
  const level = getLevelFromPath(code);
  return `HSK ${level}`;
}

export function getTrackLabel(track: "new" | "exp" | "review"): string {
  const labels = { new: "Mới", exp: "Tăng tốc", review: "Ôn tập" };
  return labels[track];
}

export function getPathLabel(code: LearningPathCode): string {
  const level = getLevelFromPath(code);
  const track = getTrackFromPath(code);
  return `${getTrackLabel(track)} HSK ${level}`;
}

export interface UserSettings {
  learningPath: LearningPathCode;
  targetMinutesPerDay: number;
  targetWordsPerDay: number;
  startDate: string;
}

export interface HskProgress {
  hskLevel: number;
  totalWords: number;
  learnedWords: number;
  totalGrammar: number;
  learnedGrammar: number;
  totalUnits: number;
  completedUnits: number;
  totalLessons: number;
  completedLessons: number;
  overallPercent: number;
  lastActivityDate: string;
}

export interface SkillBreakdown {
  vocabulary: number;
  grammar: number;
  listening: number;
  reading: number;
}

export interface WeeklyStats {
  date: string;
  minutesStudied: number;
  wordsLearned: number;
  lessonsCompleted: number;
}
