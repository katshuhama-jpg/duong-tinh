/**
 * Phần "Con tin họ Nghiêm": bộ máy vụ án.
 * Mỗi vụ có 4 nghi phạm. Tay sai thật được bốc ngẫu nhiên lúc đầu đời trong danh sách `tay`.
 * Manh mối thật nói "thủ phạm là một trong hai người": tay sai và một người mồi (đổi theo từng manh mối).
 * Một manh mối gài (`gai`) chỉ thẳng vào người bị gài, đóng vai chứng then chốt giả.
 * Án vững (du) khi: người bị buộc khớp mọi manh mối thật đã nhặt, có ít nhất 2 loại chứng nhắc tới họ,
 * và có chứng then chốt (thật, hoặc chứng gài nếu buộc đúng người bị gài).
 */
import type { CastK, Life } from '../types';

export interface Suspect {
  k: string;
  /** dấu vết, hiện khi chưa đủ manh mối để biết tên */
  label: string;
  name: string;
  cast?: CastK;
}
export interface Clue {
  id: string;
  an: string;
  kind: 'vat' | 'nhan' | 'khai';
  /** tên manh mối hiện trong sổ án */
  t: string;
  key?: boolean;
  /** manh mối gài: chỉ thẳng vào nghi phạm này */
  gai?: string;
}
export interface Case {
  id: string;
  ch: number;
  title: string;
  /** một câu tóm tắt vụ trong sổ án */
  sum: string;
  suspects: Suspect[];
  tay: string[];
  clues: Clue[];
  /** có cờ này thì vụ không có thủ phạm (vd vua chết vì bệnh thật): kết luận "không ai" mới là đúng */
  none?: string;
  /** người có nhúng tay thật nhưng không phải người ra lệnh: buộc họ là "xử sót", không phải vu */
  sot?: string[];
}

export const KIND: Record<Clue['kind'], string> = { vat: 'Vật chứng', nhan: 'Nhân chứng', khai: 'Lời khai' };

