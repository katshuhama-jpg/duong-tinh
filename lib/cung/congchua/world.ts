/**
 * Phần Công chúa triều trước: chương, tên vai, bậc hiện trên đầu trang, câu dẫn thời gian.
 * Nàng họ Lạc, con gái Thuận đế (vua cuối triều Hưng), sinh 6 năm trước niên hiệu Hưng Bình.
 * Chương 1 là Hưng Bình năm 14 (nàng 20 tuổi), chương 10 là năm 24 (nàng 30 tuổi).
 * Kinh thánh: claude/kinh-thanh-phan-4-cong-chua.md (trong project).
 */
import type { CastK, Life } from '../types';
import type { Rank } from '../world';

export const CC_ERA = 'Hưng Bình';
/** năm Hưng Bình lúc nàng hai mươi tuổi (chương 1) */
export const CC_YEAR0 = 14;
export const CC_AGE0 = 20;

/** mo: tháng trôi mỗi thẻ (0: cả chương diễn ra liền mạch). age0: tuổi nàng đầu chương. */
export const CC_CHAPTERS: { n: number; t: string; smalls: number; epi: string; hook: string; age0?: number; mo: number }[] = [
  { n: 1, t: 'Chiếc gối', smalls: 0, mo: 0, epi: 'Người cũ muốn bạn làm cờ. Triều mới muốn bạn làm con tin.', hook: 'Ba đêm nữa, người ta lại khám viện.' },
  { n: 2, t: 'Hai mang', smalls: 0, mo: 0, age0: 21, epi: 'Mỗi kỳ trăng một cái tên. Tên nào cũng là một người.', hook: 'Cái giá của kỳ trăng trước đã đến.' },
  { n: 3, t: 'Giỗ cha', smalls: 0, mo: 0, age0: 22, epi: 'Mười bốn năm, bạn chưa một lần được thắp nhang cho cha.', hook: 'Bảy ngày đường về chùa Lũng Vân.' },
  { n: 4, t: 'Sổ của Quế', smalls: 0, mo: 0, age0: 23, epi: 'Ai trong cung cũng có tên trong một cuốn sổ.', hook: 'Thái hậu khó qua mùa đông.' },
  { n: 5, t: 'Tiếng giáo ngoài cổng', smalls: 0, mo: 0, age0: 24, epi: 'Kẻ thù lớn nhất chết rồi, và mọi thứ tệ hơn.', hook: 'Đêm rằm tháng tám, năm canh.' },
  { n: 6, t: 'Ngọn cờ', smalls: 0, mo: 0, age0: 25, epi: 'Ai cũng muốn cầm cái danh của bạn.', hook: 'Một khay trà, và một bàn tay biết run.' },
  { n: 7, t: 'Chén trà', smalls: 0, mo: 0, age0: 26, epi: 'Có những dấu vết được bày sẵn cho người muốn tin.', hook: 'Gói trà trong rương vú Hòe.' },
  { n: 8, t: 'Hạ cờ', smalls: 0, mo: 0, age0: 27, epi: 'Chỉ hạ được một kẻ trước. Kẻ còn lại mạnh lên.', hook: 'Người che cho bạn cũng là người dùng bạn.' },
  { n: 9, t: 'Đêm cửa tây', smalls: 0, mo: 0, age0: 29, epi: 'Cùng một cánh cửa, lần thứ hai.', hook: 'Một đêm, và người phản cuối cùng.' },
  { n: 10, t: 'Chín bậc', smalls: 0, mo: 0, age0: 30, epi: 'Một chiếu, hai triều.', hook: 'Ấn trong tay bạn.' },
];

export const CC_CAST_NAME: Partial<Record<CastK, string>> = {
  vua: 'Hoàng thượng',
  thaihau: 'Thái hậu',
  hoanghau: 'Hoàng hậu',
  kiem: 'Chưởng sự Kiệm',
  huu: 'Hoàng trưởng tử',
  mo: 'Sư cô',
  dao: 'Ma ma giặt áo',
  tam: 'Tằm',
  anvuong: 'An vương',
  doquyphi: 'Đỗ Quý phi',
  ontung: 'Ôn Tùng',
  onkha: 'Ôn Kha',
  laocan: 'Lão Cẩn',
  binh: 'Bình',
  duyen: 'Nữ sử Duyên',
  trac: 'Cai đội Trác',
  sao: 'Sáo',
  maluu: 'Ma ma Lựu',
  baynua: 'Bảy Nứa',
  khuong: 'Thái y Khương',
  thuande: 'Thuận đế',
  vuhoe: 'Vú Hòe',
  sutinh: 'Sư Tịnh',
  ongcu: 'Ông Cù',
  babep: 'Bà bếp',
  cungnu: 'Cung nữ',
  tuong: 'Đầu mục',
};

