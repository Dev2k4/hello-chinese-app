export type ContentLanguage = "zh" | "ja";

export interface ContentCatalogIndex {
  version: string;
  language: ContentLanguage;
  levels: ContentLevel[];
  topics: ContentTopic[];
  lessons: ContentLessonMeta[];
}

export interface ContentLevel {
  id: number;
  level: number;
  name: string;
  description: string;
  order: number;
  totalWords: number;
  totalGrammar: number;
  units: ContentTopic[];
  translations?: Record<string, any>;
}

export interface ContentTopic {
  id: string;
  levelId: number;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
  translations?: Record<string, any>;
}

export interface ContentLessonMeta {
  id: string;
  levelId: number;
  topicId: string;
  title: string;
  description: string;
  order: number;
  type: "vocab" | "grammar" | "mixed" | "review";
  vocabularyCount?: number;
  grammarCount?: number;
  questionCount?: number;
  translations?: Record<string, any>;
}

export interface ContentLessonBundle {
  lesson: ContentLessonMeta;
  vocab: ContentVocabulary[];
  grammar: ContentGrammarPoint[];
  questions: ContentQuestion[];
}

export interface ContentVocabulary {
  id: string;
  language: ContentLanguage;
  hanzi: string;
  pinyin: string;
  meaning: string;
  exampleSentence?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
  audioUrl?: string;
  exampleAudioUrl?: string;
  strokeSvg?: string;
  strokeData?: string;
  levelId: number;
  wordClass?: string;
  translations?: Record<string, string>;
  wordClassAll?: Record<string, string>;
  notesAll?: Record<string, string>;
}

export interface ContentGrammarPoint {
  id: string;
  levelId: number;
  title: string;
  explanation: string;
  structure: string;
  examples: ContentGrammarExample[];
  translations?: {
    title?: any;
    explanation?: any;
    structure?: any;
  };
}

export interface ContentGrammarExample {
  hanzi: string;
  pinyin: string;
  meaning: string;
  translations?: Record<string, string>;
}

export interface ContentQuestion {
  id: string;
  type: ContentQuestionType;
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

export interface ContentPathLesson {
  id: string;
  title: string;
  order: number;
  type: string;
  estimatedMinutes: number;
  translations?: { title?: any };
  isRequired: boolean;
}

export interface ContentPathUnit {
  name: string;
  translations?: { name?: any };
  lessons: ContentPathLesson[];
}

export interface LearningPathInfo {
  code: string;
  track: "new" | "exp" | "review";
  level: number;
  levelId: string;
  name: string;
  description: string;
  translations?: { name?: any; description?: any };
  units: ContentPathUnit[];
}

export type ContentQuestionType =
  | "flashcard"
  | "multiple_choice"
  | "listening_choice"
  | "listening_fill"
  | "reading"
  | "arrange_sentence"
  | "pinyin_input"
  | "meaning_select"
  | "hanzi_select";

export interface VocabularyPage {
  level: number;
  total: number;
  page: number;
  limit: number;
  items: ContentVocabulary[];
}

export interface GrammarList {
  level: number;
  total: number;
  items: ContentGrammarPoint[];
}

export interface VocabularySearchResult {
  items: (ContentVocabulary & { hskLevel: number | null })[];
}