export const CASES: Case[] = [
  {
    id: 'an1',
    ch: 1,
    title: 'Án chiếc lược ngà',
    sum: 'Đêm đầu ở viện cũ của chị, một tú nữ cùng đợt treo cổ trên xà chái sau. Sổ ghi tự vẫn, nhưng chân nó còn đi hài.',
    suspects: [
      { k: 'tg', label: 'Bóng người cao gầy', name: 'Thái giám quét sân Lộc' },
      { k: 'mm', label: 'Bóng đàn bà đứng tuổi', name: 'Ma ma giữ đèn họ Ông' },
      { k: 'cq', label: 'Bóng cô gái áo xanh', name: 'Cung nữ hầu Quý phi' },
      { k: 'lv', label: 'Bóng người trong viện mình', name: 'Lụa Vàng', cast: 'luavang' },
    ],
    tay: ['tg', 'mm'],
    clues: [
      { id: 'a1_hai', an: 'an1', kind: 'vat', t: 'Đôi hài cỏ ướt nước giếng giấu dưới gầm chái', key: true },
      { id: 'a1_gieng', an: 'an1', kind: 'nhan', t: 'Người gánh nước thấy hai bóng người ra giếng lúc canh ba' },
      { id: 'a1_cungphong', an: 'an1', kind: 'khai', t: 'Lời tú nữ cùng phòng: có người gọi Hoa ra lúc canh hai' },
      { id: 'a1_day', an: 'an1', kind: 'vat', t: 'Sợi dây thắt cổ lấy từ kho chung, dòng sổ kho bị mực đè' },
      { id: 'a1_khan', an: 'an1', kind: 'vat', t: 'Chiếc khăn lụa xanh rơi ngay dưới xà', gai: 'cq' },
    ],
  },
  {
    id: 'an2',
    ch: 2,
    title: 'Án đêm bị xóa',
    sum: 'Tài nhân viện Đông có thai, mà sổ đến thăm không có dòng nào ghi Hoàng thượng gọi nàng. Ở tháng Tư, giấy mỏng như vừa bị cạo. Ai đã cầm dao?',
    suspects: [
      { k: 'tl', label: 'Bóng người gù lưng', name: 'Thư lại nội vụ Bảo' },
      { k: 'md', label: 'Bóng đàn bà đeo chùm chìa', name: 'Ma ma trực kho họ Đàm' },
      { k: 'lv', label: 'Bóng người trong viện mình', name: 'Lụa Vàng', cast: 'luavang' },
      { k: 'kt', label: 'Bóng người thấp nhỏ', name: 'Tiểu thái giám Khương' },
    ],
    tay: ['tl', 'kt'],
    clues: [
      { id: 'a2_muc', an: 'an2', kind: 'vat', t: 'Dòng chữ chép đè dùng mực khác màu', key: true },
      { id: 'a2_den', an: 'an2', kind: 'nhan', t: 'Người trực đêm thấy đèn kho sổ sáng sau giờ khóa' },
      { id: 'a2_dao', an: 'an2', kind: 'vat', t: 'Con dao cạo giấy giấu trong một ống bút ở kho' },
      { id: 'a2_no', an: 'an2', kind: 'khai', t: 'Lời đồn ai đó vừa trả hết nợ cờ bạc' },
      { id: 'a2_giay', an: 'an2', kind: 'vat', t: 'Vết giày vải mới in trên tro ở cửa kho', gai: 'lv' },
    ],
  },
  {
    id: 'an3',
    ch: 3,
    title: 'Án thuốc an thai',
    sum: 'Chén thuốc an thai thứ mười hai có vị lạ, nhũ mẫu nếm thử rồi nhổ ra. Thái y Thẩm run tay từ hôm báo hỷ mạch. Ai đã bỏ thêm vị thuốc vào lò?',
    suspects: [
      { k: 'ns', label: 'Bóng người ngồi bên lò', name: 'Người sắc thuốc Mùi' },
      { k: 'mb', label: 'Bóng đàn bà ở bếp thuốc', name: 'Ma ma bếp thuốc họ Đinh' },
      { k: 'un', label: 'Người có lý do nhất', name: 'Quý phi Hà Uyển Như', cast: 'uyennhu' },
      { k: 'lv', label: 'Bóng người trong viện mình', name: 'Lụa Vàng', cast: 'luavang' },
    ],
    tay: ['ns', 'mb'],
    clues: [
      { id: 'a3_ba', an: 'an3', kind: 'vat', t: 'Bã thuốc trong lò có vị không nằm trong đơn', key: true },
      { id: 'a3_cau', an: 'an3', kind: 'nhan', t: 'Người quét bếp ngửi thấy mùi hạt cau sống đêm ấy' },
      { id: 'a3_don', an: 'an3', kind: 'khai', t: 'Thái y Thẩm quỳ khai: có người bắt ông kê thêm một vị' },
      { id: 'a3_bac', an: 'an3', kind: 'vat', t: 'Nén bạc mới có dấu kho, khâu trong một vạt áo ở bếp' },
      { id: 'a3_tram', an: 'an3', kind: 'vat', t: 'Cây trâm lông công của Quý phi rơi ở cửa bếp', gai: 'un' },
    ],
  },
  {
    id: 'an4',
    ch: 4,
    title: 'Án tin đồn Đông cung',
    sum: 'Khắp hậu cung truyền nhau một câu: Hoàng trưởng tử không giống ai trong nhà Lương. Ai đã thả câu ấy ra, và thả để thử ai?',
    suspects: [
      { k: 'tl', label: 'Bóng người áo lam đứng ngoài cổng', name: 'Thư lại phủ Thái sư' },
      { k: 'cn', label: 'Bóng cô gái hay đứng ở hành lang Đông cung', name: 'Cung nữ Đông cung tên Nhạn' },
      { k: 'mh', label: 'Bóng đàn bà đeo hương trầm', name: 'Ma ma hầu Hoàng hậu' },
      { k: 'tg', label: 'Bóng người thấp, đi rất nhẹ', name: 'Tiểu thái giám hầu sách Đông cung' },
    ],
    tay: ['tl', 'cn'],
    clues: [
      { id: 'a4_chu', an: 'an4', kind: 'vat', t: 'Nét chữ trong thư không tên khớp một trang sổ chi tiêu', key: true },
      { id: 'a4_giay', an: 'an4', kind: 'vat', t: 'Tờ thư viết trên giấy dó loại chỉ phủ lớn mới mua' },
      { id: 'a4_cong', an: 'an4', kind: 'nhan', t: 'Lính gác cổng Đông cung nhớ một người ra vào lúc đổi phiên' },
      { id: 'a4_bac', an: 'an4', kind: 'khai', t: 'Lời một cung nữ: có người vừa được thưởng bạc không rõ lý do' },
      { id: 'a4_huong', an: 'an4', kind: 'vat', t: 'Thư không tên còn ám mùi trầm của cung Hoàng hậu', gai: 'mh' },
    ],
  },
  {
    id: 'an5',
    ch: 5,
    title: 'Án chén thuốc cuối',
    sum: 'Ba ngày trước khi băng hà, Hoàng thượng còn ngồi dậy đọc tấu. Rồi một chén thuốc đêm, và sáng ra người không nói được nữa. Là bệnh, hay là chén thuốc?',
    suspects: [
      { k: 'ty', label: 'Bóng người cầm hộp thuốc', name: 'Ngự y trực đêm' },
      { k: 'mm', label: 'Bóng đàn bà bưng khay', name: 'Ma ma dâng thuốc họ Tạ' },
      { k: 'ng', label: 'Bóng người quen ở phủ nhà', name: 'Người nhà Nghiêm theo hầu' },
      { k: 'ts', label: 'Người có lý do nhất', name: 'Thái sư Hà Tông Lộc', cast: 'thaisu' },
    ],
    tay: ['ty', 'mm'],
    none: 'vua_benh',
    clues: [
      { id: 'a5_so', an: 'an5', kind: 'vat', t: 'Sổ thuốc ngự ba ngày cuối, một dòng viết bằng tay khác', key: true },
      { id: 'a5_ba', an: 'an5', kind: 'vat', t: 'Bã thuốc đêm cuối còn trong ống nhổ' },
      { id: 'a5_canh', an: 'an5', kind: 'nhan', t: 'Lính canh tẩm điện thấy người bưng thuốc đi vòng lối sau' },
      { id: 'a5_khai', an: 'an5', kind: 'khai', t: 'Lời một tiểu thái giám: chén thuốc ấy đổi tay hai lần' },
      { id: 'a5_an', an: 'an5', kind: 'vat', t: 'Ấn riêng của phủ Thái sư trên một gói thuốc lạ', gai: 'ts' },
    ],
  },
  {
    id: 'an6',
    ch: 6,
    title: 'Án Thượng thư Bộ Hình',
    sum: 'Ngự sử hặc cha bạn tội biết chuyện năm Tân Dậu mà không tâu. Không ai hỏi cha có biết không. Người ta chỉ chờ bạn gọi tên tội của ông.',
    suspects: [
      { k: 'che', label: 'Cách gọi thứ nhất', name: 'Biết mà che án', cast: 'cha' },
      { k: 'dong', label: 'Cách gọi thứ hai', name: 'Đồng mưu đại nghịch' },
      { k: 'ep', label: 'Cách gọi thứ ba', name: 'Bị ép mà im' },
      { k: 'oan', label: 'Cách gọi thứ tư', name: 'Không biết gì, bị vu' },
    ],
    tay: ['che'],
    clues: [
      { id: 'a6_thu', an: 'an6', kind: 'vat', t: 'Lá thư một chữ "Im" cha gửi chị Thanh', key: true },
      { id: 'a6_dem', an: 'an6', kind: 'nhan', t: 'Người đánh xe nhớ đêm cha vào cung gặp riêng Thái hậu, sau tang chị' },
      { id: 'a6_so', an: 'an6', kind: 'vat', t: 'Hồ sơ vụ Đông cung năm ấy, có bút phê của cha xin hoãn' },
      { id: 'a6_nm', an: 'an6', kind: 'khai', t: 'Lời nhũ mẫu: cha đọc thư chị xong, ngồi đến sáng' },
      { id: 'a6_an', an: 'an6', kind: 'vat', t: 'Một tờ biên nhận vàng của nhà Lương, đề tên cha', gai: 'dong' },
    ],
  },
  {
    id: 'an7',
    ch: 7,
    title: 'Án chị Thanh',
    sum: 'Năm Hưng Bình thứ tám, Chiêu nghi Nghiêm Thanh mất năm hai mươi tư tuổi, sổ ghi "bệnh". Hơn bốn mươi năm sau, người em đem hồ sơ ấy ra mở lần cuối.',
    suspects: [
      { k: 'th', label: 'Người ra lệnh', name: 'Thái hậu Lương', cast: 'thaihau' },
      { k: 'ki', label: 'Người chuyển chén thuốc', name: 'Chưởng sự Kiệm', cast: 'kiem' },
      { k: 'ty', label: 'Người kê đơn', name: 'Thái y Thẩm', cast: 'thaiy' },
      { k: 'cha', label: 'Người biết mà im', name: 'Cha', cast: 'cha' },
    ],
    tay: ['th'],
    sot: ['ki', 'ty'],
    clues: [
      { id: 'a7_goc', an: 'an7', kind: 'vat', t: 'Bản gốc sổ đến thăm và sổ thuốc năm Hưng Bình thứ tám', key: true },
      { id: 'a7_kiem', an: 'an7', kind: 'khai', t: 'Lời khai của Kiệm về chén thuốc đêm ấy' },
      { id: 'a7_thaiy', an: 'an7', kind: 'khai', t: 'Lời khai của Thái y về đơn thuốc ông bị bắt kê' },
      { id: 'a7_mo', an: 'an7', kind: 'nhan', t: 'Lời sư cô ở chùa biển về đêm chị bị gọi đi' },
      { id: 'a7_im', an: 'an7', kind: 'vat', t: 'Lá thư "Im" đặt cạnh ngày chị mất', gai: 'cha' },
    ],
  },
];

