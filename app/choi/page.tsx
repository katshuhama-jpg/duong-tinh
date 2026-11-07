'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import MusicButton from '@/components/cung/MusicButton';
import TopBar from '@/components/cung/TopBar';
import Scene, { Person, lookOf, type BgK, type CastImg, type Look, type SeasonK } from '@/components/cung/Scene';
import { fanfare, playTrack, trackFor } from '@/lib/cung/music';
import { alliesOf, chapOf, doubt, isNg, migrate, viewCard, cardOf, choicesOf, choose, newLife, rankOf, rewind, rewindTo, sons, type Result } from '@/lib/cung/engine';
import { FateTree, LifeMarks, type TreePath } from '@/components/cung/Tree';
import { artOf } from '@/lib/cung/art';
import { ENDING_TIER } from '@/lib/cung/ending_tier';
import { loadMe, saveLife, saveMeta, type CMeta } from '@/lib/cung/save';
import type { CastK, Life, MoodK, NumK, PlaceK, RivalK, RivalState } from '@/lib/cung/types';
import { DEFAULT_NAME, suggestNames } from '@/lib/cung/names';
import { ORIGINS, fillText, originOf, type OriginK } from '@/lib/cung/origins';
import { ALL_ENDINGS, CAST_NAME, ERA, NGHIEM_ENDINGS, NUM_LABEL, RIVALS, RIV_ST, endingOf, gone, guardsOf } from '@/lib/cung/world';
import { NG_CAST_NAME, NG_ERA, NG_YEAR0 } from '@/lib/cung/nghiem/world';
import SoAn, { SoAnStrip } from '@/components/cung/SoAn';

