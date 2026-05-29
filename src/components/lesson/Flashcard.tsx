import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Spacing, BorderRadius, Typography, Shadows } from "../../constants/theme";
import { useAudio } from "../../hooks/useAudio";
import { MaterialIcon } from "../common";

interface FlashcardProps {
  hanzi: string;
  pinyin: string;
  meaning: string;
  audioUrl?: string;
  showAnswer?: boolean;
  onFlip?: () => void;
}

export function Flashcard({
  hanzi,
  pinyin,
  meaning,
  audioUrl,
  showAnswer = false,
  onFlip,
}: FlashcardProps) {
  const { playSound } = useAudio();

  return (
    <TouchableOpacity
      style={[styles.card, showAnswer ? styles.cardFlipped : undefined]}
      onPress={onFlip}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        {!showAnswer && (
          <View style={styles.hintRow}>
            <MaterialIcon name="touch-app" size="sm" color={Colors.textLight} />
            <Text style={styles.hintText}>Nhấn để xem đáp án</Text>
          </View>
        )}
        <Text style={styles.hanzi}>{hanzi}</Text>
        {showAnswer && (
          <>
            <View style={styles.divider} />
            <Text style={styles.pinyin}>{pinyin}</Text>
            <Text style={styles.meaning}>{meaning}</Text>
            {audioUrl && (
              <TouchableOpacity
                style={styles.audioButton}
                onPress={() => playSound(audioUrl)}
              >
                <MaterialIcon name="volume-up" size="md" color={Colors.primary} />
                <Text style={styles.audioText}>Nghe phát âm</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {!showAnswer && (
        <View style={styles.flipArrow}>
          <MaterialIcon name="expand-more" size="md" color={Colors.textLight} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    minHeight: 260,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardFlipped: {
    backgroundColor: Colors.secondary + "12",
    borderColor: Colors.secondary + "40",
  },
  content: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  hintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  hintText: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  hanzi: {
    fontSize: 52,
    fontWeight: "700",
    color: Colors.textPrimary,
    letterSpacing: 6,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: Colors.border,
    borderRadius: 1,
    marginVertical: Spacing.sm,
  },
  pinyin: {
    fontSize: 20,
    color: Colors.textSecondary,
    fontStyle: "italic",
    fontWeight: "500",
  },
  meaning: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginTop: Spacing.xs,
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.primary + "10",
    borderRadius: BorderRadius.full,
  },
  audioText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: "600",
  },
  flipArrow: {
    position: "absolute",
    bottom: Spacing.sm,
  },
});
