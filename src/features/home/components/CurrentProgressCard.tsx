import { View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { Card, ProgressBar, FadeIn } from "../../../components/common";
import { HskCardData } from "../types";

interface CurrentProgressCardProps {
  level: number;
  progress: HskCardData["progress"];
  totalXp: number;
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function CurrentProgressCard({
  level,
  progress,
  totalXp,
}: CurrentProgressCardProps) {
  return (
    <FadeIn delay={200}>
      <Card style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View style={styles.progressTitleRow}>
            <Text style={styles.progressHSKIcon}>🎯</Text>
            <Text style={styles.progressTitle}>HSK {level}</Text>
          </View>
          <Text style={styles.progressPercent}>
            {Math.round(progress.overallPercent)}%
          </Text>
        </View>
        <ProgressBar
          progress={progress.overallPercent / 100}
          color={Colors.primary}
          height={10}
        />
        <View style={styles.statsRow}>
          <StatItem
            icon="📖"
            label="Bài"
            value={`${progress.completedLessons}/${progress.totalLessons}`}
          />
          <StatItem
            icon="📝"
            label="Từ"
            value={`${progress.learnedWords}/${progress.totalWords}`}
          />
          <StatItem icon="🔥" label="XP" value={`${totalXp}`} />
        </View>
      </Card>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  progressCard: { gap: Spacing.md },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  progressTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  progressHSKIcon: { fontSize: 20 },
  progressTitle: { ...Typography.h3, color: Colors.textPrimary },
  progressPercent: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: "800",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.xs,
  },
  statItem: { alignItems: "center", gap: 2 },
  statIcon: { fontSize: 18 },
  statValue: { ...Typography.bodyBold, color: Colors.textPrimary },
  statLabel: { ...Typography.caption, color: Colors.textSecondary },
});
