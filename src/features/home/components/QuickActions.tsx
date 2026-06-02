import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { Card, FadeIn } from "../../../components/common";

interface QuickActionsProps {
  onLearnPress: () => void;
  onReviewPress: () => void;
}

export default function QuickActions({
  onLearnPress,
  onReviewPress,
}: QuickActionsProps) {
  return (
    <FadeIn delay={150}>
      <View style={styles.quickActions}>
        <Card
          onPress={onLearnPress}
          style={styles.actionCard}
          padded={false}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionGradient}
          >
            <Text style={styles.actionIcon}>📖</Text>
            <Text style={styles.actionTitle}>Học bài</Text>
            <Text style={styles.actionDesc}>Bài học mới</Text>
          </LinearGradient>
        </Card>

        <Card
          onPress={onReviewPress}
          style={styles.actionCard}
          padded={false}
        >
          <LinearGradient
            colors={[Colors.secondary, Colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionGradient}
          >
            <Text style={styles.actionIcon}>🔄</Text>
            <Text style={styles.actionTitle}>Ôn tập</Text>
            <Text style={styles.actionDesc}>SRS</Text>
          </LinearGradient>
        </Card>
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  quickActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  actionCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    padding: 0,
  },
  actionGradient: {
    alignItems: "center",
    paddingVertical: Spacing.lg,
    gap: 6,
    borderRadius: BorderRadius.lg,
  },
  actionIcon: { fontSize: 24 },
  actionTitle: { ...Typography.bodyBold, color: "#FFF", fontSize: 13 },
  actionDesc: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.7)",
    fontSize: 9,
  },
});
