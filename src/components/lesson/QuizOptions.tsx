import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Spacing, BorderRadius, Typography } from "../../constants/theme";
import { IonIcon } from "../common";

interface QuizOptionsProps {
  options: string[];
  selectedOption?: string;
  correctAnswer: string;
  onSelect: (option: string) => void;
  disabled?: boolean;
}

export function QuizOptions({
  options,
  selectedOption,
  correctAnswer,
  onSelect,
  disabled = false,
}: QuizOptionsProps) {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        const isCorrect = option === correctAnswer;
        const showResult = !!selectedOption;

        let style: any = {};
        if (showResult) {
          if (isCorrect) {
            style = { backgroundColor: Colors.successLight, borderColor: Colors.success, textColor: Colors.success };
          } else if (isSelected) {
            style = { backgroundColor: Colors.errorLight, borderColor: Colors.error, textColor: Colors.error };
          } else {
            style = { backgroundColor: Colors.surface, borderColor: Colors.borderLight, textColor: Colors.textSecondary };
          }
        } else if (isSelected) {
          style = { backgroundColor: Colors.primary + "10", borderColor: Colors.primary, textColor: Colors.primary };
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.option, { backgroundColor: style.backgroundColor || Colors.surface, borderColor: style.borderColor || Colors.border }]}
            onPress={() => onSelect(option)}
            disabled={disabled || !!selectedOption}
            activeOpacity={0.7}
          >
            <Text style={styles.optionLetter}>
              {String.fromCharCode(65 + index)}
            </Text>
            <Text style={[styles.optionText, { color: style.textColor || Colors.textPrimary }]}>
              {option}
            </Text>
            {showResult && isCorrect && (
              <IonIcon name="checkmark-circle" size="md" color={Colors.success} />
            )}
            {showResult && isSelected && !isCorrect && (
              <IonIcon name="close-circle" size="md" color={Colors.error} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.borderLight,
    textAlign: "center",
    lineHeight: 28,
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
    overflow: "hidden",
  },
  optionText: {
    ...Typography.body,
    flex: 1,
    fontWeight: "500",
  },
});