export const caseOf = (id: string) => CASES.find((c) => c.id === id)!;
export const clueOf = (id: string) => CASES.flatMap((c) => c.clues).find((x) => x.id === id) ?? null;

/** ngẫu nhiên có hạt giống (giống engine) */
function rnd(seed: number, salt: string) {
  let h = 2166136261 ^ seed;
  for (let i = 0; i < salt.length; i++) h = Math.imul(h ^ salt.charCodeAt(i), 16777619);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}

export function initCases(seed: number): NonNullable<Life['an']> {
  const an: NonNullable<Life['an']> = {};
  for (const c of CASES) an[c.id] = { tay: c.tay[Math.floor(rnd(seed, `tay|${c.id}`) * c.tay.length)], clues: [] };
  return an;
}

/** manh mối này có phải giả không (cờ that_<id>: đã ép ra lời thật thì thôi giả) */
export function isGia(l: Life, clueId: string): boolean {
  const cl = clueOf(clueId);
  if (!cl || cl.gai) return false;
  return !!l.an?.[cl.an]?.gia?.includes(clueId) && !l.flags.includes(`that_${clueId}`);
}

/** manh mối này nói thủ phạm là một trong những ai */
export function clueSet(l: Life, clueId: string): string[] {
  const cl = clueOf(clueId);
  if (!cl) return [];
  if (cl.gai) return [cl.gai];
  const c = caseOf(cl.an);
  // vụ không có thủ phạm: mỗi manh mối thật trỏ về một người khác nhau, không ai đủ chứng
  if (c.none && l.flags.includes(c.none)) {
    const real0 = c.clues.filter((x) => !x.gai);
    const off0 = Math.floor(rnd(l.seed, `none|${c.id}`) * c.suspects.length);
    return [c.suspects[(real0.findIndex((x) => x.id === clueId) + off0) % c.suspects.length].k];
  }
  const tay = l.an?.[c.id]?.tay ?? c.tay[0];
  // manh mối giả (có qua tay kẻ thù, hay người khai nói dối): trỏ về hai người, không có thủ phạm thật
  if (isGia(l, clueId)) {
    // nhũ mẫu nói dối để che cha: lời bà luôn kéo về phía nhẹ tội
    if (clueId === 'a6_nm') return ['ep', 'oan'];
    const sus = c.suspects.map((s) => s.k).filter((k) => k !== tay);
    const o = Math.floor(rnd(l.seed, `gia|${clueId}`) * sus.length);
    return [sus[o % sus.length], sus[(o + 1) % sus.length]];
  }
  const others = c.suspects.map((s) => s.k).filter((k) => k !== tay);
  const real = c.clues.filter((x) => !x.gai);
  const i = real.findIndex((x) => x.id === clueId);
  const off = Math.floor(rnd(l.seed, `moi|${c.id}`) * others.length);
  // người mồi của chứng then chốt không xuất hiện ở manh mối nào khác, để chỉ tay sai có thể đủ chứng
  const ki = Math.max(0, real.findIndex((x) => x.key));
  const keyDecoy = others[off % others.length];
  if (i === ki) return [tay, keyDecoy];
  const rest = others.filter((k) => k !== keyDecoy);
  const j = real.filter((x, n) => n !== ki).findIndex((x) => x.id === clueId);
  return [tay, rest[(j + off) % rest.length]];
}

