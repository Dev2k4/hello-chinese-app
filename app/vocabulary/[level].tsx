import { useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../src/constants/theme";
import { Card, FadeIn, MaterialIcon } from "../../src/components/common";
import { useContentCatalog, useVocabularyByLevel } from "../../src/hooks/useContent";

export default function VocabularyScreen() {
  const { levelId, level } = useLocalSearchParams<{ levelId: string; level: string }>();
  const levelNum = parseInt(level || "1");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data: catalog } = useContentCatalog();
  const { data: vocabData, loading } = useVocabularyByLevel(levelId || null, page);

  const filtered = useMemo(() => {
    if (!vocabData?.items) return [];
    if (!search.trim()) return vocabData.items;
    const q = search.toLowerCase();
    return vocabData.items.filter(
      (v) => v.hanzi.includes(q) || v.pinyin.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q),
    );
  }, [vocabData, search]);

  const loadMore = useCallback(() => {
    if (vocabData && vocabData.items.length < vocabData.total) {
      setPage((p) => p + 1);
    }
  }, [vocabData]);

  const renderItem = useCallback(({ item }: any) => (
    <FadeIn>
      <Card style={styles.item} padded={false}>
        <View style={styles.itemInner}>
          <View style={styles.itemLeft}>
            <Text style={styles.hanzi}>{item.hanzi}</Text>
            <Text style={styles.pinyin}>{item.pinyin}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.meaning}>{item.meaning}</Text>
            {item.wordClass && <Text style={styles.wordClass}>{item.wordClass}</Text>}
          </View>
          <MaterialIcon name="chevron-right" size="sm" color={Colors.textLight} />
        </View>
      </Card>
    </FadeIn>
  ), []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen options={{ title: `HSK ${levelNum} - Từ vựng` }} />
      <View style={styles.header}>
        <Text style={styles.title}>Từ vựng HSK {levelNum}</Text>
        <Text style={styles.subtitle}>{vocabData?.total || 0} từ</Text>
      </View>

      <View style={styles.searchWrap}>
        <MaterialIcon name="search" size="sm" color={Colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm từ (hanzi, pinyin, nghĩa)..."
          placeholderTextColor={Colors.textLight}
          value={search}
          onChangeText={setSearch}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch("")}>
            <MaterialIcon name="close" size="sm" color={Colors.textLight} />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.empty}>Đang tải...</Text>
          ) : (
            <Text style={styles.empty}>Không tìm thấy từ nào</Text>
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
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    height: 44,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  searchInput: { flex: 1, ...Typography.body, color: Colors.textPrimary, paddingVertical: 0 },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl, gap: Spacing.xs },
  item: {},
  itemInner: { flexDirection: "row", alignItems: "center", padding: Spacing.md, gap: Spacing.sm },
  itemLeft: { width: 100, gap: 1 },
  hanzi: { ...Typography.h3, color: Colors.textPrimary },
  pinyin: { ...Typography.caption, color: Colors.primary, fontStyle: "italic" },
  itemRight: { flex: 1 },
  meaning: { ...Typography.body, color: Colors.textPrimary },
  wordClass: { ...Typography.caption, color: Colors.textLight, marginTop: 1 },
  empty: { ...Typography.body, color: Colors.textSecondary, textAlign: "center", marginTop: Spacing.xxl },
});
