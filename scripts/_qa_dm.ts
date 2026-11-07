import { mkRnd, polSmart, polRandom, strength, type Pol } from './_qa_lib';
import { newLife, choose, cardOf, choicesOf } from '../lib/cung/engine';
import { dauMoi } from '../lib/cung/nghiem/daumoi';
const N = Number(process.argv[2] ?? 600);
type A = { n: number; cap: number[]; du: number; cd: number[]; cap1: number; capHit: number; thu: number; banNames: Record<string, number>; thuNames: Record<string, number>; tsChungThu: number; deadBan: number };
const agg: Record<string, A> = {};
const pols: [string, Pol][] = [['smart', polSmart()], ['safe', polSmart([], [], { safe: true })]];
for (const [tag, pol] of pols) for (let i = 0; i < N; i++) {
  const r = mkRnd(i * 31 + 3);
  let l = newLife('Nụ', 'quan', i * 7919 + 13); let t = 0;
  while (!l.end && t < 500) {
    l.tales = []; l.showCh = undefined;
    const c = cardOf(l.card!)!;
    const op = choicesOf(c, l).map((x, j) => ({ x: x.c, j, o: x.open })).filter((x) => x.o);
    const acc = op.find((x) => x.x.fx.accuse);
    if (acc && c.big) {
      const an = acc.x.fx.accuse!.an; const k = `${tag}:${an}`;
      const a = (agg[k] ??= { n: 0, cap: [], du: 0, cd: [], cap1: 0, capHit: 0, thu: 0, banNames: {}, thuNames: {}, tsChungThu: 0, deadBan: 0 });
      const dm = dauMoi(l); const st = l.an![an];
      a.n++; a.cap.push(dm.cap); a.cd.push(st.cd ?? 0); if (dm.cap === 1) a.cap1++; if ((st.cd ?? 0) >= dm.cap) a.capHit++; if (dm.thu.length) a.thu++;
      for (const b of dm.ban) a.banNames[b] = (a.banNames[b] ?? 0) + 1; for (const b of dm.thu) a.thuNames[b] = (a.thuNames[b] ?? 0) + 1;
      if (dm.thu.includes('Thái sư Hà') && l.flags.includes('ts_chung') && !l.flags.includes('theo_ts') && !l.flags.includes('ban_ts')) a.tsChungThu++;
      if (op.some((x) => x.x.fx.accuse && !['tu', 'gac'].includes(x.x.fx.accuse.who) && strength(l, an, x.x.fx.accuse.who).du)) a.du++;
    }
    l = choose(l, pol(l, c, op, r)).life; t++;
  }
}
for (const [k, a] of Object.entries(agg)) {
  const avg = (x: number[]) => (x.reduce((s, v) => s + v, 0) / x.length).toFixed(2);
  console.log(`${k}: n=${a.n} capTB=${avg(a.cap)} cdTB=${avg(a.cd)} cap1=${a.cap1} chạmTrần=${a.capHit} đủChứng=${(100 * a.du / a.n).toFixed(0)}% cóThù=${a.thu} tsChung-tínhThù=${a.tsChungThu}`);
  console.log('   ban:', JSON.stringify(a.banNames), ' thu:', JSON.stringify(a.thuNames));
}
