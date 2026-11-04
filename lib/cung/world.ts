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

/** mối nguy: tên, vai trong tranh, chương bắt đầu lộ mặt, uy hiếp ban đầu, một dòng giới thiệu */
export const RIVALS: { k: import('./types').RivalK; t: string; cast: import('./types').CastK; from: number; th: number; d: string; goal?: boolean }[] = [
  { k: 'thucphi', t: 'Thục phi', cast: 'thucphi', from: 1, th: 45, d: 'Sủng phi lâu năm, mẹ của Hoàng tử Nghĩa. Ai được vua để mắt, bà đều nhớ tên.' },
  { k: 'hoanghau', t: 'Hoàng hậu', cast: 'hoanghau', from: 1, th: 25, d: 'Người đang ngồi ở cung Ngọc Khuê. Bà còn đó, ngôi hậu không bao giờ là của bạn.', goal: true },
  { k: 'ninh', t: 'Ninh mỹ nhân', cast: 'ninh', from: 1, th: 25, d: 'Cùng đợt tuyển với bạn, từng ngủ chung chiếu, chia nhau miếng bánh. Giờ nàng muốn đúng thứ bạn muốn.' },
  { k: 'hienphi', t: 'Hiền phi', cast: 'hienphi', from: 2, th: 35, d: 'Con gái võ tướng họ Mạc. Cả cung khen hiền, chỉ những người đã ngã mới biết nàng đứng ở đâu.' },
  { k: 'uyentan', t: 'Uyển tần', cast: 'uyentan', from: 2, th: 30, d: 'Vũ nữ giáo phường được vua đưa vào cung sau một đêm yến. Không có gì để mất, nên dám làm mọi thứ.' },
  { k: 'letan', t: 'Lệ tần', cast: 'letan', from: 3, th: 35, d: 'Tân sủng mười lăm tuổi, cháu gái Thái phó Tôn, được đưa vào đúng lúc bạn mang thai.' },
  { k: 'thaipho', t: 'Thái phó Tôn', cast: 'quan', from: 4, th: 40, d: 'Quyền thần nắm nửa triều đình, muốn đặt người của mình vào Đông cung.' },
  { k: 'nghia', t: 'Hoàng tử Nghĩa', cast: 'nghia', from: 4, th: 35, d: 'Con trưởng của Thục phi, tranh ngôi Đông cung với con bạn.' },
];
export const RIV_ST: Record<import('./types').RivalSt, string> = { an: 'Chưa lộ mặt', manh: 'Đang lộng hành', yeu: 'Thất thế', giang: 'Bị giáng, bị đày', chet: 'Đã chết', phuc: 'Đã quy phục' };
export const gone = (st: import('./types').RivalSt) => st === 'giang' || st === 'chet' || st === 'phuc';
export const HOANG_HAU_RANK: Rank = { t: 'Hoàng hậu', giai: 'Chính cung', luong: 1400, gao: 400, o: 'cung Ngọc Khuê', phuong: 9, ao: '#c49a3a', vien: '#8f2419' };

/** các chặng đời */
/** mỗi chặng là một chương phim: câu đề (epigraph) và câu móc (hook) mở màn */
export const CHAPTERS: { n: number; t: string; smalls: number; epi: string; hook: string }[] = [
  { n: 1, t: 'Nhập cung', smalls: 3, epi: 'Cửa cung sâu như biển. Vào rồi, người nhà chỉ còn là một cái tên trong thư.', hook: 'Đêm đầu tiên, có người đặt một chén trà trước cửa phòng bạn.' },
  { n: 2, t: 'Được gọi', smalls: 5, epi: 'Ba nghìn giai lệ, một ngọn đèn đỏ. Đèn treo trước cửa ai, cả hậu cung đều biết.', hook: 'Đèn đỏ sắp treo. Và đâu đó, có người đang đếm từng đêm của bạn.' },
  { n: 3, t: 'Mang thai', smalls: 4, epi: 'Trong cung, có con là có chỗ đứng. Cũng là có thêm một cái cổ để người ta nhắm vào.', hook: 'Thái y bắt mạch xong, cúi đầu thật thấp. Tin vui này, không phải ai cũng vui.' },
  { n: 4, t: 'Ngôi Đông cung', smalls: 5, epi: 'Một chiếc ghế nhỏ ở Đông cung, mà bao nhiêu người đã ngã quanh nó.', hook: 'Triều đình bắt đầu bàn chuyện lập Đông cung. Tên con bạn được nhắc tới, và cả tên người khác.' },
  { n: 5, t: 'Vua băng', smalls: 2, epi: 'Mặt trời lặn thì bóng tối chia nhau. Ai giữ được ấn, người ấy giữ được sáng mai.', hook: 'Hoàng thượng ho ra máu. Từ đêm nay, mỗi bước chân trong cung đều có người canh.' },
  { n: 6, t: 'Buông rèm', smalls: 5, epi: 'Ngồi sau rèm, nghe cả triều tâu. Một câu nói sai, cả họ nhà mình trả giá.', hook: 'Con còn nhỏ, ngai còn lạnh. Và Thái phó Tôn đã cười với bạn hơi lâu.' },
  { n: 7, t: 'Tuổi già', smalls: 4, epi: 'Người cũ lần lượt đi. Chỉ có những món nợ là ở lại.', hook: 'Một sáng, có người gửi vào một chiếc hài thêu. Bạn nhận ra mũi kim của chính mình năm mười sáu tuổi.' },
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
  { id: 'e_hoang_hau', tier: 95, name: 'Chính cung Hoàng hậu', desc: 'Từ {goc} lên cung Ngọc Khuê. Những kẻ chắn đường đều đã ngã, và sử chép tên bà ngay dưới tên vua.' },
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
import { ENDINGS_BRANCH_A } from './content/branch_a';
import { ENDINGS_BRANCH_B } from './content/branch_b';
import { ENDINGS_FEUD } from './content/feud';
export const ALL_ENDINGS: Ending[] = [...ENDINGS_BRANCH_A, ...ENDINGS_BRANCH_B, ...ENDINGS_ARCS, ...ENDINGS_EVENTS, ...ENDINGS, ...ENDINGS_VN, ...ENDINGS_CN, ...ENDINGS_QUAN, ...ENDINGS_CUNG, ...ENDINGS_CHUA, ...ENDINGS_DAN, ...ENDINGS_FEUD];
export const endingOf = (id: string) => ALL_ENDINGS.find((e) => e.id === id);

/** tên con */
export const SON_NAMES = ['Khải', 'Hạo', 'Thuyên', 'Diễn', 'Tuấn', 'Lâm'];
export const DAUGHTER_NAMES = ['Ngọc Khanh', 'Bảo Hoa', 'Minh Châu', 'Thục Nghi'];
