// Phần Công chúa triều trước: kiểm tĩnh + chạy thử ngẫu nhiên nhiều đời.
// Dùng: npx tsx scripts/cc-sim.ts [số đời] [cờ thiên về, cách nhau dấu phẩy; "!cờ" là tránh; "end:<id>" là nhắm kết]
import { newLife, choose, cardOf, choicesOf } from '../lib/cung/engine';
import { CC_CARDS } from '../lib/cung/congchua/index';
import { CC_ENDINGS } from '../lib/cung/congchua/endings';
import { endingOf } from '../lib/cung/world';
import type { Cond } from '../lib/cung/types';
const N = Number(process.argv[2] ?? 5000);
const bias = process.argv[3] ?? '';
const want = bias ? bias.split(',') : [];
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647), seed / 2147483647);

/* ----- kiểm tĩnh ----- */
const st: string[] = [];
const ids = new Set<string>();
const setAny = new Set<string>(['g_chua', 'cua_hop', 'cua_tram', 'cua_vang']);
for (const c of CC_CARDS) for (const o of c.choices) for (const fx of [o.fx, o.risk?.fail]) for (const f of fx?.flag ?? []) setAny.add(f);
const needF = (q?: Cond) => [...(q?.flags ?? []), ...(q?.not ?? []), ...(q?.some?.[1] ?? [])];
for (const c of CC_CARDS) {
  if (ids.has(c.id)) st.push(`trùng id ${c.id}`);
  ids.add(c.id);
  if (cardOf(c.id) !== c) st.push(`id ${c.id} đụng thẻ phần khác`);
  if (c.part !== 'congchua') st.push(`${c.id} sai part`);
  if (c.text.join(' ').includes('—') || c.choices.some((o) => (o.t + (o.note ?? '')).includes('—'))) st.push(`${c.id} có dấu gạch dài`);
  for (const f of needF(c.when)) if (!setAny.has(f) && !/^chet_|^d_/.test(f)) st.push(`${c.id}: điều kiện cờ ${f} không ai đặt`);
  c.choices.forEach((o, j) => {
    for (const fx of [o.fx, o.risk?.fail]) {
      if (!fx) continue;
      if (fx.next && !cardOf(fx.next)) st.push(`${c.id}#${j}: next ${fx.next} không có`);
      if (fx.end && !endingOf(fx.end)) st.push(`${c.id}#${j}: kết ${fx.end} không có`);
    }
    for (const f of needF(o.need)) if (!setAny.has(f)) st.push(`${c.id}#${j}: cần cờ ${f} không ai đặt`);
    if (!o.note) st.push(`${c.id}#${j}: thiếu lời kể`);
  });
}

/* ----- chạy thử ----- */
const reach = new Set<string>(), opened = new Set<string>(), bad: string[] = [];
const ends: Record<string, number> = {}, len: number[] = [], chAt: Record<string, number> = {};
for (let i = 0; i < N; i++) {
  let l = newLife('Ngọc Kiều', 'chua', 5000 + i);
  let steps = 0;
  for (let s = 0; s < 800 && !l.end; s++) {
    l = { ...l, showCh: undefined, tales: [] };
    const c = cardOf(l.card ?? '');
    if (!c) { bad.push(`thẻ ${l.card} không có`); break; }
    if (c.part !== 'congchua') { bad.push(`lạc sang thẻ phần khác: ${c.id}`); break; }
    reach.add(c.id);
    const op = choicesOf(c, l).map((x, j) => (x.open ? j : -1)).filter((j) => j >= 0);
    if (!op.length) { bad.push(`ngõ cụt ${c.id}`); break; }
    let pick = op[Math.floor(rnd() * op.length)];
    if (want.length && rnd() < 0.85) {
      const good = op.filter((j) => (c.choices[j].fx.flag ?? []).some((f) => want.includes(f)));
      const endW = want.find((w) => w.startsWith('end:'))?.slice(4);
      const avoid = op.filter((j) => !(c.choices[j].fx.flag ?? []).some((f) => want.includes('!' + f)) && !(c.choices[j].fx.end && c.choices[j].fx.end !== endW));
      if (good.length) pick = good[Math.floor(rnd() * good.length)];
      else if (avoid.length) pick = avoid[Math.floor(rnd() * avoid.length)];
    }
    opened.add(`${c.id}#${pick}`);
    for (const j of op) opened.add(`${c.id}#${j}:open`);
    l = choose(l, pick).life;
    steps++;
  }
  if (!l.end) { bad.push(`đời không kết thúc (dừng ở ${l.card})`); continue; }
  if (!endingOf(l.end)) bad.push(`kết ${l.end} không có`);
  ends[l.end] = (ends[l.end] ?? 0) + 1;
  chAt[`ch${l.chapter}`] = (chAt[`ch${l.chapter}`] ?? 0) + 1;
  len.push(steps);
}
const unreached = CC_CARDS.filter((c) => !reach.has(c.id)).map((c) => c.id);
const neverOpen: string[] = [];
for (const c of CC_CARDS) if (reach.has(c.id)) c.choices.forEach((o, j) => { if (!opened.has(`${c.id}#${j}:open`)) neverOpen.push(`${c.id}#${j} "${o.t.slice(0, 26)}"`); });
const missEnd = CC_ENDINGS.filter((e) => !ends[e.id]).map((e) => e.id);
len.sort((a, b) => a - b);
console.log('kiểm tĩnh:', st.length ? [...new Set(st)].slice(0, 40) : 'không lỗi');
console.log('đời:', N, bias ? `(thiên về ${bias})` : '', '· số thẻ một đời: trung vị', len[len.length >> 1], ', dài nhất', len[len.length - 1]);
console.log('thẻ tới được:', reach.size, '/', CC_CARDS.length, unreached.length ? 'thiếu: ' + unreached.join(', ') : '');
console.log('lựa chọn chưa từng mở:', neverOpen.length ? neverOpen.join(' | ') : 'không');
console.log('kết:', Object.entries(ends).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(', '));
console.log('chương lúc kết:', Object.entries(chAt).sort().map(([k, v]) => `${k}=${v}`).join(' '));
console.log('kết chưa chạm:', missEnd.join(', ') || 'không');
console.log('lỗi:', bad.length ? [...new Set(bad)].slice(0, 20) : 'không');
