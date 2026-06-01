import { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius } from "../../src/constants/theme";
import { Card, ProgressBar, FadeIn, MaterialIcon } from "../../src/components/common";
import { useHskStore, getDueSrsItems } from "../../src/store/useHskStore";
import { useUserStore } from "../../src/store/useUserStore";
import { useContentCatalog } from "../../src/hooks/useContent";
import { calculateProgressFromCatalog } from "../../src/utils/contentProgress";
import { getPathLabel, getTrackFromPath } from "../../src/types/user.types";

export default function HomeScreen() {
  const settings = useUserStore((s) => s.settings);
  const user = useUserStore((s) => s.user);
  const lessonProgress = useHskStore((s) => s.lessonProgress);
  const srsItems = useHskStore((s) => s.srsItems);
  const { data: catalog, loading: catalogLoading, error: catalogError } = useContentCatalog();

  const totalXp = useMemo(() => {
    if (!catalog) return 0;
    return catalog.levels.reduce((s, p) => {
      const prog = calculateProgressFromCatalog(lessonProgress, p.id, catalog);
      return s + prog.completedLessons * 10;
    }, 0);
  }, [lessonProgress, catalog]);

  const dueItems = useMemo(() => getDueSrsItems(srsItems), [srsItems]);
  const currentLevel = settings?.learningPath ? parseInt(settings.learningPath.split("-")[1], 10) : 1;
  const currentTrack = settings?.learningPath ? getTrackFromPath(settings.learningPath) : null;
  const currentProgress = useMemo(
    () => calculateProgressFromCatalog(lessonProgress, currentLevel, catalog),
    [lessonProgress, currentLevel, catalog]
  );

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Chào buổi sáng";
    if (h < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

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
        <LinearGradient
          colors={[Colors.primaryDark, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <FadeIn>
            <View style={styles.heroRow}>
              <View style={styles.heroText}>
                <Text style={styles.heroGreeting}>
                  {getGreeting()}, {user?.username || "bạn"}!
                </Text>
                <Text style={styles.heroRealm}>
                  HSK {currentLevel} · {getPathLabel((settings?.learningPath || "new-1") as any)}
                </Text>
              </View>
              <View style={styles.xpBadge}>
                <MaterialIcon name="auto-awesome" size="sm" color={Colors.secondary} />
                <Text style={styles.xpText}>{totalXp} XP</Text>
              </View>
            </View>
            {currentProgress && (
              <View style={styles.progressOverview}>
                <ProgressBar
                  progress={currentProgress.overallPercent / 100}
                  color={Colors.secondary}
                  height={6}
                  trackColor="rgba(255,255,255,0.15)"
                />
                <Text style={styles.progressLabel}>{Math.round(currentProgress.overallPercent)}% hoàn thành</Text>
              </View>
            )}
          </FadeIn>
        </LinearGradient>

        <View style={styles.bodyContent}>
          {catalogLoading && (
            <FadeIn delay={50}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Đang tải dữ liệu bài học...</Text>
              </Card>
            </FadeIn>
          )}

          {catalogError && (
            <FadeIn delay={50}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Không thể tải dữ liệu.</Text>
              </Card>
            </FadeIn>
          )}

          {dueItems.length > 0 && (
            <FadeIn delay={100}>
              <Card onPress={() => router.push("/(tabs)/review")} style={styles.reviewBanner}>
                <View style={styles.reviewBannerContent}>
                  <View style={styles.reviewIconWrap}>
                    <MaterialIcon name="autorenew" size="lg" color="#fff" />
                  </View>
                  <View style={styles.reviewText}>
                    <Text style={styles.reviewTitle}>Ôn tập hôm nay</Text>
                    <Text style={styles.reviewCount}>{dueItems.length} từ cần ôn</Text>
                  </View>
                  <MaterialIcon name="chevron-right" size="md" color={Colors.textSecondary} />
                </View>
              </Card>
            </FadeIn>
          )}

          <FadeIn delay={150}>
            <View style={styles.quickActions}>
              <Card
                onPress={() => router.push(`/learning-path/${currentLevel}?track=${currentTrack || "new"}`)}
                style={styles.actionCard} padded={false}
              >
                <LinearGradient colors={[Colors.primary, Colors.primaryLight]} style={styles.actionGradient}>
                  <Text style={styles.actionIcon}>📖</Text>
                  <Text style={styles.actionTitle}>Học bài</Text>
                  <Text style={styles.actionDesc}>Bài học mới</Text>
                </LinearGradient>
              </Card>

              <Card
                onPress={() => router.push("/(tabs)/review")}
                style={styles.actionCard} padded={false}
              >
                <LinearGradient colors={[Colors.primary, Colors.primaryLight]} style={styles.actionGradient}>
                  <Text style={styles.actionIcon}>🔄</Text>
                  <Text style={styles.actionTitle}>Ôn tập</Text>
                  <Text style={styles.actionDesc}>SRS</Text>
                </LinearGradient>
              </Card>
            </View>
          </FadeIn>

          {currentProgress && (
            <FadeIn delay={200}>
              <Card style={styles.progressCard}>
                <View style={styles.progressHeader}>
                  <View style={styles.progressTitleRow}>
                    <Text style={styles.progressHSKIcon}>🎯</Text>
                    <Text style={styles.progressTitle}>HSK {currentLevel}</Text>
                  </View>
                  <Text style={styles.progressPercent}>{Math.round(currentProgress.overallPercent)}%</Text>
                </View>
                <ProgressBar progress={currentProgress.overallPercent / 100} color={Colors.primary} height={10} />
                <View style={styles.statsRow}>
                  <StatItem icon="📖" label="Bài" value={`${currentProgress.completedLessons}/${currentProgress.totalLessons}`} />
                  <StatItem icon="📝" label="Từ" value={`${currentProgress.learnedWords}/${currentProgress.totalWords}`} />
                  <StatItem icon="🔥" label="XP" value={`${totalXp}`} />
                </View>
              </Card>
            </FadeIn>
          )}

          <FadeIn delay={250}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Các cấp độ HSK</Text>
            </View>
            <View style={styles.hskGrid}>
              {hskCards.map((hsk) => {
                const isActive = hsk.level === currentLevel;
                return (
                  <Card key={hsk.id} onPress={() => router.push(`/learning-path/${hsk.level}?track=${currentTrack || "new"}`)} style={styles.hskCard} padded={false}>
                    <View style={[styles.hskCardInner, { borderLeftColor: isActive ? Colors.primary : Colors.border }]}>
                      <View style={styles.hskTop}>
                        <View style={[styles.hskBadge, { backgroundColor: isActive ? Colors.primary : Colors.surfaceAlt }]}>
                          <Text style={[styles.hskBadgeText, { color: isActive ? "#fff" : Colors.textSecondary }]}>HSK {hsk.level}</Text>
                        </View>
                        <View style={styles.hskInfo}>
                          <ProgressBar progress={hsk.progress.overallPercent / 100} color={isActive ? Colors.primary : Colors.border} height={4} />
                        </View>
                      </View>
                      <Text style={styles.hskPercent}>{Math.round(hsk.progress.overallPercent)}%</Text>
                    </View>
                  </Card>
                );
              })}
            </View>
          </FadeIn>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },

  heroSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
  },
  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heroText: {},
  heroGreeting: { ...Typography.h2, color: "#fff" },
  heroRealm: { ...Typography.bodySmall, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  xpText: { ...Typography.caption, color: Colors.secondary, fontWeight: "600" },
  progressOverview: {
    marginTop: Spacing.md,
    gap: 4,
  },
  progressLabel: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
  },

  bodyContent: { paddingHorizontal: Spacing.lg, marginTop: -Spacing.lg, gap: Spacing.sm },

  reviewBanner: {},
  reviewBannerContent: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  reviewIconWrap: { width: 44, height: 44, borderRadius: BorderRadius.md, backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center" },
  reviewText: { flex: 1 },
  reviewTitle: { ...Typography.bodyBold, color: Colors.textPrimary },
  reviewCount: { ...Typography.caption, color: Colors.textSecondary, marginTop: 1 },

  quickActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  actionCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
  },
  actionGradient: {
    alignItems: "center",
    paddingVertical: Spacing.md,
    gap: 4,
  },
  actionIcon: { fontSize: 24 },
  actionTitle: { ...Typography.bodyBold, color: "#FFF", fontSize: 13 },
  actionDesc: { ...Typography.caption, color: "rgba(255,255,255,0.7)", fontSize: 9 },

  progressCard: { gap: Spacing.sm },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressTitleRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  progressHSKIcon: { fontSize: 20 },
  progressTitle: { ...Typography.h3 },
  progressPercent: { ...Typography.h2, color: Colors.success },
  statsRow: { flexDirection: "row", justifyContent: "space-around", marginTop: Spacing.xs },
  statItem: { alignItems: "center", gap: 2 },
  statIcon: { fontSize: 18 },
  statValue: { ...Typography.bodyBold, color: Colors.textPrimary },
  statLabel: { ...Typography.caption, color: Colors.textSecondary },

  sectionHeader: { flexDirection: "row", alignItems: "center", marginTop: Spacing.sm },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },

  hskGrid: { gap: Spacing.xs },
  hskCard: { borderRadius: BorderRadius.md },
  hskCardInner: { flexDirection: "row", alignItems: "center", padding: Spacing.sm, borderLeftWidth: 3, borderRadius: BorderRadius.md },
  hskTop: { flexDirection: "row", alignItems: "center", flex: 1, gap: Spacing.sm },
  hskBadge: { paddingHorizontal: Spacing.sm, paddingVertical: 3, borderRadius: BorderRadius.sm },
  hskBadgeText: { ...Typography.caption, fontWeight: "700" },
  hskInfo: { flex: 1 },
  hskPercent: { ...Typography.h3, color: Colors.textSecondary, fontWeight: "700", marginLeft: Spacing.sm },

  noticeCard: { padding: Spacing.md },
  noticeText: { ...Typography.bodySmall, color: Colors.textSecondary },
});
