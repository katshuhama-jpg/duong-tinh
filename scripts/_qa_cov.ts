import { play, polRandom, polSmart, polBold, type Pol } from './_qa_lib';
import { NG_CARDS } from '../lib/cung/nghiem/index';
const N = Number(process.argv[2] ?? 500);
const seen: Record<string, number> = {}, opened: Record<string, number> = {}, picked: Record<string, number> = {};
const pols: Pol[] = [polBold(5, 0.3), polBold(5, 0.8), polBold(4, 0.5), polRandom, polSmart(), polSmart([], [], { safe: true }), polSmart(['hoang_hau','dc_un','nuoi_un','nhiep','dm_un','dm_hoanghau','su12','o_chua','giu_lang','buoc_mh','phe_thaihau']), polSmart(['dc_canh','canh_lenngoi','theo_ts','ban_ts','mua_kiem','lv_mua','un_han','chet_thaiy','chet_lymac','bat_hieu'])];
for (const p of pols) for (let i = 0; i < N; i++) {
  const r = play(i * 2654435 + 99, p, i * 17 + 9);
  for (const s of r.steps) { seen[s.id] = (seen[s.id] ?? 0) + 1; s.ch_.forEach((c, j) => { if (c.open) opened[s.id + '#' + j] = (opened[s.id + '#' + j] ?? 0) + 1; }); picked[s.id + '#' + s.pick] = (picked[s.id + '#' + s.pick] ?? 0) + 1; }
}
const ng = NG_CARDS.filter((c) => c.chapter.some((x) => x >= 4));
console.log('NEVER SHOWN (ch4-7):', ng.filter((c) => !seen[c.id]).map((c) => c.id).join(' '));
const never: string[] = [];
for (const c of ng) if (seen[c.id]) c.choices.forEach((_, j) => { if (!opened[c.id + '#' + j]) never.push(`${c.id}#${j}`); });
console.log('NEVER OPEN choices:', never.join(' '));
console.log('RARE (<3):', ng.filter((c) => seen[c.id] && seen[c.id] < 3).map((c) => c.id + ':' + seen[c.id]).join(' '));
