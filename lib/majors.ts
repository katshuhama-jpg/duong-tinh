/**
 * Thi cử có may rủi: khả năng đỗ theo sức học (hoặc năng khiếu), có ghi rõ cạnh lựa chọn.
 * Nguyện vọng đại học: nhiều ngành, có cả ngành năng khiếu; ngành quyết định gặp ai và nghề đầu tiên.
 */
import type { Ctx, Fx, LoveId } from './story';

/** điểm sàn theo thời: trước 2000 thi khó, sau 2015 nhiều trường hơn */
export const passMark = (y: number) => (y < 2000 ? 64 : y < 2015 ? 55 : 50);

/** khả năng đỗ (0-1) khi sức `score` thi vào chỗ cần `req` */
export const chanceOf = (score: number, req: number) => Math.max(0.03, Math.min(0.97, 0.5 + (score - req) / 25));
/** khả năng người ấy nhận lời */
export const loveLabel = (p: number) => (p >= 0.85 ? 'gần như chắc' : p >= 0.6 ? 'khá cao' : p >= 0.4 ? 'năm ăn năm thua' : p >= 0.2 ? 'hơi khó' : 'khó lắm');
export const chanceLabel = (p: number) => (p >= 0.85 ? 'chắc đỗ' : p >= 0.6 ? 'khá chắc' : p >= 0.4 ? 'năm ăn năm thua' : p >= 0.2 ? 'hơi xa' : 'xa vời');
/** số may rủi cố định theo đời và theo kỳ thi (quay lại vẫn ra cùng kết quả) */
export function luck(x: Ctx, key: string) {
  let h = 2166136261 ^ (x.s.seed ?? 0);
  const k = `${key}|${x.age}`;
  for (let i = 0; i < k.length; i++) h = Math.imul(h ^ k.charCodeAt(i), 16777619);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return ((h >>> 0) % 1000) / 1000;
}
/** đang đặt mục tiêu học tập thì thi tốt hơn một chút */
export const studyBonus = (x: Ctx) => (x.s.goal === 'hoc' ? 6 : 0);

