/**
 * Cung đấu: kiểu dữ liệu chung.
 * Một đời chơi = chuỗi "thẻ" (card). Thẻ nhỏ 2 lựa chọn rút ngẫu nhiên theo điều kiện,
 * xen giữa các "ngã rẽ lớn" viết tay (3 lựa chọn, có thể thêm 1 lựa chọn bị khóa).
 * Triều đại, tên người, tên cung điện đều hư cấu.
 */

/** chỉ số chính: Đức (giữ lễ), Sắc (nhan sắc, duyên), Thế (gia thế, chỗ dựa), Ân (ân sủng của vua, nguy hiểm ở cả hai đầu), Mưu (tai mắt, mưu trí) */
export type StatK = 'duc' | 'sac' | 'the' | 'an' | 'muu';
/** quan hệ -100 (thù) .. 0 (dửng dưng) .. 100 (một lòng) với từng người/phe */
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

export type PlaceK = 'vien' | 'phong' | 'vuon' | 'dien' | 'chua' | 'lang' | 'lang_mo' | 'bien' | 'nui';
export type TimeK = 'ngay' | 'chieu' | 'dem';
/** nét mặt trong tranh: vui, bình thường, lo, buồn (khóc), giận, sợ, đắc ý (cười nhạt) */
export type MoodK = 'vui' | 'binh' | 'lo' | 'buon' | 'gian' | 'so' | 'dac';
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
  | 'cungnu' // một cung nữ khác
  | 'ngoai'; // người nước ngoài: sứ thần, vua nước láng giềng

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
  /** sự kiện nhiều hồi: hiện ngay thẻ hồi tiếp theo (id thẻ có step: true), thời gian không trôi trừ khi đặt years */
  next?: string;
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
  /** nét mặt chung của cảnh (mặc định: bình thường) */
  mood?: MoodK;
  /** nét mặt riêng từng người, đè lên mood chung (vd Thục phi đắc ý khi mình sợ) */
  moods?: Partial<Record<CastK, MoodK>>;
  /** một câu nối với chuyện trước (hiện đầu thẻ), dùng cho thẻ là hệ quả của lựa chọn cũ */
  lead?: string;
  /** chỗ cụ thể nói thành chữ, đè lên chỗ mặc định theo place (vd "ở viện Thục phi") */
  where?: string;
  /** người đang nói (hiện trên khung thoại) */
  who?: CastK;
  /** tên hiện trên khung thoại thay cho tên mặc định của vai (vd: "Sứ thần nước Sa Hải") */
  whoName?: string;
  title: string;
  /** tối đa 2 câu ngắn */
  text: string[];
  choices: Choice[];
  /** câu "điềm báo": hiện khi chết, để người chơi biết đáng lẽ đã thấy ở đâu */
  omen?: string;
  /** thẻ là một hồi giữa sự kiện nhiều hồi: không rút ngẫu nhiên, chỉ tới bằng fx.next */
  step?: boolean;
  /** được lặp lại trong một đời (mặc định không) */
  repeat?: boolean;
  /** ngã rẽ lớn của tuyến phụ: xếp ngay sau (hoặc trước) ngã rẽ có id này trong cùng chặng */
  after?: string;
  before?: string;
}

export interface Kid {
  sex: 'trai' | 'gai';
  born: number;
  name: string;
}

/** vật làm nổi tranh kết cục */
export type MotifK = 'lua' | 'gieng' | 'chen' | 'thuyen' | 'chuong' | 'ngai' | 'rem' | 'aonau' | 'mo' | 'den' | 'kiem' | 'hoa' | 'sach' | 'co' | 'trang' | 'lua_chay' | 'chieu' | 'noi';
/** tranh và lời dẫn riêng của một kết cục */
export interface EndArt {
  place: PlaceK;
  time: TimeK;
  cast: CastK[];
  mood?: MoodK;
  moods?: Partial<Record<CastK, MoodK>>;
  motif?: MotifK;
  /** đoạn dẫn truyện 3-5 câu, kể đời người ấy khép lại ra sao */
  story: string;
}

export interface Ending {
  id: string;
  name: string;
  desc: string;
  /** chết hay sống */
  dead?: boolean;
  /** bia ghi "tẩm" (bậc cao) hay "mộ" */
}

/** một ngã rẽ đã chọn: bản đời ngay trước lúc chọn (không kèm nhật ký) */
export interface Mark {
  card: string;
  pick: number;
  age: number;
  chapter: number;
  logLen: number;
  snap: Omit<Life, 'log' | 'marks' | 'back'>;
}

export interface LogLine {
  age: number;
  t: string;
  k?: 'pick' | 'note' | 'year' | 'rank';
}

export interface Life {
  v: 'cung1';
  seed: number;
  /** đường vào cung: dan, quan, cung, chua */
  origin?: string;
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
  /** 2 = quan hệ theo thang -100..100 */
  relV?: number;
  /** cờ vừa đặt ở mấy lượt gần đây: thẻ hệ quả của chúng được ưu tiên rút */
  fresh?: string[];
  /** các ngã rẽ đã đi qua, mỗi cái giữ một bản để quay lại chọn lại */
  marks?: Mark[];
  /** tuổi và chỗ của thẻ trước, để viết câu nối cảnh */
  prev?: { age: number; place: string; card: string };
  /** đang ở giữa sự kiện nhiều hồi: thẻ mở đầu là ngã rẽ lớn, khủng hoảng hay thẻ nhỏ, và đang ở hồi thứ mấy */
  chain?: { kind: 'big' | 'crisis' | 'small'; hoi: number };
}
