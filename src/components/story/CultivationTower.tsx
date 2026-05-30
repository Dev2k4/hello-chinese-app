import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors, Spacing, Typography, BorderRadius, Shadows } from "../../constants/theme";
import { Realm, REALMS, getTierProgress } from "../../story/realms";
import RealmBadge from "./RealmBadge";

interface CultivationTowerProps {
  currentRealm: Realm;
  currentXp: number;
  completedLessons?: number;
  onRealmPress?: (realm: Realm) => void;
}

export default function CultivationTower({ currentRealm, currentXp, completedLessons = 0, onRealmPress }: CultivationTowerProps) {
  const [expandedRealm, setExpandedRealm] = useState<number | null>(currentRealm.id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🏯</Text>
        <Text style={styles.headerTitle}>Tàng Kinh Các</Text>
        <Text style={styles.headerSub}>Hạo Nhiên Tông · Cửu Tầng Cửu Ải</Text>
        <Text style={styles.headerDetail}>9 Cảnh Giới × 9 Tầng = 81 Ải</Text>
      </View>

      <ScrollView
        style={styles.towerScroll}
        contentContainerStyle={styles.towerContent}
        showsVerticalScrollIndicator={false}
      >
        {[...REALMS].reverse().map((realm, index) => {
          const isUnlocked = currentXp >= realm.requiredXp;
          const isCurrent = realm.id === currentRealm.id;
          const isLocked = !isUnlocked && !isCurrent;
          const isExpanded = expandedRealm === realm.id;
          const tierInfo = isCurrent ? getTierProgress(realm, completedLessons) : null;

          return (
            <View key={realm.id}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setExpandedRealm(expandedRealm === realm.id ? null : realm.id);
                  onRealmPress?.(realm);
                }}
                style={styles.floorRow}
              >
                {index > 0 && (
                  <View style={[styles.connector, { backgroundColor: isUnlocked ? realm.color : Colors.border }]} />
                )}

                <View style={[styles.floorContent, isCurrent && styles.floorCurrent]}>
                  <View style={styles.floorNumCol}>
                    <Text style={[styles.floorNum, { color: isUnlocked ? realm.color : Colors.textLight }]}>
                      {REALMS.length - index}
                    </Text>
                    <Text style={styles.floorLabel}>Tầng</Text>
                  </View>

                  <View style={styles.badgeCol}>
                    <RealmBadge realm={realm} isCurrent={isCurrent} isUnlocked={isUnlocked} size={isCurrent ? "lg" : "sm"} xp={isCurrent ? currentXp : undefined} />
                  </View>

                  <View style={styles.infoCol}>
                    <View style={styles.infoNameRow}>
                      <Text style={[styles.realmName, { color: isUnlocked ? realm.color : Colors.textLight }]}>
                        {realm.nameCn}
                      </Text>
                      <Text style={styles.realmNameLatin}>{realm.name}</Text>
                    </View>
                    <Text style={styles.hskLabel}>HSK {realm.hsk} · {realm.element} thuộc tính</Text>
                    <Text style={styles.realmDesc} numberOfLines={1}>
                      {realm.totalWords} từ · {realm.totalGrammar} ngữ pháp · {realm.totalLessons} bài
                    </Text>
                    {isCurrent && (
                      <View style={[styles.tierStrip, { borderColor: realm.color }]}>
                        {realm.tiers.map((tier, ti) => (
                          <View
                            key={tier.id}
                            style={[
                              styles.tierDot,
                              {
                                backgroundColor: ti < (tierInfo?.completedTiers ?? 0)
                                  ? realm.color
                                  : ti === (tierInfo?.completedTiers ?? 0)
                                  ? Colors.secondary
                                  : Colors.border,
                              },
                            ]}
                          />
                        ))}
                      </View>
                    )}
                    {isLocked && (
                      <View style={styles.lockTag}>
                        <Text style={styles.lockTagText}>🔒 {realm.requiredXp} XP</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.expandIcon}>{isExpanded ? "▲" : "▼"}</Text>
                </View>
              </TouchableOpacity>

              {/* Expanded: 9 Tiers detail */}
              {isExpanded && (
                <View style={[styles.tierDetail, { borderLeftColor: realm.color }]}>
                  <View style={styles.tierGrid}>
                    {realm.tiers.map((tier, ti) => {
                      const isCompleted = isCurrent && ti < (tierInfo?.completedTiers ?? 0);
                      const isActiveTier = isCurrent && ti === (tierInfo?.completedTiers ?? 0);
                      return (
                        <View key={tier.id} style={[styles.tierItem, isActiveTier && styles.tierItemActive]}>
                          <View style={[styles.tierNum, { backgroundColor: isCompleted ? realm.color : isActiveTier ? Colors.secondary : Colors.borderLight }]}>
                            <Text style={[styles.tierNumText, { color: isCompleted || isActiveTier ? "#FFF" : Colors.textLight }]}>
                              {tier.id}
                            </Text>
                          </View>
                          <View style={styles.tierInfo}>
                            <Text style={[styles.tierName, isActiveTier && { color: Colors.secondary, fontWeight: "700" }]}>
                              {tier.nameCn}
                            </Text>
                            <Text style={styles.tierDesc}>{tier.bossName}</Text>
                            <Text style={styles.tierStats}>
                              {tier.requiredWords} từ · {tier.requiredLessons} bài
                            </Text>
                          </View>
                          {isCompleted && <Text style={styles.tierCheck}>✓</Text>}
                          {isActiveTier && <Text style={styles.tierActive}>⚔️</Text>}
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.groundFloor}>
          <View style={styles.groundLine} />
          <Text style={styles.groundText}>── Chân tháp · Phàm nhân bắt đầu ──</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: "center", paddingVertical: Spacing.sm, gap: 1 },
  headerIcon: { fontSize: 28 },
  headerTitle: { ...Typography.h2, color: Colors.secondary, fontWeight: "800", letterSpacing: 2 },
  headerSub: { ...Typography.caption, color: Colors.textSecondary },
  headerDetail: { ...Typography.label, color: Colors.textLight, fontSize: 9 },
  towerScroll: { flex: 1 },
  towerContent: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxl },
  floorRow: { alignItems: "center", marginBottom: 0 },
  connector: { width: 2, height: 16, marginBottom: 4 },
  floorContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: 4,
  },
  floorCurrent: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    ...Shadows.sm,
  },
  floorNumCol: { width: 32, alignItems: "center" },
  floorNum: { ...Typography.h3, fontWeight: "800", fontSize: 18 },
  floorLabel: { ...Typography.label, color: Colors.textLight, fontSize: 8 },
  badgeCol: { width: 90, alignItems: "center" },
  infoCol: { flex: 1, paddingLeft: Spacing.sm, gap: 1 },
  infoNameRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  realmName: { ...Typography.bodyBold, fontSize: 15 },
  realmNameLatin: { ...Typography.caption, color: Colors.textSecondary },
  hskLabel: { ...Typography.caption, color: Colors.textLight, fontSize: 10 },
  realmDesc: { ...Typography.caption, color: Colors.textLight, fontSize: 9, lineHeight: 14 },
  tierStrip: { flexDirection: "row", gap: 3, marginTop: 2, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.full, padding: 3 },
  tierDot: { width: 8, height: 8, borderRadius: 4 },
  lockTag: { alignSelf: "flex-start", backgroundColor: Colors.borderLight, paddingHorizontal: 6, paddingVertical: 1, borderRadius: BorderRadius.sm, marginTop: 2 },
  lockTagText: { ...Typography.label, color: Colors.textLight, fontSize: 8 },
  expandIcon: { ...Typography.caption, color: Colors.textLight, marginLeft: 4 },
  tierDetail: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.border,
    marginLeft: 16,
    paddingLeft: Spacing.md,
    paddingVertical: Spacing.xs,
    marginBottom: 4,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.sm,
  },
  tierGrid: { gap: 2 },
  tierItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: 3,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  tierItemActive: {
    backgroundColor: Colors.secondary + "15",
  },
  tierNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  tierNumText: { ...Typography.label, fontSize: 10 },
  tierInfo: { flex: 1 },
  tierName: { ...Typography.bodyBold, fontSize: 12, color: Colors.textPrimary },
  tierDesc: { ...Typography.caption, fontSize: 9, color: Colors.textSecondary },
  tierStats: { ...Typography.label, fontSize: 8, color: Colors.textLight },
  tierCheck: { fontSize: 14, color: Colors.success, fontWeight: "700" },
  tierActive: { fontSize: 14 },
  groundFloor: { alignItems: "center", marginTop: Spacing.sm },
  groundLine: { width: "80%", height: 1, backgroundColor: Colors.border, marginBottom: 4 },
  groundText: { ...Typography.caption, color: Colors.textLight },
});
