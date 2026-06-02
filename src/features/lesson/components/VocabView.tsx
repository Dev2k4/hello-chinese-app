import { ScrollView, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../../constants/theme";
import { Button, StaggerList, IonIcon } from "../../../components/common";
import { Flashcard } from "../../../components/lesson";
import { ContentVocabulary } from "../../../types/content.types";

interface VocabViewProps {
  vocab: ContentVocabulary[];
  flippedCards: Record<string, boolean>;
  onToggleFlip: (id: string) => void;
  onFinish: () => void;
}

export default function VocabView({
  vocab,
  flippedCards,
  onToggleFlip,
  onFinish,
}: VocabViewProps) {
  return (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
    >
      <StaggerList baseDelay={50} staggerMs={60}>
        {vocab.map((v) => (
          <Flashcard
            key={v.id}
            hanzi={v.hanzi}
            pinyin={v.pinyin}
            meaning={v.meaning}
            showAnswer={flippedCards[v.id] || false}
            onFlip={() => onToggleFlip(v.id)}
          />
        ))}
      </StaggerList>
      {vocab.length > 0 && (
        <Button
          title="Đã học xong từ vựng"
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
});
