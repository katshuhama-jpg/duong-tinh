import { newLife, choose, cardOf, choicesOf, fillNg } from '../lib/cung/engine';
import { GHICHU_NGHIEM } from '../lib/cung/ghichu/nghiem';
const N = Number(process.argv[2] ?? 3000);
const cnt: Record<string, number> = {};
const reach: number[] = Array(8).fill(0), withNote: number[] = Array(8).fill(0), passed: number[] = Array(8).fill(0), passedNote: number[] = Array(8).fill(0);
const bad = new Set<string>();
for (const g of GHICHU_NGHIEM) cnt[g.id] = 0;
for (let i = 0; i < N; i++) {
  let l = newLife('Nụ', 'quan', i * 7919 + 13);
  let t = 0;
  let maxCh = 1;
  while (!l.end && t < 500) {
    if (l.showCh) l = { ...l, showCh: undefined };
    l.tales = [];
    const c = cardOf(l.card!);
    if (!c) break;
    const open = choicesOf(c, l).map((x, j) => (x.open ? j : -1)).filter((j) => j >= 0);
    if (!open.length) break;
    l = choose(l, open[Math.floor(Math.random() * open.length)]).life;
    maxCh = Math.max(maxCh, l.chapter);
    t++;
  }
  const notes = l.notes ?? [];
  for (const n of notes) {
    cnt[n.id] = (cnt[n.id] ?? 0) + 1;
    const g = GHICHU_NGHIEM.find((x) => x.id === n.id);
    if (g) for (const s of [g.title, ...g.text]) { const f = fillNg(s, l); if (/\{[A-Z]+:|\{BALAO\}/.test(f)) bad.add(n.id + ': ' + f); }
  }
  for (let c = 1; c <= maxCh; c++) {
    reach[c]++;
    const has = notes.some((n) => n.ch === c);
    if (has) withNote[c]++;
    if (c < maxCh || (c === 7 && l.end)) { passed[c]++; if (has) passedNote[c]++; }
  }
}
for (let c = 1; c <= 7; c++) console.log(`ch${c}: tới ${reach[c]}, có ghi chú ${(100 * withNote[c] / Math.max(1, reach[c])).toFixed(1)}% | đi hết chương ${passed[c]}, có ghi chú ${(100 * passedNote[c] / Math.max(1, passed[c])).toFixed(1)}%`);
for (const [k, v] of Object.entries(cnt)) console.log(v === 0 ? '  ZERO ' : '       ', k, v);
console.log('bad', [...bad].slice(0, 5));
