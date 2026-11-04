'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import MusicButton from '@/components/cung/MusicButton';
import Scene, { lookOf } from '@/components/cung/Scene';
import { playTrack } from '@/lib/cung/music';
import { signOut } from '@/lib/auth';
import { rankOf } from '@/lib/cung/engine';
import { originOf } from '@/lib/cung/origins';
import { loadMe, type CMeta } from '@/lib/cung/save';
import type { Life } from '@/lib/cung/types';
import { ALL_ENDINGS as ENDINGS } from '@/lib/cung/world';
import { useAuth } from '@/lib/useAuth';

export default function Home() {
  const { user, ready } = useAuth();
  const [me, setMe] = useState<{ meta: CMeta; life: Life | null } | null>(null);
  const [tab, setTab] = useState<'song' | 'chet'>('song');
  useEffect(() => playTrack(1), []);
  useEffect(() => {
    if (!ready) return;
    loadMe().then((m) => setMe(m ? { meta: m.meta, life: m.life } : { meta: {}, life: null }));
  }, [ready, user]);
  const got = new Set(me?.meta.cung ?? []);
  const live = me?.life && !me.life.end ? me.life : null;
  const list = ENDINGS.filter((e) => (tab === 'chet' ? e.dead : !e.dead));

  return (
    <main className="c-app">
      <div className="c-band" aria-hidden="true" />
      <div className="c-page">
        <p className="c-sub">Triều Khánh Vân · Phượng Thành</p>
        <h1 className="c-title">Chín Bậc Phượng</h1>
        <MusicButton className="c-btn ghost" />
        <Scene place="vien" time="dem" cast={['me', 'hanh']} looks={{ me: lookOf('me', { robe: '#a8281d' }) }} label="Đêm ở sân viện, cô gái áo đỏ đứng dưới đèn lồng, thị nữ đứng bên" />
        <p className="c-prose">
          Bốn con đường vào cung: gái làng chè được vua để mắt, con quan bị dâng làm con tin, cung nga giặt áo, và công chúa của triều đã mất. Chín bậc hậu cung, một ngai vàng, và những chén trà không biết có độc hay không.
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

        <section aria-labelledby="ket-cuc" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
          <h2 id="ket-cuc" style={{ margin: 0, fontFamily: 'var(--serif)', color: 'var(--son)', fontSize: 22 }}>
            Sổ kết cục · {got.size}/{ENDINGS.length}
          </h2>
          <div className="c-tabs" role="tablist">
            <button type="button" role="tab" aria-selected={tab === 'song'} onClick={() => setTab('song')}>
              Những đời sống
            </button>
            <button type="button" role="tab" aria-selected={tab === 'chet'} onClick={() => setTab('chet')}>
              Những cách chết
            </button>
          </div>
          <ul className="c-ends" style={{ margin: 0, padding: 0 }}>
            {list.map((e) => (
              <li key={e.id} className={got.has(e.id) ? '' : 'locked'}>
                <b>{got.has(e.id) ? e.name : '???'}</b>
                {got.has(e.id) ? e.desc : 'Chưa mở. Thử một đời khác.'}
              </li>
            ))}
          </ul>
        </section>
        <p className="c-note" style={{ textAlign: 'center' }}>
          Triều đại, nhân vật, tên cung điện đều hư cấu. Khung chín bậc, lương bổng, lễ nghi mô phỏng hậu cung nhà Nguyễn.
        </p>
      </div>
    </main>
  );
}
