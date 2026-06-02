import { HskProgress } from "../../../types";

export interface StatCard {
  icon: string;
  label: string;
  value: number;
  color: string;
}

export interface SkillInfo {
  key: string;
  label: string;
  value: number;
  icon: "spellcheck" | "article" | "headphones" | "visibility";
}

export interface AllHskProgress extends HskProgress {
  id: string;
  name: string;
  level: number;
}
