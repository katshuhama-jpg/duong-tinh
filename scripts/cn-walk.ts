// Đi hết mọi nhánh phần Cung nga giặt áo (BFS theo trạng thái cờ), báo ngõ cụt, thẻ không tới được, cờ đặt mà không ai dùng/ai cần mà không ai đặt.
import { newLife, choose, cardOf, choicesOf, viewCard } from '../lib/cung/engine';
import { CN_CARDS } from '../lib/cung/cungnga/index';
import { endingOf } from '../lib/cung/world';
import type { Life } from '../lib/cung/types';

const bad: string[] = [];
const warn: string[] = [];
const reach = new Set<string>();
const openCh = new Set<string>();
const ends: Record<string, number> = {};
const setFlags = new Set<string>();
// chỉ nhớ những cờ và số mà có thẻ/lựa chọn đòi, để các nhánh không nổ tổ hợp
const keyFlags = new Set<string>(['bac1', 'bac2', 'bac3', 'bac4', 'bac5']);
const numCap: Record<string, number> = {};
const key = (l: Life) =>
  `${l.card}|${l.end}|${l.chapter}|${l.chain?.hoi ?? 0}|${l.flags.filter((f) => keyFlags.has(f)).sort().join(',')}|${Object.entries(numCap).map(([k, m]) => Math.min((l.n as Record<string, number>)[k] ?? 0, m)).join(',')}`;
const collect = (cd?: import('../lib/cung/types').Cond) => {
  for (const f of [...(cd?.flags ?? []), ...(cd?.not ?? [])]) keyFlags.add(f);
  for (const [k, v] of Object.entries(cd?.num ?? {})) numCap[k] = Math.max(numCap[k] ?? 0, (v as number[])[0] + 1, Math.min((v as number[])[1], 99) >= 99 ? 0 : (v as number[])[1] + 1);
};

// tĩnh: id, next, chữ
const ids = new Set(CN_CARDS.map((c) => c.id));
if (ids.size !== CN_CARDS.length) bad.push('trùng id thẻ');
for (const c of CN_CARDS) if (cardOf(c.id) !== c) bad.push(`id ${c.id} trùng với thẻ phần khác`);
for (const c of CN_CARDS) {
  if (!c.choices.length) bad.push(`${c.id}: không có lựa chọn`);
  for (const o of c.choices) {
    if (o.fx.next && !ids.has(o.fx.next)) bad.push(`${c.id}: next ${o.fx.next} không tồn tại`);
    if (o.fx.end && !endingOf(o.fx.end)) bad.push(`${c.id}: kết cục ${o.fx.end} không tồn tại`);
    for (const f of o.fx.flag ?? []) setFlags.add(f);
    for (const t of [o.t, o.note ?? '']) {
      if (/[—]/.test(t)) bad.push(`${c.id}: có dấu — trong "${t.slice(0, 30)}"`);
      if (/\{[A-Za-z]+[:}]/.test(t) && !/\{(ho|goc|que|me)\}/.test(t)) bad.push(`${c.id}: chữ giữ chỗ`);
    }
  }
  for (const t of c.text) {
    if (/[—]/.test(t)) bad.push(`${c.id}: có dấu — trong lời kể`);
    if (t.length > 330) warn.push(`${c.id}: một đoạn dài ${t.length} chữ`);
  }
  if (c.choices.length > 5) warn.push(`${c.id}: ${c.choices.length} lựa chọn`);
}
// cờ cần mà không ai đặt
const needFlags = new Set<string>();
for (const c of CN_CARDS) {
  for (const f of [...(c.when?.flags ?? []), ...c.choices.flatMap((o) => o.need?.flags ?? [])]) needFlags.add(f);
}
for (const f of needFlags) if (!setFlags.has(f) && !/^bac\d$/.test(f)) bad.push(`cờ "${f}" được đòi mà không ai đặt`);

for (const c of CN_CARDS.filter((x) => x.chapter[0] <= 4)) { collect(c.when); for (const o of c.choices) collect(o.need); }
// động: BFS
const start = newLife('Đào', 'cung', 12345);
start.tales = [];
const seenKey = new Set<string>();
const q: Life[] = [start];
let states = 0;
while (q.length) {
  let l = q.pop()!;
  l = { ...l, showCh: undefined, tales: [] };
  if (l.end) {
    ends[l.end] = (ends[l.end] ?? 0) + 1;
    continue;
  }
  // BFS đầy đủ chỉ tới hết chương 4 (sau đó tổ hợp cờ nổ); chương 5-7 kiểm bằng scripts/cn-sim.ts
  if (l.chapter >= 5) { ends['(vào chương 5)'] = (ends['(vào chương 5)'] ?? 0) + 1; continue; }
  const k = key(l);
  if (seenKey.has(k)) continue;
  seenKey.add(k);
  states++;
  const c = cardOf(l.card!);
  if (!c) {
    bad.push(`thẻ ${l.card} không có`);
    continue;
  }
  reach.add(c.id);
  viewCard(c, l);
  const open = choicesOf(c, l).map((x, j) => (x.open ? j : -1)).filter((j) => j >= 0);
  if (!open.length) {
    bad.push(`ngõ cụt: ${c.id} không có lựa chọn mở`);
    continue;
  }
  for (const j of open) {
    openCh.add(`${c.id}#${j}`);
    const r = choose(l, j);
    for (const f of r.life.flags) setFlags.add(f);
    if (l.chapter <= 6 && !r.life.end && r.life.chapter === l.chapter && Math.floor(r.life.age * 12) !== Math.floor(l.age * 12)) bad.push(`${c.id}: tuổi nhích trong chương 1-6`);
    q.push(r.life);
  }
}
for (const c of CN_CARDS.filter((x) => x.chapter[0] <= 4)) c.choices.forEach((_, j) => { if (!openCh.has(`${c.id}#${j}`)) bad.push(`lựa chọn không bao giờ mở được: ${c.id} #${j} "${c.choices[j].t.slice(0, 30)}"`); });
const unreached = CN_CARDS.filter((c) => c.chapter[0] <= 4 && !reach.has(c.id)).map((c) => c.id);
if (unreached.length) bad.push('thẻ không tới được: ' + unreached.join(', '));
// cờ đặt mà chưa ai dùng
const used = new Set<string>(needFlags);
for (const c of CN_CARDS) for (const o of c.choices) for (const f of o.need?.not ?? []) used.add(f);
for (const c of CN_CARDS) for (const f of c.when?.not ?? []) used.add(f);
const idle = [...setFlags].filter((f) => !used.has(f));
console.log({ states, thẻ: CN_CARDS.length, tớiĐược: reach.size });
console.log('kết cục tới được:', ends);
console.log('lỗi:', bad.length ? bad : 'không');
console.log('cảnh báo:', warn.length ? warn : 'không');
console.log('cờ đã đặt, chưa chương nào dùng (chờ chương sau):', idle.join(', ') || 'không');
process.exit(bad.length ? 1 : 0);
