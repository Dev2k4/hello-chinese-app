# Hệ thống Cảnh Giới & Tầng (Tier System)

## Triết lý thiết kế

Người học không thể "học một mạch" lên tới đỉnh. Mỗi cảnh giới là một cột mốc,
mỗi tầng là một checkpoint nhỏ. Hệ thống được thiết kế để:

1. **Tạo cảm giác tiến bộ rõ rệt** sau mỗi checkpoint
2. **Không block người dùng** — luôn có bài để học, tier là mục tiêu không phải rào cản
3. **Dễ mở rộng** — realm cao hơn có thể có tier cấu trúc phức tạp hơn

## Kiến trúc 2 vòng tuần hoàn

```
┌─────────────────────────────────────────────────┐
│                  VÒNG 1: HỌC                    │
│  Người dùng học bài → tích XP + nhớ từ          │
│  Mỗi bài học xong: +10 XP / câu đúng            │
│  Học đủ bài trong tầng → mở khóa Tier Test      │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│               VÒNG 2: ĐỘT PHÁ (Tier)            │
│  Bài kiểm tra checkpoint                         │
│  Nguồn câu hỏi: từ tất cả bài trong tầng này     │
│                                                   │
│  ┌─────────────┐        ┌──────────────────┐     │
│  │ ✅ Qua 80%  │        │ ❌ Trượt         │     │
│  │ Lên tầng mới│        │ Phòng luyện tập   │     │
│  │ Mở khóa bài │        │ Test lại tự do    │     │
│  └─────────────┘        └──────────────────┘     │
└──────────────────────────────────────────────────┘
```

## Flow chi tiết

### 1. Mở khóa

- **Ban đầu**: mở khóa 2 bài đầu tiên của cảnh giới
- **Mỗi khi qua Tier**: mở khóa các bài tiếp theo (số bài mở khóa có thể cấu hình)
- **Mỗi khi qua Realm**: mở khóa cảnh giới tiếp theo, mở khóa NPC mới

### 2. Học bài

- Mỗi bài gồm 3 tab: Từ vựng → Ngữ pháp → Luyện tập
- Hoàn thành bài → nhận XP
- XP tích lũy dùng để "đột phá" tầng

### 3. Tier Test (Đột Phá)

- **Mở khóa khi**: học đủ số bài yêu cầu trong tầng
- **Số câu hỏi**: 5-10 câu, random từ vocabulary + grammar của các bài trong tầng
- **Điều kiện qua**: ≥ 80% đúng
- **Phần thưởng**: +50 XP + mở khóa bài mới + cutscene NPC

### 4. Phòng luyện (khi trượt)

- Không giới hạn số lần test
- Mỗi lần vào: random câu hỏi lại từ pool
- Mục tiêu: ôn lại từ đã học, không phải farm XP

## Map Realm 1: Phàm Nhân Cảnh (HSK 1)

DB: 11 bài, 500 từ, 70 ngữ pháp

| Tier | Mở khóa khi học | Bài được mở | Số từ | Loại | Boss NPC |
|------|-----------------|-------------|-------|------|----------|
| 1 | 2 bài đầu | Bài 1, 2 | ~20 | checkpoint | Đồng Tử |
| 2 | Qua Tier 1 | Bài 3, 4 | ~20 | checkpoint | Đồng Tử |
| 3 | Qua Tier 2 | Bài 5 | ~15 | checkpoint | Đồng Tử |
| 4 | Qua Tier 3 | Bài 6, 7 | ~25 | checkpoint | Đồng Tử |
| 5 | Qua Tier 4 | Bài 8 | ~20 | checkpoint | Đồng Tử |
| 6 | Qua Tier 5 | Bài 9, 10 | ~25 | checkpoint | Đồng Tử |
| 7 | Qua Tier 6 | Bài 11 | ~20 | checkpoint | Đồng Tử |
| 8 | Qua Tier 7 | — (ôn tập) | ~50 | tổng hợp | Đồng Tử |
| 9 | Qua Tier 8 | Tất cả | ~500 | **Đột Phá Cảnh** | Đồng Tử → Lục Tỷ |

## Cấu trúc dữ liệu (Zustand store)

```typescript
interface TierProgress {
  realmId: number;           // cảnh giới hiện tại
  currentTier: number;       // tier đang ở (1-9)
  completedTiers: number[];  // danh sách tier đã qua
  unlockedLessons: string[]; // lesson IDs đã mở khóa
  breakthroughAttempts: Record<string, number>; // số lần test/tier
  xpInTier: number;          // XP tích lũy trong tier hiện tại
}

// Actions
- completeLesson(lessonId): tích XP, mở khóa tier test nếu đủ
- startBreakthrough(tierId): bắt đầu test
- completeBreakthrough(tierId, passed): nếu pass → lên tier, mở bài
- practiceTest(tierId): vào phòng luyện (không ảnh hưởng progress)
```

## Map cho các Realm cao hơn (tương lai)

Các realm cao hơn có nhiều từ hơn, nên tier sẽ chia nhỏ hơn:

| Realm | HSK | Từ | Số tier | Cấu trúc |
|-------|-----|-----|---------|----------|
| Phàm Nhân | 1 | 500 | 9 | 9 tier đơn |
| Luyện Khí | 2 | 772 | 9 | 9 tier đơn |
| Trúc Cơ | 3 | 973 | 9 × 3 | 3 giai đoạn × 3 tier = 9 |
| Kết Đan | 4 | 1000 | 9 × 3 | 3 giai đoạn × 3 tier = 9 |
| Nguyên Anh | 5 | 1071 | 9 × 3 | 3 giai đoạn × 3 tier = 9 |
| Hóa Thần | 6 | 1140 | 9 × 5 | 5 giai đoạn × (2-2-2-2-1) |
| Đại Thừa | 7 | 5631 | 9 × 9 | 9 giai đoạn × 9 tier |

## UI Components

### TierContextBar
Hiển thị trên màn hình bài học:
```
[Phàm Nhân Cảnh] ─── ●●○○○○○○○ ─── [Tier 2/9]
                    ↑ 2/9 tier đã qua
```

### BreakthroughModal
Modal khi đủ điều kiện đột phá:
```
⚡ ĐÃ ĐỦ LINH LỰC!
   Ngươi có muốn đột phá Tầng 2 không?
   
   [Vào Phòng Luyện]  [Đột Phá Ngay]
```

### TierResult
Kết quả sau khi đột phá:
```
✅ THÔNG QUA!         ❌ THẤT BẠI!
   +50 XP                Đừng nản!
   Mở khóa bài mới       Vào phòng luyện nhé
   [Tiếp tục học]        [Luyện tập]
```

## Ghi chú cho Dev

- Tier test dùng lại question pool từ các lesson trong tier đó
- Question type: multiple_choice, meaning_select, hanzi_select, pinyin_input
- Không thêm question mới — tận dụng câu hỏi có sẵn
- Phòng luyện: random subset, ko lưu kết quả, ko ảnh hưởng progress
- Cutscene NPC chỉ chạy **lần đầu** qua tier
