/**
 * Bốn đường vào cung, mỗi đường như một bộ phim riêng: xuất phát khác, chỗ dựa khác, kẻ thù khác.
 * Thẻ của từng đường gắn cờ g_<khóa> (vd `when: { flags: ['g_quan'] }`).
 * Chữ trong thẻ có thể dùng: {ho} họ, {goc} xuất thân, {que} nơi xuất thân, {me} người ở nhà (mẹ, cha, nhũ mẫu).
 */
import type { NumK } from './types';

export type OriginK = 'dan' | 'quan' | 'cung' | 'chua';

export interface Origin {
  k: OriginK;
  /** tên đường */
  t: string;
  /** hai câu giới thiệu trên thẻ chọn đường */
  pitch: string;
  ho: string;
  goc: string;
  que: string;
  me: string;
  rank: number;
  n: Partial<Record<NumK, number>>;
  flags: string[];
  /** đang mở cho người chơi chọn */
  open?: boolean;
  /** đoạn mở đầu trên màn đặt tên */
  intro: string[];
  /** cảnh màn đặt tên */
  place: 'lang' | 'phong' | 'vien' | 'chua';
  names: 'dan' | 'quy' | 'tuc';
}

export const ORIGINS: Origin[] = [
  {
    k: 'dan',
    t: 'Dân nữ được tuyển',
    pitch: 'Con gái nhà làm chè, đứng tựa gốc đại đúng lúc vua đi lễ. Không gia thế, chỉ có nhan sắc và một gói chè của mẹ.',
    ho: 'Diệp',
    goc: 'gái làng chè',
    que: 'làng Mai Đông',
    me: 'mẹ',
    rank: 0,
    n: {},
    flags: ['g_dan'],
    open: true,
    intro: [
      'Bạn là con gái nhà làm chè ở làng Mai Đông. Năm mười tám tuổi, bạn đứng tựa gốc đại ở chùa Vân Tịch đúng lúc Hoàng thượng đi lễ cầu tự. Một tháng sau, kiệu đón vào cung.',
      'Mẹ dúi vào tay bạn gói chè: "Trong ấy, chén nào cũng phải nhìn hai lần, con ạ."',
    ],
    place: 'lang',
    names: 'dan',
  },
  {
    k: 'quan',
    t: 'Con tin họ Nghiêm',
    pitch: 'Chị bạn vào cung trước, chết năm hai mươi tư tuổi, sổ ghi "bệnh". Cha dâng bạn vào thay chỗ chị. Bạn là con gái ông quan Bộ Hình, và bạn không tin chữ "bệnh" ấy.',
    ho: 'Nghiêm',
    goc: 'con gái quan Thượng thư',
    que: 'phủ Thượng thư họ Nghiêm',
    me: 'cha',
    rank: 2,
    n: { the: 40, an: 12, duc: 55, muu: 40, sac: 55, tien: 120, cha: 40, thaihau: 10, thucphi: -10, phuc: 0, hanh: 10, hoanghau: 0, vua: 0 },
    flags: ['g_quan'],
    open: true,
    intro: [
      'Bạn là con gái út của Thượng thư Bộ Hình Nghiêm Chính Khanh, người cả kinh thành gọi là ông Nghiêm sắt. Năm mười tám tuổi, bạn vào cung, thay chỗ người chị đã mất.',
      'Cha chỉ dặn một câu: "Giữ lễ. Giữ miệng. Đừng hỏi chuyện chị con."',
    ],
    place: 'phong',
    names: 'quy',
  },
  {
    k: 'cung',
    t: 'Cung nga giặt áo',
    pitch: 'Bị bán vào cung năm mười bốn tuổi, giặt áo ở viện Hoán Y. Không tên trong sổ phi tần, không ai đứng sau, chỉ có đôi tay và cái đầu.',
    ho: 'Lương',
    goc: 'cung nữ giặt áo',
    que: 'viện Hoán Y',
    me: 'bà Tư giặt áo',
    rank: 0,
    n: { the: 3, sac: 48, an: 4, muu: 42, duc: 46, hanh: 40, phuc: 10, tien: 5 },
    flags: ['g_cung', 'cung_nga'],
    intro: [
      'Năm mười bốn tuổi, nhà bạn mất mùa, cha bán bạn cho người tuyển cung nữ lấy ba thúng thóc. Bốn năm nay, bạn giặt áo ở viện Hoán Y, tay nứt nẻ vì nước tro.',
      'Bà Tư giặt áo dặn: "Ở đây, đứa nào ngẩng đầu lên là đứa đó chết trước."',
    ],
    place: 'vien',
    names: 'tuc',
  },
  {
    k: 'chua',
    t: 'Công chúa triều trước',
    pitch: 'Con gái vị vua cuối triều Hưng, bị giữ lại làm phi để yên lòng người cũ. Danh phận cao, nhưng cả hậu cung nhìn bạn như một mối nguy.',
    ho: 'Lạc',
    goc: 'công chúa triều Hưng cũ',
    que: 'cố đô Hưng Thành',
    me: 'nhũ mẫu',
    rank: 4,
    n: { the: 30, duc: 60, sac: 60, an: 20, muu: 34, thaihau: -16, quan: 4, tien: 60, vua: 6 },
    flags: ['g_chua', 'nghi_ky'],
    intro: [
      'Ba năm trước, tiên đế nhà Khánh Vân đem quân vào cố đô Hưng Thành. Cha bạn, vua cuối triều Hưng, nhường ngôi rồi mất trong một ngôi chùa xa.',
      'Bạn được giữ lại, phong Tiệp dư. Nhũ mẫu chải tóc cho bạn lần cuối: "Công chúa sống được ngày nào, người cũ còn hi vọng ngày ấy."',
    ],
    place: 'chua',
    names: 'quy',
  },
];
export const originOf = (k: string | undefined) => ORIGINS.find((o) => o.k === k) ?? ORIGINS[0];

/** thay chữ theo xuất thân trong thẻ */
export function fillText(t: string, k: string | undefined) {
  const o = originOf(k);
  return t.replace(/\{ho\}/g, o.ho).replace(/\{goc\}/g, o.goc).replace(/\{que\}/g, o.que).replace(/\{me\}/g, o.me);
}
