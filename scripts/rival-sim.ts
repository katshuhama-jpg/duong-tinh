// đo bàn cờ mối nguy: bao nhiêu đời diệt được ai, lên ngôi hậu bao nhiêu
import { newLife, choose, cardOf, choicesOf } from '../lib/cung/engine';
import { RIVALS, gone } from '../lib/cung/world';
const N = Number(process.argv[2] ?? 500);
const cnt: Record<string, number> = {}; let hau = 0;
for (let i = 0; i < N; i++) {
  let l = newLife('Nụ', process.env.ORIGIN ?? 'dan', i * 7919 + 3); let t = 0;
  while (!l.end && t < 400) { const c = cardOf(l.card!)!; const o = choicesOf(c, l).map((x, j) => (x.open ? j : -1)).filter((j) => j >= 0); l = choose(l, o[Math.floor(Math.random() * o.length)]).life; t++; }
  for (const x of RIVALS) if (l.riv && gone(l.riv[x.k].st)) cnt[x.k] = (cnt[x.k] ?? 0) + 1;
  if (l.flags.includes('hoang_hau')) hau++;
}
console.log('diệt:', Object.fromEntries(RIVALS.map((x) => [x.k, ((100 * (cnt[x.k] ?? 0)) / N).toFixed(0) + '%'])), 'lên hậu', ((100 * hau) / N).toFixed(1) + '%');
