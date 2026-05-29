import { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../src/constants/theme";
import { Card, Button, ProgressBar, FadeIn, ScaleIn, MaterialIcon, IonIcon } from "../../src/components/common";
import { QuizOptions } from "../../src/components/lesson";
import { placementTestQuestions, calculatePlacementResult } from "../../src/data/placementTest";
import { useUserStore } from "../../src/store/useUserStore";
import { useHskStore } from "../../src/store/useHskStore";

export default function PlacementTestScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const setSettings = useUserStore((s) => s.setSettings);
  const setPlacementResult = useHskStore((s) => s.setPlacementResult);

  const questions = placementTestQuestions;
  const currentQuestion = questions[currentIndex];
  const progress = currentIndex / questions.length;

  const handleSelect = useCallback((option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option === currentQuestion.correctAnswer }));
  }, [selectedOption, currentQuestion]);

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      const result = calculatePlacementResult(answers);
      setPlacementResult(result);
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    const result = calculatePlacementResult(answers);
    const path = `exp-${result.suggestedStartHsk}` as const;
    setSettings({ learningPath: path, targetMinutesPerDay: 15, targetWordsPerDay: 5, startDate: new Date().toISOString() });
    router.replace("/(tabs)");
  };

  if (showResult) {
    const result = calculatePlacementResult(answers);
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroSection}>
            <ScaleIn>
              <View style={styles.heroContent}>
                <IonIcon name="trophy-outline" size="xxl" color="#fff" />
                <Text style={styles.heroTitle}>Kết quả</Text>
                <Text style={styles.heroSub}>Bài kiểm tra đầu vào đã hoàn thành</Text>
              </View>
            </ScaleIn>
          </LinearGradient>

          <View style={styles.bodyContent}>
            <FadeIn delay={100}>
              <Card style={styles.resultMain}>
                <Text style={styles.resultLabel}>Trình độ ước tính</Text>
                <View style={styles.resultLevelWrap}>
                  <Text style={styles.resultLevel}>HSK {result.suggestedStartHsk}</Text>
                </View>
                <ProgressBar progress={result.overallPercent / 100} color={Colors.success} height={8} />
                <View style={styles.resultScoreRow}>
                  <Text style={styles.resultScoreLabel}>Tổng thể</Text>
                  <Text style={[styles.resultScore, { color: result.overallPercent >= 60 ? Colors.success : Colors.warning }]}>{result.overallPercent}%</Text>
                </View>
              </Card>
            </FadeIn>

            <FadeIn delay={180}>
              <Card style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <MaterialIcon name="bar-chart" size="md" color={Colors.textPrimary} />
                  <Text style={styles.sectionTitle}>Chi tiết điểm</Text>
                </View>
                {[
                  { label: "Từ vựng", value: result.vocabPercent, icon: "spellcheck" as const },
                  { label: "Ngữ pháp", value: result.grammarPercent, icon: "article" as const },
                  { label: "Đọc hiểu", value: result.readingPercent, icon: "visibility" as const },
                  { label: "Nghe hiểu", value: result.listeningPercent, icon: "headphones" as const },
                ].map((s) => (
                  <View key={s.label} style={styles.resultDetailRow}>
                    <MaterialIcon name={s.icon} size="sm" color={Colors.textSecondary} />
                    <Text style={styles.resultDetailLabel}>{s.label}</Text>
                    <ProgressBar progress={s.value / 100} color={s.value >= 60 ? Colors.success : Colors.warning} height={6} style={styles.resultDetailBar} />
                    <Text style={styles.resultDetailValue}>{s.value}%</Text>
                  </View>
                ))}
              </Card>
            </FadeIn>

            {result.weakAreas.length > 0 && (
              <FadeIn delay={260}>
                <Card style={styles.weakCard}>
                  <View style={styles.sectionHeader}>
                    <MaterialIcon name="warning" size="md" color={Colors.warning} />
                    <Text style={styles.sectionTitle}>Cần cải thiện</Text>
                  </View>
                  {result.weakAreas.map((area) => (
                    <View key={area} style={styles.weakItem}>
                      <MaterialIcon name="circle" size="sm" color={Colors.warning} />
                      <Text style={styles.weakText}>{area}</Text>
                    </View>
                  ))}
                </Card>
              </FadeIn>
            )}

            {result.suggestedReviewHsk && (
              <FadeIn delay={340}>
                <Card style={styles.reviewCard}>
                  <IonIcon name="information-circle" size="md" color={Colors.warning} />
                  <Text style={styles.reviewText}>Nên ôn lại HSK {result.suggestedReviewHsk} trước khi bắt đầu HSK {result.suggestedStartHsk}.</Text>
                </Card>
              </FadeIn>
            )}

            <FadeIn delay={420}>
              <Button title="Bắt đầu học!" onPress={handleComplete} variant="gradient" size="lg" icon={<IonIcon name="arrow-forward" size="md" color="#fff" />} />
            </FadeIn>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.testContent}>
        <View style={styles.testHeader}>
          <View style={styles.testHeaderTop}>
            <MaterialIcon name="quiz" size="md" color={Colors.primary} />
            <Text style={styles.testHeaderLabel}>Bài kiểm tra đầu vào</Text>
          </View>
          <ProgressBar progress={progress} color={Colors.primary} height={6} />
          <Text style={styles.testCounter}>Câu {currentIndex + 1}/{questions.length}</Text>
        </View>

        <ScrollView style={styles.testQuestionArea} showsVerticalScrollIndicator={false}>
          <FadeIn key={currentIndex}>
            <Card style={styles.categoryBadge}>
              <MaterialIcon name="folder" size="sm" color={Colors.primary} />
              <Text style={styles.categoryText}>{currentQuestion.category}</Text>
            </Card>

            {currentQuestion.passage && (
              <Card style={styles.passageCard}>
                <Text style={styles.passageText}>{currentQuestion.passage}</Text>
              </Card>
            )}

            <Text style={styles.questionPrompt}>{currentQuestion.prompt}</Text>

            {currentQuestion.hanzi && (
              <Text style={styles.hanziDisplay}>{currentQuestion.hanzi}</Text>
            )}

            <QuizOptions
              options={currentQuestion.options}
              selectedOption={selectedOption || undefined}
              correctAnswer={currentQuestion.correctAnswer}
              onSelect={handleSelect}
              disabled={!!selectedOption}
            />
          </FadeIn>
        </ScrollView>

        <View style={styles.testFooter}>
          {selectedOption && <Button title={currentIndex < questions.length - 1 ? "Tiếp theo" : "Xem kết quả"} onPress={handleNext} variant="gradient" icon={<IonIcon name="arrow-forward" size="md" color="#fff" />} />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  heroSection: { paddingVertical: Spacing.xl, borderBottomLeftRadius: BorderRadius.xxl, borderBottomRightRadius: BorderRadius.xxl },
  heroContent: { alignItems: "center", gap: Spacing.sm, paddingHorizontal: Spacing.lg },
  heroTitle: { ...Typography.h1, color: "#fff" },
  heroSub: { ...Typography.bodySmall, color: "rgba(255,255,255,0.85)" },
  bodyContent: { paddingHorizontal: Spacing.lg, marginTop: Spacing.lg, gap: Spacing.md },
  resultMain: { alignItems: "center", gap: Spacing.md, padding: Spacing.xl },
  resultLabel: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: "600" },
  resultLevelWrap: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.primary + "15", alignItems: "center", justifyContent: "center" },
  resultLevel: { ...Typography.hero, color: Colors.primary },
  resultScoreRow: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  resultScoreLabel: { ...Typography.body, color: Colors.textSecondary },
  resultScore: { ...Typography.h3, fontWeight: "800" },
  sectionCard: { gap: Spacing.sm },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: Spacing.sm, marginBottom: Spacing.xs },
  sectionTitle: { ...Typography.h3 },
  resultDetailRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  resultDetailLabel: { ...Typography.caption, width: 56, color: Colors.textSecondary, fontWeight: "500" },
  resultDetailBar: { flex: 1 },
  resultDetailValue: { ...Typography.caption, fontWeight: "700", width: 36, textAlign: "right", color: Colors.textSecondary },
  weakCard: { gap: Spacing.sm },
  weakItem: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  weakText: { ...Typography.bodySmall, color: Colors.textSecondary },
  reviewCard: { flexDirection: "row", alignItems: "center", gap: Spacing.sm, backgroundColor: Colors.warningLight, padding: Spacing.md },
  reviewText: { ...Typography.bodySmall, color: Colors.warning, flex: 1 },
  testContent: { flex: 1, padding: Spacing.lg, gap: Spacing.md },
  testHeader: { gap: Spacing.sm },
  testHeaderTop: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  testHeaderLabel: { ...Typography.bodyBold, color: Colors.textSecondary },
  testCounter: { ...Typography.caption, color: Colors.textSecondary, textAlign: "right" },
  testQuestionArea: { flex: 1 },
  categoryBadge: { flexDirection: "row", alignItems: "center", gap: Spacing.sm, paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, alignSelf: "flex-start", backgroundColor: Colors.primary + "10", marginBottom: Spacing.sm },
  categoryText: { ...Typography.caption, color: Colors.primary, fontWeight: "600" },
  passageCard: { padding: Spacing.md, backgroundColor: Colors.infoLight, marginBottom: Spacing.sm },
  passageText: { ...Typography.body, fontStyle: "italic", color: Colors.info },
  questionPrompt: { ...Typography.h3, marginVertical: Spacing.md, color: Colors.textPrimary },
  hanziDisplay: { fontSize: 36, fontWeight: "700", color: Colors.textPrimary, textAlign: "center", letterSpacing: 4, marginBottom: Spacing.md },
  testFooter: { gap: Spacing.sm },
});
