/** Kho thẻ phần Con tin họ Nghiêm. */
import type { Card } from '../types';
import { NG_CH1 } from './ch1';
import { NG_CH2 } from './ch2';
import { NG_ZERO } from './zero';
import { NG_CH3 } from './ch3';
import { NG_CH4 } from './ch4';
import { NG_CH5 } from './ch5';
import { NG_CH6 } from './ch6';
import { NG_CH7 } from './ch7';

/** đã viết xong đến chương nào (chương sau đó thì khép đời bằng kết "còn tiếp") */
export const NG_WRITTEN = 3; // tạm khóa chương 4-7 khi đang viết; mở lại thành 7 khi xong
export const NG_CARDS: Card[] = [...NG_CH1, ...NG_CH2, ...NG_CH3, ...NG_CH4, ...NG_CH5, ...NG_CH6, ...NG_CH7, ...NG_ZERO];
export const ngBigsOf = (ch: number) => NG_CARDS.filter((c) => c.big && !c.step && c.chapter.includes(ch));
