import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Spacing, Typography, BorderRadius } from "../../constants/theme";
import { getCharacterForRealm } from "../../story/characters";
import { REALMS } from "../../story/realms";
import CharacterAvatar from "./CharacterAvatar";

interface TierContextBarProps {
  realmId: number;
  currentTier: number;
  completedTiers: number[];
  onPress?: () => void;
  compact?: boolean;
}

export default function TierContextBar({ realmId, currentTier, completedTiers, onPress, compact }: TierContextBarProps) {
  const realm = REALMS.find((r) => r.id === realmId);
  const character = getCharacterForRealm(realmId);
  if (!realm) return null;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.container, compact && styles.containerCompact]}>
      {/* Avatar */}
      {character && !compact && <CharacterAvatar character={character} size={28} showGlow={false} />}

      {/* Realm info */}
      <View style={styles.info}>
        <Text style={[styles.realmName, compact && { fontSize: 11 }]}>
          {realm.nameCn} · {realm.name}
        </Text>
        {!compact && <Text style={styles.hskLabel}>HSK {realm.hsk}</Text>}
      </View>

      {/* Tier dots */}
      <View style={styles.tierStrip}>
        {Array.from({ length: 9 }, (_, i) => {
          const tierNum = i + 1;
          const isDone = completedTiers.includes(tierNum);
          const isCurrent = tierNum === currentTier;
          return (
            <View
              key={tierNum}
              style={[
                styles.tierDot,
                {
                  backgroundColor: isDone ? realm.color : isCurrent ? Colors.secondary : Colors.border,
                  width: compact ? 16 : 24,
                },
              ]}
            >
              <Text style={[styles.tierDotText, { color: isDone || isCurrent ? "#FFF" : Colors.textLight }]}>
                {tierNum}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Tier label */}
      <Text style={[styles.tierLabel, compact && { fontSize: 9 }]}>
        Tầng {currentTier}/9
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  containerCompact: {
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
    gap: 6,
  },
  info: {
    marginRight: Spacing.xs,
  },
  realmName: {
    ...Typography.bodyBold,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  hskLabel: {
    ...Typography.label,
    fontSize: 9,
    color: Colors.textSecondary,
  },
  tierStrip: {
    flexDirection: "row",
    gap: 3,
    flex: 1,
  },
  tierDot: {
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  tierDotText: {
    fontSize: 8,
    fontWeight: "700",
  },
  tierLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: "600",
    minWidth: 40,
    textAlign: "right",
  },
});
