/**
 * Tuyến riêng của từng người: mỗi người một kiểu yêu, một tật xấu, một kiểu drama.
 * Người giàu, người nghèo, ngôi sao, người bình thường đi những lối rất khác nhau.
 * Nội dung lấy từ các buổi brainstorm (vai người vợ chơi thử và vai Tyler), lưu ở arcs-*.json.
 */
import type { Choice, Ctx, Fx, LoveId, Scene } from './story';
import type { Bg } from '@/components/Backdrop';
import ARCS_RAW from './arcs-people.json';
import SITS_RAW from './arcs-situations.json';
import { MONEY_OF } from './lovemoney';

type RawChoice = { t: string; result: string; effect: string };
type RawBeat = { title: string; tone: string; text: string; choices: RawChoice[] };
type RawArc = { flaw: string; date: RawBeat[]; married: RawBeat[] };
type RawSit = { id: string; group: 'A' | 'B' | 'C' | 'D'; cond: string; title: string; text: string; choices: RawChoice[] };

const ARCS = ARCS_RAW as unknown as Record<string, RawArc>;
const SITS = SITS_RAW as unknown as RawSit[];

/** thay {n} bằng tên người ấy, {me} bằng tên mình */
const fill = (t: string, x: Ctx, id: LoveId) =>
  t
    .replace(/\{n\}/g, x.L(id))
    .replace(/\{me\}/g, x.me)
    // chữ theo giới: mình là nữ thì "dâu", nam thì "rể"; người ấy nữ thì "giày cao gót"...
    .replace(/\{dâu\}/g, x.c.gender === 'f' ? 'dâu' : 'rể')
    .replace(/\{con dâu\}/g, x.c.gender === 'f' ? 'con dâu' : 'con rể')
    .replace(/\{cô\}/g, x.c.gender === 'f' ? 'cô' : 'cậu')
    .replace(/\{chị\}/g, x.c.gender === 'f' ? 'chị' : 'anh')
    .replace(/\{Ba\}/g, x.lg === 'm' ? 'Ba' : 'Mẹ')
    .replace(/\{cởi giày\}/g, x.lg === 'f' ? 'cởi đôi giày cao gót' : 'nới cà vạt')
    .replace(/—/g, '-');

/** đọc dòng hệ quả do người viết kịch bản ghi ("♥ +10, tiền -5, chia tay") thành thay đổi thật */
export function applyEffect(fx: Fx, x: Ctx, id: LoveId, effect: string, tone: string) {
  const e = effect.toLowerCase();
  const num = (re: RegExp) => {
    const m = re.exec(e);
    return m ? Number(m[1].replace('−', '-').replace(/\s/g, '')) : null;
  };
  // người viết kịch bản hay ghi số nhỏ (♥ +2): quy ra thang 100
  const big = (n: number, k: number) => (Math.abs(n) <= 5 ? n * k : n);
  const love = num(/♥\s*([+\-−]\s*\d+)/) ?? num(/tình cảm\s*([+\-−]\s*\d+)/);
  if (love !== null) fx.love(id, big(love, 5));
  else if (/♥\s*\+|♥\+|tăng/.test(e)) fx.love(id, 8);
  else if (/♥\s*-|♥-|giảm/.test(e)) fx.love(id, -8);
  else fx.love(id, tone === 'drama' ? 2 : 5);
  const tien = num(/tiền\s*([+\-−]\s*\d+)/);
  if (tien !== null) fx.stat('tien', Math.max(-20, Math.min(20, big(tien, 4))));
  const nha = num(/nhà họ\s*([+\-−]\s*\d+)/);
  if (nha !== null) fx.stat('tam', big(nha, 2));
  // cờ để những câu sau nhắc lại
  for (const m of e.matchAll(/cờ:\s*([\p{L}_\d]+)/gu)) fx.flag(`co_${m[1]}`);
  const tam = num(/vui vẻ\s*([+\-−]\s*\d+)/) ?? num(/tâm lý\s*([+\-−]\s*\d+)/);
  if (tam !== null) fx.stat('tam', big(tam, 3));
  const noi = num(/nổi loạn\s*([+\-−]\s*\d+)/);
  if (noi !== null) fx.stat('noi', noi);
  const bm = num(/bố mẹ\s*([+\-−]\s*\d+)/);
  if (bm !== null) fx.rel('bome', bm);
  if (/ly hôn/.test(e) && x.s.married) {
    fx.loveEnd(`lyhon_${id}`);
    fx.divorce();
  } else if (/chia tay|mất người ấy|rời đi|kết thúc/.test(e) && !x.s.married) fx.drop(id);
}

const BGS: Bg[] = [
  { place: 'quan', time: 'dusk' },
  { place: 'pho', time: 'night' },
  { place: 'congvien', time: 'dusk' },
  { place: 'phong', time: 'night' },
  { place: 'nha', time: 'day' },
];

