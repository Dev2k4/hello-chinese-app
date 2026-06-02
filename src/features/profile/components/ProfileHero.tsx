import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { FadeIn, IonIcon } from "../../../components/common";

interface ProfileHeroProps {
  pathLabel: string;
  dailyTarget: number;
}

export default function ProfileHero({
  pathLabel,
  dailyTarget,
}: ProfileHeroProps) {
  return (
    <LinearGradient
      colors={[Colors.primaryDark, Colors.primary, Colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.heroSection}
    >
      <FadeIn>
        <View style={styles.heroContent}>
          <View style={styles.avatar}>
            <IonIcon
              name="person-circle"
              size="xxl"
              color="rgba(255,255,255,0.95)"
            />
          </View>
          <Text style={styles.title}>Tiến độ học tập</Text>
          {pathLabel ? (
            <Text style={styles.subtitle}>
              {pathLabel} • {dailyTarget} phút/ngày
            </Text>
          ) : null}
        </View>
      </FadeIn>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    paddingBottom: Spacing.xxl,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
  },
  heroContent: {
    alignItems: "center",
    paddingTop: Spacing.xl,
    gap: Spacing.xs,
  },
  avatar: { marginBottom: Spacing.sm },
  title: { ...Typography.h1, color: "#fff" },
  subtitle: {
    ...Typography.bodySmall,
    color: "rgba(255,255,255,0.8)",
  },
});
