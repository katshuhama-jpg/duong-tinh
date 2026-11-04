'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Scene, { lookOf, type Look } from '@/components/cung/Scene';
import { cardOf, choicesOf, choose, newLife, rankOf, rewind, sons, type Result } from '@/lib/cung/engine';
import { loadMe, saveLife, saveMeta, type CMeta } from '@/lib/cung/save';
import type { CastK, Life, NumK, PlaceK } from '@/lib/cung/types';
import { NAME_NOTE, suggestNames } from '@/lib/cung/names';
import { CAST_NAME, CHAPTERS, ERA, NUM_LABEL, endingOf } from '@/lib/cung/world';

const ROMAN = ['I', 'II', 'III', 'IV'];
const SEASON = ['một sáng đầu xuân', 'một trưa hè oi ả', 'một chiều mưa', 'một tối cuối thu', 'một sáng mùa đông', 'một ngày rằm'];
const ageOf = (l: Life) => Math.floor(l.age);
const yearOf = (l: Life) => ageOf(l) - 13;
const hash = (s: string) => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
};

function looksOf(l: Life): Partial<Record<CastK, Look>> {
  const r = rankOf(l);
  const old = l.age >= 50;
  return {
    me: lookOf('me', { robe: r.ao, phuong: r.phuong, old }),
    con: lookOf('con', { king: l.flags.includes('con_dongcung') && l.chapter >= 6 }),
    hanh: lookOf('hanh', { old }),
    thucphi: lookOf('thucphi', { old: l.age >= 45 }),
    hoanghau: lookOf('hoanghau', { old: l.age >= 45 }),
  };
}

