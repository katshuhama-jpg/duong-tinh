'use client';
/**
 * Nhạc nền: mặc định bật, bắt đầu ở lần chạm đầu tiên (trình duyệt cấm tự phát trước đó).
 * Điện thoại (nhất là iPhone) chỉ cho phát trên thẻ audio đã được "mở khóa" bằng một lần chạm,
 * nên dùng cố định hai thẻ audio, mở khóa cả hai ở lần chạm đầu, rồi luân phiên đổi src để chuyển bài.
 * Bài 5 (chiếu phong) phát khoảng 9 giây rồi trả lại bài đang nghe.
 */
import type { Card, Life } from './types';

export type Track = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
const KEY = 'cung.music';
const VOL = 0.45;

let on = true;
let unlocked = false;
let els: HTMLAudioElement[] = [];
let idx = 0;
let curT: Track | null = null;
let want: Track = 1;
const subs = new Set<(v: boolean) => void>();

try {
  on = typeof window === 'undefined' || localStorage.getItem(KEY) !== '0';
} catch {
  on = true;
}

const src = (t: Track) => `/nhac/${t}.mp3`;

function ensure() {
  if (!els.length && typeof Audio !== 'undefined') {
    els = [new Audio(), new Audio()];
    els.forEach((a) => {
      a.preload = 'none';
      a.setAttribute('playsinline', '');
    });
  }
  return els;
}

/** gọi trong sự kiện chạm: mở khóa cả hai thẻ audio */
function unlock() {
  if (unlocked) return;
  const [a, b] = ensure();
  if (!a) return;
  unlocked = true;
  // thẻ phụ: phát câm rồi dừng ngay, chỉ để trình duyệt ghi nhận
  b.src = src(want);
  b.muted = true;
  void b
    .play()
    .then(() => {
      b.pause();
      b.muted = false;
    })
    .catch(() => {
      b.muted = false;
    });
  if (on) start(want, true);
  else {
    a.src = src(want);
    a.muted = true;
    void a
      .play()
      .then(() => {
        a.pause();
        a.muted = false;
      })
      .catch(() => {
        a.muted = false;
      });
  }
}

if (typeof window !== 'undefined') {
  // trình duyệt chỉ tính các sự kiện này là "người dùng chạm" (pointerdown trên cảm ứng không tính)
  const evs = ['pointerup', 'touchend', 'click', 'keydown'] as const;
  const kick = () => {
    unlock();
    if (unlocked) evs.forEach((e) => window.removeEventListener(e, kick, true));
  };
  evs.forEach((e) => window.addEventListener(e, kick, true));
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
    try {
      a.volume = Math.max(0, Math.min(1, from + (to - from) * k));
    } catch {
      /* iPhone không cho chỉnh âm lượng: bỏ qua */
    }
    if (k < 1) requestAnimationFrame(step);
    else done?.();
  };
  requestAnimationFrame(step);
}

function start(t: Track, first = false) {
  const list = ensure();
  if (!list.length || !unlocked) return;
  const prev = curT === null ? null : list[idx];
  if (!first) idx = curT === null ? idx : 1 - idx;
  const a = list[idx];
  a.pause();
  a.src = src(t);
  a.loop = t !== 5 && t !== 6 && t !== 10;
  a.preload = 'auto';
  a.muted = false;
  a.volume = 0;
  curT = t;
  void a.play().catch(() => undefined);
  fade(a, VOL, 1200);
  if (prev && prev !== a) fade(prev, 0, 900, () => prev.pause());
}

/** đặt bài cho cảnh hiện tại (đang bật thì đổi ngay) */
export function playTrack(t: Track) {
  want = t;
  if (on && curT !== t) start(t);
}

/** phát chiếu phong một lần (khoảng 9 giây) rồi về bài cũ */
export function fanfare() {
  if (!on || !unlocked) return;
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
  if (v) {
    if (!unlocked) unlock();
    else if (curT !== want) start(want);
    else void ensure()[idx]?.play().catch(() => undefined);
  } else {
    const a = ensure()[idx];
    if (a) fade(a, 0, 400, () => a.pause());
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
