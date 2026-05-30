import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../constants/theme";
import { Realm } from "../../story/realms";

interface RealmBadgeProps {
  realm: Realm;
  isCurrent?: boolean;
  isUnlocked?: boolean;
  size?: "sm" | "md" | "lg";
  xp?: number;
}

export default function RealmBadge({ realm, isCurrent, isUnlocked = false, size = "md", xp }: RealmBadgeProps) {
  const isMd = size === "md";
  const isSm = size === "sm";
  const badgeSize = isSm ? 80 : isMd ? 100 : 130;
  const iconSize = isSm ? 16 : isMd ? 20 : 26;
  const labelSize = isSm ? 10 : isMd ? 11 : 12;

  return (
    <View style={[styles.wrapper, { width: badgeSize + 16 }]}>
      {/* Outer glow for current */}
      {isCurrent && (
        <View
          style={[
            styles.glowRing,
            {
              width: badgeSize + 12,
              height: badgeSize + 12,
              borderRadius: (badgeSize + 12) / 2,
              borderColor: realm.color,
            },
          ]}
        />
      )}

      <LinearGradient
        colors={
          isUnlocked || isCurrent
            ? [realm.color, realm.color + "CC"]
            : [Colors.borderLight, Colors.disabled]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.badge,
          {
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize / 2,
            opacity: isUnlocked || isCurrent ? 1 : 0.5,
          },
        ]}
      >
        {/* Tier icon */}
        <Text style={[styles.tierIcon, { fontSize: iconSize }]}>
          {isUnlocked || isCurrent ? "✦" : "✧"}
        </Text>
        {/* Realm name */}
        <Text
          style={[
            styles.realmName,
            {
              fontSize: labelSize,
              color: isUnlocked || isCurrent ? "#FFF" : Colors.textLight,
            },
          ]}
          numberOfLines={1}
        >
          {realm.name}
        </Text>
        {/* HSK level */}
        <View
          style={[
            styles.hskTag,
            {
              backgroundColor: isUnlocked || isCurrent ? "rgba(255,255,255,0.2)" : "transparent",
            },
          ]}
        >
          <Text style={[styles.hskText, { fontSize: labelSize - 2 }]}>
            HSK {realm.hsk}
          </Text>
        </View>
      </LinearGradient>

      {/* XP display */}
      {xp !== undefined && isCurrent && (
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>{xp} XP</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    position: "relative",
  },
  glowRing: {
    position: "absolute",
    top: -6,
    left: -6,
    borderWidth: 2,
    opacity: 0.6,
  },
  badge: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    ...Shadows.md,
  },
  tierIcon: {
    color: "#FFF",
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  realmName: {
    fontWeight: "700",
    textAlign: "center",
  },
  hskTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  hskText: {
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
  },
  xpBadge: {
    position: "absolute",
    bottom: -12,
    backgroundColor: Colors.cultivation,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  xpText: {
    ...Typography.label,
    color: "#FFF",
    fontSize: 9,
  },
});
