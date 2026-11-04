'use client';
import { useEffect, useState } from 'react';
import { musicOn, onMusic, setMusic } from '@/lib/cung/music';

/** nút bật/tắt nhạc nền (mặc định tắt) */
export default function MusicButton({ className = '' }: { className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(musicOn());
    return onMusic(setOn);
  }, []);
  return (
    <button type="button" className={`c-music ${className}`} aria-pressed={on} onClick={() => setMusic(!on)} aria-label={on ? 'Tắt nhạc' : 'Bật nhạc'}>
      {on ? 'Nhạc: bật' : 'Nhạc: tắt'}
    </button>
  );
}
