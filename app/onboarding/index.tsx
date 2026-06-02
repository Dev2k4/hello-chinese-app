import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../src/constants/theme";
import { Card, Button, FadeIn, ScaleIn, MaterialIcon, IonIcon } from "../../src/components/common";
import { useUserStore } from "../../src/store/useUserStore";
import apiClient from "../../src/services/apiClient";
import { API_ROUTES } from "../../src/constants/apiRoutes";

type Track = "new" | "exp" | "review";

const minuteOptions = [5, 10, 15, 30, 60];
const wordOptions = [3, 5, 10, 15, 20];

const trackInfo: { track: Track; icon: string; label: string; desc: string }[] = [
  { track: "new", icon: "leaf-outline", label: "Người mới", desc: "Học từ đầu, từng bước chi tiết" },
  { track: "exp", icon: "rocket-outline", label: "Tăng tốc", desc: "Đã có nền tảng, học nhanh hơn" },
  { track: "review", icon: "refresh-outline", label: "Ôn tập", desc: "Ôn luyện và thi thử" },
];

const HSK_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function OnboardingScreen() {
  const [step, setStep] = useState<"path" | "goals">("path");
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [targetLevel, setTargetLevel] = useState(1);
  const [minutesPerDay, setMinutesPerDay] = useState(15);
  const [wordsPerDay, setWordsPerDay] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const setSettings = useUserStore((s) => s.setSettings);
  const fetchProfile = useUserStore((s) => s.fetchProfile);

  const handleNext = () => {
    if (!selectedTrack) return;
    setStep("goals");
  };

  const handleStartLearning = async () => {
    if (!selectedTrack) return;
    setSubmitting(true);
    try {
      const code = `${selectedTrack}-${targetLevel}` as const;
      await apiClient.post(API_ROUTES.USERS.ONBOARDING, {
        track: selectedTrack,
        targetLevel,
        targetMinutesPerDay: minutesPerDay,
        targetWordsPerDay: wordsPerDay,
      });
      setSettings({
        learningPath: code,
        targetMinutesPerDay: minutesPerDay,
        targetWordsPerDay: wordsPerDay,
        startDate: new Date().toISOString(),
      });
      await fetchProfile();
      router.replace("/(tabs)");
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {step === "path" ? (
          <>
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroSection}>
              <ScaleIn>
                <View style={styles.heroContent}>
                  <Text style={styles.heroEmoji}>🐱🐉</Text>
                  <Text style={styles.heroTitle}>Chinese4VN</Text>
                  <Text style={styles.heroSub}>Chọn lộ trình học phù hợp với bạn</Text>
                </View>
              </ScaleIn>
            </LinearGradient>

            <View style={styles.bodyContent}>
              <FadeIn delay={150}>
                <Text style={styles.sectionLabel}>Bạn muốn học theo cách nào?</Text>
              </FadeIn>

              {trackInfo.map((t, i) => (
                <FadeIn key={t.track} delay={150 + i * 100}>
                  <Card
                    onPress={() => setSelectedTrack(t.track)}
                    style={[styles.optionCard, selectedTrack === t.track ? styles.optionCardSelected : undefined]}
                  >
                    <View style={styles.optionCardContent}>
                      <View style={[styles.optionIconWrap, { backgroundColor: selectedTrack === t.track ? Colors.primary + "20" : Colors.surfaceAlt }]}>
                        <IonIcon name={t.icon as any} size="lg" color={selectedTrack === t.track ? Colors.primary : Colors.textLight} />
                      </View>
                      <View style={styles.optionText}>
                        <Text style={styles.optionLabel}>{t.label}</Text>
                        <Text style={styles.optionDesc}>{t.desc}</Text>
                      </View>
                    </View>
                  </Card>
                </FadeIn>
              ))}

              <FadeIn delay={450}>
                <Text style={styles.sectionLabel}>Trình độ mục tiêu</Text>
              </FadeIn>

              <FadeIn delay={500}>
                <View style={styles.levelGrid}>
                  {HSK_LEVELS.map((lv) => (
                    <TouchableOpacity
                      key={lv}
                      onPress={() => setTargetLevel(lv)}
                      style={[
                        styles.levelChip,
                        targetLevel === lv && styles.levelChipSelected,
                      ]}
                    >
                      <Text style={[styles.levelChipText, targetLevel === lv && styles.levelChipTextSelected]}>
                        HSK {lv}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </FadeIn>

              <FadeIn delay={550}>
                <Button
                  title="Tiếp theo"
                  onPress={handleNext}
                  variant="gradient"
                  size="lg"
                  disabled={!selectedTrack}
                  icon={<MaterialIcon name="arrow-forward" size="md" color="#fff" />}
                />
              </FadeIn>
            </View>
          </>
        ) : (
          <>
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroSection}>
              <ScaleIn>
                <View style={styles.heroContent}>
                  <IonIcon name="options-outline" size="xxl" color="#fff" />
                  <Text style={styles.heroTitle}>Thiết lập mục tiêu</Text>
                  <Text style={styles.heroSub}>Cá nhân hóa lộ trình học của bạn</Text>
                </View>
              </ScaleIn>
            </LinearGradient>

            <View style={styles.bodyContent}>
              <FadeIn delay={100}>
                <Card style={styles.goalCard}>
                  <View style={styles.goalHeader}>
                    <MaterialIcon name="timer" size="md" color={Colors.primary} />
                    <Text style={styles.goalTitle}>Thời gian học mỗi ngày</Text>
                  </View>
                  <View style={styles.optionGrid}>
                    {minuteOptions.map((m) => (
                      <Button
                        key={m}
                        title={`${m} phút`}
                        onPress={() => setMinutesPerDay(m)}
                        variant={minutesPerDay === m ? "primary" : "outline"}
                        size="sm"
                        style={styles.optionBtn}
                      />
                    ))}
                  </View>
                </Card>
              </FadeIn>

              <FadeIn delay={200}>
                <Card style={styles.goalCard}>
                  <View style={styles.goalHeader}>
                    <MaterialIcon name="spellcheck" size="md" color={Colors.info} />
                    <Text style={styles.goalTitle}>Số từ mới mỗi ngày</Text>
                  </View>
                  <View style={styles.optionGrid}>
                    {wordOptions.map((w) => (
                      <Button
                        key={w}
                        title={`${w} từ`}
                        onPress={() => setWordsPerDay(w)}
                        variant={wordsPerDay === w ? "primary" : "outline"}
                        size="sm"
                        style={styles.optionBtn}
                      />
                    ))}
                  </View>
                </Card>
              </FadeIn>

              <FadeIn delay={300}>
                <Button
                  title="Bắt đầu học!"
                  onPress={handleStartLearning}
                  variant="gradient"
                  size="lg"
                  loading={submitting}
                  icon={<IonIcon name="arrow-forward" size="md" color="#fff" />}
                />
              </FadeIn>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  heroSection: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xxl, borderBottomLeftRadius: BorderRadius.xxl, borderBottomRightRadius: BorderRadius.xxl },
  heroContent: { alignItems: "center", gap: Spacing.sm },
  heroEmoji: { fontSize: 48, marginBottom: 4 },
  heroTitle: { ...Typography.h1, color: "#fff" },
  heroSub: { ...Typography.bodySmall, color: "rgba(255,255,255,0.85)", textAlign: "center" },
  bodyContent: { paddingHorizontal: Spacing.lg, marginTop: Spacing.lg, gap: Spacing.md },
  sectionLabel: { ...Typography.bodyBold, marginBottom: Spacing.xs },
  optionCard: { borderWidth: 2, borderColor: "transparent" },
  optionCardSelected: { borderColor: Colors.primary, backgroundColor: Colors.primary + "08" },
  optionCardContent: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  optionIconWrap: { width: 48, height: 48, borderRadius: BorderRadius.md, alignItems: "center", justifyContent: "center" },
  optionText: { flex: 1 },
  optionLabel: { ...Typography.bodyBold },
  optionDesc: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  levelGrid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm },
  levelChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceAlt, borderWidth: 1, borderColor: Colors.border },
  levelChipSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  levelChipText: { ...Typography.bodySmall, color: Colors.textSecondary },
  levelChipTextSelected: { color: "#fff", fontWeight: "700" },
  goalCard: { gap: Spacing.md },
  goalHeader: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  goalTitle: { ...Typography.bodyBold },
  optionGrid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm },
  optionBtn: { flex: 1, minWidth: 56 },
});
