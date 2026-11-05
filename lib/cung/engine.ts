/**
 * Bộ máy một đời trong cung: rút thẻ, áp hệ quả, đếm năm, lương, chặng, kết cục.
 * Thuần dữ liệu (không đụng tới giao diện) để chạy thử hàng loạt bằng script.
 */
import { TALES } from './content/tales';
import type { Card, ChapterSnap, Choice, Cond, Fx, Life, NumK, RivalK, RivalState } from './types';
import { CHAPTERS, DAUGHTER_NAMES, HOANG_HAU_RANK, RANKS, RIVALS, SON_NAMES, THAI_HAU, THAI_PHI, endingOf, gone, guardsOf, type Rank } from './world';
import { CRISIS } from './content/big';
import { ALL_BIG, BRANCH_CARDS, SMALL, bigsOf } from './content/index';
import { fillText, originOf } from './origins';

const ALL: Card[] = [...ALL_BIG, ...CRISIS, ...SMALL, ...BRANCH_CARDS];
const URGENT = SMALL.filter((c) => c.urgent);
export const cardOf = (id: string) => ALL.find((c) => c.id === id) ?? null;

/* ---------- ngẫu nhiên có hạt giống: cùng một đời, cùng một bước thì ra cùng một kết quả ---------- */
function rand(seed: number, salt: string) {
  let h = 2166136261 ^ seed;
  for (let i = 0; i < salt.length; i++) h = Math.imul(h ^ salt.charCodeAt(i), 16777619);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}
const step = (l: Life) => `${l.seen.length}|${l.log.length}|${Math.round(l.age * 2)}`;

export function newLife(name: string, origin = 'dan', seed = Math.floor(Math.random() * 1e9)): Life {
  const o = originOf(origin);
  const l: Life = {
    v: 'cung1',
    seed,
    origin: o.k,
    name: name.trim() || 'Nụ',
    age: 18,
    rank: o.rank,
    n: { duc: 50, sac: 55, the: 12, an: 16, muu: 30, vua: 0, thaihau: 0, hoanghau: 0, thucphi: -10, hanh: 30, phuc: 0, quan: 0, tuong: 0, tien: 30, ...o.n },
    flags: [...o.flags],
    kids: [],
    chapter: 1,
    smalls: 0,
    bigAt: 0,
    seen: [],
    log: [{ age: 18, t: `Năm Khánh Vân thứ ba. ${o.t}: ${o.intro[0]}`, k: 'year' }],
    card: null,
    end: null,
    back: null,
    startedAt: Date.now(),
    relV: 2,
    fresh: [],
    riv: rivInit(1),
  };
  l.chStart = snapOf(l);
  pickFocus(l);
  l.showCh = { to: 1 };
  l.card = nextCard(l);
  queueTale(l);
  return l;
}

export const snapOf = (l: Life): ChapterSnap => ({ ch: l.chapter, age: l.age, rank: rankOf(l).t, n: { ...l.n }, logLen: l.log.length, kids: l.kids.length, riv: l.riv ? JSON.parse(JSON.stringify(l.riv)) : undefined });

