/**
 * Ví tiền: trò chơi phụ cạnh nút tua. Mở ra thì thời gian dừng.
 * Mỗi năm được 2 lượt (việc lớn như nhà, ô tô, thạc sĩ tốn cả 2 lượt).
 * Những gì mua ở đây đổi tuyến chính: có nhà thì thôi cảnh thuê trọ, có bằng thạc sĩ thì lương cao hơn,
 * có xe thì tốn tiền nuôi xe, và nhiều năm sau truyện nhắc lại (🦋).
 * Thiết kế gộp từ hai buổi brainstorm (vai người vợ chơi thử và vai Tyler).
 */
import type { Character, Family } from './character';
import { choose, ctxOf, type Ctx, type Feedback, type Fx, type Resolve, type Scene, type Story } from './story';
import { cashOf, fmtCash, fmtVND, invValue, priceAt, savingOf, unitOf, type InvKind } from './money';

/** lương tháng (VNĐ đúng năm): theo nghề đã chọn lúc đi làm, chưa có thì ước theo điểm Tài chính */
export function payOf(x: Pick<Ctx, 's' | 'year' | 'age'>) {
  const f = x.s.flags.find((g) => g.startsWith('luong_'));
  let p = f ? priceAt(Number(f.slice(6)) * 100_000, x.year) : unitOf(x.year, Math.max(26, x.age)) * (1.2 + x.s.stats.tien / 40);
  if (x.s.flags.includes('thacsi')) p *= 1.3;
  if (x.s.flags.includes('tienganh')) p *= 1.08;
  return p;
}

export type Place = 'bank' | 'school' | 'trip' | 'home' | 'car' | 'care';
export const PLACES: { k: Place; t: string; icon: string }[] = [
  { k: 'bank', t: 'Ngân hàng & sàn', icon: '¥' },
  { k: 'school', t: 'Đi học', icon: '✎' },
  { k: 'trip', t: 'Đi chơi', icon: '✈\uFE0E' },
  { k: 'home', t: 'Nhà đất', icon: '⌂' },
  { k: 'car', t: 'Xe cộ', icon: '◎' },
  { k: 'care', t: 'Gia đình & sức khỏe', icon: '♥' },
];

export interface WAct {
  id: string;
  place: Place;
  t: (x: Ctx) => string;
  /** mô tả ngắn: được gì, mất gì */
  d: (x: Ctx) => string;
  /** mở khi nào */
  when: (x: Ctx) => boolean;
  /** giá (VNĐ đúng năm); 0 nếu không mất tiền */
  cost: (x: Ctx) => number;
  /** số lượt trong năm (1 hoặc 2) */
  slots?: number;
  /** bao nhiêu năm mới làm lại được (0: mỗi năm một lần; -1: cả đời một lần) */
  cd?: number;
  do: (fx: Fx, x: Ctx, n: number) => void;
  note: (x: Ctx, n: number) => string;
}

const earning = (x: Ctx) => x.age >= 22 || x.has('dilam') || x.s.married;
const cash = (x: Ctx) => cashOf(x.s, x.year, x.age);
const holds = (x: Ctx, k: InvKind) => (x.s.inv ?? []).filter((i) => i.k === k);
const holdVal = (x: Ctx, k: InvKind) => holds(x, k).reduce((a, i) => a + invValue(i, x.year), 0);
const holdIn = (x: Ctx, k: InvKind) => holds(x, k).reduce((a, i) => a + i.vnd, 0);
const lv = (fx: Fx, x: Ctx, d: number) => (x.s.partner && x.s.partner !== 'xemmat' ? fx.love(x.s.partner, d) : undefined);
const with2 = (x: Ctx) => (x.s.partner && x.s.partner !== 'xemmat' ? x.L(x.s.partner) : null);
/** giá căn nhà (VNĐ đúng năm) */
const houseOf = (x: Ctx) => priceAt(x.f.province === 'Hà Nội' || x.f.province === 'TP. Hồ Chí Minh' ? 2_500_000_000 : 1_000_000_000, x.year);
/** một phần tiền đang có để đầu tư (không đụng vào khoản đang nợ) */
const part = (x: Ctx, r: number) => Math.max(0, Math.round(cash(x) * r));

