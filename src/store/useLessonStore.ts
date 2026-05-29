import { create } from "zustand";
import { Lesson, LessonProgress, Question } from "../types/lesson.types";

interface LessonState {
  currentLesson: Lesson | null;
  currentQuestionIndex: number;
  answers: Record<string, boolean>;
  progress: LessonProgress | null;
  setCurrentLesson: (lesson: Lesson) => void;
  setCurrentQuestionIndex: (index: number) => void;
  answerQuestion: (questionId: string, correct: boolean) => void;
  setProgress: (progress: LessonProgress) => void;
  reset: () => void;
}

export const useLessonStore = create<LessonState>((set) => ({
  currentLesson: null,
  currentQuestionIndex: 0,
  answers: {},
  progress: null,

  setCurrentLesson: (lesson) =>
    set({ currentLesson: lesson, currentQuestionIndex: 0, answers: {} }),

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  answerQuestion: (questionId, correct) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: correct },
    })),

  setProgress: (progress) => set({ progress }),

  reset: () =>
    set({
      currentLesson: null,
      currentQuestionIndex: 0,
      answers: {},
      progress: null,
    }),
}));