/** đã đủ manh mối để biết tên người này chưa */
export function knows(l: Life, an: string, k: string) {
  const st = l.an?.[an];
  if (!st) return false;
  if (st.xu) return true;
  return st.clues.filter((id) => clueSet(l, id).includes(k)).length >= 3;
}
export const suspectName = (l: Life, an: string, k: string) => {
  const s = caseOf(an).suspects.find((x) => x.k === k)!;
  return knows(l, an, k) ? s.name : s.label;
};

export function strength(l: Life, an: string, k: string) {
  const st = l.an?.[an] ?? { clues: [] as string[], tay: '' };
  // đã nghi chứng gài (cờ nghi_<id manh mối>) thì không tính chứng ấy
  // đã nghi (cờ nghi_<id>) thì không tính: chứng gài, hay manh mối có qua tay kẻ thù
  const found = st.clues.map((id) => clueOf(id)!).filter((x) => x && !l.flags.includes(`nghi_${x.id}`));
  // manh mối giả tính như thật: người chơi không biết nó giả, trừ khi tự nghi
  const real = found.filter((x) => !x.gai);
  const consistent = real.every((x) => clueSet(l, x.id).includes(k));
  const about = found.filter((x) => clueSet(l, x.id).includes(k));
  const types = new Set(about.map((x) => x.kind)).size;
  const key = about.some((x) => x.key || x.gai === k);
  const du = consistent && types >= 2 && key;
  const lamp: 'mo' | 'vua' | 'sang' = du ? 'sang' : about.length >= 1 ? 'vua' : 'mo';
  return { consistent, types, key, du, lamp, n: about.length };
}