/* ---------- bàn cờ mối nguy ---------- */
export function rivInit(ch: number): Record<RivalK, RivalState> {
  const r = {} as Record<RivalK, RivalState>;
  for (const x of RIVALS) r[x.k] = { th: ch >= x.from ? x.th : 0, ev: 0, st: ch >= x.from ? 'manh' : 'an' };
  return r;
}
const clamp100 = (v: number) => Math.max(0, Math.min(100, Math.round(v)));
/** cờ cũ trong nội dung cũng đổi bàn cờ (để các tuyến viết trước vẫn ăn khớp) */
const FLAG_RIV: Record<string, Partial<Record<RivalK, { th?: number; ev?: number; st?: RivalState['st'] }>>> = {
  thang_thucphi: { thucphi: { th: -25, st: 'yeu' } },
  duoi_thucphi: { thucphi: { st: 'giang' } },
  thu_thucphi: { thucphi: { th: 15 } },
  biet_doc_thucphi: { thucphi: { ev: 30 } },
  biet_bimat_thucphi: { thucphi: { ev: 25 } },
  diet_dich: { hoanghau: { st: 'chet' } },
  ban_hau: { hoanghau: { st: 'phuc' } },
  q_thang_ton: { thaipho: { th: -25, st: 'yeu' } },
  q_diet_ton: { thaipho: { st: 'chet' } },
  q_bang_ton: { thaipho: { st: 'giang' } },
  thang_phan: { nghia: { st: 'giang' } },
};
export function applyRiv(l: Life, d: Fx['riv']) {
  if (!d) return;
  l.riv = l.riv ?? rivInit(l.chapter);
  for (const [k, v] of Object.entries(d) as [RivalK, { th?: number; ev?: number; st?: RivalState['st'] }][]) {
    const r = l.riv[k];
    if (!r || !v) continue;
    if (gone(r.st) && !v.st) continue;
    if (v.st) r.st = v.st;
    else if (r.st === 'an' && (v.th || v.ev)) r.st = 'manh';
    if (v.th) r.th = clamp100(r.th + v.th);
    if (v.ev) r.ev = clamp100(r.ev + v.ev);
    if (gone(r.st)) r.th = 0;
    else if (r.th <= 10 && r.st === 'manh') r.st = 'yeu';
    else if (r.th >= 30 && r.st === 'yeu') r.st = 'manh';
  }
}
/** lời kể trước một sự kiện lớn: chỉ một lần mỗi đời */
function queueTale(l: Life) {
  const id = l.card;
  if (!id || l.end || l.seen.includes(id) || (l.tales ?? []).some((x) => x.card === id)) return;
  const tl = TALES[id];
  if (!tl) return;
  l.tales = [...(l.tales ?? []), { t: tl.t, lines: tl.lines.map((x) => fillText(x, l.origin)), card: id }];
  l.log.push({ age: Math.floor(l.age), t: `${tl.t}. ${fillText(tl.lines[0], l.origin)}`, k: 'tale' });
}
/** lời kể khi một mối nguy ngã */
function fallTale(k: RivalK, st: RivalState['st']): { t: string; lines: string[]; riv: RivalK } | null {
  const n = RIV_NAME[k];
  if (st === 'chet')
    return { t: `${n} không còn`, riv: k, lines: [`Trong cung, người chết không được nhắc tên quá ba ngày. Viện của ${n} khóa lại, đồ đạc kiểm kê vào kho, người hầu chia về các viện khác.`, 'Có người khóc thật, có người khóc cho phải lẽ. Bạn nhớ từng việc người ấy đã làm với mình, và cả cái giá mình đã trả để có ngày hôm nay.', 'Một cái ghế trong hậu cung vừa trống. Sẽ có người khác muốn ngồi vào.'] };
  if (st === 'giang')
    return { t: `${n} rời khỏi cuộc chơi`, riv: k, lines: [`Chiếu xuống vào một buổi sáng rất bình thường. ${n} rời chỗ cũ, mang theo ít hơn những gì đã mang đến.`, 'Những người từng theo hầu lần lượt tìm chủ mới. Có mấy người tìm đến cửa viện bạn.', 'Trong cung không ai ngã hẳn, chỉ là chưa đứng dậy được. Bạn biết vậy, nên chưa vội mừng.'] };
  if (st === 'phuc')
    return { t: `${n} cúi đầu`, riv: k, lines: [`Chiều ấy ${n} tự đến viện bạn, không mang theo ai, lần đầu tiên cúi đầu trước.`, 'Kẻ thù quy phục là người hiểu mình nhất, cũng là người phải canh kỹ nhất.', 'Từ nay, những gì ' + n + ' biết về hậu cung cũng là của bạn.'] };
  return null;
}
const RIV_NAME = Object.fromEntries(RIVALS.map((x) => [x.k, x.t])) as Record<RivalK, string>;
const ST_LOG: Partial<Record<RivalState['st'], string>> = { giang: 'bị giáng, rời khỏi cuộc chơi', chet: 'đã chết', phuc: 'đã quy phục bạn', yeu: 'thất thế' };