export default function Play() {
  const [life, setLife] = useState<Life | null>(null);
  const [meta, setMeta] = useState<CMeta>({});
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState('Nụ');
  const [res, setRes] = useState<Result | null>(null);
  const [edict, setEdict] = useState<string | null>(null);
  const [book, setBook] = useState(false);
  const [roll, setRoll] = useState(0);
  const sugg = useMemo(() => suggestNames(roll * 977 + 3, 4), [roll]);

  useEffect(() => {
    const fresh = new URLSearchParams(window.location.search).get('moi') === '1';
    loadMe().then((m) => {
      setMeta(m?.meta ?? {});
      setLife(fresh ? null : (m?.life ?? null));
      setLoaded(true);
    });
  }, []);

  const keep = useCallback((l: Life | null) => {
    setLife(l);
    void saveLife(l);
  }, []);

  const unlock = useCallback(
    (id: string) => {
      const cung = Array.from(new Set([...(meta.cung ?? []), id]));
      const m = { ...meta, cung, cungLives: (meta.cungLives ?? 0) + 1 };
      setMeta(m);
      void saveMeta(m);
    },
    [meta],
  );

  const card = life?.card ? cardOf(life.card) : null;
  const opts = useMemo(() => (card && life ? choicesOf(card, life) : []), [card, life]);

  if (!loaded) return <main className="c-app" aria-busy="true" />;

  /* ---------- mở đầu: đặt tên ---------- */
  if (!life) {
    return (
      <main className="c-app">
        <div className="c-band" aria-hidden="true" />
        <div className="c-page">
          <p className="c-sub">Năm {ERA} thứ ba</p>
          <h1 className="c-title" style={{ fontSize: 28 }}>
            Kiệu hoa qua cổng thành
          </h1>
          <Scene place="lang" time="chieu" cast={['me', 'meday']} looks={{ me: lookOf('me') }} label="Đồi chè làng Mai Đông lúc chiều, cô gái từ biệt mẹ" />
          <p className="c-prose">
            Bạn là con gái nhà làm chè ở làng Mai Đông. Năm mười sáu tuổi, bạn đứng tựa gốc đại ở chùa Vân Tịch đúng lúc Hoàng thượng đi lễ cầu tự. Một tháng sau, kiệu đón vào cung.
          </p>
          <p className="c-prose" style={{ fontSize: 14.5, color: 'var(--mute)' }}>
            Mẹ dúi vào tay bạn gói chè: &quot;Trong ấy, chén nào cũng phải nhìn hai lần, con ạ.&quot;
          </p>
          <label className="c-field">
            Tên của bạn (nhà họ Diệp)
            <input value={name} maxLength={12} onChange={(e) => setName(e.target.value)} />
          </label>
          <div className="c-names" role="group" aria-label="Gợi ý tên con gái làng">
            {sugg.map((n) => (
              <button key={n} type="button" aria-pressed={name === n} onClick={() => setName(n)} title={NAME_NOTE[n]}>
                {n}
                {NAME_NOTE[n] && <small>{NAME_NOTE[n]}</small>}
              </button>
            ))}
            <button type="button" className="more" onClick={() => setRoll((r) => r + 1)}>
              Tên khác
            </button>
          </div>
          <p className="c-note">Thời xưa gần như con gái nào cũng mang chữ đệm &quot;Thị&quot;, trong cung không ai gọi tên thật, chỉ gọi theo họ: &quot;Diệp thị&quot;. Ở nhà, mẹ vẫn gọi bạn là {name || 'con'}.</p>
          <button type="button" className="c-btn" onClick={() => keep(newLife(name))}>
            Bước qua cổng thành
          </button>
          <Link href="/" className="c-note" style={{ textAlign: 'center' }}>
            Về trang đầu
          </Link>
        </div>
      </main>
    );
  }

  const rank = rankOf(life);
  const chapter = CHAPTERS.find((c) => c.n === life.chapter)!;

  /* ---------- hết đời ---------- */
  if (life.end && !res) {
    const e = endingOf(life.end)!;
    const tomb = life.rank >= 5 || life.flags.includes('thai_phi') || life.flags.includes('thai_hau') ? 'tẩm' : 'mộ';
    return (
      <main className="c-app">
        <div className="c-band" aria-hidden="true" />
        <div className="c-page">
          <Scene place={endPlace(e.id, !!e.dead)} time="chieu" cast={e.dead ? [] : ['me']} looks={looksOf(life)} label={`Kết cục: ${e.name}`} />
          <div className="c-end c-ink">
            <p className="c-sub">{e.dead ? 'Một cách chết' : 'Kết cục'}</p>
            <h2 className={e.dead ? 'dead' : ''}>{e.name}</h2>
            <p className="c-prose">{e.desc}</p>
            <p className="c-note">
              {rank.t} Diệp thị ({life.name}), {ageOf(life)} tuổi · {sons(life) ? `${sons(life)} hoàng tử` : 'không có hoàng tử'}
              {life.kids.length - sons(life) ? `, ${life.kids.length - sons(life)} công chúa` : ''} · Bia ghi chữ &quot;{tomb}&quot;
            </p>
          </div>
          {e.dead && life.omen && (
            <p className="c-omen">
              <b>Điềm báo: </b>
              {life.omen}
            </p>
          )}
          <div className="c-row">
            {e.dead && life.back && (
              <button type="button" className="c-btn" onClick={() => keep(rewind(life))}>
                Quay lại ngã rẽ gần nhất
              </button>
            )}
            <button type="button" className={e.dead && life.back ? 'c-btn ghost' : 'c-btn'} onClick={() => keep(null)}>
              Sống một đời khác
            </button>
          </div>
          <Link href="/" className="c-btn ghost" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            Xem sổ kết cục
          </Link>
        </div>
      </main>
    );
  }

  const pick = (i: number) => {
    if (!card || res) return;
    const r = choose(life, i);
    keep(r.life);
    setRes(r);
    if (r.ranked) setEdict(rankOf(r.life).t);
    if (r.life.end) unlock(r.life.end);
  };

  const stat = (k: NumK) => {
    const v = life.n[k];
    const warn = (k === 'an' && (v >= 85 || v <= 10)) || (k === 'duc' && v <= 15);
    return (
      <div key={k} className={`c-stat ${warn ? 'warn' : ''}`}>
        <span>{NUM_LABEL[k]}</span>
        <b>{v}</b>
        <i>
          <em style={{ width: `${v}%` }} />
        </i>
      </div>
    );
  };

  return (
    <main className="c-app">
      <div className="c-band" aria-hidden="true" />
      <div className="c-top">
        <div className="c-badge" aria-label={`Bậc: ${rank.giai}`}>
          {rank.giai.split(' ').map((w, i) => (i === rank.giai.split(' ').length - 1 ? <b key={i}>{w}</b> : <span key={i}>{w}</span>))}
        </div>
        <div className="c-who">
          <strong>
            {rank.t} Diệp thị
          </strong>
          <small>
            {rank.o} · {rank.luong} quan, {rank.gao} phương gạo mỗi năm
          </small>
        </div>
        <div className="c-when">
          <strong>{ageOf(life)} tuổi</strong>
          <small>
            {ERA} năm {yearOf(life)}
          </small>
          <small>{chapter.t}</small>
        </div>
      </div>
      <div className="c-stats">{(['duc', 'sac', 'the', 'an', 'muu'] as NumK[]).map(stat)}</div>

      {card && (
        <>
          <div className="c-scenebox" key={`s${card.id}${life.seen.length}`}>
            <Scene place={card.place} time={card.time ?? 'ngay'} cast={card.cast} looks={looksOf(life)} label={`${card.title}. ${card.text.join(' ')}`} />
          </div>
          {!res && (
            <>
              <div className="c-scroll c-unroll" key={`d${card.id}${life.seen.length}`}>
                <div className="c-roll" />
                <div className="c-sheet">
                  <div className="c-tag">
                    <span>{card.who && card.who !== 'me' ? (card.whoName ?? CAST_NAME[card.who]) : card.title}</span>
                    {card.who && card.who !== 'me' && <small>{card.title}</small>}
                  </div>
                  {card.text.map((t, i) => (
                    <p key={i} className="c-text" style={i ? { fontWeight: 500, fontSize: 15.5 } : undefined}>
                      {t}
                    </p>
                  ))}
                  {card.big && <div className="c-seal c-in">Ngã<br />rẽ</div>}
                </div>
                <div className="c-roll" />
              </div>
              <p className="c-ask c-in">
                Hôm nay là {SEASON[hash(card.id) % SEASON.length]} năm {ERA} thứ {yearOf(life)}. Bạn sẽ làm gì?
              </p>
              <div className="c-choices c-in" key={`c${card.id}${life.seen.length}`}>
                {opts.map(({ c, open }, i) => (
                  <button key={i} type="button" className="c-opt" disabled={!open} onClick={() => pick(i)}>
                    <b>{ROMAN[i]}</b>
                    <span>
                      {c.t}
                      {!open && c.lockHint && <small>Khóa: {c.lockHint}</small>}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
      {res && (
        <div className="c-result" role="status">
          {res.note && <p>{res.note}</p>}
          {res.delta && <div className="c-delta">{res.delta}</div>}
          <button type="button" className="c-btn" onClick={() => setRes(null)}>
            {life.end ? 'Xem kết cục' : 'Tiếp'}
          </button>
        </div>
      )}

      <div className="c-bottom">
        <Link href="/" aria-label="Về trang đầu">
          Trang đầu
        </Link>
        <button type="button" className="main" onClick={() => setBook(true)}>
          Sổ hậu cung
        </button>
      </div>

      {edict && (
        <div className="c-edict" role="dialog" aria-modal="true" aria-label="Chiếu phong" onClick={() => setEdict(null)}>
          <div>
            <small>CHIẾU PHONG</small>
            <h2>{edict}</h2>
            <p>
              Diệp thị được phong {edict}, dời về {rank.o}.
            </p>
            <button type="button" className="c-btn" onClick={() => setEdict(null)}>
              Tạ ơn
            </button>
          </div>
        </div>
      )}

      {book && (
        <div className="c-veil" onClick={() => setBook(false)}>
          <div className="c-panel" role="dialog" aria-modal="true" aria-label="Sổ hậu cung" onClick={(e) => e.stopPropagation()}>
            <header>
              <h2>Sổ hậu cung</h2>
              <button type="button" onClick={() => setBook(false)}>
                Đóng
              </button>
            </header>
            <section>
              <h3>
                {rank.t} · {rank.giai}
              </h3>
              <p className="c-note">
                Ở {rank.o}. Lương {rank.luong} quan, {rank.gao} phương gạo mỗi năm. Tiền riêng: {life.n.tien} quan.
              </p>
              <p className="c-note">
                {life.kids.length ? life.kids.map((k) => `${k.sex === 'trai' ? 'Hoàng tử' : 'Công chúa'} ${k.name} (${ageOf(life) - k.born} tuổi)`).join(', ') : 'Chưa có con.'}
              </p>
            </section>
            <section>
              <h3>Lòng người</h3>
              <div className="c-rel">
                {(['vua', 'thaihau', 'hoanghau', 'thucphi', 'hanh', 'phuc', 'quan', 'tuong'] as NumK[]).map((k) => (
                  <FragmentRow key={k} label={NUM_LABEL[k]} v={life.n[k]} />
                ))}
              </div>
            </section>
            <section>
              <h3>Nhật ký</h3>
              <ul className="c-log">
                {life.log
                  .filter((l) => !l.t.startsWith('#'))
                  .slice()
                  .reverse()
                  .slice(0, 80)
                  .map((l, i) => (
                    <li key={i} className={l.k ?? ''}>
                      <b>{l.age}t</b>
                      <span>{l.t}</span>
                    </li>
                  ))}
              </ul>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}

/** cảnh cho màn kết cục */
function endPlace(id: string, dead: boolean): PlaceK {
  if (dead) return 'lang_mo';
  if (/di_tu|thuyen_ve|ao_nau/.test(id)) return 'chua';
  if (/vuot_bien|hau_nuoc|hoa_than/.test(id)) return 'bien';
  if (/cau_mua|lay_tuong|thu_dan/.test(id)) return 'lang';
  if (/nhiep|mau_nghi|nu_de|chi_vua|giam_quoc|trao_ngoi|nu_su/.test(id)) return 'dien';
  return 'vuon';
}

function FragmentRow({ label, v }: { label: string; v: number }) {
  return (
    <>
      <span>{label}</span>
      <i aria-label={`${label}: ${v}`}>
        <em style={{ width: `${v}%` }} />
      </i>
    </>
  );
}
