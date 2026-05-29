import { HskLevel } from "../types";

export const hsk3Data: HskLevel = {
  id: 3,
  name: "HSK 3",
  description: "Trung cấp thấp - 600 từ vựng, giao tiếp cuộc sống hàng ngày",
  totalWords: 600,
  totalGrammar: 40,
  units: [
    {
      id: "hsk3_unit1",
      hskLevel: 3,
      title: "Công việc và học tập",
      description: "Từ vựng về công việc, học tập nâng cao",
      order: 1,
      lessons: [
        {
          id: "hsk3_u1_l1",
          unitId: "hsk3_unit1",
          hskLevel: 3,
          title: "Môi trường làm việc",
          description: "Học từ vựng về công việc và văn phòng",
          order: 1,
          type: "vocab",
          vocabularies: [
            { id: "v82", hanzi: "公司", pinyin: "gōngsī", meaning: "Công ty", exampleSentence: "他在公司工作。", examplePinyin: "Tā zài gōngsī gōngzuò.", exampleMeaning: "Anh ấy làm việc ở công ty.", hskLevel: 3, wordClass: "danh từ" },
            { id: "v83", hanzi: "办公室", pinyin: "bàngōngshì", meaning: "Văn phòng", exampleSentence: "办公室很大。", examplePinyin: "Bàngōngshì hěn dà.", exampleMeaning: "Văn phòng rất rộng.", hskLevel: 3, wordClass: "danh từ" },
            { id: "v84", hanzi: "同事", pinyin: "tóngshì", meaning: "Đồng nghiệp", exampleSentence: "我的同事很好。", examplePinyin: "Wǒ de tóngshì hěn hǎo.", exampleMeaning: "Đồng nghiệp của tôi rất tốt.", hskLevel: 3, wordClass: "danh từ" },
            { id: "v85", hanzi: "开会", pinyin: "kāihuì", meaning: "Họp", exampleSentence: "今天下午开会。", examplePinyin: "Jīntiān xiàwǔ kāihuì.", exampleMeaning: "Chiều nay họp.", hskLevel: 3, wordClass: "động từ" },
            { id: "v86", hanzi: "工作", pinyin: "gōngzuò", meaning: "Công việc, làm việc", exampleSentence: "我很忙工作。", examplePinyin: "Wǒ hěn máng gōngzuò.", exampleMeaning: "Tôi rất bận với công việc.", hskLevel: 3, wordClass: "động từ/danh từ" },
            { id: "v87", hanzi: "休息", pinyin: "xiūxi", meaning: "Nghỉ ngơi", exampleSentence: "我们休息一下。", examplePinyin: "Wǒmen xiūxi yīxià.", exampleMeaning: "Chúng ta nghỉ một chút.", hskLevel: 3, wordClass: "động từ" },
          ],
          grammarPoints: [],
          questions: [
            { id: "q3_1", type: "multiple_choice", prompt: "\"公司\" có nghĩa là gì?", options: ["Công ty", "Văn phòng", "Đồng nghiệp", "Công việc"], correctAnswer: "Công ty" },
            { id: "q3_2", type: "flashcard", prompt: "同事", pinyin: "tóngshì", options: ["Đồng nghiệp", "Bạn học", "Sếp", "Nhân viên"], correctAnswer: "Đồng nghiệp" },
          ],
        },
        {
          id: "hsk3_u1_l2",
          unitId: "hsk3_unit1",
          hskLevel: 3,
          title: "So sánh và mức độ",
          description: "Học cách so sánh trong tiếng Trung",
          order: 2,
          type: "mixed",
          vocabularies: [
            { id: "v88", hanzi: "比较", pinyin: "bǐjiào", meaning: "Khá là, so sánh", exampleSentence: "今天比较热。", examplePinyin: "Jīntiān bǐjiào rè.", exampleMeaning: "Hôm nay khá nóng.", hskLevel: 3, wordClass: "phó từ" },
            { id: "v89", hanzi: "比", pinyin: "bǐ", meaning: "Hơn (so sánh)", exampleSentence: "我比你高。", examplePinyin: "Wǒ bǐ nǐ gāo.", exampleMeaning: "Tôi cao hơn bạn.", hskLevel: 3, wordClass: "giới từ" },
            { id: "v90", hanzi: "更", pinyin: "gèng", meaning: "Hơn nữa", exampleSentence: "这个更好。", examplePinyin: "Zhège gèng hǎo.", exampleMeaning: "Cái này tốt hơn.", hskLevel: 3, wordClass: "phó từ" },
            { id: "v91", hanzi: "最", pinyin: "zuì", meaning: "Nhất", exampleSentence: "这是最好的。", examplePinyin: "Zhè shì zuì hǎo de.", exampleMeaning: "Đây là cái tốt nhất.", hskLevel: 3, wordClass: "phó từ" },
          ],
          grammarPoints: [
            {
              id: "g14",
              title: "So sánh với 比",
              explanation: "比 (bǐ) dùng để so sánh hai đối tượng. A + 比 + B + Tính từ.",
              structure: "A + 比 + B + Tính từ",
              examples: [
                { hanzi: "我比他高。", pinyin: "Wǒ bǐ tā gāo.", meaning: "Tôi cao hơn anh ấy." },
                { hanzi: "今天比昨天热。", pinyin: "Jīntiān bǐ zuótiān rè.", meaning: "Hôm nay nóng hơn hôm qua." },
              ],
              hskLevel: 3,
            },
            {
              id: "g15",
              title: "So sánh nhất với 最",
              explanation: "最 (zuì) = nhất, đứng trước tính từ để tạo dạng so sánh nhất.",
              structure: "Chủ ngữ + 最 + Tính từ",
              examples: [
                { hanzi: "这是最好的。", pinyin: "Zhè shì zuì hǎo de.", meaning: "Đây là cái tốt nhất." },
                { hanzi: "她最漂亮。", pinyin: "Tā zuì piàoliang.", meaning: "Cô ấy đẹp nhất." },
              ],
              hskLevel: 3,
            },
          ],
          questions: [
            { id: "q3_3", type: "multiple_choice", prompt: "\"比\" dùng để làm gì?", options: ["So sánh hơn", "So sánh nhất", "Chỉ mức độ", "Chỉ thời gian"], correctAnswer: "So sánh hơn" },
            { id: "q3_4", type: "flashcard", prompt: "最", pinyin: "zuì", options: ["Nhất", "Hơn", "Khá", "Cũng"], correctAnswer: "Nhất" },
            { id: "q3_5", type: "arrange_sentence", prompt: "Sắp xếp: 我 + 比 + 他 + 高", options: ["我比他高", "他比我高", "比高我他", "高我比他"], correctAnswer: "我比他高" },
          ],
        },
      ],
    },
    {
      id: "hsk3_unit2",
      hskLevel: 3,
      title: "Sức khỏe và cảm xúc",
      description: "Từ vựng về sức khỏe, bệnh tật, cảm xúc",
      order: 2,
      lessons: [
        {
          id: "hsk3_u2_l1",
          unitId: "hsk3_unit2",
          hskLevel: 3,
          title: "Cảm xúc và trạng thái",
          description: "Học từ vựng về cảm xúc",
          order: 1,
          type: "vocab",
          vocabularies: [
            { id: "v92", hanzi: "高兴", pinyin: "gāoxìng", meaning: "Vui vẻ", exampleSentence: "我很高兴。", examplePinyin: "Wǒ hěn gāoxìng.", exampleMeaning: "Tôi rất vui.", hskLevel: 3, wordClass: "tính từ" },
            { id: "v93", hanzi: "难过", pinyin: "nánguò", meaning: "Buồn", exampleSentence: "别难过。", examplePinyin: "Bié nánguò.", exampleMeaning: "Đừng buồn.", hskLevel: 3, wordClass: "tính từ" },
            { id: "v94", hanzi: "担心", pinyin: "dānxīn", meaning: "Lo lắng", exampleSentence: "我很担心。", examplePinyin: "Wǒ hěn dānxīn.", exampleMeaning: "Tôi rất lo lắng.", hskLevel: 3, wordClass: "động từ" },
            { id: "v95", hanzi: "累", pinyin: "lèi", meaning: "Mệt", exampleSentence: "我很累。", examplePinyin: "Wǒ hěn lèi.", exampleMeaning: "Tôi rất mệt.", hskLevel: 3, wordClass: "tính từ" },
            { id: "v96", hanzi: "疼", pinyin: "téng", meaning: "Đau", exampleSentence: "我头疼。", examplePinyin: "Wǒ tóu téng.", exampleMeaning: "Tôi đau đầu.", hskLevel: 3, wordClass: "tính từ" },
          ],
          grammarPoints: [],
          questions: [
            { id: "q3_6", type: "multiple_choice", prompt: "\"高兴\" có nghĩa là gì?", options: ["Vui vẻ", "Buồn", "Lo lắng", "Mệt"], correctAnswer: "Vui vẻ" },
            { id: "q3_7", type: "flashcard", prompt: "担心", pinyin: "dānxīn", options: ["Lo lắng", "Vui", "Buồn", "Tức giận"], correctAnswer: "Lo lắng" },
          ],
        },
      ],
    },
  ],
};
