/**
 * Tên phụ nữ theo lối thời Lý - Trần: tên chữ Hán Việt hai âm, nhiều chữ nhà Phật (Phật, Diệu, Liên)
 * và chữ quý (Ngọc, Kim, Kiều, Oanh, Bảo). Ví dụ có thật: công chúa Lý Phật Kim, Lý Ngọc Kiều (ni sư Diệu Nhân),
 * Lý Kiều Oanh, hoàng hậu Thiên Cảm, Kim Thiên hoàng thái hậu (Mai thị), Thuận Trinh phu nhân.
 * Tên thật của người trong sử KHÔNG dùng lại; dưới đây là tên tự đặt theo đúng lối ấy.
 * Trong cung gọi theo họ kèm "thị" (Diệp thị) hoặc theo tước (phu nhân, phi, tần).
 */
import type { OriginK } from './origins';

export interface Name {
  n: string;
  /** nghĩa chữ Hán */
  y: string;
}

/** con gái nhà thường thời ấy cũng mang tên chữ, hay lấy chữ nhà Phật */
const DAN: Name[] = [
  { n: 'Diệu Liên', y: 'hoa sen nhiệm màu' },
  { n: 'Ngọc Hoàn', y: 'vòng ngọc' },
  { n: 'Kiều Nga', y: 'dáng đẹp như ngài' },
  { n: 'Bảo Châu', y: 'viên ngọc quý' },
  { n: 'Thanh Liên', y: 'sen xanh' },
  { n: 'Nguyệt Ánh', y: 'ánh trăng' },
  { n: 'Phương Dung', y: 'dung nhan thơm' },
  { n: 'Tú Uyên', y: 'đẹp và sâu lắng' },
  { n: 'Bích Hà', y: 'ráng ngọc biếc' },
  { n: 'Diệu Hương', y: 'hương nhiệm màu' },
];
/** con nhà quan: chữ trang trọng, chữ "Ngọc", "Uyển", "Nghi" */
const QUY: Name[] = [
  { n: 'Uyển Nghi', y: 'dịu dàng, đoan chính' },
  { n: 'Ngọc Khuê', y: 'ngọc khuê, vật quý của bậc vương hầu' },
  { n: 'Thiên Hương', y: 'hương trời' },
  { n: 'Kiều Diễm', y: 'xinh đẹp rực rỡ' },
  { n: 'Bảo Thoa', y: 'cây trâm quý' },
  { n: 'Minh Nguyệt', y: 'trăng sáng' },
  { n: 'Chiêu Dung', y: 'dung nhan sáng tỏ' },
  { n: 'Thục Trinh', y: 'hiền thục, trinh bạch' },
];
/** cung nữ: tên mùa và hoa, kiểu tên người hầu trong cung */
const CUNG: Name[] = [
  { n: 'Xuân Đào', y: 'hoa đào mùa xuân' },
  { n: 'Thu Nguyệt', y: 'trăng thu' },
  { n: 'Hạ Liên', y: 'sen mùa hạ' },
  { n: 'Đông Mai', y: 'mai mùa đông' },
  { n: 'Thúy Liễu', y: 'liễu biếc' },
  { n: 'Tiểu Hoàn', y: 'cái vòng nhỏ' },
  { n: 'Hồng Ngọc', y: 'ngọc đỏ' },
  { n: 'Lục Bình', y: 'cánh bèo trôi' },
];
/** công chúa triều trước: tên có chữ "Phụng", "Kim", chữ nhà Phật */
const CHUA: Name[] = [
  { n: 'Phụng Nghi', y: 'dáng phượng, đoan nghi' },
  { n: 'Kim Thiền', y: 've vàng, vật báu nhà Phật' },
  { n: 'Ngọc Lâm', y: 'rừng ngọc' },
  { n: 'Diệu Thanh', y: 'trong và nhiệm màu' },
  { n: 'An Hoa', y: 'hoa an lành' },
  { n: 'Bảo Hoàng', y: 'phượng mái quý' },
];

export const NAMES: Record<OriginK, Name[]> = { dan: DAN, quan: QUY, cung: CUNG, chua: CHUA };
export const DEFAULT_NAME: Record<OriginK, string> = { dan: 'Diệu Liên', quan: 'Uyển Nghi', cung: 'Xuân Đào', chua: 'Phụng Nghi' };

/** gợi ý vài tên theo đường vào cung, đổi theo lượt */
export function suggestNames(origin: OriginK, seed: number, n = 4): Name[] {
  const pool = NAMES[origin];
  const out: Name[] = [];
  let s = seed >>> 0;
  while (out.length < Math.min(n, pool.length)) {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    const v = pool[s % pool.length];
    if (!out.includes(v)) out.push(v);
  }
  return out;
}