/** xử án: trả về kiểu kết quả */
export type JudgeKind = 'thang' | 'gai' | 'phancong' | 'gac' | 'tu' | 'sot';
export function judge(l: Life, an: string, who: string): { dung: boolean; du: boolean; kind: JudgeKind } {
  if (who === 'gac') return { dung: false, du: false, kind: 'gac' };
  const c = caseOf(an);
  const none = !!(c.none && l.flags.includes(c.none));
  // vụ không có thủ phạm: kết luận "không ai" là đúng, buộc ai cũng là buộc oan
  if (who === 'tu') return none ? { dung: true, du: true, kind: 'thang' } : { dung: false, du: false, kind: 'tu' };
  if (none) return { dung: false, du: strength(l, an, who).du, kind: strength(l, an, who).du ? 'gai' : 'phancong' };
  const st = l.an?.[an];
  const dung = !!st && st.tay === who;
  const { du } = strength(l, an, who);
  // gọi tên kẻ làm (bưng chén, kê đơn) mà chưa tới người ra lệnh: xử sót, không phải vu
  if (!dung && c.sot?.includes(who)) return { dung, du, kind: 'sot' };
  if (dung && du) return { dung, du, kind: 'thang' };
  if (!dung && du) return { dung, du, kind: 'gai' };
  return { dung, du, kind: 'phancong' };
}
