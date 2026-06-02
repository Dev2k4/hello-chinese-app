import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing } from "../constants/theme";
import {
  StreakSection,
  ReviewBanner,
  QuickActions,
  CurrentProgressCard,
  HskGrid,
  LoadingNotice,
  useHomeData,
} from "../features/home";
import { getPathLabel } from "../types/user.types";
import { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const {
    totalXp,
    dueItemsCount,
    currentLevel,
    currentTrack,
    currentProgress,
    hskCards,
    userDisplayName,
    greeting,
    catalogLoading,
    catalogError,
  } = useHomeData();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StreakSection
          greeting={greeting}
          displayName={userDisplayName}
          level={currentLevel}
          trackLabel={getPathLabel(
            `new-${currentLevel}` as any
          )}
          totalXp={totalXp}
          overallPercent={currentProgress?.overallPercent ?? 0}
        />

        <View style={styles.bodyContent}>
          <LoadingNotice loading={catalogLoading} error={catalogError} />

          <ReviewBanner
            dueCount={dueItemsCount}
            onPress={() => navigation.navigate("MainTabs")}
          />

          <QuickActions
            onLearnPress={() =>
              navigation.navigate("LearningPath", {
                level: currentLevel,
                track: currentTrack,
              })
            }
            onReviewPress={() => navigation.navigate("MainTabs")}
          />

          {currentProgress && (
            <CurrentProgressCard
              level={currentLevel}
              progress={currentProgress}
              totalXp={totalXp}
            />
          )}

          <HskGrid
            cards={hskCards}
            currentLevel={currentLevel}
            track={currentTrack}
            onCardPress={(level, track) =>
              navigation.navigate("LearningPath", { level, track })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  bodyContent: {
    paddingHorizontal: Spacing.lg,
    marginTop: -Spacing.lg,
    gap: Spacing.sm,
  },
});
