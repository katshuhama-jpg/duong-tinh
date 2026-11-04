/**
 * Tranh cảnh kiểu Hàng Trống trên nền lụa: nét đen mảnh, màu phẳng, khung vàng son.
 * Cảnh nền theo chỗ (viện, phòng, vườn, điện, chùa, làng, lăng) và giờ (ngày, chiều, đêm);
 * nhân vật dựng từ một khung người chung, đổi áo, mũ, tóc theo vai.
 */
import type { CastK, MoodK, PlaceK, TimeK } from '@/lib/cung/types';

const INK = '#2a1d14';
const GOLD = '#d9a441';
const GOLD2 = '#b8892d';
const SON = '#a8281d';

export interface Look {
  robe: string;
  collar?: string;
  hat: 'bun' | 'phuong' | 'khanvan' | 'xungthien' | 'canhchuon' | 'mutuong' | 'troc' | 'khanmo' | 'khantg' | 'tre';
  phuong?: number;
  grey?: boolean;
  beard?: boolean;
  sly?: boolean;
  scale?: number;
  skin?: string;
  pants?: string;
}

/** dáng mặc định của từng vai */
export function lookOf(k: CastK, o: { robe?: string; phuong?: number; old?: boolean; king?: boolean } = {}): Look {
  switch (k) {
    case 'me':
      return { robe: o.robe ?? '#4f7f8a', collar: GOLD2, hat: o.phuong ? 'phuong' : 'bun', phuong: o.phuong, grey: o.old };
    case 'thucphi':
      return { robe: '#6b4a92', collar: GOLD, hat: 'phuong', phuong: 5, sly: true, grey: o.old };
    case 'hoanghau':
      return { robe: '#c49a3a', collar: SON, hat: 'phuong', phuong: 9, grey: o.old };
    case 'thaihau':
      return { robe: '#b8892d', collar: SON, hat: 'phuong', phuong: 9, grey: true };
    case 'mama':
      return { robe: '#6a4a36', collar: '#3e281a', hat: 'khanvan', grey: true, scale: 0.92 };
    case 'hanh':
      return { robe: '#7fa3b0', collar: '#e8dcc0', hat: 'bun', scale: 0.86, grey: o.old };
    case 'cungnu':
      return { robe: '#9db08a', collar: '#e8dcc0', hat: 'bun', scale: 0.86 };
    case 'vua':
      return { robe: '#d9a441', collar: SON, hat: 'xungthien', beard: true };
    case 'quan':
      return { robe: '#2f4f6c', collar: GOLD2, hat: 'canhchuon', beard: true, grey: true };
    case 'tuong':
      return { robe: '#7a2016', collar: '#4a3022', hat: 'mutuong', beard: true };
    case 'phuc':
      return { robe: '#4a6fa5', collar: '#f1ead8', hat: 'khantg', scale: 0.9, pants: '#f1ead8' };
    case 'su':
      return { robe: '#7a5a3a', collar: '#5a3a22', hat: 'troc', grey: true, scale: 0.92 };
    case 'meday':
      return { robe: '#6e5a3e', collar: '#3a2a20', hat: 'khanmo', grey: true, scale: 0.92 };
    case 'ngoai':
      return { robe: '#3a5a4a', collar: '#c49a3a', hat: 'mutuong', beard: true };
    case 'con':
      return { robe: o.king ? '#d9a441' : '#c84a35', collar: GOLD2, hat: 'tre', scale: 0.62 };
  }
}

