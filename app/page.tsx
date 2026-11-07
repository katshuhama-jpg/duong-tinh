'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MusicMini } from '@/components/cung/TopBar';
import { FateTree, type TreePath } from '@/components/cung/Tree';
import Scene, { lookOf } from '@/components/cung/Scene';
import { playTrack } from '@/lib/cung/music';
import { signOut } from '@/lib/auth';
import { rankOf } from '@/lib/cung/engine';
import { originOf } from '@/lib/cung/origins';
import { loadMe, type CMeta } from '@/lib/cung/save';
import type { Life } from '@/lib/cung/types';
import { ALL_ENDINGS as ENDINGS, NGHIEM_ENDINGS } from '@/lib/cung/world';
import { ENDING_TIER } from '@/lib/cung/ending_tier';

const tierOf = (e: { id: string; tier?: number }) => e.tier ?? ENDING_TIER[e.id] ?? 40;
import { useAuth } from '@/lib/useAuth';

export default function Home() {
  const { user, ready } = useAuth();
  const [me, setMe] = useState<{ meta: CMeta; life: Life | null } | null>(null);
  const [tab, setTab] = useState<'song' | 'chet' | 'cay'>('song');
  const [part, setPart] = useState<'che' | 'nghiem'>('che');
  useEffect(() => playTrack(1), []);
  useEffect(() => {
    if (!ready) return;
    loadMe().then((m) => setMe(m ? { meta: m.meta, life: m.life } : { meta: {}, life: null }));
  }, [ready, user]);
  const got = new Set(me?.meta.cung ?? []);
  const live = me?.life && !me.life.end ? me.life : null;
  const ALLE = part === 'nghiem' ? NGHIEM_ENDINGS.filter((e) => e.id !== 'n_tiep') : ENDINGS;
  const gotN = ALLE.filter((e) => got.has(e.id)).length;
  const list = ALLE.filter((e) => (tab === 'chet' ? e.dead : !e.dead)).sort((a, b) => tierOf(b) - tierOf(a));

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
        {live ? (
          <div className="c-row">
            <Link className="c-btn" href="/choi" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              Sống tiếp: {rankOf(live).t} {originOf(live.origin).ho} thị, {Math.floor(live.age)} tuổi
            </Link>
          </div>
        ) : null}
        <div className="c-row">
          <Link className={live ? 'c-btn ghost' : 'c-btn'} href="/choi?moi=1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            {live ? 'Bỏ đời này, vào cung lại từ đầu' : 'Vào cung'}
          </Link>
        </div>
        <div className="c-row">
          {user ? (
            <button type="button" className="c-btn ghost" onClick={() => signOut().then(() => setMe(null))}>
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
        <section aria-label="Sổ kết cục" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
          <div className="c-tabs" role="tablist" aria-label="Phần chơi">
            <button type="button" role="tab" aria-selected={part === 'che'} onClick={() => setPart('che')}>
              Cô gái chè
            </button>
            <button type="button" role="tab" aria-selected={part === 'nghiem'} onClick={() => setPart('nghiem')}>
              Con tin họ Nghiêm
            </button>
          </div>
          <p className="c-note" style={{ margin: 0, textAlign: 'center' }}>{gotN}/{ALLE.length} kết cục của phần này đã mở</p>
          <div className="c-tabs" role="tablist">
            <button type="button" role="tab" aria-selected={tab === 'song'} onClick={() => setTab('song')}>
              Những đời sống
            </button>
            <button type="button" role="tab" aria-selected={tab === 'chet'} onClick={() => setTab('chet')}>
              Những cách chết
            </button>
            <button type="button" role="tab" aria-selected={tab === 'cay'} onClick={() => setTab('cay')}>
              Cây số phận
            </button>
          </div>
          {tab === 'cay' ? (
            <div className="c-treebox">
              <p className="c-note" style={{ margin: 0 }}>Mỗi nhánh là một chuỗi ngã rẽ bạn đã chọn, cuối nhánh là kết cục nó dẫn tới. Trong lúc chơi, mở Sổ hậu cung để quay lại một ngã rẽ và chọn khác.</p>
              <FateTree paths={((me?.meta.tree as TreePath[] | undefined) ?? []).filter((x) => (part === 'nghiem' ? x.o === 'quan' : (x.o ?? 'dan') === 'dan'))} life={null} />
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
        </section>
        </details>
        <p className="c-note" style={{ textAlign: 'center' }}>
          Triều đại, nhân vật, tên cung điện đều hư cấu. Khung chín bậc, lương bổng, lễ nghi mô phỏng hậu cung nhà Nguyễn.
        </p>
      </div>
    </main>
  );
}
