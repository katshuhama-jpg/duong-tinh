'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MusicMini } from '@/components/cung/TopBar';
import EndBook from '@/components/cung/EndBook';
import Scene, { lookOf } from '@/components/cung/Scene';
import { playTrack } from '@/lib/cung/music';
import { signOut } from '@/lib/auth';
import { flushAll, loadMe, type CMeta } from '@/lib/cung/save';
import type { Life } from '@/lib/cung/types';
import { useAuth } from '@/lib/useAuth';

export default function Home() {
  const { user, ready } = useAuth();
  const [me, setMe] = useState<{ meta: CMeta; life: Life | null } | null>(null);
  useEffect(() => playTrack(1), []);
  useEffect(() => {
    if (!ready) return;
    loadMe().then((m) => setMe(m ? { meta: m.meta, life: m.life } : { meta: {}, life: null }));
  }, [ready, user]);
  const got = new Set(me?.meta.cung ?? []);

  return (
    <main className="c-app">
      <div className="c-band" aria-hidden="true" />
      <header className="c-nav">
        <div className="c-top-row">
          <span className="c-top-title">Trang đầu</span>
          <MusicMini />
        </div>
      </header>
      <div className="c-page">
        <p className="c-sub">Triều Khánh Vân · Phượng Thành</p>
        <h1 className="c-title c-brand">Chín Bậc Phượng</h1>
        <Scene bgImg="/bg/vien/dem.webp" imgs={{ me: { dir: '/nv/me2', face: 'r' }, hanh: { dir: '/nv/hanh', face: 'l' } }} place="vien" time="dem" cast={['me', 'hanh']} looks={{ me: lookOf('me', { robe: '#a8281d' }) }} label="Đêm ở sân viện, cô gái áo đỏ đứng dưới đèn lồng, thị nữ đứng bên" />
        <p className="c-prose">
          Mỗi thân phận là một câu chuyện riêng: gái làng chè được vua để mắt, và con gái nhà họ Nghiêm vào cung thay chỗ người chị đã chết. Cung nga giặt áo và nhà chùa đang được viết. Chín bậc hậu cung, một ngai vàng, và những chén trà không biết có độc hay không.
        </p>
        <div className="c-row">
          <Link className="c-btn" href="/choi?chon=1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            Tiếp tục
          </Link>
        </div>
        <div className="c-row">
          {user ? (
            <button type="button" className="c-btn ghost" onClick={() => flushAll().then(() => signOut()).then(() => setMe(null))}>
              {user.username} · Đăng xuất
            </button>
          ) : (
            <Link className="c-btn ghost" href="/dang-nhap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              Đăng nhập để lưu đời đang sống
            </Link>
          )}
        </div>

        <details className="c-book-fold">
          <summary>
            <span>Sổ kết cục</span>
            <b>
              {got.size} kết cục đã mở
            </b>
            <small>Bấm để xem những đời đã sống, những cách chết và cây số phận</small>
          </summary>
        <section aria-label="Sổ kết cục" style={{ marginTop: 10 }}>
          <EndBook meta={me?.meta ?? {}} />
        </section>
        </details>
        <p className="c-note" style={{ textAlign: 'center' }}>
          Triều đại, nhân vật, tên cung điện đều hư cấu. Khung chín bậc, lương bổng, lễ nghi mô phỏng hậu cung nhà Nguyễn.
        </p>
      </div>
    </main>
  );
}
