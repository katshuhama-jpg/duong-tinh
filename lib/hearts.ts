/**
 * Mỗi đời, mỗi người một lòng: có người để ý mình, có người không; có người tốt, có người xấu.
 * Cố định theo đời (seed), để chơi lại thì khác.
 */
import type { LoveId, StoryCore } from './story';

function h(s: string) {
  let v = 2166136261;
  for (let i = 0; i < s.length; i++) v = Math.imul(v ^ s.charCodeAt(i), 16777619);
  v ^= v >>> 15;
  v = Math.imul(v, 0x2c1b3c6d);
  v ^= v >>> 12;
  return v >>> 0;
}
export type Interest = 'thich' | 'thuong' | 'khong';
/** người ấy có để ý mình không (35% để ý, 40% bình thường, 25% không mấy để ý) */
export function interestOf(s: Pick<StoryCore, 'seed'>, id: LoveId): Interest {
  const r = h(`i|${s.seed ?? 0}|${id}`) % 100;
  return r < 35 ? 'thich' : r < 75 ? 'thuong' : 'khong';
}
export const INTEREST_TEXT: Record<Interest, string> = { thich: 'Có vẻ để ý bạn', thuong: 'Bình thường', khong: 'Không mấy để ý bạn' };
/** cộng vào khả năng nhận lời tỏ tình/cầu hôn (điểm tình cảm quy đổi) */
export const interestBonus = (s: Pick<StoryCore, 'seed'>, id: LoveId) => ({ thich: 10, thuong: 0, khong: -15 })[interestOf(s, id)];
/** tình cảm ban đầu khi mới gặp */
export const interestStart = (s: Pick<StoryCore, 'seed'>, id: LoveId) => ({ thich: 8, thuong: 0, khong: -6 })[interestOf(s, id)];

/** bản chất thật, chỉ lộ ra sau một thời gian: khoảng một phần ba là người không tốt */
export type Nature = 'tot' | 'xau';
export const natureOf = (s: Pick<StoryCore, 'seed'>, id: LoveId): Nature => (h(`n|${s.seed ?? 0}|${id}`) % 100 < 33 ? 'xau' : 'tot');
/** người xấu thì xấu kiểu gì */
export type Bad = 'doi' | 'tien' | 'baoluc' | 'hai';
export const badOf = (s: Pick<StoryCore, 'seed'>, id: LoveId): Bad => (['doi', 'tien', 'baoluc', 'hai'] as const)[h(`b|${s.seed ?? 0}|${id}`) % 4];
