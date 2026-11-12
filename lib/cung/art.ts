/** gom tranh và lời dẫn kết cục từ mọi file */
import type { EndArt } from './types';
import { ENDING_ART } from './ending_art';
import { CN_ART } from './cungnga/endings';
import { ART_RIVALS_A } from './content/rivals_a';
import { BRANCH_A_ART } from './content/branch_a_art';
import { BRANCH_B_ART } from './content/branch_b_art';
import { RIVALS_C_ART } from './content/rivals_c_art';
import { FACTION_TP_ART } from './content/faction_tp';
import { FACTION_HAU_ART } from './content/faction_hau';
import { FACTION_HP_ART } from './content/faction_hp';

export const ALL_ART: Record<string, EndArt> = { ...CN_ART, ...ENDING_ART, ...ART_RIVALS_A, ...BRANCH_A_ART, ...BRANCH_B_ART, ...RIVALS_C_ART, ...FACTION_TP_ART, ...FACTION_HAU_ART, ...FACTION_HP_ART };
export const artOf = (id: string): EndArt | undefined => ALL_ART[id];
