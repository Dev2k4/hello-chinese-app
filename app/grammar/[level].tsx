import { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography, BorderRadius } from "../../src/constants/theme";
import { Card, FadeIn, MaterialIcon } from "../../src/components/common";
import { useGrammarByLevel } from "../../src/hooks/useContent";

interface GrammarItem {
  id: string;
  title: string;
  explanation: string;
  structure: string;
  examples: { hanzi: string; pinyin: string; translations?: { vi?: string } }[];
}

export default function GrammarScreen() {
  const { levelId, level } = useLocalSearchParams<{ levelId: string; level: string }>();
  const levelNum = parseInt(level || "1");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { data: grammarData, loading } = useGrammarByLevel(levelId || null);

  const toggleExpand = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  const renderItem = useCallback(({ item }: { item: GrammarItem }) => {
    const isExpanded = expandedId === item.id;
    return (
      <FadeIn>
        <Card style={styles.item} padded={false}>
          <TouchableOpacity style={styles.itemHeader} onPress={() => toggleExpand(item.id)} activeOpacity={0.7}>
            <View style={styles.itemHeaderLeft}>
              <View style={styles.iconWrap}>
                <MaterialIcon name="menu-book" size="sm" color={Colors.primary} />
              </View>
              <Text style={styles.title} numberOfLines={isExpanded ? undefined : 2}>{item.title}</Text>
            </View>
            <MaterialIcon name={isExpanded ? "expand-less" : "expand-more"} size="sm" color={Colors.textLight} />
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.itemBody}>
              {item.explanation ? (
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>Giải thích</Text>
                  <Text style={styles.sectionText}>{item.explanation}</Text>
                </View>
              ) : null}

              {item.structure ? (
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>Cấu trúc</Text>
                  <Text style={styles.structure}>{item.structure}</Text>
                </View>
              ) : null}

              {item.examples && item.examples.length > 0 ? (
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>Ví dụ</Text>
                  {item.examples.map((ex: any, i: number) => (
                    <View key={i} style={styles.example}>
                      <Text style={styles.exampleHanzi}>{ex.hanzi}</Text>
                      {ex.pinyin ? <Text style={styles.examplePinyin}>{ex.pinyin}</Text> : null}
                      {ex.translations?.vi ? <Text style={styles.exampleMeaning}>{ex.translations.vi}</Text> : null}
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          )}
        </Card>
      </FadeIn>
    );
  }, [expandedId]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen options={{ title: `HSK ${levelNum} - Ngữ pháp` }} />
      <View style={styles.header}>
        <Text style={styles.title}>Ngữ pháp HSK {levelNum}</Text>
        <Text style={styles.subtitle}>{grammarData?.total || 0} điểm ngữ pháp</Text>
      </View>

      <FlatList
        data={grammarData?.items || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.empty}>Đang tải...</Text>
          ) : (
            <Text style={styles.empty}>Chưa có dữ liệu ngữ pháp</Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  title: { ...Typography.h2 },
  subtitle: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl, gap: Spacing.sm, marginTop: Spacing.md },
  item: {},
  itemHeader: { flexDirection: "row", alignItems: "center", padding: Spacing.md, gap: Spacing.sm },
  itemHeaderLeft: { flexDirection: "row", alignItems: "center", flex: 1, gap: Spacing.sm },
  iconWrap: { width: 32, height: 32, borderRadius: BorderRadius.sm, backgroundColor: Colors.primaryLight, alignItems: "center", justifyContent: "center" },
  sectionLabel: { ...Typography.caption, color: Colors.primary, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  sectionText: { ...Typography.bodySmall, color: Colors.textPrimary, lineHeight: 20 },
  structure: { ...Typography.bodyBold, color: Colors.secondary || Colors.primary, backgroundColor: Colors.surfaceAlt || Colors.primaryLight, padding: Spacing.sm, borderRadius: BorderRadius.sm, overflow: "hidden" },
  itemBody: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, gap: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.borderLight },
  section: { gap: Spacing.xs },
  example: { backgroundColor: Colors.background, padding: Spacing.sm, borderRadius: BorderRadius.sm, gap: 2 },
  exampleHanzi: { ...Typography.body, fontWeight: "600" },
  examplePinyin: { ...Typography.caption, color: Colors.primary, fontStyle: "italic" },
  exampleMeaning: { ...Typography.caption, color: Colors.textSecondary },
  empty: { ...Typography.body, color: Colors.textSecondary, textAlign: "center", marginTop: Spacing.xxl },
});
