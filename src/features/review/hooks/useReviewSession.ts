import { useState, useMemo, useCallback } from "react";
import { useHskStore, getDueSrsItems } from "../../../store/useHskStore";
import { calculateNextReview } from "../../../utils/srsLogic";
import { API_ROUTES } from "../../../constants/apiRoutes";
import apiClient from "../../../services/apiClient";
import { ReviewResult, ReviewSessionState } from "../types";

export function useReviewSession() {
  const srsItems = useHskStore((s) => s.srsItems);
  const updateSrsItem = useHskStore((s) => s.updateSrsItem);

  const [started, setStarted] = useState(false);
  const [state, setState] = useState<ReviewSessionState>({
    currentIndex: 0,
    showAnswer: false,
    completed: false,
    result: { total: 0, good: 0, ok: 0, bad: 0 },
  });

  const dueItems = useMemo(() => getDueSrsItems(srsItems), [srsItems]);
  const currentItem = dueItems[state.currentIndex];
  const totalCount = dueItems.length;

  const start = useCallback(() => setStarted(true), []);

  const flip = useCallback(
    () => setState((p) => ({ ...p, showAnswer: true })),
    []
  );

  const rate = useCallback(
    (quality: number) => {
      if (!currentItem) return;
      const updated = calculateNextReview(
        {
          id: currentItem.id,
          interval: currentItem.interval,
          easeFactor: currentItem.easeFactor,
          repetitions: currentItem.repetitions,
          nextReviewDate: currentItem.nextReviewDate,
        },
        quality
      );
      updateSrsItem(currentItem.id, updated);

      apiClient
        .post(API_ROUTES.REVIEWS.SUBMIT, {
          vocabularyId: currentItem.vocabularyId,
          quality,
        })
        .catch(() => {});

      setState((prev) => {
        const category =
          quality >= 4 ? "good" : quality >= 2 ? "ok" : "bad";
        const newResult: ReviewResult = {
          ...prev.result,
          total: prev.result.total + 1,
          [category]: prev.result[category] + 1,
        };
        if (prev.currentIndex < dueItems.length - 1) {
          return {
            currentIndex: prev.currentIndex + 1,
            showAnswer: false,
            completed: false,
            result: newResult,
          };
        }
        return {
          ...prev,
          completed: true,
          result: newResult,
        };
      });
    },
    [currentItem, dueItems.length, updateSrsItem]
  );

  return {
    started,
    state,
    currentItem,
    dueItems,
    totalCount,
    isEmpty: dueItems.length === 0,
    start,
    flip,
    rate,
  };
}
