import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { MaterialIcon } from "../../../components/common";
import { StatCard } from "../types";

interface StatsGridProps {
  statCards: StatCard[];
}

export default function StatsGrid({ statCards }: StatsGridProps) {
  return (
    <View style={styles.statGrid}>
      {statCards.map((s, i) => (
        <LinearGradient
          key={i}
          colors={[s.color + "12", s.color + "08"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.statCard,
            { borderLeftWidth: 4, borderLeftColor: s.color },
          ]}
        >
          <View
            style={[
              styles.statIconWrap,
              { backgroundColor: s.color + "25" },
            ]}
          >
            <MaterialIcon
              name={s.icon as any}
              size="md"
              color={s.color}
            />
          </View>
          <Text style={[styles.statValue, { color: s.color }]}>
            {s.value}
          </Text>
          <Text style={styles.statLabel}>{s.label}</Text>
        </LinearGradient>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    width: "47%",
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
    gap: Spacing.xs,
    overflow: "hidden",
  },
  statIconWrap: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: { ...Typography.h2, fontWeight: "800" },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
});
