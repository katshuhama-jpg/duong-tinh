// người chơi "khéo": đào manh mối, chỉ xử khi đèn sáng, không thì gác án
import { newLife, choose, cardOf, choicesOf } from '../lib/cung/engine';
import { strength } from '../lib/cung/nghiem/cases';
const N = Number(process.argv[2] ?? 1000);
const ends: Record<string, number> = {}; const kinds: Record<string, number> = {}; let truths = 0, sons = 0;
for (let i = 0; i < N; i++) {
  let l = newLife('Nụ', 'quan', i * 31 + 7); let t = 0;
  while (!l.end && t < 400) {
    l.tales = []; l.showCh = undefined;
    const c = cardOf(l.card!)!;
    const open = choicesOf(c, l).map((x, j) => ({ x: x.c, j, o: x.open })).filter((x) => x.o);
    let pick = open.find((x) => x.x.fx.clue || x.x.fx.mo);
    const acc = open.filter((x) => x.x.fx.accuse);
    if (acc.length) {
      pick = acc.find((x) => !['tu', 'gac'].includes(x.x.fx.accuse!.who) && strength(l, x.x.fx.accuse!.an, x.x.fx.accuse!.who).du) ?? acc.find((x) => x.x.fx.accuse!.who === 'gac');
    }
    if (!pick) pick = open.find((x) => !x.x.fx.end && !x.x.risk && (x.x.fx.d?.hiem ?? 0) <= 8) ?? open.find((x) => !x.x.fx.end) ?? open[0];
    l = choose(l, pick.j).life; t++;
  }
  ends[l.end!] = (ends[l.end!] ?? 0) + 1;
  for (const f of l.flags) if (/^an\d_(thang|gai|phancong|gac|tu)$/.test(f)) kinds[f] = (kinds[f] ?? 0) + 1;
  truths += l.flags.filter((f) => /^su\d+$/.test(f)).length; sons += l.kids.length;
}
console.log(Object.entries(ends).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${((100 * v) / N).toFixed(1)}%`).join('  '));
console.log(kinds, 'su/đời', (truths / N).toFixed(1), 'con/đời', (sons / N).toFixed(2));