export const WACTS: WAct[] = [
  {
    id: 'tk',
    place: 'bank',
    t: () => 'Gửi tiết kiệm',
    d: (x) => `Gửi ${fmtVND(part(x, 0.3))}, lãi chừng 7%/năm. Chắc ăn, không lo mất ngủ.`,
    when: (x) => earning(x) && x.year >= 1993 && cash(x) > 0,
    cost: (x) => part(x, 0.3),
    cd: 0,
    do: (fx, x) => (fx.invest('tk', part(x, 0.3)), fx.stat('tam', 2)),
    note: () => 'Cuốn sổ tiết kiệm cất dưới đáy tủ quần áo.',
  },
  {
    id: 'ck',
    place: 'bank',
    t: () => 'Mua cổ phiếu',
    d: (x) => `Bỏ ${fmtVND(part(x, 0.3))} vào sàn. Lên xuống theo thị trường, có năm mất nửa.`,
    when: (x) => earning(x) && x.year >= 2000 && cash(x) > 0,
    cost: (x) => part(x, 0.3),
    cd: 0,
    do: (fx, x) => (fx.invest('ck', part(x, 0.3)), fx.flag('vi_ck')),
    note: (x) => (x.year >= 2006 && x.year <= 2007 ? 'Cả phòng chỉ bàn chuyện bảng điện. Ai cũng thấy mình là thiên tài.' : 'Tải ứng dụng chứng khoán, tối nào cũng mở ra xem.'),
  },
  {
    id: 'ckban',
    place: 'bank',
    t: (x) => `Bán hết cổ phiếu (đang ${fmtVND(holdVal(x, 'ck'))})`,
    d: (x) => {
      const r = holdVal(x, 'ck') / Math.max(1, holdIn(x, 'ck')) - 1;
      return `Vốn ${fmtVND(holdIn(x, 'ck'))}. ${r >= 0 ? `Đang lãi ${Math.round(r * 100)}%.` : `Đang lỗ ${Math.round(-r * 100)}%.`}`;
    },
    when: (x) => holds(x, 'ck').length > 0,
    cost: () => 0,
    cd: 0,
    do: (fx, x) => {
      const lo = holdVal(x, 'ck') < holdIn(x, 'ck') * 0.8;
      fx.sellInv('ck');
      if (lo) (fx.flag('ck_chay'), fx.stat('tam', -6), lv(fx, x, -4));
      else fx.stat('tam', 3);
    },
    note: (x) => (holdVal(x, 'ck') < holdIn(x, 'ck') * 0.8 ? 'Cắt lỗ. Bài học đắt nhất mấy năm nay.' : 'Chốt lời. Tối đó cả nhà đi ăn lẩu.'),
  },
  {
    id: 'coin',
    place: 'bank',
    t: () => 'Mua tiền ảo',
    d: (x) => `Bỏ ${fmtVND(part(x, 0.1))}. Bạn bè bảo "lên mặt trăng". Cũng có thể về số không.`,
    when: (x) => earning(x) && x.year >= 2017 && cash(x) > 0,
    cost: (x) => part(x, 0.1),
    cd: 0,
    do: (fx, x) => (fx.invest('coin', part(x, 0.1)), fx.stat('noi', 3), fx.stat('tam', -2)),
    note: () => 'Mấy đêm liền thức canh biểu đồ.',
  },
  {
    id: 'coinban',
    place: 'bank',
    t: (x) => `Bán hết tiền ảo (đang ${fmtVND(holdVal(x, 'coin'))})`,
    d: (x) => `Vốn ${fmtVND(holdIn(x, 'coin'))}.`,
    when: (x) => holds(x, 'coin').length > 0,
    cost: () => 0,
    cd: 0,
    do: (fx) => void fx.sellInv('coin'),
    note: () => 'Xóa ứng dụng. Ngủ ngon lại được.',
  },
  {
    id: 'tienganh',
    place: 'school',
    t: () => 'Học tiếng Anh buổi tối',
    d: () => 'Học vấn +, lương +8%, mở đường vào công ty nước ngoài. Tối thứ ba, thứ năm không ở nhà.',
    when: (x) => x.age >= 16 && x.age <= 45 && x.year >= 1990 && !x.has('tienganh'),
    cost: (x) => (earning(x) ? payOf(x) * 3 : priceAt(6_000_000, x.year)),
    cd: -1,
    do: (fx) => (fx.flag('tienganh'), fx.stat('hoc', 5), fx.stat('duyen', 2)),
    note: () => '🦋 Lớp tối năm ấy, câu đầu tiên học được là "How are you?"',
  },
  {
    id: 'laixe',
    place: 'school',
    t: () => 'Học bằng lái ô tô',
    d: () => 'Ba tháng học, thi sa hình. Có bằng mới mua ô tô được.',
    when: (x) => x.age >= 18 && x.year >= 2000 && !x.has('banglai'),
    cost: (x) => priceAt(15_000_000, x.year),
    cd: -1,
    do: (fx) => (fx.flag('banglai'), fx.stat('noi', 2)),
    note: () => 'Lần thi thứ hai mới qua bài ghép ngang.',
  },
  {
    id: 'thacsi',
    place: 'school',
    t: () => 'Học thạc sĩ / văn bằng hai',
    d: () => 'Hai năm học đêm. Học vấn ++, lương +30% về sau. Bù lại ít ở nhà, mệt hơn. Tốn cả 2 lượt năm nay.',
    when: (x) => earning(x) && x.has('daihoc') && x.age >= 23 && x.age <= 45 && x.year >= 1995 && !x.has('thacsi'),
    cost: (x) => payOf(x) * 12,
    slots: 2,
    cd: -1,
    do: (fx, x) => (fx.flag('thacsi'), fx.flag(`thacsi_${x.age}`), fx.stat('hoc', 8), fx.stat('khoe', -4), lv(fx, x, -4), fx.rel('con', -3)),
    note: (x) => `🦋 Hai năm vừa đi làm vừa học. ${x.s.married ? 'Nhiều tối về đến nhà thì cả nhà đã ngủ.' : 'Bạn bè rủ đi chơi, toàn từ chối.'}`,
  },
  {
    id: 'trongnuoc',
    place: 'trip',
    t: (x) => (with2(x) ? `Đi Đà Lạt với ${with2(x)}` : x.s.kids ? 'Cả nhà đi biển mấy ngày' : 'Đi Đà Lạt một mình cho khuây khỏa'),
    d: (x) => `Vui vẻ +, ${with2(x) ? 'tình cảm +' : 'đầu óc nhẹ hẳn'}. Một tháng lương. Đi mãi thì cũng nhàm dần.`,
    when: (x) => earning(x) && x.year >= 1993,
    cost: (x) => payOf(x),
    cd: 1,
    do: (fx, x, n) => {
      const k = n === 0 ? 1 : n === 1 ? 0.6 : 0.3;
      fx.stat('tam', Math.round(8 * k));
      lv(fx, x, Math.round(8 * k));
      if (x.s.kids) fx.rel('con', Math.round(6 * k));
      fx.flag(`dl_${x.age}`);
      if (x.s.partner && x.s.partner !== 'xemmat') fx.photo({ who: x.s.partner, place: x.s.kids ? 'Biển mùa hè' : 'Đà Lạt', bg: { place: 'congvien', time: 'dusk' }, line: 'Chuyến đi ngắn, nhưng nhớ lâu.' });
    },
    note: (x, n) => (n >= 2 ? 'Vẫn vui, nhưng không còn háo hức như lần đầu.' : '▣ Một tấm ảnh vừa vào album kỷ niệm.'),
  },
  {
    id: 'nuocngoai',
    place: 'trip',
    t: () => 'Đi nước ngoài lần đầu',
    d: () => 'Vui vẻ +, Học vấn +, mở mang đầu óc. Lần đầu cầm hộ chiếu.',
    when: (x) => earning(x) && x.year >= 2005,
    cost: (x) => payOf(x) * 4,
    cd: 2,
    do: (fx, x, n) => {
      const k = n === 0 ? 1 : 0.5;
      fx.stat('tam', Math.round(8 * k));
      fx.stat('hoc', Math.round(3 * k));
      fx.stat('noi', 3);
      lv(fx, x, Math.round(6 * k));
      fx.flag(`nn_${x.age}`);
    },
    note: (x, n) => (n === 0 ? '🦋 Lần đầu cầm hộ chiếu, tay run run ở quầy xuất cảnh.' : `Chuyến thứ ${n + 1}. Giờ thì quen đường sân bay rồi.`),
  },
  {
    id: 'dat',
    place: 'home',
    t: () => 'Mua một lô đất ven đô',
    d: (x) => `Bỏ ${fmtVND(part(x, 0.5))}. Đất thì không chạy đi đâu, nhưng có năm đóng băng.`,
    when: (x) => earning(x) && x.age >= 24 && cash(x) >= priceAt(150_000_000, x.year),
    cost: (x) => part(x, 0.5),
    slots: 2,
    cd: 3,
    do: (fx, x) => (fx.invest('dat', part(x, 0.5)), fx.flag(`datvi_${x.age}`)),
    note: (x) => `🦋 Mảnh đất mua năm ${x.year}. Để xem mười năm nữa nó đáng bao nhiêu.`,
  },
  {
    id: 'datban',
    place: 'home',
    t: (x) => `Bán đất (đang ${fmtVND(holdVal(x, 'dat'))})`,
    d: (x) => `Mua vào ${fmtVND(holdIn(x, 'dat'))}.`,
    when: (x) => holds(x, 'dat').length > 0,
    cost: () => 0,
    slots: 2,
    cd: 0,
    do: (fx) => void fx.sellInv('dat'),
    note: () => 'Ký giấy ở phòng công chứng, tay hơi run.',
  },
  {
    id: 'nha',
    place: 'home',
    t: (x) => `Mua nhà trả góp (trả trước ${fmtVND(houseOf(x) * 0.3)})`,
    d: (x) => `Căn nhà ${fmtVND(houseOf(x))}, vay ngân hàng 70%, trả hai mươi năm. Thôi cảnh thuê trọ, nhưng tháng nào cũng còng lưng trả góp. Tốn cả 2 lượt.`,
    when: (x) => earning(x) && x.age >= 25 && !x.has('ms_nha') && !x.s.flags.some((f) => f.startsWith('nha_gop_')),
    cost: (x) => houseOf(x) * 0.3,
    slots: 2,
    cd: -1,
    do: (fx, x) => (fx.cash(-houseOf(x) * 0.3), fx.flag('ms_nha'), fx.flag(`nha_gop_${x.age}`), fx.flag('nha_vi'), fx.stat('tam', 8), lv(fx, x, 6), fx.rel('bome', 6)),
    note: (x) => `🦋 Dọn vào nhà mới năm ${x.year}. Đêm đầu tiên không ngủ được vì sướng.`,
  },
  {
    id: 'xemay',
    place: 'car',
    t: (x) => (x.year < 2000 ? 'Mua chiếc Dream đầu tiên' : 'Mua xe máy mới'),
    d: (x) => (x.year < 2000 ? 'Cả xóm ra xem. Bằng mấy năm lương.' : 'Đi làm đỡ vất, đi chơi cũng oai.'),
    when: (x) => x.year >= 1993 && x.age >= 18 && !x.has('xemay'),
    cost: (x) => (x.year < 2000 ? 28_000_000 : priceAt(25_000_000, x.year)),
    cd: -1,
    do: (fx, x) => (fx.flag('xemay'), fx.flag(`xemay_${x.age}`), fx.stat('duyen', 3), fx.stat('noi', 2), fx.rel('bome', 3)),
    note: (x) => (x.year < 2000 ? '🦋 Chiếc xe đầu tiên chở mẹ đi chợ, mẹ khoe cả xóm.' : 'Biển số đẹp, chủ nhật nào cũng tự rửa xe.'),
  },
  {
    id: 'oto',
    place: 'car',
    t: () => 'Mua ô tô',
    d: () => 'Họ hàng đổi giọng hẳn. Nuôi xe mỗi năm tốn thêm một khoản không nhỏ. Tốn cả 2 lượt.',
    when: (x) => earning(x) && x.year >= 2005 && x.has('banglai') && !x.has('oto'),
    cost: (x) => priceAt(600_000_000, x.year),
    slots: 2,
    cd: -1,
    do: (fx, x) => (fx.cash(-priceAt(600_000_000, x.year)), fx.flag('oto'), fx.flag(`oto_${x.age}`), fx.stat('duyen', 4), fx.stat('noi', 3), fx.rel('bome', 4)),
    note: () => '🦋 Xe về đến sân, cả nhà ra chụp ảnh. Tết năm ấy chở bố mẹ về quê.',
  },
  {
    id: 'bieu',
    place: 'care',
    t: (x) => `Biếu ${x.bm} một khoản`,
    d: () => 'Bố mẹ +, Tình cảm gia đình ấm hơn. Một tháng lương.',
    when: (x) => earning(x) && x.f.parents !== 'Không còn bố mẹ' && !x.has('bm_mat'),
    cost: (x) => payOf(x),
    cd: 1,
    do: (fx, x, n) => (fx.rel('bome', n < 2 ? 10 : 5), fx.stat('tinh', 3), fx.flag(`bieu_${x.age}`)),
    note: (x) => (x.age >= 45 ? `${x.mom === 'mẹ' ? 'Mẹ' : 'Bà'} cất tiền vào hộp, bảo "để dành cho cháu".` : `${x.mom === 'mẹ' ? 'Mẹ' : 'Bà'} mắng "tiêu hoang", rồi đem khoe cả xóm.`),
  },
  {
    id: 'kham',
    place: 'care',
    t: (x) => (x.age >= 40 ? 'Khám sức khỏe tổng quát' : 'Đăng ký phòng tập'),
    d: () => 'Sức khỏe +. Nửa tháng lương.',
    when: (x) => earning(x) && x.age >= 25,
    cost: (x) => payOf(x) / 2,
    cd: 1,
    do: (fx, x) => (fx.stat('khoe', 5), fx.flag(`kham_${x.age}`)),
    note: (x) => (x.age >= 40 ? 'Bác sĩ dặn bớt rượu bia, ngủ sớm.' : 'Tuần đầu đi đủ ba buổi. Tuần thứ ba thì tùy.'),
  },
];

