import { useState, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../src/constants/theme";
import { Card, Button, ProgressBar, FadeIn, ScaleIn, MaterialIcon, IonIcon } from "../../src/components/common";
import { Flashcard } from "../../src/components/lesson";
import { useHskStore, getDueSrsItems } from "../../src/store/useHskStore";
import { calculateNextReview } from "../../src/utils/srsLogic";
import { API_ROUTES } from "../../src/constants/apiRoutes";
import apiClient from "../../src/services/apiClient";

export default function ReviewScreen() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState({ total: 0, good: 0, ok: 0, bad: 0 });

  const srsItems = useHskStore((s) => s.srsItems);
  const updateSrsItem = useHskStore((s) => s.updateSrsItem);
  const dueItems = useMemo(() => getDueSrsItems(srsItems), [srsItems]);
  const currentItem = dueItems[currentIndex];

  const handleFlip = useCallback(() => setShowAnswer(true), []);

  const handleRating = useCallback((quality: number) => {
    if (!currentItem) return;
    const updated = calculateNextReview({
      id: currentItem.id,
      interval: currentItem.interval,
      easeFactor: currentItem.easeFactor,
      repetitions: currentItem.repetitions,
      nextReviewDate: currentItem.nextReviewDate,
    }, quality);
    updateSrsItem(currentItem.id, updated);

    apiClient.post(API_ROUTES.REVIEWS.SUBMIT, {
      vocabularyId: currentItem.vocabularyId,
      quality,
    }).catch(() => {});

    setResult((prev) => ({ ...prev, total: prev.total + 1, ...(quality >= 4 ? { good: prev.good + 1 } : quality >= 2 ? { ok: prev.ok + 1 } : { bad: prev.bad + 1 }) }));

    if (currentIndex < dueItems.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setCompleted(true);
    }
  }, [currentItem, currentIndex, dueItems.length, updateSrsItem]);

  if (completed) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ScaleIn>
            <View style={styles.resultSection}>
              <View style={[styles.resultEmojiWrap, { backgroundColor: Colors.primary + "20" }]}>
                <IonIcon name="happy-outline" size="xxl" color={Colors.primary} />
              </View>
              <Text style={styles.resultTitle}>Hoàn thành ôn tập!</Text>
              <Text style={styles.resultSub}>Hôm nay bạn đã ôn {result.total} từ</Text>
            </View>
          </ScaleIn>

          <FadeIn delay={150}>
            <Card style={styles.resultStats}>
              <View style={styles.resultStatRow}>
                <View style={[styles.resultDot, { backgroundColor: Colors.success }]} />
                <Text style={styles.resultStatLabel}>Nhớ tốt</Text>
                <Text style={[styles.resultStatValue, { color: Colors.success }]}>{result.good}</Text>
              </View>
              <View style={styles.resultStatRow}>
                <View style={[styles.resultDot, { backgroundColor: Colors.warning }]} />
                <Text style={styles.resultStatLabel}>Hơi khó</Text>
                <Text style={[styles.resultStatValue, { color: Colors.warning }]}>{result.ok}</Text>
              </View>
              <View style={styles.resultStatRow}>
                <View style={[styles.resultDot, { backgroundColor: Colors.error }]} />
                <Text style={styles.resultStatLabel}>Cần ôn lại</Text>
                <Text style={[styles.resultStatValue, { color: Colors.error }]}>{result.bad}</Text>
              </View>
            </Card>
          </FadeIn>

          <FadeIn delay={250}>
            <Button title="Về trang chủ" onPress={() => { router.replace("/(tabs)"); }} variant="gradient" size="lg" icon={<IonIcon name="home-outline" size="md" color="#fff" />} />
          </FadeIn>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!started) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroSection}>
            <FadeIn>
              <View style={styles.heroContent}>
                <Text style={styles.heroEmoji}>🐱🐉</Text>
                <Text style={styles.heroTitle}>Ôn tập</Text>
                <Text style={styles.heroSub}>Spaced Repetition giúp bạn nhớ lâu hơn</Text>
              </View>
            </FadeIn>
          </LinearGradient>

          <View style={styles.bodyContent}>
            {dueItems.length === 0 ? (
              <FadeIn delay={100}>
                <Card style={styles.emptyCard}>
                  <IonIcon name="checkmark-circle-outline" size="xl" color={Colors.success} />
                  <Text style={styles.emptyTitle}>Không có từ cần ôn</Text>
                  <Text style={styles.emptyText}>Học bài mới để có từ vựng cần ôn tập nhé!</Text>
                </Card>
              </FadeIn>
            ) : (
              <FadeIn delay={100}>
                <Card style={styles.summaryCard}>
                  <View style={styles.summaryCountWrap}>
                    <Text style={styles.summaryCount}>{dueItems.length}</Text>
                  </View>
                  <Text style={styles.summaryLabel}>từ cần ôn hôm nay</Text>
                  <Text style={styles.summaryHint}>Học đều đặn mỗi ngày để đạt kết quả tốt nhất</Text>
                </Card>
              </FadeIn>
            )}

            <FadeIn delay={200}>
              <Button
                title="Bắt đầu ôn tập"
                onPress={() => setStarted(true)}
                variant="gradient"
                size="lg"
                disabled={dueItems.length === 0}
                icon={<IonIcon name="play" size="md" color="#fff" />}
              />
            </FadeIn>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.reviewContent}>
        <FadeIn>
          <View style={styles.reviewHeader}>
            <ProgressBar progress={currentIndex / Math.max(dueItems.length, 1)} color={Colors.primary} height={6} />
            <Text style={styles.reviewCounter}>{currentIndex + 1} / {dueItems.length}</Text>
          </View>
        </FadeIn>

        <View style={styles.reviewCardArea}>
          {currentItem && (
            <ScaleIn key={currentItem.id}>
              <Flashcard
                hanzi={currentItem.hanzi}
                pinyin={currentItem.pinyin}
                meaning={currentItem.meaning}
                showAnswer={showAnswer}
                onFlip={handleFlip}
              />
            </ScaleIn>
          )}
        </View>

        {showAnswer && (
          <FadeIn>
            <View style={styles.ratingArea}>
              <Text style={styles.ratingLabel}>Bạn nhớ từ này thế nào?</Text>
              <View style={styles.ratingRow}>
                <Button title="😰 Quên" onPress={() => handleRating(1)} variant="outline" size="sm" style={styles.ratingBtn} />
                <Button title="🤔 Hơi khó" onPress={() => handleRating(3)} variant="outline" size="sm" style={styles.ratingBtn} />
                <Button title="😊 Dễ" onPress={() => handleRating(5)} variant="primary" size="sm" style={styles.ratingBtn} />
              </View>
            </View>
          </FadeIn>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  heroSection: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xl, borderBottomLeftRadius: BorderRadius.xxl, borderBottomRightRadius: BorderRadius.xxl },
  heroContent: { alignItems: "center", gap: Spacing.sm },
  heroEmoji: { fontSize: 48, marginBottom: 4 },
  heroTitle: { ...Typography.h1, color: "#fff" },
  heroSub: { ...Typography.bodySmall, color: "rgba(255,255,255,0.85)", textAlign: "center" },
  bodyContent: { paddingHorizontal: Spacing.lg, marginTop: Spacing.lg, gap: Spacing.md },
  emptyCard: { alignItems: "center", padding: Spacing.xl, gap: Spacing.sm },
  emptyTitle: { ...Typography.h3, color: Colors.textPrimary },
  emptyText: { ...Typography.bodySmall, color: Colors.textSecondary, textAlign: "center" },
  summaryCard: { alignItems: "center", padding: Spacing.xl, gap: Spacing.sm },
  summaryCountWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primary + "15", alignItems: "center", justifyContent: "center", marginBottom: Spacing.sm },
  summaryCount: { ...Typography.hero, color: Colors.primary },
  summaryLabel: { ...Typography.h3, color: Colors.textPrimary },
  summaryHint: { ...Typography.caption, color: Colors.textSecondary, textAlign: "center" },
  reviewContent: { flex: 1, padding: Spacing.lg, gap: Spacing.md },
  reviewHeader: { gap: Spacing.xs },
  reviewCounter: { ...Typography.caption, color: Colors.textSecondary, textAlign: "right" },
  reviewCardArea: { flex: 1, justifyContent: "center" },
  ratingArea: { gap: Spacing.sm, paddingBottom: Spacing.lg },
  ratingLabel: { ...Typography.bodySmall, textAlign: "center", color: Colors.textSecondary, fontWeight: "600" },
  ratingRow: { flexDirection: "row", gap: Spacing.sm },
  ratingBtn: { flex: 1 },
  resultSection: { alignItems: "center", paddingTop: Spacing.xxxl, gap: Spacing.sm },
  resultEmojiWrap: { width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.secondary + "20", alignItems: "center", justifyContent: "center", marginBottom: Spacing.sm },
  resultTitle: { ...Typography.h1, color: Colors.textPrimary },
  resultSub: { ...Typography.body, color: Colors.textSecondary },
  resultStats: { marginHorizontal: Spacing.lg, gap: Spacing.md, padding: Spacing.lg },
  resultStatRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  resultDot: { width: 10, height: 10, borderRadius: 5 },
  resultStatLabel: { ...Typography.body, flex: 1, color: Colors.textSecondary },
  resultStatValue: { ...Typography.h3, fontWeight: "800" },
});
