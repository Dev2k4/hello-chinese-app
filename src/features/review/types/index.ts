import { SRSItem } from "../../../types/lesson.types";

export type ReviewPhase = "start" | "session" | "completed";

export interface ReviewResult {
  total: number;
  good: number;
  ok: number;
  bad: number;
}

export interface ReviewSessionState {
  currentIndex: number;
  showAnswer: boolean;
  completed: boolean;
  result: ReviewResult;
}

export interface DueItem extends SRSItem {}
