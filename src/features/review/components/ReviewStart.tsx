import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import {
  Card,
  Button,
  FadeIn,
  IonIcon,
} from "../../../components/common";

interface ReviewStartProps {
  dueCount: number;
  onStart: () => void;
}

export default function ReviewStart({ dueCount, onStart }: ReviewStartProps) {
  if (dueCount === 0) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[Colors.primaryDark, Colors.primary, Colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <FadeIn>
            <View style={styles.heroContent}>
              <Text style={styles.heroEmoji}>🐱🐉</Text>
              <Text style={styles.heroTitle}>Ôn tập hôm nay</Text>
              <Text style={styles.heroSub}>
                Spaced Repetition giúp bạn nhớ lâu hơn
              </Text>
            </View>
          </FadeIn>
        </LinearGradient>
        <View style={styles.bodyContent}>
          <FadeIn delay={100}>
            <Card style={styles.emptyCard}>
              <IonIcon
                name="checkmark-circle-outline"
                size="xl"
                color={Colors.success}
              />
              <Text style={styles.emptyTitle}>
                Không có từ cần ôn
              </Text>
              <Text style={styles.emptyText}>
                Học bài mới để có từ vựng cần ôn tập nhé!
              </Text>
            </Card>
          </FadeIn>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroSection}
      >
        <FadeIn>
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>🐱🐉</Text>
            <Text style={styles.heroTitle}>Ôn tập hôm nay</Text>
            <Text style={styles.heroSub}>
              Spaced Repetition giúp bạn nhớ lâu hơn
            </Text>
          </View>
        </FadeIn>
      </LinearGradient>

      <View style={styles.bodyContent}>
        <FadeIn delay={100}>
          <LinearGradient
            colors={[Colors.primary + "f2", Colors.secondary + "f2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryCountWrap}>
              <Text style={styles.summaryCount}>{dueCount}</Text>
            </View>
            <Text style={styles.summaryLabel}>từ cần ôn hôm nay</Text>
            <Text style={styles.summaryHint}>
              Học đều đặn mỗi ngày để đạt kết quả tốt nhất
            </Text>
          </LinearGradient>
        </FadeIn>

        <FadeIn delay={200}>
          <Button
            title="Bắt đầu ôn tập"
            onPress={onStart}
            variant="gradient"
            size="lg"
            icon={<IonIcon name="play" size="md" color="#fff" />}
          />
        </FadeIn>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: Spacing.xxl },
  heroSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
  },
  heroContent: { alignItems: "center", gap: Spacing.sm },
  heroEmoji: { fontSize: 48, marginBottom: 4 },
  heroTitle: { ...Typography.h1, color: "#fff" },
  heroSub: {
    ...Typography.bodySmall,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
  },
  bodyContent: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  emptyCard: {
    alignItems: "center",
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyTitle: { ...Typography.h3, color: Colors.textPrimary },
  emptyText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  summaryGradient: {
    alignItems: "center",
    padding: Spacing.xl,
    gap: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  summaryCountWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  summaryCount: { ...Typography.hero, color: "#fff" },
  summaryLabel: { ...Typography.h3, color: "#fff", fontWeight: "700" },
  summaryHint: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
});
