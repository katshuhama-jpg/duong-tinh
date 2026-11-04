'use client';
/**
 * Nhạc nền: mặc định tắt, chỉ tải khi người chơi bật (game cũ từng phải bỏ nhạc vì tải chậm).
 * Mỗi lúc một bài, đổi bài thì nhỏ dần rồi to dần. Bài 5 (chiếu phong) phát một lần rồi trả lại bài đang nghe.
 */
import type { Card, Life } from './types';

export type Track = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
const KEY = 'cung.music';
const VOL = 0.45;

let on = false;
let cur: HTMLAudioElement | null = null;
let curT: Track | null = null;
let want: Track = 1;
const subs = new Set<(v: boolean) => void>();

try {
  on = typeof window !== 'undefined' && localStorage.getItem(KEY) === '1';
} catch {
  on = false;
}

// trình duyệt chặn tự phát nhạc trước lần chạm đầu tiên: chạm lần đầu thì phát lại
if (typeof window !== 'undefined') {
  const kick = () => {
    if (on && cur && cur.paused) void cur.play().catch(() => undefined);
    else if (on && !cur) start(want);
  };
  window.addEventListener('pointerdown', kick, { once: true });
}

export const musicOn = () => on;
export function onMusic(fn: (v: boolean) => void) {
  subs.add(fn);
  return () => void subs.delete(fn);
}

function fade(a: HTMLAudioElement, to: number, ms: number, done?: () => void) {
  const from = a.volume;
  const t0 = performance.now();
  const step = () => {
    const k = Math.min(1, (performance.now() - t0) / ms);
    a.volume = Math.max(0, Math.min(1, from + (to - from) * k));
    if (k < 1) requestAnimationFrame(step);
    else done?.();
  };
  requestAnimationFrame(step);
}

function start(t: Track) {
  const prev = cur;
  const a = new Audio(`/nhac/${t}.mp3`);
  a.loop = t !== 5 && t !== 6 && t !== 10;
  a.volume = 0;
  a.preload = 'auto';
  cur = a;
  curT = t;
  void a.play().catch(() => undefined);
  fade(a, VOL, 1200);
  if (prev) fade(prev, 0, 900, () => prev.pause());
}

/** đặt bài cho cảnh hiện tại (bật nhạc thì đổi ngay) */
export function playTrack(t: Track) {
  want = t;
  if (on && curT !== t) start(t);
}

/** phát chiếu phong một lần (khoảng 9 giây) rồi về bài cũ */
export function fanfare() {
  if (!on) return;
  const back = want;
  start(5);
  setTimeout(() => {
    if (curT === 5) start(back);
  }, 9000);
}

export function setMusic(v: boolean) {
  on = v;
  try {
    localStorage.setItem(KEY, v ? '1' : '0');
  } catch {
    /* bỏ qua */
  }
  if (v) start(want);
  else if (cur) {
    const a = cur;
    fade(a, 0, 500, () => a.pause());
    cur = null;
    curT = null;
  }
  subs.forEach((f) => f(v));
}

/** chọn bài theo thẻ đang hiện */
export function trackFor(card: Card | null, life: Life | null): Track {
  if (!life) return 1;
  if (!card) return 2;
  const txt = `${card.title} ${card.text.join(' ')}`.toLowerCase();
  if (/binh biến|giặc|đuốc|quân|cửa tây|đánh/.test(txt) && (card.time === 'dem' || card.big)) return 7;
  if (card.place === 'chua') return 9;
  if (card.place === 'lang') return 8;
  if (card.cast.includes('vua') && card.time === 'dem') return 4;
  if (card.omen || /độc|vu |trâm|thuốc|chè hạt sen|án |giếng|máu/.test(txt)) return 3;
  if (life.chapter >= 7) return 10;
  return 2;
}
