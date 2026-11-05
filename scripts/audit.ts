import { newLife, choose, cardOf, viewCard } from '../lib/cung/engine';
import { RIVALS } from '../lib/cung/world';
import { BRANCH_CARDS } from '../lib/cung/content';
const br = new Set(BRANCH_CARDS.map((c) => c.id));
const SUMMON = /đèn đỏ|thị tẩm|được gọi hầu|hầu vua|long sàng|đêm ấy Hoàng thượng|Hoàng thượng ngủ lại|lật thẻ/i;
const PREG = /có thai|mang thai|có mang|cái thai|thai nhi|vượt cạn|bụng mang|an thai|sảy thai/i;
const out: Record<string, Record<string, number>> = {};
const hit = (k: string, id: string) => ((out[k] ??= {})[id] = (out[k][id] ?? 0) + 1);
const VUA_DEAD = ['b5_bang', 'b5_bang2', 'b5_sung'];
for (const o of ['dan', 'quan', 'cung', 'chua']) for (let s = 1; s <= 400; s++) {
  let l = newLife('A', o, s * 7919);
  let summoned = false, hanhGone = false, vuaDead = false;
  for (let i = 0; i < 200 && !l.end; i++) {
    const c = viewCard(cardOf(l.card ?? "")!, l);
    const txt = c.text.join(' ');
    if (SUMMON.test(txt) || c.id === 'b2_den' || c.id === 'b1_hoi') summoned = true;
    if (PREG.test(txt) && !summoned && !l.kids.length) hit('mang thai khi chưa từng được gọi', c.id);
    if (hanhGone && (c.cast.includes('hanh') || /Hạnh/.test(txt))) hit('Hạnh đã bị đuổi vẫn xuất hiện', c.id);
    if (vuaDead && c.cast.includes('vua') && !/vua (mới|trẻ|con)|Vua (mới|trẻ|con)/.test(txt)) hit('vua đã băng vẫn xuất hiện', c.id);
    if (c.cast.includes('con') && !l.kids.length && !c.whoName) hit('có con trong cảnh khi chưa sinh', c.id);
    if (['chet','giang'].includes(l.riv?.thaipho?.st ?? '') && /Thái phó/.test(txt)) hit('Thái phó đã ngã vẫn được nhắc', c.id);
    for (const r of RIVALS.filter((x) => x.cast !== 'quan')) if (l.riv?.[r.k] && ['chet'].includes(l.riv[r.k].st) && c.cast.includes(r.cast as never) && !(c.when?.riv && r.k in c.when.riv)) hit(`${r.t} đã chết vẫn xuất hiện`, c.id);
    // chọn ngẫu nhiên, tránh nhánh rẽ cụt
    const opts = c.choices.map((x, j) => j).filter((j) => !(c.choices[j].fx.next && br.has(c.choices[j].fx.next!)) && !c.choices[j].fx.end);
    const pool = opts.length ? opts : c.choices.map((_, j) => j);
    const j = pool[(s * 31 + i * 17) % pool.length];
    const ch = c.choices[j];
    if (/Đuổi Hạnh/.test(ch.t)) hanhGone = true;
    if (VUA_DEAD.includes(c.id)) vuaDead = true;
    l = choose(l, j).life;
  }
}
for (const [k, v] of Object.entries(out)) console.log(k, '->', Object.entries(v).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([a, b]) => `${a}(${b})`).join(' '));
