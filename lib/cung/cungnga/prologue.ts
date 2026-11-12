/** Phần Cung nga giặt áo: lời kể mở màn và lời kể trước các cảnh lớn. */
import type { Life } from '../types';
import { CN_TALES_CH1 } from './ch1';
type Tale = NonNullable<Life['tales']>[number];

export const CN_PROLOGUE: Tale[] = [
  {
    kicker: 'Hưng Bình năm thứ ba, năm Tân Dậu',
    t: 'Chiếc áo',
    s: { bg: 'sangiat', time: 'dem', cast: [], prop: 'vochau' },
    lines: ['Màn đen. Tiếng nước vỗ vào thành chậu.', 'Một bàn tay đang vò một chiếc áo trẻ con. Vò rất lâu, rất kỹ.', 'Có một chiếc áo, người ta giặt nó nhiều năm. Không ai nhớ bàn tay ấy là của ai.'],
  },
];

export const CN_TALES: Record<string, { t: string; lines: string[]; s?: Tale['s'] }> = {
  ...CN_TALES_CH1,
};
