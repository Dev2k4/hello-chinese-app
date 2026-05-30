import { Colors } from "../constants/theme";

export type CharacterId =
  | "player_male"
  | "player_female"
  | "dong_tu"
  | "luc_ti"
  | "lao_phu_tu"
  | "tu_la"
  | "tien_tu"
  | "huyens_anh"
  | "lien_thien"
  | "lao_to";

export type CharacterRole = "player" | "guardian" | "rival" | "final_boss";
export type CharacterGender = "male" | "female" | "other";
export type CharacterEmotion =
  | "normal" | "angry" | "happy" | "sad" | "surprised" | "smug"
  | "crying" | "shy" | "contempt";

export interface RealmGuardianInfo {
  realmId: number;
  title: string;
  greeting: string;
  farewell: string;
  secret: string;
}

export interface PlayerInfo {
  pastLifeName: string;
  pastLifeTitle: string;
  pastLifeSecret: string;
  nicknameMale: string;
  nicknameFemale: string;
  titleMale: string;
  titleFemale: string;
}

export interface Character {
  id: CharacterId;
  name: string;
  nameCn: string;
  title: string;
  role: CharacterRole;
  gender: CharacterGender;
  color: string;
  secondaryColor: string;
  emoji: string;
  element: string;
  description: string;
  backstory: string;
  catchphrases: string[];
  realmGuardian?: RealmGuardianInfo;
  playerInfo?: PlayerInfo;
}

export const PLAYER_CHARACTER: PlayerInfo = {
  pastLifeName: "Hạo Nhiên Chân Nhân",
  pastLifeTitle: "Đệ Nhất Thân Truyền — Cựu Đại Đệ Tử",
  pastLifeSecret: "Hy sinh khi chống Ma Tôn. Mỗi lần bứt phá cảnh giới, ký ức hồi phục dần. Sự thật: ngươi là hậu duệ của Ngũ Hành Tiên Tổ.",
  nicknameMale: "Tiểu Tử",
  nicknameFemale: "Tiểu Nữ Hài",
  titleMale: "tiểu tử nhà ngươi",
  titleFemale: "tiểu nha đầu nhà ngươi",
};