/** liên minh giữa hai mối nguy: lưu bằng cờ lien:<a>+<b> (xếp theo chữ) */
export const allyFlag = (a: RivalK, b: RivalK) => `lien:${[a, b].sort().join('+')}`;
export const alliesOf = (l: Life): [RivalK, RivalK][] =>
  l.flags.filter((f) => f.startsWith('lien:')).map((f) => f.slice(5).split('+') as [RivalK, RivalK]);
/** đầu chương: hai kẻ mạnh nhất chưa liên minh có thể bắt tay nhau */
function formAlliance(l: Life) {
  const rv = l.riv;
  if (!rv) return;
  const alive = RIVALS.filter((x) => !x.of && (rv[x.k].st === 'manh') && rv[x.k].th >= 35).sort((a, b) => rv[b.k].th - rv[a.k].th);
  if (alive.length < 2) return;
  const [a, b] = [alive[0].k, alive[1].k];
  if (l.flags.includes(allyFlag(a, b))) return;
  if (rand(l.seed, `lien|${l.chapter}`) < 0.6) {
    l.flags.push(allyFlag(a, b));
    l.log.push({ age: Math.floor(l.age), t: `${RIV_NAME[a]} và ${RIV_NAME[b]} bắt tay nhau. Từ nay đánh một người là đụng cả hai.`, k: 'rank' });
  }
}
/** kẻ thù chính của chương: kẻ uy hiếp cao nhất đang lộng hành (và vây cánh của họ) */
function pickFocus(l: Life) {
  const rv = l.riv;
  if (!rv) return;
  // hai kẻ đầu sỏ đang lộng hành, kèm vây cánh còn sống của họ: mối nguy đến cùng lúc
  const top = RIVALS.filter((x) => !x.of && rv[x.k].st === 'manh').sort((a, b) => rv[b.k].th - rv[a.k].th).slice(0, 2);
  l.focus = top.flatMap((t) => [t.k, ...guardsOf(t.k).filter((g) => rv[g].st !== 'an' && !gone(rv[g].st))]);
}

/** bản lưu cũ (quan hệ 0-100): dời về thang -100..100 */
export const REL_KEYS = ['vua', 'thaihau', 'hoanghau', 'thucphi', 'hanh', 'phuc', 'quan', 'tuong'] as const;
const REL_OFF: Record<(typeof REL_KEYS)[number], number> = { vua: -20, thaihau: -30, hoanghau: -30, thucphi: -50, hanh: -20, phuc: -30, quan: -20, tuong: -10 };
export function migrate(l: Life): Life {
  const fix = (x: Omit<Life, 'back'> | Life) => {
    if (x.relV === 2) return;
    for (const k of REL_KEYS) x.n[k] = Math.max(-100, Math.min(100, (x.n[k] ?? 0) + REL_OFF[k]));
    x.relV = 2;
  };
  fix(l);
  if (l.back) fix(l.back);
  if (!l.riv) l.riv = rivInit(l.chapter);
  const fresh = rivInit(l.chapter);
  for (const k of Object.keys(fresh) as RivalK[]) if (!l.riv[k]) l.riv[k] = fresh[k];
  return l;
}

