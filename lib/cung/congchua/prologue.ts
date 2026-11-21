/** Phần Công chúa triều trước: lời kể mở màn. */
import type { Life } from '../types';
type Tale = NonNullable<Life['tales']>[number];

export const CC_PROLOGUE: Tale[] = [
  {
    kicker: 'Mười hai năm trước, mùa đông, chùa Lũng Vân',
    t: 'Cái khay',
    s: { bg: 'khay', time: 'dem', cast: [] },
    lines: ['Màn đen. Tiếng gió lùa qua khe cửa gỗ.', 'Một bé gái tám tuổi bưng một cái khay, đi rất chậm. Trên khay có một chén trà còn bốc khói. Cái khay nặng, và tay bé run.', 'Có người đỡ cái khay khỏi tay bé, rồi bảo bé ra ngoài. Bé không nhớ gì thêm. Mười hai năm sau, bé vẫn không uống được trà nóng.'],
  },
];

export const CC_TALES: Record<string, { t: string; lines: string[]; s?: Tale['s'] }> = {};