/** đường đã chọn sau đêm đảo chính */
export const DUONG = ['d_phuc', 'd_trieu', 'd_tu', 'd_di', 'd_an'] as const;

const R = (t: string, giai: string, o: string, ao: string, vien: string, phuong = 0): Rank => ({ t, giai, luong: 300, gao: 100, o, phuong, ao, vien });
/** bậc hiện trên đầu trang: theo chỗ nàng đang đứng, không theo lương */
export function ccRank(l: Pick<Life, 'flags' | 'chapter'>): Rank {
  const f = (x: string) => l.flags.includes(x);
  if (f('cc_hau')) return R('Hoàng hậu', 'Mẫu nghi', 'cung Ngọc Khuê', '#a8281d', '#d9a441', 9);
  if (f('cc_vuong')) return R('Nữ vương nước Hưng', 'Nước Hưng', 'cố đô Hưng Thành', '#f1ead8', '#8f2419', 7);
  if (f('cc_rem')) return R('Người sau rèm', 'Sau rèm', 'điện Hy Quang', '#2a1d14', '#d9a441', 5);
  if (f('cc_giat')) return R('Người giặt áo', 'Không phẩm', 'viện giặt, chỗ thấp nhất trong cung', '#8a8f7a', '#5a5f4a');
  if (l.chapter >= 6) {
    if (f('d_phuc')) return R('Công chúa nước Hưng', 'Áo trắng', 'trại Thạch Lĩnh', '#f1ead8', '#8f2419', 1);
    if (f('d_trieu')) return R('Tiệp dư', 'Lục giai', 'cung cũ, dưới mắt An vương', '#c46a4a', '#8a4024');
    if (f('d_tu')) return R('Công chúa nước Hưng', 'Ngọn cờ', 'điện Hy Quang, phía sau', '#f1ead8', '#2a1d14', 1);
    if (f('d_di')) return R('Người ở nhờ', 'Ngoài cung', 'chùa biển', '#8a7a62', '#4a3a2a');
    return R('Công chúa nước Hưng', 'Ngọn cờ', 'trong tay An vương', '#f1ead8', '#5a4a3a');
  }
  return R('Tiệp dư', 'Lục giai', 'viện Nghi Thu', '#c46a4a', '#8a4024');
}

/** câu dẫn thời gian trước lựa chọn: đo bằng năm làm con tin và việc đang chờ */
export function ccWhen(cardId: string, chapter: number, age: number, flags: string[]): string {
  const f = (x: string) => flags.includes(x);
  if (chapter === 1) return cardId.startsWith('k1_trang') || cardId === 'k1_gacnui' ? 'Kỳ trăng đầu tiên. Hai bên đều chờ một cái tên.' : 'Mười hai năm làm con tin. Ba đêm nữa người ta lại khám viện.';
  if (chapter === 2) return 'Ba kỳ trăng, ba lần nộp tin. Lần nào cũng có người phải trả.';
  if (chapter === 3) return cardId.startsWith('k3_chua') || cardId.startsWith('k3_tinh') || cardId.startsWith('k3_bia') || cardId.startsWith('k3_dem') || cardId === 'k3_treo' ? 'Mười bốn năm, lần đầu bạn đứng trước mộ cha.' : 'Bảy ngày đường đến chùa Lũng Vân.';
  if (chapter === 4) return f('cc_giat') ? 'Bạn ở dưới đáy. Thái hậu không qua nổi mùa đông này.' : 'Thái hậu ốm. Ai trong cung cũng có tên trong cuốn sổ ấy.';
  if (chapter === 5) return 'Đêm rằm tháng tám. Trời sáng là mọi thứ đã khác.';
  if (chapter === 6) return f('d_di') ? 'Một năm ngoài cung. Thuốc giải không có ở đây.' : 'Một năm sau đêm ấy. Bạn là ngọn cờ trong tay người khác.';
  if (chapter === 7) return 'Có người đã xếp sẵn dấu vết cho bạn đọc.';
  if (chapter === 8) return 'Hai kẻ thù, một nhát dao. Chỉ hạ được một kẻ trước.';
  if (chapter === 9) return 'Cùng cánh cửa tây, lần thứ hai.';
  return `${Math.floor(age) - 8} năm từ ngày bạn vào cung làm con tin. Bạn ${Math.floor(age)} tuổi.`;
}
