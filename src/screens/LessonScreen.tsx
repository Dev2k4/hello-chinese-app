import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Colors,
  Spacing,
  Typography,
} from "../constants/theme";
import { Button, IonIcon } from "../components/common";
import {
  LessonTabBar,
  VocabView,
  GrammarView,
  PracticeView,
  ResultView,
  useLesson,
} from "../features/lesson";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Lesson">;

export default function LessonScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const {
    loading,
    error,
    lesson,
    vocab,
    grammar,
    questions,
    tabs,
    currentTab,
    setCurrentTab,
    currentQuestion,
    currentQuestionIndex,
    selectedOption,
    showResult,
    flippedCards,
    progress,
    isLastQuestion,
    correctCount,
    xpEarned,
    canAccess,
    handleSelect,
    handleNext,
    handleFinishSection,
    toggleFlip,
  } = useLesson(id);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Đang tải bài học...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!lesson || error) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.center}>
          <IonIcon
            name="alert-circle-outline"
            size="xl"
            color={Colors.error}
          />
          <Text style={styles.errorText}>Không thể tải bài học</Text>
          <Button
            title="Quay lại"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  if (showResult) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ResultView
          correctCount={correctCount}
          totalQuestions={questions.length}
          xp={xpEarned}
          onGoBack={() => navigation.goBack()}
          onGoHome={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "MainTabs" }],
            })
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <LessonTabBar
          tabs={tabs}
          currentTab={currentTab}
          onTabPress={setCurrentTab}
          canAccess={canAccess}
        />

        {currentTab === "vocab" && (
          <VocabView
            vocab={vocab}
            flippedCards={flippedCards}
            onToggleFlip={toggleFlip}
            onFinish={() => handleFinishSection("vocab")}
          />
        )}

        {currentTab === "grammar" && (
          <GrammarView
            grammar={grammar}
            onFinish={() => handleFinishSection("grammar")}
          />
        )}

        {currentTab === "practice" && currentQuestion && (
          <PracticeView
            currentQuestion={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedOption={selectedOption}
            onSelect={handleSelect}
            onNext={handleNext}
            isLastQuestion={isLastQuestion}
            progress={progress}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.md,
  },
  errorText: { ...Typography.h3, color: Colors.error, textAlign: "center" },
  loadingText: { ...Typography.body, color: Colors.textSecondary },
});
