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

/** manh mối này nói thủ phạm là một trong những ai */
export function clueSet(l: Life, clueId: string): string[] {
  const cl = clueOf(clueId);
  if (!cl) return [];
  if (cl.gai) return [cl.gai];
  const c = caseOf(cl.an);
  const tay = l.an?.[c.id]?.tay ?? c.tay[0];
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
  const found = st.clues.map((id) => clueOf(id)!).filter((x) => x && !(x.gai && l.flags.includes(`nghi_${x.id}`)));
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
export function judge(l: Life, an: string, who: string): { dung: boolean; du: boolean; kind: 'thang' | 'gai' | 'phancong' | 'gac' | 'tu' } {
  if (who === 'gac') return { dung: false, du: false, kind: 'gac' };
  if (who === 'tu') return { dung: false, du: false, kind: 'tu' };
  const st = l.an?.[an];
  const dung = !!st && st.tay === who;
  const { du } = strength(l, an, who);
  if (dung && du) return { dung, du, kind: 'thang' };
  if (!dung && du) return { dung, du, kind: 'gai' };
  return { dung, du, kind: 'phancong' };
}
