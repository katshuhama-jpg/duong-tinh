'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import MusicButton from '@/components/cung/MusicButton';
import Scene, { lookOf, type Look } from '@/components/cung/Scene';
import { fanfare, playTrack, trackFor } from '@/lib/cung/music';
import { cardOf, choicesOf, choose, newLife, rankOf, rewind, sons, type Result } from '@/lib/cung/engine';
import { loadMe, saveLife, saveMeta, type CMeta } from '@/lib/cung/save';
import type { CastK, Life, NumK, PlaceK } from '@/lib/cung/types';
import { DEFAULT_NAME, suggestNames } from '@/lib/cung/names';
import { ORIGINS, fillText, originOf, type OriginK } from '@/lib/cung/origins';
import { CAST_NAME, CHAPTERS, ERA, NUM_LABEL, endingOf } from '@/lib/cung/world';

const ROMAN = ['I', 'II', 'III', 'IV'];
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const SEASONS = [
  ['đầu xuân', 'giữa hè'],
  ['cuối thu', 'giữa đông'],
];
const TIME_OF = { ngay: 'Một sáng', chieu: 'Một chiều', dem: 'Một đêm' } as const;
const NUM_VI = ['', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười'];

/** chỗ diễn ra cảnh, nói thành chữ */
function whereOf(card: NonNullable<ReturnType<typeof cardOf>>, l: Life): string {
  if (card.where) return card.where;
  const o = originOf(l.origin);
  const has = (k: CastK) => card.cast.includes(k);
  switch (card.place) {
    case 'phong':
      return `trong phòng ở ${rankOf(l).o}`;
    case 'vien':
      return `ngoài sân ${rankOf(l).o}`;
    case 'vuon':
      return 'ở vườn Thượng uyển';
    case 'dien':
      return has('thaihau') ? 'ở cung Thái hậu' : has('hoanghau') && !has('vua') ? 'ở cung Hoàng hậu' : has('quan') || has('tuong') ? 'ở chính điện' : 'ở điện Hoàng thượng';
    case 'chua':
      return 'ở chùa Vân Tịch';
    case 'lang':
      return `ở ${o.que}`;
    case 'lang_mo':
      return 'ở lăng ngoài thành';
    case 'bien':
      return 'ở bến sông';
    case 'nui':
      return 'trên núi';
  }
}

/** câu nối cảnh: bao lâu sau, mùa nào, giờ nào, ở đâu */
function bridgeOf(card: NonNullable<ReturnType<typeof cardOf>>, l: Life): string {
  const half = Math.round(l.age * 2) % 2;
  const season = SEASONS[half][hash(card.id) % 2];
  const when = `${TIME_OF[card.time ?? 'ngay']} ${season}`;
  const p = l.prev;
  let gap = '';
  if (!p) gap = 'Những ngày đầu trong cung.';
  else {
    const d = Math.round((l.age - p.age) * 2) / 2;
    gap = d <= 0 ? 'Mấy hôm sau.' : d === 0.5 ? 'Nửa năm sau.' : d === 1 ? 'Một năm sau.' : `${NUM_VI[Math.floor(d)] ?? Math.floor(d)} năm sau.`;
  }
  const same = p && p.place === card.place && card.place !== 'dien';
  return `${gap} ${when}, ${same ? 'vẫn ' : ''}${whereOf(card, l)}.`;
}

/** lòng người thành chữ */
function feelOf(k: NumK, v: number): string {
  if (v >= 60) return k === 'vua' ? 'Say đắm' : k === 'hanh' || k === 'phuc' ? 'Một lòng' : 'Tin cậy';
  if (v >= 30) return 'Quý mến';
  if (v >= 10) return 'Có cảm tình';
  if (v > -10) return 'Dửng dưng';
  if (v > -30) return 'Dè chừng';
  if (v > -60) return k === 'hanh' || k === 'phuc' ? 'Oán giận' : 'Ghét';
  return 'Thù hằn';
}
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
    meday: lookOf('meday', { father: l.origin === 'quan' }),
  };
}

/** bảng tên nhỏ dưới mỗi người trong tranh */
const SHORT: Partial<Record<CastK, string>> = {
  mama: 'Ma ma Trịnh',
  vua: 'Hoàng thượng',
  thaihau: 'Thái hậu',
  hoanghau: 'Hoàng hậu',
  thucphi: 'Thục phi',
  hanh: 'Hạnh',
  phuc: 'Thái giám Phúc',
  quan: 'Thái phó',
  tuong: 'Tướng quân',
  su: 'Sư bà',
  cungnu: 'Cung nữ',
  ngoai: 'Sứ thần',
};
function namesOf(card: NonNullable<ReturnType<typeof cardOf>>, l: Life): Partial<Record<CastK, string>> {
  const n: Partial<Record<CastK, string>> = { ...SHORT, meday: cap(originOf(l.origin).me) };
  const con = l.kids[l.kids.length - 1];
  n.con = con ? `${con.sex === 'trai' ? 'Hoàng tử' : 'Công chúa'} ${con.name}` : 'Hoàng tử';
  if (l.chapter >= 6 && l.flags.includes('con_dongcung')) n.con = 'Vua con';
  if (card.who && card.whoName) n[card.who] = card.whoName;
  return n;
}

