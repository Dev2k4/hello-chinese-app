import { HskLevel } from "../types";

export const hsk4Data: HskLevel = {
  id: 4,
  name: "HSK 4",
  description: "Trung cấp - 1200 từ vựng, giao tiếp trôi chảy chủ đề hàng ngày",
  totalWords: 1200,
  totalGrammar: 60,
  units: [
    {
      id: "hsk4_unit1",
      hskLevel: 4,
      title: "Giao tiếp xã hội",
      description: "Từ vựng giao tiếp nâng cao",
      order: 1,
      lessons: [
        {
          id: "hsk4_u1_l1",
          unitId: "hsk4_unit1",
          hskLevel: 4,
          title: "Giao tiếp hàng ngày nâng cao",
          description: "Mở rộng vốn từ giao tiếp",
          order: 1,
          type: "vocab",
          vocabularies: [
            { id: "v97", hanzi: "关系", pinyin: "guānxi", meaning: "Quan hệ", hskLevel: 4, wordClass: "danh từ" },
            { id: "v98", hanzi: "交流", pinyin: "jiāoliú", meaning: "Giao lưu, trao đổi", hskLevel: 4, wordClass: "động từ" },
            { id: "v99", hanzi: "帮助", pinyin: "bāngzhù", meaning: "Giúp đỡ", hskLevel: 4, wordClass: "động từ" },
            { id: "v100", hanzi: "邀请", pinyin: "yāoqǐng", meaning: "Mời", hskLevel: 4, wordClass: "động từ" },
            { id: "v101", hanzi: "接待", pinyin: "jiēdài", meaning: "Tiếp đãi", hskLevel: 4, wordClass: "động từ" },
          ],
          grammarPoints: [],
          questions: [
            { id: "q4_1", type: "multiple_choice", prompt: "Chọn nghĩa của 关系", options: ["Quan hệ", "Giao lưu", "Giúp đỡ", "Mời"], correctAnswer: "Quan hệ" },
            { id: "q4_2", type: "flashcard", prompt: "帮助", pinyin: "bāngzhù", options: ["Giúp đỡ", "Quan hệ", "Mời", "Đón tiếp"], correctAnswer: "Giúp đỡ" },
          ],
        },
      ],
    },
  ],
};
