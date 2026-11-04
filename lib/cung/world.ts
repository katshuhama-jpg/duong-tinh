/**
 * Thế giới hư cấu: triều Khánh Vân, kinh thành Phượng Thành.
 * Khung bậc, lương, nơi ở mô phỏng Cửu giai nhà Nguyễn (Minh Mạng, 1836); tên riêng đều tự đặt.
 */
import type { Ending, NumK } from './types';
import { ENDINGS_VN } from './content/routesVN';
import { ENDINGS_CN } from './content/routesCN';
import { ENDINGS_QUAN } from './content/origin_quan';
import { ENDINGS_CUNG } from './content/origin_cung';
import { ENDINGS_CHUA } from './content/origin_chua';
import { ENDINGS_DAN } from './content/origin_dan';

export const ERA = 'Khánh Vân';
export const CAPITAL = 'Phượng Thành';

/** bậc trong cung: tên, lương năm (quan tiền / phương gạo), nơi ở, số phượng trên mũ, màu áo */
export interface Rank {
  t: string;
  giai: string;
  luong: number;
  gao: number;
  o: string;
  phuong: number;
  ao: string;
  vien: string;
}
export const RANKS: Rank[] = [
  { t: 'Tài nhân', giai: 'Chưa nhập giai', luong: 120, gao: 40, o: 'viện Nghi Lễ', phuong: 0, ao: '#4f7f8a', vien: '#2f5a63' },
  { t: 'Tài nhân', giai: 'Cửu giai', luong: 180, gao: 48, o: 'viện Nghi Xuân', phuong: 0, ao: '#5c8f7a', vien: '#3a6655' },
  { t: 'Mỹ nhân', giai: 'Bát giai', luong: 240, gao: 60, o: 'viện Nghi Xuân', phuong: 0, ao: '#6a9a6e', vien: '#43704a' },
  { t: 'Quý nhân', giai: 'Thất giai', luong: 280, gao: 84, o: 'viện Nghi Hạ', phuong: 0, ao: '#b07a3a', vien: '#7a5220' },
  { t: 'Tiệp dư', giai: 'Lục giai', luong: 300, gao: 100, o: 'viện Nghi Thu', phuong: 0, ao: '#c46a4a', vien: '#8a4024' },
  { t: 'Hòa tần', giai: 'Ngũ giai', luong: 320, gao: 120, o: 'viện Tường Vân', phuong: 1, ao: '#a690c4', vien: '#6a5490' },
  { t: 'Nhu tần', giai: 'Tứ giai', luong: 350, gao: 140, o: 'viện Tường Vân', phuong: 1, ao: '#8f74b8', vien: '#5a4282' },
  { t: 'Đức tần', giai: 'Tam giai', luong: 400, gao: 180, o: 'viện Tường Vân', phuong: 3, ao: '#6b4a92', vien: '#43285e' },
  { t: 'Tĩnh phi', giai: 'Nhị giai', luong: 450, gao: 200, o: 'điện Hy Quang', phuong: 5, ao: '#d98a9a', vien: '#9e4a5e' },
  { t: 'Đoan phi', giai: 'Nhất giai', luong: 500, gao: 250, o: 'điện Hy Quang', phuong: 5, ao: '#b5291f', vien: '#7a1c14' },
  { t: 'Hoàng quý phi', giai: 'Trên cửu giai', luong: 1000, gao: 300, o: 'cung Ngọc Khuê', phuong: 7, ao: '#a8281d', vien: '#d9a441' },
];
/** khi con mình lên ngôi */
export const THAI_PHI: Rank = { t: 'Hoàng thái phi', giai: 'Mẹ vua', luong: 1200, gao: 400, o: 'cung Trường Lạc', phuong: 7, ao: '#c49a3a', vien: '#8f2419' };
export const THAI_HAU: Rank = { t: 'Hoàng thái hậu', giai: 'Mẫu nghi', luong: 1500, gao: 500, o: 'cung Tĩnh Hòa', phuong: 9, ao: '#d9a441', vien: '#8f2419' };

/** các chặng đời */
export const CHAPTERS: { n: number; t: string; smalls: number }[] = [
  { n: 1, t: 'Nhập cung', smalls: 3 },
  { n: 2, t: 'Được gọi', smalls: 5 },
  { n: 3, t: 'Mang thai', smalls: 4 },
  { n: 4, t: 'Ngôi Đông cung', smalls: 5 },
  { n: 5, t: 'Vua băng', smalls: 2 },
  { n: 6, t: 'Buông rèm', smalls: 5 },
  { n: 7, t: 'Tuổi già', smalls: 4 },
];

export const NUM_LABEL: Record<NumK, string> = {
  duc: 'Đức',
  sac: 'Sắc',
  the: 'Thế',
  an: 'Ân sủng',
  muu: 'Mưu',
  vua: 'Nhà vua',
  thaihau: 'Thái hậu',
  hoanghau: 'Hoàng hậu',
  thucphi: 'Thục phi',
  hanh: 'Hạnh',
  phuc: 'Phúc',
  quan: 'Quan văn',
  tuong: 'Võ tướng',
  tien: 'Tiền',
};