/** một người, đứng ở hoành độ x, chân chạm đáy tranh */
export function Person({ x, look, flip = false, blink = false, mood = 'binh' }: { x: number; look: Look; flip?: boolean; blink?: boolean; mood?: MoodK }) {
  const s = look.scale ?? 1;
  const skin = look.skin ?? '#f1d2b3';
  const hair = look.grey ? '#cfc6b8' : '#1d1410';
  return (
    <g transform={`translate(${x} 304) scale(${flip ? -s : s} ${s})`}>
      {/* thân áo */}
      <path d="M-70 0 Q-68 -60 0 -74 Q68 -60 70 0 Z" fill={look.robe} stroke={INK} strokeWidth="1.2" />
      <path d="M-62 0 Q-56 -40 -32 -58 M62 0 Q56 -40 32 -58" fill="none" stroke={INK} strokeWidth="1" opacity="0.5" />
      {look.pants && <path d="M-22 0 L-18 -12 L18 -12 L22 0 Z" fill={look.pants} stroke={INK} strokeWidth="0.8" />}
      {/* cổ áo */}
      <path d="M-34 -70 L0 -28 L34 -70 Q18 -77 0 -77 Q-18 -77 -34 -70 Z" fill={look.collar ?? GOLD2} stroke={INK} strokeWidth="1" />
      <path d="M-26 -68 L0 -38 L26 -68" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.7" />
      {look.hat === 'xungthien' && <circle cx="0" cy="-20" r="9" fill="none" stroke={SON} strokeWidth="2" />}
      {look.hat === 'mutuong' && <path d="M-50 -46 L50 -46 M-46 -30 L46 -30" stroke={GOLD2} strokeWidth="2" />}
      {/* cổ và mặt */}
      <rect x="-9" y="-98" width="18" height="24" fill={skin} stroke={INK} strokeWidth="0.8" />
      <ellipse cx="0" cy="-118" rx="25" ry="29" fill={skin} stroke={INK} strokeWidth="1.1" />
      {/* tóc hai bên */}
      {look.hat !== 'troc' && <path d="M-26 -114 Q-28 -150 0 -152 Q28 -150 26 -114 Q22 -138 0 -141 Q-22 -138 -26 -114 Z" fill={hair} stroke={INK} strokeWidth="0.8" />}
      <Face look={look} mood={mood} blink={blink} />
      {look.beard && <path d="M-6 -92 Q0 -80 6 -92 M-12 -99 Q-16 -94 -14 -90 M12 -99 Q16 -94 14 -90" fill="none" stroke={look.grey ? '#9a9088' : INK} strokeWidth="1.2" />}
      {/* mũ, khăn, búi */}
      {look.hat === 'bun' && (
        <g>
          <ellipse cx="0" cy="-152" rx="16" ry="10" fill={hair} stroke={INK} strokeWidth="0.8" />
          <path d="M-20 -150 L24 -160" stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="25" cy="-160" r="3.6" fill={SON} stroke={GOLD} strokeWidth="0.8" />
        </g>
      )}
      {look.hat === 'phuong' && (
        <g>
          <path d="M-28 -140 Q-30 -170 0 -174 Q30 -170 28 -140 Q14 -150 0 -150 Q-14 -150 -28 -140 Z" fill={GOLD} stroke={INK} strokeWidth="1" />
          <path d="M-28 -140 Q0 -132 28 -140" fill="none" stroke={SON} strokeWidth="2" />
          {Array.from({ length: Math.max(1, look.phuong ?? 1) }).map((_, i, a) => {
            const t = a.length === 1 ? 0 : i / (a.length - 1) - 0.5;
            const px = t * 44;
            const py = -158 - (0.25 - t * t) * 22;
            return (
              <g key={i} transform={`translate(${px} ${py})`}>
                <path d="M0 -6 Q5 -2 0 4 Q-5 -2 0 -6 Z" fill={SON} stroke={INK} strokeWidth="0.5" />
                <path d="M0 4 Q4 8 8 7 M0 4 Q-4 8 -8 7" fill="none" stroke={GOLD2} strokeWidth="0.9" />
              </g>
            );
          })}
          <path d="M-30 -144 L-34 -120 M30 -144 L34 -120" stroke={GOLD} strokeWidth="1.2" />
          <circle cx="-34" cy="-118" r="2" fill={SON} /><circle cx="34" cy="-118" r="2" fill={SON} />
        </g>
      )}
      {look.hat === 'khanvan' && (
        <g>
          <path d="M-28 -136 Q0 -168 28 -136 Q16 -146 0 -146 Q-16 -146 -28 -136 Z" fill="#2a1d14" stroke={INK} strokeWidth="0.8" />
          <path d="M-28 -140 H28 M-26 -146 H26" stroke="#4a382c" strokeWidth="1.2" />
        </g>
      )}
      {look.hat === 'khanmo' && <path d="M-32 -126 Q-30 -160 0 -162 Q30 -160 32 -126 L22 -134 Q0 -146 -22 -134 Z M0 -162 L4 -172 L8 -160" fill="#3a2a20" stroke={INK} strokeWidth="0.8" />}
      {look.hat === 'khantg' && <path d="M-34 -136 Q-28 -166 0 -166 Q28 -166 34 -136 Q0 -150 -34 -136 Z" fill="#1f2a3a" stroke={INK} strokeWidth="0.8" />}
      {look.hat === 'xungthien' && (
        <g>
          <path d="M-24 -142 L-22 -172 Q0 -182 22 -172 L24 -142 Q0 -150 -24 -142 Z" fill="#2a1d14" stroke={INK} strokeWidth="1" />
          <path d="M-20 -166 Q0 -176 20 -166" fill="none" stroke={GOLD} strokeWidth="1.6" />
          <circle cx="0" cy="-158" r="4" fill={GOLD} stroke={SON} strokeWidth="1" />
          <path d="M14 -170 Q28 -186 34 -176 Q26 -176 22 -166 M-14 -170 Q-28 -186 -34 -176 Q-26 -176 -22 -166" fill="none" stroke={GOLD} strokeWidth="1.8" />
        </g>
      )}
      {look.hat === 'canhchuon' && (
        <g>
          <path d="M-22 -140 L-20 -166 Q0 -174 20 -166 L22 -140 Q0 -148 -22 -140 Z" fill="#1d1410" stroke={INK} strokeWidth="1" />
          <ellipse cx="-34" cy="-150" rx="14" ry="5" fill="#1d1410" transform="rotate(-12 -34 -150)" />
          <ellipse cx="34" cy="-150" rx="14" ry="5" fill="#1d1410" transform="rotate(12 34 -150)" />
        </g>
      )}
      {look.hat === 'mutuong' && (
        <g>
          <path d="M-28 -134 Q-30 -172 0 -176 Q30 -172 28 -134 Q0 -144 -28 -134 Z" fill="#5a3a22" stroke={INK} strokeWidth="1" />
          <path d="M0 -176 L0 -192" stroke={SON} strokeWidth="3" />
          <path d="M-30 -138 Q-36 -120 -30 -110 M30 -138 Q36 -120 30 -110" fill="none" stroke="#5a3a22" strokeWidth="5" />
        </g>
      )}
      {look.hat === 'troc' && <ellipse cx="0" cy="-138" rx="25" ry="16" fill={skin} stroke={INK} strokeWidth="1" />}
      {look.hat === 'tre' && <g><circle cx="-14" cy="-150" r="7" fill={hair} /><circle cx="14" cy="-150" r="7" fill={hair} /></g>}
      {look.hat === 'troc' && <g fill="#3a2a20">{[-30, -20, -10, 0, 10, 20, 30].map((d) => <circle key={d} cx={d} cy={-60 + Math.abs(d) * 0.3} r="2.6" />)}</g>}
    </g>
  );
}


