/** Phần Cung nga giặt áo: chương, tên vai, bậc. Hựu sinh năm Hưng Bình thứ 3 (đêm Tân Dậu); lễ đội mũ năm thứ 18. */
import type { CastK } from '../types';

export const CN_ERA = 'Hưng Bình';
/** năm Hưng Bình lúc Đào mười tám tuổi (đêm Tân Dậu) */
export const CN_YEAR0 = 3;
export const CN_AGE0 = 18;

/**
 * mo: số tháng trôi qua mỗi thẻ nhỏ (0 = cả chương diễn ra trong một đêm/vài ngày, thẻ không làm tuổi nhích).
 * age0: tuổi Đào đầu chương (nhảy thời gian giữa các chương).
 */
export const CN_CHAPTERS: { n: number; t: string; smalls: number; epi: string; hook: string; age0?: number; mo: number }[] = [
  { n: 1, t: 'Gian sau', smalls: 0, mo: 0, epi: 'Có một chiếc áo, người ta giặt nó nhiều năm. Không ai nhớ bàn tay ấy là của ai.', hook: 'Đêm Tân Dậu, mưa, và không ai sang gian sau.' },
  { n: 2, t: 'Sổ giặt', smalls: 6, mo: 0, epi: 'Ở đây, đứa nào ngẩng đầu lên là đứa đó chết trước.', hook: 'Ma ma Quế hỏi một câu không liên quan tới tay nghề: ngươi có nhận ra áo của mình không.' },
  { n: 3, t: 'Hai người mẹ', smalls: 5, mo: 0, epi: 'Người cứu nàng và người cướp con nàng, có khi cùng đứng trong một căn phòng.', hook: 'Một đêm nấu nước tro, ba canh, và hai người đàn bà cùng muốn nàng tin mình.' },
  { n: 4, t: 'Giữa mùa', smalls: 6, mo: 1, age0: 21, epi: 'Một đêm đèn lồng nhẹ như chưa từng có chuyện gì.', hook: 'Hội đèn rằm, và một nhánh hoa nhài.' },
  { n: 5, t: 'Mùa hạn', smalls: 5, mo: 0, age0: 23, epi: 'Mỗi cái tên ghi lên là một người nàng sống chung.', hook: 'Thái phi Phạm chết, và Thái hậu dựng lại lệ chôn theo.' },
  { n: 6, t: 'Cửa sông', smalls: 4, mo: 0, epi: 'Ta không đến bắt ngươi. Ta đến để nghe ngươi chọn.', hook: 'Cánh cửa phòng Hựu bỏ ngỏ.' },
  { n: 7, t: 'Bờ bên kia', smalls: 5, mo: 0, age0: 24, epi: 'Hồ sơ nào rồi cũng phải khép.', hook: 'Một năm sau ngày nàng ra cung.' },
];

/** bậc của Đào, hiện qua cách người ta gọi bà, chỗ bà đứng, vật bà cầm. Không có áo mới. */
export const CN_BAC: { t: string; o: string; goi: string; cam: string }[] = [
  { t: 'Con giặt', o: 'sân giặt, chỗ thấp nhất trong cung', goi: 'Nhài kia', cam: 'chậu và vồ giặt' },
  { t: 'Người đọc áo', o: 'gian áo cung Hoàng hậu', goi: 'chị Nhài', cam: 'mảnh vải thử' },
  { t: 'Người kín miệng', o: 'gian riêng gần ma ma Quế', goi: 'cô Nhài', cam: 'khăn thêu chữ' },
  { t: 'Chị cả viện giặt', o: 'chỗ nàng tự chọn ngồi', goi: 'cô nương Nhài', cam: 'quyển sổ nhỏ' },
  { t: 'Người cầm chìa', o: 'cửa bến', goi: 'Đào cô nương', cam: 'chìa cửa' },
];

export const CN_CAST_NAME: Partial<Record<CastK, string>> = {
  dao: 'Đào',
  vua: 'Hoàng thượng',
  kiem: 'Chưởng sự Kiệm',
  thanh: 'Chị Thanh',
  mama: 'Ma ma Quế',
  hoanghau: 'Hoàng hậu',
  thaihau: 'Thái hậu',
  huu: 'Hoàng trưởng tử',
  badovu: 'Bà đỡ',
  bavu: 'Bà vú',
  nhan: 'Nhàn',
  bao: 'Công công Bảo',
  man: 'Chị Mận',
  tuat: 'Tuất',
  thu: 'Bà Thu',
  luc: 'Lục',
  sen: 'Sen',
  badiep: 'Bà Diệp',
  thaiphi: 'Thái phi Phạm',
  hen: 'Hến',
  dang: 'Đăng',
  mo: 'Mơ',
  cungnu: 'Cung nữ',
};
