import { Colors } from "../constants/theme";

export interface RealmTier {
  id: number;
  name: string;
  nameCn: string;
  description: string;
  requiredLessons: number;
  requiredWords: number;
  bossName: string;
}

export interface Realm {
  id: number;
  name: string;
  nameCn: string;
  nameFull: string;
  hsk: number;
  description: string;
  longDescription: string;
  color: string;
  glowColor: string;
  element: string;
  beastName: string;
  requiredXp: number;
  totalWords: number;
  totalGrammar: number;
  totalLessons: number;
  tiers: RealmTier[];
  unlockCharacterId: string;
  storyBeat: string;
  rivalTaunt: string;
  masterComment: string;
}

const TIER_NAMES: { name: string; nameCn: string }[] = [
  { name: "Sơ Nhập", nameCn: "初入" },
  { name: "Hạ Cấp", nameCn: "下级" },
  { name: "Trung Cấp", nameCn: "中级" },
  { name: "Thượng Cấp", nameCn: "上级" },
  { name: "Tinh Thâm", nameCn: "精深" },
  { name: "Tiểu Thành", nameCn: "小成" },
  { name: "Đại Thành", nameCn: "大成" },
  { name: "Viên Mãn", nameCn: "圆满" },
  { name: "Đột Phá", nameCn: "突破" },
];

function generateTiers(
  realmId: number, realmName: string, realmNameCn: string,
  totalLessons: number, totalWords: number
): RealmTier[] {
  const lt = Math.max(1, Math.round(totalLessons / 9));
  const wt = Math.round(totalWords / 9);
  return Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `${realmName} ${TIER_NAMES[i].name}`,
    nameCn: `${realmNameCn}·${TIER_NAMES[i].nameCn}`,
    description: `Tầng ${realmId}-${i + 1}: ${TIER_NAMES[i].name} — vượt qua để lên tầng tiếp.`,
    requiredLessons: i === 8 ? totalLessons - lt * 8 : lt,
    requiredWords: i === 8 ? totalWords - wt * 8 : wt,
    bossName: `Quan Chủ Tầng ${realmId}-${i + 1}`,
  }));
}