/** mắt, mày, mũi, miệng theo nét mặt */
function Face({ look, mood, blink }: { look: Look; mood: MoodK; blink: boolean }) {
  const w = { fill: 'none', stroke: INK, strokeLinecap: 'round' as const };
  const lip = look.beard ? INK : SON;
  const lw = look.beard ? 1.3 : 2.2;
  // mắt
  let eyes;
  if (mood === 'vui') eyes = <path d="M-16 -116 Q-10 -121 -4 -116 M4 -116 Q10 -121 16 -116" {...w} strokeWidth="2" />;
  else if (mood === 'buon') eyes = <path d="M-16 -118 Q-10 -114 -4 -117 M4 -117 Q10 -114 16 -118" {...w} strokeWidth="2" />;
  else if (mood === 'dac' || (look.sly && mood !== 'so')) eyes = <path d="M-16 -118 L-5 -116 M5 -116 L16 -118" {...w} strokeWidth="2" />;
  else if (mood === 'so')
    eyes = (
      <g>
        <ellipse cx="-10" cy="-117" rx="3.6" ry="4.2" fill="#fff" stroke={INK} strokeWidth="1" />
        <ellipse cx="10" cy="-117" rx="3.6" ry="4.2" fill="#fff" stroke={INK} strokeWidth="1" />
        <circle cx="-10" cy="-117" r="1.6" fill={INK} />
        <circle cx="10" cy="-117" r="1.6" fill={INK} />
      </g>
    );
  else
    eyes = (
      <g fill={INK}>
        <ellipse cx="-10" cy="-117" rx="2.6" ry={mood === 'gian' ? 1.8 : 2.6} />
        <ellipse cx="10" cy="-117" rx="2.6" ry={mood === 'gian' ? 1.8 : 2.6} />
      </g>
    );
  // mày
  const brow =
    mood === 'gian'
      ? 'M-17 -128 L-4 -123 M4 -123 L17 -128'
      : mood === 'lo' || mood === 'buon'
        ? 'M-16 -124 Q-10 -125 -4 -129 M4 -129 Q10 -125 16 -124'
        : mood === 'so'
          ? 'M-16 -128 Q-10 -133 -4 -129 M4 -129 Q10 -133 16 -128'
          : 'M-15 -125 Q-10 -128 -5 -126 M5 -126 Q10 -128 15 -125';
  // miệng
  const mouth =
    mood === 'vui'
      ? 'M-7 -98 Q0 -92 7 -98'
      : mood === 'dac'
        ? 'M-6 -97 Q2 -96 7 -100'
        : mood === 'lo'
          ? 'M-5 -96 Q0 -98 5 -96'
          : mood === 'buon' || mood === 'gian'
            ? 'M-6 -95 Q0 -100 6 -95'
            : 'M-5 -97 Q0 -96 5 -97';
  return (
    <g>
      <g className={blink && mood !== 'vui' && mood !== 'buon' ? 'c-blink' : undefined}>{eyes}</g>
      <path d={brow} {...w} strokeWidth={mood === 'gian' ? 1.8 : 1.1} />
      <path d="M0 -112 L-2 -104 L1 -103" fill="none" stroke="#c99a7a" strokeWidth="1" />
      {mood === 'so' ? <ellipse cx="0" cy="-97" rx="3" ry="3.6" fill="#7a2a22" stroke={INK} strokeWidth="0.8" /> : <path d={mouth} {...w} stroke={lip} strokeWidth={lw} />}
      {!look.beard && (mood === 'vui' || mood === 'dac') && (
        <g fill="#e9a6a0" opacity="0.5">
          <circle cx="-15" cy="-106" r="4" />
          <circle cx="15" cy="-106" r="4" />
        </g>
      )}
      {mood === 'gian' && !look.beard && (
        <g fill="#d9735e" opacity="0.35">
          <circle cx="-15" cy="-107" r="5" />
          <circle cx="15" cy="-107" r="5" />
        </g>
      )}
      {mood === 'buon' && (
        <g className="c-tear" fill="#9cc3d6" stroke="#5f8ea6" strokeWidth="0.5">
          <path d="M-12 -112 Q-14 -106 -12 -104 Q-10 -106 -12 -112 Z" />
          <path d="M12 -112 Q10 -106 12 -104 Q14 -106 12 -112 Z" />
        </g>
      )}
      {mood === 'lo' && <path d="M19 -132 Q22 -126 19 -124 Q16 -126 19 -132 Z" fill="#cfe3ec" stroke="#5f8ea6" strokeWidth="0.5" />}
    </g>
  );
}

