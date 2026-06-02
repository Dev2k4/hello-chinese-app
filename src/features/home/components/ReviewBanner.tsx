import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { FadeIn, MaterialIcon } from "../../../components/common";

interface ReviewBannerProps {
  dueCount: number;
  onPress: () => void;
}

export default function ReviewBanner({ dueCount, onPress }: ReviewBannerProps) {
  if (dueCount === 0) return null;

  return (
    <FadeIn delay={100}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <LinearGradient
          colors={[Colors.primary + "e6", Colors.secondary + "e6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.reviewBannerGradient}
        >
          <View style={styles.reviewBannerContent}>
            <View style={styles.reviewIconWrap}>
              <MaterialIcon name="autorenew" size="lg" color="#fff" />
            </View>
            <View style={styles.reviewText}>
              <Text style={styles.reviewTitle}>Ôn tập hôm nay</Text>
              <Text style={styles.reviewCount}>{dueCount} từ cần ôn</Text>
            </View>
            <MaterialIcon
              name="chevron-right"
              size="md"
              color="rgba(255,255,255,0.7)"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  reviewBannerGradient: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  reviewBannerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  reviewIconWrap: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewText: { flex: 1 },
  reviewTitle: { ...Typography.bodyBold, color: "#fff" },
  reviewCount: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.85)",
    marginTop: 1,
  },
});
