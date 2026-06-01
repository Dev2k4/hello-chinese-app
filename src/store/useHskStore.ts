import { create } from "zustand";
import { Lesson, LessonProgress, SRSItem } from "../types";
import { API_ROUTES } from "../constants/apiRoutes";
import apiClient from "../services/apiClient";

interface HskState {
  currentUnitId: string | null;
  currentLesson: Lesson | null;
  lessonProgress: Record<string, LessonProgress>;
  srsItems: SRSItem[];

  setCurrentUnitId: (id: string | null) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  completeLesson: (progress: LessonProgress) => void;
  addSrsItem: (item: SRSItem) => void;
  updateSrsItem: (id: string, item: Partial<SRSItem>) => void;
  submitLessonToBackend: (lessonId: string, score: number, timeSpentSeconds: number) => Promise<void>;
}

export const useHskStore = create<HskState>((set) => ({
  currentUnitId: null,
  currentLesson: null,
  lessonProgress: {},
  srsItems: [],

  setCurrentUnitId: (id) => set({ currentUnitId: id }),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

  completeLesson: (progress) => {
    set((state) => ({
      lessonProgress: {
        ...state.lessonProgress,
        [progress.lessonId]: progress,
      },
    }));
  },

  addSrsItem: (item) =>
    set((state) => {
      const exists = state.srsItems.find(
        (i) => i.vocabularyId === item.vocabularyId
      );
      if (exists) return state;
      return { srsItems: [...state.srsItems, item] };
    }),

  updateSrsItem: (id, updates) =>
    set((state) => ({
      srsItems: state.srsItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),

  submitLessonToBackend: async (lessonId, score, timeSpentSeconds) => {
    try {
      await apiClient.post(API_ROUTES.LESSONS.SUBMIT_PROGRESS(lessonId), {
        score,
        timeSpentSeconds,
      });
    } catch {
      // silently fail — progress is also stored locally
    }
  },
}));

export function getDueSrsItems(srsItems: SRSItem[]): SRSItem[] {
  const now = new Date();
  return srsItems.filter((item) => new Date(item.nextReviewDate) <= now);
}