/** lượt đã dùng năm nay */
export const slotsUsed = (x: Ctx) =>
  x.s.flags.filter((f) => f.startsWith(`vi${x.age}_`)).reduce((a, f) => a + (WACTS.find((w) => w.id === f.slice(`vi${x.age}_`.length))?.slots ?? 1), 0);
export const SLOTS = 2;
/** đã làm việc này mấy lần, lần gần nhất năm bao nhiêu tuổi */
const doneOf = (x: Ctx, id: string) =>
  x.s.flags.filter((f) => /^vi\d+_/.test(f) && f.slice(f.indexOf('_') + 1) === id).map((f) => Number(f.slice(2, f.indexOf('_'))));

/** việc làm được lúc này, kèm lý do nếu bị khóa */
export function walletOf(x: Ctx): { a: WAct; lock: string | null; cost: number }[] {
  const left = SLOTS - slotsUsed(x);
  return WACTS.filter((a) => a.when(x)).map((a) => {
    const cost = Math.round(a.cost(x));
    const ages = doneOf(x, a.id);
    const last = ages.length ? Math.max(...ages) : -99;
    let lock: string | null = null;
    if (a.cd === -1 && ages.length) lock = 'Đã làm rồi';
    else if (last === x.age) lock = 'Năm nay làm rồi';
    else if (a.cd && x.age - last <= a.cd) lock = `Đợi ${a.cd + 1 - (x.age - last)} năm nữa`;
    else if ((a.slots ?? 1) > left) lock = left ? 'Cần cả 2 lượt' : 'Hết lượt năm nay';
    else if (cost > 0 && cost > cash(x)) lock = 'Chưa đủ tiền';
    return { a, lock, cost };
  });
}

