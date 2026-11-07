/**
 * Đầu mối phá án: phá án là việc của một mạng người.
 * Mỗi người đứng về phía nàng (và bậc cao) mở thêm một lần dò manh mối cho mỗi vụ.
 * Ít người, bậc thấp: dò được ít, phá án gần như một mình.
 * Kẻ thù làm bạn (Kiệm, Thái sư, Thái hậu) cũng là đầu mối, nhưng là dao hai lưỡi:
 * mỗi lần dò Hiểm tăng, và họ hay mớm chứng gài.
 */
import type { Life } from '../types';

export interface DauMoi {
  /** người giúp thật */
  ban: string[];
  /** kẻ thù làm bạn */
  thu: string[];
  /** số lần dò manh mối tối đa cho mỗi vụ */
  cap: number;
}

export function dauMoi(l: Life): DauMoi {
  const f = (x: string) => l.flags.includes(x);
  const n = (k: keyof Life['n']) => l.n[k] ?? 0;
  const ban: string[] = [];
  const thu: string[] = [];
  if (!f('chet_nhumau') && !f('di_nhumau') && l.chapter <= 6) ban.push('Nhũ mẫu Tần');
  if (n('hanh') >= 15 && !f('chet_luavang') && !f('di_luavang') && !f('lv_ban')) ban.push('Lụa Vàng');
  if ((n('hoanghau') >= 20 || f('dm_hoanghau')) && !f('chet_hoanghau') && !f('phe_hoanghau')) ban.push('Hoàng hậu');
  if ((n('thucphi') >= 20 || f('dm_un') || f('un_ban')) && !f('un_han') && !f('phe_un') && !f('chet_uyennhu') && !f('di_uyennhu')) ban.push('Quý phi Hà');
  if ((n('quan') >= 15 || f('quen_lymac') || f('dm_lymac')) && !f('chet_lymac')) ban.push('Ngự sử Lý Mặc');
  if ((n('vua') >= 30 || f('dm_vua')) && !f('chet_vua')) ban.push('Hoàng thượng');
  if ((f('cuu_thaiy') || f('thaiy_on') || f('bai_thaiy')) && !f('chet_thaiy')) ban.push('Thái y Thẩm');
  if (f('thai_hau') || f('hoang_hau') || l.rank >= 8) ban.push('Ấn cung trong tay');
  else if (l.rank >= 5) ban.push('Bậc tần, có người hầu đi dò');
  if ((n('phuc') >= 40 || (f('mua_kiem') && l.chapter <= 4)) && !f('chet_kiem')) thu.push('Chưởng sự Kiệm');
  if ((f('theo_ts') || f('ban_ts') || f('ts_chung')) && !f('thaisu_nga') && !f('chet_thaisu') && l.chapter <= 5) thu.push('Thái sư Hà');
  if (n('thaihau') >= 50 && !f('chet_thaihau') && !f('phe_thaihau') && !f('thai_hau') && l.chapter <= 6) thu.push('Thái hậu Lương');
  return { ban, thu, cap: Math.min(6, 1 + ban.length + thu.length) };
}

/**
 * Vây cánh của kẻ đứng sau (nhà Lương và phủ Thái sư).
 * Muốn đi tới các kết cao (nói ra sự thật mà còn sống, khép án Tân Dậu) thì phải nhổ đủ vây cánh.
 * Nhổ đúng người: xử đúng và đủ chứng một vụ, lật được người (lấy lời khai), hay hạ được chủ mưu.
 * Giết sớm (người chết trước khi kịp khai) chỉ là đứt đầu mối, không tính.
 * Xử oan (đèn sáng vào sai người) thì bị trừ: người thật còn đó, và mình có thêm kẻ thù.
 */
export type VcSt = 'con' | 'nho' | 'lat' | 'dut';
export interface VayCanh {
  list: { k: string; t: string; st: VcSt }[];
  /** số trụ đã nhổ hoặc lật, trừ số lần xử oan */
  diem: number;
}
export function vayCanh(l: Life): VayCanh {
  const f = (x: string) => l.flags.includes(x);
  const any = (...xs: string[]) => xs.some(f);
  const list: VayCanh['list'] = [
    { k: 'an1', t: 'Tai mắt ở viện chị', st: f('an1_thang') ? 'nho' : 'con' },
    { k: 'an2', t: 'Kẻ cạo sổ đến thăm', st: f('an2_thang') ? 'nho' : 'con' },
    { k: 'an3', t: 'Kẻ bỏ thuốc vào lò', st: f('an3_thang') ? 'nho' : 'con' },
    { k: 'an4', t: 'Người thả tin đồn Đông cung', st: f('an4_thang') ? 'nho' : 'con' },
    {
      k: 'kiem',
      t: 'Chưởng sự Kiệm',
      st: any('khai_kiem', 'hua_kiem', 'bai_kiem', 'mua_kiem') ? 'lat' : f('chet_kiem') ? 'dut' : 'con',
    },
    {
      k: 'thaiy',
      t: 'Thái y Thẩm',
      st: any('thaiy_khai', 'khai_thaiy', 'cuu_thaiy', 'thaiy_on', 'bai_thaiy') ? 'lat' : f('chet_thaiy') ? 'dut' : 'con',
    },
    { k: 'thaisu', t: 'Thái sư Hà', st: any('thaisu_nga', 'chet_thaisu') ? 'nho' : 'con' },
    { k: 'thaihau', t: 'Thái hậu Lương', st: any('phe_thaihau', 'an5_thang', 'an7_thang') ? 'nho' : f('chet_thaihau') ? 'dut' : 'con' },
  ];
  const oan = l.flags.filter((x) => /^oan_an\d$/.test(x)).length;
  const diem = list.filter((x) => x.st === 'nho' || x.st === 'lat').length - oan;
  return { list, diem };
}
/** ngưỡng vây cánh: nói ra sự thật mà sống, và khép án Tân Dậu */
export const VC_NOI = 5;
export const VC_KHEP = 6;
