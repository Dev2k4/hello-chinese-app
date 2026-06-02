import { View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
} from "../../../constants/theme";
import {
  ProgressBar,
  Button,
  FadeIn,
  ScaleIn,
} from "../../../components/common";
import { Flashcard } from "../../../components/lesson";
import { DueItem } from "../types";

interface FlashcardSessionProps {
  currentItem: DueItem;
  currentIndex: number;
  totalCount: number;
  showAnswer: boolean;
  onFlip: () => void;
  onRate: (quality: number) => void;
}

export default function FlashcardSession({
  currentItem,
  currentIndex,
  totalCount,
  showAnswer,
  onFlip,
  onRate,
}: FlashcardSessionProps) {
  return (
    <View style={styles.container}>
      <FadeIn>
        <View style={styles.header}>
          <ProgressBar
            progress={currentIndex / Math.max(totalCount, 1)}
            color={Colors.primary}
            height={6}
          />
          <Text style={styles.counter}>
            {currentIndex + 1} / {totalCount}
          </Text>
        </View>
      </FadeIn>

      <View style={styles.cardArea}>
        <ScaleIn key={currentItem.id}>
          <Flashcard
            hanzi={currentItem.hanzi}
            pinyin={currentItem.pinyin}
            meaning={currentItem.meaning}
            showAnswer={showAnswer}
            onFlip={onFlip}
          />
        </ScaleIn>
      </View>

      {showAnswer && (
        <FadeIn>
          <View style={styles.ratingArea}>
            <Text style={styles.ratingLabel}>
              Bạn nhớ từ này thế nào?
            </Text>
            <View style={styles.ratingRow}>
              <Button
                title="😰 Quên"
                onPress={() => onRate(1)}
                variant="outline"
                size="sm"
                style={styles.ratingBtn}
              />
              <Button
                title="🤔 Hơi khó"
                onPress={() => onRate(3)}
                variant="outline"
                size="sm"
                style={styles.ratingBtn}
              />
              <Button
                title="😊 Dễ"
                onPress={() => onRate(5)}
                variant="primary"
                size="sm"
                style={styles.ratingBtn}
              />
            </View>
          </View>
        </FadeIn>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: Spacing.lg, gap: Spacing.lg },
  header: { gap: Spacing.xs, paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
  counter: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: "right",
    fontWeight: "600",
  },
  cardArea: { flex: 1, justifyContent: "center", paddingHorizontal: Spacing.lg },
  ratingArea: { gap: Spacing.md, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg },
  ratingLabel: {
    ...Typography.bodySmall,
    textAlign: "center",
    color: Colors.textPrimary,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  ratingRow: { flexDirection: "row", gap: Spacing.sm, justifyContent: "center" },
  ratingBtn: { flex: 1, maxWidth: 100 },
});
