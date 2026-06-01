import { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius } from "../../src/constants/theme";
import { Card, Button, ProgressBar, FadeIn, StaggerList, MaterialIcon, IonIcon } from "../../src/components/common";
import { useHskStore } from "../../src/store/useHskStore";
import { useUserStore } from "../../src/store/useUserStore";
import { useContentCatalog, useLearningPathByCode } from "../../src/hooks/useContent";
import { calculateProgressFromCatalog } from "../../src/utils/contentProgress";

export default function HskLevelScreen() {
  const { level, track } = useLocalSearchParams<{ level: string; track?: string }>();
  const levelNum = parseInt(level || "1");
  const settings = useUserStore((s) => s.settings);
  const activeTrack = track || settings?.learningPath?.split("-")[0] || "new";
  const pathCode = `${activeTrack}-${levelNum}`;
  const lessonProgress = useHskStore((s) => s.lessonProgress);
  const { data: catalog, loading, error } = useContentCatalog();
  const { path: learningPath } = useLearningPathByCode(pathCode);

  const hskLevel = useMemo(() => {
    if (!catalog) return null;
    return catalog.levels.find((l) => l.level === levelNum) || null;
  }, [catalog, levelNum]);

  const progress = useMemo(
    () => calculateProgressFromCatalog(lessonProgress, levelNum, catalog || null),
    [lessonProgress, levelNum, catalog]
  );

  const units = hskLevel?.units || [];

  if (!hskLevel && !loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.errorSection}>
          <IonIcon name="alert-circle-outline" size="xl" color={Colors.error} />
          <Text style={styles.errorText}>Không tìm thấy HSK level {level}</Text>
          <Button title="Quay lại" onPress={() => router.back()} variant="outline" />
        </View>
      </SafeAreaView>
    );
  }

  const pathName = learningPath?.name || hskLevel?.name || `HSK ${levelNum}`;
  const pathDesc = learningPath?.description || hskLevel?.description || "";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen options={{ title: pathName }} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroSection}>
          <FadeIn>
            <View style={styles.heroContent}>
              <Text style={styles.heroEmoji}>🐱🐉</Text>
              <Text style={styles.heroTitle}>{pathName}</Text>
              <Text style={styles.heroDesc}>{pathDesc}</Text>
            </View>
          </FadeIn>
        </LinearGradient>

        <View style={styles.bodyContent}>
          {loading && (
            <FadeIn delay={60}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Dang tai noi dung...</Text>
              </Card>
            </FadeIn>
          )}

          {error && (
            <FadeIn delay={60}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Khong the tai du lieu.</Text>
              </Card>
            </FadeIn>
          )}

          {progress && (
            <FadeIn delay={80}>
              <Card style={styles.progressCard}>
                <View style={styles.progressHeader}>
                  <MaterialIcon name="trending-up" size="md" color={Colors.success} />
                  <Text style={styles.progressLabel}>Tiến độ</Text>
                  <Text style={styles.progressPercent}>{Math.round(progress.overallPercent)}%</Text>
                </View>
                <ProgressBar progress={progress.overallPercent / 100} color={Colors.success} height={10} />
                <View style={styles.progressStats}>
                  <View style={styles.progressStat}>
                    <MaterialIcon name="menu-book" size="sm" color={Colors.primary} />
                    <Text style={styles.progressStatText}>{progress.completedLessons}/{progress.totalLessons} bài</Text>
                  </View>
                  <View style={styles.progressStat}>
                    <MaterialIcon name="spellcheck" size="sm" color={Colors.info} />
                    <Text style={styles.progressStatText}>{progress.learnedWords}/{progress.totalWords} từ</Text>
                  </View>
                </View>
              </Card>
            </FadeIn>
          )}

          <StaggerList baseDelay={150} staggerMs={80}>
            {units.map((topic, idx) => {
              const lessonList = topic.lessons || [];
              const unitProgress = lessonList.filter((l) => lessonProgress[l.id]).length;
              return (
                <Card key={topic.id} style={styles.unitCard}>
                  <View style={styles.unitHeader}>
                    <View style={styles.unitBadge}>
                      <Text style={styles.unitBadgeText}>{idx + 1}</Text>
                    </View>
                    <View style={styles.unitInfo}>
                      <Text style={styles.unitTitle}>{topic.title}</Text>
                      <Text style={styles.unitDesc}>{topic.description}</Text>
                    </View>
                    <Text style={styles.unitProgress}>{unitProgress}/{lessonList.length}</Text>
                  </View>

                  <View style={styles.lessonList}>
                    {lessonList.map((lesson) => {
                      const isDone = !!lessonProgress[lesson.id];
                      return (
                        <Card
                          key={lesson.id}
                          onPress={() => router.push(`/lesson/${lesson.id}`)}
                          style={[styles.lessonItem, isDone ? styles.lessonItemDone : undefined]}
                          padded={false}
                        >
                          <View style={styles.lessonItemContent}>
                            <View style={[styles.lessonIconWrap, { backgroundColor: isDone ? Colors.success + "20" : Colors.borderLight }]}>
                              {isDone ? <MaterialIcon name="check-circle" size="sm" color={Colors.success} /> : <MaterialIcon name="radio-button-unchecked" size="sm" color={Colors.textLight} />}
                            </View>
                            <View style={styles.lessonInfo}>
                              <Text style={[styles.lessonTitle, isDone ? styles.lessonTitleDone : undefined]}>{lesson.title}</Text>
                              <Text style={styles.lessonDesc}>{lesson.description}</Text>
                            </View>
                            <MaterialIcon name="chevron-right" size="sm" color={Colors.textLight} />
                          </View>
                        </Card>
                      );
                    })}
                  </View>
                </Card>
              );
            })}
          </StaggerList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  heroSection: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xl, borderBottomLeftRadius: BorderRadius.xxl, borderBottomRightRadius: BorderRadius.xxl },
  heroContent: { gap: Spacing.xs },
  heroEmoji: { fontSize: 48, marginBottom: 4 },
  heroTitle: { ...Typography.h1, color: "#fff" },
  heroDesc: { ...Typography.bodySmall, color: "rgba(255,255,255,0.85)" },
  bodyContent: { paddingHorizontal: Spacing.lg, marginTop: Spacing.lg, gap: Spacing.md },
  errorSection: { flex: 1, justifyContent: "center", alignItems: "center", gap: Spacing.md, padding: Spacing.xl },
  errorText: { ...Typography.h3, color: Colors.error, textAlign: "center" },
  progressCard: { gap: Spacing.sm },
  progressHeader: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  progressLabel: { ...Typography.bodyBold, flex: 1 },
  progressPercent: { ...Typography.h3, color: Colors.success },
  progressStats: { flexDirection: "row", gap: Spacing.md },
  progressStat: { flexDirection: "row", alignItems: "center", gap: Spacing.xs },
  progressStatText: { ...Typography.caption, color: Colors.textSecondary },
  unitCard: { gap: Spacing.md },
  unitHeader: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  unitBadge: { width: 36, height: 36, borderRadius: BorderRadius.md, backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center" },
  unitBadgeText: { ...Typography.bodyBold, color: "#fff" },
  unitInfo: { flex: 1 },
  unitTitle: { ...Typography.h3 },
  unitDesc: { ...Typography.caption, color: Colors.textSecondary, marginTop: 1 },
  unitProgress: { ...Typography.caption, color: Colors.textSecondary, fontWeight: "700" },
  lessonList: { gap: Spacing.xs },
  lessonItem: { borderRadius: BorderRadius.md, overflow: "hidden" },
  lessonItemDone: { opacity: 0.65 },
  lessonItemContent: { flexDirection: "row", alignItems: "center", padding: Spacing.md, gap: Spacing.sm },
  lessonIconWrap: { width: 32, height: 32, borderRadius: BorderRadius.sm, alignItems: "center", justifyContent: "center" },
  lessonInfo: { flex: 1 },
  lessonTitle: { ...Typography.body, fontWeight: "600" },
  lessonTitleDone: { textDecorationLine: "line-through", color: Colors.textSecondary },
  lessonDesc: { ...Typography.caption, color: Colors.textLight },
  noticeCard: { padding: Spacing.md },
  noticeText: { ...Typography.bodySmall, color: Colors.textSecondary },
});