/** làm một việc trong ví: chạy qua choose() như một cảnh một lựa chọn, không tính là một lần "hỏi" của truyện chính */
export function doWallet(R: Resolve, c: Character, f: Family, s0: Story, age: number, id: string): { s: Story; fb: Feedback; t: string } {
  const a = WACTS.find((w) => w.id === id)!;
  const cur = R(s0.scene, s0);
  const x = ctxOf(c, f, s0, age);
  const n = doneOf(x, id).length;
  const cost = Math.round(a.cost(x));
  const scene: Scene = {
    id: `vi@${age}`,
    age,
    chapter: cur?.chapter ?? 'Tuổi trẻ',
    title: 'Ví tiền',
    text: () => [],
    choices: [
      {
        t: a.t,
        do: (fx, cx) => {
          fx.flag(`vi${age}_${id}`);
          // việc có giá mà tự hàm `do` không trừ tiền thì trừ ở đây (đầu tư, nhà, ô tô tự trừ)
          if (cost > 0 && !['tk', 'ck', 'coin', 'dat', 'nha', 'oto'].includes(id)) fx.cash(-cost);
          a.do(fx, cx, n);
        },
        note: (cx) => a.note(cx, n),
      },
    ],
    next: s0.scene,
  };
  const R2: Resolve = (sid, st) => (sid === scene.id ? scene : R(sid, st));
  const r = choose(R2, c, f, { ...s0, scene: scene.id }, 0);
  // không tính vào nhịp hỏi của truyện chính
  r.s.path = r.s.path.filter((p) => p.scene !== scene.id);
  return { ...r, t: a.t(x) };
}

