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
  /** nói rõ người chơi cần làm gì trong phần này */
  goal?: string[];
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
    open: true,
    t: 'Cung nga giặt áo',
    pitch: 'Đào, hầu trà ở cung Tây, mang thai con của vua trong một đêm không ai ghi thẻ. Con trai nàng bị đổi đi ngay đêm sinh, và nàng chỉ còn đôi tay biết đọc vết trên vải.',
    ho: 'Đào',
    goc: 'cung nga giặt áo',
    que: 'viện Hoán Y',
    me: 'bà Diệp',
    rank: 0,
    n: {},
    flags: ['g_cung'],
    intro: [
      'Bạn là Đào, mười tám tuổi, cung nga hầu trà ở cung Tây. Gần mười tháng trước, vua uống của bạn một chén trà gừng, và tối hôm ấy Kiệm đến gọi tên bạn. Đêm nay mưa, và bụng bạn đã đến ngày.',
      'Bà Diệp, người giặt áo lâu năm nhất, từng dặn bạn về viện giặt, chỗ thấp nhất trong cung: "Ở đây, đứa nào ngẩng đầu lên là đứa đó chết trước."',
    ],
    goal: [
      'Đêm nay bạn sinh con, và con bạn sẽ bị bế đi. Việc của bạn là tìm lại nó.',
      'Sống sót ở viện giặt: giữ miệng, kết người tin được, tránh để Quế để ý.',
      'Đọc vết trên những chiếc áo gửi xuống giặt để lần ra ai đã bế con đi, và con đang ở đâu.',
      'Đừng tin dấu nào một mình. Một cái tên, một nốt ruồi, một chiếc khóa đều có thể bị làm giả.',
      'Đến cuối, bạn phải chọn: mang con đi, hay để con lớn lên trong cung.',
    ],
    place: 'vien',
    names: 'tuc',
  },
  {
    k: 'chua',
    open: true,
    t: 'Công chúa triều trước',
    pitch: 'Con gái vua cuối triều Hưng, mười hai năm làm con tin trong cung của kẻ diệt nước mình. Người cũ muốn nàng làm cờ, triều mới muốn nàng làm con tin. Và cha nàng không chết vì bệnh.',
    ho: 'Lạc',
    goc: 'công chúa triều Hưng cũ',
    que: 'cố đô Hưng Thành',
    me: 'vú Hòe',
    rank: 4,
    n: { the: 30, duc: 60, sac: 60, an: 20, muu: 34, thaihau: -16, quan: 4, tien: 60, vua: 6 },
    flags: ['g_chua', 'cua_hop', 'cua_tram', 'cua_vang'],
    intro: [
      'Năm bạn năm tuổi, quân nhà Khánh Vân vào cố đô Hưng Thành. Cha bạn, vua cuối triều Hưng, nhường ngôi, lên chùa Lũng Vân, rồi mất ở đó vào một đêm đông. Sổ ghi: bệnh. Năm ấy bạn tám tuổi, và từ năm ấy bạn sống trong cung làm con tin.',
      'Mười hai năm sau, theo di chiếu tiên đế, bạn được phong Tiệp dư. Vú Hòe chải tóc cho bạn: "Công chúa sống được ngày nào, người cũ còn hi vọng ngày ấy. Người mới cũng thế."',
    ],
    goal: [
      'Sống sót giữa hai chủ: mỗi kỳ trăng, Thái hậu đòi một cái tên, người trên núi đòi một tin.',
      'Muốn qua mỗi chương, phải thắng được người: kéo về phe, mua bằng của riêng, ép bằng bí mật, hoặc trừ đi.',
      'Của riêng có hạn. Kẻ mua được thì người khác cũng mua lại được. Người đã chết không sống lại.',
      'Tìm ra cha chết vì đâu. Đừng tin dấu vết nào được bày sẵn.',
      'Có lựa chọn trông như chuyện nhỏ, vài chương sau mới thấy hậu quả.',
    ],
    place: 'phong',
    names: 'quy',
  },
];
export const originOf = (k: string | undefined) => ORIGINS.find((o) => o.k === k) ?? ORIGINS[0];

/** thay chữ theo xuất thân trong thẻ */
export function fillText(t: string, k: string | undefined) {
  const o = originOf(k);
  return t.replace(/\{ho\}/g, o.ho).replace(/\{goc\}/g, o.goc).replace(/\{que\}/g, o.que).replace(/\{me\}/g, o.me);
}
