import { newLife, choose, cardOf, choicesOf, doubt } from '../lib/cung/engine';
import { strength } from '../lib/cung/nghiem/cases';
const N = Number(process.argv[2] ?? 2000);
const WANT = (process.argv[3] ?? '').split(',').filter(Boolean);
let s0 = 12345;
const r = () => { s0 ^= s0 << 13; s0 >>>= 0; s0 ^= s0 >>> 17; s0 ^= s0 << 5; s0 >>>= 0; return s0 / 4294967296; };
const seen: Record<string, number> = {}; const ends: Record<string, number> = {}; let ch7 = 0; let err = 0;
const WATCH = ['ng_un_bat5', 'ng_un_bat5b', 'ng_nm_that', 'ng_ty_ten_a', 'ng_ty_ten_b', 'ng_ty_an', 'ng_lv_tre5', 'ng_ty_on6_a', 'an7_sot', 'n7_vc_ok', 'n7_vc_giu', 'n7_vc_chet', 'n4_hh_tu', 'n4_hau_a', 'n4_hau_b', 'n5_ngai_un_nuoi', 'n5_vi_hh_c', 'n5_vi_hh_h', 'n6_hh', 'n7_th_giuong', 'n7_th_giuong_c', 'n7_s_con_vua', 'n5_s_un_ta', 'n4_s_un_ta', 'n5_c_ba', 'n5_s_nm', 'n4_l_mua', 'n7_cuoi_ren'];
for (let i = 0; i < N; i++) {
  let l = newLife('Nụ', 'quan', i * 97 + 3); let t = 0;
  try {
    while (!l.end && t < 500) {
      l.tales = []; l.showCh = undefined;
      const c = cardOf(l.card!)!;
      const open = choicesOf(c, l).map((x, j) => ({ x: x.c, j, o: x.open })).filter((x) => x.o);
      let pick: typeof open[number] | undefined;
      const acc = open.filter((x) => x.x.fx.accuse);
      if (acc.length) {
        const an = acc[0].x.fx.accuse!.an;
        if (l.flags.includes('vua_benh') && an === 'an5') pick = acc.find((x) => x.x.fx.accuse!.who === 'tu');
        for (const id of l.an?.[an]?.tu ?? []) if (r() < 0.5 && !l.flags.includes(`nghi_${id}`)) l = doubt(l, id) ?? l;
        pick = pick ?? acc.find((x) => !['tu', 'gac'].includes(x.x.fx.accuse!.who) && strength(l, an, x.x.fx.accuse!.who).du) ?? acc.find((x) => x.x.fx.accuse!.who === 'gac');
      }
      if (!pick) {
        const sc = (x: any) => { let s = r() * 6; const fl = [...(x.fx.flag ?? []), ...(x.risk?.fail.flag ?? [])]; if (x.fx.clue && (l.n.hiem ?? 0) < 70) s += 4; if (x.fx.mo) s += 5; for (const w of WANT) if (fl.includes(w)) s += 20; if (x.fx.end) s -= 100; if (x.risk?.fail.end) s -= 4; if ((x.fx.d?.hiem ?? 0) > 8 && (l.n.hiem ?? 0) > 60) s -= 5; return s; };
        pick = open.slice().sort((a, b) => sc(b.x) - sc(a.x))[0];
      }
      l = choose(l, pick.j).life; t++;
    }
  } catch (e) { err++; if (err < 3) console.log(e); }
  if (l.chapter >= 7) ch7++;
  for (const id of l.seen) if (WATCH.includes(id)) seen[id] = (seen[id] ?? 0) + 1;
  ends[l.end!] = (ends[l.end!] ?? 0) + 1;
}
console.log('err', err, 'ch7', ((100 * ch7) / N).toFixed(1) + '%');
console.log(WATCH.map((k) => `${k}:${seen[k] ?? 0}`).join('  '));
console.log(Object.entries(ends).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${((100 * v) / N).toFixed(1)}%`).join('  '));
