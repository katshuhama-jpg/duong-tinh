/** gom tranh và lời dẫn kết cục từ mọi file */
import type { EndArt } from './types';
import { ENDING_ART } from './ending_art';
import { ART_RIVALS_A } from './content/rivals_a';

export const ALL_ART: Record<string, EndArt> = { ...ENDING_ART, ...ART_RIVALS_A };
export const artOf = (id: string): EndArt | undefined => ALL_ART[id];
