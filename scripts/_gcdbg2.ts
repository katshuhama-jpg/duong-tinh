import { newLife, choose, cardOf, choicesOf } from '../lib/cung/engine';
const N = 3000; let n7cha = 0, ch7 = 0, alive7 = 0;
const want = ['cha_doiho', 'cha_song', 'cha_giay', 'khep_chi', 'huu_khep', 'nhiep', 'thai_hau'];
for (let i = 0; i < N; i++) {
  let l = newLife('Nụ', 'quan', i * 7 + 5); let t = 0;
  while (!l.end && t < 500) {
    l.tales = []; l.showCh = undefined;
    const c = cardOf(l.card!); if (!c) break;
    const open = choicesOf(c, l).map((x, j) => ({ x: x.c, j, o: x.open })).filter((x) => x.o);
    const safe = open.filter((x) => !x.x.fx.end && !x.x.risk?.fail.end); const pool = safe.length ? safe : open;
    const pref = pool.find((x) => (x.x.fx.flag ?? []).some((f) => want.includes(f)));
    l = choose(l, (pref ?? pool[Math.floor(Math.random() * pool.length)]).j).life; t++;
    if (l.chapter === 7 && !l.flags.includes('_c7')) { l.flags.push('_c7'); ch7++; if (!l.flags.includes('chet_cha')) alive7++; }
  }
  if (l.flags.includes('cha_giay')) n7cha++;
}
console.log({ ch7, alive7, n7cha, giay: (n7cha) });
