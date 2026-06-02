import { View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { Card, MaterialIcon } from "../../../components/common";
import { ContentLessonMeta } from "../../../types/content.types";

interface LessonItemProps {
  lesson: ContentLessonMeta;
  isDone: boolean;
  onPress: () => void;
}

export function LessonItem({ lesson, isDone, onPress }: LessonItemProps) {
  return (
    <Card
      onPress={onPress}
      style={[styles.lessonItem, isDone ? styles.lessonItemDone : undefined]}
      padded={false}
    >
      <View style={styles.lessonItemContent}>
        <View
          style={[
            styles.lessonIconWrap,
            {
              backgroundColor: isDone
                ? Colors.success + "20"
                : Colors.borderLight,
            },
          ]}
        >
          {isDone ? (
            <MaterialIcon
              name="check-circle"
              size="sm"
              color={Colors.success}
            />
          ) : (
            <MaterialIcon
              name="radio-button-unchecked"
              size="sm"
              color={Colors.textLight}
            />
          )}
        </View>
        <View style={styles.lessonInfo}>
          <Text
            style={[
              styles.lessonTitle,
              isDone ? styles.lessonTitleDone : undefined,
            ]}
          >
            {lesson.title}
          </Text>
          <Text style={styles.lessonDesc}>{lesson.description}</Text>
        </View>
        <MaterialIcon
          name="chevron-right"
          size="sm"
          color={Colors.textLight}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  lessonItem: { borderRadius: BorderRadius.md, overflow: "hidden" },
  lessonItemDone: { opacity: 0.65 },
  lessonItemContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  lessonIconWrap: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonInfo: { flex: 1 },
  lessonTitle: { ...Typography.body, fontWeight: "600" },
  lessonTitleDone: {
    textDecorationLine: "line-through",
    color: Colors.textSecondary,
  },
  lessonDesc: { ...Typography.caption, color: Colors.textLight },
});