export const REALMS: Realm[] = [
  {
    id: 1,
    name: "Phàm Nhân",
    nameCn: "凡人",
    nameFull: "Phàm Nhân Cảnh",
    hsk: 1,
    description: "Người thường, chưa biết gì về tu luyện. Linh căn tạp phẩm, bị khinh thường.",
    longDescription: "Kiếp trước ngươi là đệ tử thân truyền của Hạo Nhiên Tổ Sư, hy sinh khi chống lại Ma Tôn. Trọng sinh về kiếp này, ngươi mất hết ký ức và tu vi.",
    color: Colors.textLight,
    glowColor: "rgba(160,146,131,0.2)",
    element: "Thổ",
    beastName: "Chuột Cống",
    requiredXp: 0,
    totalWords: 500,
    totalGrammar: 70,
    totalLessons: 11,
    tiers: generateTiers(1, "Phàm Nhân", "凡人", 11, 500),
    unlockCharacterId: "dong_tu",
    storyBeat: "Ngươi — ngay cả một chữ 'người' cũng không biết viết, còn dám đến Hạo Nhiên Tông?",
    rivalTaunt: "Hahaha! Ngươi vẫn học mấy chữ trẻ con? Ta đã ở tầng 3 Luyện Khí rồi!",
    masterComment: "Hừ, tưởng gì, cũng chỉ biết vài chữ cơ bản.",
  },
  {
    id: 2,
    name: "Luyện Khí",
    nameCn: "炼气",
    nameFull: "Luyện Khí Cảnh",
    hsk: 2,
    description: "Cảm nhận linh khí, đủ để tự giới thiệu và hỏi đường cơ bản.",
    longDescription: "Sau những ngày đầu vật lộn với chữ nghĩa, ngươi bắt đầu cảm nhận 'linh khí' của ngôn ngữ. Đồng Tử bắt đầu nhìn ngươi khác.",
    color: Colors.wood,
    glowColor: "rgba(46,125,50,0.2)",
    element: "Mộc",
    beastName: "Yêu Thú Cấp 1",
    requiredXp: 500,
    totalWords: 772,
    totalGrammar: 78,
    totalLessons: 16,
    tiers: generateTiers(2, "Luyện Khí", "炼气", 16, 772),
    unlockCharacterId: "luc_ti",
    storyBeat: "Ồ? Còn biết vài chữ. Có lẽ không đến nỗi vô dụng.",
    rivalTaunt: "Mới lên Luyện Khí? Ta sắp Trúc Cơ rồi, đồ chậm!",
    masterComment: "Có chút tiến bộ. Đừng vội mừng.",
  },
  {
    id: 3,
    name: "Trúc Cơ",
    nameCn: "筑基",
    nameFull: "Trúc Cơ Cảnh",
    hsk: 3,
    description: "Nền móng đã vững. Giao tiếp hàng ngày trôi chảy, mua đồ, gọi món.",
    longDescription: "Nền móng đã vững. Lục Tỷ mỉm cười. Lão Phu Tử bắt đầu để ý — dù vẫn khinh thường.",
    color: Colors.water,
    glowColor: "rgba(2,136,209,0.2)",
    element: "Thủy",
    beastName: "Yêu Thú Cấp 2",
    requiredXp: 1200,
    totalWords: 973,
    totalGrammar: 96,
    totalLessons: 20,
    tiers: generateTiers(3, "Trúc Cơ", "筑基", 20, 973),
    unlockCharacterId: "lao_phu_tu",
    storyBeat: "Hừ! Mới biết chút da lông đã vội đến Tàng Kinh Các?",
    rivalTaunt: "Cái gì?! Ngươi Trúc Cơ rồi? Chỉ là may mắn!",
    masterComment: "Trúc Cơ ư? Tạm được.",
  },
  {
    id: 4,
    name: "Kết Đan",
    nameCn: "结丹",
    nameFull: "Kết Đan Cảnh",
    hsk: 4,
    description: "Kết tinh linh lực. Đọc báo ngắn, xem tin tức đơn giản.",
    longDescription: "Viên đan đầu tiên hình thành. Lão Phu Tử gật gù. Tu La Chiến Tướng cười thách thức.",
    color: Colors.fire,
    glowColor: "rgba(220,38,38,0.2)",
    element: "Hỏa",
    beastName: "Yêu Thú Cấp 3",
    requiredXp: 2200,
    totalWords: 1000,
    totalGrammar: 95,
    totalLessons: 20,
    tiers: generateTiers(4, "Kết Đan", "结丹", 20, 1000),
    unlockCharacterId: "tu_la",
    storyBeat: "Chà! Không ngờ ngươi đến được đây. Để ta xem thực lực!",
    rivalTaunt: "Kết Đan?! Chắc ngươi gian lận!",
    masterComment: "Kết Đan rồi? Không tệ cho tên phàm nhân.",
  },
  {
    id: 5,
    name: "Nguyên Anh",
    nameCn: "元婴",
    nameFull: "Nguyên Anh Cảnh",
    hsk: 5,
    description: "Anh nhi xuất khiếu. Xem phim Trung Quốc không sub hiểu 80%.",
    longDescription: "Linh anh đã thành hình. Bạch Y Tiên Tử lần đầu xuất hiện, nói những lời khó hiểu về kiếp trước.",
    color: Colors.cultivation,
    glowColor: "rgba(124,58,237,0.2)",
    element: "Lôi",
    beastName: "Yêu Thú Cấp 4",
    requiredXp: 3500,
    totalWords: 1071,
    totalGrammar: 70,
    totalLessons: 22,
    tiers: generateTiers(5, "Nguyên Anh", "元婴", 22, 1071),
    unlockCharacterId: "tien_tu",
    storyBeat: "Kiếp trước ngươi cũng từng đứng đây. Ký ức sắp hồi phục rồi.",
    rivalTaunt: "Ngươi... đã vượt qua ta? Không thể!",
    masterComment: "Nguyên Anh... mắt ngươi có tia quen thuộc.",
  },
  {
    id: 6,
    name: "Hóa Thần",
    nameCn: "化神",
    nameFull: "Hóa Thần Cảnh",
    hsk: 6,
    description: "Thần thức bao phủ. Đọc sách báo, tài liệu chuyên ngành trôi chảy.",
    longDescription: "Thần thức bao phủ Tàng Kinh Các. Bạch Y Tiên Tử tiết lộ: kiếp trước ngươi là đệ tử yêu quý nhất của Lão Tổ.",
    color: "#D4A843",
    glowColor: "rgba(212,168,67,0.2)",
    element: "Kim",
    beastName: "Thượng Cổ Yêu Thú",
    requiredXp: 5000,
    totalWords: 1140,
    totalGrammar: 50,
    totalLessons: 23,
    tiers: generateTiers(6, "Hóa Thần", "化神", 23, 1140),
    unlockCharacterId: "lao_to",
    storyBeat: "Ngươi... là người kiếp trước đã từng... Hãy đến gặp ta!",
    rivalTaunt: "Sư huynh! Ta phục ngươi rồi!",
    masterComment: "Hóa Thần rồi. Ký ức chắc đã hồi phục phần nào.",
  },
  {
    id: 7,
    name: "Đại Thừa",
    nameCn: "大乘",
    nameFull: "Đại Thừa Cảnh",
    hsk: 7,
    description: "Đỉnh cao. Tiếng Trung như gió — cổ văn, thành ngữ, thi từ đều thông.",
    longDescription: "Ngươi đã lên đến đỉnh Tàng Kinh Các. Lão Tổ mỉm cười: 'Tất cả đều là bài kiểm tra. Ngươi là hậu duệ của Ngũ Hành Tiên Tổ — và Hạo Nhiên Tông là di sản của tổ tiên ngươi.'",
    color: "#5B21B6",
    glowColor: "rgba(91,33,182,0.4)",
    element: "Toàn bộ Ngũ Hành",
    beastName: "Ma Tôn Chân Thân",
    requiredXp: 7000,
    totalWords: 5631,
    totalGrammar: 134,
    totalLessons: 113,
    tiers: generateTiers(7, "Đại Thừa", "大乘", 113, 5631),
    unlockCharacterId: "lao_to",
    storyBeat: "Cuối cùng ngươi đã đến. Hãy để ta kể sự thật về dòng máu của ngươi...",
    rivalTaunt: "TA LÀ MA TÔN! Ngươi sẽ chết dưới tay ta lần nữa!",
    masterComment: "Chúc mừng, Hạo Nhiên Chân Nhân. Ngươi đã trở về.",
  },
];

