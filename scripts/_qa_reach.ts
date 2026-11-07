import { play, polSmart, polBold, type Pol } from './_qa_lib';
import { NGHIEM_ENDINGS } from '../lib/cung/nghiem/endings';
const N = Number(process.argv[2] ?? 3000);
const got: Record<string, number> = {};
const base = [polSmart(), polSmart([], [], { safe: true }), polBold(4, 0.4), polBold(2, 0.5), polSmart(['hoang_hau','dc_un','nuoi_un','nhiep','buoc_mh','dc_canh','theo_ts','ban_ts','mua_kiem','chet_thaiy','o_chua','giu_lang','su10','su11','su12','cha_nguc','chet_lymac','chet_nhumau','dm_un','dm_hoanghau','quen_lymac'])];
for (let i = 0; i < N; i++) {
  const b = base[i % base.length];
  const want = i % 3 !== 0 ? 0.6 : 0.2;
  const pol: Pol = (l, c, open, r) => {
    const fresh = open.filter((x) => { const e = x.x.fx.end ?? x.x.risk?.fail.end; const kc = [...(x.x.fx.flag ?? [])].find((f) => f.startsWith('kc_')); return (e && !got[e]) || (kc && !got[kc.slice(3)]); });
    if (fresh.length && r() < want) return fresh[Math.floor(r() * fresh.length)].j;
    return b(l, c, open, r);
  };
  const run = play(i * 911 + 3, pol, i * 13 + 1);
  got[run.l.end!] = (got[run.l.end!] ?? 0) + 1;
}
const all = NGHIEM_ENDINGS.map((e) => e.id).filter((x) => x !== 'n_tiep');
console.log('ZERO after explorer:', all.filter((x) => !got[x]).join(' '));
console.log('reached', all.filter((x) => got[x]).length, '/', all.length);