export const CHARACTERS: Record<CharacterId, Character> = {
  player_male: {
    id: "player_male", name: "Tiểu Tử", nameCn: "小子",
    title: "Trọng Sinh Giả", role: "player", gender: "male",
    color: Colors.primary, secondaryColor: Colors.secondary, emoji: "🧑‍🦰",
    element: "Toàn bộ Ngũ Hành",
    description: "Thanh niên mặc đạo bào rách, mắt sáng nhưng vẻ mặt ngơ ngác. Trong mắt luôn ánh tia kiên định.",
    backstory: "Kiếp trước là Hạo Nhiên Chân Nhân, hy sinh cứu môn phái. Trọng sinh mất hết ký ức.",
    catchphrases: ["Ta không nhớ gì cả.", "Dù kiếp nào ta cũng leo lên đỉnh!", "Ta sẽ chứng minh cho tất cả!"],
    playerInfo: PLAYER_CHARACTER,
  },
  player_female: {
    id: "player_female", name: "Tiểu Nữ Hài", nameCn: "小女娃",
    title: "Trọng Sinh Giả", role: "player", gender: "female",
    color: Colors.sister, secondaryColor: Colors.secondary, emoji: "👧",
    element: "Toàn bộ Ngũ Hành",
    description: "Thiếu nữ nhỏ nhắn mặc yếm hồng, tóc búi củ tỏi, mắt to tròn — yếu đuối nhưng ý chí sắt đá.",
    backstory: "Kiếp trước là Hạo Nhiên Chân Nhân, hy sinh cứu môn phái. Trọng sinh mất hết ký ức.",
    catchphrases: ["Chuyện gì đang xảy ra?", "Tuy là nữ nhưng ta không thua ai!", "Ta sẽ khiến các ngươi nhìn ta khác!"],
    playerInfo: PLAYER_CHARACTER,
  },

  /* Realm 1 — Phàm Nhân */
  dong_tu: {
    id: "dong_tu", name: "Đồng Tử", nameCn: "童子",
    title: "Tạp Dịch Đệ Tử — Tàng Kinh Các",
    role: "guardian", gender: "male",
    color: Colors.earth, secondaryColor: "#8D6E63", emoji: "🧹", element: "Thổ",
    description: "Đệ tử tạp dịch quét dọn. Mồm miệng chanh chua hay khinh người, nhưng trong lòng tốt.",
    backstory: "Đệ tử lâu năm nhất tầng trệt, chứng kiến bao kẻ đến rồi đi. Ghét nhất loại bỏ cuộc.",
    catchphrases: [
      "Cầm cuốn sách này mà học!",
      "Mấy chữ cơ bản cũng sai? Ta còn làm được!",
      "Cố lên, đừng như mấy kẻ bỏ cuộc trước đó.",
    ],
    realmGuardian: {
      realmId: 1, title: "Thủ Kinh Đồng Tử — Tầng 1",
      greeting: "Người mới à? Lại đây ta chỉ cho mấy chữ cơ bản!",
      farewell: "Ồ, nhanh thế? Lên tầng 2 gặp Lục Tỷ đi.",
      secret: "Đồng Tử là đệ tử bí mật của Lão Tổ, cải trang thử lòng người mới.",
    },
  },

  /* Realm 2 — Luyện Khí */
  luc_ti: {
    id: "luc_ti", name: "Lục Tỷ", nameCn: "六姐",
    title: "Nội Môn Đệ Tử — Luyện Khí Kỳ",
    role: "guardian", gender: "female",
    color: Colors.sister, secondaryColor: "#BE185D", emoji: "🌸", element: "Mộc",
    description: "Sư tỷ xinh đẹp, bề ngoài lạnh lùng nhưng trong lòng tốt. Hay giúp đỡ đệ tử mới.",
    backstory: "Vào Hạo Nhiên Tông từ nhỏ, từng bị khinh thường vì xuất thân hèn kém.",
    catchphrases: [
      "Lại đệ tử mới? Thôi được, ta dạy ngươi.",
      "Cái này không biết à? Để ta chỉ.",
      "Học tử tế, đừng làm ta mất mặt.",
    ],
    realmGuardian: {
      realmId: 2, title: "Nội Môn Đại Sư Tỷ — Tầng 2",
      greeting: "Lại kẻ từ dưới lên? Đọc cho ta mấy từ này.",
      farewell: "Không tệ. Lên tầng 3 gặp Lão Phu Tử — không chịu trách nhiệm nếu bị mắng đâu.",
      secret: "Lục Tỷ có tình cảm thầm lặng với người chơi nhưng không dám thổ lộ.",
    },
  },

  /* Realm 3 — Trúc Cơ */
  lao_phu_tu: {
    id: "lao_phu_tu", name: "Lão Phu Tử", nameCn: "老夫子",
    title: "Tàng Kinh Các Chủ — Bát Phẩm Học Sĩ",
    role: "guardian", gender: "male",
    color: Colors.scholar, secondaryColor: "#1E3A5F", emoji: "📜", element: "Thủy",
    description: "Lão già râu tóc bạc, tay cầm thước sắt. Khó tính, ghét nhất người học dốt mà lười.",
    backstory: "Từng là Trạng Nguyên triều Minh, sau từ quan đi tu. Nắm giữ bí mật nửa đầu về kiếp trước.",
    catchphrases: [
      "Hỗn xược! Sai còn cãi!",
      "Ngươi tưởng ta không biết gì? Ta biết hết!",
      "Học phải có tâm, có tầm, có tình!",
    ],
    realmGuardian: {
      realmId: 3, title: "Tàng Kinh Các Chủ — Tầng 3",
      greeting: "Lại kẻ vô tài quấy rầy! Đọc cho ta đoạn này!",
      farewell: "Hừm... cũng tạm. Cất bước. Ta để mắt tới ngươi.",
      secret: "Biết sự thật về người chơi kiếp trước nhưng được lệnh không được tiết lộ.",
    },
  },

  /* Realm 4 — Kết Đan */
  tu_la: {
    id: "tu_la", name: "Tu La Chiến Tướng", nameCn: "修罗战将",
    title: "Hộ Pháp Đường Đường Chủ",
    role: "guardian", gender: "male",
    color: Colors.fire, secondaryColor: "#7F1D1D", emoji: "⚔️", element: "Hỏa",
    description: "Tráng hán cao lớn da rám nắng đầy sẹo, mặc giáp sắt. Nóng nảy nhưng trọng tín nghĩa.",
    backstory: "Từng là tướng quân, trận thua được Lão Tổ cứu. Thề trung thành đến chết.",
    catchphrases: [
      "Há há! Rốt cuộc có kẻ đáng mặt đấu một trận!",
      "Ngươi yếu lắm! Mạnh lên!",
      "Thắng bằng vũ lực không bằng thắng bằng trí!",
    ],
    realmGuardian: {
      realmId: 4, title: "Hộ Pháp Đường — Tầng 4",
      greeting: "Muốn qua ải? Chứng minh bản lĩnh! Mạnh lên mới đi tiếp được!",
      farewell: "Được! Ngươi xứng đáng! Đi tiếp, đừng làm ta thất vọng.",
      secret: "Từng là đồng đội của Hạo Nhiên Chân Nhân, áy náy vì không cứu được người chơi năm đó.",
    },
  },

  /* Realm 5 — Nguyên Anh */
  tien_tu: {
    id: "tien_tu", name: "Bạch Y Tiên Tử", nameCn: "白衣仙子",
    title: "Thần Bí Khách Khanh",
    role: "guardian", gender: "female",
    color: Colors.immortal, secondaryColor: "#5B21B6", emoji: "🦋", element: "Phong",
    description: "Mỹ nhân áo trắng như tuyết, mặt che sa mỏng. Xuất hiện biến ảo, nói năng hàm hồ.",
    backstory: "Linh hồn vị hôn thê cũ của Hạo Nhiên Chân Nhân, chờ 500 năm để gặp lại người yêu.",
    catchphrases: [
      "Kiếp trước ngươi... chưa phải lúc.",
      "Ta đã chờ ngươi 500 năm.",
      "Lên đến đỉnh, mọi chuyện sẽ rõ.",
    ],
    realmGuardian: {
      realmId: 5, title: "Nguyên Anh Chi Linh — Tầng 5",
      greeting: "Cuối cùng ngươi đến được đây. Ta biết ngươi sẽ đến.",
      farewell: "Ký ức đang hồi phục đúng không? Lên tầng 6.",
      secret: "Vị hôn thê kiếp trước. Nếu người chơi là nữ, là tỷ muội kết nghĩa.",
    },
  },

  /* Realm 6 — Hóa Thần */
  huyens_anh: {
    id: "huyens_anh", name: "Huyễn Ảnh Ma Quân", nameCn: "幻影魔君",
    title: "Tầng Thứ Sáu — Ảo Cảnh Chi Chủ",
    role: "guardian", gender: "male",
    color: "#6B21A8", secondaryColor: "#4C1D95", emoji: "🌑", element: "Ảo",
    description: "Thân hình mờ ảo, lúc là khói đen, lúc hóa vô số bản sao. Thích tra tấn tinh thần.",
    backstory: "Bị Hạo Nhiên Chân Nhân phong ấn kiếp trước. Giờ thoát ra muốn trả thù.",
    catchphrases: [
      "Ảo hay thật, ngươi phân biệt được không?",
      "Hahaha! Khóc đi!",
      "Càng tuyệt vọng càng ngọt ngào!",
    ],
    realmGuardian: {
      realmId: 6, title: "Huyễn Cảnh Chi Chủ — Tầng 6",
      greeting: "Lại kẻ gõ cửa địa ngục. Vượt qua ảo ảnh của chính ngươi đi.",
      farewell: "KHÔNG! Sao ngươi phá được ảo cảnh của ta?!",
      secret: "Là phần linh hồn bị vứt bỏ của Hạo Nhiên Chân Nhân — sự sợ hãi và hối tiếc.",
    },
  },

  /* Rival — Lăng Thiên (xuyên suốt) */
  lien_thien: {
    id: "lien_thien", name: "Lăng Thiên", nameCn: "凌峰",
    title: "Đệ Tử Thiên Tài — Cựu Nhị Sư Huynh",
    role: "rival", gender: "male",
    color: Colors.rival, secondaryColor: "#991B1B", emoji: "🌪️", element: "Phong",
    description: "Anh tuấn mặc bạch y, mắt phượng, luôn cười khinh bỉ. Thiên tài tu luyện.",
    backstory: "Nhị Sư Huynh kiếp trước. Sau khi người chơi hy sinh, hắn điên cuồng tu luyện nhưng mãi không vượt qua di ảnh. Hắn chỉ muốn được công nhận.",
    catchphrases: [
      "Haha! Đồ vô dụng!",
      "Thiên tài không cần nỗ lực!",
      "Ngươi vượt qua ta rồi... nhưng ta còn đạn!",
    ],
  },

  /* Boss cuối — Hạo Nhiên Tổ Sư (Realm 7) */
  lao_to: {
    id: "lao_to", name: "Hạo Nhiên Tổ Sư", nameCn: "浩然祖师",
    title: "Khai Phái Tổ Sư — Cửu Chuyển Đại Thừa",
    role: "final_boss", gender: "male",
    color: Colors.boss, secondaryColor: "#450A0A", emoji: "🏔️", element: "Toàn bộ Ngũ Hành",
    description: "Lão giả ngồi kiết già trên đỉnh núi, râu tóc bạc bay phần phật. Hào quang chói lóa. Hơi thở đủ khiến người thấp run rẩy.",
    backstory: "Sáng lập Hạo Nhiên Tông 6000 năm trước. Biết toàn bộ sự thật về huyết mạch Ngũ Hành. Mọi thứ — từ việc ném ngươi xuống Tàng Kinh Các — đều là bài kiểm tra.",
    catchphrases: [
      "... (im lặng đáng sợ)",
      "Tiểu tử. Ngươi có biết vì sao ngươi ở đây?",
      "Đủ mạnh để nghe sự thật chưa?",
      "Đây mới chỉ là bắt đầu.",
    ],
    realmGuardian: {
      realmId: 7, title: "Hạo Nhiên Tổ Sư — Đỉnh Tàng Kinh Các",
      greeting: "Cuối cùng ngươi đã đến đỉnh. Ta đã chờ ngươi từ rất lâu, Hạo Nhiên Chân Nhân.",
      farewell: "Ngươi xứng đáng. Hãy nhận di sản tổ tiên và kế thừa Hạo Nhiên Tông.",
      secret: "Lão Tổ là hộ vệ cuối cùng của huyết mạch Ngũ Hành, đã dành 6000 năm tìm người kế thừa. Người chơi không trọng sinh — được Lão Tổ 'thức tỉnh' từ một hậu duệ bình thường.",
    },
  },
};