/** một khúc thành một cảnh */
function beatScene(b: RawBeat, id: LoveId, base: Pick<Scene, 'id' | 'age' | 'chapter' | 'next'>, mark: (fx: Fx) => void, k: number): Scene {
  return {
    ...base,
    core: true,
    title: b.title,
    who: () => id,
    bg: () => BGS[k % BGS.length],
    text: (x) => [fill(b.text, x, id)],
    choices: b.choices.slice(0, 3).map(
      (c): Choice => ({
        t: (x) => fill(c.t, x, id),
        do: (fx, x) => (mark(fx), applyEffect(fx, x, id, c.effect, b.tone)),
        note: (x) => fill(c.result, x, id),
      }),
    ),
  };
}

/** khúc hẹn hò thứ `k` (0-3) của người ấy, hoặc null nếu không có */
export function dateBeat(id: LoveId, k: number, base: Pick<Scene, 'id' | 'age' | 'chapter' | 'next'>, mark: (fx: Fx) => void): Scene | null {
  const b = ARCS[id]?.date?.[k];
  return b ? beatScene(b, id, base, mark, k) : null;
}
export const dateBeats = (id: LoveId) => ARCS[id]?.date?.length ?? 0;
export const flawOf = (id: LoveId) => ARCS[id]?.flaw ?? '';

/** sau cưới: khúc riêng của người ấy (năm thứ 2 và năm thứ 8 trở đi) */
export function marriedBeat(x: Ctx, age: number, next: string): Scene | null {
  const id = x.s.partner && x.s.partner !== 'xemmat' ? x.s.partner : null;
  if (!id || !x.s.married || x.s.marriedAge == null) return null;
  const ym = age - x.s.marriedAge;
  const arc = ARCS[id];
  if (!arc) return null;
  const k = ym >= 8 && !x.has(`pa_${id}_1`) && x.has(`pa_${id}_0`) ? 1 : ym >= 2 && !x.has(`pa_${id}_0`) ? 0 : -1;
  if (k < 0 || !arc.married[k]) return null;
  return beatScene(arc.married[k], id, { id: `pa@${age}`, age, chapter: 'Lập gia đình', next }, (fx) => fx.flag(`pa_${id}_${k}`), k + 2);
}

/* ---------- tình huống theo hoàn cảnh: yêu người giàu, người nghèo, theo tật xấu, và những lúc bình yên ---------- */
const RICH: LoveId[] = ['tuananh', 'quan', 'hung', 'kai'];
const isRich = (id: LoveId) => RICH.includes(id) || MONEY_OF[id] === 'giau';
const isPoor = (id: LoveId) => ['hai', 'long', 'khoi', 'duy', 'bao'].includes(id) || MONEY_OF[id] === 'mo';
const married = (s: RawSit) => /cưới|vợ chồng|sau cưới/i.test(s.cond) && !/chưa cưới/i.test(s.cond);
const unmarried = (s: RawSit) => /chưa cưới|hẹn hò|đang yêu/i.test(s.cond);

/** một tình huống hợp với đời này (chưa gặp), cho năm `age` */
export function situationAt(x: Ctx, age: number, next: string, calm: boolean): Scene | null {
  const id = x.s.partner && x.s.partner !== 'xemmat' ? x.s.partner : null;
  if (!id) return null;
  const ok = SITS.filter((s) => {
    if (x.has(`sit_${s.id}`)) return false;
    if (married(s) && !x.s.married) return false;
    if (unmarried(s) && x.s.married) return false;
    if (s.group === 'A') return isRich(id) && !calm;
    if (s.group === 'B') return isPoor(id) && !calm;
    if (s.group === 'C') return !calm && flawMatch(id, s);
    return calm || (x.s.seed ?? 0) % 3 === 0;
  });
  if (!ok.length) return null;
  const s = ok[((x.s.seed ?? 0) + age * 7) % ok.length];
  return {
    id: `sit@${age}`,
    age,
    chapter: x.s.married ? 'Lập gia đình' : 'Tuổi trẻ',
    next,
    core: s.group !== 'D',
    title: s.title,
    who: () => id,
    bg: () => BGS[(age + s.id.length) % BGS.length],
    text: (cx) => [fill(s.text, cx, id)],
    choices: s.choices.slice(0, 3).map(
      (c): Choice => ({
        t: (cx) => fill(c.t, cx, id),
        do: (fx, cx) => (fx.flag(`sit_${s.id}`), applyEffect(fx, cx, id, c.effect, s.group === 'D' ? 'ngọt' : 'drama')),
        note: (cx) => fill(c.result, cx, id),
      }),
    ),
  };
}
/** tật xấu của người ấy có khớp với tình huống không (đọc từ chữ trong điều kiện) */
function flawMatch(id: LoveId, s: RawSit) {
  const f = (ARCS[id]?.flaw ?? '').toLowerCase();
  const c = s.cond.toLowerCase() + ' ' + s.title.toLowerCase();
  const keys = ['ghen', 'kiểm soát', 'nghiện việc', 'mẹ', 'sĩ diện', 'nói dối', 'keo', 'lăng nhăng', 'nóng', 'vô tâm', 'ích kỷ', 'gia trưởng', 'ham', 'cờ bạc', 'nhậu'];
  return keys.some((k) => c.includes(k) && f.includes(k));
}
