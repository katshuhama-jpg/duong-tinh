/**
 * Cung đấu: kiểu dữ liệu chung.
 * Một đời chơi = chuỗi "thẻ" (card). Thẻ nhỏ 2 lựa chọn rút ngẫu nhiên theo điều kiện,
 * xen giữa các "ngã rẽ lớn" viết tay (3 lựa chọn, có thể thêm 1 lựa chọn bị khóa).
 * Triều đại, tên người, tên cung điện đều hư cấu.
 */

/** chỉ số chính: Đức (giữ lễ), Sắc (nhan sắc, duyên), Thế (gia thế, chỗ dựa), Ân (ân sủng của vua, nguy hiểm ở cả hai đầu), Mưu (tai mắt, mưu trí) */
export type StatK = 'duc' | 'sac' | 'the' | 'an' | 'muu';
/** quan hệ 0-100 với từng người/phe */
export type RelK =
  | 'vua' // nhà vua
  | 'thaihau' // thái hậu, mẹ vua
  | 'hoanghau' // hoàng hậu (đích thê, về sau là đích mẫu của con mình)
  | 'thucphi' // Thục phi, đối thủ chính
  | 'hanh' // Hạnh, thị nữ thân tín
  | 'phuc' // Phúc, thái giám giữ sổ và treo đèn
  | 'quan' // phe quan văn
  | 'tuong'; // phe võ tướng
export type NumK = StatK | RelK | 'tien';

export type PlaceK = 'vien' | 'phong' | 'vuon' | 'dien' | 'chua' | 'lang' | 'lang_mo';
export type TimeK = 'ngay' | 'chieu' | 'dem';
/** ai đứng trong cảnh */
export type CastK =
  | 'me' // nhân vật chính
  | 'mama' // ma ma dạy lễ
  | 'vua'
  | 'thaihau'
  | 'hoanghau'
  | 'thucphi'
  | 'hanh'
  | 'phuc'
  | 'quan'
  | 'tuong'
  | 'con' // con của mình
  | 'su' // nhà sư, ni cô
  | 'meday' // mẹ đẻ ở quê
  | 'cungnu'; // một cung nữ khác

/** điều kiện để thẻ hoặc lựa chọn xuất hiện */
export interface Cond {
  minAge?: number;
  maxAge?: number;
  /** bậc trong cung (xem RANKS) */
  rankMin?: number;
  rankMax?: number;
  /** phải có đủ các cờ này */
  flags?: string[];
  /** không được có cờ nào trong này */
  not?: string[];
  /** số con trai tối thiểu */
  sons?: number;
  /** có con (trai hoặc gái) */
  kids?: number;
  /** khoảng giá trị [min, max] */
  num?: Partial<Record<NumK, [number, number]>>;
}

/** hệ quả của một lựa chọn */
export interface Fx {
  /** cộng/trừ chỉ số, quan hệ, tiền (quan) */
  d?: Partial<Record<NumK, number>>;
  flag?: string[];
  unflag?: string[];
  /** lên/xuống bậc */
  rank?: number;
  /** sinh con */
  kid?: 'trai' | 'gai';
  /** kết thúc đời ở kết cục này (xem ENDINGS) */
  end?: string;
  /** thêm số năm trôi qua (mặc định thẻ nhỏ nửa năm, ngã rẽ lớn một năm) */
  years?: number;
  /** nhảy sang chặng (chapter) khác */
  chapter?: number;
}

export interface Choice {
  t: string;
  fx: Fx;
  /** một câu kể hệ quả, hiện sau khi chọn */
  note?: string;
  /** điều kiện để lựa chọn này mở; không đủ thì hiện khóa kèm lockHint */
  need?: Cond;
  lockHint?: string;
  /** có rủi ro: xác suất p (0-1) thất bại, khi đó dùng fail thay vì fx */
  risk?: { p: number; fail: Fx; failNote: string };
}

export interface Card {
  id: string;
  /** ngã rẽ lớn (viết tay, đúng thứ tự trong chặng) hay thẻ nhỏ (rút ngẫu nhiên) */
  big?: boolean;
  /** các chặng thẻ này được dùng */
  chapter: number[];
  when?: Cond;
  /** trọng số khi rút (mặc định 1) */
  weight?: number;
  place: PlaceK;
  time?: TimeK;
  cast: CastK[];
  /** người đang nói (hiện trên khung thoại) */
  who?: CastK;
  title: string;
  /** tối đa 2 câu ngắn */
  text: string[];
  choices: Choice[];
  /** câu "điềm báo": hiện khi chết, để người chơi biết đáng lẽ đã thấy ở đâu */
  omen?: string;
  /** được lặp lại trong một đời (mặc định không) */
  repeat?: boolean;
}

export interface Kid {
  sex: 'trai' | 'gai';
  born: number;
  name: string;
}

export interface Ending {
  id: string;
  name: string;
  desc: string;
  /** chết hay sống */
  dead?: boolean;
  /** bia ghi "tẩm" (bậc cao) hay "mộ" */
}

export interface LogLine {
  age: number;
  t: string;
  k?: 'pick' | 'note' | 'year' | 'rank';
}

export interface Life {
  v: 'cung1';
  seed: number;
  name: string;
  /** năm thứ mấy của niên hiệu lúc vào cung */
  age: number;
  rank: number;
  n: Record<NumK, number>;
  flags: string[];
  kids: Kid[];
  chapter: number;
  /** số thẻ nhỏ đã chơi trong chặng hiện tại */
  smalls: number;
  /** chỉ số ngã rẽ lớn tiếp theo trong chặng */
  bigAt: number;
  seen: string[];
  log: LogLine[];
  /** thẻ đang hiện */
  card: string | null;
  /** kết cục nếu đời đã hết */
  end: string | null;
  /** bản lưu trước ngã rẽ lớn gần nhất, để chết thì quay lại */
  back: Omit<Life, 'back'> | null;
  /** câu điềm báo của thẻ gây ra cái chết */
  omen?: string;
  startedAt: number;
}