/* ---------- điều kiện ---------- */
export const sons = (l: Life) => l.kids.filter((k) => k.sex === 'trai').length;
export function ok(c: Cond | undefined, l: Life) {
  if (!c) return true;
  if (c.minAge != null && l.age < c.minAge) return false;
  if (c.maxAge != null && l.age > c.maxAge) return false;
  if (c.rankMin != null && l.rank < c.rankMin) return false;
  if (c.rankMax != null && l.rank > c.rankMax) return false;
  if (c.flags && !c.flags.every((f) => l.flags.includes(f))) return false;
  if (c.not && c.not.some((f) => l.flags.includes(f))) return false;
  if (c.sons != null && (c.sons === 0 ? sons(l) !== 0 : sons(l) < c.sons)) return false;
  if (c.kids != null && l.kids.length < c.kids) return false;
  if (c.num) for (const [k, [a, b]] of Object.entries(c.num) as [NumK, [number, number]][]) if (l.n[k] < a || l.n[k] > b) return false;
  if (c.riv) {
    const rv = l.riv ?? rivInit(l.chapter);
    for (const [k, q] of Object.entries(c.riv) as [RivalK, { st?: RivalState['st'][]; th?: [number, number]; ev?: [number, number] }][]) {
      const r = rv[k];
      if (!r || !q) continue;
      if (q.st && !q.st.includes(r.st)) return false;
      if (q.th && (r.th < q.th[0] || r.th > q.th[1])) return false;
      if (q.ev && (r.ev < q.ev[0] || r.ev > q.ev[1])) return false;
    }
  }
  return true;
}

/** bậc đang giữ (khi con lên ngôi thì thành thái phi / thái hậu) */
export const CUNG_NGA: Rank = { t: 'Cung nga', giai: 'Không phẩm', luong: 30, gao: 12, o: 'viện Hoán Y', phuong: 0, ao: '#8a8f7a', vien: '#5a5f4a' };
export function rankOf(l: Life): Rank {
  if (l.flags.includes('thai_hau')) return THAI_HAU;
  if (l.flags.includes('hoang_hau') && !(l.flags.includes('con_dongcung') && l.chapter >= 6)) return HOANG_HAU_RANK;
  if (l.flags.includes('cung_nga')) return CUNG_NGA;
  if (l.flags.includes('thai_phi') || (l.flags.includes('con_dongcung') && l.chapter >= 6)) return THAI_PHI;
  return RANKS[Math.max(0, Math.min(RANKS.length - 1, l.rank))];
}

/* ---------- rút thẻ ---------- */
const chap = (n: number) => CHAPTERS.find((c) => c.n === n)!;
export function nextCard(l: Life): string | null {
  if (l.end) return null;
  // nguy hiểm: ân sủng quá đầy, đức quá mỏng
  for (const c of CRISIS) {
    if (c.chapter.includes(l.chapter) && ok(c.when, l) && l.log[l.log.length - 1]?.t !== `#${c.id}`) return c.id;
  }
  // về già thì vào chặng cuối
  if (l.age >= 68 && l.chapter < 7) moveTo(l, 7);
  const ch = l.chapter;
  // bước ngoặt: đủ điều kiện là hiện ngay
  const turn = URGENT.find((c) => c.chapter.includes(ch) && !l.seen.includes(c.id) && ok(c.when, l));
  if (turn) return turn.id;
  if (l.smalls < chap(ch).smalls) {
    const pool = SMALL.filter((c) => !c.step && !c.urgent && c.chapter.includes(ch) && ok(c.when, l) && (c.repeat || !l.seen.includes(c.id)));
    if (pool.length) {
      // thẻ hệ quả của lựa chọn vừa rồi (cần cờ mới đặt) được ưu tiên, để chuyện nối tiếp chuyện
      const fresh = (l.fresh ?? []).map((x) => x.slice(x.indexOf(':') + 1));
      // nhịp phim: thẻ đầu chương ưu tiên "hook", thẻ ngay trước ngã rẽ lớn ưu tiên "lặng"
      const first = l.smalls === 0;
      const lastBefore = l.smalls === chap(ch).smalls - 1;
      const beatW = (c: Card) => (c.beat === 'hook' ? (first ? 8 : 0.4) : c.beat === 'lang' ? (lastBefore ? 8 : 0.5) : 1);
      const focus = l.focus ?? [];
      const focusW = (c: Card) => (c.when?.riv && Object.keys(c.when.riv).some((k) => focus.includes(k as RivalK)) ? 6 : c.when?.riv ? 3 : 1);
      const w = (c: Card) => (c.weight ?? 1) * beatW(c) * focusW(c) * (c.when?.flags?.some((f) => fresh.includes(f)) ? 8 : 1);
      const total = pool.reduce((a, c) => a + w(c), 0);
      let r = rand(l.seed, step(l)) * total;
      for (const c of pool) {
        r -= w(c);
        if (r <= 0) return c.id;
      }
      return pool[pool.length - 1].id;
    }
  }
  const bigs = bigsOf(ch);
  for (let i = l.bigAt; i < bigs.length; i++) {
    if (ok(bigs[i].when, l) && !l.seen.includes(bigs[i].id)) {
      l.bigAt = i;
      return bigs[i].id;
    }
  }
  // hết chặng: sang chặng sau (chặng Buông rèm chỉ khi mình nhiếp chính)
  if (ch >= 7) {
    finish(l, 'auto');
    return null;
  }
  let to = ch + 1;
  if (to === 6 && !l.flags.includes('nhiep')) to = 7;
  moveTo(l, to);
  return nextCard(l);
}

