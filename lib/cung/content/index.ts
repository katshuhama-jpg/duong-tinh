import type { Card } from '../types';
import { BIG } from './big';
import { ROUTES_CN } from './routesCN';
import { ROUTES_VN } from './routesVN';
import { ORIGIN_CHUA } from './origin_chua';
import { ORIGIN_CUNG } from './origin_cung';
import { ORIGIN_DAN } from './origin_dan';
import { ORIGIN_QUAN } from './origin_quan';
import { DEEP_ARCS } from './deep_arcs';
import { DEEP_EVENTS } from './deep_events';
import { CARDS_A } from './smallA';
import { CARDS_B } from './smallB';
import { FEUD } from './feud';

const ROUTES = [...DEEP_ARCS, ...DEEP_EVENTS, ...ORIGIN_DAN, ...ORIGIN_QUAN, ...ORIGIN_CUNG, ...ORIGIN_CHUA, ...ROUTES_VN, ...ROUTES_CN, ...FEUD];
/** thẻ nhỏ của mọi chặng (gồm cả thẻ mồi của các tuyến phụ) */
export const SMALL: Card[] = [...CARDS_A, ...CARDS_B, ...ROUTES.filter((c) => !c.big)];

/** ngã rẽ lớn theo đúng thứ tự trong từng chặng: tuyến phụ chen sau/trước ngã rẽ gốc được chỉ định */
export function bigsOf(ch: number): Card[] {
  const list = BIG.filter((c) => c.chapter.includes(ch));
  for (const r of ROUTES.filter((c) => c.big && c.chapter.includes(ch))) {
    const ref = r.after ?? r.before;
    const i = ref ? list.findIndex((c) => c.id === ref) : -1;
    if (i < 0) list.push(r);
    else list.splice(r.after ? i + 1 : i, 0, r);
  }
  return list;
}
export const ALL_BIG: Card[] = [...BIG, ...ROUTES.filter((c) => c.big)];
