import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Colors,
  Spacing,
  Typography,
} from "../constants/theme";
import {
  IonIcon,
  Button,
} from "../components/common";
import {
  LevelHero,
  ProgressOverview,
  UnitCard,
  LoadingError,
  useLearningPath,
} from "../features/learning-path";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "LearningPath">;

export default function LearningPathScreen({ route, navigation }: Props) {
  const { level, track: trackParam } = route.params;
  const {
    loading,
    error,
    hskLevel,
    progress,
    units,
    pathName,
    pathDesc,
    lessonProgress,
  } = useLearningPath(level, trackParam);

  if (!hskLevel && !loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.errorSection}>
          <IonIcon
            name="alert-circle-outline"
            size="xl"
            color={Colors.error}
          />
          <Text style={styles.errorText}>
            Không tìm thấy HSK level {level}
          </Text>
          <Button
            title="Quay lại"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LevelHero name={pathName} description={pathDesc} />

        <View style={styles.bodyContent}>
          <LoadingError loading={loading} error={error} />

          {progress && <ProgressOverview progress={progress} />}

          {units.map((unit, idx) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              index={idx}
              unitProgress={unit.unitProgressCount}
              lessonProgress={lessonProgress}
              onLessonPress={(lessonId) =>
                navigation.navigate("Lesson", { id: lessonId })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  errorSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.md,
    padding: Spacing.xl,
  },
  errorText: { ...Typography.h3, color: Colors.error, textAlign: "center" },
  bodyContent: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
});