export default function Play() {
  const [life, setLife] = useState<Life | null>(null);
  const [meta, setMeta] = useState<CMeta>({});
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState('Diệu Liên');
  const [og, setOg] = useState<OriginK | null>(null);
  const [res, setRes] = useState<Result | null>(null);
  const [edict, setEdict] = useState<string | null>(null);
  const [book, setBook] = useState(false);
  const [roll, setRoll] = useState(0);
  const sugg = useMemo(() => suggestNames(og ?? 'dan', roll * 977 + 3, 4), [og, roll]);

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
  // nhạc theo cảnh: chọn đường, quê nhà, thẻ đang hiện, kết cục
  const endDead = life?.end ? !!endingOf(life.end)?.dead : null;
  useEffect(() => {
    if (!loaded) return;
    if (!life) playTrack(og === 'dan' ? 8 : 1);
    else if (life.end && !res) playTrack(endDead ? 6 : 10);
    else playTrack(trackFor(card, life));
  }, [loaded, life, og, card, res, endDead]);

  if (!loaded) return <main className="c-app" aria-busy="true" />;

  /* ---------- mở đầu: đặt tên ---------- */
  if (!life) {
    /* bước 1: chọn đường vào cung */
    if (!og) {
      return (
        <main className="c-app">
          <div className="c-band" aria-hidden="true" />
          <div className="c-page">
            <p className="c-sub">Năm {ERA} thứ ba</p>
            <h1 className="c-title" style={{ fontSize: 28 }}>
              Bạn vào cung bằng đường nào?
            </h1>
            <p className="c-note" style={{ textAlign: 'center' }}>
              Bốn đường, bốn bộ phim. Xuất phát khác, chỗ dựa khác, kẻ thù khác.
            </p>
            <div className="c-paths">
              {ORIGINS.map((o) => (
                <button key={o.k} type="button" className="c-path" disabled={!o.open} aria-disabled={!o.open} onClick={() => o.open && (setOg(o.k), setName(DEFAULT_NAME[o.k]), setRoll(0))}>
                  <b>
                    {o.t}
                    {!o.open && <em className="c-soon">Sắp mở</em>}
                  </b>
                  <span>{o.pitch}</span>
                  <small>
                    Họ {o.ho} · vào cung làm {o.k === 'cung' ? 'cung nga' : o.rank === 0 ? 'Tài nhân' : o.rank === 2 ? 'Mỹ nhân' : 'Tiệp dư'}
                  </small>
                </button>
              ))}
            </div>
            <MusicButton className="c-btn ghost" />
            <Link href="/" className="c-note" style={{ textAlign: 'center' }}>
              Về trang đầu
            </Link>
          </div>
        </main>
      );
    }
    /* bước 2: đặt tên */
    const o = originOf(og);
    return (
      <main className="c-app">
        <div className="c-band" aria-hidden="true" />
        <div className="c-page">
          <p className="c-sub">{o.t}</p>
          <h1 className="c-title" style={{ fontSize: 28 }}>
            {o.k === 'dan' ? 'Kiệu hoa qua cổng thành' : o.k === 'quan' ? 'Con tin của nhà họ Đoàn' : o.k === 'cung' ? 'Ba thúng thóc' : 'Công chúa của triều đã mất'}
          </h1>
          <Scene
            place={o.place}
            time={o.k === 'quan' || o.k === 'chua' ? 'dem' : 'chieu'}
            cast={o.k === 'dan' ? ['me', 'meday'] : o.k === 'quan' ? ['me', 'quan'] : o.k === 'cung' ? ['me', 'mama'] : ['me', 'su']}
            looks={{ me: lookOf('me', { robe: o.k === 'cung' ? '#8a8f7a' : o.k === 'chua' ? '#c46a4a' : o.k === 'quan' ? '#6a9a6e' : undefined }) }}
            label={o.intro[0]}
          />
          <p className="c-prose">{o.intro[0]}</p>
          <p className="c-prose" style={{ fontSize: 14.5, color: 'var(--mute)' }}>
            {o.intro[1]}
          </p>
          <label className="c-field">
            Tên của bạn (họ {o.ho})
            <input value={name} maxLength={14} onChange={(e) => setName(e.target.value)} />
          </label>
          <div className="c-names" role="group" aria-label="Gợi ý tên theo lối thời Lý - Trần">
            {sugg.map((n) => (
              <button key={n.n} type="button" aria-pressed={name === n.n} onClick={() => setName(n.n)}>
                {n.n}
                <small>{n.y}</small>
              </button>
            ))}
            <button type="button" className="more" onClick={() => setRoll((r) => r + 1)}>
              Tên khác
            </button>
          </div>
          <p className="c-note">
            Tên đặt theo lối thời Lý - Trần (như công chúa Phật Kim, Ngọc Kiều, Kiều Oanh). Trong cung không ai gọi tên thật, chỉ gọi theo họ: &quot;{o.ho} thị&quot;.
          </p>
          <button type="button" className="c-btn" onClick={() => keep(newLife(name, o.k))}>
            Bước qua cổng thành
          </button>
          <button type="button" className="c-btn ghost" onClick={() => setOg(null)}>
            Chọn đường khác
          </button>
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
            <h2 className={e.dead ? 'dead' : ''}>{fillText(e.name, life.origin)}</h2>
            <p className="c-prose">{fillText(e.desc, life.origin)}</p>
            <p className="c-note">
              {rank.t} {originOf(life.origin).ho} thị ({life.name}), {ageOf(life)} tuổi · {sons(life) ? `${sons(life)} hoàng tử` : 'không có hoàng tử'}
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
    if (r.ranked) (setEdict(rankOf(r.life).t), fanfare());
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
            {rank.t} {originOf(life.origin).ho} thị
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
            <Scene place={card.place} time={card.time ?? 'ngay'} cast={card.cast} looks={looksOf(life)} mood={card.mood} moods={card.moods} names={namesOf(card, life)} label={fillText(`${card.title}. ${card.text.join(' ')}`, life.origin)} />
          </div>
          {!res && (
            <>
              <p className="c-bridge c-in">{bridgeOf(card, life)}</p>
              <div className="c-scroll c-unroll" key={`d${card.id}${life.seen.length}`}>
                <div className="c-roll" />
                <div className="c-sheet">
                  <div className="c-tag">
                    <span>{card.who && card.who !== 'me' ? (card.whoName ?? (card.who === 'meday' ? cap(originOf(life.origin).me) : CAST_NAME[card.who])) : fillText(card.title, life.origin)}</span>
                    {card.who && card.who !== 'me' && <small>{fillText(card.title, life.origin)}</small>}
                  </div>
                  {card.lead && <p className="c-lead">{fillText(card.lead, life.origin)}</p>}
                  {card.text.map((t, i) => (
                    <p key={i} className="c-text" style={i ? { fontWeight: 500, fontSize: 15.5 } : undefined}>
                      {fillText(t, life.origin)}
                    </p>
                  ))}
                  {card.big && <div className="c-seal c-in">Ngã<br />rẽ</div>}
                </div>
                <div className="c-roll" />
              </div>
              <p className="c-ask c-in">
                Năm {ERA} thứ {yearOf(life)}. Bạn sẽ làm gì?
              </p>
              <div className="c-choices c-in" key={`c${card.id}${life.seen.length}`}>
                {opts.map(({ c, open }, i) => (
                  <button key={i} type="button" className="c-opt" disabled={!open} onClick={() => pick(i)}>
                    <b>{ROMAN[i]}</b>
                    <span>
                      {fillText(c.t, life.origin)}
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
        <MusicButton />
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
              {originOf(life.origin).ho} thị được phong {edict}, dời về {rank.o}.
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
                  <FragmentRow key={k} label={k === 'vua' ? 'Hoàng thượng' : NUM_LABEL[k]} v={life.n[k]} feel={feelOf(k, life.n[k])} />
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

/** một dòng lòng người: thanh hai chiều, giữa là dửng dưng, trái là ghét, phải là thương */
function FragmentRow({ label, v, feel }: { label: string; v: number; feel: string }) {
  const neg = v < 0;
  return (
    <>
      <span>{label}</span>
      <i aria-label={`${label}: ${feel} (${v > 0 ? '+' : ''}${v})`} className={neg ? 'neg' : ''}>
        <em style={neg ? { right: '50%', width: `${-v / 2}%` } : { left: '50%', width: `${v / 2}%` }} />
      </i>
      <b className={neg ? 'neg' : v >= 10 ? 'pos' : ''}>
        {feel} <small>{v > 0 ? '+' : ''}{v}</small>
      </b>
    </>
  );
}
