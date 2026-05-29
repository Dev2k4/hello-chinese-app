import { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../src/constants/theme";
import { Card, ProgressBar, AnimatedCard, FadeIn, StaggerList, MaterialIcon, IonIcon } from "../../src/components/common";
import { useHskStore, getDueSrsItems } from "../../src/store/useHskStore";
import { useUserStore } from "../../src/store/useUserStore";
import { useContentCatalog } from "../../src/hooks/useContent";
import { calculateProgressFromCatalog } from "../../src/utils/contentProgress";
import { getPathLabel, getTrackFromPath } from "../../src/types/user.types";

function StatBadge({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <View style={styles.statBadge}>
      {icon}
      <Text style={[styles.statBadgeValue, { color }]}>{value}</Text>
      <Text style={styles.statBadgeLabel}>{label}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const settings = useUserStore((s) => s.settings);
  const lessonProgress = useHskStore((s) => s.lessonProgress);
  const srsItems = useHskStore((s) => s.srsItems);
  const { data: catalog, loading: catalogLoading, error: catalogError } = useContentCatalog();

  const dueItems = useMemo(() => getDueSrsItems(srsItems), [srsItems]);
  const currentLevel = settings?.learningPath ? parseInt(settings.learningPath.split("-")[1], 10) : 1;
  const currentTrack = settings?.learningPath ? getTrackFromPath(settings.learningPath) : null;
  const currentProgress = useMemo(
    () => calculateProgressFromCatalog(lessonProgress, currentLevel, catalog),
    [lessonProgress, currentLevel, catalog]
  );

  const hskCards = useMemo(() => {
    if (!catalog) return [];
    return catalog.levels.map((hsk) => ({
      ...hsk,
      progress: calculateProgressFromCatalog(lessonProgress, hsk.id, catalog),
    }));
  }, [lessonProgress, catalog]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroSection}>
          <FadeIn>
            <View style={styles.heroRow}>
              <View style={styles.heroText}>
                <Text style={styles.heroGreeting}>Xin chào! 👋</Text>
                <Text style={styles.heroSub}>
                  {settings?.learningPath ? getPathLabel(settings.learningPath) : "Bắt đầu học"}
                </Text>
              </View>
              <View style={styles.heroAvatar}>
                <IonIcon name="person-circle-outline" size="xl" color="#fff" />
              </View>
            </View>
          </FadeIn>
        </LinearGradient>

        <View style={styles.bodyContent}>
          {catalogLoading && (
            <FadeIn delay={50}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Dang tai du lieu bai hoc...</Text>
              </Card>
            </FadeIn>
          )}

          {catalogError && (
            <FadeIn delay={50}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Khong the tai noi dung. Hay kiem tra cau hinh content URL.</Text>
              </Card>
            </FadeIn>
          )}

          {currentProgress && (
            <FadeIn delay={100}>
              <View style={styles.currentLevelSection}>
                <View style={styles.currentLevelHeader}>
                  <View style={styles.currentLevelTitleRow}>
                    <MaterialIcon name="school" size="md" color={Colors.primary} />
                    <Text style={styles.currentLevelTitle}>HSK {currentLevel}</Text>
                  </View>
                  <Text style={styles.currentLevelPercent}>{Math.round(currentProgress.overallPercent)}%</Text>
                </View>
                <ProgressBar progress={currentProgress.overallPercent / 100} color={Colors.success} height={10} />
                <View style={styles.statsRow}>
                  <StatBadge icon={<MaterialIcon name="menu-book" size="sm" color={Colors.primary} />} label="Bài học" value={`${currentProgress.completedLessons}/${currentProgress.totalLessons}`} color={Colors.primary} />
                  <StatBadge icon={<MaterialIcon name="spellcheck" size="sm" color={Colors.info} />} label="Từ vựng" value={`${currentProgress.learnedWords}/${currentProgress.totalWords}`} color={Colors.info} />
                  <StatBadge icon={<MaterialIcon name="local-fire-department" size="sm" color={Colors.streak} />} label="Streak" value="0" color={Colors.streak} />
                </View>
              </View>
            </FadeIn>
          )}

          {dueItems.length > 0 && (
            <FadeIn delay={180}>
              <Card onPress={() => router.push("/(tabs)/review")} style={styles.reviewBanner}>
                <View style={styles.reviewBannerContent}>
                  <View style={styles.reviewIconWrap}>
                    <MaterialIcon name="autorenew" size="lg" color="#fff" />
                  </View>
                  <View style={styles.reviewText}>
                    <Text style={styles.reviewTitle}>Ôn tập hôm nay</Text>
                    <Text style={styles.reviewCount}>{dueItems.length} từ cần ôn tập</Text>
                  </View>
                  <MaterialIcon name="chevron-right" size="md" color={Colors.textSecondary} />
                </View>
              </Card>
            </FadeIn>
          )}

          <View style={styles.sectionHeader}>
            <MaterialIcon name="map" size="md" color={Colors.textPrimary} />
            <Text style={styles.sectionTitle}>Lộ trình HSK</Text>
          </View>

          <StaggerList baseDelay={250} staggerMs={100}>
            {hskCards.map((hsk) => {
              const isActive = hsk.id === currentLevel;
              return (
                <AnimatedCard key={hsk.id} style={styles.hskCard}>
                  <View style={styles.hskCardHeader}>
                    <View style={[styles.hskBadge, { backgroundColor: isActive ? Colors.primary : Colors.borderLight }]}>
                      <Text style={[styles.hskBadgeText, { color: isActive ? "#fff" : Colors.textSecondary }]}>{hsk.name}</Text>
                    </View>
                    <Text style={styles.hskPercent}>{Math.round(hsk.progress.overallPercent)}%</Text>
                  </View>
                  <ProgressBar progress={hsk.progress.overallPercent / 100} color={isActive ? Colors.primary : Colors.border} height={6} />
                  <Text style={styles.hskDesc}>{hsk.description}</Text>

                  <View style={styles.hskActions}>
                    <Card
                      onPress={() => router.push(`/learning-path/${hsk.level}?track=${currentTrack || "new"}`)}
                      style={styles.hskActionBtn} padded={false}
                    >
                      <MaterialIcon name="menu-book" size="sm" color={Colors.primary} />
                      <Text style={styles.hskActionLabel}>Bài học</Text>
                    </Card>
                    <Card
                      onPress={() => router.push(`/vocabulary/${hsk.level}?levelId=${hsk.id}`)}
                      style={styles.hskActionBtn} padded={false}
                    >
                      <MaterialIcon name="spellcheck" size="sm" color={Colors.info} />
                      <Text style={styles.hskActionLabel}>Từ vựng</Text>
                    </Card>
                    <Card
                      onPress={() => router.push(`/grammar/${hsk.level}?levelId=${hsk.id}`)}
                      style={styles.hskActionBtn} padded={false}
                    >
                      <MaterialIcon name="book" size="sm" color={Colors.accent} />
                      <Text style={styles.hskActionLabel}>Ngữ pháp</Text>
                    </Card>
                  </View>
                </AnimatedCard>
              );
            })}
          </StaggerList>

          <View style={styles.sectionHeader}>
            <MaterialIcon name="grid-view" size="md" color={Colors.textPrimary} />
            <Text style={styles.sectionTitle}>Tính năng</Text>
          </View>

          <FadeIn delay={500}>
            <View style={styles.featureRow}>
              {[
                { icon: <MaterialIcon name="quiz" size="lg" color={Colors.accent} />, label: "Thi thử", onPress: () => router.push("/(tabs)/mock-test"), color: Colors.warningLight },
                { icon: <MaterialIcon name="autorenew" size="lg" color={Colors.info} />, label: "Ôn tập", onPress: () => router.push("/(tabs)/review"), color: Colors.infoLight },
                { icon: <MaterialIcon name="person" size="lg" color={Colors.xp} />, label: "Cá nhân", onPress: () => router.push("/(tabs)/profile"), color: "#F3E5F5" },
              ].map((feat, i) => (
                <Card key={i} onPress={feat.onPress} style={styles.featureCard} padded={false}>
                  <View style={[styles.featureIconWrap, { backgroundColor: feat.color }]}>
                    {feat.icon}
                  </View>
                  <Text style={styles.featureLabel}>{feat.label}</Text>
                </Card>
              ))}
            </View>
          </FadeIn>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  heroSection: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.xxl + 10, borderBottomLeftRadius: BorderRadius.xxl, borderBottomRightRadius: BorderRadius.xxl },
  heroRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  heroText: {},
  heroGreeting: { ...Typography.hero, color: "#fff" },
  heroSub: { ...Typography.body, color: "rgba(255,255,255,0.85)", marginTop: 2 },
  heroAvatar: {},
  bodyContent: { paddingHorizontal: Spacing.lg, marginTop: -Spacing.lg },
  currentLevelSection: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, ...Shadows.md, marginBottom: Spacing.md },
  currentLevelHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.sm },
  currentLevelTitleRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  currentLevelTitle: { ...Typography.h3 },
  currentLevelPercent: { ...Typography.h2, color: Colors.success },
  statsRow: { flexDirection: "row", justifyContent: "space-around", marginTop: Spacing.sm, gap: Spacing.sm },
  statBadge: { alignItems: "center", gap: 2 },
  statBadgeValue: { ...Typography.h3, fontWeight: "800" },
  statBadgeLabel: { ...Typography.caption, color: Colors.textSecondary },
  reviewBanner: { marginBottom: Spacing.md },
  reviewBannerContent: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  reviewIconWrap: { backgroundColor: Colors.accent, width: 44, height: 44, borderRadius: BorderRadius.md, alignItems: "center", justifyContent: "center" },
  reviewText: { flex: 1 },
  reviewTitle: { ...Typography.bodyBold },
  reviewCount: { ...Typography.caption, color: Colors.textSecondary, marginTop: 1 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: Spacing.sm, marginTop: Spacing.lg, marginBottom: Spacing.md },
  sectionTitle: { ...Typography.h2 },
  hskCard: { marginBottom: Spacing.sm },
  hskCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.sm },
  hskBadge: { paddingHorizontal: Spacing.sm, paddingVertical: 3, borderRadius: BorderRadius.sm },
  hskBadgeText: { ...Typography.caption, fontWeight: "700" },
  hskPercent: { ...Typography.bodyBold, color: Colors.textSecondary },
  hskDesc: { ...Typography.caption, color: Colors.textSecondary, marginTop: Spacing.xs },
  hskActions: { flexDirection: "row", gap: Spacing.sm, marginTop: Spacing.sm },
  hskActionBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, paddingVertical: Spacing.sm, borderRadius: BorderRadius.sm },
  hskActionLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: "600" },
  featureRow: { flexDirection: "row", gap: Spacing.sm },
  featureCard: { flex: 1, alignItems: "center", paddingVertical: Spacing.md, gap: Spacing.sm },
  featureIconWrap: { width: 48, height: 48, borderRadius: BorderRadius.md, alignItems: "center", justifyContent: "center" },
  featureLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: "600" },
  noticeCard: { padding: Spacing.md, marginBottom: Spacing.md },
  noticeText: { ...Typography.bodySmall, color: Colors.textSecondary },
});