export function getRealmForHsk(hsk: number): Realm | undefined {
  return REALMS.find((r) => r.hsk === hsk);
}

export function getRealmByXp(xp: number): { realm: Realm; progress: number } {
  let currentRealm = REALMS[0];
  for (const r of REALMS) {
    if (xp >= r.requiredXp) currentRealm = r;
    else break;
  }
  const i = REALMS.indexOf(currentRealm);
  const next = REALMS[i + 1];
  if (!next) return { realm: currentRealm, progress: 1 };
  return {
    realm: currentRealm,
    progress: Math.min(1, Math.max(0, (xp - currentRealm.requiredXp) / (next.requiredXp - currentRealm.requiredXp))),
  };
}

export function getTierProgress(realm: Realm, completedLessons: number): {
  currentTier: RealmTier;
  tierProgress: number;
  completedTiers: number;
} {
  let acc = 0;
  let ct = 0;
  let cur = realm.tiers[0];
  for (const t of realm.tiers) {
    acc += t.requiredLessons;
    if (completedLessons >= acc) { ct++; cur = t; }
    else { cur = t; break; }
  }
  const done = completedLessons - (acc - cur.requiredLessons);
  return { currentTier: cur, tierProgress: Math.min(1, Math.max(0, done / cur.requiredLessons)), completedTiers: ct };
}
