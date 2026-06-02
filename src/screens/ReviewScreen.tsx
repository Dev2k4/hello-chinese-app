import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";
import {
  ReviewStart,
  FlashcardSession,
  ReviewResult,
  useReviewSession,
} from "../features/review";

export default function ReviewScreen() {
  const navigation = useNavigation();
  const { started, state, currentItem, dueItems, totalCount, isEmpty, start, flip, rate } =
    useReviewSession();

  if (state.completed) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ReviewResult
          result={state.result}
          onGoHome={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  if (!started) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ReviewStart dueCount={isEmpty ? 0 : dueItems.length} onStart={start} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {currentItem && (
        <FlashcardSession
          currentItem={currentItem}
          currentIndex={state.currentIndex}
          totalCount={totalCount}
          showAnswer={state.showAnswer}
          onFlip={flip}
          onRate={rate}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
});