function moveTo(l: Life, ch: number) {
  // hết một chương: chụp lại để màn chương tổng kết đổi thay
  const end = snapOf(l);
  const from = l.chStart;
  const picks = from ? l.log.slice(from.logLen).filter((x) => x.k === 'pick').map((x) => x.t) : [];
  l.chapter = ch;
  l.smalls = 0;
  l.bigAt = 0;
  // sang chặng mới mà đang được sủng thì được thăng một bậc
  if (ch <= 5 && l.n.an >= 50 && l.rank < 9) promote(l, 1);
  l.log.push({ age: Math.floor(l.age), t: `Chương mới: ${chap(ch).t}.`, k: 'year' });
  // mối nguy mới lộ mặt khi sang chương của nó
  l.riv = l.riv ?? rivInit(ch);
  for (const x of RIVALS) {
    const r = l.riv[x.k];
    if (r.st === 'an' && ch >= x.from) {
      r.st = 'manh';
      r.th = Math.max(r.th, x.th);
      l.log.push({ age: Math.floor(l.age), t: `Mối nguy mới: ${x.t}. ${x.d}`, k: 'note' });
    }
  }
  pickFocus(l);
  formAlliance(l);
  l.showCh = { to: ch, from, end, picks };
  l.chStart = snapOf(l);
}

function promote(l: Life, d: number) {
  // cung nga được nâng: thành Tài nhân chưa nhập giai trước đã
  if (d > 0 && l.flags.includes('cung_nga')) {
    l.flags = l.flags.filter((f) => f !== 'cung_nga');
    l.log.push({ age: Math.floor(l.age), t: `Có chiếu nâng ${originOf(l.origin).ho} thị từ cung nga lên Tài nhân, dời về viện Nghi Lễ.`, k: 'rank' });
    d -= 1;
    if (!d) return;
  }
  const r0 = l.rank;
  l.rank = Math.max(0, Math.min(RANKS.length - 1, l.rank + d));
  if (l.rank > r0) l.log.push({ age: Math.floor(l.age), t: `Chiếu phong ${RANKS[l.rank].t} (${RANKS[l.rank].giai}), dời về ${RANKS[l.rank].o}.`, k: 'rank' });
  else if (l.rank < r0) l.log.push({ age: Math.floor(l.age), t: `Bị giáng xuống ${RANKS[l.rank].t}.`, k: 'rank' });
}

