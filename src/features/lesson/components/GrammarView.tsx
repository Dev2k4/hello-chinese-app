import { ScrollView, View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { Card, Button, StaggerList, MaterialIcon, IonIcon } from "../../../components/common";
import { ContentGrammarPoint } from "../../../types/content.types";

interface GrammarViewProps {
  grammar: ContentGrammarPoint[];
  onFinish: () => void;
}

export default function GrammarView({
  grammar,
  onFinish,
}: GrammarViewProps) {
  return (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
    >
      <StaggerList baseDelay={50} staggerMs={80}>
        {grammar.map((g) => (
          <Card key={g.id} style={styles.grammarCard}>
            <View style={styles.grammarTitleRow}>
              <MaterialIcon
                name="lightbulb-outline"
                size="sm"
                color={Colors.accent}
              />
              <Text style={styles.grammarTitle}>{g.title}</Text>
            </View>
            <Text style={styles.grammarExplanation}>
              {g.explanation}
            </Text>
            <View style={styles.structureBox}>
              <Text style={styles.structureLabel}>Cấu trúc</Text>
              <Text style={styles.structureText}>{g.structure}</Text>
            </View>
            <View style={styles.examplesSection}>
              <Text style={styles.examplesLabel}>Ví dụ</Text>
              {g.examples.map((ex, i) => (
                <View key={i} style={styles.exampleRow}>
                  <Text style={styles.exampleHanzi}>{ex.hanzi}</Text>
                  <Text style={styles.examplePinyin}>{ex.pinyin}</Text>
                  <Text style={styles.exampleMeaning}>{ex.meaning}</Text>
                </View>
              ))}
            </View>
          </Card>
        ))}
      </StaggerList>
      {grammar.length > 0 && (
        <Button
          title="Đã học xong ngữ pháp"
          onPress={onFinish}
          variant="gradient"
          icon={<IonIcon name="checkmark-circle" size="md" color="#fff" />}
          style={styles.sectionBtn}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabContent: { flex: 1, padding: Spacing.lg, gap: Spacing.md },
  sectionBtn: { marginTop: Spacing.lg, marginBottom: Spacing.xl },
  grammarCard: { gap: Spacing.md },
  grammarTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  grammarTitle: { ...Typography.h3, color: Colors.accent, flex: 1 },
  grammarExplanation: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  structureBox: {
    backgroundColor: Colors.accent + "10",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
  },
  structureLabel: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  structureText: { ...Typography.bodyBold, fontStyle: "italic" },
  examplesSection: { gap: Spacing.sm },
  examplesLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  exampleRow: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  exampleHanzi: {
    ...Typography.body,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  examplePinyin: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontStyle: "italic",
    marginTop: 2,
  },
  exampleMeaning: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
