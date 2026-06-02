import { ContentVocabulary, ContentGrammarPoint, ContentQuestion } from "../../../types/content.types";

export type LessonTab = "vocab" | "grammar" | "practice";

export interface LessonState {
  currentTab: LessonTab;
  finishedVocab: boolean;
  finishedGrammar: boolean;
  currentQuestionIndex: number;
  answers: Record<string, boolean>;
  selectedOption: string | null;
  showResult: boolean;
  flippedCards: Record<string, boolean>;
}

export interface LessonData {
  lesson: {
    id: string;
    title: string;
  };
  vocab: ContentVocabulary[];
  grammar: ContentGrammarPoint[];
  questions: ContentQuestion[];
  tabs: LessonTab[];
}
