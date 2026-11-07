import { newLife, choose, cardOf, choicesOf } from '../lib/cung/engine';
const N = 1500; const why: Record<string, number> = {}; let n7cha = 0, giay = 0;
for (let i = 0; i < N; i++) {
  let l = newLife('Nụ', 'quan', i * 104729 + 77); let t = 0;
  while (!l.end && t < 500) {
    l.tales = []; l.showCh = undefined;
    const c = cardOf(l.card!); if (!c) break;
    const open = choicesOf(c, l).map((x, j) => ({ x: x.c, j, o: x.open })).filter((x) => x.o);
    const safe = open.filter((x) => !x.x.fx.end && !x.x.risk?.fail.end); const pool = safe.length ? safe : open;
    l = choose(l, pool[Math.floor(Math.random() * pool.length)].j).life; t++;
  }
  if ((l.notes ?? []).some((n) => n.ch === 3) === false && l.flags.includes('g_quan') && l.log.some((x) => /Chương mới: Thai/.test(x.t))) {
    const k = `${l.flags.includes('co_thai')}|${l.end}`; why[k] = (why[k] ?? 0) + 1;
  }
  if (l.flags.includes('n7_cha')) n7cha++; if (l.flags.includes('cha_giay')) giay++;
}
console.log(why, { n7cha, giay });
