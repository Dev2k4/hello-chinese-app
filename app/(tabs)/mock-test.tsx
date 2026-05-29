import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../src/constants/theme";
import { Card, Button, FadeIn, ScaleIn, StaggerList, MaterialIcon, IonIcon } from "../../src/components/common";
import { useContentCatalog, useMockTest } from "../../src/hooks/useContent";

export default function MockTestScreen() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const { data: catalog, loading: catalogLoading, error: catalogError } = useContentCatalog();
  const { data: mockTest, loading: testLoading, error: testError } = useMockTest(selectedLevel);
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setStarted(false);
    setShowResult(false);
    setCurrentSection(0);
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
  }, [selectedLevel]);

  const startTest = () => {
    if (!mockTest) return;
    setStarted(true);
    setShowResult(false);
    setCurrentSection(0);
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
  };

  const handleSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    if (!mockTest) return;
    const q = mockTest.sections[currentSection].questions[currentQuestion];
    setAnswers((prev) => ({ ...prev, [q.id]: option === q.correctAnswer }));
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (!mockTest) return;
    const section = mockTest.sections[currentSection];
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else if (currentSection < mockTest.sections.length - 1) {
      setCurrentSection((s) => s + 1);
      setCurrentQuestion(0);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const total = Object.keys(answers).length;
    const correct = Object.values(answers).filter(Boolean).length;
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroSectionSm}>
            <FadeIn>
              <View style={styles.heroContent}>
                <IonIcon name="trophy-outline" size="xl" color="#fff" />
                <Text style={styles.heroTitle}>Kết quả thi thử</Text>
              </View>
            </FadeIn>
          </LinearGradient>
          <View style={styles.bodyContent}>
            <FadeIn delay={100}><Card style={styles.resultCard}>
              <Text style={styles.resultLabel}>Tổng điểm</Text>
              <Text style={styles.resultScore}>{correct}/{total}</Text>
              <Text style={[styles.resultPercent, { color: correct / Math.max(total, 1) >= 0.6 ? Colors.success : Colors.warning }]}>{total > 0 ? Math.round((correct / total) * 100) : 0}%</Text>
            </Card></FadeIn>
            <FadeIn delay={200}><Button title="Làm lại" onPress={startTest} variant="gradient" icon={<IonIcon name="refresh" size="md" color="#fff" />} /></FadeIn>
            <FadeIn delay={280}><Button title="Về trang chủ" onPress={() => { setSelectedLevel(null); setStarted(false); setShowResult(false); }} variant="outline" icon={<IonIcon name="home-outline" size="md" color={Colors.primary} />} /></FadeIn>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (started) {
    if (!mockTest) {
      return (
        <SafeAreaView style={styles.container} edges={["top"]}>
          <View style={styles.emptyTestWrap}>
            <Text style={styles.noticeText}>Khong the tai de thi. Hay thu lai.</Text>
          </View>
        </SafeAreaView>
      );
    }
    const section = mockTest.sections[currentSection];
    const question = section.questions[currentQuestion];
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.testContent}>
          <FadeIn><View style={styles.testHeader}>
            <View style={styles.testSectionBadge}>
              <MaterialIcon name={section.type === "listening" ? "headphones" : section.type === "reading" ? "visibility" : "edit"} size="sm" color="#fff" />
              <Text style={styles.testSectionLabel}>Phần {currentSection + 1}: {section.type === "listening" ? "Nghe" : section.type === "reading" ? "Đọc" : "Viết"}</Text>
            </View>
          </View></FadeIn>
          <ScrollView style={styles.testQuestionArea} showsVerticalScrollIndicator={false}>
            <ScaleIn key={question.id}>
              <Text style={styles.questionPrompt}>{question.prompt}</Text>
              <View style={styles.optionsList}>
                {question.options?.map((opt, i) => (
                  <Button key={i} title={opt} onPress={() => handleSelect(opt)} variant={selectedOption === opt ? "primary" : "outline"} style={styles.optionBtn} />
                ))}
              </View>
            </ScaleIn>
          </ScrollView>
          <View style={styles.testFooter}>{selectedOption && <Button title="Tiếp theo" onPress={handleNext} variant="gradient" icon={<IonIcon name="arrow-forward" size="md" color="#fff" />} />}</View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroSection}>
          <FadeIn>
            <View style={styles.heroContent}>
              <MaterialIcon name="quiz" size="xl" color="#fff" />
              <Text style={styles.heroTitle}>Đề thi thử HSK</Text>
              <Text style={styles.heroSub}>Chọn cấp độ và bắt đầu thi thử ngay</Text>
            </View>
          </FadeIn>
        </LinearGradient>

        <View style={styles.bodyContent}>
          {catalogLoading && (
            <FadeIn delay={80}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Dang tai danh sach HSK...</Text>
              </Card>
            </FadeIn>
          )}

          {catalogError && (
            <FadeIn delay={80}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Khong the tai du lieu. Hay kiem tra content URL.</Text>
              </Card>
            </FadeIn>
          )}

          {selectedLevel && testLoading && (
            <FadeIn delay={120}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Dang tai de thi...</Text>
              </Card>
            </FadeIn>
          )}

          {selectedLevel && testError && (
            <FadeIn delay={120}>
              <Card style={styles.noticeCard}>
                <Text style={styles.noticeText}>Khong the tai de thi. Hay thu lai.</Text>
              </Card>
            </FadeIn>
          )}

          <StaggerList baseDelay={150} staggerMs={80}>
            {(catalog?.levels || []).map((hsk) => (
              <Card key={hsk.id} onPress={() => setSelectedLevel(hsk.id)} style={[styles.levelCard, selectedLevel === hsk.id ? styles.levelCardSelected : undefined]}>
                <View style={styles.levelCardContent}>
                  <View style={[styles.levelBadge, { backgroundColor: selectedLevel === hsk.id ? Colors.primary : Colors.borderLight }]}>
                    <Text style={[styles.levelBadgeText, { color: selectedLevel === hsk.id ? "#fff" : Colors.textSecondary }]}>{hsk.name}</Text>
                  </View>
                  <View style={styles.levelInfo}>
                    <Text style={styles.levelTitle}>{hsk.description}</Text>
                    <Text style={styles.levelMeta}>{hsk.totalWords} từ • {hsk.totalGrammar} điểm ngữ pháp</Text>
                  </View>
                  {selectedLevel === hsk.id && <MaterialIcon name="check-circle" size="md" color={Colors.primary} />}
                </View>
              </Card>
            ))}
          </StaggerList>

          {selectedLevel && (
            <FadeIn delay={400}>
              <Button title="Bắt đầu thi" onPress={startTest} variant="gradient" size="lg" icon={<IonIcon name="play" size="md" color="#fff" />} disabled={testLoading || !!testError} />
            </FadeIn>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: Spacing.xxl },
  heroSection: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xl, borderBottomLeftRadius: BorderRadius.xxl, borderBottomRightRadius: BorderRadius.xxl },
  heroSectionSm: { paddingVertical: Spacing.lg, borderBottomLeftRadius: BorderRadius.xxl, borderBottomRightRadius: BorderRadius.xxl },
  heroContent: { alignItems: "center", gap: Spacing.sm },
  heroTitle: { ...Typography.h1, color: "#fff" },
  heroSub: { ...Typography.bodySmall, color: "rgba(255,255,255,0.85)", textAlign: "center" },
  bodyContent: { paddingHorizontal: Spacing.lg, marginTop: Spacing.lg, gap: Spacing.md },
  levelCard: { borderWidth: 2, borderColor: "transparent" },
  levelCardSelected: { borderColor: Colors.primary, backgroundColor: Colors.primary + "08" },
  levelCardContent: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  levelBadge: { paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: BorderRadius.sm },
  levelBadgeText: { ...Typography.caption, fontWeight: "700" },
  levelInfo: { flex: 1 },
  levelTitle: { ...Typography.bodySmall, color: Colors.textSecondary },
  levelMeta: { ...Typography.caption, color: Colors.textLight, marginTop: 2 },
  resultCard: { alignItems: "center", padding: Spacing.xl, gap: Spacing.sm },
  resultLabel: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: "600" },
  resultScore: { ...Typography.hero, fontSize: 48, color: Colors.primary },
  resultPercent: { ...Typography.h3, fontWeight: "800" },
  testContent: { flex: 1, padding: Spacing.lg, gap: Spacing.md },
  testHeader: {},
  testSectionBadge: { flexDirection: "row", alignItems: "center", gap: Spacing.sm, backgroundColor: Colors.primary, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.md, alignSelf: "flex-start" },
  testSectionLabel: { ...Typography.bodySmall, color: "#fff", fontWeight: "600" },
  testQuestionArea: { flex: 1 },
  questionPrompt: { ...Typography.h2, marginBottom: Spacing.lg },
  optionsList: { gap: Spacing.sm },
  optionBtn: { width: "100%" },
  testFooter: { paddingVertical: Spacing.md },
  noticeCard: { padding: Spacing.md },
  noticeText: { ...Typography.bodySmall, color: Colors.textSecondary },
  emptyTestWrap: { padding: Spacing.lg, alignItems: "center" },
});
