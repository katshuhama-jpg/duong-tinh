import { play, polRandom, polSmart, fmt, type Pol } from './_qa_lib';
import type { Life } from '../lib/cung/types';
import { writeFileSync, mkdirSync } from 'fs';
const OUT = process.argv[2]; mkdirSync(OUT, { recursive: true });
const f = (l: Life, x: string) => l.flags.includes(x);
type Sc = { name: string; pol: Pol; pred: (l: Life) => boolean; k: number; tries?: number };
const S: Sc[] = [
  { name: '01_smart', pol: polSmart(), pred: (l) => l.chapter === 7, k: 2 },
  { name: '02_safe', pol: polSmart([], [], { safe: true }), pred: (l) => l.chapter === 7, k: 2 },
  { name: '03_random_far', pol: polRandom, pred: (l) => l.chapter >= 4, k: 2, tries: 4000 },
  { name: '04_hoanghau', pol: polSmart(['hoang_hau', 'dm_vua', 'buoc_mh', 'chet_hoanghau', 'phe_hoanghau']), pred: (l) => f(l, 'hoang_hau') && l.chapter >= 6, k: 2, tries: 6000 },
  { name: '05_uyennhu', pol: polSmart(['dc_un', 'nuoi_un', 'un_lenngoi', 'dm_un', 'un_con', 'ts_day_un']), pred: (l) => f(l, 'un_lenngoi'), k: 2, tries: 6000 },
  { name: '06_nokid', pol: polSmart(), pred: (l) => l.kids.length === 0 && l.chapter >= 6, k: 2, tries: 6000 },
  { name: '07_matthai', pol: polSmart(['mat_thai']), pred: (l) => f(l, 'mat_thai') && l.chapter >= 5, k: 1, tries: 6000 },
  { name: '08_luavang_di', pol: polSmart(['di_luavang', 'chet_luavang']), pred: (l) => (f(l, 'di_luavang') || f(l, 'chet_luavang')) && l.chapter >= 6, k: 2, tries: 6000 },
  { name: '09_thaiy_chet', pol: polSmart(['chet_thaiy']), pred: (l) => f(l, 'chet_thaiy') && l.chapter >= 5, k: 1, tries: 6000 },
  { name: '10_vua_benh', pol: polSmart(), pred: (l) => f(l, 'vua_benh') && l.chapter >= 6, k: 2, tries: 6000 },
  { name: '11_oan_ch5', pol: polSmart([], [], { wantWho: { an5: 'ts' } }), pred: (l) => l.chapter >= 5 && !!l.an?.an5?.xu, k: 3, tries: 3000 },
  { name: '12_canh_vua', pol: polSmart(['dc_canh', 'canh_lenngoi']), pred: (l) => f(l, 'canh_lenngoi') && l.chapter >= 7, k: 2, tries: 6000 },
  { name: '13_nhiep', pol: polSmart(['nhiep', 'thai_hau']), pred: (l) => f(l, 'nhiep') && l.chapter >= 7, k: 2, tries: 6000 },
  { name: '14_daughter', pol: polSmart(), pred: (l) => l.kids.length > 0 && l.kids.every((k) => k.sex === 'gai') && l.chapter >= 6, k: 1, tries: 6000 },
  { name: '15_phe_un3', pol: polSmart(['phe_un', 'buoc_un3'], [], { wantWho: { an3: 'un' } }), pred: (l) => f(l, 'phe_un') && l.chapter >= 5, k: 1, tries: 6000 },
  { name: '16_ochua_lang', pol: polSmart(['o_chua', 'giu_lang', 'vt_ni', 'vt_lang']), pred: (l) => (f(l, 'o_chua') || f(l, 'giu_lang')) && l.chapter >= 7, k: 2, tries: 6000 },
  { name: '17_cha_chet', pol: polSmart(['chet_cha', 'cha_chem', 'cha_tutan']), pred: (l) => f(l, 'chet_cha') && l.chapter >= 7, k: 1, tries: 6000 },
  { name: '18_thaihau_phe', pol: polSmart(['phe_thaihau', 'chet_thaihau', 'di_thaihau']), pred: (l) => (f(l, 'phe_thaihau') || f(l, 'di_thaihau')) && l.chapter >= 6, k: 1, tries: 6000 },
];
const only = process.argv[3];
for (const sc of S) {
  if (only && !sc.name.startsWith(only)) continue;
  const got: string[] = []; let n = 0;
  for (let i = 0; i < (sc.tries ?? 2000) && got.length < sc.k; i++) {
    const r = play(i * 104729 + 17, sc.pol, i * 7 + 1);
    n++;
    if (sc.pred(r.l)) got.push(fmt(r, `${sc.name} #${got.length} (thử ${n})`));
  }
  writeFileSync(`${OUT}/${sc.name}.txt`, got.join('\n\n\n') || `KHÔNG TÌM THẤY sau ${n} lần`);
  console.log(sc.name, got.length, 'tries', n);
}
