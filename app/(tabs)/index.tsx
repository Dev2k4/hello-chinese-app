import { useMemo, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../src/constants/theme";
import { Card, ProgressBar, FadeIn, MaterialIcon } from "../../src/components/common";
import { useHskStore, getDueSrsItems } from "../../src/store/useHskStore";
import { useUserStore } from "../../src/store/useUserStore";
import { useContentCatalog } from "../../src/hooks/useContent";
import { calculateProgressFromCatalog } from "../../src/utils/contentProgress";
import { getPathLabel, getTrackFromPath, LearningPathCode } from "../../src/types/user.types";
import { getRealmByXp, REALMS } from "../../src/story/realms";
import CultivationTower from "../../src/components/story/CultivationTower";
import RealmBadge from "../../src/components/story/RealmBadge";
import { getCharacterForRealm } from "../../src/story/characters";
import { useTierStore } from "../../src/store/useTierStore";
import TierContextBar from "../../src/components/story/TierContextBar";

export default function HomeScreen() {
  const settings = useUserStore((s) => s.settings);
  const user = useUserStore((s) => s.user);
  const lessonProgress = useHskStore((s) => s.lessonProgress);
  const srsItems = useHskStore((s) => s.srsItems);
  const { data: catalog, loading: catalogLoading, error: catalogError } = useContentCatalog();
  const [showTower, setShowTower] = useState(false);

  // Simulate XP from user progress (replace with real XP later)
  const totalXp = useMemo(() => {
    if (!catalog) return 0;
    const total = catalog.levels.reduce((s, p) => {
      const prog = calculateProgressFromCatalog(lessonProgress, p.id, catalog);
      return s + prog.completedLessons * 10;
    }, 0);
    return total;
  }, [lessonProgress, catalog]);

  const { realm: currentRealm, progress: realmProgress } = getRealmByXp(totalXp);

  const tierCurrentRealm = useTierStore((s) => s.currentRealm);
  const tierCurrentTier = useTierStore((s) => s.currentTier);
  const tierCompletedTiers = useTierStore((s) => s.completedTiers);
  const hydrateTier = useTierStore((s) => s.hydrateTier);
  const canStartBreakthrough = useTierStore((s) => s.canStartBreakthrough);
  const breakthroughAvail = canStartBreakthrough(tierCurrentRealm, tierCurrentTier, Object.keys(lessonProgress));

  useEffect(() => { hydrateTier(); }, []);

  const dueItems = useMemo(() => getDueSrsItems(srsItems), [srsItems]);
  const currentLevel = settings?.learningPath ? parseInt(settings.learningPath.split("-")[1], 10) : 1;
  const currentTrack = settings?.learningPath ? getTrackFromPath(settings.learningPath) : null;
  const currentProgress = useMemo(
    () => calculateProgressFromCatalog(lessonProgress, currentLevel, catalog),
    [lessonProgress, currentLevel, catalog]
  );

  const nextRealm = REALMS[currentRealm.id + 1];
  const prevRealm = REALMS[currentRealm.id - 1];

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Chào buổi sáng";
    if (h < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const getCharacterGreeting = () => {
    const char = getCharacterForRealm(currentRealm.id);
    return char?.realmGuardian?.greeting ?? "Hãy tiếp tục tu luyện!";
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
        {/* Hero: Character-centric greeting */}
        <LinearGradient
          colors={[Colors.primaryDark, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <FadeIn>
            {/* Realm indicator */}
            <View style={styles.realmStrip}>
              {prevRealm && (
                <Text style={styles.prevRealmText}>{prevRealm.name}</Text>
              )}
              <View style={styles.currentRealmBadge}>
                <Text style={styles.currentRealmIcon}>✦</Text>
                <Text style={styles.currentRealmText}>{currentRealm.name}</Text>
              </View>
              {nextRealm && (
                <Text style={styles.nextRealmText}>{nextRealm.name}</Text>
              )}
            </View>

            {/* Cultivation progress */}
            <View style={styles.cultivationBar}>
              <ProgressBar
                progress={realmProgress}
                color={currentRealm.color}
                height={6}
                trackColor="rgba(255,255,255,0.15)"
              />
              <View style={styles.xpRow}>
                <MaterialIcon name="auto-awesome" size="sm" color={Colors.secondary} />
                <Text style={styles.xpText}>{totalXp} Linh Lực</Text>
              </View>
            </View>

            {/* Greeting row */}
            <View style={styles.heroRow}>
              <View style={styles.heroText}>
                <Text style={styles.heroGreeting}>
                  {getGreeting()}, {user?.username || "Tu sĩ"}! 👋
                </Text>
                <Text style={styles.heroRealm}>
                  {currentRealm.nameCn} · {getPathLabel((settings?.learningPath || "new-1") as LearningPathCode)}
                </Text>
              </View>

              {/* Character avatar area */}
              <TouchableOpacity style={styles.heroAvatar} onPress={() => setShowTower((v) => !v)}>
                <View style={styles.avatarRing}>
                  <Text style={styles.avatarEmoji}>
                    {currentRealm.id <= 1 ? "🧹" : currentRealm.id === 2 ? "🌸" : currentRealm.id === 3 ? "📜" : currentRealm.id === 4 ? "⚔️" : currentRealm.id === 5 ? "🦋" : "🏔️"}
                  </Text>
                </View>
                <Text style={styles.avatarLabel}>Chạm vào</Text>
              </TouchableOpacity>
            </View>

            {/* Character speech */}
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>{getCharacterGreeting()}</Text>
            </View>
          </FadeIn>
        </LinearGradient>

        {/* Tier progress bar */}
        <FadeIn delay={80}>
          <View style={styles.tierSection}>
            <TierContextBar
              realmId={tierCurrentRealm}
              currentTier={tierCurrentTier}
              completedTiers={tierCompletedTiers}
              onPress={() => setShowTower((v) => !v)}
            />
            {breakthroughAvail && (
              <TouchableOpacity
                style={styles.breakthroughBtn}
                onPress={() => router.push(`/tier-breakthrough/${tierCurrentTier}?realmId=${tierCurrentRealm}&tierId=${tierCurrentTier}`)}
              >
                <Text style={styles.breakthroughBtnText}>⚡ Đột Phá Tầng {tierCurrentTier}</Text>
              </TouchableOpacity>
            )}
          </View>
        </FadeIn>

        <View style={styles.bodyContent}>
          {/* TOWER VIEW (toggle) */}
          {showTower && (
            <FadeIn delay={100}>
              <Card style={styles.towerCard}>
                <CultivationTower currentRealm={currentRealm} currentXp={totalXp} />
              </Card>
            </FadeIn>
          )}

          {catalogLoading && (
            <FadeIn delay={50}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Đang tải dữ liệu bài học...</Text>
              </Card>
            </FadeIn>
          )}

          {/* Today's review banner */}
          {dueItems.length > 0 && (
            <FadeIn delay={130}>
              <Card onPress={() => router.push("/(tabs)/review")} style={styles.reviewBanner}>
                <View style={styles.reviewBannerContent}>
                  <View style={[styles.reviewIconWrap, { backgroundColor: currentRealm.color }]}>
                    <MaterialIcon name="autorenew" size="lg" color="#fff" />
                  </View>
                  <View style={styles.reviewText}>
                    <Text style={styles.reviewTitle}>Luyện công hôm nay</Text>
                    <Text style={styles.reviewCount}>{dueItems.length} phù chú cần tụng niệm</Text>
                  </View>
                  <MaterialIcon name="chevron-right" size="md" color={Colors.textSecondary} />
                </View>
              </Card>
            </FadeIn>
          )}

          {/* Quick cultivation actions */}
          <FadeIn delay={180}>
            <View style={styles.quickActions}>
              <Card
                onPress={() => router.push(`/learning-path/${currentLevel}?track=${currentTrack || "new"}`)}
                style={styles.actionCard} padded={false}
              >
                <LinearGradient colors={[Colors.primary, Colors.primaryLight]} style={styles.actionGradient}>
                  <Text style={styles.actionIcon}>📖</Text>
                  <Text style={styles.actionTitle}>Tụng Kinh</Text>
                  <Text style={styles.actionDesc}>Học bài mới</Text>
                </LinearGradient>
              </Card>

              <Card
                onPress={() => router.push("/(tabs)/mock-test")}
                style={styles.actionCard} padded={false}
              >
                <LinearGradient colors={[Colors.fire, Colors.fire + "CC"]} style={styles.actionGradient}>
                  <Text style={styles.actionIcon}>⚔️</Text>
                  <Text style={styles.actionTitle}>Đấu Pháp</Text>
                  <Text style={styles.actionDesc}>Thi thử HSK</Text>
                </LinearGradient>
              </Card>

              <Card
                onPress={() => router.push("/(tabs)/review")}
                style={styles.actionCard} padded={false}
              >
                <LinearGradient colors={[Colors.cultivation, Colors.cultivation + "CC"]} style={styles.actionGradient}>
                  <Text style={styles.actionIcon}>🧘</Text>
                  <Text style={styles.actionTitle}>Luyện Công</Text>
                  <Text style={styles.actionDesc}>Ôn tập SRS</Text>
                </LinearGradient>
              </Card>
            </View>
          </FadeIn>

          {/* Current HSK Progress */}
          {currentProgress && (
            <FadeIn delay={220}>
              <Card style={styles.progressCard}>
                <View style={styles.progressHeader}>
                  <View style={styles.progressTitleRow}>
                    <Text style={styles.progressHSKIcon}>🎯</Text>
                    <Text style={styles.progressTitle}>HSK {currentLevel}</Text>
                  </View>
                  <Text style={styles.progressPercent}>{Math.round(currentProgress.overallPercent)}%</Text>
                </View>
                <ProgressBar progress={currentProgress.overallPercent / 100} color={currentRealm.color} height={10} />
                <View style={styles.statsRow}>
                  <StatItem icon="📖" label="Bài" value={`${currentProgress.completedLessons}/${currentProgress.totalLessons}`} />
                  <StatItem icon="📝" label="Chữ" value={`${currentProgress.learnedWords}/${currentProgress.totalWords}`} />
                  <StatItem icon="🔥" label="Tu vi" value={`${totalXp}`} />
                </View>
              </Card>
            </FadeIn>
          )}

          {/* HSK Levels Grid */}
          <FadeIn delay={260}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tàng Kinh Các — Các tầng</Text>
            </View>
            <View style={styles.hskGrid}>
              {hskCards.map((hsk) => {
                const realm = REALMS.find((r) => r.hsk === hsk.id) ?? REALMS[0];
                const isActive = hsk.id === currentLevel;
                return (
                  <Card key={hsk.id} onPress={() => router.push(`/learning-path/${hsk.level}?track=${currentTrack || "new"}`)} style={styles.hskCard} padded={false}>
                    <View style={[styles.hskCardInner, { borderLeftColor: isActive ? realm.color : Colors.border }]}>
                      <View style={styles.hskTop}>
                        <RealmBadge realm={realm} isCurrent={isActive} isUnlocked size="sm" />
                        <View style={styles.hskInfo}>
                          <Text style={[styles.hskName, { color: isActive ? realm.color : Colors.textSecondary }]}>
                            {realm.name}
                          </Text>
                          <Text style={styles.hskLevel}>HSK {hsk.id}</Text>
                          <ProgressBar progress={hsk.progress.overallPercent / 100} color={isActive ? realm.color : Colors.border} height={4} />
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

  // Hero
  heroSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
  },
  realmStrip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  prevRealmText: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.4)",
  },
  nextRealmText: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.4)",
  },
  currentRealmBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  currentRealmIcon: {
    color: Colors.secondary,
    fontSize: 12,
  },
  currentRealmText: {
    ...Typography.bodyBold,
    color: Colors.secondary,
    fontSize: 13,
  },
  cultivationBar: {
    marginBottom: Spacing.md,
    gap: 4,
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  xpText: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: "600",
  },
  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroText: {},
  heroGreeting: { ...Typography.h2, color: "#fff" },
  heroRealm: { ...Typography.bodySmall, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  heroAvatar: {
    alignItems: "center",
  },
  avatarRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  avatarEmoji: {
    fontSize: 26,
  },
  avatarLabel: {
    ...Typography.label,
    color: "rgba(255,255,255,0.5)",
    fontSize: 8,
    marginTop: 2,
  },
  speechBubble: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: Colors.secondary,
  },
  speechText: {
    ...Typography.bodySmall,
    color: "rgba(255,255,255,0.85)",
    fontStyle: "italic",
  },

  // Body
  bodyContent: { paddingHorizontal: Spacing.lg, marginTop: -Spacing.lg, gap: Spacing.sm },

  // Tower card
  towerCard: {
    padding: Spacing.sm,
    maxHeight: 400,
  },

  // Review
  reviewBanner: {},
  reviewBannerContent: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  reviewIconWrap: { width: 44, height: 44, borderRadius: BorderRadius.md, alignItems: "center", justifyContent: "center" },
  reviewText: { flex: 1 },
  reviewTitle: { ...Typography.bodyBold, color: Colors.textPrimary },
  reviewCount: { ...Typography.caption, color: Colors.textSecondary, marginTop: 1 },

  // Quick actions
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
  actionIcon: {
    fontSize: 24,
  },
  actionTitle: {
    ...Typography.bodyBold,
    color: "#FFF",
    fontSize: 13,
  },
  actionDesc: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.7)",
    fontSize: 9,
  },

  // Current progress
  progressCard: {
    gap: Spacing.sm,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  progressHSKIcon: {
    fontSize: 20,
  },
  progressTitle: { ...Typography.h3 },
  progressPercent: { ...Typography.h2, color: Colors.success },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.xs,
  },
  statItem: {
    alignItems: "center",
    gap: 2,
  },
  statIcon: {
    fontSize: 18,
  },
  statValue: { ...Typography.bodyBold, color: Colors.textPrimary },
  statLabel: { ...Typography.caption, color: Colors.textSecondary },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },

  // HSK grid
  hskGrid: {
    gap: Spacing.xs,
  },
  hskCard: {
    borderRadius: BorderRadius.md,
  },
  hskCardInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: Colors.border,
    borderRadius: BorderRadius.md,
  },
  hskTop: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Spacing.sm,
  },
  hskInfo: {
    flex: 1,
    gap: 2,
  },
  hskName: {
    ...Typography.bodyBold,
    fontSize: 14,
  },
  hskLevel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  hskPercent: {
    ...Typography.h3,
    color: Colors.textSecondary,
    fontWeight: "700",
    marginLeft: Spacing.sm,
  },

  // Misc
  noticeCard: { padding: Spacing.md },
  noticeText: { ...Typography.bodySmall, color: Colors.textSecondary },

  // Tier section
  tierSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    gap: Spacing.xs,
  },
  breakthroughBtn: {
    backgroundColor: Colors.secondary + "20",
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: BorderRadius.full,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    alignSelf: "center",
  },
  breakthroughBtnText: {
    ...Typography.bodyBold,
    color: Colors.secondary,
    fontSize: 13,
  },
});
