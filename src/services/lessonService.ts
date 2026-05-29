import apiClient from "./apiClient";
import { API_ROUTES } from "../constants/apiRoutes";
import { Lesson, LessonProgress } from "../types/lesson.types";

export const lessonService = {
  async getLessons(): Promise<Lesson[]> {
    const { data } = await apiClient.get(API_ROUTES.CONTENT.CATALOG);
    return data;
  },

  async getLessonById(id: string): Promise<Lesson> {
    const { data } = await apiClient.get(API_ROUTES.CONTENT.LESSON(id));
    return data;
  },

  async submitProgress(
    lessonId: string,
    progress: Omit<LessonProgress, "lessonId">
  ): Promise<LessonProgress> {
    const { data } = await apiClient.post(
      API_ROUTES.LESSONS.SUBMIT_PROGRESS(lessonId),
      progress
    );
    return data;
  },
};