/* ---------- cảnh nền ---------- */
function Sky({ time }: { time: TimeK }) {
  const bg = time === 'dem' ? '#2c3550' : time === 'chieu' ? '#e8cfa0' : '#ecdcb6';
  const band = time === 'dem' ? '#3a4566' : time === 'chieu' ? '#e2bf88' : '#e4d0a4';
  return (
    <g>
      <rect x="0" y="0" width="390" height="312" fill={bg} />
      <rect x="0" y="0" width="390" height="312" fill="url(#c-silk)" opacity={time === 'dem' ? 0.25 : 0.6} />
      <rect x="0" y="0" width="390" height="44" fill={band} />
      {time === 'dem' ? (
        <g>
          <circle cx="320" cy="48" r="20" fill="#f3e6c0" />
          <circle className="c-halo" cx="320" cy="48" r="28" fill="none" stroke="#f3e6c0" strokeWidth="0.8" opacity="0.5" />
          <g fill="#f3e6c0" opacity="0.7"><circle cx="40" cy="30" r="1" /><circle cx="120" cy="18" r="0.8" /><circle cx="200" cy="34" r="1" /><circle cx="250" cy="14" r="0.8" /></g>
        </g>
      ) : (
        <g>
          <circle cx="320" cy="50" r="24" fill={time === 'chieu' ? '#f0c27a' : '#f3e0b0'} />
          <circle className="c-halo" cx="320" cy="50" r="32" fill="none" stroke={GOLD} strokeWidth="0.7" opacity="0.6" />
        </g>
      )}
      <g className="c-drift" fill="none" stroke={time === 'dem' ? '#6a7598' : GOLD2} strokeWidth="1.3" opacity="0.75">
        <path d="M24 36 Q24 28 32 28 Q38 28 38 33 Q38 37 34 37 Q31 37 31 34 M38 33 Q45 27 53 30 Q59 33 56 39" />
        <path d="M170 24 Q170 18 176 18 Q181 18 181 22 Q181 25 178 25 Q176 25 176 23 M181 22 Q187 17 193 20 Q197 23 195 27" />
      </g>
      {time !== 'dem' && <g className="c-birds" fill={INK} opacity="0.5"><path d="M200 30 l4 -2 l-1 3 z" /><path d="M212 26 l4 -2 l-1 3 z" /><path d="M222 32 l3 -1.5 l-0.8 2.4 z" /></g>}
    </g>
  );
}
function Roof({ y, x0, x1, tile = '#2c4a57' }: { y: number; x0: number; x1: number; tile?: string }) {
  return (
    <g>
      <path d={`M${x0} ${y} L${x1} ${y} L${x1 - 20} ${y - 14} Q${x1 - 30} ${y - 22} ${x1 - 42} ${y - 16} L${x0 + 42} ${y - 16} Q${x0 + 30} ${y - 22} ${x0 + 20} ${y - 14} Z`} fill="url(#c-tiles)" stroke={INK} strokeWidth="0.8" />
      <path d={`M${x0} ${y} Q${x0 - 12} ${y - 16} ${x0 - 22} ${y - 14} Q${x0 - 10} ${y - 8} ${x0 - 6} ${y + 4} Z M${x1} ${y} Q${x1 + 12} ${y - 16} ${x1 + 22} ${y - 14} Q${x1 + 10} ${y - 8} ${x1 + 6} ${y + 4} Z`} fill={tile} stroke={INK} strokeWidth="0.8" />
      <path d={`M${x0 - 22} ${y - 14} Q${x0 - 26} ${y - 22} ${x0 - 18} ${y - 24} M${x1 + 22} ${y - 14} Q${x1 + 26} ${y - 22} ${x1 + 18} ${y - 24}`} fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
      <rect x={x0 + 14} y={y - 20} width={x1 - x0 - 28} height="4" fill={GOLD2} />
    </g>
  );
}
function Lantern({ x, y, cls }: { x: number; y: number; cls: string }) {
  return (
    <g className={cls}>
      <line x1={x} y1={y} x2={x} y2={y + 9} stroke={INK} strokeWidth="0.8" />
      <rect x={x - 3} y={y + 8} width="6" height="2" fill={GOLD2} />
      <ellipse cx={x} cy={y + 19} rx="8.5" ry="10" fill="#c8572f" stroke={INK} strokeWidth="0.6" />
      <path d={`M${x} ${y + 9} Q${x - 6} ${y + 19} ${x} ${y + 29} M${x} ${y + 9} Q${x + 6} ${y + 19} ${x} ${y + 29}`} fill="none" stroke={SON} strokeWidth="0.7" />
      <rect x={x - 3} y={y + 28} width="6" height="2" fill={GOLD2} />
      <path d={`M${x - 2} ${y + 30} L${x - 3} ${y + 41} M${x} ${y + 30} L${x} ${y + 43} M${x + 2} ${y + 30} L${x + 3} ${y + 41}`} stroke={SON} strokeWidth="0.8" />
      <ellipse className="c-glow" cx={x} cy={y + 19} rx="15" ry="16" fill="#f2b55a" opacity="0.18" />
    </g>
  );
}
function Petals({ white = false }: { white?: boolean }) {
  const ps = [
    [60, 10, 0, 10], [130, 6, -2, 12], [210, 12, -4.5, 9], [280, 4, -6, 11], [30, 14, -8, 10], [330, 10, -3, 13],
  ];
  return (
    <g fill={white ? '#f7eedb' : '#eaa4ae'}>
      {ps.map(([x, y, d, du], i) => (
        <ellipse key={i} className="c-petal" style={{ animationDelay: `${d}s`, animationDuration: `${du}s` }} cx={x} cy={y} rx="2.3" ry="1.25" />
      ))}
    </g>
  );
}
function Pond({ y = 248 }: { y?: number }) {
  return (
    <g>
      <rect x="0" y={y} width="390" height={312 - y} fill="#9db6a4" />
      <path d={`M0 ${y} H390`} stroke="#7f9a88" strokeWidth="1.5" />
      <g className="c-ripple" fill="none" stroke="#cadccf" strokeWidth="0.9">
        <path d={`M14 ${y + 14} Q50 ${y + 10} 90 ${y + 14} M250 ${y + 14} Q300 ${y + 10} 350 ${y + 14} M30 ${y + 44} Q80 ${y + 40} 130 ${y + 44} M240 ${y + 50} Q290 ${y + 46} 340 ${y + 50}`} />
      </g>
      <g fill="#2f6f64"><ellipse cx="40" cy={y + 22} rx="22" ry="7" /><ellipse cx="344" cy={y + 28} rx="25" ry="8" /><ellipse cx="72" cy={y + 50} rx="16" ry="5" /></g>
      <g className="c-bob">
        <path d={`M50 ${y + 16} Q45 ${y + 4} 52 ${y - 3} Q57 ${y + 4} 55 ${y + 16} Z`} fill="#eaa4ae" stroke={INK} strokeWidth="0.5" />
        <path d={`M55 ${y + 16} Q57 ${y + 3} 64 ${y} Q64 ${y + 9} 57 ${y + 17} Z M48 ${y + 17} Q41 ${y + 7} 45 ${y + 2} Q50 ${y + 8} 52 ${y + 17} Z`} fill="#d97a8a" stroke={INK} strokeWidth="0.5" />
        <line x1="52" y1={y + 17} x2="52" y2={y + 26} stroke="#245a51" strokeWidth="1.2" />
      </g>
    </g>
  );
}

