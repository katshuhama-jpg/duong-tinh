'use client';
/**
 * Cây số phận: các ngã rẽ của đời đang sống (bấm để quay lại chọn lại),
 * và cây gộp mọi đời đã sống, mỗi nhánh dẫn tới kết cục đã mở.
 */
import { useState } from 'react';
import { cardOf } from '@/lib/cung/engine';
import { fillText } from '@/lib/cung/origins';
import type { Life } from '@/lib/cung/types';
import { endingOf } from '@/lib/cung/world';

export interface TreePath {
  /** "idThẻ.lựaChọn" theo thứ tự */
  p: string[];
  e: string;
  o?: string;
}

interface Edge {
  next: Map<string, Node>;
  ends: Set<string>;
}
interface Node {
  card: string;
  edges: Map<number, Edge>;
}

function build(paths: TreePath[]) {
  const root: Edge = { next: new Map(), ends: new Set() };
  for (const { p, e } of paths) {
    let at = root;
    for (const step of p) {
      const dot = step.lastIndexOf('.');
      const id = step.slice(0, dot);
      const pick = Number(step.slice(dot + 1));
      let n = at.next.get(id);
      if (!n) at.next.set(id, (n = { card: id, edges: new Map() }));
      let ed = n.edges.get(pick);
      if (!ed) n.edges.set(pick, (ed = { next: new Map(), ends: new Set() }));
      at = ed;
    }
    at.ends.add(e);
  }
  return root;
}

const count = (ed: Edge): number => ed.ends.size + [...ed.next.values()].reduce((a, n) => a + [...n.edges.values()].reduce((b, x) => b + count(x), 0), 0);

function Ends({ ends, origin }: { ends: Set<string>; origin?: string }) {
  if (!ends.size) return null;
  return (
    <span className="c-tree-ends">
      {[...ends].map((id) => {
        const e = endingOf(id);
        return (
          <em key={id} className={e?.dead ? 'dead' : ''}>
            {e ? fillText(e.name, origin) : id}
          </em>
        );
      })}
    </span>
  );
}

function Branch({ ed, cur, depth, origin }: { ed: Edge; cur: string[]; depth: number; origin?: string }) {
  if (!ed.next.size) return null;
  return (
    <ul className="c-tree">
      {[...ed.next.values()].map((n) => {
        const c = cardOf(n.card);
        const onPath = cur[depth]?.startsWith(`${n.card}.`);
        return (
          <li key={n.card} className={onPath ? 'on' : ''}>
            <details open={onPath || depth < 1}>
              <summary>
                <b>{c ? fillText(c.title, origin) : n.card}</b>
                <small>{count({ next: new Map([[n.card, n]]), ends: new Set() })} kết cục</small>
              </summary>
              <ul className="c-tree c-tree-picks">
                {[...n.edges.entries()].map(([pick, sub]) => {
                  const here = cur[depth] === `${n.card}.${pick}`;
                  return (
                    <li key={pick} className={here ? 'on' : ''}>
                      <span className="c-tree-pick">{c?.choices[pick] ? fillText(c.choices[pick].t, origin) : `Lựa chọn ${pick + 1}`}</span>
                      <Ends ends={sub.ends} origin={origin} />
                      <Branch ed={sub} cur={here ? cur : []} depth={depth + 1} origin={origin} />
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
        );
      })}
    </ul>
  );
}

/** các ngã rẽ của đời này, bấm để chọn lại */
export function LifeMarks({ life, onRewind }: { life: Life; onRewind: (i: number) => void }) {
  const [arm, setArm] = useState<number | null>(null);
  const marks = life.marks ?? [];
  if (!marks.length) return <p className="c-note">Chưa qua ngã rẽ nào. Mỗi ngã rẽ lớn và mỗi sự kiện nhiều hồi sẽ được ghi ở đây để bạn quay lại chọn khác.</p>;
  return (
    <ol className="c-marks">
      {marks.map((m, i) => {
        const c = cardOf(m.card);
        return (
          <li key={i}>
            <div>
              <b>
                {Math.floor(m.age)} tuổi · {c ? fillText(c.title, life.origin) : m.card}
              </b>
              <span>Đã chọn: {c?.choices[m.pick] ? fillText(c.choices[m.pick].t, life.origin) : '...'}</span>
            </div>
            <button type="button" className={arm === i ? 'arm' : ''} onClick={() => (arm === i ? onRewind(i) : setArm(i))}>
              {arm === i ? 'Bấm lần nữa để quay lại' : 'Chọn lại'}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/** cây gộp mọi đời: nhánh nào đã dẫn tới kết cục nào */
export function FateTree({ paths, life }: { paths: TreePath[]; life: Life | null }) {
  const cur = (life?.marks ?? []).map((m) => `${m.card}.${m.pick}`);
  const mine = paths.filter((x) => !life?.origin || (x.o ?? 'dan') === life.origin);
  if (!mine.length) return <p className="c-note">Cây còn trống. Sống hết một đời, nhánh đầu tiên sẽ mọc ở đây.</p>;
  const root = build(mine);
  return (
    <div className="c-fate">
      <Ends ends={root.ends} origin={life?.origin} />
      <Branch ed={root} cur={cur} depth={0} origin={life?.origin} />
    </div>
  );
}