/** tên người trong cảnh (hiện trên thẻ người nói) */
export const CAST_NAME: Record<string, string> = {
  mama: 'Ma ma họ Trịnh',
  vua: 'Hoàng thượng',
  thaihau: 'Thái hậu',
  hoanghau: 'Hoàng hậu',
  thucphi: 'Thục phi',
  hanh: 'Thị nữ Hạnh',
  phuc: 'Thái giám Phúc',
  quan: 'Quan Thái phó',
  tuong: 'Tướng quân Lê Trực',
  con: 'Hoàng tử',
  su: 'Sư bà chùa Vân Tịch',
  meday: 'Mẹ',
  cungnu: 'Cung nữ',
  ngoai: 'Sứ thần',
};

/** kết cục: sống thì có tên theo kiểu người, chết thì có điềm báo */
export const ENDINGS: Ending[] = [
  { id: 'e_mau_nghi', name: 'Mẫu nghi thiên hạ', desc: 'Con trị vì, bà buông rèm mà không vấy máu ai. Sử chép một dòng: hiền và tỉnh.' },
  { id: 'e_nhiep_mau', name: 'Nhiếp chính mang tiếng', desc: 'Thắng cả hậu cung lẫn triều đình. Đời sau khen tài trị nước, và không quên những người đã chết.' },
  { id: 'e_thai_phi', name: 'Hoàng thái phi', desc: 'Con lên ngôi, đích mẫu giữ quyền. Bà chọn đứng sau một bước, và sống lâu nhất.' },
  { id: 'e_hoang_quy_phi', name: 'Hoàng quý phi', desc: 'Đứng đầu hậu cung, cách chỗ vua một sân. Không có con lên ngôi, nhưng không ai dám quên tên.' },
  { id: 'e_hien_phi', name: 'Hiền phi lui về', desc: 'Không tranh, không đoạt. Cuối đời con cháu đầy nhà, ngồi dạy cháu gái thêu.' },
  { id: 'e_lang_le', name: 'Cả đời không được gọi', desc: 'Như phần đông phi tần: may lắm được hầu một hai lần, rồi già đi trong một viện vắng.' },
  { id: 'e_cau_mua', name: 'Về quê cầu mưa', desc: 'Năm hạn hán, vua cho trăm cung nữ về quê "giải trừ âm khí". Bà là một trong số đó, lấy một ông đồ làng.' },
  { id: 'e_di_tu', name: 'Áo nâu chùa Vân Tịch', desc: 'Cởi áo thêu, khoác áo nâu. Tiếng chuông chiều nghe rõ hơn tiếng chiếu chỉ.' },
  { id: 'e_lay_tuong', name: 'Phu nhân tướng quân', desc: 'Được ban gả cho vị tướng từng cứu giá. Nửa sau đời ở biên ải, gió to nhưng lòng nhẹ.' },
  { id: 'e_trao_ngoi', name: 'Trao ngôi cứu nước', desc: 'Giặc ngoài biên, vua nhỏ không cầm quân được. Bà đặt chiếc áo bào vào tay vị tướng giỏi nhất.' },
  { id: 'e_sung_phi', name: 'Sủng phi một tháng', desc: 'Từ {goc} lên đỉnh cao nhất, rồi mất hết trong một tháng. Lăng nhỏ ngoài thành không ghi tên.' },
  { id: 'd_doc', name: 'Chén chè hạt sen', desc: 'Ngọt quá. Đến lúc nhận ra thì đã muộn.', dead: true },
  { id: 'd_phe', name: 'Ba thước lụa trắng', desc: 'Bị phế, rồi được ban chết. Viện cũ niêm phong, tên bị gạch khỏi sổ.', dead: true },
  { id: 'd_san', name: 'Mất khi vượt cạn', desc: 'Đứa trẻ cất tiếng khóc thì mẹ nhắm mắt. Như bao người đàn bà trong cung và ngoài cung.', dead: true },
  { id: 'd_binh_bien', name: 'Đêm binh biến', desc: 'Kẻ thua năm nào quay lại, mang theo trăm người và một mối thù đã chín.', dead: true },
  { id: 'd_gieng', name: 'Giếng sau viện', desc: 'Sáng ra người ta vớt được chiếc hài thêu. Không ai thấy gì, không ai nghe gì.', dead: true },
];
import { ENDINGS_ARCS } from './content/deep_arcs';
import { ENDINGS_EVENTS } from './content/deep_events';
export const ALL_ENDINGS: Ending[] = [...ENDINGS_ARCS, ...ENDINGS_EVENTS, ...ENDINGS, ...ENDINGS_VN, ...ENDINGS_CN, ...ENDINGS_QUAN, ...ENDINGS_CUNG, ...ENDINGS_CHUA, ...ENDINGS_DAN];
export const endingOf = (id: string) => ALL_ENDINGS.find((e) => e.id === id);

/** tên con */
export const SON_NAMES = ['Khải', 'Hạo', 'Thuyên', 'Diễn', 'Tuấn', 'Lâm'];
export const DAUGHTER_NAMES = ['Ngọc Khanh', 'Bảo Hoa', 'Minh Châu', 'Thục Nghi'];