/** truyện chính nhắc lại những gì đã làm trong ví, nhiều năm sau */
export function walletEcho(x: Ctx): string[] {
  const out: string[] = [];
  // năm năm một lần: sổ tiền nói thật, lương bao nhiêu, để dành được bao nhiêu
  if (x.age % 5 === 0 && x.age < 60 && x.s.flags.some((f) => f.startsWith('luong_'))) {
    const y = savingOf(x.s, x.year, x.age);
    out.push(`Lương ${fmtVND(payOf(x))}/tháng. ${y > 0 ? `Năm nay để dành được ${fmtVND(y)}` : 'Năm nay tiêu hết, không để dành được đồng nào'}. Tổng tài sản: ${fmtCash(cash(x))}.`);
  }
  const ago = (pre: string) => {
    const f = x.s.flags.find((g) => g.startsWith(pre) && /^\d+$/.test(g.slice(pre.length)));
    return f ? x.age - Number(f.slice(pre.length)) : -1;
  };
  if (ago('nha_gop_') === 20 && x.has('nha_vi')) out.push('🦋 Trả xong đồng trả góp cuối cùng. Cầm sổ hồng mà tay run.');
  if (ago('thacsi_') === 5) out.push('🦋 Tấm bằng học đêm năm ấy cuối cùng cũng có giá: được đề bạt lên trưởng phòng.');
  if (ago('oto_') === 10) out.push('Chiếc ô tô mua mười năm trước giờ đã cũ, đi đâu cũng kêu lạch cạch.');
  if (ago('xemay_') === 15) out.push('🦋 Chiếc xe máy đầu tiên vẫn dựng trong góc sân, không nỡ bán.');
  const dat = x.s.flags.find((g) => g.startsWith('datvi_'));
  if (dat && x.age - Number(dat.slice(6)) === 10) {
    const v = holdVal(x, 'dat');
    const i = holdIn(x, 'dat');
    if (i) out.push(v >= i * 1.5 ? `🦋 Mảnh đất mua mười năm trước, giờ có người trả ${fmtVND(v)}.` : 'Mảnh đất mua mười năm trước vẫn cỏ mọc um tùm, giá chẳng nhích bao nhiêu.');
  }
  if (x.has('ck_chay') && x.age % 10 === 0 && x.age >= 40) out.push('Đồng nghiệp rủ mua cổ phiếu. Nhớ lần cắt lỗ năm nào, lắc đầu.');
  const nn = x.s.flags.find((g) => g.startsWith('nn_'));
  if (nn && x.age - Number(nn.slice(3)) === 12) out.push('🦋 Tấm ảnh chuyến đi nước ngoài đầu tiên vẫn dán trên cửa tủ lạnh.');
  return out;
}
