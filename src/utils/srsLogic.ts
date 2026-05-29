interface SRSItem {
  id: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReviewDate: string;
}

const MIN_INTERVAL = 1;
const MAX_INTERVAL = 365;
const EASY_BONUS = 1.3;
const HARD_PENALTY = 0.8;

export function calculateNextReview(
  item: SRSItem,
  quality: number
): SRSItem {
  const newRepetitions = item.repetitions + 1;

  let newEaseFactor =
    item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  newEaseFactor = Math.max(1.3, newEaseFactor);

  let newInterval: number;
  if (quality < 3) {
    newInterval = MIN_INTERVAL;
  } else if (newRepetitions === 1) {
    newInterval = MIN_INTERVAL;
  } else if (newRepetitions === 2) {
    newInterval = 6;
  } else {
    newInterval = Math.round(item.interval * newEaseFactor);
  }

  newInterval = Math.min(MAX_INTERVAL, Math.max(MIN_INTERVAL, newInterval));

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    ...item,
    interval: newInterval,
    easeFactor: newEaseFactor,
    repetitions: newRepetitions,
    nextReviewDate: nextReview.toISOString(),
  };
}

export function isReviewDue(nextReviewDate: string): boolean {
  return new Date(nextReviewDate) <= new Date();
}
