/** gom tranh và lời dẫn kết cục từ mọi file */
import type { EndArt } from './types';
import { ENDING_ART } from './ending_art';
import { ART_RIVALS_A } from './content/rivals_a';
import { BRANCH_A_ART } from './content/branch_a_art';
import { BRANCH_B_ART } from './content/branch_b_art';
import { RIVALS_C_ART } from './content/rivals_c_art';

export const ALL_ART: Record<string, EndArt> = { ...ENDING_ART, ...ART_RIVALS_A, ...BRANCH_A_ART, ...BRANCH_B_ART, ...RIVALS_C_ART };
export const artOf = (id: string): EndArt | undefined => ALL_ART[id];
