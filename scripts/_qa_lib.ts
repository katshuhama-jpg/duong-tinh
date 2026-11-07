// Thư viện chơi thử cho QA lần 2 (đặt tạm vào scripts/ để chạy)
import { newLife, choose, cardOf, choicesOf, viewCard, sons } from '../lib/cung/engine';
import { strength, caseOf, knows, CASES } from '../lib/cung/nghiem/cases';
import { endingOf } from '../lib/cung/world';
import type { Life, Card, Choice } from '../lib/cung/types';

export type Pol = (l: Life, c: Card, open: { x: Choice; j: number }[], rnd: () => number) => number;

export function mkRnd(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

export const polRandom: Pol = (_l, _c, open, r) => open[Math.floor(r() * open.length)].j;

/** người chơi khéo: nhặt manh mối, chỉ xử khi đèn sáng, không thì gác; còn lại chọn ngẫu nhiên trong các lựa chọn không kết đời, ưu tiên cờ mong muốn */
export function polSmart(want: string[] = [], avoid: string[] = [], opts: { allowEnd?: string[]; safe?: boolean; accuseAny?: boolean; wantWho?: Record<string, string> } = {}): Pol {
  return (l, c, open, r) => {
    const acc = open.filter((x) => x.x.fx.accuse);
    if (acc.length) {
      const an = acc[0].x.fx.accuse!.an;
      if (opts.wantWho?.[an]) {
        const p = acc.find((x) => x.x.fx.accuse!.who === opts.wantWho![an]);
        if (p) return p.j;
      }
      const du = acc.find((x) => !['tu', 'gac'].includes(x.x.fx.accuse!.who) && strength(l, an, x.x.fx.accuse!.who).du);
      if (l.flags.includes('vua_benh') && an === 'an5') { const t = acc.find((x) => x.x.fx.accuse!.who === 'tu'); if (t) return t.j; }
      if (du) return du.j;
      const g = acc.find((x) => x.x.fx.accuse!.who === 'gac');
      if (g) return g.j;
    }
    const sc = (x: Choice) => {
      let s = 0;
      const fl = [...(x.fx.flag ?? []), ...(x.risk?.fail.flag ?? [])];
      if (x.fx.clue?.length) s += 5;
      if (x.fx.mo) s += 5;
      for (const w of want) if (fl.includes(w)) s += 20;
      for (const a of avoid) if (fl.includes(a)) s -= 30;
      if (x.fx.end) s -= opts.allowEnd?.includes(x.fx.end) ? -50 : 100;
      if (x.risk?.fail.end) s -= opts.safe ? 30 : 5;
      if (opts.safe && (x.fx.d?.hiem ?? 0) > 8) s -= 3;
      if (x.fx.next && !x.fx.end) s -= 1;
      return s + r() * 4;
    };
    const best = open.slice().sort((a, b) => sc(b.x) - sc(a.x));
    return best[0].j;
  };
}

export interface Step { ch: number; age: number; id: string; title: string; lead?: string; text: string[]; ch_: { t: string; open: boolean; lock?: string }[]; pick: number; pickT: string; note: string; delta: string; added: string[]; who?: string; cast: string[] }
export interface Run { l: Life; steps: Step[]; err?: string }

export function play(seed: number, pol: Pol, rs = seed * 13 + 5, maxT = 500): Run {
  const r = mkRnd(rs);
  let l = newLife('Nụ', 'quan', seed);
  const steps: Step[] = [];
  let t = 0;
  try {
    while (!l.end && t < maxT) {
      l.tales = []; l.showCh = undefined;
      const c = cardOf(l.card!);
      if (!c) throw new Error('no card ' + l.card);
      const v = viewCard(c, l);
      const op = choicesOf(c, l).map((x, j) => ({ x: x.c, j, o: x.open })).filter((x) => x.o);
      if (!op.length) throw new Error('no open choice at ' + c.id);
      const j = pol(l, c, op, r);
      const res = choose(l, j);
      const added = res.life.flags.filter((f) => !l.flags.includes(f));
      steps.push({ ch: l.chapter, age: l.age, id: c.id, title: v.title, lead: v.lead, text: v.text, ch_: v.choices.map((x, i) => ({ t: x.t, open: op.some((o) => o.j === i), lock: x.lockHint })), pick: j, pickT: v.choices[j].t, note: res.note, delta: res.delta, added, who: c.whoName ?? c.who, cast: c.cast });
      l = res.life; t++;
    }
    if (!l.end) return { l, steps, err: 'stuck' };
  } catch (e) { return { l, steps, err: String(e) }; }
  return { l, steps };
}

export function huuAge(age: number) { return Math.floor(age) - 12; }

export function fmt(run: Run, label = '') {
  const out: string[] = [];
  out.push(`===== ${label} seed-run end=${run.l.end} (${endingOf(run.l.end ?? '')?.name ?? ''}) age=${run.l.age.toFixed(1)} ch=${run.l.chapter} kids=${run.l.kids.map((k) => k.sex + '@' + k.born).join(',')} err=${run.err ?? ''}`);
  out.push(`  tay: ${Object.entries(run.l.an ?? {}).map(([k, v]) => `${k}=${v.tay}${v.xu ? '/xu:' + v.xu.who + (v.xu.dung ? '+' : '-') + (v.xu.du ? 'D' : 'd') : ''}`).join(' ')}`);
  let ch = 0;
  for (const s of run.steps) {
    if (s.ch !== ch) { ch = s.ch; out.push(`\n--- CHƯƠNG ${ch} ---`); }
    out.push(`[c${s.ch} ${s.age.toFixed(2)}t Hựu~${huuAge(s.age)}] ${s.id} | ${s.title}${s.who ? ' (' + s.who + ')' : ''} cast=${s.cast.join(',')}`);
    if (s.lead) out.push(`   LEAD: ${s.lead}`);
    for (const x of s.text) out.push(`   > ${x}`);
    s.ch_.forEach((x, i) => out.push(`     ${i === s.pick ? '*' : x.open ? ' ' : 'x'} ${x.t}${!x.open && x.lock ? ' [khóa: ' + x.lock + ']' : ''}`));
    out.push(`   => ${s.note}${s.delta ? '  {' + s.delta + '}' : ''}${s.added.length ? '  +[' + s.added.join(' ') + ']' : ''}`);
  }
  out.push(`KẾT: ${run.l.end} - ${endingOf(run.l.end ?? '')?.name} :: ${endingOf(run.l.end ?? '')?.desc}`);
  if (run.l.omen) out.push(`OMEN: ${run.l.omen}`);
  out.push(`FLAGS: ${run.l.flags.join(' ')}`);
  return out.join('\n');
}

export { strength, caseOf, knows, CASES, endingOf, sons, cardOf, viewCard };

/** người chơi liều: khéo tới hết chương 4, từ chương 5 thì xử theo người có nhiều manh mối nhất dù chưa đủ chứng (hoặc chọn bừa) */
export function polBold(fromCh = 5, pRandomAcc = 0.3): Pol {
  const sm = polSmart();
  return (l, c, open, r) => {
    const acc = open.filter((x) => x.x.fx.accuse);
    if (acc.length && l.chapter >= fromCh) {
      const an = acc[0].x.fx.accuse!.an;
      const real = acc.filter((x) => !['tu', 'gac'].includes(x.x.fx.accuse!.who));
      if (r() < pRandomAcc) return acc[Math.floor(r() * acc.length)].j;
      const best = real.sort((a, b) => strength(l, an, b.x.fx.accuse!.who).n - strength(l, an, a.x.fx.accuse!.who).n)[0];
      if (best) return best.j;
    }
    if (l.chapter >= fromCh && !acc.length && r() < 0.5) return open[Math.floor(r() * open.length)].j;
    return sm(l, c, open, r);
  };
}
