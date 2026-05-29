import { HskLevel } from "../types";
import { hsk1Data } from "./hsk1";
import { hsk2Data } from "./hsk2";
import { hsk3Data } from "./hsk3";
import { hsk4Data } from "./hsk4";

export const hskLevels: Record<number, HskLevel> = {
  1: hsk1Data,
  2: hsk2Data,
  3: hsk3Data,
  4: hsk4Data,
};

export const hskLevelsList: HskLevel[] = [hsk1Data, hsk2Data, hsk3Data, hsk4Data];

export function getHskLevel(level: number): HskLevel | undefined {
  return hskLevels[level];
}

export function getAllLessons(level?: number) {
  const levels = level ? [hskLevels[level]].filter(Boolean) : hskLevelsList;
  const lessons: any[] = [];
  for (const lvl of levels) {
    for (const unit of lvl.units) {
      for (const lesson of unit.lessons) {
        lessons.push({ ...lesson, hskLevel: lvl.id });
      }
    }
  }
  return lessons;
}

export function getLessonById(id: string) {
  for (const lvl of hskLevelsList) {
    for (const unit of lvl.units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === id) return { lesson, hskLevel: lvl, unit };
      }
    }
  }
  return null;
}
