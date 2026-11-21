/** Kho thẻ phần Công chúa triều trước. */
import type { Card } from '../types';
import { CC_CH1 } from './ch1';
import { CC_CH2 } from './ch2';
import { CC_CH3 } from './ch3';
import { CC_CH4 } from './ch4';
import { CC_CH5 } from './ch5';
import { CC_CH6 } from './ch6';
import { CC_CH7 } from './ch7';
import { CC_CH8 } from './ch8';
import { CC_CH9 } from './ch9';
import { CC_CH10 } from './ch10';

/** đã viết xong đến chương nào (chương sau đó thì khép đời bằng kết mặc định) */
export const CC_WRITTEN = 10;
export const CC_CARDS: Card[] = [...CC_CH1, ...CC_CH2, ...CC_CH3, ...CC_CH4, ...CC_CH5, ...CC_CH6, ...CC_CH7, ...CC_CH8, ...CC_CH9, ...CC_CH10];
export const ccBigsOf = (ch: number) => CC_CARDS.filter((c) => c.big && !c.step && !c.urgent && c.chapter.includes(ch));
