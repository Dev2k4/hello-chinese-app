import { View, Text, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography } from "../../src/constants/theme";
import { Card, Button } from "../../src/components/common";

export default function LessonResultScreen() {
  const { score, xp } = useLocalSearchParams<{
    score: string;
    xp: string;
  }>();

  const handleNextLesson = () => {
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>Hoàn thành!</Text>

        <Card style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Điểm số</Text>
          <Text style={styles.scoreValue}>{score || "0"}</Text>
          <Text style={styles.xpGain}>+{xp || "0"} XP</Text>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Về trang chủ"
            onPress={() => router.replace("/(tabs)")}
            variant="primary"
          />
          <Button
            title="Học bài tiếp"
            onPress={handleNextLesson}
            variant="outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    ...Typography.h1,
  },
  scoreCard: {
    alignItems: "center",
    padding: Spacing.xl,
    width: "100%",
    gap: Spacing.xs,
  },
  scoreLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  scoreValue: {
    ...Typography.h1,
    fontSize: 48,
    color: Colors.primary,
  },
  xpGain: {
    ...Typography.body,
    color: Colors.xp,
    fontWeight: "700",
  },
  actions: {
    width: "100%",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
});