export interface Major {
  k: string;
  name: string;
  ok: (x: Ctx) => boolean;
  /** sức thi: học lực, hoặc năng khiếu */
  score: (x: Ctx) => number;
  /** điểm cần */
  req: (x: Ctx) => number;
  mom: string;
  people: LoveId[];
  note: string;
  do: (fx: Fx) => void;
  /** việc đầu tiên đúng ngành khi ra trường */
  job: { t: string; pay: number; hint: string; do: (fx: Fx) => void };
}
const pm = (x: Ctx) => passMark(x.year);
const hoc = (x: Ctx) => x.s.stats.hoc + studyBonus(x);
export const MAJORS: Major[] = [
  { k: 'y', name: 'Y khoa', ok: () => true, score: hoc, req: (x) => pm(x) + 22, mom: 'Làm bác sĩ là nhất, cả họ được nhờ.', people: ['phong'], note: '🦋 Sáu năm áo blouse trắng, trực đêm là chuyện thường.', do: (fx) => (fx.stat('hoc', 6), fx.stat('khoe', -3)), job: { t: 'Vào bệnh viện, trực đêm cách ngày', pay: 9_000_000, hint: 'Lương thấp lúc đầu, trực đêm vất vả, càng già càng quý', do: (fx) => (fx.stat('tien', 8), fx.stat('khoe', -3)) } },
  { k: 'luat', name: 'Luật', ok: () => true, score: hoc, req: (x) => pm(x) + 13, mom: 'Học luật sau này cãi được cho cả nhà.', people: ['tuananh'], note: '🦋 Tranh biện mỗi tuần, nói gì cũng phải có căn cứ.', do: (fx) => (fx.stat('hoc', 5), fx.stat('noi', 2)), job: { t: 'Vào văn phòng luật, cặp da tài liệu dày cộp', pay: 12_000_000, hint: 'Lương khá, hồ sơ chất đống, giỏi thì thu nhập rất cao', do: (fx) => (fx.stat('tien', 9), fx.stat('tam', -2)) } },
  { k: 'it', name: 'Công nghệ thông tin', ok: (x) => x.year >= 1993, score: (x) => hoc(x) + (x.s.stats.noi > 50 ? 3 : 0), req: (x) => pm(x) + (x.year >= 2015 ? 14 : 10), mom: 'Máy tính là tương lai đấy con.', people: ['tuananh', 'kai'], note: '🦋 Phòng máy toàn con trai, đêm nào cũng code đến sáng.', do: (fx) => (fx.stat('hoc', 4), fx.stat('tien', 6)), job: { t: 'Vào công ty phần mềm, lương khởi điểm cao', pay: 18_000_000, hint: 'Lương cao nhưng áp lực deadline, ngồi máy cả ngày', do: (fx) => (fx.stat('tien', 11), fx.stat('khoe', -2)) } },
  { k: 'kt', name: 'Kinh tế, ngân hàng', ok: () => true, score: hoc, req: (x) => pm(x) + 10, mom: 'Vào ngân hàng cho ổn định.', people: ['tuananh', 'bao'], note: '🦋 Câu lạc bộ, thực tập, ai cũng nói chuyện "khởi nghiệp".', do: (fx) => (fx.stat('tien', 8), fx.stat('duyen', 2)), job: { t: 'Vào ngân hàng, mặc sơ mi trắng mỗi ngày', pay: 12_000_000, hint: 'Lương khá nhưng chỉ tiêu dí sát từng tháng', do: (fx) => (fx.stat('tien', 9), fx.stat('tam', -2)) } },
  { k: 'ca', name: 'Công an, quân đội', ok: () => true, score: (x) => (hoc(x) + x.s.stats.khoe) / 2, req: (x) => pm(x) + 10, mom: 'Vào ngành thì cả đời không lo thất nghiệp.', people: ['long'], note: '🦋 Năm giờ sáng tập trung, gấp chăn vuông như bánh chưng.', do: (fx) => (fx.stat('khoe', 6), fx.stat('noi', -3)), job: { t: 'Về đơn vị, có biên chế, có nhà công vụ', pay: 9_000_000, hint: 'Lương vừa, kỷ luật nghiêm, ổn định cả đời', do: (fx) => (fx.stat('tien', 6), fx.stat('tam', 3), fx.flag('ms_congchuc')) } },
  { k: 'kientruc', name: 'Kiến trúc', ok: () => true, score: (x) => (hoc(x) + x.s.stats.duyen) / 2 + 3, req: (x) => pm(x) + 8, mom: 'Kiến trúc sư thì oai, nhưng học vất lắm.', people: ['hung'], note: '🦋 Thức trắng làm đồ án, bàn đầy giấy can và keo nến.', do: (fx) => (fx.stat('hoc', 3), fx.stat('duyen', 3)), job: { t: 'Vào công ty thiết kế, vẽ nhà cho người khác', pay: 10_000_000, hint: 'Lương vừa, thức đêm sửa bản vẽ theo ý khách', do: (fx) => (fx.stat('tien', 7), fx.stat('duyen', 2)) } },
  { k: 'baochi', name: 'Báo chí, truyền thông', ok: () => true, score: (x) => (hoc(x) + x.s.stats.duyen) / 2 + 3, req: (x) => pm(x) + 6, mom: 'Nhà báo thì đi nhiều, biết nhiều.', people: ['quan', 'hung'], note: '🦋 Thực tập ở tòa soạn, chạy tin cả ngày.', do: (fx) => (fx.stat('duyen', 4), fx.stat('noi', 3)), job: { t: 'Làm phóng viên, chạy tin khắp nơi', pay: 8_000_000, hint: 'Lương không cao, đi nhiều, quen nhiều', do: (fx) => (fx.stat('tien', 5), fx.stat('duyen', 5)) } },
  { k: 'nn', name: 'Ngoại ngữ', ok: () => true, score: (x) => hoc(x) + (x.has('ac_tienganh') ? 8 : 0), req: (x) => pm(x) + 6, mom: 'Giỏi tiếng thì đi đâu cũng được.', people: ['kai'], note: '🦋 Nói chuyện với người nước ngoài ở phố đi bộ mỗi tối thứ bảy.', do: (fx) => (fx.stat('hoc', 4), fx.flag('ac_tienganh')), job: { t: 'Làm phiên dịch cho công ty nước ngoài', pay: 14_000_000, hint: 'Lương cao, hay đi công tác theo sếp nước ngoài', do: (fx) => (fx.stat('tien', 8), fx.stat('duyen', 3)) } },
  { k: 'sp', name: 'Sư phạm', ok: () => true, score: hoc, req: (x) => pm(x) - 2, mom: 'Làm cô giáo, thầy giáo, nhàn mà được kính trọng.', people: ['minh'], note: '🦋 Lớp toàn người hiền, thực tập ở trường cấp ba cũ.', do: (fx) => (fx.stat('tinh', 5), fx.stat('tam', 4)), job: { t: 'Về dạy ở trường cấp ba', pay: 6_000_000, hint: 'Lương thấp nhưng ổn định, có hè nghỉ', do: (fx) => (fx.stat('tien', 3), fx.stat('tam', 6), fx.flag('ms_congchuc')) } },
  { k: 'dulich', name: 'Du lịch, khách sạn', ok: (x) => x.year >= 1995, score: (x) => (hoc(x) + x.s.stats.duyen) / 2 + 4, req: (x) => pm(x) - 4, mom: 'Ngành này đi chơi mà vẫn có lương.', people: ['duy', 'kai'], note: '🦋 Thực tập dẫn đoàn, mỗi tuần một tỉnh.', do: (fx) => (fx.stat('duyen', 4), fx.stat('tam', 3)), job: { t: 'Làm hướng dẫn viên, mỗi tuần một chuyến', pay: 8_000_000, hint: 'Lương vừa, đi suốt, ít ở nhà', do: (fx) => (fx.stat('tien', 5), fx.stat('tam', 4)) } },
  { k: 'nong', name: 'Nông lâm, thủy sản', ok: () => true, score: hoc, req: (x) => pm(x) - 10, mom: 'Học nông nghiệp, về làm trang trại cũng được.', people: ['khoi'], note: '🦋 Thực tập ở trại giống, về đen nhẻm.', do: (fx) => (fx.stat('khoe', 3), fx.stat('tinh', 3)), job: { t: 'Về quê làm trang trại, trồng rau sạch', pay: 6_000_000, hint: 'Lương thấp lúc đầu, nhưng làm chủ mảnh đất của mình', do: (fx) => (fx.stat('tien', 4), fx.stat('khoe', 4), fx.flag('o_que')) } },
  { k: 'nt', name: 'Năng khiếu: Âm nhạc, Sân khấu', ok: () => true, score: (x) => x.s.stats.duyen + (x.s.stats.noi > 55 ? 4 : 0), req: () => 58, mom: 'Học cái gì cho ra tiền ấy, nghệ thuật đói lắm.', people: ['hai', 'quan', 'tai'], note: '🦋 Giảng đường đầy người đẹp, ai cũng muốn nổi tiếng.', do: (fx) => (fx.stat('duyen', 6), fx.stat('noi', 4)), job: { t: 'Đi diễn, hát phòng trà, nhận vai phụ', pay: 5_000_000, hint: 'Thu nhập bấp bênh, nổi tiếng thì giàu to', do: (fx) => (fx.stat('tien', 3), fx.stat('duyen', 7)) } },
  { k: 'my', name: 'Năng khiếu: Mỹ thuật', ok: () => true, score: (x) => (x.s.stats.duyen + x.s.stats.noi) / 2 + 5, req: () => 55, mom: 'Vẽ thì lấy gì mà ăn hả con?', people: ['hung'], note: '🦋 Xưởng vẽ thơm mùi sơn dầu, ai cũng lấm lem.', do: (fx) => (fx.stat('duyen', 4), fx.stat('tam', 4)), job: { t: 'Vẽ minh họa tự do, nhận đơn qua mạng', pay: 5_000_000, hint: 'Thu nhập thất thường, được làm điều mình thích', do: (fx) => (fx.stat('tien', 3), fx.stat('tam', 5)) } },
  { k: 'tt', name: 'Năng khiếu: Thể dục thể thao', ok: () => true, score: (x) => x.s.stats.khoe, req: () => 72, mom: 'Khỏe thì đi thi, mà chấn thương thì sao?', people: ['long'], note: '🦋 Sáng chạy mười vòng sân, chiều tập đến tối.', do: (fx) => (fx.stat('khoe', 8), fx.stat('hoc', -2)), job: { t: 'Làm huấn luyện viên ở trung tâm thể thao', pay: 7_000_000, hint: 'Lương vừa, sống khỏe, chấn thương là phải nghỉ', do: (fx) => (fx.stat('tien', 5), fx.stat('khoe', 4)) } },
];
export const majorOf = (s: { flags: string[] }) => MAJORS.find((m) => s.flags.includes(`nganh_${m.k}`)) ?? null;
export const chanceMajor = (x: Ctx, m: Major) => chanceOf(m.score(x), m.req(x));
/** nguyện vọng hiện ra: từ ngành khó đến ngành dễ, bỏ những ngành gần như không có cửa; luôn có ít nhất một ngành chắc ăn */
export function wishesOf(x: Ctx, bonus = 0): Major[] {
  const ok = MAJORS.filter((m) => m.ok(x));
  const p = (m: Major) => chanceOf(m.score(x) + bonus, m.req(x));
  const shown = ok.filter((m) => p(m) >= 0.1).sort((a, b) => a.req(x) - b.req(x)).reverse();
  // tối đa 7: ưu tiên đủ khó, đủ dễ, đủ năng khiếu
  const pickd = shown.length > 7 ? [...shown.slice(0, 4), ...shown.slice(-3)] : shown;
  if (!pickd.some((m) => p(m) >= 0.6)) {
    const safe = ok.sort((a, b) => p(b) - p(a))[0];
    if (safe && !pickd.includes(safe)) pickd.push(safe);
  }
  return pickd;
}
