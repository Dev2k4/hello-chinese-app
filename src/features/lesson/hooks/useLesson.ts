import { useState, useCallback, useMemo } from "react";
import { useHskStore } from "../../../store/useHskStore";
import { useUserStore } from "../../../store/useUserStore";
import { useLessonBundle } from "../../../hooks/useContent";
import { LessonTab, LessonState } from "../types";

export function useLesson(lessonId: string) {
  const [currentTab, setCurrentTab] = useState<LessonTab>("vocab");
  const [finishedVocab, setFinishedVocab] = useState(false);
  const [finishedGrammar, setFinishedGrammar] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>(
    {}
  );

  const completeLesson = useHskStore((s) => s.completeLesson);
  const submitLessonToBackend = useHskStore((s) => s.submitLessonToBackend);
  const updateXp = useUserStore((s) => s.updateXp);

  const { data, loading, error } = useLessonBundle(lessonId || null);
  const lesson = data?.lesson;
  const vocab = data?.vocab ?? [];
  const grammar = data?.grammar ?? [];
  const questions = data?.questions ?? [];

  const hasVocab = vocab.length > 0;
  const hasGrammar = grammar.length > 0;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;
  const progress =
    questions.length > 0 ? currentQuestionIndex / questions.length : 0;

  const tabs: LessonTab[] = useMemo(() => {
    const t: LessonTab[] = [];
    if (hasVocab) t.push("vocab");
    if (hasGrammar) t.push("grammar");
    if (questions.length > 0) t.push("practice");
    return t;
  }, [hasVocab, hasGrammar, questions.length]);

  const canAccess = useCallback(
    (tab: LessonTab) => {
      if (tab === "vocab") return true;
      if (tab === "grammar") return finishedVocab;
      if (tab === "practice")
        return finishedVocab && (!hasGrammar || finishedGrammar);
      return false;
    },
    [finishedVocab, finishedGrammar, hasGrammar]
  );

  const handleSelect = useCallback(
    (option: string) => {
      if (selectedOption || !currentQuestion) return;
      setSelectedOption(option);
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]:
          option === currentQuestion.correctAnswer,
      }));
    },
    [selectedOption, currentQuestion]
  );

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    if (isLastQuestion || !lesson) {
      const correctCount = Object.values(answers).filter(Boolean).length;
      const score =
        questions.length > 0
          ? Math.round((correctCount / questions.length) * 100)
          : 100;
      const xp = correctCount * 10;
      completeLesson({
        lessonId: lesson!.id,
        score,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        completedAt: new Date().toISOString(),
        xpEarned: xp,
        mistakes: [],
      });
      updateXp(xp);
      if (lesson) submitLessonToBackend(lesson.id, score, 60);
      setShowResult(true);
    } else {
      setCurrentQuestionIndex((i) => i + 1);
    }
  }, [
    isLastQuestion,
    lesson,
    answers,
    questions.length,
    completeLesson,
    updateXp,
    submitLessonToBackend,
  ]);

  const handleFinishSection = useCallback(
    (section: LessonTab) => {
      if (section === "vocab") setFinishedVocab(true);
      if (section === "grammar") setFinishedGrammar(true);
      const nextIdx = tabs.indexOf(section) + 1;
      if (nextIdx < tabs.length) setCurrentTab(tabs[nextIdx]);
    },
    [tabs]
  );

  const toggleFlip = useCallback(
    (id: string) => {
      setFlippedCards((p) => ({ ...p, [id]: !p[id] }));
    },
    []
  );

  const correctCount = Object.values(answers).filter(Boolean).length;
  const xpEarned = correctCount * 10;

  return {
    loading,
    error,
    lesson,
    vocab,
    grammar,
    questions,
    tabs,
    currentTab,
    setCurrentTab,
    finishedVocab,
    finishedGrammar,
    currentQuestion,
    currentQuestionIndex,
    selectedOption,
    showResult,
    flippedCards,
    progress,
    isLastQuestion,
    correctCount,
    xpEarned,
    canAccess,
    handleSelect,
    handleNext,
    handleFinishSection,
    toggleFlip,
  };
}
