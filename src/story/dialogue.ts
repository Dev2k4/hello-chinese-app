import { CharacterId } from "./characters";

export interface DialogueLine {
  characterId: CharacterId;
  text: string;
  emotion?: "normal" | "angry" | "happy" | "sad" | "surprised" | "smug" | "crying" | "shy" | "contempt";
}

export interface PrologueScene {
  background: string;
  lines: DialogueLine[];
}

// ─── PROLOGUE — Cảnh bái sư ───
export const PROLOGUE: PrologueScene[] = [
  {
    background: "#0A0A0A",
    lines: [{ characterId: "lao_to", text: "...", emotion: "normal" }],
  },
  {
    background: "#1A1A2E",
    lines: [{ characterId: "lao_to", text: "Kẻ nào dám quấy nhiễu thanh tu của bản tọa?", emotion: "normal" }],
  },
  {
    background: "#1A1A2E",
    lines: [{ characterId: "dong_tu", text: "Bẩm Tổ Sư! Có một kẻ... muốn bái sư học tiếng Trung ạ!", emotion: "normal" }],
  },
  {
    background: "#2D1B00",
    lines: [{ characterId: "lao_to", text: "Hừ! Lại một tên phàm nhân vô dụng. Cho vào đây.", emotion: "angry" }],
  },
  {
    background: "#4A1A1A",
    lines: [{ characterId: "dong_tu", text: "Dạ... (thì thầm) Ê, liệu hồn vào bái kiến, đừng làm liên lụy ta!", emotion: "normal" }],
  },
  {
    background: "#1A1A2E",
    lines: [{ characterId: "lao_to", text: "Ngươi tên gì? Biết bao nhiêu chữ Hán rồi?", emotion: "normal" }],
  },
  {
    background: "#1A1A2E",
    lines: [{ characterId: "lao_to", text: "...Cái gì? Không biết chữ nào?!", emotion: "angry" }],
  },
  {
    background: "#1A1A2E",
    lines: [{ characterId: "lao_to", text: "Hoang đường! Linh căn bẩn thỉu, căn cốt tầm thường. Về làm nông đi!", emotion: "angry" }],
  },
  {
    background: "#1A1A2E",
    lines: [{ characterId: "lao_to", text: "Nhưng... mắt ngươi có tia kiên định. Cũng được.", emotion: "normal" }],
  },
  {
    background: "#1A1A2E",
    lines: [{ characterId: "lao_to", text: "Xuống Tàng Kinh Các tầng một, tìm Đồng Tử học vỡ lòng.", emotion: "normal" }],
  },
  {
    background: "#1A1A2E",
    lines: [{ characterId: "lao_to", text: "Nếu chín tầng đầu không qua nổi... cút khỏi Hạo Nhiên Tông!", emotion: "angry" }],
  },
  {
    background: "#1A1A2E",
    lines: [{ characterId: "dong_tu", text: "Tổ Sư có lời! Mời ngươi theo ta... (cười khẩy) lần đầu đến Tàng Kinh Các hả?", emotion: "smug" }],
  },
];

// ─── LEVEL-UP THEO 7 CẢNH GIỚI ───
export const LEVEL_UP_DIALOGUES: Record<number, DialogueLine[]> = {
  1: [
    { characterId: "dong_tu", text: "Ồ? Ngươi đã qua hết 9 tầng Phàm Nhân cảnh?", emotion: "surprised" },
    { characterId: "dong_tu", text: "Có vẻ không hoàn toàn vô dụng. Lên tầng 2 gặp Lục Tỷ đi.", emotion: "normal" },
  ],
  2: [
    { characterId: "luc_ti", text: "Không tệ. Ta tưởng ngươi bỏ cuộc từ tầng 5 cơ.", emotion: "happy" },
    { characterId: "luc_ti", text: "Giờ ngươi có thể tự tin nói chuyện với người ngoài rồi.", emotion: "normal" },
  ],
  3: [
    { characterId: "lao_phu_tu", text: "Hừ! Trúc Cơ rồi sao? Đừng tưởng là giỏi!", emotion: "angry" },
    { characterId: "lao_phu_tu", text: "Nhưng so với mấy tên phế vật khác thì ngươi tạm.", emotion: "normal" },
  ],
  4: [
    { characterId: "tu_la", text: "Kết Đan?! Hahaha! Cuối cùng có kẻ đáng mặt!", emotion: "happy" },
    { characterId: "tu_la", text: "Lên tầng 5 đi, Bạch Y Tiên Tử đang chờ ngươi!", emotion: "normal" },
  ],
  5: [
    { characterId: "tien_tu", text: "Nguyên Anh rồi... kiếp trước ngươi cũng từng đứng đây.", emotion: "sad" },
    { characterId: "tien_tu", text: "Ta đã chờ 500 năm. Hãy tiếp tục lên cao.", emotion: "normal" },
  ],
  6: [
    { characterId: "huyens_anh", text: "Không thể! Ngươi phá được ảo cảnh của ta!", emotion: "crying" },
    { characterId: "huyens_anh", text: "Đi đi... lên đỉnh đi. Lão Tổ đang chờ.", emotion: "sad" },
  ],
  7: [
    { characterId: "lao_to", text: "Đã lâu không gặp, đệ tử cũ của ta.", emotion: "normal" },
    { characterId: "lao_to", text: "Ngươi là hậu duệ của Ngũ Hành Tiên Tổ. Ta đã thức tỉnh huyết mạch trong ngươi.", emotion: "normal" },
    { characterId: "lao_to", text: "Mọi thứ từ đầu đều là bài kiểm tra. Và ngươi đã vượt qua.", emotion: "normal" },
    { characterId: "lao_to", text: "Chúc mừng, Hạo Nhiên Chân Nhân. Ngươi đã trở về.", emotion: "happy" },
  ],
};

// ─── LĂNG THIÊN CHẾ GIỄU ───
export const RIVAL_TAUNTS: Record<number, DialogueLine[]> = {
  1: [{ characterId: "lien_thien", text: "Haha! Học mấy chữ trẻ con? Ta đã ở tầng 3 Luyện Khí rồi!", emotion: "smug" }],
  2: [{ characterId: "lien_thien", text: "Mới Luyện Khí? Ta sắp Trúc Cơ rồi, đồ chậm!", emotion: "smug" }],
  3: [{ characterId: "lien_thien", text: "Cái gì?! Trúc Cơ rồi? May mắn thôi!", emotion: "angry" }],
  4: [{ characterId: "lien_thien", text: "Kết Đan? Không thể! Ta sẽ đuổi kịp!", emotion: "surprised" }],
  5: [{ characterId: "lien_thien", text: "Ngươi... đã vượt qua ta rồi...", emotion: "sad" }],
  6: [{ characterId: "lien_thien", text: "Ta phục ngươi, sư huynh. Ngươi mạnh hơn ta.", emotion: "crying" }],
  7: [{ characterId: "lien_thien", text: "TA LÀ MA TÔN! Kiếp trước ta giết ngươi, kiếp này cũng vậy!", emotion: "angry" }],
};

// ─── QUA TẦNG NHỎ ───
export function getTierClearDialogue(realmId: number, tierId: number, isLastTier: boolean): DialogueLine[] {
  const lines: DialogueLine[] = [
    { characterId: "dong_tu", text: `Tầng ${tierId} đã thông! Còn ${9 - tierId} tầng nữa!`, emotion: "happy" },
  ];
  if (isLastTier) {
    lines.push({
      characterId: "lao_to",
      text: "Ngươi đã vượt qua 9 tầng. Đáng khen!",
      emotion: "normal" as const,
    });
  }
  return lines;
}
