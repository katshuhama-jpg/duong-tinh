/** Phần Con tin họ Nghiêm: chương, tên vai, kết cục chỉ số. */
import type { CastK, NumK } from '../types';

export const NG_ERA = 'Hưng Bình';
/** năm Hưng Bình lúc nữ chính vào cung (18 tuổi) */
export const NG_YEAR0 = 9;

export const NG_CHAPTERS: { n: number; t: string; smalls: number; epi: string; hook: string }[] = [
  { n: 1, t: 'Viện của chị', smalls: 8, epi: 'Người ta xếp em vào đúng căn viện chị từng ở. Như thể chưa từng có ai chết ở đây.', hook: 'Đêm đầu tiên, có tiếng gõ vào vách từ phía bên kia.' },
  { n: 2, t: 'Sổ đến thăm', smalls: 8, epi: 'Trong cung, một đêm được gọi là một dòng mực. Có những dòng mực biết biến mất.', hook: 'Hoàng thượng hỏi một câu không phải về chuyện chăn gối.' },
  { n: 3, t: 'Thai', smalls: 7, epi: 'Có con là có chỗ đứng. Cũng là có thêm một chén thuốc phải nhìn hai lần.', hook: 'Thái y bắt mạch xong, tay run đến mức làm rơi khăn.' },
  { n: 4, t: 'Hai đứa trẻ', smalls: 7, epi: 'Một chiếc ghế ở Đông cung, và hai đứa trẻ không có lỗi gì.', hook: '' },
  { n: 5, t: 'Ba ngày', smalls: 3, epi: 'Mặt trời lặn thì bóng tối chia nhau.', hook: '' },
  { n: 6, t: 'Cha', smalls: 6, epi: 'Người dạy em đọc án, giờ là người trong án.', hook: '' },
  { n: 7, t: 'Sổ án cuối', smalls: 5, epi: 'Hồ sơ nào rồi cũng phải khép, bằng lửa hoặc bằng mực.', hook: '' },
];

export const NG_CAST_NAME: Partial<Record<CastK, string>> = {
  thanh: 'Chị Thanh',
  cha: 'Cha',
  thaisu: 'Thái sư Hà',
  lymac: 'Ngự sử Lý Mặc',
  kiem: 'Chưởng sự Kiệm',
  thaiy: 'Thái y Thẩm',
  nhumau: 'Nhũ mẫu Tần',
  luavang: 'Lụa Vàng',
  uyennhu: 'Quý phi Hà',
  huu: 'Hoàng trưởng tử',
  balao: 'Bà lão bán chè',
  dao: 'Cung nữ quét lá',
  mo: 'Sư cô',
  vua: 'Hoàng thượng',
  thaihau: 'Thái hậu',
  hoanghau: 'Hoàng hậu',
  con: 'Hoàng tử Cảnh',
  cungnu: 'Cung nữ',
};

/** chỉ số chạm đáy (Hiểm thì chạm đỉnh): kết cục riêng của phần này */
export const NG_ZERO_END: Partial<Record<NumK, string>> = { an: 'n_119', duc: 'n_120', the: 'n_121', muu: 'n_122', sac: 'n_123' };
export const NG_HIEM_END = 'n_124';

/** mười hai sự thật về cái chết của chị Thanh (cờ su1..su12) */
export const TRUTHS: string[] = [
  'Chị Thanh không chết vì bệnh',
  'Chị từng viết thư xin cha mở một vụ án',
  'Sổ đến thăm năm Tân Dậu bị xóa một đêm',
  'Một cung nữ hầu trà tên Đào mang thai rồi biến mất',
  'Đêm Tân Dậu, chị trực ở cung Hoàng hậu',
  'Sổ thuốc năm Tân Dậu có một dòng nhòe: Con... mất',
  'Có một mộ nhỏ không bia sau vườn cung Hoàng hậu',
  'Hoàng trưởng tử hát một câu ru không ai trong cung dạy',
  'Cha trả lời chị bằng một chữ: Im',
  'Thái hậu gặp riêng cha một đêm, trước ngày cha lên Thượng thư',
  'Thái hậu ra lệnh, Kiệm chuyển thuốc, Thái y kê đơn',
  'Đào còn sống. Chiếc khăn ở chùa biển',
];
