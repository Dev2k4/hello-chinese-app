import { View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { Card, ProgressBar, FadeIn, MaterialIcon } from "../../../components/common";
import { LevelProgress } from "../types";

interface ProgressOverviewProps {
  progress: LevelProgress;
}

export default function ProgressOverview({
  progress,
}: ProgressOverviewProps) {
  return (
    <FadeIn delay={80}>
      <Card style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <MaterialIcon name="trending-up" size="md" color={Colors.primary} />
          <Text style={styles.progressLabel}>Tiến độ</Text>
          <Text style={styles.progressPercent}>
            {Math.round(progress.overallPercent)}%
          </Text>
        </View>
        <ProgressBar
          progress={progress.overallPercent / 100}
          color={Colors.primary}
          height={10}
        />
        <View style={styles.progressStats}>
          <View style={styles.progressStat}>
            <MaterialIcon name="menu-book" size="sm" color={Colors.primary} />
            <Text style={styles.progressStatText}>
              {progress.completedLessons}/{progress.totalLessons} bài
            </Text>
          </View>
          <View style={styles.progressStat}>
            <MaterialIcon name="spellcheck" size="sm" color={Colors.info} />
            <Text style={styles.progressStatText}>
              {progress.learnedWords}/{progress.totalWords} từ
            </Text>
          </View>
        </View>
      </Card>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  progressCard: { gap: Spacing.sm },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  progressLabel: { ...Typography.bodyBold, flex: 1 },
  progressPercent: { ...Typography.h3, color: Colors.success },
  progressStats: { flexDirection: "row", gap: Spacing.md },
  progressStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  progressStatText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
