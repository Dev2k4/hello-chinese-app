import { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../src/constants/theme";
import { Card, Button, ProgressBar, FadeIn, ScaleIn, StaggerList, MaterialIcon, IonIcon } from "../../src/components/common";
import { Flashcard, QuizOptions } from "../../src/components/lesson";
import { useHskStore } from "../../src/store/useHskStore";
import { useUserStore } from "../../src/store/useUserStore";
import { ContentGrammarPoint, ContentVocabulary } from "../../src/types";
import { useLessonBundle } from "../../src/hooks/useContent";

type LessonTab = "vocab" | "grammar" | "practice";

const tabConfig: Record<LessonTab, { label: string; icon: React.ReactNode }> = {
  vocab: { label: "Từ vựng", icon: <MaterialIcon name="menu-book" size="sm" color={Colors.primary} /> },
  grammar: { label: "Ngữ pháp", icon: <MaterialIcon name="article" size="sm" color={Colors.info} /> },
  practice: { label: "Luyện tập", icon: <MaterialIcon name="quiz" size="sm" color={Colors.accent} /> },
};

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentTab, setCurrentTab] = useState<LessonTab>("vocab");
  const [finishedVocab, setFinishedVocab] = useState(false);
  const [finishedGrammar, setFinishedGrammar] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const completeLesson = useHskStore((s) => s.completeLesson);
  const updateXp = useUserStore((s) => s.updateXp);
  const { data, loading, error } = useLessonBundle(id || null);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.errorSection}>
          <Text style={styles.loadingText}>Dang tai bai hoc...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!data || error) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.errorSection}>
          <IonIcon name="alert-circle-outline" size="xl" color={Colors.error} />
          <Text style={styles.errorText}>Khong the tai bai hoc</Text>
          <Button title="Quay lại" onPress={() => router.back()} variant="outline" />
        </View>
      </SafeAreaView>
    );
  }

  const { lesson, vocab, grammar, questions } = data;
  const hasVocab = vocab.length > 0;
  const hasGrammar = grammar.length > 0;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;
  const progress = questions.length > 0 ? currentQuestionIndex / questions.length : 0;

  const tabs: LessonTab[] = [];
  if (hasVocab) tabs.push("vocab");
  if (hasGrammar) tabs.push("grammar");
  if (questions.length > 0) tabs.push("practice");

  const canAccess = (tab: LessonTab) => {
    if (tab === "vocab") return true;
    if (tab === "grammar") return finishedVocab;
    if (tab === "practice") return finishedVocab && (!hasGrammar || finishedGrammar);
    return false;
  };

  const handleSelect = useCallback((option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option === currentQuestion.correctAnswer }));
  }, [selectedOption, currentQuestion]);

  const submitLessonToBackend = useHskStore((s) => s.submitLessonToBackend);

  const handleNext = () => {
    setSelectedOption(null);
    if (isLastQuestion) {
      const correctCount = Object.values(answers).filter(Boolean).length;
      const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 100;
      const xp = correctCount * 10;
      completeLesson({ lessonId: lesson.id, score, totalQuestions: questions.length, correctAnswers: correctCount, completedAt: new Date().toISOString(), xpEarned: xp, mistakes: [] });
      updateXp(xp);
      submitLessonToBackend(lesson.id, score, 60);
      setShowResult(true);
    } else {
      setCurrentQuestionIndex((i) => i + 1);
    }
  };

  const handleFinishSection = (section: LessonTab) => {
    if (section === "vocab") setFinishedVocab(true);
    if (section === "grammar") setFinishedGrammar(true);
    const nextIdx = tabs.indexOf(section) + 1;
    if (nextIdx < tabs.length) setCurrentTab(tabs[nextIdx]);
  };

  if (showResult) {
    const correctCount = Object.values(answers).filter(Boolean).length;
    const xp = correctCount * 10;
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <View style={styles.resultContainer}>
          <ScaleIn>
            <View style={styles.resultEmojiWrap}>
              <IonIcon name={correctCount === questions.length ? "happy-outline" : "fitness-outline"} size="xxl" color={correctCount === questions.length ? Colors.secondary : Colors.primary} />
            </View>
            <Text style={styles.resultTitle}>Hoàn thành!</Text>
          </ScaleIn>

          <FadeIn delay={150}>
            <Card style={styles.resultCard}>
              <Text style={styles.resultLabel}>Điểm số</Text>
              <Text style={styles.resultScore}>{correctCount}/{questions.length}</Text>
              <View style={styles.xpBadge}>
                <MaterialIcon name="bolt" size="sm" color="#fff" />
                <Text style={styles.xpText}>+{xp} XP</Text>
              </View>
            </Card>
          </FadeIn>

          <FadeIn delay={250}>
            <View style={styles.resultActions}>
              <Button title="Học tiếp" onPress={() => router.back()} variant="gradient" size="lg" icon={<IonIcon name="arrow-forward" size="md" color="#fff" />} />
              <Button title="Về trang chủ" onPress={() => router.replace("/(tabs)")} variant="outline" icon={<IonIcon name="home-outline" size="md" color={Colors.primary} />} />
            </View>
          </FadeIn>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.tabBar}>
          {tabs.map((tab) => {
            const accessible = canAccess(tab);
            const isActive = currentTab === tab;
            return (
              <TouchableOpacity key={tab} style={[styles.tab, isActive && styles.tabActive]} onPress={() => accessible && setCurrentTab(tab)} disabled={!accessible}>
                {tabConfig[tab].icon}
                <Text style={[styles.tabText, isActive && styles.tabTextActive, !accessible && styles.tabDisabled]}>{tabConfig[tab].label}</Text>
              </TouchableOpacity>
            );
          })}
        </LinearGradient>

        {currentTab === "vocab" && (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <StaggerList baseDelay={50} staggerMs={60}>
              {vocab.map((v: ContentVocabulary) => {
                const isFlipped = flippedCards[v.id] || false;
                return (
                  <Flashcard key={v.id} hanzi={v.hanzi} pinyin={v.pinyin} meaning={v.meaning} showAnswer={isFlipped} onFlip={() => setFlippedCards((p) => ({ ...p, [v.id]: !p[v.id] }))} />
                );
              })}
            </StaggerList>
            {vocab.length > 0 && (
              <Button title="Đã học xong từ vựng" onPress={() => handleFinishSection("vocab")} variant="gradient" icon={<IonIcon name="checkmark-circle" size="md" color="#fff" />} style={styles.sectionBtn} />
            )}
          </ScrollView>
        )}

        {currentTab === "grammar" && (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <StaggerList baseDelay={50} staggerMs={80}>
              {grammar.map((g: ContentGrammarPoint) => (
                <Card key={g.id} style={styles.grammarCard}>
                  <View style={styles.grammarTitleRow}>
                    <MaterialIcon name="lightbulb-outline" size="sm" color={Colors.accent} />
                    <Text style={styles.grammarTitle}>{g.title}</Text>
                  </View>
                  <Text style={styles.grammarExplanation}>{g.explanation}</Text>
                  <View style={styles.structureBox}>
                    <Text style={styles.structureLabel}>Cấu trúc</Text>
                    <Text style={styles.structureText}>{g.structure}</Text>
                  </View>
                  <View style={styles.examplesSection}>
                    <Text style={styles.examplesLabel}>Ví dụ</Text>
                    {g.examples.map((ex, i) => (
                      <View key={i} style={styles.exampleRow}>
                        <Text style={styles.exampleHanzi}>{ex.hanzi}</Text>
                        <Text style={styles.examplePinyin}>{ex.pinyin}</Text>
                        <Text style={styles.exampleMeaning}>{ex.meaning}</Text>
                      </View>
                    ))}
                  </View>
                </Card>
              ))}
            </StaggerList>
            {grammar.length > 0 && (
              <Button title="Đã học xong ngữ pháp" onPress={() => handleFinishSection("grammar")} variant="gradient" icon={<IonIcon name="checkmark-circle" size="md" color="#fff" />} style={styles.sectionBtn} />
            )}
          </ScrollView>
        )}

        {currentTab === "practice" && currentQuestion && (
          <View style={styles.practiceContainer}>
            <FadeIn>
              <View style={styles.practiceHeader}>
                <View style={styles.practiceHeaderTop}>
                  <MaterialIcon name="quiz" size="sm" color={Colors.accent} />
                  <Text style={styles.practiceCounter}>Câu {currentQuestionIndex + 1}/{questions.length}</Text>
                </View>
                <ProgressBar progress={progress} color={Colors.accent} height={6} />
              </View>
            </FadeIn>

            <ScrollView style={styles.practiceQuestionArea} showsVerticalScrollIndicator={false}>
              <ScaleIn key={currentQuestion.id}>
                <Text style={styles.questionPrompt}>{currentQuestion.prompt}</Text>
                {currentQuestion.pinyin && <Text style={styles.questionPinyin}>{currentQuestion.pinyin}</Text>}
                <QuizOptions options={currentQuestion.options || []} selectedOption={selectedOption || undefined} correctAnswer={currentQuestion.correctAnswer} onSelect={handleSelect} disabled={!!selectedOption} />
              </ScaleIn>
            </ScrollView>

            <View style={styles.practiceFooter}>
              {selectedOption && <Button title={isLastQuestion ? "Xem kết quả" : "Tiếp theo"} onPress={handleNext} variant="gradient" icon={<IonIcon name="arrow-forward" size="md" color="#fff" />} />}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1 },
  errorSection: { flex: 1, justifyContent: "center", alignItems: "center", gap: Spacing.md },
  errorText: { ...Typography.h3, color: Colors.error, textAlign: "center" },
  loadingText: { ...Typography.body, color: Colors.textSecondary },
  tabBar: { flexDirection: "row", paddingHorizontal: Spacing.sm, paddingVertical: Spacing.sm, gap: Spacing.xs },
  tab: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: Spacing.xs, paddingVertical: Spacing.sm, borderRadius: BorderRadius.md, backgroundColor: "rgba(255,255,255,0.15)" },
  tabActive: { backgroundColor: "rgba(255,255,255,0.35)" },
  tabText: { ...Typography.caption, color: "rgba(255,255,255,0.7)", fontWeight: "600" },
  tabTextActive: { color: "#fff" },
  tabDisabled: { opacity: 0.4 },
  tabContent: { flex: 1, padding: Spacing.lg, gap: Spacing.md },
  sectionBtn: { marginTop: Spacing.lg, marginBottom: Spacing.xl },
  grammarCard: { gap: Spacing.md },
  grammarTitleRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  grammarTitle: { ...Typography.h3, color: Colors.accent, flex: 1 },
  grammarExplanation: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22 },
  structureBox: { backgroundColor: Colors.accent + "10", padding: Spacing.md, borderRadius: BorderRadius.md, borderLeftWidth: 3, borderLeftColor: Colors.accent },
  structureLabel: { ...Typography.caption, color: Colors.accent, fontWeight: "700", marginBottom: Spacing.xs },
  structureText: { ...Typography.bodyBold, fontStyle: "italic" },
  examplesSection: { gap: Spacing.sm },
  examplesLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: "700" },
  exampleRow: { paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  exampleHanzi: { ...Typography.body, fontWeight: "600", color: Colors.textPrimary },
  examplePinyin: { ...Typography.bodySmall, color: Colors.textSecondary, fontStyle: "italic", marginTop: 2 },
  exampleMeaning: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  practiceContainer: { flex: 1, padding: Spacing.lg, gap: Spacing.md },
  practiceHeader: { gap: Spacing.xs },
  practiceHeaderTop: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  practiceCounter: { ...Typography.caption, color: Colors.textSecondary, fontWeight: "600" },
  practiceQuestionArea: { flex: 1 },
  questionPrompt: { ...Typography.h2, marginBottom: Spacing.sm, color: Colors.textPrimary },
  questionPinyin: { ...Typography.body, color: Colors.textSecondary, fontStyle: "italic", marginBottom: Spacing.md },
  practiceFooter: { gap: Spacing.sm },
  resultContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: Spacing.xl, gap: Spacing.md },
  resultEmojiWrap: { width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.secondary + "20", alignItems: "center", justifyContent: "center", marginBottom: Spacing.sm },
  resultTitle: { ...Typography.h1 },
  resultCard: { alignItems: "center", padding: Spacing.xl, width: "100%", gap: Spacing.sm },
  resultLabel: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: "600" },
  resultScore: { ...Typography.hero, fontSize: 48, color: Colors.primary },
  xpBadge: { flexDirection: "row", alignItems: "center", gap: Spacing.xs, backgroundColor: Colors.xp, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full },
  xpText: { ...Typography.bodyBold, color: "#fff", fontSize: 14 },
  resultActions: { width: "100%", gap: Spacing.sm, marginTop: Spacing.lg },
});
