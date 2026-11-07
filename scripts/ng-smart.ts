// người chơi "khéo": đào manh mối, chỉ xử khi đèn sáng, không thì gác án
import { newLife, choose, cardOf, choicesOf, doubt } from '../lib/cung/engine';
import { strength } from '../lib/cung/nghiem/cases';
import { vayCanh, VC_NOI } from '../lib/cung/nghiem/daumoi';
const N = Number(process.argv[2] ?? 1000);
const ends: Record<string, number> = {}; const kinds: Record<string, number> = {}; let truths = 0, sons = 0;
for (let i = 0; i < N; i++) {
  let l = newLife('Nụ', 'quan', i * 31 + 7); let t = 0;
  while (!l.end && t < 400) {
    l.tales = []; l.showCh = undefined;
    const c = cardOf(l.card!)!;
    const open = choicesOf(c, l).map((x, j) => ({ x: x.c, j, o: x.open })).filter((x) => x.o);
    // Hiểm cao thì thôi đào
    let pick = (l.n.hiem ?? 0) >= 70 ? undefined : open.find((x) => x.x.fx.clue || x.x.fx.mo);
    const acc = open.filter((x) => x.x.fx.accuse);
    if (acc.length) {
      // người chơi khéo: chưa ai sáng đèn thì thử nghi từng manh mối có qua tay kẻ thù
      const an = acc[0].x.fx.accuse!.an;
      const anyDu = () => acc.some((x) => !['tu', 'gac'].includes(x.x.fx.accuse!.who) && strength(l, an, x.x.fx.accuse!.who).du);
      // nghi tốn một lượt dò: hết lượt thì thôi
      for (const id of l.an?.[an]?.tu ?? []) if (!anyDu() && !l.flags.includes(`nghi_${id}`)) l = doubt(l, id) ?? l;
      pick = acc.find((x) => !['tu', 'gac'].includes(x.x.fx.accuse!.who) && strength(l, x.x.fx.accuse!.an, x.x.fx.accuse!.who).du) ?? acc.find((x) => x.x.fx.accuse!.who === 'gac');
    }
    // vây cánh còn đông thì không nói ra sự thật
    if (pick && (pick.x.fx.flag ?? []).includes('ch7_noi') && vayCanh(l).diem < VC_NOI) pick = undefined;
    if (!pick) pick = open.filter((x) => !((x.x.fx.flag ?? []).includes('ch7_noi') && vayCanh(l).diem < VC_NOI)).find((x) => !x.x.fx.end && !x.x.risk && (x.x.fx.d?.hiem ?? 0) <= 8) ?? open.find((x) => !x.x.fx.end) ?? open[0];
    l = choose(l, pick.j).life; t++;
  }
  ends[l.end!] = (ends[l.end!] ?? 0) + 1;
  for (const f of l.flags) if (/^an\d_(thang|gai|phancong|gac|tu|sot)$/.test(f)) kinds[f] = (kinds[f] ?? 0) + 1;
  truths += l.flags.filter((f) => /^su\d+$/.test(f)).length; sons += l.kids.length;
}
console.log(Object.entries(ends).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${((100 * v) / N).toFixed(1)}%`).join('  '));
console.log(kinds, 'su/đời', (truths / N).toFixed(1), 'con/đời', (sons / N).toFixed(2));
