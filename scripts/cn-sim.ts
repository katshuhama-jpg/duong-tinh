// Phần Cung nga: chạy thử ngẫu nhiên rất nhiều đời để kiểm logic cả phần (thẻ, lựa chọn, kết, tuổi, bậc).
import { newLife, choose, cardOf, choicesOf } from '../lib/cung/engine';
import { CN_CARDS } from '../lib/cung/cungnga/index';
import { CN_ENDINGS } from '../lib/cung/cungnga/endings';
import { endingOf } from '../lib/cung/world';
const N = Number(process.argv[2] ?? 20000);
const bias = process.argv[3] ?? '';
let seed = 99;
const rnd = () => ((seed = (seed * 16807) % 2147483647), seed / 2147483647);
const reach = new Set<string>(), opened = new Set<string>(), bad: string[] = [];
const ends: Record<string, number> = {}, endAge: Record<string, number[]> = {}, bac: Record<string, number> = {};
const setF = new Set<string>();
const want = bias ? bias.split(',') : [];
for (let i = 0; i < N; i++) {
  let l: any = newLife('Đào', 'cung', 1000 + i);
  l.tales = [];
  let lastCh = 1;
  for (let s = 0; s < 400 && !l.end; s++) {
    l = { ...l, showCh: undefined, tales: [] };
    if (l.chapter !== lastCh) {
      const b = [5, 4, 3, 2, 1].find((k) => l.flags.includes(`bac${k}`)) ?? 1;
      bac[`ch${l.chapter}:b${b}`] = (bac[`ch${l.chapter}:b${b}`] ?? 0) + 1;
      lastCh = l.chapter;
    }
    const c = cardOf(l.card);
    if (!c) { bad.push(`thẻ ${l.card} không có`); break; }
    if (c.part !== 'cungnga') { bad.push(`lạc sang thẻ phần khác: ${c.id}`); break; }
    reach.add(c.id);
    const op = choicesOf(c, l).map((x: any, j: number) => (x.open ? j : -1)).filter((j: number) => j >= 0);
    if (!op.length) { bad.push(`ngõ cụt ${c.id}`); break; }
    // thiên về các lựa chọn đặt cờ mong muốn (để chắc chạm được kết khó)
    let pick = op[Math.floor(rnd() * op.length)];
    if (want.length && rnd() < 0.85) {
      const good = op.filter((j: number) => (c.choices[j].fx.flag ?? []).some((f) => want.includes(f)));
      const avoid = op.filter((j: number) => !(c.choices[j].fx.flag ?? []).some((f) => want.includes('!' + f)) && !(c.choices[j].fx.end && c.choices[j].fx.end !== want.find((w) => w.startsWith('end:'))?.slice(4)));
      if (good.length) pick = good[Math.floor(rnd() * good.length)];
      else if (avoid.length) pick = avoid[Math.floor(rnd() * avoid.length)];
    }
    opened.add(`${c.id}#${pick}`);
    for (const j of op) opened.add(`${c.id}#${j}:open`);
    const a0 = l.age, ch0 = l.chapter;
    l = choose(l, pick).life;
    for (const f of l.flags) setF.add(f);
    if (!l.end && l.chapter === ch0 && ch0 <= 6 && Math.floor(l.age * 12) !== Math.floor(a0 * 12)) bad.push(`${c.id}: tuổi nhích giữa chương ${ch0}`);
  }
  if (!l.end) { bad.push('đời không kết thúc'); continue; }
  if (!endingOf(l.end)) bad.push(`kết ${l.end} không có`);
  ends[l.end] = (ends[l.end] ?? 0) + 1;
  (endAge[l.end] ??= []).push(Math.floor(l.age));
}
const unreached = CN_CARDS.filter((c) => !reach.has(c.id)).map((c) => c.id);
const neverOpen: string[] = [];
for (const c of CN_CARDS) c.choices.forEach((o, j) => { if (!opened.has(`${c.id}#${j}:open`)) neverOpen.push(`${c.id}#${j} "${o.t.slice(0, 28)}"`); });
const missEnd = CN_ENDINGS.filter((e) => e.id !== 'cn_tiep' && !ends[e.id]).map((e) => e.id);
const uniq = [...new Set(bad)];
console.log('đời:', N, bias ? `(thiên về ${bias})` : '');
console.log('thẻ tới được:', reach.size, '/', CN_CARDS.length, unreached.length ? 'thiếu: ' + unreached.join(', ') : '');
console.log('lựa chọn chưa từng mở:', neverOpen.length ? neverOpen.join(' | ') : 'không');
console.log('kết:', Object.entries(ends).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v} (tuổi ${Math.min(...endAge[k])}-${Math.max(...endAge[k])})`).join(', '));
console.log('kết chưa chạm:', missEnd.join(', ') || 'không');
console.log('bậc đầu chương:', Object.entries(bac).sort().map(([k, v]) => `${k}=${v}`).join(' '));
console.log('lỗi:', uniq.length ? uniq.slice(0, 20) : 'không');
