import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing } from "../constants/theme";
import {
  ProfileHero,
  StatsGrid,
  SkillsSection,
  HskProgressList,
  LoadingNotice,
  useProfileData,
} from "../features/profile";

export default function ProfileScreen() {
  const {
    settings,
    catalogLoading,
    catalogError,
    allProgress,
    statCards,
    skills,
    pathLabel,
    dailyTarget,
  } = useProfileData();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHero pathLabel={pathLabel} dailyTarget={dailyTarget} />

        <View style={styles.bodyContent}>
          <LoadingNotice loading={catalogLoading} error={catalogError} />

          <StatsGrid statCards={statCards} />
          <SkillsSection skills={skills} />
          <HskProgressList progressList={allProgress} />
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
  },
});
