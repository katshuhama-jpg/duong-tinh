/** Kho thẻ phần Con tin họ Nghiêm. */
import type { Card } from '../types';
import { NG_CH1 } from './ch1';
import { NG_CH2 } from './ch2';
import { NG_ZERO } from './zero';

/** đã viết xong đến chương nào (chương sau đó thì khép đời bằng kết "còn tiếp") */
export const NG_WRITTEN = 2;
export const NG_CARDS: Card[] = [...NG_CH1, ...NG_CH2, ...NG_ZERO];
export const ngBigsOf = (ch: number) => NG_CARDS.filter((c) => c.big && !c.step && c.chapter.includes(ch));
