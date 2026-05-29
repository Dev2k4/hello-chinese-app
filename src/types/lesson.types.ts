export interface HskLevel {
  id: number;
  name: string;
  description: string;
  totalWords: number;
  totalGrammar: number;
  units: HskUnit[];
  translations?: Record<string, any>;
}

export interface HskUnit {
  id: string;
  hskLevel: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  translations?: Record<string, any>;
}

export interface Lesson {
  id: string;
  unitId: string;
  hskLevel: number;
  title: string;
  description: string;
  order: number;
  vocabularies: Vocabulary[];
  grammarPoints: GrammarPoint[];
  questions: Question[];
  type: "vocab" | "grammar" | "mixed" | "review";
  translations?: Record<string, any>;
}

export interface Vocabulary {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  exampleSentence?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
  audioUrl?: string;
  hskLevel: number;
  wordClass?: string;
  translations?: Record<string, string>;
  wordClassAll?: Record<string, string>;
  notesAll?: Record<string, string>;
}

export interface GrammarPoint {
  id: string;
  title: string;
  explanation: string;
  structure: string;
  examples: GrammarExample[];
  hskLevel: number;
  translations?: {
    title?: any;
    explanation?: any;
    structure?: any;
  };
}

export interface GrammarExample {
  hanzi: string;
  pinyin: string;
  meaning: string;
  translations?: Record<string, string>;
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  subPrompt?: string;
  pinyin?: string;
  audioUrl?: string;
  options?: string[];
  correctAnswer: string;
  vocabularyId?: string;
  explanation?: string;
  translations?: {
    prompt?: any;
    subPrompt?: any;
    explanation?: any;
  };
}

export type QuestionType =
  | "flashcard"
  | "multiple_choice"
  | "listening_choice"
  | "listening_fill"
  | "reading"
  | "arrange_sentence"
  | "pinyin_input"
  | "meaning_select"
  | "hanzi_select";

export interface LessonProgress {
  lessonId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt?: string;
  xpEarned: number;
  mistakes: string[];
}

export interface PlacementTest {
  questions: PlacementQuestion[];
  result?: PlacementTestResult;
}

export interface PlacementQuestion {
  id: string;
  type: "vocab" | "grammar" | "reading" | "listening";
  category: string;
  prompt: string;
  hanzi?: string;
  pinyin?: string;
  audioUrl?: string;
  passage?: string;
  options: string[];
  correctAnswer: string;
  hskLevel: number;
  translations?: {
    prompt?: any;
    subPrompt?: any;
    explanation?: any;
  };
}

export interface PlacementTestResult {
  estimatedHskLevel: number;
  vocabPercent: number;
  grammarPercent: number;
  readingPercent: number;
  listeningPercent: number;
  overallPercent: number;
  weakAreas: string[];
  suggestedStartHsk: number;
  suggestedReviewHsk: number | null;
}

export interface MockTest {
  id: string;
  hskLevel: number;
  title: string;
  sections: MockTestSection[];
  duration: number;
  totalQuestions: number;
  translations?: Record<string, any>;
}

export interface MockTestSection {
  id: string;
  type: "listening" | "reading" | "writing";
  questions: Question[];
  duration: number;
}

export interface MockTestResult {
  mockTestId: string;
  hskLevel: number;
  sections: {
    sectionId: string;
    type: string;
    score: number;
    total: number;
  }[];
  totalScore: number;
  totalCorrect: number;
  totalQuestions: number;
  completedAt: string;
  weakLessons: string[];
  recommendations: string[];
}

export interface SRSItem {
  id: string;
  vocabularyId: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReviewDate: string;
  lastQuality: number;
  translations?: Record<string, string>;
}

export interface StudySession {
  date: string;
  duration: number;
  wordsLearned: number;
  wordsReviewed: number;
  xpEarned: number;
  lessonsCompleted: number;
}
