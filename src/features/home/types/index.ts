export interface HskCardData {
  id: string;
  level: number;
  progress: {
    overallPercent: number;
    completedLessons: number;
    totalLessons: number;
    learnedWords: number;
    totalWords: number;
  };
}

export interface HomeData {
  totalXp: number;
  dueItemsCount: number;
  currentLevel: number;
  currentTrack: string;
  currentProgress: HskCardData["progress"] | null;
  hskCards: HskCardData[];
  userDisplayName: string;
  catalogLoading: boolean;
  catalogError: boolean;
}
