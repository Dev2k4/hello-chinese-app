import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { FadeIn } from "../../../components/common";

interface LevelHeroProps {
  name: string;
  description: string;
}

export default function LevelHero({ name, description }: LevelHeroProps) {
  return (
    <LinearGradient
      colors={[Colors.primaryDark, Colors.primary, Colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.heroSection}
    >
      <FadeIn>
        <View style={styles.heroContent}>
          <Text style={styles.heroEmoji}>🐱🐉</Text>
          <Text style={styles.heroTitle}>{name}</Text>
          <Text style={styles.heroDesc}>{description}</Text>
        </View>
      </FadeIn>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
  },
  heroContent: { gap: Spacing.xs },
  heroEmoji: { fontSize: 48, marginBottom: 4 },
  heroTitle: { ...Typography.h1, color: "#fff" },
  heroDesc: {
    ...Typography.bodySmall,
    color: "rgba(255,255,255,0.85)",
  },
});
