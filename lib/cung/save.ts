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
let lastSig = '';
function guestPing(g: Guest) {
  const sb = supabase();
  if (!sb) return;
  const l0 = g.life;
  const sig = `${l0?.origin ?? ''}|${l0?.chapter ?? ''}|${g.meta.cung?.length ?? 0}|${g.meta.cungLives ?? 0}`;
  // tiến độ đổi thì báo sau tối thiểu 2 phút, không đổi thì chỉ báo "còn đó" mỗi 10 phút
  const gap = sig !== lastSig ? 120_000 : 600_000;
  if (Date.now() - lastPing < gap) return;
  lastPing = Date.now();
  lastSig = sig;
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
  let life: Life | null = isLife(d.state) ? migrate(d.state) : null;
  let meta: CMeta = d.meta ?? {};
  // bản lưu chưa kịp gửi lên máy chủ (đóng tab giữa chừng) vẫn là bản mới nhất
  const pl = readPending(PEND_LIFE, p.token);
  if (pl) {
    life = pl.v && isLife(pl.v) ? migrate(pl.v) : null;
    void saveLife(life);
  }
  const pm = readPending(PEND_META, p.token);
  if (pm && pm.v && typeof pm.v === 'object') {
    meta = pm.v as CMeta;
    void saveMeta(meta);
  }
  return { username: d.username, meta, life, guest: false };
}

/**
 * Lưu lên máy chủ theo kiểu "bấm liên tục chỉ lưu lần cuối": mỗi lần bấm chỉ ghi nháp trong máy,
 * máy chủ nhận bản cuối sau khi người chơi dừng tay vài giây, khi qua chương, khi kết thúc đời,
 * hoặc khi ẩn/đóng trang.
 */
const PEND_LIFE = 'cung.pend.life';
const PEND_META = 'cung.pend.meta';
type Pending = { u: string; v: unknown };
function readPending(key: string, token: string): Pending | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const x = JSON.parse(raw) as Pending;
    return x.u === token ? x : null;
  } catch {
    return null;
  }
}
function writePending(key: string, token: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify({ u: token, v } satisfies Pending));
  } catch {
    /* bỏ qua */
  }
}
function clearPending(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* bỏ qua */
  }
}

const LIFE_WAIT = 8000;
const META_WAIT = 2500;
type Slot = { timer: ReturnType<typeof setTimeout> | null; has: boolean; val: unknown; sent: string; busy: Promise<void> | null; rpc: 'cs_save_game' | 'cs_save_meta'; arg: 'p_state' | 'p_meta'; key: string };
const slots: Record<'life' | 'meta', Slot> = {
  life: { timer: null, has: false, val: null, sent: '', busy: null, rpc: 'cs_save_game', arg: 'p_state', key: PEND_LIFE },
  meta: { timer: null, has: false, val: null, sent: '', busy: null, rpc: 'cs_save_meta', arg: 'p_meta', key: PEND_META },
};

async function flushSlot(s: Slot): Promise<void> {
  if (s.timer) {
    clearTimeout(s.timer);
    s.timer = null;
  }
  if (s.busy) await s.busy;
  if (!s.has) return;
  const p = currentPlayer();
  const sb = supabase();
  if (!p || !sb) return;
  const v = s.val;
  s.has = false;
  const json = JSON.stringify(v ?? null);
  if (json === s.sent) {
    if (!s.has) clearPending(s.key);
    return;
  }
  s.busy = (async () => {
    let ok = false;
    try {
      const { error } = await sb.rpc(s.rpc, { p_token: p.token, [s.arg]: v } as never);
      ok = !error;
    } catch {
      ok = false;
    }
    if (ok) {
      s.sent = json;
      if (!s.has) clearPending(s.key);
    } else if (!s.has) {
      // chưa gửi được: giữ nháp, thử lại sau
      s.has = true;
      s.val = v;
      s.timer = setTimeout(() => void flushSlot(s), 20_000);
    }
  })().finally(() => {
    s.busy = null;
  });
  await s.busy;
}

function queue(s: Slot, v: unknown, wait: number) {
  const p = currentPlayer();
  if (!p) return;
  s.has = true;
  s.val = v;
  writePending(s.key, p.token, v);
  if (wait === 0) {
    void flushSlot(s);
    return;
  }
  if (!s.timer) s.timer = setTimeout(() => void flushSlot(s), wait);
}

/** đóng/ẩn trang: gửi nốt bản cuối, dùng keepalive để trình duyệt không hủy giữa chừng */
function flushBeacon() {
  const p = currentPlayer();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!p || !url || !key) return;
  for (const s of [slots.life, slots.meta]) {
    if (!s.has) continue;
    const body = JSON.stringify({ p_token: p.token, [s.arg]: s.val ?? null });
    if (body.length > 60_000) continue; // quá giới hạn keepalive: nháp trong máy sẽ được gửi ở lần mở sau
    try {
      void fetch(`${url}/rest/v1/rpc/${s.rpc}`, { method: 'POST', keepalive: true, headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body });
    } catch {
      /* bỏ qua */
    }
  }
}
let wired = false;
function wire() {
  if (wired || typeof window === 'undefined') return;
  wired = true;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushBeacon();
  });
  window.addEventListener('pagehide', flushBeacon);
}

/** gửi ngay mọi thứ còn chờ (dùng trước khi đăng xuất) */
export async function flushAll(): Promise<void> {
  await flushSlot(slots.life);
  await flushSlot(slots.meta);
}

let lastChapter: number | null | undefined;
export async function saveLife(life: Life | null): Promise<boolean> {
  const p = currentPlayer();
  if (!p || !supabase()) {
    const g = { ...readGuest(), life };
    writeGuest(g);
    guestPing(g);
    return true;
  }
  wire();
  // qua chương, kết thúc đời hoặc bỏ đời: lưu ngay; còn lại chờ người chơi dừng tay
  const now = life ? (life.end ? -1 : life.chapter ?? 0) : null;
  const urgent = life === null || !!life.end || (lastChapter !== undefined && now !== lastChapter);
  lastChapter = now;
  queue(slots.life, life, urgent ? 0 : LIFE_WAIT);
  return true;
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
  wire();
  queue(slots.meta, meta, META_WAIT);
  return true;
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
  await flushAll();
  try {
    localStorage.removeItem(GUEST);
  } catch {
    /* bỏ qua */
  }
}
