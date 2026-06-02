import { View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
} from "../../../constants/theme";
import {
  Card,
  ProgressBar,
  MaterialIcon,
} from "../../../components/common";
import { SkillInfo } from "../types";

interface SkillsSectionProps {
  skills: SkillInfo[];
}

function skillColor(value: number) {
  if (value >= 70) return Colors.success;
  if (value >= 40) return Colors.warning;
  return Colors.error;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Card style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <MaterialIcon
          name="bar-chart"
          size="md"
          color={Colors.textPrimary}
        />
        <Text style={styles.sectionTitle}>Kỹ năng</Text>
      </View>
      <View style={styles.skillList}>
        {skills.map((skill) => (
          <View key={skill.key} style={styles.skillRow}>
            <MaterialIcon
              name={skill.icon}
              size="sm"
              color={Colors.textSecondary}
            />
            <Text style={styles.skillLabel}>{skill.label}</Text>
            <View style={styles.skillBar}>
              <ProgressBar
                progress={skill.value / 100}
                color={skillColor(skill.value)}
                height={8}
              />
            </View>
            <Text style={[styles.skillValue, { color: skillColor(skill.value) }]}>
              {Math.round(skill.value)}%
            </Text>
          </View>
        ))}
      </View>
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
  skillList: { gap: Spacing.sm },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  skillLabel: {
    ...Typography.bodySmall,
    width: 60,
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  skillBar: { flex: 1 },
  skillValue: {
    ...Typography.bodySmall,
    fontWeight: "700",
    width: 40,
    textAlign: "right",
    marginRight: -Spacing.xs,
  },
});
