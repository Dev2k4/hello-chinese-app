import { HskLevel } from "../types";

export const hsk2Data: HskLevel = {
  id: 2,
  name: "HSK 2",
  description: "Sơ cấp - 300 từ vựng, giao tiếp cơ bản hàng ngày",
  totalWords: 300,
  totalGrammar: 25,
  units: [
    {
      id: "hsk2_unit1",
      hskLevel: 2,
      title: "Cuộc sống hàng ngày",
      description: "Từ vựng về sinh hoạt hàng ngày",
      order: 1,
      lessons: [
        {
          id: "hsk2_u1_l1",
          unitId: "hsk2_unit1",
          hskLevel: 2,
          title: "Thói quen hàng ngày",
          description: "Học từ vựng về thói quen hằng ngày",
          order: 1,
          type: "vocab",
          vocabularies: [
            { id: "v61", hanzi: "起床", pinyin: "qǐchuáng", meaning: "Thức dậy", exampleSentence: "我每天六点起床。", examplePinyin: "Wǒ měi tiān liù diǎn qǐchuáng.", exampleMeaning: "Mỗi ngày tôi dậy lúc 6 giờ.", hskLevel: 2, wordClass: "động từ" },
            { id: "v62", hanzi: "睡觉", pinyin: "shuìjiào", meaning: "Ngủ", exampleSentence: "我十点睡觉。", examplePinyin: "Wǒ shí diǎn shuìjiào.", exampleMeaning: "Tôi ngủ lúc 10 giờ.", hskLevel: 2, wordClass: "động từ" },
            { id: "v63", hanzi: "吃饭", pinyin: "chīfàn", meaning: "Ăn cơm", exampleSentence: "我们吃饭吧。", examplePinyin: "Wǒmen chīfàn ba.", exampleMeaning: "Chúng ta ăn cơm đi.", hskLevel: 2, wordClass: "động từ" },
            { id: "v64", hanzi: "上班", pinyin: "shàngbān", meaning: "Đi làm", exampleSentence: "我八点上班。", examplePinyin: "Wǒ bā diǎn shàngbān.", exampleMeaning: "Tôi đi làm lúc 8 giờ.", hskLevel: 2, wordClass: "động từ" },
            { id: "v65", hanzi: "回家", pinyin: "huíjiā", meaning: "Về nhà", exampleSentence: "我五点半回家。", examplePinyin: "Wǒ wǔ diǎn bàn huíjiā.", exampleMeaning: "Tôi về nhà lúc 5 rưỡi.", hskLevel: 2, wordClass: "động từ" },
            { id: "v66", hanzi: "运动", pinyin: "yùndòng", meaning: "Vận động, thể thao", exampleSentence: "我喜欢运动。", examplePinyin: "Wǒ xǐhuān yùndòng.", exampleMeaning: "Tôi thích thể thao.", hskLevel: 2, wordClass: "động từ/danh từ" },
          ],
          grammarPoints: [],
          questions: [
            { id: "q2_1", type: "multiple_choice", prompt: "\"起床\" có nghĩa là gì?", options: ["Thức dậy", "Ngủ", "Ăn cơm", "Đi làm"], correctAnswer: "Thức dậy" },
            { id: "q2_2", type: "flashcard", prompt: "上班", pinyin: "shàngbān", options: ["Đi làm", "Về nhà", "Đi học", "Mua sắm"], correctAnswer: "Đi làm" },
            { id: "q2_3", type: "pinyin_input", prompt: "Chọn pinyin đúng cho 吃饭", options: ["chīfàn", "chǐfàn", "chīfán", "chīfǎn"], correctAnswer: "chīfàn" },
          ],
        },
        {
          id: "hsk2_u1_l2",
          unitId: "hsk2_unit1",
          hskLevel: 2,
          title: "Thời gian chi tiết",
          description: "Học cách nói giờ và thời gian chi tiết",
          order: 2,
          type: "mixed",
          vocabularies: [
            { id: "v67", hanzi: "点", pinyin: "diǎn", meaning: "Giờ", exampleSentence: "现在三点。", examplePinyin: "Xiànzài sān diǎn.", exampleMeaning: "Bây giờ là 3 giờ.", hskLevel: 2, wordClass: "danh từ" },
            { id: "v68", hanzi: "半", pinyin: "bàn", meaning: "Rưỡi, nửa", exampleSentence: "八点半。", examplePinyin: "Bā diǎn bàn.", exampleMeaning: "8 rưỡi.", hskLevel: 2, wordClass: "số từ" },
            { id: "v69", hanzi: "分", pinyin: "fēn", meaning: "Phút", exampleSentence: "五点二十分。", examplePinyin: "Wǔ diǎn èrshí fēn.", exampleMeaning: "5 giờ 20 phút.", hskLevel: 2, wordClass: "danh từ" },
            { id: "v70", hanzi: "现在", pinyin: "xiànzài", meaning: "Bây giờ", exampleSentence: "现在几点？", examplePinyin: "Xiànzài jǐ diǎn?", exampleMeaning: "Bây giờ là mấy giờ?", hskLevel: 2, wordClass: "danh từ" },
            { id: "v71", hanzi: "时候", pinyin: "shíhou", meaning: "Lúc, khi", exampleSentence: "你什么时候来？", examplePinyin: "Nǐ shénme shíhou lái?", exampleMeaning: "Bao giờ bạn đến?", hskLevel: 2, wordClass: "danh từ" },
          ],
          grammarPoints: [
            {
              id: "g11",
              title: "Cách nói giờ",
              explanation: "Số + 点 (giờ) + Số + 分 (phút). 半 (bàn) = rưỡi = 30 phút.",
              structure: "Số + 点 + (Số + 分/半)",
              examples: [
                { hanzi: "八点半。", pinyin: "Bā diǎn bàn.", meaning: "8 rưỡi." },
                { hanzi: "九点十五分。", pinyin: "Jiǔ diǎn shíwǔ fēn.", meaning: "9 giờ 15 phút." },
              ],
              hskLevel: 2,
            },
          ],
          questions: [
            { id: "q2_4", type: "multiple_choice", prompt: "\"现在几点？\" có nghĩa là gì?", options: ["Bây giờ là mấy giờ?", "Bạn đi đâu?", "Hôm nay là ngày mấy?", "Bạn bao nhiêu tuổi?"], correctAnswer: "Bây giờ là mấy giờ?" },
            { id: "q2_5", type: "flashcard", prompt: "半", pinyin: "bàn", options: ["Rưỡi", "Một phần tư", "Giờ", "Phút"], correctAnswer: "Rưỡi" },
          ],
        },
      ],
    },
    {
      id: "hsk2_unit2",
      hskLevel: 2,
      title: "Sở thích và năng khiếu",
      description: "Từ vựng về sở thích, năng lực",
      order: 2,
      lessons: [
        {
          id: "hsk2_u2_l1",
          unitId: "hsk2_unit2",
          hskLevel: 2,
          title: "Sở thích cá nhân",
          description: "Học cách nói về sở thích",
          order: 1,
          type: "mixed",
          vocabularies: [
            { id: "v72", hanzi: "喜欢", pinyin: "xǐhuān", meaning: "Thích", exampleSentence: "我喜欢唱歌。", examplePinyin: "Wǒ xǐhuān chànggē.", exampleMeaning: "Tôi thích hát.", hskLevel: 2, wordClass: "động từ" },
            { id: "v73", hanzi: "听", pinyin: "tīng", meaning: "Nghe", exampleSentence: "我听音乐。", examplePinyin: "Wǒ tīng yīnyuè.", exampleMeaning: "Tôi nghe nhạc.", hskLevel: 2, wordClass: "động từ" },
            { id: "v74", hanzi: "看", pinyin: "kàn", meaning: "Xem, nhìn", exampleSentence: "我看电视。", examplePinyin: "Wǒ kàn diànshì.", exampleMeaning: "Tôi xem TV.", hskLevel: 2, wordClass: "động từ" },
            { id: "v75", hanzi: "唱歌", pinyin: "chànggē", meaning: "Hát", exampleSentence: "她唱歌很好听。", examplePinyin: "Tā chànggē hěn hǎotīng.", exampleMeaning: "Cô ấy hát rất hay.", hskLevel: 2, wordClass: "động từ" },
            { id: "v76", hanzi: "跳舞", pinyin: "tiàowǔ", meaning: "Nhảy múa", exampleSentence: "她喜欢跳舞。", examplePinyin: "Tā xǐhuān tiàowǔ.", exampleMeaning: "Cô ấy thích nhảy.", hskLevel: 2, wordClass: "động từ" },
          ],
          grammarPoints: [
            {
              id: "g12",
              title: "Động từ + 喜欢 + Động từ",
              explanation: "喜欢 (xǐhuān) có thể đứng trước một động từ khác để diễn tả sở thích làm gì đó.",
              structure: "Chủ ngữ + 喜欢 + Động từ (+ Tân ngữ)",
              examples: [
                { hanzi: "我喜欢看书。", pinyin: "Wǒ xǐhuān kàn shū.", meaning: "Tôi thích đọc sách." },
                { hanzi: "他喜欢跑步。", pinyin: "Tā xǐhuān pǎobù.", meaning: "Anh ấy thích chạy bộ." },
              ],
              hskLevel: 2,
            },
          ],
          questions: [
            { id: "q2_6", type: "multiple_choice", prompt: "\"唱歌\" có nghĩa là gì?", options: ["Nhảy múa", "Hát", "Nghe nhạc", "Xem phim"], correctAnswer: "Hát" },
            { id: "q2_7", type: "flashcard", prompt: "喜欢", pinyin: "xǐhuān", options: ["Thích", "Ghét", "Muốn", "Cần"], correctAnswer: "Thích" },
            { id: "q2_8", type: "arrange_sentence", prompt: "Sắp xếp: 我 + 喜欢 + 听 + 音乐", options: ["我喜欢听音乐", "音乐听喜欢我", "听音乐我喜欢", "喜欢听音乐我"], correctAnswer: "我喜欢听音乐" },
          ],
        },
      ],
    },
    {
      id: "hsk2_unit3",
      hskLevel: 2,
      title: "Phương hướng và vị trí",
      description: "Học từ vựng về vị trí, phương hướng",
      order: 3,
      lessons: [
        {
          id: "hsk2_u3_l1",
          unitId: "hsk2_unit3",
          hskLevel: 2,
          title: "Vị trí trong không gian",
          description: "Học cách nói vị trí đồ vật",
          order: 1,
          type: "mixed",
          vocabularies: [
            { id: "v77", hanzi: "里", pinyin: "lǐ", meaning: "Trong, bên trong", exampleSentence: "在房间里", examplePinyin: "Zài fángjiān lǐ", exampleMeaning: "Ở trong phòng", hskLevel: 2, wordClass: "giới từ" },
            { id: "v78", hanzi: "上", pinyin: "shàng", meaning: "Trên", exampleSentence: "桌子上", examplePinyin: "Zhuōzi shàng", exampleMeaning: "Trên bàn", hskLevel: 2, wordClass: "giới từ" },
            { id: "v79", hanzi: "下", pinyin: "xià", meaning: "Dưới", exampleSentence: "床下", examplePinyin: "Chuáng xià", exampleMeaning: "Dưới giường", hskLevel: 2, wordClass: "giới từ" },
            { id: "v80", hanzi: "旁边", pinyin: "pángbiān", meaning: "Bên cạnh", exampleSentence: "我在你旁边。", examplePinyin: "Wǒ zài nǐ pángbiān.", exampleMeaning: "Tôi ở bên cạnh bạn.", hskLevel: 2, wordClass: "danh từ" },
            { id: "v81", hanzi: "在", pinyin: "zài", meaning: "Ở, tại", exampleSentence: "我在学校。", examplePinyin: "Wǒ zài xuéxiào.", exampleMeaning: "Tôi ở trường.", hskLevel: 2, wordClass: "giới từ/động từ" },
          ],
          grammarPoints: [
            {
              id: "g13",
              title: "Câu vị trí với 在",
              explanation: "在 (zài) được dùng để chỉ vị trí của ai đó hoặc vật gì. Cấu trúc: Chủ ngữ + 在 + Địa điểm.",
              structure: "Chủ ngữ + 在 + Địa điểm",
              examples: [
                { hanzi: "我在学校。", pinyin: "Wǒ zài xuéxiào.", meaning: "Tôi ở trường." },
                { hanzi: "书在桌子上。", pinyin: "Shū zài zhuōzi shàng.", meaning: "Sách ở trên bàn." },
              ],
              hskLevel: 2,
            },
          ],
          questions: [
            { id: "q2_9", type: "multiple_choice", prompt: "\"在\" có nghĩa là gì?", options: ["Ở, tại", "Trong", "Trên", "Dưới"], correctAnswer: "Ở, tại" },
            { id: "q2_10", type: "flashcard", prompt: "旁边", pinyin: "pángbiān", options: ["Bên cạnh", "Bên trong", "Bên ngoài", "Đằng sau"], correctAnswer: "Bên cạnh" },
          ],
        },
      ],
    },
  ],
};
