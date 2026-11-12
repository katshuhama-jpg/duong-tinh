'use client';
/** Sổ kết cục: kết đã mở, những cách chết, cây số phận. Lọc theo thân phận (cô gái chè / họ Nghiêm). */
import { useEffect, useState } from 'react';
import { FateTree, type TreePath } from '@/components/cung/Tree';
import { ALL_ENDINGS, CN_ENDINGS, NGHIEM_ENDINGS } from '@/lib/cung/world';
import { ENDING_TIER } from '@/lib/cung/ending_tier';
import type { CMeta } from '@/lib/cung/save';

export type EndPart = 'che' | 'nghiem' | 'cungnga';
const tierOf = (e: { id: string; tier?: number }) => e.tier ?? ENDING_TIER[e.id] ?? 40;
export const partOfOrigin = (o?: string): EndPart => (o === 'quan' ? 'nghiem' : o === 'cung' ? 'cungnga' : 'che');

export default function EndBook({ meta, part: fixed, showTree = true }: { meta: CMeta; part?: EndPart; showTree?: boolean }) {
  const [tab, setTab] = useState<'song' | 'chet' | 'cay'>('song');
  const [pick, setPick] = useState<EndPart>('che');
  const part = fixed ?? pick;
  const got = new Set(meta.cung ?? []);
  const ALLE = part === 'cungnga' ? CN_ENDINGS.filter((e) => e.id !== 'cn_tiep') : part === 'nghiem' ? NGHIEM_ENDINGS.filter((e) => e.id !== 'n_tiep') : ALL_ENDINGS;
  const gotN = ALLE.filter((e) => got.has(e.id)).length;
  const list = ALLE.filter((e) => (tab === 'chet' ? e.dead : !e.dead)).sort((a, b) => tierOf(b) - tierOf(a));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {!fixed && (
        <div className="c-tabs" role="tablist" aria-label="Phần chơi">
          <button type="button" role="tab" aria-selected={part === 'che'} onClick={() => setPick('che')}>
            Cô gái chè
          </button>
          <button type="button" role="tab" aria-selected={part === 'nghiem'} onClick={() => setPick('nghiem')}>
            Con tin họ Nghiêm
          </button>
          <button type="button" role="tab" aria-selected={part === 'cungnga'} onClick={() => setPick('cungnga')}>
            Cung nga giặt áo
          </button>
        </div>
      )}
      <p className="c-note" style={{ margin: 0, textAlign: 'center' }}>
        {gotN}/{ALLE.length} kết cục của phần này đã mở
      </p>
      <div className="c-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === 'song'} onClick={() => setTab('song')}>
          Những đời sống
        </button>
        <button type="button" role="tab" aria-selected={tab === 'chet'} onClick={() => setTab('chet')}>
          Những cách chết
        </button>
        {showTree && (
          <button type="button" role="tab" aria-selected={tab === 'cay'} onClick={() => setTab('cay')}>
            Cây số phận
          </button>
        )}
      </div>
      {tab === 'cay' && showTree ? (
        <div className="c-treebox">
          <p className="c-note" style={{ margin: 0 }}>
            Mỗi nhánh là một chuỗi ngã rẽ bạn đã chọn, cuối nhánh là kết cục nó dẫn tới. Trong lúc chơi, mở Sổ hậu cung để quay lại một ngã rẽ và chọn khác.
          </p>
          <FateTree paths={((meta.tree as TreePath[] | undefined) ?? []).filter((x) => (part === 'cungnga' ? x.o === 'cung' : part === 'nghiem' ? x.o === 'quan' : (x.o ?? 'dan') === 'dan'))} life={null} />
        </div>
      ) : (
        <ul className="c-ends" style={{ margin: 0, padding: 0 }}>
          {list.map((e) => (
            <li key={e.id} className={got.has(e.id) ? '' : 'locked'}>
              <b>{got.has(e.id) ? e.name : '???'}</b>
              {got.has(e.id) ? e.desc : 'Chưa mở. Thử một đời khác.'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