/* ---------- kết cục ---------- */
export function autoEnding(l: Life) {
  const f = (x: string) => l.flags.includes(x);
  // tuyến phụ tự đặt kết cục cuối đời bằng cờ kc_<id> (cờ đặt sau cùng thắng)
  const kc = [...l.flags].reverse().find((g) => g.startsWith('kc_'));
  if (kc && endingOf(kc.slice(3))) return kc.slice(3);
  if (f('bi_quen')) return 'e_lang_le';
  if (f('hoang_hau') && !f('nhiep')) return 'e_hoang_hau';
  if (f('nhiep') && f('diet_dich')) return 'e_nhiep_mau';
  if (f('nhiep')) return 'e_mau_nghi';
  if (f('lui') || f('thai_phi')) return 'e_thai_phi';
  if (l.rank >= 9 && !f('con_dongcung')) return 'e_hoang_quy_phi';
  if (f('duoi_thucphi') && l.n.duc < 50) return 'e_lang_le';
  return 'e_hien_phi';
}
function finish(l: Life, id: string) {
  l.end = id === 'auto' ? autoEnding(l) : id;
  l.card = null;
  const e = endingOf(l.end);
  l.log.push({ age: Math.floor(l.age), t: `Kết cục: ${e?.name ?? l.end}.`, k: 'note' });
}

/* ---------- chọn ---------- */
export const choicesOf = (card: Card, l: Life) => card.choices.map((c) => ({ c, open: ok(c.need, l) }));
const REL = new Set<string>(REL_KEYS);
const clamp = (k: NumK, v: number) => (k === 'tien' ? Math.max(0, Math.round(v)) : Math.max(REL.has(k) ? -100 : 0, Math.min(100, Math.round(v))));

export interface Result {
  life: Life;
  note: string;
  delta: string;
  ranked: boolean;
}

