// người chơi "có chủ đích": tránh nhánh rẽ, ưu tiên lựa chọn đánh mối nguy (thóp tăng, uy hiếp giảm, diệt)
import { newLife, choose, cardOf, choicesOf } from '../lib/cung/engine';
import { BRANCH_CARDS } from '../lib/cung/content/index';
import { RIVALS, gone } from '../lib/cung/world';
const BR = new Set(BRANCH_CARDS.map((c) => c.id));
const N = Number(process.argv[2] ?? 300);
const ends: Record<string, number> = {}; const cnt: Record<string, number> = {}; let hau = 0, taps = 0;
for (let i = 0; i < N; i++) {
  let l = newLife('Nụ', process.env.ORIGIN ?? 'dan', i * 7919 + 5); let t = 0;
  while (!l.end && t < 500) {
    const c = cardOf(l.card!)!;
    const opts = choicesOf(c, l).map((x, j) => ({ ...x, j })).filter((x) => x.open && !(x.c.fx.next && BR.has(x.c.fx.next)));
    const score = (x: (typeof opts)[0]) => {
      const r = x.c.fx.riv ?? {}; let s = Math.random() * 2;
      for (const v of Object.values(r)) { if (!v) continue; s += (v.ev ?? 0) / 10 - (v.th ?? 0) / 10 + (v.st && v.st !== 'manh' ? 8 : 0); }
      if (x.c.fx.flag?.includes('hoang_hau')) s += 20; if (x.c.fx.end) s -= 5; if (x.c.risk) s -= x.c.risk.p * 3;
      return s;
    };
    const pick = (opts.length ? opts : choicesOf(c, l).map((x, j) => ({ ...x, j })).filter((x) => x.open)).sort((a, b) => score(b) - score(a))[0];
    l = choose(l, pick.j).life; t++;
  }
  taps += t; ends[l.end ?? '?'] = (ends[l.end ?? '?'] ?? 0) + 1;
  for (const x of RIVALS) if (l.riv && gone(l.riv[x.k].st)) cnt[x.k] = (cnt[x.k] ?? 0) + 1;
  if (l.flags.includes('hoang_hau')) hau++;
}
console.log('taps', (taps / N).toFixed(1), 'diệt', Object.fromEntries(RIVALS.map((x) => [x.k, ((100 * (cnt[x.k] ?? 0)) / N).toFixed(0) + '%'])), 'lên hậu', ((100 * hau) / N).toFixed(1) + '%');
console.log(Object.entries(ends).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => `${k} ${((100 * v) / N).toFixed(1)}%`).join(', '));
