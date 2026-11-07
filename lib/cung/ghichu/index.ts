import type { GhiChu } from './types';
import { GHICHU_CHE } from './che';
import { GHICHU_NGHIEM } from './nghiem';
export type { GhiChu } from './types';
export const GHICHU: GhiChu[] = [...GHICHU_CHE, ...GHICHU_NGHIEM];
export const ghiChuOf = (id: string) => GHICHU.find((x) => x.id === id) ?? null;
/** tối đa bao nhiêu ghi chú mỗi chương */
export const GHICHU_MAX = 3;
