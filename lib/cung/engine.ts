/**
 * Bộ máy một đời trong cung: rút thẻ, áp hệ quả, đếm năm, lương, chặng, kết cục.
 * Thuần dữ liệu (không đụng tới giao diện) để chạy thử hàng loạt bằng script.
 */
import type { Card, Choice, Cond, Fx, Life, NumK } from './types';
import { CHAPTERS, DAUGHTER_NAMES, RANKS, SON_NAMES, THAI_HAU, THAI_PHI, endingOf, type Rank } from './world';
import { CRISIS } from './content/big';
import { ALL_BIG, SMALL, bigsOf } from './content/index';

const ALL: Card[] = [...ALL_BIG, ...CRISIS, ...SMALL];
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

export function newLife(name: string, seed = Math.floor(Math.random() * 1e9)): Life {
  const l: Life = {
    v: 'cung1',
    seed,
    name: name.trim() || 'Nụ',
    age: 16,
    rank: 0,
    n: { duc: 50, sac: 55, the: 12, an: 16, muu: 30, vua: 20, thaihau: 30, hoanghau: 30, thucphi: 40, hanh: 50, phuc: 30, quan: 20, tuong: 10, tien: 30 },
    flags: [],
    kids: [],
    chapter: 1,
    smalls: 0,
    bigAt: 0,
    seen: [],
    log: [{ age: 16, t: 'Năm Khánh Vân thứ ba, bạn bước qua cổng thành Phượng Thành, vào viện Nghi Lễ học phép cung.', k: 'year' }],
    card: null,
    end: null,
    back: null,
    startedAt: Date.now(),
  };
  l.card = nextCard(l);
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
  return true;
}

/** bậc đang giữ (khi con lên ngôi thì thành thái phi / thái hậu) */
export function rankOf(l: Life): Rank {
  if (l.flags.includes('thai_hau')) return THAI_HAU;
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
  if (l.smalls < chap(ch).smalls) {
    const pool = SMALL.filter((c) => c.chapter.includes(ch) && ok(c.when, l) && (c.repeat || !l.seen.includes(c.id)));
    if (pool.length) {
      const total = pool.reduce((a, c) => a + (c.weight ?? 1), 0);
      let r = rand(l.seed, step(l)) * total;
      for (const c of pool) {
        r -= c.weight ?? 1;
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
  l.chapter = ch;
  l.smalls = 0;
  l.bigAt = 0;
  // sang chặng mới mà đang được sủng thì được thăng một bậc
  if (ch <= 5 && l.n.an >= 50 && l.rank < 9) promote(l, 1);
  l.log.push({ age: Math.floor(l.age), t: `Chặng mới: ${chap(ch).t}.`, k: 'year' });
}

function promote(l: Life, d: number) {
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
const clamp = (k: NumK, v: number) => (k === 'tien' ? Math.max(0, Math.round(v)) : Math.max(0, Math.min(100, Math.round(v))));

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
  l.back = card.big ? (JSON.parse(JSON.stringify({ ...l0, back: null })) as Omit<Life, 'back'>) : l0.back;
  if (!ok(ch.need, l)) return { life: l0, note: '', delta: '', ranked: false };
  let fx: Fx = ch.fx;
  let note = ch.note ?? '';
  if (ch.risk && rand(l.seed, `risk|${card.id}|${idx}|${l.age}`) < ch.risk.p) {
    fx = ch.risk.fail;
    note = ch.risk.failNote;
  }
  const before = { ...l.n };
  const rank0 = l.rank;
  for (const [k, v] of Object.entries(fx.d ?? {}) as [NumK, number][]) l.n[k] = clamp(k, l.n[k] + v);
  for (const f of fx.flag ?? []) if (!l.flags.includes(f)) l.flags.push(f);
  if (fx.unflag) l.flags = l.flags.filter((f) => !fx.unflag!.includes(f));
  if (fx.rank) promote(l, fx.rank);
  if (fx.kid) {
    const names = fx.kid === 'trai' ? SON_NAMES : DAUGHTER_NAMES;
    const name = names[l.kids.filter((k) => k.sex === fx.kid).length % names.length];
    l.kids.push({ sex: fx.kid, born: Math.floor(l.age), name });
    l.log.push({ age: Math.floor(l.age), t: fx.kid === 'trai' ? `Hoàng tử ${name} chào đời.` : `Công chúa ${name} chào đời.`, k: 'note' });
  }
  l.seen.push(card.id);
  l.log.push({ age: Math.floor(l.age), t: `${card.title}: ${ch.t}`, k: 'pick' });
  if (note) l.log.push({ age: Math.floor(l.age), t: note, k: 'note' });
  if (CRISIS.some((c) => c.id === card.id)) l.log.push({ age: Math.floor(l.age), t: `#${card.id}`, k: 'note' });

  // năm tháng trôi: lương theo bậc, ân sủng nguội dần
  const years = fx.years ?? (card.big ? 1 : 0.5);
  const a0 = l.age;
  l.age = Math.round((l.age + years) * 2) / 2;
  for (let y = Math.floor(a0) + 1; y <= Math.floor(l.age); y++) {
    l.n.tien = clamp('tien', l.n.tien + rankOf(l).luong * 0.4);
    if (l.n.an > 50) l.n.an = clamp('an', l.n.an - 2);
  }

  if (fx.end) finish(l, fx.end);
  else {
    if (fx.chapter) moveTo(l, fx.chapter);
    else if (card.big) l.bigAt += 1;
    else if (!CRISIS.some((c) => c.id === card.id)) l.smalls += 1;
    l.card = nextCard(l);
  }
  if (l.end && endingOf(l.end)?.dead) l.omen = card.omen ?? 'Có những điềm báo chỉ nhìn lại mới thấy.';

  // hệ quả nhìn thấy được
  const parts: string[] = [];
  const LBL: Partial<Record<NumK, string>> = { duc: 'Đức', sac: 'Sắc', the: 'Thế', an: 'Ân sủng', muu: 'Mưu', tien: 'Tiền', vua: 'Hoàng thượng', thaihau: 'Thái hậu', hoanghau: 'Hoàng hậu', thucphi: 'Thục phi', hanh: 'Hạnh', phuc: 'Phúc', quan: 'Quan văn', tuong: 'Võ tướng' };
  for (const k of Object.keys(LBL) as NumK[]) {
    const d = Math.round(l.n[k] - before[k]);
    if (k === 'tien' ? Math.abs(d) >= 10 && fx.d?.tien : Math.abs(d) >= 3 && fx.d?.[k] != null) parts.push(`${LBL[k]} ${d > 0 ? '+' : ''}${d}${k === 'tien' ? ' quan' : ''}`);
  }
  return { life: l, note, delta: parts.slice(0, 4).join(' · '), ranked: l.rank > rank0 };
}

/** chết rồi: quay lại ngã rẽ lớn gần nhất */
export function rewind(l: Life): Life | null {
  if (!l.back) return null;
  const b = JSON.parse(JSON.stringify(l.back)) as Life;
  b.back = null;
  b.end = null;
  b.omen = undefined;
  b.log.push({ age: Math.floor(b.age), t: 'Quay lại ngã rẽ. Lần này, nhớ lấy điềm báo.', k: 'note' });
  return b;
}