function Backdrop({ place, time }: { place: PlaceK; time: TimeK }) {
  const night = time === 'dem';
  if (place === 'phong')
    return (
      <g>
        <rect x="0" y="0" width="390" height="312" fill={night ? '#3a2418' : '#6e4a30'} />
        <rect x="0" y="0" width="390" height="312" fill="url(#c-silk)" opacity="0.2" />
        <rect x="30" y="30" width="140" height="120" fill={night ? '#1e2438' : '#e8d2a6'} stroke={INK} strokeWidth="2" />
        <rect x="30" y="30" width="140" height="120" fill="url(#c-lattice2)" />
        {night && <circle cx="140" cy="60" r="12" fill="#f3e6c0" opacity="0.9" />}
        <rect x="20" y="22" width="160" height="10" fill="#4e160f" />
        <rect x="210" y="40" width="150" height="150" fill="#5a1a12" stroke={INK} strokeWidth="1.5" />
        <g stroke={GOLD2} strokeWidth="1" fill="none"><rect x="222" y="52" width="40" height="126" /><rect x="268" y="52" width="40" height="126" /><rect x="314" y="52" width="34" height="126" /></g>
        <g fill="none" stroke={GOLD} strokeWidth="0.9" opacity="0.8"><path d="M232 100 Q242 86 252 100 Q242 114 232 100" /><path d="M278 100 Q288 86 298 100 Q288 114 278 100" /></g>
        <rect x="0" y="232" width="390" height="80" fill={night ? '#2a1a10' : '#4a3020'} />
        <path d="M0 232 H390" stroke={INK} strokeWidth="1.5" />
        <rect x="40" y="220" width="110" height="14" fill="#5a1a12" stroke={INK} strokeWidth="1" />
        <rect x="46" y="234" width="6" height="30" fill="#5a1a12" /><rect x="138" y="234" width="6" height="30" fill="#5a1a12" />
        <g>
          <rect x="60" y="206" width="12" height="14" fill="#f1ead8" stroke={INK} strokeWidth="0.6" />
          <path d="M66 206 L66 196" stroke={INK} strokeWidth="0.8" />
          <ellipse className="c-flame" cx="66" cy="192" rx="3" ry="5" fill="#f2b55a" />
          <ellipse className="c-glow" cx="66" cy="196" rx="30" ry="26" fill="#f2b55a" opacity="0.2" />
        </g>
        <path d="M104 220 Q104 206 116 206 Q128 206 128 220 Z" fill="#f7eedb" stroke="#2f6f64" strokeWidth="1" />
        <path className="c-steam" d="M112 202 Q109 195 113 190" fill="none" stroke="#c9b892" strokeWidth="0.8" />
      </g>
    );
  if (place === 'dien')
    return (
      <g>
        <rect x="0" y="0" width="390" height="312" fill={night ? '#2a1610' : '#5a1a12'} />
        <rect x="0" y="0" width="390" height="40" fill="#3a120c" />
        <g fill="none" stroke={GOLD2} strokeWidth="1" opacity="0.7"><path d="M0 20 H390" /><path d="M0 34 H390" /></g>
        {[30, 100, 290, 360].map((cx) => (
          <g key={cx}><rect x={cx - 9} y="40" width="18" height="230" fill={SON} stroke={INK} strokeWidth="1" /><rect x={cx - 9} y="40" width="18" height="6" fill={GOLD} /><path d={`M${cx - 6} 120 Q${cx} 112 ${cx + 6} 120 Q${cx} 128 ${cx - 6} 120`} fill="none" stroke={GOLD} strokeWidth="1" /></g>
        ))}
        <rect x="130" y="60" width="130" height="90" fill="#3a120c" stroke={GOLD} strokeWidth="2" />
        <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
          <path d="M150 110 Q160 80 190 90 Q176 96 180 106 Q170 100 166 112" />
          <path d="M240 110 Q230 80 200 90 Q214 96 210 106 Q220 100 224 112" />
          <circle cx="195" cy="96" r="6" />
        </g>
        <path d="M120 150 H270 V170 H120 Z" fill="#7a1c14" stroke={INK} strokeWidth="1" />
        <path d="M110 170 H280 V182 H110 Z M100 182 H290 V194 H100 Z" fill="#6a1a12" stroke={INK} strokeWidth="1" />
        <path d="M0 230 H390 V312 H0 Z" fill="#4e3424" />
        <rect x="0" y="230" width="390" height="82" fill="url(#c-stone)" opacity="0.35" />
        <Lantern x={65} y={40} cls="c-sway" />
        <Lantern x={325} y={40} cls="c-sway2" />
      </g>
    );
  if (place === 'chua')
    return (
      <g>
        <Sky time={time} />
        <path d="M0 110 L50 84 L96 100 L140 78 L190 98 L240 80 L300 100 L390 86 L390 140 L0 140 Z" fill="#b39b6c" />
        <g>
          <rect x="250" y="80" width="40" height="150" fill="#cdbb94" stroke={INK} strokeWidth="1" />
          {[80, 116, 152, 188].map((y) => <path key={y} d={`M236 ${y} L304 ${y} L296 ${y - 10} L244 ${y - 10} Z`} fill="#2c4a57" stroke={INK} strokeWidth="0.8" />)}
          <path d="M270 60 L270 70" stroke={GOLD} strokeWidth="3" />
        </g>
        <Roof y={170} x0={20} x1={220} />
        <rect x="30" y="170" width="180" height="60" fill="#7a5a3a" stroke={INK} strokeWidth="1" />
        <rect x="100" y="182" width="40" height="48" fill="#3a2414" />
        <g>
          <path d="M330 230 Q334 170 340 130 M340 160 Q360 150 370 152 M338 180 Q320 172 312 176" fill="none" stroke="#5a3a22" strokeWidth="4" />
          <g fill="#4e6a4a"><circle cx="340" cy="128" r="22" /><circle cx="366" cy="148" r="14" /><circle cx="312" cy="170" r="12" /></g>
        </g>
        <rect x="0" y="230" width="390" height="82" fill="#cdbb94" />
        <rect x="0" y="230" width="390" height="82" fill="url(#c-stone)" opacity="0.6" />
        <Petals white />
      </g>
    );
  if (place === 'lang')
    return (
      <g>
        <Sky time={time} />
        <path d="M0 140 Q60 100 130 130 T260 120 T390 130 L390 312 L0 312 Z" fill="#7f9a62" />
        <g fill="none" stroke="#5f7a48" strokeWidth="2">{[150, 170, 190, 210].map((y) => <path key={y} d={`M0 ${y} Q100 ${y - 14} 200 ${y} T390 ${y}`} />)}</g>
        <path d="M60 230 L120 186 L180 230 Z" fill="#b8892d" stroke={INK} strokeWidth="1" />
        <rect x="72" y="230" width="96" height="40" fill="#8a6a44" stroke={INK} strokeWidth="1" />
        <rect x="108" y="240" width="22" height="30" fill="#3a2414" />
        <g><path d="M300 270 Q304 220 296 180" fill="none" stroke="#5a3a22" strokeWidth="3" /><g fill="#4e6a4a"><circle cx="296" cy="176" r="16" /><circle cx="310" cy="190" r="10" /></g></g>
        <rect x="0" y="270" width="390" height="42" fill="#a89070" />
      </g>
    );
  if (place === 'lang_mo')
    return (
      <g>
        <Sky time={time} />
        <path d="M0 130 L80 104 L160 120 L240 100 L390 122 L390 160 L0 160 Z" fill="#a8946a" />
        {[40, 90, 330].map((x) => <g key={x}><path d={`M${x} 250 L${x} 170`} stroke="#5a3a22" strokeWidth="4" /><path d={`M${x - 22} 200 L${x} 150 L${x + 22} 200 Z M${x - 18} 180 L${x} 140 L${x + 18} 180 Z`} fill="#3f6b44" stroke={INK} strokeWidth="0.6" /></g>)}
        <rect x="150" y="150" width="90" height="100" fill="#b3a27f" stroke={INK} strokeWidth="1.2" />
        <path d="M144 150 L195 126 L246 150 Z" fill="#9c8b69" stroke={INK} strokeWidth="1" />
        <rect x="170" y="166" width="50" height="70" fill="#cdbb94" stroke={INK} strokeWidth="0.8" />
        <g stroke="#7a6a4a" strokeWidth="1.2">{[178, 186, 194, 202, 210].map((x) => <path key={x} d={`M${x} 174 V228`} />)}</g>
        <rect x="0" y="250" width="390" height="62" fill="#c4b088" />
        <rect x="0" y="250" width="390" height="62" fill="url(#c-stone)" opacity="0.5" />
        <path className="c-steam" d="M196 250 Q192 240 197 232 Q201 226 197 218" fill="none" stroke="#e8dcc0" strokeWidth="1" />
      </g>
    );
  if (place === 'bien')
    return (
      <g>
        <Sky time={time} />
        <path d="M0 120 L60 104 L120 116 L200 100 L280 114 L390 104 L390 140 L0 140 Z" fill="#b39b6c" opacity="0.7" />
        <rect x="0" y="140" width="390" height="172" fill={night ? '#2a4a5a' : '#5f8fa0'} />
        <g className="c-ripple" fill="none" stroke={night ? '#4a6a7a' : '#a8cbd4'} strokeWidth="1.2">
          {[160, 184, 210, 240, 272].map((y, i) => <path key={y} d={`M${i * 13} ${y} Q${40 + i * 13} ${y - 6} ${80 + i * 13} ${y} T${160 + i * 13} ${y} T${240 + i * 13} ${y} T${320 + i * 13} ${y} T${400 + i * 13} ${y}`} />)}
        </g>
        <g className="c-bob" style={{ transformOrigin: '50% 100%' }}>
          <path d="M60 210 Q160 236 300 210 L284 230 Q170 246 76 230 Z" fill="#5a3a22" stroke={INK} strokeWidth="1" />
          <path d="M176 210 V120" stroke="#4a3022" strokeWidth="3" />
          <path d="M178 124 Q240 150 236 200 L178 204 Z" fill="#c8a46a" stroke={INK} strokeWidth="0.8" />
          <path d="M184 140 H228 M184 160 H234 M184 180 H236" stroke="#9a7a48" strokeWidth="0.8" />
          <path d="M70 212 Q60 196 72 190" fill="none" stroke={GOLD} strokeWidth="2" />
        </g>
      </g>
    );
  if (place === 'nui')
    return (
      <g>
        <Sky time={time} />
        <path d="M0 200 L70 90 L120 150 L180 70 L250 160 L310 100 L390 190 L390 312 L0 312 Z" fill="#6f8a64" stroke={INK} strokeWidth="0.8" />
        <path d="M70 90 L84 112 L58 112 Z M180 70 L198 98 L164 98 Z M310 100 L324 122 L298 122 Z" fill="#e8dcc0" />
        <path d="M0 240 L90 170 L170 220 L260 160 L390 230 L390 312 L0 312 Z" fill="#4e6a4a" stroke={INK} strokeWidth="0.8" />
        <g className="c-drift" fill="#f3e8d0" opacity="0.7"><ellipse cx="120" cy="190" rx="60" ry="8" /><ellipse cx="290" cy="176" rx="50" ry="7" /></g>
        {[30, 70, 340, 370].map((x) => <g key={x}><path d={`M${x} 300 L${x} 250`} stroke="#3a2414" strokeWidth="3" /><path d={`M${x - 16} 270 L${x} 230 L${x + 16} 270 Z`} fill="#2f5a3a" stroke={INK} strokeWidth="0.6" /></g>)}
        <rect x="0" y="286" width="390" height="26" fill="#7a6a4a" />
      </g>
    );
  if (place === 'vuon')
    return (
      <g>
        <Sky time={time} />
        <path d="M0 96 L40 74 L80 88 L120 70 L170 90 L220 72 L270 92 L320 76 L390 94 L390 130 L0 130 Z" fill="#c4ad7e" />
        <g>
          <path d="M22 160 Q30 126 26 96 Q38 104 36 124 Q44 102 58 104 Q48 120 46 160 Z" fill="#4e6a4a" stroke={INK} strokeWidth="0.6" />
          <g fill="#f7eedb"><circle cx="30" cy="104" r="2.6" /><circle cx="42" cy="110" r="2.4" /><circle cx="54" cy="106" r="2.6" /><circle cx="36" cy="118" r="2.2" /></g>
        </g>
        <path d="M150 178 Q230 130 310 178" fill="none" stroke={SON} strokeWidth="5" />
        <path d="M150 178 Q230 136 310 178" fill="none" stroke={GOLD} strokeWidth="1.2" />
        {[170, 200, 230, 260, 290].map((x) => <path key={x} d={`M${x} ${178 - (1 - Math.pow((x - 230) / 80, 2)) * 40} V${186 - (1 - Math.pow((x - 230) / 80, 2)) * 40}`} stroke={SON} strokeWidth="2" />)}
        <Roof y={150} x0={300} x1={380} />
        <rect x="306" y="150" width="68" height="40" fill="#7a1c14" stroke={INK} strokeWidth="1" />
        <rect x="0" y="186" width="390" height="62" fill="#d3bd8f" />
        <Pond y={236} />
        {night && <><Lantern x={120} y={130} cls="c-sway" /><Lantern x={250} y={124} cls="c-sway2" /></>}
        <Petals />
      </g>
    );
  // sân viện
  return (
    <g>
      <Sky time={time} />
      <path d="M0 92 L40 70 L62 82 L92 58 L124 80 L150 66 L180 86 L210 64 L246 84 L272 68 L306 88 L340 72 L390 90 L390 120 L0 120 Z" fill="#c4ad7e" />
      <Roof y={76} x0={96} x1={294} />
      <circle cx="195" cy="52" r="6" fill={GOLD} stroke={SON} strokeWidth="1.3" />
      <path d="M187 55 Q176 47 166 53 Q161 47 167 43 M203 55 Q214 47 224 53 Q229 47 223 43" fill="none" stroke={GOLD2} strokeWidth="2" strokeLinecap="round" />
      <rect x="128" y="76" width="134" height="12" fill="#5a1a12" />
      <Roof y={132} x0={30} x1={360} />
      <rect x="40" y="132" width="310" height="6" fill={GOLD2} />
      <rect x="56" y="138" width="278" height="82" fill="#6e1c13" stroke={INK} strokeWidth="1" />
      <rect x="100" y="146" width="60" height="70" fill="url(#c-lattice)" />
      <rect x="230" y="146" width="60" height="70" fill="url(#c-lattice)" />
      <rect x="164" y="146" width="62" height="70" fill="#2a0d08" />
      {[60, 86, 293, 319].map((x) => <g key={x}><rect x={x} y="138" width="11" height="84" fill={SON} stroke={INK} strokeWidth="0.6" /><rect x={x} y="138" width="11" height="3" fill={GOLD} /></g>)}
      <Lantern x={78} y={138} cls="c-sway" />
      <Lantern x={312} y={138} cls="c-sway2" />
      <rect x="10" y="222" width="370" height="16" fill="url(#c-stone)" />
      <Pond y={238} />
      <Petals />
    </g>
  );
}

