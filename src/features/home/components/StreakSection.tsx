import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { ProgressBar, FadeIn, MaterialIcon } from "../../../components/common";

interface StreakSectionProps {
  greeting: string;
  displayName: string;
  level: number;
  trackLabel: string;
  totalXp: number;
  overallPercent: number;
}

export default function StreakSection({
  greeting,
  displayName,
  level,
  trackLabel,
  totalXp,
  overallPercent,
}: StreakSectionProps) {
  return (
    <LinearGradient
      colors={[Colors.primaryDark, Colors.primary, Colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.heroSection}
    >
      <FadeIn>
        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={styles.heroGreeting}>
              {greeting}, {displayName}!
            </Text>
            <Text style={styles.heroRealm}>
              HSK {level} · {trackLabel}
            </Text>
          </View>
          <View style={styles.xpBadge}>
            <MaterialIcon name="auto-awesome" size="sm" color="#fff" />
            <Text style={styles.xpText}>{totalXp} XP</Text>
          </View>
        </View>
        <View style={styles.progressOverview}>
          <ProgressBar
            progress={overallPercent / 100}
            color="rgba(255,255,255,0.9)"
            height={6}
            trackColor="rgba(255,255,255,0.15)"
          />
          <Text style={styles.progressLabel}>
            {Math.round(overallPercent)}% hoàn thành
          </Text>
        </View>
      </FadeIn>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
  heroRealm: {
    ...Typography.bodySmall,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
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
});
