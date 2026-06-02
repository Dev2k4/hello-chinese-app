import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
} from "../../../constants/theme";
import {
  Card,
  Button,
  FadeIn,
  ScaleIn,
  IonIcon,
} from "../../../components/common";
import { ReviewResult as ReviewResultType } from "../types";

interface ReviewResultProps {
  result: ReviewResultType;
  onGoHome: () => void;
}

export default function ReviewResult({ result, onGoHome }: ReviewResultProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ScaleIn>
        <View style={styles.resultSection}>
          <View
            style={[
              styles.resultEmojiWrap,
              { backgroundColor: Colors.primary + "20" },
            ]}
          >
            <IonIcon
              name="happy-outline"
              size="xxl"
              color={Colors.primary}
            />
          </View>
          <Text style={styles.resultTitle}>Hoàn thành ôn tập!</Text>
          <Text style={styles.resultSub}>
            Hôm nay bạn đã ôn {result.total} từ
          </Text>
        </View>
      </ScaleIn>

      <FadeIn delay={150}>
        <Card style={styles.resultStats}>
          <View style={styles.resultStatRow}>
            <View
              style={[styles.resultDot, { backgroundColor: Colors.success }]}
            />
            <Text style={styles.resultStatLabel}>Nhớ tốt</Text>
            <Text
              style={[styles.resultStatValue, { color: Colors.success }]}
            >
              {result.good}
            </Text>
          </View>
          <View style={styles.resultStatRow}>
            <View
              style={[styles.resultDot, { backgroundColor: Colors.warning }]}
            />
            <Text style={styles.resultStatLabel}>Hơi khó</Text>
            <Text
              style={[styles.resultStatValue, { color: Colors.warning }]}
            >
              {result.ok}
            </Text>
          </View>
          <View style={styles.resultStatRow}>
            <View
              style={[styles.resultDot, { backgroundColor: Colors.error }]}
            />
            <Text style={styles.resultStatLabel}>Cần ôn lại</Text>
            <Text
              style={[styles.resultStatValue, { color: Colors.error }]}
            >
              {result.bad}
            </Text>
          </View>
        </Card>
      </FadeIn>

      <FadeIn delay={250}>
        <Button
          title="Về trang chủ"
          onPress={onGoHome}
          variant="gradient"
          size="lg"
          icon={<IonIcon name="home-outline" size="md" color="#fff" />}
        />
      </FadeIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: Spacing.xxl },
  resultSection: {
    alignItems: "center",
    paddingTop: Spacing.xxxl,
    gap: Spacing.sm,
  },
  resultEmojiWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.secondary + "25",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  resultTitle: { ...Typography.h1, color: Colors.textPrimary },
  resultSub: { ...Typography.body, color: Colors.textSecondary },
  resultStats: {
    marginHorizontal: Spacing.lg,
    gap: Spacing.md,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  resultStatRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  resultDot: { width: 10, height: 10, borderRadius: 5 },
  resultStatLabel: {
    ...Typography.body,
    flex: 1,
    color: Colors.textSecondary,
  },
  resultStatValue: { ...Typography.h3, fontWeight: "800" },
});