const ROMAN = ['I', 'II', 'III', 'IV'];
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const SEASONS = [
  ['đầu xuân', 'giữa hè'],
  ['cuối thu', 'giữa đông'],
];
const TIME_OF = { ngay: 'Một sáng', chieu: 'Một chiều', dem: 'Một đêm' } as const;
const NUM_HOI = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu'];
const TIME_AT = { ngay: 'ngay lúc ấy', chieu: 'chiều hôm ấy', dem: 'đêm ấy' } as const;
const NUM_VI = ['', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười'];

/** chỗ diễn ra cảnh, nói thành chữ */
const NG_WHERE: Record<string, string> = {
  vienchi: 'trong viện cũ của chị',
  chaisau: 'ở dãy chái sau',
  khoso: 'trong kho sổ nội vụ',
  thaiyvien: 'ở phòng thuốc Thái y viện',
  tamphap: 'ở công đường Tam pháp ty',
  trong: 'trước cửa khuyết, bên trống Đăng văn',
  lang_vua: 'ở lăng vua',
  chuabien: 'ở ngôi chùa ven biển',
  congphu: 'trước cổng phủ Nghiêm',
  thuphong: 'trong thư phòng của cha',
  phonghoc: 'trong phòng học cũ ở phủ',
  tam: 'trong tẩm điện',
  dien: 'ở chính điện',
  trieu: 'ở triều đường',
  lanh: 'trong ngục',
  thaimieu: 'ở Thái miếu',
  lang: 'ở lăng',
  lang_mo: 'bên lăng mộ',
  chua: 'ở chùa',
  thu: 'trong thư phòng',
  hanh: 'ngoài hành lang',
  vuon: 'trong vườn ngự',
  bep: 'ở bếp thuốc',
  cong: 'ở cổng thành',
};
function whereOf(card: NonNullable<ReturnType<typeof cardOf>>, l: Life): string {
  if (card.where) return card.where;
  if (isNg(l) && card.img && NG_WHERE[card.img]) return NG_WHERE[card.img];
  if (isNg(l) && card.place === 'phong') return l.chapter <= 3 ? 'trong viện cũ của chị' : 'trong viện của bạn';
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

/** cảnh nền riêng: theo card.bg, không có thì đoán từ chữ chỉ chỗ và tiêu đề */
function bgOf(card: NonNullable<ReturnType<typeof cardOf>>): BgK | undefined {
  if (card.bg) return card.bg;
  const w = `${card.where ?? ''} ${card.title}`.toLowerCase();
  const t = card.text.join(' ').toLowerCase();
  if (/cửa tây|cổng thành|ngọ môn|lầu cửa|cửa thành|cửa ngọ|cổng cung/.test(w)) return 'cong';
  if (/lãnh cung|ngục|nhà giam|cấm túc|lạc mai/.test(w)) return 'lanh';
  if (/ngự dược|thái y viện|bếp|phòng thuốc/.test(w)) return 'bep';
  if (/tẩm điện|tẩm cung|long sàng/.test(w) || (card.place !== 'vuon' && /hấp hối|thổ huyết|bên giường bệnh/.test(t) && card.cast.includes('vua'))) return 'tam';
  if (/thư phòng/.test(w)) return 'thu';
  if (/hành lang/.test(w)) return 'hanh';
  if (card.place === 'dien' && (/chính điện|buổi chầu|sân rồng/.test(w) || ((card.cast.includes('quan') || card.cast.includes('tuong')) && /triều|chầu|bá quan|trăm quan|tâu/.test(t)))) return 'trieu';
  return undefined;
}
const SEASON_K: SeasonK[][] = [
  ['xuan', 'ha'],
  ['thu', 'dong'],
];
const seasonOf = (card: { id: string }, l: Life): SeasonK => (isNg(l) ? (['xuan', 'ha', 'thu', 'dong'] as SeasonK[])[Math.floor((Math.floor(l.age * 12 + 0.01) % 12) / 3)] : SEASON_K[Math.round(l.age * 2) % 2][hash(card.id) % 2]);
const windOf = (card: NonNullable<ReturnType<typeof cardOf>>) => /gió (to|lớn|thổi|rít|lùa|bấc|mùa|giật)|gió nổi|bão|lộng gió/.test(card.text.join(' ').toLowerCase());
const rainOf = (card: NonNullable<ReturnType<typeof cardOf>>) => /mưa (to|lớn|rơi|dầm|ngâu|gió)|trời mưa|giữa mùa mưa|dưới mưa/.test(card.text.join(' ').toLowerCase());

/** câu nối cảnh: bao lâu sau, mùa nào, giờ nào, ở đâu */
function bridgeOf(card: NonNullable<ReturnType<typeof cardOf>>, l: Life): string {
  const half = Math.round(l.age * 2) % 2;
  const mo = Math.floor(l.age * 12 + 0.01) % 12;
  const season = isNg(l) ? ['đầu xuân', 'giữa xuân', 'cuối xuân', 'đầu hè', 'giữa hè', 'cuối hè', 'đầu thu', 'giữa thu', 'cuối thu', 'đầu đông', 'giữa đông', 'cuối đông'][mo] : SEASONS[half][hash(card.id) % 2];
  const when = `${TIME_OF[card.time ?? 'ngay']} ${season}`;
  const p = l.prev;
  if (l.chain) return `Hồi ${NUM_HOI[l.chain.hoi] ?? l.chain.hoi}. ${cap(TIME_AT[card.time ?? 'ngay'])}, ${p && p.place === card.place ? 'vẫn ' : ''}${whereOf(card, l)}.`;
  let gap = '';
  if (!p) gap = 'Những ngày đầu trong cung.';
  else if (isNg(l)) {
    const m = Math.round((l.age - p.age) * 12);
    gap = m <= 0 ? 'Mấy hôm sau.' : m < 12 ? `${NUM_VI[m] ?? m} tháng sau.` : m < 24 ? 'Một năm sau.' : `${NUM_VI[Math.floor(m / 12)] ?? Math.floor(m / 12)} năm sau.`;
  } else {
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
const yearOf = (l: Life) => (isNg(l) ? NG_YEAR0 + ageOf(l) - 18 : ageOf(l) - 15);
const eraOf = (l: Life) => (isNg(l) ? NG_ERA : ERA);
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

/** ảnh vẽ tay đã có: nhân vật chính (đường dân nữ) theo 5 giai đoạn, Hạnh theo 3 tuổi */
function meStage(l: Life): string {
  const f = (x: string) => l.flags.includes(x);
  if (l.age >= 55) return 'me5';
  if (f('thai_hau') || f('thai_phi') || f('nhiep') || l.chapter >= 6) return 'me4';
  if (f('hoang_hau') || l.rank >= 8) return 'me3';
  const o = l.origin ?? 'dan';
  if (o === 'cung' && l.flags.includes('cung_nga')) return 'cung1';
  if (l.rank >= 3 || l.age >= 22) return 'me2';
  return o === 'quan' ? 'quan1' : o === 'cung' ? 'cung1' : o === 'chua' ? 'chua1' : 'me1';
}
/** phần Con tin họ Nghiêm: dàn vai riêng */
function ngImgs(l: Life): Partial<Record<CastK, CastImg>> {
  const f = (x: string) => l.flags.includes(x);
  const L = (d: string): CastImg => ({ dir: `/nv/${d}`, face: 'l' });
  const ch = l.chapter;
  const me = l.age >= 60 ? 'hn4' : f('thai_hau') || f('nhiep') ? 'hn3' : f('thai_phi') || f('lui') ? 'hn3b' : f('hoang_hau') ? 'hn2b' : l.rank >= 5 || l.age >= 22 ? 'hn2' : 'hn1';
  const kid = l.kids[l.kids.length - 1];
  const kidAge = kid ? Math.floor(l.age) - kid.born : 0;
  return {
    me: { dir: `/nv/${me}`, face: 'r' },
    vua: L(ch >= 4 ? 'vua_hb2' : 'vua_hb'),
    thaihau: L(ch >= 5 ? 'thaihau_l2' : 'thaihau_l'),
    hoanghau: L(ch >= 6 ? 'hoanghau_l2' : 'hoanghau_l'),
    thanh: L('thanh2'),
    cha: L(ch >= 6 ? 'cha2' : 'cha'),
    thaisu: L(ch >= 5 ? 'thaisu2' : 'thaisu'),
    lymac: L(ch >= 6 ? 'lymac2' : 'lymac'),
    kiem: L(ch >= 6 ? 'kiem2' : 'kiem'),
    thaiy: L(ch >= 6 ? 'thaiy2' : 'thaiy'),
    nhumau: L(ch >= 5 ? 'nhumau2' : 'nhumau'),
    luavang: L(ch >= 6 ? 'luavang2' : 'luavang'),
    uyennhu: L(ch >= 5 ? 'uyennhu2' : 'uyennhu'),
    huu: L(ch >= 6 && f('huu_lenngoi') ? 'huu2' : ch >= 5 ? 'huu' : 'huu0'),
    con: L(f('canh_lenngoi') ? 'canh2' : kidAge >= 16 ? 'canh' : 'canh0'),
    balao: L(f('balao_hau') ? 'balao_che_hau' : f('balao_su') ? 'balao_che_su' : 'balao_che'),
    dao: L('dao_bong'),
    mo: L('mo_bong'),
    cungnu: L('cungnu'),
  };
}
function imgsOf(l: Life): Partial<Record<CastK, CastImg>> {
  if (isNg(l)) return ngImgs(l);
  const m: Partial<Record<CastK, CastImg>> = {};
  m.me = { dir: `/nv/${meStage(l)}`, face: 'r' };
  m.hanh = { dir: `/nv/${l.age >= 55 ? 'hanh3' : l.age >= 35 ? 'hanh2' : 'hanh'}`, face: 'l' };
  const tp = l.riv?.thucphi?.st;
  const newKing = l.flags.includes('vua_bang') || l.chapter >= 6;
  m.vua = { dir: newKing ? (sons(l) && (l.flags.includes('con_dongcung') || l.flags.includes('nhiep') || l.flags.includes('thai_hau')) ? '/nv/con_vua2' : '/nv/nghia') : `/nv/${l.chapter >= 4 ? 'vua2' : 'vua'}`, face: 'l' };
  m.thaihau = { dir: `/nv/${l.chapter >= 4 ? 'thaihau2' : 'thaihau'}`, face: 'l' };
  m.mama = { dir: '/nv/mama', face: 'l' };
  m.tao = { dir: `/nv/${l.chapter >= 5 ? 'tao2' : 'tao'}`, face: 'l' };
  m.xuanlan = { dir: `/nv/${l.chapter >= 5 ? 'xuanlan2' : 'xuanlan'}`, face: 'l' };
  m.ninh = { dir: `/nv/${l.chapter >= 3 ? 'ninh2' : 'ninh'}`, face: 'l' };
  m.hienphi = { dir: `/nv/${l.chapter >= 5 ? 'hienphi2' : 'hienphi'}`, face: 'l' };
  const ut = l.riv?.uyentan?.st;
  m.uyentan = { dir: `/nv/${ut === 'giang' || ut === 'phuc' || l.chapter >= 5 ? 'uyentan2' : 'uyentan'}`, face: 'l' };
  m.letan = { dir: `/nv/${l.chapter >= 5 ? 'letan2' : 'letan'}`, face: 'l' };
  m.quan = { dir: `/nv/${l.chapter >= 6 ? 'quan2' : 'quan'}`, face: 'l' };
  m.nghia = { dir: `/nv/${l.chapter >= 6 || l.riv?.nghia?.st === 'giang' ? 'nghia2' : 'nghia'}`, face: 'l' };
  const king = l.flags.includes('thai_hau') || l.flags.includes('nhiep');
  m.con = { dir: `/nv/${king ? (l.chapter >= 6 ? 'con_vua2' : 'con_vua') : l.chapter >= 4 ? 'con2' : 'con'}`, face: 'l' };
  m.tuong = { dir: `/nv/${l.chapter >= 6 ? 'tuong2' : 'tuong'}`, face: 'l' };
  const hp = l.riv?.hienphi?.st;
  m.mac = { dir: `/nv/${hp === 'chet' || hp === 'giang' || l.chapter >= 6 ? 'mac2' : 'mac'}`, face: 'l' };
  m.su = { dir: '/nv/su', face: 'l' };
  m.meday = { dir: `/nv/${l.chapter >= 4 || l.rank >= 5 ? 'meday2' : 'meday'}`, face: 'l' };
  m.cungnu = { dir: '/nv/cungnu', face: 'l' };
  m.ngoai = { dir: '/nv/ngoai', face: 'l' };
  m.phuc = { dir: `/nv/${l.age >= 42 || l.chapter >= 5 ? 'phuc2' : 'phuc'}`, face: 'l' };
  const hh = l.riv?.hoanghau?.st;
  m.hoanghau = { dir: `/nv/${hh === 'giang' || hh === 'phuc' || l.flags.includes('hoang_hau') || l.age >= 56 ? 'hoanghau3' : l.age >= 40 || l.chapter >= 4 ? 'hoanghau2' : 'hoanghau'}`, face: 'l' };
  m.thucphi = { dir: `/nv/${tp === 'giang' || tp === 'phuc' || l.age >= 52 ? 'thucphi3' : l.age >= 34 || l.chapter >= 4 ? 'thucphi2' : 'thucphi'}`, face: 'l' };
  return m;
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
  letan: 'Lệ tần',
  nghia: 'Hoàng tử Nghĩa',
  ninh: 'Ninh mỹ nhân',
  hienphi: 'Hiền phi',
  uyentan: 'Uyển tần',
  tao: 'Tào công công',
  xuanlan: 'Xuân Lan',
  mac: 'Mạc tướng quân',
};
function namesOf(card: NonNullable<ReturnType<typeof cardOf>>, l: Life): Partial<Record<CastK, string>> {
  if (isNg(l)) {
    const n: Partial<Record<CastK, string>> = { ...NG_CAST_NAME };
    const con = l.kids[l.kids.length - 1];
    if (con) n.con = `${con.sex === 'trai' ? 'Hoàng tử' : 'Công chúa'} ${con.name}`;
    if (card.who && card.whoName) n[card.who] = card.whoName;
    return n;
  }
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
  const [soan, setSoan] = useState(false);
  const [roll, setRoll] = useState(0);
  const [fresh, setFresh] = useState(false);
  const [tree, setTree] = useState(false);
  /** màn chọn thân phận (bước 1/3) đang mở */
  const [chon, setChon] = useState(false);
  /** thân phận đã có đời dang dở: hỏi chơi tiếp hay chơi lại */
  const [ask, setAsk] = useState<OriginK | null>(null);
  /** bước 3/3 của cô gái chè: cảnh mở màn trước khi vào đời */
  const [pro, setPro] = useState(false);
  const sugg = useMemo(() => suggestNames(og ?? 'dan', roll * 977 + 3, 4), [og, roll]);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    loadMe().then((m) => {
      setMeta(m?.meta ?? {});
      setLife(m?.life ?? null);
      setChon(q.get('chon') === '1' || q.get('moi') === '1' || !m?.life);
      setLoaded(true);
    });
  }, []);

  const keep = useCallback((l: Life | null) => {
    setLife(l);
    void saveLife(l);
  }, []);

  /** các đời dang dở theo từng thân phận: đời đang mở + các đời đã cất trong sổ */
  const paused = (meta.lives ?? {}) as Partial<Record<OriginK, Life>>;
  const openLife = (k: OriginK): Life | null => (life && !life.end && life.origin === k ? life : paused[k] && !paused[k]!.end ? paused[k]! : null);
  /** đổi sang một đời khác: đời đang chơi dở của thân phận khác được cất lại */
  const switchTo = (next: Life) => {
    const lives = { ...paused };
    if (life && !life.end && life.origin !== next.origin) lives[life.origin as OriginK] = life;
    delete lives[next.origin as OriginK];
    const m = { ...meta, lives };
    setMeta(m);
    void saveMeta(m);
    setChon(false);
    setAsk(null);
    setOg(null);
    setPro(false);
    keep(next);
  };
  const startNew = (k: OriginK) => {
    const l = newLife(name, k);
    if (k === 'quan') {
      // bà lão chè đổi vai theo kết cục đã mở ở phần cô gái chè
      const got = new Set((meta.cung as string[] | undefined) ?? []);
      const hau = ['e_hoang_hau', 'e_mau_nghi', 'e_nhiep_mau', 'e_nu_de', 'e_thai_phi'].some((x) => got.has(x));
      if (hau) l.flags.push('balao_hau');
      else if (got.has('e_di_tu')) l.flags.push('balao_su');
      // tên bà lão là tên người chơi đã đặt ở phần cô gái chè
      if (typeof meta.cheName === 'string' && meta.cheName) l.flags.push(`balao_ten:${meta.cheName}`);
    }
    switchTo(l);
  };

  const unlock = useCallback(
    (id: string, l: Life) => {
      setFresh(!(meta.cung ?? []).includes(id));
      const cung = Array.from(new Set([...(meta.cung ?? []), id]));
      // ghi nhánh vào cây số phận: chuỗi ngã rẽ đã chọn dẫn tới kết cục này
      const p = (l.marks ?? []).map((x) => `${x.card}.${x.pick}`);
      const old = ((meta.tree as TreePath[] | undefined) ?? []).filter((x) => !(x.e === id && x.p.join('|') === p.join('|')));
      const tree = [...old, { p, e: id, o: l.origin ?? 'dan' }].slice(-120);
      const m = { ...meta, cung, tree, cungLives: (meta.cungLives ?? 0) + 1, ...(l.origin !== 'quan' && l.name ? { cheName: l.name } : {}) };
      setMeta(m);
      void saveMeta(m);
    },
    [meta],
  );

  const card = life?.card ? (() => { const c = cardOf(life.card!); return c ? viewCard(c, life) : null; })() : null;
  // tải trước ảnh nhân vật đang dùng, để đổi nét mặt không bị nháy trắng
  const imgDirs = life ? Object.values(imgsOf(life)).map((x) => x!.dir).join('|') : '';
  useEffect(() => {
    if (!imgDirs) return;
    for (const d of imgDirs.split('|')) for (const m of ['binh', 'vui', 'lo', 'gian', 'buon', 'so', 'dac']) new Image().src = `${d}/${m}.webp`;
  }, [imgDirs]);
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

  /* ---------- trước khi vào đời: chọn thân phận (1/3), đặt tên (2/3), mở màn (3/3) ---------- */
  if (!life || chon) {
    /* bước 3/3, cô gái chè: cảnh cuối uy lực nhất, rồi quay về ba mươi năm trước */
    if (og === 'dan' && pro) {
      return (
        <main className="c-app c-pro">
          <div className="c-band" aria-hidden="true" />
          <TopBar back={{ label: 'Đặt tên', onClick: () => setPro(false) }} title="Mở đầu" step={3} total={3} />
          <div className="c-page">
            <div className="c-pro-art">
              <Scene
                bgImg="/bg/trieu/chieu.webp"
                place="dien"
                time="chieu"
                bg="trieu"
                cast={['me', 'con', 'quan']}
                mood="dac"
                moods={{ quan: 'so', con: 'binh' }}
                imgs={{ me: { dir: '/nv/me4', face: 'r' }, con: { dir: '/nv/con_vua', face: 'l' }, quan: { dir: '/nv/quan', face: 'l' } }}
                looks={{ me: { ...lookOf('me', { robe: '#c49a3a', phuong: 9 }), pattern: 'phuong' }, con: lookOf('con', { king: true }) }}
                label="Sau tấm rèm trúc, người đàn bà đội mũ chín phượng; vua nhỏ ngồi trước rèm, quan đại thần quỳ"
              />
            </div>
            <p className="c-pro-line" style={{ animationDelay: '0.6s' }}>Năm {ERA} thứ ba mươi bảy.</p>
            <p className="c-pro-line" style={{ animationDelay: '1.8s' }}>Trăm quan quỳ kín sân rồng. Trên ngai là một ông vua còn non trẻ. Sau tấm rèm trúc là người thật sự cầm thiên hạ: một người đàn bà đội mũ chín phượng.</p>
            <p className="c-pro-line" style={{ animationDelay: '3.2s' }}>Thục phi đã chết. Hoàng hậu đã bị phế. Thái phó Tôn đã ra pháp trường. Không còn ai dám cuốn tấm rèm này lên.</p>
            <p className="c-pro-line" style={{ animationDelay: '4.8s' }}>Ba mươi năm trước, bà chỉ là một cô gái mười tám tuổi, đứng run trước cổng cung.</p>
            <p className="c-pro-line strong" style={{ animationDelay: '6.2s' }}>Cô gái ấy sẽ ngồi sau tấm rèm này, hay chết trong một cái giếng sau viện. Tất cả tùy vào bạn.</p>
            <button type="button" className="c-btn c-pro-line" style={{ animationDelay: '7.2s' }} onClick={() => startNew('dan')}>
              Quay về ba mươi năm trước
            </button>
            <button type="button" className="c-pro-skip" onClick={() => startNew('dan')}>
              Bỏ qua phần mở đầu ›
            </button>
          </div>
        </main>
      );
    }
    /* bước 1/3: chọn thân phận */
    if (!og) {
      const has = ask ? openLife(ask) : null;
      return (
        <main className="c-app">
          <div className="c-band" aria-hidden="true" />
          <TopBar back={{ label: 'Trang đầu', href: '/' }} title="Chọn thân phận" step={1} total={3} />
          <div className="c-page">
            <h1 className="c-title" style={{ fontSize: 28 }}>
              Bạn vào cung bằng đường nào?
            </h1>
            <p className="c-note" style={{ textAlign: 'center' }}>
              Mỗi thân phận là một câu chuyện riêng: xuất thân khác, chỗ dựa khác, kẻ thù khác.
            </p>
            <div className="c-paths">
              {ORIGINS.map((o) => {
                const cur = o.open ? openLife(o.k) : null;
                return (
                  <button
                    key={o.k}
                    type="button"
                    className="c-path"
                    disabled={!o.open}
                    aria-disabled={!o.open}
                    onClick={() => {
                      if (!o.open) return;
                      if (cur) setAsk(o.k);
                      else (setOg(o.k), setName(DEFAULT_NAME[o.k]), setRoll(0));
                    }}
                  >
                    <b>
                      {o.t}
                      {!o.open ? <em className="c-soon">Đang viết</em> : cur ? <em className="c-go">Đang chơi ›</em> : <em className="c-go">Chọn ›</em>}
                    </b>
                    <span>{o.pitch}</span>
                    <small>
                      {cur
                        ? `${rankOf(cur).t} ${o.ho} thị, ${Math.floor(cur.age)} tuổi`
                        : `Họ ${o.ho} · vào cung làm ${o.k === 'cung' ? 'cung nga' : o.rank === 0 ? 'Tài nhân' : o.rank === 2 ? 'Mỹ nhân' : 'Tiệp dư'}`}
                    </small>
                  </button>
                );
              })}
            </div>
            {ORIGINS.some((x) => !x.open) && <p className="c-note" style={{ textAlign: 'center' }}>Những đường ghi &quot;Đang viết&quot; sẽ mở khi câu chuyện của chúng hoàn thành.</p>}
          </div>
          {ask && has && (
            <div className="c-veil" onClick={() => setAsk(null)}>
              <div className="c-panel c-ask-sheet" role="dialog" aria-modal="true" aria-label={originOf(ask).t} onClick={(e) => e.stopPropagation()}>
                <header>
                  <h2>{originOf(ask).t}</h2>
                  <button type="button" onClick={() => setAsk(null)}>
                    Đóng
                  </button>
                </header>
                <p className="c-note" style={{ padding: '0 16px' }}>
                  Bạn đang sống dở một đời: {rankOf(has).t} {originOf(ask).ho} thị, {Math.floor(has.age)} tuổi, chương {chapOf(has).n}: {chapOf(has).t}.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '4px 16px 8px' }}>
                  <button type="button" className="c-btn" onClick={() => switchTo(has === life ? has : migrate(has))}>
                    Chơi tiếp
                  </button>
                  <button type="button" className="c-btn ghost" onClick={() => { const k = ask; setAsk(null); setOg(k); setName(DEFAULT_NAME[k]); setRoll(0); }}>
                    Chơi lại từ đầu
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      );
    }
    /* bước 2/3: đặt tên */
    const o = originOf(og);
    return (
      <main className="c-app">
        <div className="c-band" aria-hidden="true" />
        <TopBar back={{ label: 'Chọn thân phận', onClick: () => setOg(null) }} title={o.t} step={2} total={3} />
        <div className="c-page">
          <h1 className="c-title" style={{ fontSize: 28 }}>
            {o.k === 'dan' ? 'Kiệu hoa qua cổng thành' : o.k === 'quan' ? 'Viện của chị' : o.k === 'cung' ? 'Ba thúng thóc' : 'Công chúa của triều đã mất'}
          </h1>
          <Scene
            bgImg={`/bg/${o.k === 'quan' ? 'thuphong' : o.place}/${o.k === 'quan' || o.k === 'chua' ? 'dem' : 'chieu'}.webp`}
            place={o.place}
            time={o.k === 'quan' || o.k === 'chua' ? 'dem' : 'chieu'}
            cast={o.k === 'dan' ? ['me', 'meday'] : o.k === 'quan' ? ['me', 'cha'] : o.k === 'cung' ? ['me', 'mama'] : ['me', 'su']}
            imgs={{ cha: { dir: '/nv/cha', face: 'l' }, me: { dir: `/nv/${o.k === 'quan' ? 'hn1' : o.k === 'cung' ? 'cung1' : o.k === 'chua' ? 'chua1' : 'me1'}`, face: 'r' }, meday: { dir: '/nv/meday', face: 'l' }, quan: { dir: '/nv/quan', face: 'l' }, mama: { dir: '/nv/mama', face: 'l' }, su: { dir: '/nv/su', face: 'l' } }}
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
          <button type="button" className="c-btn" onClick={() => (o.k === 'dan' ? setPro(true) : startNew(o.k))}>
            Tiếp: vào câu chuyện
          </button>
        </div>
      </main>
    );
  }

  const rank = rankOf(life);
  const chapter = chapOf(life);

  /* ---------- hết đời: màn mở khóa kết cục ---------- */
  if (life.end && !res) {
    const e = endingOf(life.end)!;
    const art = artOf(e.id);
    const tomb = life.rank >= 5 || life.flags.includes('thai_phi') || life.flags.includes('thai_hau') ? 'tẩm' : 'mộ';
    const got = new Set(meta.cung ?? []);
    const back = (i: number) => {
      setTree(false);
      setFresh(false);
      keep(rewindTo(life, i));
    };
    return (
      <main className="c-app">
        <div className="c-band" aria-hidden="true" />
        <div className="c-page">
          <div className={`c-unlock ${e.dead ? 'dead' : ''}`} key={e.id}>
            <p className="c-unlock-seal">{e.branch ? (fresh ? 'Mở khóa nhánh rẽ' : 'Nhánh rẽ') : fresh ? 'Mở khóa kết cục' : 'Kết cục'}</p>
            <div className="c-unlock-art">
              <Scene
                bgImg={`/bg/${art?.bg ?? art?.place ?? endPlace(e.id, !!e.dead)}/${art?.time ?? 'chieu'}.webp`}
                place={art?.place ?? endPlace(e.id, !!e.dead)}
                time={art?.time ?? 'chieu'}
                cast={art?.cast ?? (e.dead ? [] : ['me'])}
                mood={art?.mood ?? (e.dead ? 'buon' : 'binh')}
                moods={art?.moods}
                motif={art?.motif ?? (e.dead ? 'mo' : undefined)}
                looks={looksOf(life)}
                imgs={imgsOf(life)}
                label={`Kết cục: ${e.name}`}
              />
            </div>
            <p className="c-sub">
              {e.dead ? 'Một cách chết' : e.tone === 'buon' ? 'Một kết buồn' : e.tone === 'vien' ? 'Một kết viên mãn' : 'Một đời người'}
              {e.branch ? ' · ngõ cụt' : ''} · uy lực hạng {[...(isNg(life) ? NGHIEM_ENDINGS : ALL_ENDINGS)].sort((a, b) => (b.tier ?? ENDING_TIER[b.id] ?? 40) - (a.tier ?? ENDING_TIER[a.id] ?? 40)).findIndex((x) => x.id === e.id) + 1}/{(isNg(life) ? NGHIEM_ENDINGS : ALL_ENDINGS).length} · {got.size} kết cục đã mở
            </p>
            <h2 className={e.dead ? 'dead' : ''}>{fillText(e.name, life.origin)}</h2>
            <p className="c-unlock-desc">{fillText(life.endDesc ?? e.desc, life.origin)}</p>
            {art?.story && <p className="c-prose c-unlock-story">{fillText(art.story, life.origin)}</p>}
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
          {e.branch && (
            <p className="c-note" style={{ textAlign: 'center', margin: 0 }}>
              Đây là một nhánh rẽ khỏi đường chính. Quay lại ngã rẽ để chọn đường khác và đi tiếp câu chuyện.
            </p>
          )}
          <div className="c-row">
            {(life.marks?.length || life.back) && (
              <button type="button" className="c-btn" onClick={() => (setFresh(false), keep(rewind(life)))}>
                {(() => {
                  const m = life.marks?.[life.marks.length - 1];
                  const c = m ? cardOf(m.card) : null;
                  return c ? `Quay lại ngã rẽ: ${fillText(c.title, life.origin)}` : 'Quay lại ngã rẽ gần nhất';
                })()}
              </button>
            )}
          </div>
          <div className="c-row">
            <button type="button" className="c-btn ghost" onClick={() => setTree((v) => !v)} aria-expanded={tree}>
              {tree ? 'Đóng cây số phận' : 'Cây số phận: chọn lại từ ngã rẽ khác'}
            </button>
          </div>
          {tree && (
            <section className="c-treebox" aria-label="Cây số phận">
              <h3>Ngã rẽ của đời này</h3>
              <LifeMarks life={life} onRewind={back} />
              <h3>Cây kết cục của mọi đời</h3>
              <FateTree paths={(meta.tree as TreePath[] | undefined) ?? []} life={life} />
            </section>
          )}
          <div className="c-row">
            <button type="button" className="c-btn ghost" onClick={() => (setFresh(false), keep(null))}>
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

  /* ---------- màn chương: tổng kết chương vừa qua, mở màn chương mới ---------- */
  if (life.showCh && !res && !life.tales?.[0]?.skip) {
    const sc = life.showCh;
    const next = chapOf(life, sc.to);
    const prevCh = sc.from ? chapOf(life, sc.from.ch) : null;
    const go = () => keep({ ...life, showCh: undefined });
    const ng = isNg(life);
    const REL: NumK[] = ng ? ['vua', 'cha', 'thaihau', 'hoanghau', 'thucphi', 'hanh', 'phuc'] : ['vua', 'thaihau', 'hoanghau', 'thucphi', 'hanh', 'phuc', 'quan', 'tuong'];
    const NG_REL: Partial<Record<NumK, [CastK, string]>> = { vua: ['vua', 'Hoàng thượng'], cha: ['cha', 'Cha'], thaihau: ['thaihau', 'Thái hậu'], hoanghau: ['hoanghau', 'Hoàng hậu'], thucphi: ['uyennhu', 'Quý phi Hà'], hanh: ['luavang', 'Lụa Vàng'], phuc: ['kiem', 'Chưởng sự Kiệm'] };
    const STAT: NumK[] = ['duc', 'sac', 'the', 'an', 'muu'];
    const looks = looksOf(life);
    return (
      <main className="c-app">
        <div className="c-band" aria-hidden="true" />
        <div className="c-page c-chap">
          {sc.from && sc.end && prevCh && (
            <section className="c-recap" aria-label={`Tổng kết chương ${prevCh.n}`}>
              <p className="c-sub">Hết chương {NUM_HOI[prevCh.n] ?? prevCh.n} · {prevCh.t}</p>
              <p className="c-note" style={{ textAlign: 'center' }}>
                {Math.floor(sc.from.age)} tuổi đến {Math.floor(sc.end.age)} tuổi · {sc.from.rank === sc.end.rank ? `vẫn là ${sc.end.rank}` : `${sc.from.rank} lên ${sc.end.rank}`}
                {sc.end.kids > sc.from.kids ? ` · thêm ${sc.end.kids - sc.from.kids} đứa con` : ''}
              </p>
              <div className="c-recap-stats">
                {STAT.map((k) => {
                  const d = sc.end!.n[k] - sc.from!.n[k];
                  return (
                    <div key={k}>
                      <span>{NUM_LABEL[k]}</span>
                      <b>{sc.end!.n[k]}</b>
                      <em className={d > 0 ? 'up' : d < 0 ? 'down' : ''}>{d > 0 ? `+${d}` : d < 0 ? d : '='}</em>
                    </div>
                  );
                })}
              </div>
              {sc.end.riv && (
                <>
                  <h3>Mối nguy</h3>
                  <div className="c-recap-riv">
                    {RIVALS.filter((x) => sc.end!.riv![x.k] && sc.end!.riv![x.k].st !== 'an').map((x) => {
                      const a = sc.from?.riv?.[x.k];
                      const b = sc.end!.riv![x.k];
                      const changed = a && a.st !== b.st;
                      return (
                        <div key={x.k} className={changed ? 'big' : ''}>
                          <RivalFace life={life} k={x.k} r={b} />
                          <b>{x.t}</b>
                          <small>
                            {changed ? (
                              <>
                                {RIV_ST[a!.st]}, nay <i className={gone(b.st) ? 'up' : 'down'}>{RIV_ST[b.st]}</i>
                              </>
                            ) : gone(b.st) ? (
                              RIV_ST[b.st]
                            ) : (
                              <>
                                Uy hiếp {b.th}
                                {a && a.st !== 'an' && b.th !== a.th ? <i className={b.th < a.th ? 'up' : 'down'}> ({b.th > a.th ? '+' : ''}{b.th - a.th})</i> : null}
                              </>
                            )}
                          </small>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              <h3>Lòng người đổi thay</h3>
              <div className="c-recap-rel">
                {REL.map((k) => {
                  const a = sc.from!.n[k];
                  const b = sc.end!.n[k];
                  const d = b - a;
                  const ck = ng ? NG_REL[k]![0] : (k as CastK);
                  return (
                    <div key={k} className={Math.abs(d) >= 8 ? 'big' : ''}>
                      <FaceImg dir={faceDir(ck, life)} size={54} mood={b >= 30 ? 'vui' : b <= -30 ? 'gian' : d <= -8 ? 'lo' : 'binh'} />
                      <b>{ng ? NG_REL[k]![1] : k === 'vua' ? 'Hoàng thượng' : NUM_LABEL[k]}</b>
                      <small>
                        {feelOf(k, a) === feelOf(k, b) ? (
                          <>
                            {feelOf(k, b)} <i className={d > 0 ? 'up' : d < 0 ? 'down' : ''}>{d ? `(${d > 0 ? '+' : ''}${d})` : ''}</i>
                          </>
                        ) : (
                          <>
                            {feelOf(k, a)}, nay <i className={d > 0 ? 'up' : 'down'}>{feelOf(k, b)}</i>
                          </>
                        )}
                      </small>
                    </div>
                  );
                })}
              </div>
              {!!sc.picks?.length && (
                <>
                  <h3>Những việc đã làm</h3>
                  <ul className="c-recap-picks">
                    {sc.picks.slice(-6).map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}
          <section className="c-chapter-open" key={next.n}>
            <p className="c-chapter-no">Chương {NUM_HOI[next.n] ?? next.n}</p>
            <h1 className="c-title">{next.t}</h1>
            <p className="c-chapter-epi">{next.epi}</p>
            <p className="c-chapter-hook">{next.hook}</p>
            {!!life.focus?.length && life.riv && (
              <div className="c-chapter-foe">
                <small>Kẻ thù của chương này</small>
                <span>
                  {life.focus.map((k) => (
                    <span key={k}>
                      <RivalFace life={life} k={k} r={life.riv![k]} size={46} />
                      <b>{RIVALS.find((x) => x.k === k)?.t}</b>
                    </span>
                  ))}
                </span>
                {alliesOf(life).map((p) => (
                  <small key={p.join()} className="ally">
                    {RIVALS.find((x) => x.k === p[0])?.t} đã liên thủ với {RIVALS.find((x) => x.k === p[1])?.t}
                  </small>
                ))}
              </div>
            )}
          </section>
          <button type="button" className="c-btn" onClick={go}>
            Vào chương {NUM_HOI[next.n] ?? next.n}
          </button>
        </div>
      </main>
    );
  }

  if (life.tales?.length && !res && (!life.showCh || life.tales[0].skip) && !life.end) {
    const tl = life.tales[0];
    const tc = tl.card ? cardOf(tl.card) : null;
    const rv = tl.riv ? RIVALS.find((x) => x.k === tl.riv) : null;
    const scene = tl.s
      ? { place: 'vien' as PlaceK, time: tl.s.time, cast: tl.s.cast, img: tl.s.bg, rain: tl.s.rain }
      : tc
        ? { place: tc.place, time: tc.time ?? 'ngay', cast: tc.cast.filter((c) => c !== 'me').slice(0, 2) as CastK[], img: tc.img ?? bgOf(tc) ?? tc.place, rain: false }
        : { place: 'vien' as PlaceK, time: 'chieu' as const, cast: rv ? [rv.cast as CastK] : ([] as CastK[]), img: 'vien', rain: false };
    const go = () => keep({ ...life, tales: life.tales!.slice(1) });
    const skipAll = () => keep({ ...life, tales: life.tales!.filter((x) => !x.skip) });
    const base = imgsOf(life);
    const timgs = { ...base, ...Object.fromEntries(Object.entries(tl.s?.imgs ?? {}).map(([k, d]) => [k, { dir: `/nv/${d}`, face: k === 'me' ? 'r' : 'l' }])) } as Partial<Record<CastK, CastImg>>;
    return (
      <main className="c-app c-tale">
        <div className="c-band" aria-hidden="true" />
        {tl.skip && <TopBar back={{ label: 'Chọn thân phận', onClick: () => setChon(true) }} title="Mở đầu" step={3} total={3} />}
        <div className="c-page">
          <p className="c-tale-kicker">{tl.kicker ?? 'Lời kể'}</p>
          <h2 className="c-tale-title">{tl.t}</h2>
          <div className="c-tale-art">
            <Scene bgImg={`/bg/${scene.img}/${scene.rain ? 'mua' : scene.time}.webp`} place={scene.place} time={scene.time} cast={scene.cast} rain={scene.rain} mood={rv ? 'buon' : 'binh'} moods={tl.s?.moods} looks={looksOf(life)} imgs={timgs} label={tl.t} />
            {tl.s?.prop && <img className={`c-tale-prop p-${tl.s.prop}`} src={`/prop/${tl.s.prop}.webp`} alt="" />}
          </div>
          {tl.lines.map((x, i) => (
            <p key={i} className={`c-tale-line ${i === 0 ? 'c-tale-drop' : ''}`} style={{ animationDelay: `${0.3 + i * 0.9}s` }}>
              {x}
            </p>
          ))}
          <button type="button" className="c-btn c-tale-line" style={{ animationDelay: `${0.3 + tl.lines.length * 0.9}s` }} onClick={go}>
            Đọc tiếp
          </button>
          {tl.skip && life.tales.filter((x) => x.skip).length > 1 && (
            <button type="button" className="c-btn ghost c-tale-line" style={{ animationDelay: '0.3s' }} onClick={skipAll}>
              Bỏ qua phần mở đầu
            </button>
          )}
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
    if (r.life.end) unlock(r.life.end, r.life);
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
            {eraOf(life)} năm {yearOf(life)}
          </small>
          <small>{chapter.t}</small>
        </div>
      </div>
      <div className="c-stats">{(['duc', 'sac', 'the', 'an', 'muu'] as NumK[]).map(stat)}</div>
      {isNg(life) ? <SoAnStrip life={life} onOpen={() => setSoan(true)} /> : <ThreatStrip life={life} onOpen={() => setBook(true)} />}

      {card && (
        <>
          <div className="c-scenebox" key={`s${card.id}${life.seen.length}`}>
            <Scene bgImg={`/bg/${card.img ?? bgOf(card) ?? card.place}/${rainOf(card) ? 'mua' : card.time ?? 'ngay'}.webp`} place={card.place} time={card.time ?? 'ngay'} cast={card.cast} looks={looksOf(life)} mood={card.mood} moods={card.moods} names={namesOf(card, life)} imgs={imgsOf(life)} bg={bgOf(card)} season={seasonOf(card, life)} rain={rainOf(card)} wind={windOf(card)} label={fillText(`${card.title}. ${card.text.join(' ')}`, life.origin)} />
          </div>
          {!res && (
            <>
              <p className="c-bridge c-in">{bridgeOf(card, life)}</p>
              <div className="c-scroll c-unroll" key={`d${card.id}${life.seen.length}`}>
                <div className="c-roll" />
                <div className="c-sheet">
                  <div className="c-tag">
                    <span>{card.who && card.who !== 'me' ? (card.whoName ?? (card.who === 'meday' ? cap(originOf(life.origin).me) : (isNg(life) ? NG_CAST_NAME[card.who] : undefined) ?? CAST_NAME[card.who])) : fillText(card.title, life.origin)}</span>
                    {card.who && card.who !== 'me' && <small>{fillText(card.title, life.origin)}</small>}
                  </div>
                  {card.lead && <p className="c-lead">{fillText(card.lead, life.origin)}</p>}
                  {card.text.map((t, i) => (
                    <p key={i} className="c-text" style={i ? { fontWeight: 500, fontSize: 15.5 } : undefined}>
                      {fillText(t, life.origin)}
                    </p>
                  ))}
                  {(card.big || life.chain?.kind === 'big') && <div className="c-seal c-in">Ngã<br />rẽ</div>}
                </div>
                <div className="c-roll" />
              </div>
              <p className="c-ask c-in">
                Năm {eraOf(life)} thứ {yearOf(life)}. Bạn sẽ làm gì?
              </p>
              <div className="c-choices c-in" key={`c${card.id}${life.seen.length}`}>
                {opts
                  .map((o, i) => ({ ...o, i }))
                  // Con tin họ Nghiêm: lựa chọn bị khóa vì đã xử sai người thì ẩn hẳn, không để lộ là đã xử sai
                  .filter(({ c, open }) => open || !(isNg(life) && c.need?.not?.some((f) => f.endsWith('_nang') && life.flags.includes(f))))
                  .map(({ c, open, i }, j) => (
                  <button key={i} type="button" className="c-opt" disabled={!open} onClick={() => pick(i)}>
                    <b>{ROMAN[j]}</b>
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
        {isNg(life) && (
          <button type="button" onClick={() => setSoan(true)}>
            Sổ án
          </button>
        )}
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

      {soan && (
        <div className="c-veil" onClick={() => setSoan(false)}>
          <div className="c-panel c-soan" role="dialog" aria-modal="true" aria-label="Sổ án" onClick={(e) => e.stopPropagation()}>
            <header>
              <h2>Sổ án</h2>
              <button type="button" onClick={() => setSoan(false)}>
                Đóng
              </button>
            </header>
            <SoAn
              life={life}
              faceOf={(k) => faceDir(k, life)}
              onDoubt={(id) => {
                // nghi một manh mối tốn một lượt dò của vụ; thôi nghi không trả lại lượt
                const nx = doubt(life, id);
                if (nx) keep(nx);
              }}
            />
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
            {!isNg(life) && (
              <section>
                <h3>Bàn cờ mối nguy</h3>
                <ThreatBoard life={life} />
              </section>
            )}
            <section>
              <h3>Lòng người</h3>
              <div className="c-rel">
                {isNg(life)
                  ? ([['vua', 'Hoàng thượng'], ['cha', 'Cha'], ['thaihau', 'Thái hậu'], ['hoanghau', 'Hoàng hậu'], ['thucphi', 'Quý phi Hà'], ['hanh', 'Lụa Vàng'], ['phuc', 'Chưởng sự Kiệm']] as [NumK, string][]).map(([k, t]) => <FragmentRow key={k} label={t} v={life.n[k]} feel={feelOf(k, life.n[k])} />)
                  : (['vua', 'thaihau', 'hoanghau', 'thucphi', 'hanh', 'phuc', 'quan', 'tuong'] as NumK[]).map((k) => (
                      <FragmentRow key={k} label={k === 'vua' ? 'Hoàng thượng' : NUM_LABEL[k]} v={life.n[k]} feel={feelOf(k, life.n[k])} />
                    ))}
              </div>
            </section>
            <section>
              <h3>Cây số phận</h3>
              <LifeMarks life={life} onRewind={(i) => (setBook(false), setRes(null), keep(rewindTo(life, i)))} />
              <details className="c-treefold">
                <summary>Cây kết cục của mọi đời</summary>
                <FateTree paths={(meta.tree as TreePath[] | undefined) ?? []} life={life} />
              </details>
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

/** chân dung nhỏ một mối nguy, mờ đi khi đã bị diệt */
function faceDir(k: CastK, l?: Life | null): string {
  return (l && imgsOf(l)[k]?.dir) || `/nv/${k}`;
}
function FaceImg({ dir, mood, size, className = '' }: { dir: string; mood: MoodK; size: number; className?: string }) {
  return (
    <span className={`c-rface ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <img src={`${dir}/f_${mood}.webp`} alt="" width={size} height={size} />
    </span>
  );
}
function RivalFace({ k, r, size = 44, life }: { k: RivalK; r: RivalState; size?: number; life?: Life | null }) {
  const def = RIVALS.find((x) => x.k === k)!;
  const out = gone(r.st);
  return (
    <span className="c-rface-wrap" style={{ width: size, height: size }}>
      <FaceImg dir={faceDir(def.cast, life)} size={size} className={`${out ? 'out' : ''} ${r.st}`} mood={out ? (r.st === 'phuc' ? 'lo' : 'buon') : r.th >= 70 ? 'dac' : r.th >= 40 ? 'gian' : 'lo'} />
      {r.st === 'chet' && (
        <svg viewBox="0 0 10 10" className="c-rface-x" aria-hidden="true">
          <path d="M1 1 L9 9 M9 1 L1 9" stroke="#a8281d" strokeWidth="1" opacity="0.8" />
        </svg>
      )}
    </span>
  );
}

/** dải mối nguy dưới chỉ số: ai còn chắn đường, ai đã ngã */
function ThreatStrip({ life, onOpen }: { life: Life; onOpen: () => void }) {
  const rv = life.riv;
  if (!rv) return null;
  const shown = RIVALS.filter((x) => !x.of && rv[x.k] && rv[x.k].st !== 'an');
  const focus = life.focus ?? [];
  const hau = rv.hoanghau;
  const crowned = life.flags.includes('hoang_hau');
  return (
    <button type="button" className="c-threats" onClick={onOpen} aria-label="Bàn cờ mối nguy">
      <span className="c-threats-goal">{crowned ? 'Bạn đã là Hoàng hậu' : gone(hau.st) ? 'Ngôi hậu đang bỏ trống' : 'Đường lên ngôi hậu'}</span>
      <span className="c-threats-row">
        {shown.map((x) => {
          const r = rv[x.k];
          return (
            <span key={x.k} className={`c-threat ${gone(r.st) ? 'out' : ''} ${focus.includes(x.k) && !gone(r.st) ? 'focus' : ''}`}>
              <RivalFace life={life} k={x.k} r={r} size={30} />
              <i>
                <em style={{ width: `${gone(r.st) ? 0 : r.th}%` }} />
              </i>
            </span>
          );
        })}
      </span>
    </button>
  );
}

/** bàn cờ mối nguy đầy đủ (trong Sổ hậu cung) */
function ThreatBoard({ life }: { life: Life }) {
  const rv = life.riv;
  if (!rv) return null;
  const allies = alliesOf(life);
  const focus = life.focus ?? [];
  const nameOf = (k: RivalK) => RIVALS.find((y) => y.k === k)?.t ?? k;
  return (
    <div className="c-board">
      {RIVALS.filter((x) => !x.of).flatMap((x) => [x, ...RIVALS.filter((y) => y.of === x.k)]).map((x) => {
        const r = rv[x.k];
        if (!r) return null;
        return (
          <div key={x.k} className={`c-board-row ${gone(r.st) ? 'out' : ''} ${r.st === 'an' ? 'hide' : ''} ${x.of ? 'guard' : ''}`}>
            {r.st === 'an' ? <span className="c-board-q">?</span> : <RivalFace life={life} k={x.k} r={r} />}
            <div>
              <b>
                {r.st === 'an' ? 'Chưa lộ mặt' : x.t} <small>{r.st === 'an' ? `từ chương ${x.from}` : RIV_ST[r.st]}</small>
              </b>
              {r.st !== 'an' && <span className="c-note">{x.d}</span>}
              {r.st !== 'an' && !gone(r.st) && (
                <span className="c-board-tags">
                  {focus.includes(x.k) && <em className="focus">Kẻ thù chương này</em>}
                  {x.of && <em>Vây cánh của {nameOf(x.of)}</em>}
                  {guardsOf(x.k).filter((g) => !gone(rv[g].st) && rv[g].st !== 'an').map((g) => (
                    <em key={g}>Còn được {nameOf(g)} che chở</em>
                  ))}
                  {allies.filter((p) => p.includes(x.k)).map((p) => (
                    <em key={p.join()} className="ally">Liên thủ với {nameOf(p[0] === x.k ? p[1] : p[0])}</em>
                  ))}
                </span>
              )}
              {r.st !== 'an' && !gone(r.st) && (
                <span className="c-board-bars">
                  <span>
                    Uy hiếp <i className="th"><em style={{ width: `${r.th}%` }} /></i>
                  </span>
                  <span>
                    Thóp nắm được <i className="ev"><em style={{ width: `${r.ev}%` }} /></i>
                  </span>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
