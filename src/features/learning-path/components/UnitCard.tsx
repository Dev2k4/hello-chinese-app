import { View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { Card, MaterialIcon } from "../../../components/common";
import { LessonItem } from "./LessonItem";
import { ContentLessonMeta } from "../../../types/content.types";

interface UnitCardProps {
  unit: {
    id: string;
    title: string;
    description: string;
    lessons: ContentLessonMeta[];
  };
  index: number;
  unitProgress: number;
  lessonProgress: Record<string, any>;
  onLessonPress: (lessonId: string) => void;
}

export function UnitCard({
  unit,
  index,
  unitProgress,
  lessonProgress,
  onLessonPress,
}: UnitCardProps) {
  const lessonList = unit.lessons || [];

  return (
    <Card style={styles.unitCard}>
      <View style={styles.unitHeader}>
        <View style={styles.unitBadge}>
          <Text style={styles.unitBadgeText}>{index + 1}</Text>
        </View>
        <View style={styles.unitInfo}>
          <Text style={styles.unitTitle}>{unit.title}</Text>
          <Text style={styles.unitDesc}>{unit.description}</Text>
        </View>
        <Text style={styles.unitProgress}>
          {unitProgress}/{lessonList.length}
        </Text>
      </View>

      <View style={styles.lessonList}>
        {lessonList.map((lesson) => {
          const isDone = !!lessonProgress[lesson.id];
          return (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isDone={isDone}
              onPress={() => onLessonPress(lesson.id)}
            />
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  unitCard: { gap: Spacing.md },
  unitHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  unitBadge: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  unitBadgeText: { ...Typography.bodyBold, color: "#fff" },
  unitInfo: { flex: 1 },
  unitTitle: { ...Typography.h3 },
  unitDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  unitProgress: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  lessonList: { gap: Spacing.xs },
});
