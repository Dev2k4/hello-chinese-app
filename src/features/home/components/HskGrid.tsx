import { View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { Card, ProgressBar, FadeIn, MaterialIcon } from "../../../components/common";
import { HskCardData } from "../types";

interface HskGridProps {
  cards: HskCardData[];
  currentLevel: number;
  onCardPress: (level: number, track: string) => void;
  track: string;
}

export default function HskGrid({
  cards,
  currentLevel,
  onCardPress,
  track,
}: HskGridProps) {
  return (
    <>
      <FadeIn delay={250}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Các cấp độ HSK</Text>
        </View>
      </FadeIn>
      <FadeIn delay={300}>
        <View style={styles.hskGrid}>
          {cards.map((hsk) => {
            const isActive = hsk.level === currentLevel;
            return (
              <Card
                key={hsk.id}
                onPress={() => onCardPress(hsk.level, track)}
                style={styles.hskCard}
                padded={false}
              >
                <View
                  style={[
                    styles.hskCardInner,
                    {
                      borderLeftColor: isActive
                        ? Colors.primary
                        : Colors.border,
                    },
                  ]}
                >
                  <View style={styles.hskTop}>
                    <View
                      style={[
                        styles.hskBadge,
                        {
                          backgroundColor: isActive
                            ? Colors.primary
                            : Colors.surfaceAlt,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.hskBadgeText,
                          {
                            color: isActive ? "#fff" : Colors.textSecondary,
                          },
                        ]}
                      >
                        HSK {hsk.level}
                      </Text>
                    </View>
                    <View style={styles.hskInfo}>
                      <ProgressBar
                        progress={hsk.progress.overallPercent / 100}
                        color={isActive ? Colors.primary : Colors.border}
                        height={4}
                      />
                    </View>
                  </View>
                  <Text style={styles.hskPercent}>
                    {Math.round(hsk.progress.overallPercent)}%
                  </Text>
                </View>
              </Card>
            );
          })}
        </View>
      </FadeIn>
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
  hskGrid: { gap: Spacing.xs },
  hskCard: { borderRadius: BorderRadius.md, padding: 0 },
  hskCardInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderLeftWidth: 4,
    borderRadius: BorderRadius.md,
  },
  hskTop: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Spacing.sm,
  },
  hskBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
    minWidth: 60,
    alignItems: "center",
  },
  hskBadgeText: { ...Typography.caption, fontWeight: "700", fontSize: 12 },
  hskInfo: { flex: 1, marginLeft: Spacing.sm },
  hskPercent: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
    fontWeight: "700",
    minWidth: 36,
    textAlign: "right",
  },
});
