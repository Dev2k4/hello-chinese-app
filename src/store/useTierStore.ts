import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TIER_KEY = "@chinese4vn_tier_progress";

// ─── Map lesson → tier cho Realm 1 (Phàm Nhân, 11 bài) ───
// DB HSK 1 có 11 bài. Phân bố:
// Tier 1: bài 1,2 | 2: 3,4 | 3: 5 | 4: 6,7 | 5: 8 | 6: 9,10 | 7: 11 | 8: ôn | 9: tổng
export const REALM1_TIER_LESSONS: Record<number, string[]> = {
  1: ["hsk1_u1_l1", "hsk1_u1_l2"],
  2: ["hsk1_u2_l1", "hsk1_u2_l2"],
  3: ["hsk1_u3_l1"],
  4: ["hsk1_u3_l2", "hsk1_u4_l1"],
  5: ["hsk1_u5_l1"],
  6: ["hsk1_u5_l2", "hsk1_u6_l1"],
  7: [],  // reserved — bài 11 từ DB
  8: [],  // ôn tập tổng hợp (tất cả bài cũ)
  9: [],  // Đột Phá Cuối — tất cả
};

// Lesson IDs có thể khác giữa frontend data và DB.
// Dùng prefix "hsk1_u*" cho frontend data, DB lesson ID cần đồng bộ sau.

export interface TierState {
  currentRealm: number;       // cảnh giới (1-7)
  currentTier: number;        // tier hiện tại (1-9)
  completedTiers: number[];   // tier đã qua
  unlockedLessons: string[];  // lesson IDs đã mở
  xpInTier: number;           // XP tích trong tier hiện tại
  attempts: Record<string, number>; // { "realm-tier": count }

  // Actions
  _persist: () => void;
  hydrateTier: () => Promise<void>;
  completeLesson: (lessonId: string) => void;
  canStartBreakthrough: (realmId: number, tierId: number, completedLessonIds: string[]) => boolean;
  completeBreakthrough: (realmId: number, tierId: number, passed: boolean) => void;
  recordAttempt: (realmId: number, tierId: number) => void;
  getTierLessons: (realmId: number, tierId: number) => string[];
}

export const useTierStore = create<TierState>((set, get) => ({
  currentRealm: 1,
  currentTier: 1,
  completedTiers: [],
  unlockedLessons: ["hsk1_u1_l1", "hsk1_u1_l2"], // 2 bài đầu
  xpInTier: 0,
  attempts: {},

  hydrateTier: async () => {
    try {
      const raw = await AsyncStorage.getItem(TIER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        set({
          currentRealm: parsed.currentRealm ?? 1,
          currentTier: parsed.currentTier ?? 1,
          completedTiers: parsed.completedTiers ?? [],
          unlockedLessons: parsed.unlockedLessons ?? ["hsk1_u1_l1", "hsk1_u1_l2"],
          xpInTier: parsed.xpInTier ?? 0,
          attempts: parsed.attempts ?? {},
        });
      }
    } catch {}
  },

  _persist: () => {
    const { currentRealm, currentTier, completedTiers, unlockedLessons, xpInTier, attempts } = get();
    AsyncStorage.setItem(
      TIER_KEY,
      JSON.stringify({ currentRealm, currentTier, completedTiers, unlockedLessons, xpInTier, attempts })
    );
  },

  completeLesson: (lessonId) => {
    set((s) => {
      if (s.unlockedLessons.includes(lessonId)) return s;
      return { unlockedLessons: [...s.unlockedLessons, lessonId] };
    });
    get()._persist();
  },

  canStartBreakthrough: (realmId, tierId, completedLessonIds) => {
    if (realmId !== 1) return false;
    if (get().completedTiers.includes(tierId)) return false;
    const tierLessons = REALM1_TIER_LESSONS[tierId] ?? [];
    if (tierLessons.length === 0) {
      // Tier 7+ (DB lesson 11 hoặc ôn tập) — cần đủ bài trước
      const allPrev = Object.entries(REALM1_TIER_LESSONS)
        .filter(([k]) => Number(k) < tierId)
        .flatMap(([, v]) => v);
      return allPrev.every((id) => completedLessonIds.includes(id));
    }
    return tierLessons.every((id) => completedLessonIds.includes(id));
  },

  completeBreakthrough: (realmId, tierId, passed) => {
    if (!passed) {
      get()._persist();
      return;
    }
    set((s) => {
      const nextTier = tierId + 1;
      const newCompleted = [...new Set([...s.completedTiers, tierId])];

      // Unlock lessons cho tier tiếp theo
      const nextTierLessons = REALM1_TIER_LESSONS[nextTier] ?? [];
      const newUnlocked = [...s.unlockedLessons];
      for (const id of nextTierLessons) {
        if (!newUnlocked.includes(id)) newUnlocked.push(id);
      }

      return {
        currentTier: nextTier > 9 ? 9 : nextTier,
        completedTiers: newCompleted,
        unlockedLessons: newUnlocked,
        xpInTier: 0,
      };
    });
    get()._persist();
  },

  recordAttempt: (realmId, tierId) => {
    const key = `${realmId}-${tierId}`;
    set((s) => ({
      attempts: { ...s.attempts, [key]: (s.attempts[key] ?? 0) + 1 },
    }));
    get()._persist();
  },

  getTierLessons: (realmId, tierId) => {
    if (realmId === 1) return REALM1_TIER_LESSONS[tierId] ?? [];
    return [];
  },
}));

// Export để persist auto-save
const origCreate = useTierStore;
export { origCreate as useTierStoreRaw };
