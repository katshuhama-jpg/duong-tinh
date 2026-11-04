/**
 * Tên phụ nữ thời xưa, để gợi ý tên nhân vật.
 * Quy ước lấy từ sử và tư liệu (xem ghi chú từng nhóm):
 * - Gần như mọi phụ nữ đều có chữ đệm "Thị" (氏, gốc nghĩa là dòng họ); người ta gọi theo họ kèm "thị": "Diệp thị".
 * - Con gái nhà quyền quý thời Lê - Trịnh hay mang thêm chữ "Ngọc" sau "Thị" (Trịnh Thị Ngọc Trúc, Lê Thị Ngọc Duyên, Ngô Thị Ngọc Dao).
 * - Tên con gái thường là hoa, cây, vật đẹp (Mai, Cúc, Lan, Đào); nhà Nguyễn kiêng húy nên ở Huế "Hoa" đọc thành "Huê", "Hồng" thành "Hường".
 * - Trong nhà, ngoài làng ít gọi tên thật, mà gọi theo thứ (Cả, Hai, Ba) hoặc tên tục.
 * Tên thật của các bà hoàng hậu, phi tần có trong sử không dùng cho nhân vật, chỉ dùng tên riêng (phần cuối) phổ biến.
 */

/** con gái làng: tên cây cỏ, đồ quen trong nhà */
export const DAN_NU = ['Nụ', 'Mận', 'Đào', 'Sen', 'Lụa', 'Gấm', 'Thắm', 'Na', 'Chè', 'Hến', 'Cúc', 'Mai', 'Lài', 'Huê', 'Hường'];
/** con nhà quan: tên Hán Việt, nhiều khi kèm chữ "Ngọc" */
export const QUY_NU = ['Ngọc Khuê', 'Ngọc Lâm', 'Ngọc Hoàn', 'Ngọc Thanh', 'Ngọc Chi', 'Thục Nghi', 'Uyển', 'Trinh', 'Doan', 'Nghi', 'Diễm', 'Khanh'];
/** tên tục trong nhà (gọi ở nhà, không ghi sổ) */
export const TEN_TUC = ['Mít', 'Bống', 'Cả', 'Hai', 'Ba', 'Út', 'Gái'];

/** ý nghĩa ngắn, hiện khi gợi ý */
export const NAME_NOTE: Record<string, string> = {
  Nụ: 'nụ hoa chưa nở',
  Mận: 'quả mận đầu hè',
  Đào: 'hoa đào ngày Tết',
  Sen: 'hoa sen ao làng',
  Lụa: 'tấm lụa mềm',
  Gấm: 'gấm thêu, quý',
  Thắm: 'màu đỏ thắm',
  Na: 'quả na',
  Chè: 'cây chè nhà trồng',
  Hến: 'con hến ngoài sông',
  Cúc: 'hoa cúc',
  Mai: 'hoa mai',
  Lài: 'hoa lài (nhài)',
  Huê: 'hoa (người Huế xưa kiêng chữ Hoa)',
  Hường: 'hồng (đọc tránh húy)',
};

/** gợi ý vài tên con gái làng, đổi theo lượt */
export function suggestNames(seed: number, n = 5) {
  const out: string[] = [];
  let s = seed >>> 0;
  while (out.length < n) {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    const v = DAN_NU[s % DAN_NU.length];
    if (!out.includes(v)) out.push(v);
  }
  return out;
}
