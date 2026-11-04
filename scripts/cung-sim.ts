// chạy thử nhiều đời ngẫu nhiên: kết cục, số lượt bấm, lỗi
import { newLife, choose, cardOf, choicesOf, rewind } from '../lib/cung/engine';
const ends: Record<string, number> = {}; let taps = 0, errs = 0, ages: number[] = []; const N = Number(process.argv[2] ?? 2000);
for (let i = 0; i < N; i++) {
  let l = newLife('Diệp', i * 7919 + 1); let t = 0; let deaths = 0;
  try {
    while (!l.end && t < 400) {
      const c = cardOf(l.card!); if (!c) throw new Error('no card ' + l.card);
      const open = choicesOf(c, l).map((x, j) => (x.open ? j : -1)).filter((j) => j >= 0);
      const j = open[Math.floor(Math.random() * open.length)];
      l = choose(l, j).life; t++;
      if (l.end && l.end.startsWith('d_') && deaths < 1 && Math.random() < 0.5) { const b = rewind(l); if (b) { l = b; deaths++; } }
    }
    if (!l.end) throw new Error('stuck at ' + l.card + ' ch' + l.chapter + ' age ' + l.age);
    ends[l.end] = (ends[l.end] ?? 0) + 1; taps += t; ages.push(l.age);
  } catch (e) { errs++; if (errs < 5) console.log('ERR', String(e)); }
}
console.log({ N, errs, tapsPerLife: (taps / N).toFixed(1), avgAgeEnd: (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1) });
console.log(Object.entries(ends).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${(100 * v / N).toFixed(1)}%`).join('\n'));
