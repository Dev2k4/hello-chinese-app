import { PlacementQuestion } from "../types";

export const placementTestQuestions: PlacementQuestion[] = [
  // HSK 1 - Vocabulary
  { id: "pt_v1", type: "vocab", category: "Từ vựng HSK 1", prompt: "你好 có nghĩa là gì?", options: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"], correctAnswer: "Xin chào", hskLevel: 1 },
  { id: "pt_v2", type: "vocab", category: "Từ vựng HSK 1", prompt: "Chọn hanzi đúng cho 'wǒ'", options: ["我", "你", "他", "她"], correctAnswer: "我", hskLevel: 1 },
  { id: "pt_v3", type: "vocab", category: "Từ vựng HSK 1", prompt: "Chọn nghĩa của 是", options: ["Là", "Có", "Tại", "Muốn"], correctAnswer: "Là", hskLevel: 1 },
  { id: "pt_v4", type: "vocab", category: "Từ vựng HSK 1", prompt: "一 là số mấy?", options: ["1", "2", "3", "4"], correctAnswer: "1", hskLevel: 1 },
  { id: "pt_v5", type: "vocab", category: "Từ vựng HSK 1", prompt: "Pinyin của 好 là gì?", options: ["hǎo", "hào", "háo", "hào"], correctAnswer: "hǎo", hskLevel: 1 },
  { id: "pt_v6", type: "vocab", category: "Từ vựng HSK 1", prompt: "Chọn nghĩa của 老师", options: ["Giáo viên", "Học sinh", "Bác sĩ", "Bạn bè"], correctAnswer: "Giáo viên", hskLevel: 1 },
  { id: "pt_v7", type: "vocab", category: "Từ vựng HSK 1", prompt: "Chọn hanzi đúng cho 'tā' (anh ấy)", options: ["他", "她", "它", "们"], correctAnswer: "他", hskLevel: 1 },
  { id: "pt_v8", type: "vocab", category: "Từ vựng HSK 1", prompt: "Chọn nghĩa của 大", options: ["To", "Nhỏ", "Cao", "Thấp"], correctAnswer: "To", hskLevel: 1 },

  // HSK 2 - Vocabulary
  { id: "pt_v9", type: "vocab", category: "Từ vựng HSK 2", prompt: "Chọn nghĩa của 喜欢", options: ["Thích", "Ghét", "Muốn", "Cần"], correctAnswer: "Thích", hskLevel: 2 },
  { id: "pt_v10", type: "vocab", category: "Từ vựng HSK 2", prompt: "Pinyin đúng cho 吃 là gì?", options: ["chī", "chǐ", "chì", "chí"], correctAnswer: "chī", hskLevel: 2 },
  { id: "pt_v11", type: "vocab", category: "Từ vựng HSK 2", prompt: "Chọn hanzi đúng cho 'míngtiān'", options: ["明天", "今天", "昨天", "星期"], correctAnswer: "明天", hskLevel: 2 },
  { id: "pt_v12", type: "vocab", category: "Từ vựng HSK 2", prompt: "Chọn nghĩa của 在", options: ["Ở, tại", "Trong", "Trên", "Dưới"], correctAnswer: "Ở, tại", hskLevel: 2 },
  { id: "pt_v13", type: "vocab", category: "Từ vựng HSK 2", prompt: "多少钱 có nghĩa là gì?", options: ["Bao nhiêu tiền?", "Bạn tên gì?", "Bạn khỏe không?", "Đi đâu?"], correctAnswer: "Bao nhiêu tiền?", hskLevel: 2 },
  { id: "pt_v14", type: "vocab", category: "Từ vựng HSK 2", prompt: "Chọn nghĩa của 半", options: ["Rưỡi, nửa", "Giờ", "Phút", "Ngày"], correctAnswer: "Rưỡi, nửa", hskLevel: 2 },

  // HSK 3 - Vocabulary
  { id: "pt_v15", type: "vocab", category: "Từ vựng HSK 3", prompt: "Chọn nghĩa của 同事", options: ["Đồng nghiệp", "Bạn học", "Sếp", "Gia đình"], correctAnswer: "Đồng nghiệp", hskLevel: 3 },
  { id: "pt_v16", type: "vocab", category: "Từ vựng HSK 3", prompt: "Chọn hanzi đúng cho 'bǐjiào'", options: ["比较", "比赛", "办公", "帮助"], correctAnswer: "比较", hskLevel: 3 },
  { id: "pt_v17", type: "vocab", category: "Từ vựng HSK 3", prompt: "Chọn nghĩa của 最", options: ["Nhất", "Hơn", "Khá", "Cũng"], correctAnswer: "Nhất", hskLevel: 3 },
  { id: "pt_v18", type: "vocab", category: "Từ vựng HSK 3", prompt: "高兴 có nghĩa là gì?", options: ["Vui vẻ", "Buồn", "Lo lắng", "Tức giận"], correctAnswer: "Vui vẻ", hskLevel: 3 },

  // HSK 4 - Vocabulary
  { id: "pt_v19", type: "vocab", category: "Từ vựng HSK 4", prompt: "Chọn nghĩa của 关系", options: ["Quan hệ", "Tình bạn", "Công việc", "Gia đình"], correctAnswer: "Quan hệ", hskLevel: 4 },
  { id: "pt_v20", type: "vocab", category: "Từ vựng HSK 4", prompt: "Chọn nghĩa của 帮助", options: ["Giúp đỡ", "Cảm ơn", "Xin lỗi", "Mời"], correctAnswer: "Giúp đỡ", hskLevel: 4 },

  // Grammar - HSK 1-2
  { id: "pt_g1", type: "grammar", category: "Ngữ pháp HSK 1", prompt: "Chọn câu đúng: 'Bạn khỏe không?'", options: ["你好。", "你好吗？", "你是谁？", "你多大？"], correctAnswer: "你好吗？", hskLevel: 1 },
  { id: "pt_g2", type: "grammar", category: "Ngữ pháp HSK 1", prompt: "Chọn cấu trúc câu đúng với 是", options: ["我是学生。", "我学生是。", "是我学生。", "学生我是。"], correctAnswer: "我是学生。", hskLevel: 1 },
  { id: "pt_g3", type: "grammar", category: "Ngữ pháp HSK 1", prompt: "Chọn cách dùng đúng của 不", options: ["我不好。", "不我好。", "我好不。", "好我不。"], correctAnswer: "我不好。", hskLevel: 1 },
  { id: "pt_g4", type: "grammar", category: "Ngữ pháp HSK 2", prompt: "Chọn câu hỏi giờ đúng", options: ["现在几点？", "现在什么？", "现在多？", "现在哪里？"], correctAnswer: "现在几点？", hskLevel: 2 },
  { id: "pt_g5", type: "grammar", category: "Ngữ pháp HSK 2", prompt: "Sắp xếp đúng: 我 + 喜欢 + 看书", options: ["我喜欢看书", "看书喜欢我", "喜欢看书我", "我看书喜欢"], correctAnswer: "我喜欢看书", hskLevel: 2 },

  // Grammar - HSK 3
  { id: "pt_g6", type: "grammar", category: "Ngữ pháp HSK 3", prompt: "Chọn câu so sánh đúng với 比", options: ["我比他高。", "我高比他。", "比高我他。", "他比我高。"], correctAnswer: "我比他高。", hskLevel: 3 },
  { id: "pt_g7", type: "grammar", category: "Ngữ pháp HSK 3", prompt: "Chọn câu đúng với 最", options: ["她最漂亮。", "她最很漂亮。", "她很最漂亮。", "最漂亮她。"], correctAnswer: "她最漂亮。", hskLevel: 3 },

  // Reading - HSK 1-2
  { id: "pt_r1", type: "reading", category: "Đọc hiểu HSK 1", prompt: "Đọc: '他是老师。' Chọn đúng:", passage: "他是老师。", options: ["Anh ấy là giáo viên.", "Anh ấy là học sinh.", "Anh ấy là bác sĩ.", "Anh ấy là bạn."], correctAnswer: "Anh ấy là giáo viên.", hskLevel: 1 },
  { id: "pt_r2", type: "reading", category: "Đọc hiểu HSK 1", prompt: "Đọc: '我十岁。' Chọn đúng:", passage: "我十岁。", options: ["Tôi 10 tuổi.", "Tôi 20 tuổi.", "Tôi 5 tuổi.", "Tôi 15 tuổi."], correctAnswer: "Tôi 10 tuổi.", hskLevel: 1 },
  { id: "pt_r3", type: "reading", category: "Đọc hiểu HSK 2", prompt: "Đọc: '我每天八点上班，五点回家。' Chọn đúng:", passage: "我每天八点上班，五点回家。", options: ["Tôi đi làm lúc 8h, về nhà lúc 5h.", "Tôi đi học lúc 8h.", "Tôi thức dậy lúc 8h.", "Tôi đi làm lúc 5h."], correctAnswer: "Tôi đi làm lúc 8h, về nhà lúc 5h.", hskLevel: 2 },
  { id: "pt_r4", type: "reading", category: "Đọc hiểu HSK 3", prompt: "Đọc: '今天比昨天热，所以我穿很少。' Chọn đúng:", passage: "今天比昨天热，所以我穿很少。", options: ["Hôm nay nóng hơn hôm qua.", "Hôm nay lạnh hơn hôm qua.", "Hôm nay không nóng.", "Hôm qua và hôm nay đều nóng."], correctAnswer: "Hôm nay nóng hơn hôm qua.", hskLevel: 3 },
];

export function calculatePlacementResult(
  answers: Record<string, boolean>
) {
  const questions = placementTestQuestions;
  const totalQuestions = questions.length;
  const correctCount = Object.values(answers).filter(Boolean).length;

  const byLevel: Record<number, { correct: number; total: number }> = {};
  const byType: Record<string, { correct: number; total: number }> = {};

  questions.forEach((q) => {
    if (!byLevel[q.hskLevel]) byLevel[q.hskLevel] = { correct: 0, total: 0 };
    if (!byType[q.type]) byType[q.type] = { correct: 0, total: 0 };

    byLevel[q.hskLevel].total++;
    byType[q.type].total++;

    if (answers[q.id]) {
      byLevel[q.hskLevel].correct++;
      byType[q.type].correct++;
    }
  });

  let estimatedLevel = 1;
  for (let level = 4; level >= 1; level--) {
    const lvl = byLevel[level];
    if (lvl && lvl.total > 0 && lvl.correct / lvl.total >= 0.6) {
      estimatedLevel = level;
      break;
    }
  }

  let suggestedReviewHsk: number | null = null;
  if (estimatedLevel > 1) {
    const prevLevel = byLevel[estimatedLevel - 1];
    if (prevLevel && prevLevel.correct / prevLevel.total < 0.7) {
      suggestedReviewHsk = estimatedLevel - 1;
    }
  }

  const weakAreas: string[] = [];
  for (const [type, data] of Object.entries(byType)) {
    if (data.total > 0 && data.correct / data.total < 0.6) {
      const typeNames: Record<string, string> = {
        vocab: "Từ vựng",
        grammar: "Ngữ pháp",
        reading: "Đọc hiểu",
        listening: "Nghe hiểu",
      };
      weakAreas.push(typeNames[type] || type);
    }
  }

  return {
    estimatedHskLevel: estimatedLevel,
    vocabPercent: byType.vocab
      ? Math.round((byType.vocab.correct / byType.vocab.total) * 100)
      : 0,
    grammarPercent: byType.grammar
      ? Math.round((byType.grammar.correct / byType.grammar.total) * 100)
      : 0,
    readingPercent: byType.reading
      ? Math.round((byType.reading.correct / byType.reading.total) * 100)
      : 0,
    listeningPercent: byType.listening
      ? Math.round((byType.listening.correct / byType.listening.total) * 100)
      : 0,
    overallPercent: Math.round((correctCount / totalQuestions) * 100),
    weakAreas,
    suggestedStartHsk: estimatedLevel,
    suggestedReviewHsk,
  };
}
