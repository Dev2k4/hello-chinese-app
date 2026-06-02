import { View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import {
  Card,
  ProgressBar,
  MaterialIcon,
  StaggerList,
} from "../../../components/common";
import { AllHskProgress } from "../types";

interface HskProgressListProps {
  progressList: AllHskProgress[];
}

export default function HskProgressList({
  progressList,
}: HskProgressListProps) {
  if (progressList.length === 0) return null;

  return (
    <Card style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <MaterialIcon
          name="trending-up"
          size="md"
          color={Colors.textPrimary}
        />
        <Text style={styles.sectionTitle}>HSK Progress</Text>
      </View>
      <StaggerList baseDelay={300} staggerMs={60}>
        {progressList.map((p) => (
          <View key={p.id} style={styles.hskRow}>
            <View
              style={[
                styles.hskBadge,
                {
                  backgroundColor:
                    p.overallPercent > 0
                      ? Colors.primary
                      : Colors.borderLight,
                },
              ]}
            >
              <Text
                style={[
                  styles.hskBadgeText,
                  {
                    color:
                      p.overallPercent > 0
                        ? "#fff"
                        : Colors.textSecondary,
                  },
                ]}
              >
                HSK {p.level}
              </Text>
            </View>
            <View style={styles.hskBar}>
              <ProgressBar
                progress={p.overallPercent / 100}
                color={
                  p.overallPercent > 0
                    ? Colors.primary
                    : Colors.border
                }
                height={8}
              />
            </View>
            <Text style={styles.hskPercent}>
              {Math.round(p.overallPercent)}%
            </Text>
          </View>
        ))}
      </StaggerList>
    </Card>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    marginBottom: Spacing.md,
    gap: Spacing.md,
    borderTopWidth: 3,
    borderTopColor: Colors.primary,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary, fontWeight: "700" },
  hskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  hskBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
    minWidth: 60,
    alignItems: "center",
  },
  hskBadgeText: { ...Typography.caption, fontWeight: "700", fontSize: 12 },
  hskBar: { flex: 1 },
  hskPercent: {
    ...Typography.bodySmall,
    fontWeight: "700",
    width: 40,
    textAlign: "right",
    color: Colors.primary,
  },
});
