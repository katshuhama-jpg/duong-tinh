import { newLife, choose, cardOf, choicesOf, doubt, fillNg } from '../lib/cung/engine';
import { strength } from '../lib/cung/nghiem/cases';
import { GHICHU_NGHIEM } from '../lib/cung/ghichu/nghiem';
const N = Number(process.argv[2] ?? 3000);
const cnt: Record<string, number> = {};
const reach: number[] = Array(8).fill(0), withNote: number[] = Array(8).fill(0);
const bad = new Set<string>();
for (const g of GHICHU_NGHIEM) cnt[g.id] = 0;
for (let i = 0; i < N; i++) {
  let l = newLife('Nụ', 'quan', i * 104729 + 77);
  let t = 0, maxCh = 1;
  const smart = Math.random() < 0.6;
  while (!l.end && t < 500) {
    l.tales = []; l.showCh = undefined;
    const c = cardOf(l.card!); if (!c) break;
    const open = choicesOf(c, l).map((x, j) => ({ x: x.c, j, o: x.open })).filter((x) => x.o);
    if (!open.length) break;
    let pick;
    const acc = open.filter((x) => x.x.fx.accuse);
    if (acc.length && smart) {
      const an = acc[0].x.fx.accuse!.an;
      const anyDu = () => acc.some((x) => !['tu', 'gac'].includes(x.x.fx.accuse!.who) && strength(l, an, x.x.fx.accuse!.who).du);
      for (const id of l.an?.[an]?.tu ?? []) if (!anyDu() && !l.flags.includes(`nghi_${id}`)) l = doubt(l, id) ?? l;
      pick = acc.find((x) => !['tu', 'gac'].includes(x.x.fx.accuse!.who) && strength(l, an, x.x.fx.accuse!.who).du) ?? acc.find((x) => x.x.fx.accuse!.who === 'gac');
    }
    if (!pick) {
      const safe = open.filter((x) => !x.x.fx.end && !x.x.risk?.fail.end);
      const pool = safe.length ? safe : open;
      pick = pool[Math.floor(Math.random() * pool.length)];
    }
    l = choose(l, pick.j).life; t++;
    maxCh = Math.max(maxCh, l.chapter);
  }
  const notes = l.notes ?? [];
  for (const n of notes) {
    cnt[n.id]++;
    const g = GHICHU_NGHIEM.find((x) => x.id === n.id)!;
    for (const s of [g.title, ...g.text]) { const f = fillNg(s, l); if (/\{[A-Z]+:|\{BALAO\}/.test(f) || /^\s/.test(f)) bad.add(n.id + ': ' + f); }
  }
  for (let c = 1; c <= maxCh; c++) { reach[c]++; if (notes.some((n) => n.ch === c)) withNote[c]++; }
}
for (let c = 1; c <= 7; c++) console.log(`ch${c}: tới ${reach[c]}, có ghi chú ${(100 * withNote[c] / Math.max(1, reach[c])).toFixed(1)}%`);
for (const [k, v] of Object.entries(cnt)) console.log(v === 0 ? '  ZERO ' : '       ', k, v);
console.log('bad', [...bad].slice(0, 5));
