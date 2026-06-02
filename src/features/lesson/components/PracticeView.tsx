import { View, Text, ScrollView, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import {
  Button,
  ProgressBar,
  FadeIn,
  ScaleIn,
  MaterialIcon,
  IonIcon,
} from "../../../components/common";
import { QuizOptions } from "../../../components/lesson";
import { ContentQuestion } from "../../../types/content.types";

interface PracticeViewProps {
  currentQuestion: ContentQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: string | null;
  onSelect: (option: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  progress: number;
}

export default function PracticeView({
  currentQuestion,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelect,
  onNext,
  isLastQuestion,
  progress,
}: PracticeViewProps) {
  return (
    <View style={styles.practiceContainer}>
      <FadeIn>
        <View style={styles.practiceHeader}>
          <View style={styles.practiceHeaderTop}>
            <MaterialIcon name="quiz" size="sm" color={Colors.accent} />
            <Text style={styles.practiceCounter}>
              Câu {currentIndex + 1}/{totalQuestions}
            </Text>
          </View>
          <ProgressBar
            progress={progress}
            color={Colors.accent}
            height={6}
          />
        </View>
      </FadeIn>

      <ScrollView
        style={styles.practiceQuestionArea}
        showsVerticalScrollIndicator={false}
      >
        <ScaleIn key={currentQuestion.id}>
          <Text style={styles.questionPrompt}>
            {currentQuestion.prompt}
          </Text>
          {currentQuestion.pinyin && (
            <Text style={styles.questionPinyin}>
              {currentQuestion.pinyin}
            </Text>
          )}
          <QuizOptions
            options={currentQuestion.options || []}
            selectedOption={selectedOption || undefined}
            correctAnswer={currentQuestion.correctAnswer}
            onSelect={onSelect}
            disabled={!!selectedOption}
          />
        </ScaleIn>
      </ScrollView>

      <View style={styles.practiceFooter}>
        {selectedOption && (
          <Button
            title={isLastQuestion ? "Xem kết quả" : "Tiếp theo"}
            onPress={onNext}
            variant="gradient"
            icon={<IonIcon name="arrow-forward" size="md" color="#fff" />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  practiceContainer: { flex: 1, padding: Spacing.lg, gap: Spacing.md },
  practiceHeader: { gap: Spacing.xs },
  practiceHeaderTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  practiceCounter: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  practiceQuestionArea: { flex: 1 },
  questionPrompt: {
    ...Typography.h2,
    marginBottom: Spacing.sm,
    color: Colors.textPrimary,
  },
  questionPinyin: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontStyle: "italic",
    marginBottom: Spacing.md,
  },
  practiceFooter: { gap: Spacing.sm },
});
