import { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../src/constants/theme";
import { Card, ProgressBar, FadeIn, StaggerList, MaterialIcon, IonIcon } from "../../src/components/common";
import { useUserStore } from "../../src/store/useUserStore";
import { useHskStore } from "../../src/store/useHskStore";
import { useContentCatalog } from "../../src/hooks/useContent";
import { calculateProgressFromCatalog } from "../../src/utils/contentProgress";
import { getPathLabel } from "../../src/types/user.types";

export default function ProfileScreen() {
  const settings = useUserStore((s) => s.settings);
  const lessonProgress = useHskStore((s) => s.lessonProgress);
  const srsItems = useHskStore((s) => s.srsItems);
  const { data: catalog, loading: catalogLoading, error: catalogError } = useContentCatalog();

  const allProgress = useMemo(() => {
    if (!catalog) return [];
    return catalog.levels.map((hsk) => ({
      ...hsk,
      ...calculateProgressFromCatalog(lessonProgress, hsk.id, catalog),
    }));
  }, [lessonProgress, catalog]);

  const totalLearned = allProgress.reduce((s, p) => s + p.learnedWords, 0);
  const totalLessonsDone = allProgress.reduce((s, p) => s + p.completedLessons, 0);
  const reviewedCount = srsItems.filter((i) => i.repetitions > 0).length;
  const avgPercent = allProgress.length > 0 ? allProgress.reduce((s, p) => s + p.overallPercent, 0) / allProgress.length : 0;

  const skills = {
    vocabulary: Math.min(100, avgPercent + 10),
    grammar: Math.min(100, avgPercent - 5),
    listening: Math.min(100, avgPercent - 10),
    reading: Math.min(100, avgPercent + 5),
  };

  const currentLevel = settings?.learningPath ? parseInt(settings.learningPath.split("-")[1], 10) : 1;

  const statCards = [
    { icon: <MaterialIcon name="spellcheck" size="md" color="#fff" />, label: "Từ đã học", value: totalLearned, color: Colors.success, bgColor: Colors.successLight },
    { icon: <MaterialIcon name="menu-book" size="md" color="#fff" />, label: "Bài học", value: totalLessonsDone, color: Colors.primary, bgColor: Colors.surfaceAlt },
    { icon: <MaterialIcon name="autorenew" size="md" color="#fff" />, label: "Đã ôn tập", value: reviewedCount, color: Colors.secondary, bgColor: "#FEF9C3" },
    { icon: <MaterialIcon name="layers" size="md" color="#fff" />, label: "SRS", value: srsItems.length, color: Colors.accent, bgColor: Colors.errorLight },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroSection}>
          <FadeIn>
            <View style={styles.heroContent}>
              <View style={styles.avatar}>
                <IonIcon name="person-circle" size="xxl" color="rgba(255,255,255,0.9)" />
              </View>
              <Text style={styles.title}>Tiến độ học tập</Text>
              {settings && (
                <Text style={styles.subtitle}>
                  {getPathLabel(settings.learningPath)} • {settings.targetMinutesPerDay} phút/ngày
                </Text>
              )}
            </View>
          </FadeIn>
        </LinearGradient>

        <View style={styles.bodyContent}>
          {catalogLoading && (
            <FadeIn delay={80}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Dang tai du lieu hoc tap...</Text>
              </Card>
            </FadeIn>
          )}

          {catalogError && (
            <FadeIn delay={80}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Khong the tai du lieu. Hay kiem tra content URL.</Text>
              </Card>
            </FadeIn>
          )}

          <FadeIn delay={100}>
            <View style={styles.statGrid}>
              {statCards.map((s, i) => (
                <View key={i} style={[styles.statCard, { backgroundColor: s.bgColor }]}>
                  <View style={[styles.statIconWrap, { backgroundColor: s.color }]}>
                    {s.icon}
                  </View>
                  <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </FadeIn>

          <FadeIn delay={180}>
            <Card style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <MaterialIcon name="bar-chart" size="md" color={Colors.textPrimary} />
                <Text style={styles.sectionTitle}>Kỹ năng</Text>
              </View>
              <View style={styles.skillList}>
                {[
                  { key: "vocabulary", label: "Từ vựng", value: skills.vocabulary, icon: "spellcheck" as const },
                  { key: "grammar", label: "Ngữ pháp", value: skills.grammar, icon: "article" as const },
                  { key: "listening", label: "Nghe", value: skills.listening, icon: "headphones" as const },
                  { key: "reading", label: "Đọc", value: skills.reading, icon: "visibility" as const },
                ].map((skill) => (
                  <View key={skill.key} style={styles.skillRow}>
                    <MaterialIcon name={skill.icon} size="sm" color={Colors.textSecondary} />
                    <Text style={styles.skillLabel}>{skill.label}</Text>
                    <View style={styles.skillBar}>
                      <ProgressBar progress={skill.value / 100} color={skill.value >= 70 ? Colors.success : skill.value >= 40 ? Colors.warning : Colors.error} height={8} />
                    </View>
                    <Text style={[styles.skillValue, { color: skill.value >= 70 ? Colors.success : skill.value >= 40 ? Colors.warning : Colors.error }]}>{Math.round(skill.value)}%</Text>
                  </View>
                ))}
              </View>
            </Card>
          </FadeIn>

          <FadeIn delay={260}>
            <Card style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <MaterialIcon name="trending-up" size="md" color={Colors.textPrimary} />
                <Text style={styles.sectionTitle}>HSK Progress</Text>
              </View>
              <StaggerList baseDelay={300} staggerMs={60}>
                {allProgress.map((p) => (
                  <View key={p.id} style={styles.hskRow}>
                    <View style={[styles.hskBadge, { backgroundColor: p.overallPercent > 0 ? Colors.primary : Colors.borderLight }]}>
                      <Text style={[styles.hskBadgeText, { color: p.overallPercent > 0 ? "#fff" : Colors.textSecondary }]}>HSK {p.level}</Text>
                    </View>
                    <View style={styles.hskBar}>
                      <ProgressBar progress={p.overallPercent / 100} color={p.overallPercent > 0 ? Colors.primary : Colors.border} height={8} />
                    </View>
                    <Text style={styles.hskPercent}>{Math.round(p.overallPercent)}%</Text>
                  </View>
                ))}
              </StaggerList>
            </Card>
          </FadeIn>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  heroSection: { paddingBottom: Spacing.xxl, borderBottomLeftRadius: BorderRadius.xxl, borderBottomRightRadius: BorderRadius.xxl },
  heroContent: { alignItems: "center", paddingTop: Spacing.xl, gap: Spacing.xs },
  avatar: { marginBottom: Spacing.sm },
  title: { ...Typography.h1, color: "#fff" },
  subtitle: { ...Typography.bodySmall, color: "rgba(255,255,255,0.8)" },
  bodyContent: { paddingHorizontal: Spacing.lg, marginTop: -Spacing.lg },
  statGrid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm, marginBottom: Spacing.md },
  statCard: { width: "47%", borderRadius: BorderRadius.lg, padding: Spacing.md, alignItems: "center", gap: Spacing.xs },
  statIconWrap: { width: 40, height: 40, borderRadius: BorderRadius.md, alignItems: "center", justifyContent: "center" },
  statValue: { ...Typography.h2, fontWeight: "800" },
  statLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: "600" },
  sectionCard: { marginBottom: Spacing.md, gap: Spacing.md },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  sectionTitle: { ...Typography.h3 },
  skillList: { gap: Spacing.sm },
  skillRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  skillLabel: { ...Typography.bodySmall, width: 56, color: Colors.textSecondary, fontWeight: "500" },
  skillBar: { flex: 1 },
  skillValue: { ...Typography.bodySmall, fontWeight: "700", width: 36, textAlign: "right" },
  hskRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  hskBadge: { paddingHorizontal: Spacing.sm, paddingVertical: 3, borderRadius: BorderRadius.sm },
  hskBadgeText: { ...Typography.caption, fontWeight: "700" },
  hskBar: { flex: 1 },
  hskPercent: { ...Typography.bodySmall, fontWeight: "700", width: 36, textAlign: "right", color: Colors.textSecondary },
  noticeCard: { padding: Spacing.md, marginBottom: Spacing.md },
  noticeText: { ...Typography.bodySmall, color: Colors.textSecondary },
});