export function choose(l0: Life, idx: number): Result {
  const card = cardOf(l0.card ?? '');
  if (!card) return { life: l0, note: '', delta: '', ranked: false };
  const ch: Choice = card.choices[idx];
  const l: Life = JSON.parse(JSON.stringify({ ...l0, back: null }));
  // trước mỗi ngã rẽ lớn: giữ một bản để chết thì quay lại
  l.back = card.big ? (JSON.parse(JSON.stringify({ ...l0, back: null, marks: undefined })) as Omit<Life, 'back'>) : l0.back;
  if (!ok(ch.need, l)) return { life: l0, note: '', delta: '', ranked: false };
  // ngã rẽ lớn hoặc mở đầu sự kiện nhiều hồi: ghi lại để quay về chọn lại
  if (card.big || (!l0.chain && card.choices.some((c) => c.fx.next))) {
    const { log: _log, marks: _marks, back: _back, ...snap } = JSON.parse(JSON.stringify(l0)) as Life;
    void _log;
    void _marks;
    void _back;
    l.marks = [...(l0.marks ?? []), { card: card.id, pick: idx, age: l0.age, chapter: l0.chapter, logLen: l0.log.length, snap }].slice(-40);
  }
  let fx: Fx = ch.fx;
  let note = ch.note ?? '';
  if (ch.risk && rand(l.seed, `risk|${card.id}|${idx}|${l.age}`) < ch.risk.p) {
    fx = ch.risk.fail;
    note = ch.risk.failNote;
  }
  const before = { ...l.n };
  const rank0 = l.rank;
  for (const [k, v] of Object.entries(fx.d ?? {}) as [NumK, number][]) l.n[k] = clamp(k, l.n[k] + v);
  const added = (fx.flag ?? []).filter((f) => !l.flags.includes(f));
  for (const f of added) l.flags.push(f);
  // cờ mới nằm trong danh sách "vừa xảy ra" 3 lượt (dạng "lượt:cờ")
  const turn = l0.seen.length;
  l.fresh = [...added.map((f) => `${turn}:${f}`), ...(l0.fresh ?? []).filter((x) => turn - parseInt(x, 10) < 3)];
  l.prev = { age: l0.age, place: card.place, card: card.id };
  if (fx.unflag) l.flags = l.flags.filter((f) => !fx.unflag!.includes(f));
  if (fx.rank) promote(l, fx.rank);
  const riv0 = JSON.stringify(l.riv ?? null);
  applyRiv(l, fx.riv);
  for (const f of added) applyRiv(l, FLAG_RIV[f]);
  if (fx.kid) {
    const names = fx.kid === 'trai' ? SON_NAMES : DAUGHTER_NAMES;
    const name = names[l.kids.filter((k) => k.sex === fx.kid).length % names.length];
    l.kids.push({ sex: fx.kid, born: Math.floor(l.age), name });
    l.log.push({ age: Math.floor(l.age), t: fx.kid === 'trai' ? `Hoàng tử ${name} chào đời.` : `Công chúa ${name} chào đời.`, k: 'note' });
  }
  l.seen.push(card.id);
  l.log.push({ age: Math.floor(l.age), t: fillText(`${card.title}: ${ch.t}`, l.origin), k: 'pick' });
  if (note) l.log.push({ age: Math.floor(l.age), t: fillText(note, l.origin), k: 'note' });
  if (CRISIS.some((c) => c.id === card.id)) l.log.push({ age: Math.floor(l.age), t: `#${card.id}`, k: 'note' });

  // sự kiện nhiều hồi: giữa chừng thì thời gian không trôi, hết sự kiện mới tính như một thẻ
  const isCrisis = CRISIS.some((c) => c.id === card.id);
  const kind: 'big' | 'crisis' | 'small' = l.chain?.kind ?? (card.big ? 'big' : isCrisis ? 'crisis' : 'small');
  const nextStep = fx.next && !fx.end ? cardOf(fx.next) : null;
  const years = fx.years ?? (nextStep ? 0 : kind === 'big' ? 1 : 0.5);
  const a0 = l.age;
  l.age = Math.round((l.age + years) * 2) / 2;
  for (let y = Math.floor(a0) + 1; y <= Math.floor(l.age); y++) {
    l.n.tien = clamp('tien', l.n.tien + rankOf(l).luong * 0.4);
    if (l.n.an > 50) l.n.an = clamp('an', l.n.an - 2);
    // kẻ đang lộng hành mạnh dần theo năm tháng
    for (const [k, r] of Object.entries(l.riv ?? {}) as [RivalK, RivalState][]) {
      if (r.st !== 'manh') continue;
      const guards = guardsOf(k).filter((g) => l.riv && !gone(l.riv[g].st)).length;
      const allied = alliesOf(l).some((p) => p.includes(k));
      r.th = clamp100(r.th + 2 + guards + (allied ? 1 : 0));
    }
    // liên minh tan khi một bên đã bị diệt
    l.flags = l.flags.filter((f) => !f.startsWith('lien:') || f.slice(5).split('+').every((k) => l.riv && !gone(l.riv[k as RivalK].st)));
  }
  // ghi vào nhật ký khi một mối nguy đổi trạng thái
  if (riv0 !== JSON.stringify(l.riv ?? null) && l.riv) {
    const was = JSON.parse(riv0 || 'null') as Record<RivalK, RivalState> | null;
    for (const k of Object.keys(l.riv) as RivalK[]) {
      const st = l.riv[k].st;
      if (was && was[k] && was[k].st !== st && ST_LOG[st]) {
        l.log.push({ age: Math.floor(l.age), t: `${RIV_NAME[k]} ${ST_LOG[st]}.`, k: 'rank' });
        const ft = fallTale(k, st);
        if (ft) l.tales = [...(l.tales ?? []), ft];
      }
    }
  }

  if (fx.end) {
    l.chain = undefined;
    finish(l, fx.end);
  } else if (nextStep) {
    l.chain = { kind, hoi: (l.chain?.hoi ?? 1) + 1 };
    if (fx.chapter) moveTo(l, fx.chapter);
    l.card = nextStep.id;
  } else {
    l.chain = undefined;
    if (fx.chapter) moveTo(l, fx.chapter);
    else if (kind === 'big') l.bigAt += 1;
    else if (kind === 'small') l.smalls += 1;
    l.card = nextCard(l);
  }
  queueTale(l);
  if (l.end && endingOf(l.end)?.dead) l.omen = card.omen ?? 'Có những điềm báo chỉ nhìn lại mới thấy.';

  // hệ quả nhìn thấy được
  const parts: string[] = [];
  const LBL: Partial<Record<NumK, string>> = { duc: 'Đức', sac: 'Sắc', the: 'Thế', an: 'Ân sủng', muu: 'Mưu', tien: 'Tiền', vua: 'Hoàng thượng', thaihau: 'Thái hậu', hoanghau: 'Hoàng hậu', thucphi: 'Thục phi', hanh: 'Hạnh', phuc: 'Phúc', quan: 'Quan văn', tuong: 'Võ tướng' };
  for (const k of Object.keys(LBL) as NumK[]) {
    const d = Math.round(l.n[k] - before[k]);
    if (k === 'tien' ? Math.abs(d) >= 10 && fx.d?.tien : Math.abs(d) >= 3 && fx.d?.[k] != null) parts.push(`${LBL[k]} ${d > 0 ? '+' : ''}${d}${k === 'tien' ? ' quan' : ''}`);
  }
  if (l.riv && riv0) {
    const was = JSON.parse(riv0) as Record<RivalK, RivalState> | null;
    for (const k of Object.keys(l.riv) as RivalK[]) {
      if (!was?.[k]) continue;
      const dt = l.riv[k].th - was[k].th;
      const de = l.riv[k].ev - was[k].ev;
      if (l.riv[k].st !== was[k].st && ST_LOG[l.riv[k].st]) parts.unshift(`${RIV_NAME[k]} ${ST_LOG[l.riv[k].st]}`);
      else {
        if (Math.abs(dt) >= 5) parts.push(`${RIV_NAME[k]}: uy hiếp ${dt > 0 ? '+' : ''}${dt}`);
        if (de >= 5) parts.push(`Thóp ${RIV_NAME[k]} +${de}`);
      }
    }
  }
  return { life: l, note: fillText(note, l.origin), delta: parts.slice(0, 5).join(' · '), ranked: l.rank > rank0 || (l0.flags.includes('cung_nga') && !l.flags.includes('cung_nga')) };
}

/** quay lại ngã rẽ thứ i trong cây số phận của đời này (chọn lại từ đó) */
export function rewindTo(l: Life, i: number): Life | null {
  const m = l.marks?.[i];
  if (!m) return null;
  const b = JSON.parse(JSON.stringify(m.snap)) as Life;
  b.log = l.log.slice(0, m.logLen);
  b.marks = (l.marks ?? []).slice(0, i);
  b.back = null;
  b.end = null;
  b.omen = undefined;
  b.log.push({ age: Math.floor(b.age), t: 'Quay lại ngã rẽ, chọn lại một lần nữa.', k: 'note' });
  b.tales = undefined;
  return b;
}

/** chết rồi: quay lại ngã rẽ lớn gần nhất */
export function rewind(l: Life): Life | null {
  if (l.marks?.length) return rewindTo(l, l.marks.length - 1);
  if (!l.back) return null;
  const b = JSON.parse(JSON.stringify(l.back)) as Life;
  b.back = null;
  b.end = null;
  b.omen = undefined;
  b.log.push({ age: Math.floor(b.age), t: 'Quay lại ngã rẽ. Lần này, nhớ lấy điềm báo.', k: 'note' });
  b.tales = undefined;
  return b;
}
