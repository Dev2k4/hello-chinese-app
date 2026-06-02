import { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography, BorderRadius } from "../constants/theme";
import {
  Card,
  ProgressBar,
  FadeIn,
  MaterialIcon,
} from "../components/common";
import { useHskStore } from "../store/useHskStore";
import { useUserStore } from "../store/useUserStore";
import { useContentCatalog } from "../hooks/useContent";
import { calculateProgressFromCatalog } from "../utils/contentProgress";
import { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function MapScreen() {
  const navigation = useNavigation<Nav>();
  const settings = useUserStore((s) => s.settings);
  const lessonProgress = useHskStore((s) => s.lessonProgress);
  const { data: catalog } = useContentCatalog();
  const currentTrack =
    settings?.learningPath?.split("-")[0] || "new";

  const hskCards = useMemo(() => {
    if (!catalog) return [];
    return catalog.levels.map((hsk) => ({
      ...hsk,
      progress: calculateProgressFromCatalog(
        lessonProgress,
        hsk.id,
        catalog
      ),
    }));
  }, [lessonProgress, catalog]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Lộ trình HSK</Text>
          <Text style={styles.subtitle}>
            Chọn cấp độ để bắt đầu học
          </Text>
        </View>

        <View style={styles.grid}>
          {hskCards.map((hsk, index) => (
            <FadeIn key={hsk.id} delay={index * 80}>
              <Card
                onPress={() =>
                  navigation.navigate("LearningPath", {
                    level: hsk.level,
                    track: currentTrack,
                  })
                }
                style={styles.levelCard}
              >
                <View style={styles.levelTop}>
                  <View
                    style={[
                      styles.levelBadge,
                      {
                        backgroundColor:
                          hsk.progress.overallPercent > 0
                            ? Colors.primary
                            : Colors.surfaceAlt,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.levelBadgeText,
                        {
                          color:
                            hsk.progress.overallPercent > 0
                              ? "#fff"
                              : Colors.textSecondary,
                        },
                      ]}
                    >
                      HSK {hsk.level}
                    </Text>
                  </View>
                  {hsk.progress.overallPercent >= 100 && (
                    <MaterialIcon
                      name="check-circle"
                      size="sm"
                      color={Colors.success}
                    />
                  )}
                </View>
                <ProgressBar
                  progress={hsk.progress.overallPercent / 100}
                  color={Colors.primary}
                  height={6}
                />
                <Text style={styles.levelProgress}>
                  {hsk.progress.completedLessons}/{hsk.progress.totalLessons}{" "}
                  bài học
                </Text>
              </Card>
            </FadeIn>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: { ...Typography.h1, color: Colors.textPrimary },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  grid: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  levelCard: {
    gap: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  levelTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  levelBadgeText: {
    ...Typography.caption,
    fontWeight: "700",
  },
  levelProgress: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
