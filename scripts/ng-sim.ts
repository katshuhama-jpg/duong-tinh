// chạy thử phần Con tin họ Nghiêm: kết cục, lỗi, tỉ lệ chết khi xử thiếu chứng
import { newLife, choose, cardOf, choicesOf, viewCard } from '../lib/cung/engine';
const N = Number(process.argv[2] ?? 2000);
const ends: Record<string, number> = {};
const xu: Record<string, { n: number; dead: number }> = {};
let errs = 0, taps = 0;
const bad: string[] = [];
for (let i = 0; i < N; i++) {
  let l = newLife('Nụ', 'quan', i * 7919 + 11);
  l.tales = [];
  let t = 0;
  const kinds: string[] = [];
  try {
    while (!l.end && t < 400) {
      if (l.showCh) l = { ...l, showCh: undefined };
      l.tales = [];
      const c = cardOf(l.card!);
      if (!c) throw new Error('no card ' + l.card);
      const v = viewCard(c, l);
      for (const s of [...v.text, ...v.choices.map((x) => x.t), ...v.choices.map((x) => x.note ?? '')]) if (/\{[A-Z]+:/.test(s)) bad.push(c.id + ': ' + s);
      const open = choicesOf(c, l).map((x, j) => (x.open ? j : -1)).filter((j) => j >= 0);
      if (!open.length) throw new Error('no open choice at ' + c.id);
      const j = open[Math.floor(Math.random() * open.length)];
      const r = choose(l, j);
      // ghi chú sau khi chọn (cả failNote của rủi ro) cũng không được sót chữ giữ chỗ
      if (/\{[A-Z]+:/.test(r.note)) bad.push(c.id + ' (note): ' + r.note);
      for (const f of r.life.flags) if (/^an\d_(thang|gai|phancong|gac|tu|sot)$/.test(f) && !l.flags.includes(f)) kinds.push(f);
      l = r.life;
      t++;
    }
    if (!l.end) throw new Error('stuck ' + l.card);
    ends[l.end] = (ends[l.end] ?? 0) + 1;
    taps += t;
    for (const k of kinds) {
      xu[k] = xu[k] ?? { n: 0, dead: 0 };
      xu[k].n++;
      if (l.end.startsWith('n_') && ['n_2', 'n_10'].includes(l.end)) xu[k].dead++;
    }
  } catch (e) {
    errs++;
    if (errs < 5) console.log('ERR', String(e));
  }
}
console.log({ N, errs, taps: (taps / N).toFixed(1), bad: [...new Set(bad)].slice(0, 5) });
console.log(Object.entries(ends).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${((100 * v) / N).toFixed(1)}%`).join('  '));
console.log(Object.entries(xu).map(([k, v]) => `${k}: ${v.n} lần, chết ${((100 * v.dead) / v.n).toFixed(0)}%`).join('\n'));
