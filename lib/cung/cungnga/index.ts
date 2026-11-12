/** Kho thẻ phần Cung nga giặt áo. */
import type { Card } from '../types';
import { CN_CH1 } from './ch1';
import { CN_CH2 } from './ch2';
import { CN_CH3 } from './ch3';
import { CN_CH4 } from './ch4';
import { CN_CH5 } from './ch5';
import { CN_CH6 } from './ch6';
import { CN_CH7 } from './ch7';

/** đã viết xong đến chương nào (chương sau đó thì khép đời bằng kết "còn tiếp") */
export const CN_WRITTEN = 7;
export const CN_CARDS: Card[] = [...CN_CH1, ...CN_CH2, ...CN_CH3, ...CN_CH4, ...CN_CH5, ...CN_CH6, ...CN_CH7];
export const cnBigsOf = (ch: number) => CN_CARDS.filter((c) => c.big && !c.step && c.chapter.includes(ch));
