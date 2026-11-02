// Phân bố chỉ số Hiểu biết, Nhan sắc ở tuổi 18 và 40 (chọn ngẫu nhiên)
import { defaultCharacter } from '../lib/character';
import { newStory, rollFate } from '../lib/fate';
import { FIRST_SCENE, resolverOf } from '../lib/scenes';
import { choose, ctxOf, visibleChoices } from '../lib/story';
let seed = 3;
const r = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const at: Record<string, number[]> = {};
for (let i = 0; i < 300; i++) {
  const f = rollFate(r);
  const c = { ...defaultCharacter(f.gender), name: f.name, birthYear: f.birthYear };
  let s = newStory(f, FIRST_SCENE);
  if (process.env.GOAL) s = { ...s, goal: process.env.GOAL as 'hoc' };
  const R = resolverOf(c, f.family);
  const seen = new Set<number>();
  for (let k = 0; k < 700 && s.scene !== 'end'; k++) {
    const sc = R(s.scene, s)!;
    for (const a of [18, 40]) if (sc.age >= a && !seen.has(a)) { seen.add(a); for (const st of ['hoc', 'duyen', 'tien'] as const) (at[`${st}@${a}`] ??= []).push(s.stats[st]); }
    const o = visibleChoices(sc, ctxOf(c, f.family, s, sc.age));
    s = choose(R, c, f.family, s, Math.floor(r() * o.length)).s;
  }
}
for (const [k, v] of Object.entries(at)) {
  v.sort((a, b) => a - b);
  const q = (p: number) => v[Math.floor(p * (v.length - 1))];
  console.log(k, 'p10', q(0.1), 'p50', q(0.5), 'p90', q(0.9), '≥90:', Math.round((v.filter((x) => x >= 90).length / v.length) * 100) + '%');
}
