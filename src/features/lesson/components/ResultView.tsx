import { View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import {
  Card,
  Button,
  ScaleIn,
  FadeIn,
  MaterialIcon,
  IonIcon,
} from "../../../components/common";

interface ResultViewProps {
  correctCount: number;
  totalQuestions: number;
  xp: number;
  onGoBack: () => void;
  onGoHome: () => void;
}

export default function ResultView({
  correctCount,
  totalQuestions,
  xp,
  onGoBack,
  onGoHome,
}: ResultViewProps) {
  return (
    <View style={styles.resultContainer}>
      <ScaleIn>
        <View style={styles.resultEmojiWrap}>
          <IonIcon
            name={
              correctCount === totalQuestions
                ? "happy-outline"
                : "fitness-outline"
            }
            size="xxl"
            color={
              correctCount === totalQuestions
                ? Colors.secondary
                : Colors.primary
            }
          />
        </View>
        <Text style={styles.resultTitle}>Hoàn thành!</Text>
      </ScaleIn>

      <FadeIn delay={150}>
        <Card style={styles.resultCard}>
          <Text style={styles.resultLabel}>Điểm số</Text>
          <Text style={styles.resultScore}>
            {correctCount}/{totalQuestions}
          </Text>
          <View style={styles.xpBadge}>
            <MaterialIcon name="bolt" size="sm" color="#fff" />
            <Text style={styles.xpText}>+{xp} XP</Text>
          </View>
        </Card>
      </FadeIn>

      <FadeIn delay={250}>
        <View style={styles.resultActions}>
          <Button
            title="Học tiếp"
            onPress={onGoBack}
            variant="outline"
            size="lg"
            icon={
              <IonIcon
                name="arrow-forward"
                size="md"
                color={Colors.primary}
              />
            }
          />
          <Button
            title="Về trang chủ"
            onPress={onGoHome}
            variant="ghost"
            icon={
              <IonIcon
                name="home-outline"
                size="md"
                color={Colors.textSecondary}
              />
            }
          />
        </View>
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  resultEmojiWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.secondary + "25",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  resultTitle: { ...Typography.h1, color: Colors.textPrimary },
  resultCard: {
    alignItems: "center",
    padding: Spacing.xl,
    width: "100%",
    gap: Spacing.sm,
  },
  resultLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  resultScore: { ...Typography.hero, fontSize: 48, color: Colors.primary },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.xp,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  xpText: { ...Typography.bodyBold, color: "#fff", fontSize: 14 },
  resultActions: {
    width: "100%",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
});
