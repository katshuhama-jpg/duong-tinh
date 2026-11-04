'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn, signUp } from '@/lib/auth';
import { migrateGuest } from '@/lib/cung/save';
import { useAuth } from '@/lib/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { enabled } = useAuth();
  const [mode, setMode] = useState<'in' | 'up'>('up');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const err = mode === 'in' ? await signIn(username, password) : await signUp(username, password);
    if (err) {
      setBusy(false);
      setError(err);
      return;
    }
    // đang chơi thử thì mang đời đó vào tài khoản
    await migrateGuest();
    const next = new URLSearchParams(window.location.search).get('next');
    router.push(next && next.startsWith('/') ? next : '/');
  }

  return (
    <main className="c-app">
      <div className="c-band" aria-hidden="true" />
      <form className="c-page" onSubmit={submit}>
        <Link href="/" className="c-note">
          ‹ Về trang đầu
        </Link>
        <h1 className="c-title" style={{ fontSize: 28 }}>
          {mode === 'in' ? 'Đăng nhập' : 'Tạo tài khoản'}
        </h1>
        <div className="c-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={mode === 'up'} onClick={() => setMode('up')}>
            Tạo tài khoản
          </button>
          <button type="button" role="tab" aria-selected={mode === 'in'} onClick={() => setMode('in')}>
            Đăng nhập
          </button>
        </div>
        {!enabled && <p className="c-err">Chưa kết nối được máy chủ, thử lại sau ít phút.</p>}
        <p className="c-note">Có tài khoản thì đời đang sống và sổ kết cục được lưu lại, đổi máy vẫn chơi tiếp được.</p>
        <label className="c-field">
          Tên đăng nhập
          <input value={username} onChange={(e) => setUsername(e.target.value.toLowerCase())} autoComplete="username" autoCapitalize="none" spellCheck={false} maxLength={16} placeholder="vd: abc123" required />
          <small>3-16 ký tự: chữ thường không dấu, số, dấu _</small>
        </label>
        <label className="c-field">
          Mật khẩu
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'in' ? 'current-password' : 'new-password'} maxLength={6} required />
          <small>3-6 ký tự</small>
        </label>
        {error && (
          <p className="c-err" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="c-btn" disabled={busy || !enabled}>
          {busy ? 'Đang vào...' : mode === 'in' ? 'Vào cung' : 'Tạo và vào cung'}
        </button>
      </form>
    </main>
  );
}
