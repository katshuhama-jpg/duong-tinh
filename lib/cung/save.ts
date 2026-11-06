'use client';
import { migrate } from './engine';
/**
 * Lưu đời đang chơi và sổ kết cục. Chơi thử: lưu trong trình duyệt. Có tài khoản: lưu lên Supabase
 * (dùng chung bảng và hàm cs_* với tài khoản cũ; bản lưu của game cũ bị bỏ qua).
 */
import { currentPlayer, dropSession } from '../auth';
import { supabase } from '../supabase';
import type { Life } from './types';

export interface CMeta {
  /** kết cục đã mở */
  cung?: string[];
  /** số đời đã sống xong */
  cungLives?: number;
  [k: string]: unknown;
}

const GUEST = 'cung.guest';
type Guest = { meta: CMeta; life: Life | null };
function readGuest(): Guest {
  try {
    const raw = localStorage.getItem(GUEST);
    if (raw) return JSON.parse(raw) as Guest;
  } catch {
    /* bỏ qua */
  }
  return { meta: {}, life: null };
}
function writeGuest(g: Guest) {
  try {
    localStorage.setItem(GUEST, JSON.stringify(g));
  } catch {
    /* bỏ qua */
  }
}
/** đếm lượt chơi khách: mã ngẫu nhiên trong máy, chương, số kết cục. Không có thông tin cá nhân */
let lastPing = 0;
function guestPing(g: Guest) {
  const sb = supabase();
  if (!sb || Date.now() - lastPing < 60_000) return;
  lastPing = Date.now();
  let id = '';
  try {
    id = localStorage.getItem('cung.gid') ?? '';
    if (!id) {
      id = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).replace(/[^a-z0-9-]/gi, '');
      localStorage.setItem('cung.gid', id);
    }
  } catch {
    return;
  }
  const l = g.life;
  const info = { origin: l?.origin ?? null, chapter: l?.chapter ?? null, age: l ? Math.floor(l.age) : null, endings: g.meta.cung?.length ?? 0, lives: g.meta.cungLives ?? 0, mobile: /Mobi|iPhone|Android/i.test(navigator.userAgent) };
  sb.rpc('cs_guest_ping', { p_id: id, p_info: info }).then(
    () => undefined,
    () => undefined,
  );
}
const isLife = (x: unknown): x is Life => !!x && typeof x === 'object' && (x as Life).v === 'cung1';

export async function loadMe(): Promise<{ username: string; meta: CMeta; life: Life | null; guest: boolean } | null> {
  const p = currentPlayer();
  const sb = supabase();
  if (!p || !sb) {
    const g = readGuest();
    guestPing(g);
    return { username: 'Khách', meta: g.meta, life: isLife(g.life) ? migrate(g.life) : null, guest: true };
  }
  const { data, error } = await sb.rpc('cs_me', { p_token: p.token });
  if (error) return null;
  if (!data) {
    dropSession();
    return null;
  }
  const d = data as { username: string; meta: CMeta | null; state: unknown };
  return { username: d.username, meta: d.meta ?? {}, life: isLife(d.state) ? migrate(d.state) : null, guest: false };
}

let inflight: Promise<boolean> | null = null;
let queued: Life | null | undefined;
async function send(life: Life | null) {
  const p = currentPlayer();
  const sb = supabase();
  if (!p || !sb) return false;
  try {
    const { error } = await sb.rpc('cs_save_game', { p_token: p.token, p_state: life });
    return !error;
  } catch {
    return false;
  }
}
export async function saveLife(life: Life | null): Promise<boolean> {
  const p = currentPlayer();
  if (!p || !supabase()) {
    const g = { ...readGuest(), life };
    writeGuest(g);
    guestPing(g);
    return true;
  }
  if (inflight) {
    queued = life;
    return inflight.then(() => true);
  }
  inflight = (async () => {
    let ok = await send(life);
    while (queued !== undefined) {
      const q = queued;
      queued = undefined;
      ok = await send(q);
    }
    return ok;
  })();
  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export async function saveMeta(meta: CMeta): Promise<boolean> {
  const p = currentPlayer();
  const sb = supabase();
  if (!p || !sb) {
    const g = { ...readGuest(), meta };
    writeGuest(g);
    guestPing(g);
    return true;
  }
  const { error } = await sb.rpc('cs_save_meta', { p_token: p.token, p_meta: meta });
  return !error;
}

/** sau khi đăng nhập: chuyển đời đang chơi thử vào tài khoản */
export async function migrateGuest() {
  const g = readGuest();
  if (!g.life && !g.meta.cung?.length) return;
  const me = await loadMe();
  if (!me || me.guest) return;
  if (g.life && !me.life) await saveLife(g.life);
  const cung = Array.from(new Set([...(me.meta.cung ?? []), ...(g.meta.cung ?? [])]));
  await saveMeta({ ...me.meta, cung, cungLives: (me.meta.cungLives ?? 0) + (g.meta.cungLives ?? 0) });
  try {
    localStorage.removeItem(GUEST);
  } catch {
    /* bỏ qua */
  }
}