export type AvatarStyle = {
  bodyColor: string; robeColor: string; accentColor: string; accessory: string;
};

export function getAvatarStyle(character: Character): AvatarStyle {
  switch (character.id) {
    case "player_male":   return { bodyColor: "#FDE68A", robeColor: Colors.primaryDark, accentColor: Colors.secondary, accessory: "⚡" };
    case "player_female": return { bodyColor: "#FCE4EC", robeColor: Colors.sister, accentColor: Colors.secondary, accessory: "🌸" };
    case "dong_tu":       return { bodyColor: "#FFE0B2", robeColor: Colors.earth, accentColor: "#8D6E63", accessory: "🧹" };
    case "luc_ti":        return { bodyColor: "#FCE4EC", robeColor: Colors.sister, accentColor: "#BE185D", accessory: "🌸" };
    case "lao_phu_tu":    return { bodyColor: "#E0E0E0", robeColor: Colors.scholar, accentColor: "#1E3A5F", accessory: "📜" };
    case "tu_la":         return { bodyColor: "#FFCDD2", robeColor: Colors.fire, accentColor: "#7F1D1D", accessory: "⚔️" };
    case "tien_tu":       return { bodyColor: "#E8EAF6", robeColor: Colors.immortal, accentColor: "#5B21B6", accessory: "🦋" };
    case "huyens_anh":    return { bodyColor: "#E5DEFF", robeColor: "#6B21A8", accentColor: "#4C1D95", accessory: "🌑" };
    case "lien_thien":    return { bodyColor: "#E0F7FA", robeColor: Colors.rival, accentColor: "#991B1B", accessory: "🌪️" };
    case "lao_to":        return { bodyColor: "#FDE68A", robeColor: Colors.boss, accentColor: "#450A0A", accessory: "🏔️" };
  }
}

export function getCharacterForRealm(realmId: number): Character | undefined {
  const map: Record<number, CharacterId> = {
    1: "dong_tu", 2: "luc_ti", 3: "lao_phu_tu", 4: "tu_la",
    5: "tien_tu", 6: "huyens_anh", 7: "lao_to",
  };
  const id = map[realmId];
  return id ? CHARACTERS[id] : undefined;
}