const SLOTS = [180, 296, 76];

/** tranh cảnh hoàn chỉnh trong khung */
export default function Scene({ place, time = 'ngay', cast, looks, label, mood = 'binh', moods = {} }: { place: PlaceK; time?: TimeK; cast: CastK[]; looks: Partial<Record<CastK, Look>>; label: string; mood?: MoodK; moods?: Partial<Record<CastK, MoodK>> }) {
  const order = cast.includes('me') ? ['me', ...cast.filter((c) => c !== 'me')] : cast;
  return (
    <svg viewBox="0 0 390 312" width="100%" role="img" aria-label={label} className="c-scene" style={{ display: 'block' }}>
      <defs>
        <pattern id="c-tiles" width="7" height="5" patternUnits="userSpaceOnUse"><rect width="7" height="5" fill="#2c4a57" /><path d="M0 5 Q3.5 1 7 5" fill="none" stroke="#406b7b" strokeWidth="0.9" /></pattern>
        <pattern id="c-lattice" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#4e160f" /><rect x="1" y="1" width="7" height="7" fill="none" stroke={GOLD2} strokeWidth="0.6" /><circle cx="4.5" cy="4.5" r="1.2" fill="none" stroke={GOLD} strokeWidth="0.5" /></pattern>
        <pattern id="c-lattice2" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 7 H14 M7 0 V14" stroke="#4e160f" strokeWidth="2" /><rect x="3" y="3" width="8" height="8" fill="none" stroke="#4e160f" strokeWidth="1.2" /></pattern>
        <pattern id="c-silk" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 5 L5 0" stroke="#d8c294" strokeWidth="0.4" /></pattern>
        <pattern id="c-stone" width="22" height="8" patternUnits="userSpaceOnUse"><rect width="22" height="8" fill="#b3a27f" /><path d="M0 8 H22 M11 0 V8" stroke="#9c8b69" strokeWidth="0.6" /></pattern>
        <radialGradient id="c-vig" cx="50%" cy="50%" r="70%"><stop offset="55%" stopColor="#1a120c" stopOpacity="0" /><stop offset="100%" stopColor="#1a120c" stopOpacity="0.55" /></radialGradient>
        <radialGradient id="c-vig-r" cx="50%" cy="50%" r="70%"><stop offset="50%" stopColor="#7a1c14" stopOpacity="0" /><stop offset="100%" stopColor="#7a1c14" stopOpacity="0.5" /></radialGradient>
        <radialGradient id="c-vig-b" cx="50%" cy="50%" r="70%"><stop offset="40%" stopColor="#2c3550" stopOpacity="0.08" /><stop offset="100%" stopColor="#2c3550" stopOpacity="0.5" /></radialGradient>
        <clipPath id="c-clip"><rect x="10" y="8" width="370" height="296" /></clipPath>
      </defs>
      <g clipPath="url(#c-clip)">
        <Backdrop place={place} time={time} />
        {order.slice(0, 3).map((k, i) => {
          const look = looks[k as CastK] ?? lookOf(k as CastK);
          return (
            <g key={k} className="c-enter" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
              <Person x={SLOTS[i]} look={i === 0 ? look : { ...look, scale: (look.scale ?? 1) * 0.82 }} flip={i === 2} blink={k === 'me'} mood={moods[k as CastK] ?? mood} />
            </g>
          );
        })}
        {/* không khí: căng thì tối mép, giận thì ửng đỏ, buồn thì xám lạnh */}
        {(mood === 'so' || mood === 'gian' || mood === 'buon' || mood === 'lo') && (
          <rect x="0" y="0" width="390" height="312" fill={mood === 'gian' ? 'url(#c-vig-r)' : mood === 'buon' ? 'url(#c-vig-b)' : 'url(#c-vig)'} className="c-mood" pointerEvents="none" />
        )}
      </g>
      <rect x="10" y="8" width="370" height="296" fill="none" stroke={GOLD2} strokeWidth="3" />
      <rect x="5" y="3" width="380" height="306" fill="none" stroke="#8f2419" strokeWidth="2" />
      <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
        <path d="M3 22 V3 H22 M9 16 Q9 9 16 9" />
        <path d="M387 22 V3 H368 M381 16 Q381 9 374 9" />
        <path d="M3 290 V309 H22 M9 296 Q9 303 16 303" />
        <path d="M387 290 V309 H368 M381 296 Q381 303 374 303" />
      </g>
    </svg>
  );
}
