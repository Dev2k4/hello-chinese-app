import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from "../../../constants/theme";
import { MaterialIcon } from "../../../components/common";
import { LessonTab } from "../types";

const tabConfig: Record<
  LessonTab,
  { label: string; icon: React.ReactNode }
> = {
  vocab: {
    label: "Từ vựng",
    icon: <MaterialIcon name="menu-book" size="sm" color={Colors.primary} />,
  },
  grammar: {
    label: "Ngữ pháp",
    icon: <MaterialIcon name="article" size="sm" color={Colors.info} />,
  },
  practice: {
    label: "Luyện tập",
    icon: <MaterialIcon name="quiz" size="sm" color={Colors.accent} />,
  },
};

interface LessonTabBarProps {
  tabs: LessonTab[];
  currentTab: LessonTab;
  onTabPress: (tab: LessonTab) => void;
  canAccess: (tab: LessonTab) => boolean;
}

export default function LessonTabBar({
  tabs,
  currentTab,
  onTabPress,
  canAccess,
}: LessonTabBarProps) {
  return (
    <LinearGradient
      colors={[Colors.primaryDark, Colors.primary, Colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.tabBar}
    >
      {tabs.map((tab) => {
        const accessible = canAccess(tab);
        const isActive = currentTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => accessible && onTabPress(tab)}
            disabled={!accessible}
          >
            {tabConfig[tab].icon}
            <Text
              style={[
                styles.tabText,
                isActive && styles.tabTextActive,
                !accessible && styles.tabDisabled,
              ]}
            >
              {tabConfig[tab].label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  tabActive: { backgroundColor: "rgba(255,255,255,0.35)" },
  tabText: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "600",
  },
  tabTextActive: { color: "#fff" },
  tabDisabled: { opacity: 0.4 },
});
