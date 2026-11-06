'use client';
/**
 * Thanh trên cùng cho các màn trước khi vào đời: nút lùi, tên màn kèm bước, nhạc.
 * Người chơi luôn biết mình đang ở đâu và quay về đâu.
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { musicOn, onMusic, setMusic } from '@/lib/cung/music';

export function MusicMini() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(musicOn());
    return onMusic(setOn);
  }, []);
  return (
    <button type="button" className="c-top-music" aria-pressed={on} onClick={() => setMusic(!on)} aria-label={on ? 'Tắt nhạc' : 'Bật nhạc'}>
      {on ? 'Nhạc bật' : 'Nhạc tắt'}
    </button>
  );
}

export default function TopBar({ back, title, step, total }: { back?: { label: string; href?: string; onClick?: () => void }; title: string; step?: number; total?: number }) {
  return (
    <header className="c-nav">
      <div className="c-top-row">
        {back ? (
          back.href ? (
            <Link href={back.href} className="c-top-back">
              ‹ {back.label}
            </Link>
          ) : (
            <button type="button" className="c-top-back" onClick={back.onClick}>
              ‹ {back.label}
            </button>
          )
        ) : (
          <span className="c-top-back" aria-hidden="true" />
        )}
        <MusicMini />
      </div>
      <div className="c-top-head">
        <span className="c-top-title">{title}</span>
        {step != null && total != null && (
          <span className="c-steps" aria-label={`Bước ${step} trên ${total}`}>
            {Array.from({ length: total }, (_, i) => (
              <i key={i} className={i < step ? 'on' : ''} />
            ))}
            <small>
              Bước {step}/{total}
            </small>
          </span>
        )}
      </div>
    </header>
  );
}
