import { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../src/constants/theme";
import { Card, Button, ProgressBar, FadeIn, ScaleIn, MaterialIcon, IonIcon } from "../../src/components/common";
import { QuizOptions } from "../../src/components/lesson";
import { useTierStore, REALM1_TIER_LESSONS } from "../../src/store/useTierStore";
import { useHskStore } from "../../src/store/useHskStore";
import { useUserStore } from "../../src/store/useUserStore";
import { getCharacterForRealm } from "../../src/story/characters";
import { useContentCatalog } from "../../src/hooks/useContent";

export default function TierBreakthroughScreen() {
  const { realmId: realmIdStr, tierId: tierIdStr } = useLocalSearchParams<{ realmId: string; tierId: string }>();
  const realmId = Number(realmIdStr) || 1;
  const tierId = Number(tierIdStr) || 1;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);

  const completeBreakthrough = useTierStore((s) => s.completeBreakthrough);
  const recordAttempt = useTierStore((s) => s.recordAttempt);
  const lessonProgress = useHskStore((s) => s.lessonProgress);
  const updateXp = useUserStore((s) => s.updateXp);
  const { data: catalog } = useContentCatalog();

  const character = getCharacterForRealm(realmId);

  // Build questions from all lessons in this tier (frontend data fallback)
  const questions = useMemo(() => {
    const tierLessons = REALM1_TIER_LESSONS[tierId] ?? [];
    const allQs: { prompt: string; pinyin?: string; options: string[]; correctAnswer: string }[] = [];

    // Try loading from frontend HSK1 data
    try {
      const { hsk1Data } = require("../../src/data/hsk1");
      for (const unit of hsk1Data.units) {
        for (const lesson of unit.lessons) {
          if (tierLessons.includes(lesson.id) || tierLessons.length === 0) {
            // Tier 8/9 take from all completed lessons
            if (tierId >= 8 && !tierLessons.includes(lesson.id)) continue;
            for (const q of lesson.questions) {
              allQs.push({
                prompt: q.prompt,
                pinyin: q.pinyin,
                options: q.options ?? [],
                correctAnswer: q.correctAnswer,
              });
            }
          }
        }
      }
    } catch {}

    // Shuffle + limit to 10
    const shuffled = allQs.sort(() => Math.random() - 0.5).slice(0, 10);
    return shuffled;
  }, [tierId]);

  const currentQ = questions[currentQIndex];
  const isLast = currentQIndex >= questions.length - 1;
  const progress = questions.length > 0 ? currentQIndex / questions.length : 0;

  const handleSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setAnswers((p) => ({ ...p, [String(currentQIndex)]: option === currentQ.correctAnswer }));
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (isLast) {
      const correctCount = Object.values(answers).filter(Boolean).length;
      const score = questions.length > 0 ? correctCount / questions.length : 0;
      const threshold = 0.8;
      const didPass = score >= threshold;
      setPassed(didPass);
      setFinished(true);
      completeBreakthrough(realmId, tierId, didPass);
      recordAttempt(realmId, tierId);
      if (didPass) {
        updateXp(50);
      }
    } else {
      setCurrentQIndex((i) => i + 1);
    }
  };

  // Result screen
  if (finished) {
    const correctCount = Object.values(answers).filter(Boolean).length;
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <LinearGradient colors={passed ? ["#059669", "#10B981"] : ["#B91C1C", "#DC2626"]} style={styles.resultBg}>
          <ScaleIn>
            <Text style={styles.resultEmoji}>{passed ? "🎉" : "😤"}</Text>
            <Text style={styles.resultTitle}>
              {passed ? "ĐỘT PHÁ THÀNH CÔNG!" : "ĐỘT PHÁ THẤT BẠI"}
            </Text>
          </ScaleIn>
          <FadeIn delay={150}>
            <Card style={styles.resultCard}>
              <Text style={styles.resultScoreLabel}>Kết quả</Text>
              <Text style={[styles.resultScore, { color: passed ? Colors.success : Colors.error }]}>
                {correctCount}/{questions.length}
              </Text>
              {passed && (
                <View style={styles.xpBadge}>
                  <MaterialIcon name="bolt" size="sm" color="#fff" />
                  <Text style={styles.xpText}>+50 XP</Text>
                </View>
              )}
              {passed && character && (
                <Text style={styles.npcLine}>"{character.realmGuardian?.farewell ?? "Đi tiếp đi!"}"</Text>
              )}
              {!passed && (
                <Text style={styles.failHint}>
                  Cần đúng 80% để đột phá. {Math.round((correctCount / questions.length) * 100)}% — thiếu chút nữa!
                </Text>
              )}
            </Card>
          </FadeIn>
          <FadeIn delay={250}>
            <View style={styles.resultActions}>
              {passed ? (
                <>
                  <Button title="Học tiếp" onPress={() => router.replace("/(tabs)")} variant="primary" size="lg" />
                  <Button title="Về Tàng Kinh Các" onPress={() => router.back()} variant="ghost" />
                </>
              ) : (
                <>
                  <Button title="Vào phòng luyện" onPress={() => {
                    setFinished(false);
                    setCurrentQIndex(0);
                    setAnswers({});
                    setSelectedOption(null);
                  }} variant="gradient" size="lg" />
                  <Button title="Về trang chủ" onPress={() => router.replace("/(tabs)")} variant="ghost" />
                </>
              )}
            </View>
          </FadeIn>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // Loading / empty
  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.centerBox}>
          <Text style={styles.emptyIcon}>⚡</Text>
          <Text style={styles.emptyTitle}>Chưa có bài kiểm tra</Text>
          <Text style={styles.emptyDesc}>Học thêm bài trong tầng này để mở khóa đột phá nhé.</Text>
          <Button title="Quay lại" onPress={() => router.back()} variant="outline" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        {/* Header */}
        <LinearGradient colors={["#1F2937", "#374151"]} style={styles.headerBar}>
          <View style={styles.headerTop}>
            <MaterialIcon name="auto-awesome" size="sm" color={Colors.secondary} />
            <Text style={styles.headerTitle}>Đột Phá Tầng {tierId}/9</Text>
            <Text style={styles.headerRealm}>Phàm Nhân Cảnh</Text>
          </View>
          <ProgressBar progress={progress} color={Colors.secondary} height={4} trackColor="rgba(255,255,255,0.15)" />
          <Text style={styles.headerCounter}>Câu {currentQIndex + 1}/{questions.length}</Text>
        </LinearGradient>

        {/* Question */}
        <ScrollView style={styles.qArea} showsVerticalScrollIndicator={false}>
          {currentQ && (
            <ScaleIn key={currentQIndex}>
              <Text style={styles.qPrompt}>{currentQ.prompt}</Text>
              {currentQ.pinyin && <Text style={styles.qPinyin}>{currentQ.pinyin}</Text>}
              <QuizOptions
                options={currentQ.options}
                selectedOption={selectedOption ?? undefined}
                correctAnswer={currentQ.correctAnswer}
                onSelect={handleSelect}
                disabled={!!selectedOption}
              />
            </ScaleIn>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          {selectedOption && (
            <Button title={isLast ? "Xem kết quả" : "Tiếp theo"} onPress={handleNext} variant="gradient" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1 },
  centerBox: { flex: 1, justifyContent: "center", alignItems: "center", padding: Spacing.xl, gap: Spacing.md },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { ...Typography.h2, textAlign: "center" },
  emptyDesc: { ...Typography.body, color: Colors.textSecondary, textAlign: "center" },

  headerBar: { padding: Spacing.md, gap: Spacing.xs },
  headerTop: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  headerTitle: { ...Typography.h3, color: "#FFF", flex: 1 },
  headerRealm: { ...Typography.caption, color: Colors.secondary, fontWeight: "600" },
  headerCounter: { ...Typography.caption, color: "rgba(255,255,255,0.6)", textAlign: "right" },

  qArea: { flex: 1, padding: Spacing.lg, gap: Spacing.md },
  qPrompt: { ...Typography.h2, color: Colors.textPrimary, marginBottom: Spacing.sm },
  qPinyin: { ...Typography.body, color: Colors.textSecondary, fontStyle: "italic", marginBottom: Spacing.md },

  footer: { padding: Spacing.lg, gap: Spacing.sm },

  resultBg: { flex: 1, justifyContent: "center", alignItems: "center", padding: Spacing.xl, gap: Spacing.md },
  resultEmoji: { fontSize: 64 },
  resultTitle: { ...Typography.h1, color: "#FFF", textAlign: "center" },
  resultCard: { width: "100%", alignItems: "center", padding: Spacing.xl, gap: Spacing.sm },
  resultScoreLabel: { ...Typography.bodySmall, color: Colors.textSecondary },
  resultScore: { ...Typography.hero, fontSize: 48 },
  xpBadge: { flexDirection: "row", alignItems: "center", gap: Spacing.xs, backgroundColor: Colors.xp, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full },
  xpText: { ...Typography.bodyBold, color: "#FFF" },
  npcLine: { ...Typography.bodySmall, fontStyle: "italic", color: Colors.textSecondary, textAlign: "center", marginTop: Spacing.sm },
  failHint: { ...Typography.bodySmall, color: Colors.textSecondary, textAlign: "center", marginTop: Spacing.sm },
  resultActions: { width: "100%", gap: Spacing.sm },
});
