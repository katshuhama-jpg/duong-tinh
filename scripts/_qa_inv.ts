// Bất biến và thống kê trên nhiều đời
import { play, polRandom, polSmart, endingOf, caseOf, knows, cardOf, sons, type Run, type Pol } from './_qa_lib';
import { NGHIEM_ENDINGS } from '../lib/cung/nghiem/endings';
const N = Number(process.argv[2] ?? 1000);
const NAME: Record<string, RegExp> = {
  luavang: /Lụa Vàng/, thaiy: /Thái y Thẩm|Thái y(?! viện)/, nhumau: /[Nn]hũ mẫu/, kiem: /Kiệm/, lymac: /Lý Mặc/, thaihau: /Thái hậu/, hoanghau: /Hoàng hậu/,
  uyennhu: /Uyển Như|Quý phi Hà/, huu: /Hựu/, cha: /\bcha\b|Cha\b/, thaisu: /Thái sư/, vua: /Hoàng thượng/,
};
type Agg = Record<string, number>;
const ends: Agg = {}, issues: Record<string, Set<string>> = {}, samples: Record<string, string[]> = {};
const add = (k: string, card: string, s?: string) => { (issues[k] ??= new Set()).add(card); if (s && (samples[k] ??= []).length < 12) samples[k].push(card + ' :: ' + s.slice(0, 220)); };
const reach: Agg = {}; const ch7ends: Agg = {}; let lives = 0;
const deadNoOmen: Agg = {};
function check(run: Run, tag: string) {
  lives++;
  const l = run.l;
  if (run.err) add('ERR', run.err);
  ends[l.end!] = (ends[l.end!] ?? 0) + 1;
  reach[`${tag}:c${l.chapter}`] = (reach[`${tag}:c${l.chapter}`] ?? 0) + 1;
  if (l.chapter === 7) ch7ends[`${tag}:${l.end}`] = (ch7ends[`${tag}:${l.end}`] ?? 0) + 1;
  const e = endingOf(l.end!);
  if (e?.dead && l.omen === 'Có những điềm báo chỉ nhìn lại mới thấy.') deadNoOmen[`${l.end}@${run.steps[run.steps.length - 1]?.id}`] = (deadNoOmen[`${l.end}@${run.steps[run.steps.length - 1]?.id}`] ?? 0) + 1;
  // trạng thái theo chương: tái dựng cờ trước mỗi bước
  let flags: string[] = l.flags.slice(0, 0);
  // dựng lại cờ: dùng steps.added
  const fl = new Set<string>(); let prevCh = 1;
  for (const s of run.steps) {
    if (s.ch !== prevCh) {
      const F = [...fl];
      if (s.ch === 5) { const dc = F.filter((x) => /^dc_(huu|canh|un)$/.test(x)); if (dc.length !== 1) add('ch5_dc_' + dc.length, s.id, F.join(' ')); }
      if (s.ch === 6) { const lv = F.filter((x) => /_lenngoi$/.test(x)); if (!F.includes('chet_vua')) add('ch6_no_chet_vua', s.id, F.join(' ')); if (lv.length !== 1) add('ch6_lenngoi_' + lv.length, s.id, F.join(' ')); }
      prevCh = s.ch;
    }
    const all = [s.lead ?? '', ...s.text, ...s.ch_.map((x) => x.t), s.note].join(' ');
    if (/\{[A-Z]+:|\{[A-Z]+\}/.test(all)) add('placeholder', s.id, all);
    if (/—/.test(all)) add('emdash', s.id);
    if (/undefined|NaN/.test(all)) add('undefined', s.id, all);
    // người đã chết/đi mà thẻ vẫn nhắc tên
    for (const f of fl) {
      const m = /^(chet|di)_(\w+)$/.exec(f);
      if (!m || !NAME[m[2]]) continue;
      const txt = [s.lead ?? '', ...s.text, ...s.ch_.filter((x) => x.open).map((x) => x.t)].join(' ');
      if (NAME[m[2]].test(txt)) add(`mention_${f}`, s.id, txt);
      if (s.cast.includes(m[2])) add(`cast_${f}`, s.id);
    }
    // Cảnh khi không có con trai
    const txt2 = [s.lead ?? '', ...s.text, ...s.ch_.filter((x) => x.open).map((x) => x.t), s.note].join(' ');
    // (đếm con theo thời điểm: dùng tuổi sinh)
    const sonsNow = run.l.kids.filter((k) => k.sex === 'trai' && k.born <= Math.floor(s.age)).length;
    if (/Cảnh/.test(txt2) && sonsNow === 0) add('canh_no_son', s.id, txt2);
    if (/Cảnh/.test(txt2) && run.l.kids.length === 0) add('canh_no_kid', s.id, txt2);
    // vụ án: tên thật tay sai lộ trước khi xử (thẻ không phải xử án)
    for (const c of ['an4', 'an5']) {
      const st = run.l.an?.[c];
      if (!st) continue;
      if (fl.has(`xu_${c}`)) continue;
      const tay = caseOf(c).suspects.find((x) => x.k === st.tay)!;
      if (all.includes(tay.name) && !/^n\d_xu/.test(s.id)) add(`leak_${c}`, s.id, tay.name + ' :: ' + all);
    }
    for (const a of s.added) fl.add(a);
    if (s.ch === 7 && [...fl].filter((x) => x.startsWith('vt_')).length > 1) add('ch7_multi_vt', s.id, [...fl].filter((x) => x.startsWith('vt_')).join(' '));
  }
  void flags;
}
const pols: [string, Pol][] = [['rand', polRandom], ['smart', polSmart()], ['safe', polSmart([], [], { safe: true })]];
for (const [tag, p] of pols) for (let i = 0; i < N; i++) check(play(i * 7919 + 13, p, i * 31 + 3), tag);
console.log('lives', lives);
const all = NGHIEM_ENDINGS.map((e) => e.id).filter((x) => x !== 'n_tiep');
console.log('ZERO endings:', all.filter((x) => !ends[x]).join(' '));
console.log('reach:', JSON.stringify(reach));
console.log('ch7 ends:', Object.entries(ch7ends).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}=${v}`).join(' '));
console.log('dead w/o omen:', JSON.stringify(deadNoOmen));
for (const [k, v] of Object.entries(issues)) { console.log(`\n## ${k}: ${[...v].join(', ')}`); for (const s of samples[k] ?? []) console.log('   - ' + s); }
