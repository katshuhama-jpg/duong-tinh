// Đo nhịp chơi: số cảnh phải bấm mỗi đời, chữ mỗi cảnh, số lựa chọn, cảnh theo tuổi, cảnh có Hệ Thống
import { defaultCharacter } from '../lib/character';
import { newStory, rollFate } from '../lib/fate';
import { FIRST_SCENE, resolverOf } from '../lib/scenes';
import { choose, ctxOf, txt, visibleChoices } from '../lib/story';
let seed = 11;
const r = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const N = 200;
let taps = 0, chars = 0, opts = 0, feed = 0, ht = 0, words = 0, wed = 0, gaps = 0, gapN = 0;
const byAge: Record<string, number> = {};
const kinds: Record<string, number> = {};
for (let i = 0; i < N; i++) {
  const f = rollFate(r);
  const c = { ...defaultCharacter(f.gender), name: f.name, birthYear: f.birthYear };
  let s = newStory(f, FIRST_SCENE);
  const R = resolverOf(c, f.family);
  let lastTap = -9;
  for (let k = 0; k < 700 && s.scene !== 'end'; k++) {
    const sc = R(s.scene, s)!;
    const x = ctxOf(c, f.family, s, sc.age);
    const o = visibleChoices(sc, x);
    const all = [txt(sc.title, x), ...sc.text(x), ...(sc.msgs?.(x).map((m) => m.t) ?? [])].join(' ');
    if (sc.kind === 'feed') feed++;
    else {
      taps++;
      if (lastTap >= 0) (gaps += sc.age - lastTap, gapN++);
      lastTap = sc.age;
      chars += all.length;
      words += all.split(/\s+/).length;
      opts += o.length;
      const b = sc.age < 12 ? '0-11' : sc.age < 18 ? '12-17' : sc.age < 23 ? '18-22' : sc.age < 30 ? '23-29' : sc.age < 60 ? '30-59' : '60+';
      byAge[b] = (byAge[b] ?? 0) + 1;
      kinds[sc.id.replace(/[@#:].*/, '@')] = (kinds[sc.id.replace(/[@#:].*/, '@')] ?? 0) + 1;
      if (/Hệ Thống|Đinh!|ký chủ|Ký chủ/.test(all + o.map((ch) => txt(ch.t, x)).join(' '))) ht++;
    }
    s = choose(R, c, f.family, s, Math.floor(r() * o.length)).s;
  }
  if (s.flags.includes('cuoi_done')) wed++;
}
console.log({ tapScenesPerLife: Math.round(taps / N), feedPerLife: Math.round(feed / N), charsPerScene: Math.round(chars / taps), wordsPerScene: Math.round(words / taps), optsPerScene: (opts / taps).toFixed(1), heThongScenesPerLife: Math.round(ht / N), weddedPct: Math.round((wed / N) * 100), avgYearsBetweenTaps: (gaps / gapN).toFixed(2) });
console.log(Object.fromEntries(Object.entries(byAge).map(([k, v]) => [k, Math.round(v / N)])));
console.log(Object.entries(kinds).map(([k, v]) => [k, +(v / N).toFixed(1)] as const).sort((a, b) => b[1] - a[1]).slice(0, 25));
