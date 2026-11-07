import type { GhiChu } from './types';
import { GHICHU_CHE } from './che';
import { GHICHU_NGHIEM } from './nghiem';
export type { GhiChu } from './types';
/** ghi chú phần Nghiêm đang viết: tạm tắt trong game, bật khi chạy thử với NG_ALL=1 */
const NG_ON = typeof process !== 'undefined' && !!process.env?.NG_ALL;
export const GHICHU: GhiChu[] = [...GHICHU_CHE, ...(NG_ON ? GHICHU_NGHIEM : [])];
export const ghiChuOf = (id: string) => GHICHU.find((x) => x.id === id) ?? null;
/** tối đa bao nhiêu ghi chú mỗi chương */
export const GHICHU_MAX = 3;
