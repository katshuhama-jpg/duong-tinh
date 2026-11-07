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
/** hiem: kẻ thủ ác biết bạn đào tới đâu (phần Con tin họ Nghiêm); cha: lòng tin của cha */
export type NumK = StatK | RelK | 'tien' | 'hiem' | 'cha';
/** mối nguy trên đường lên ngôi: Thục phi, Hoàng hậu (chắn ngôi hậu), Lệ tần (tân sủng), Thái phó Tôn (quyền thần), Hoàng tử Nghĩa (tranh ngôi Đông cung) */
export type RivalK = 'thucphi' | 'hoanghau' | 'ninh' | 'hienphi' | 'uyentan' | 'letan' | 'thaipho' | 'nghia' | 'tao' | 'xuanlan' | 'mac';
/** an: chưa lộ mặt; manh: đang lộng hành; yeu: thất thế; giang: bị giáng, bị đày; chet: đã chết; phuc: đã quy phục */
export type RivalSt = 'an' | 'manh' | 'yeu' | 'giang' | 'chet' | 'phuc';
export interface RivalState {
  /** uy hiếp 0-100 */
  th: number;
  /** chứng cứ, thóp nắm được 0-100 */
  ev: number;
  st: RivalSt;
}

export type PlaceK = 'vien' | 'phong' | 'vuon' | 'dien' | 'chua' | 'lang' | 'lang_mo' | 'bien' | 'nui';
export type TimeK = 'ngay' | 'chieu' | 'dem';
/** nét mặt trong tranh: vui, bình thường, lo, buồn (khóc), giận, sợ, đắc ý (cười nhạt) */
export type MoodK = 'vui' | 'binh' | 'lo' | 'buon' | 'gian' | 'so' | 'dac';
/** ai đứng trong cảnh */
export type CastK =
  | 'me' // nhân vật chính
  // phần Con tin họ Nghiêm
  | 'thanh' // chị Thanh
  | 'cha' // Thượng thư Nghiêm
  | 'thaisu' // Thái sư Hà
  | 'lymac' // Ngự sử Lý Mặc
  | 'kiem' // chưởng sự Kiệm
  | 'thaiy' // Thái y Thẩm
  | 'nhumau' // nhũ mẫu Tần
  | 'luavang' // nữ tì Lụa Vàng
  | 'uyennhu' // Quý phi Hà Uyển Như
  | 'huu' // Hoàng trưởng tử Hựu
  | 'balao' // bà lão chè
  | 'dao' // bóng Đào
  | 'mo' // sư cô Mơ
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
  | 'ngoai' // người nước ngoài: sứ thần, vua nước láng giềng
  | 'letan' // Lệ tần, tân sủng trẻ đẹp
  | 'nghia' // Hoàng tử Nghĩa đã lớn, con Thục phi
  | 'ninh' // Ninh mỹ nhân, bạn cùng đợt tuyển thành thù
  | 'hienphi' // Hiền phi họ Mạc, con gái võ tướng, mặt hiền bụng hiểm
  | 'uyentan' // Uyển tần, vũ nữ được sủng
  | 'tao' // Tào công công, chưởng sự thái giám cung Hoàng hậu
  | 'xuanlan' // Xuân Lan, cung nữ thân tín của Thục phi
  | 'mac'; // Mạc tướng quân, cha Hiền phi, giữ cấm quân

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
  /** điều kiện về mối nguy: trạng thái thuộc danh sách, uy hiếp/chứng cứ trong khoảng */
  riv?: Partial<Record<RivalK, { st?: RivalSt[]; th?: [number, number]; ev?: [number, number] }>>;
  /** phần Nghiêm: điểm vây cánh đã nhổ tối thiểu (xem nghiem/daumoi.ts) */
  vc?: number;
  /** phần Nghiêm: điểm vây cánh tối đa (dùng cho "vây cánh còn đông": vcMax 4, hoặc vcMax 2) */
  vcMax?: number;
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
  /** đổi mối nguy: cộng uy hiếp/chứng cứ, hoặc đặt trạng thái (giang, chet, phuc...) */
  riv?: Partial<Record<RivalK, { th?: number; ev?: number; st?: RivalSt }>>;
  /** phần Con tin họ Nghiêm: mở một vụ án */
  mo?: string;
  /** nhặt được manh mối (id manh mối) */
  clue?: string[];
  /** xử án: vụ nào, buộc tội ai (khóa nghi phạm); 'tu' = kết luận tự vẫn/không ai, 'gac' = gác án */
  accuse?: { an: string; who: string };
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
  /** cảnh nền riêng, đè lên cảnh theo place: cong (cổng thành), lanh (lãnh cung, ngục), bep (ngự dược, bếp), tam (tẩm điện), thu (thư phòng), hanh (hành lang), trieu (chính điện lúc chầu) */
  bg?: 'cong' | 'lanh' | 'bep' | 'tam' | 'thu' | 'hanh' | 'trieu';
  /** nhịp phim: hook (mở chương, gây tò mò), lang (quãng lặng trước bão), cang (dồn nén) */
  beat?: 'hook' | 'lang' | 'cang';
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
  /** thẻ bước ngoặt: đủ điều kiện là hiện ngay ở lượt sau (vd lập hậu khi ngôi hậu bỏ trống) */
  urgent?: boolean;
  /** thẻ là một hồi giữa sự kiện nhiều hồi: không rút ngẫu nhiên, chỉ tới bằng fx.next */
  step?: boolean;
  /** thẻ thuộc phần chơi riêng (vd 'nghiem'); không ghi = phần cô gái chè */
  part?: 'nghiem';
  /** cảnh nền ảnh (thư mục trong /bg), đè lên cảnh đoán từ place/bg */
  img?: string;
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
  where?: string;
  bg?: 'cong' | 'lanh' | 'bep' | 'tam' | 'thu' | 'hanh' | 'trieu';
  /** đoạn dẫn truyện 3-5 câu, kể đời người ấy khép lại ra sao */
  story: string;
}

export interface Ending {
  id: string;
  /** độ uy lực 0-100: sổ kết cục xếp cái uy lực nhất lên đầu */
  tier?: number;
  /** kết cục của nhánh rẽ (ngõ cụt): người chơi quay lại ngã rẽ để đi tiếp đường chính */
  branch?: boolean;
  /** sắc thái: viên mãn hay buồn (chết thì dùng dead) */
  tone?: 'vien' | 'buon';
  name: string;
  desc: string;
  /** chết hay sống */
  dead?: boolean;
  /** bia ghi "tẩm" (bậc cao) hay "mộ" */
}

/** ảnh chụp lúc đầu (hoặc cuối) một chương */
export interface ChapterSnap {
  ch: number;
  age: number;
  rank: string;
  n: Record<NumK, number>;
  logLen: number;
  kids: number;
  riv?: Record<RivalK, RivalState>;
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
  k?: 'pick' | 'note' | 'year' | 'rank' | 'tale';
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
  /** lời kể kết cục riêng của đời này (thay desc cố định, vd chết vì Hiểm theo chương) */
  endDesc?: string;
  startedAt: number;
  /** 2 = quan hệ theo thang -100..100 */
  relV?: number;
  /** cờ vừa đặt ở mấy lượt gần đây: thẻ hệ quả của chúng được ưu tiên rút */
  fresh?: string[];
  /** đầu chương đang chơi: để cuối chương tổng kết đổi thay */
  chStart?: ChapterSnap;
  /** màn chương đang chờ hiện: tổng kết chương vừa xong (nếu có) và mở màn chương mới */
  showCh?: { to: number; from?: ChapterSnap; end?: ChapterSnap; picks?: string[] };
  /** lời kể đang chờ hiện (trang kể chuyện giữa hai cảnh) */
  tales?: { t: string; lines: string[]; card?: string; riv?: RivalK; kicker?: string; skip?: boolean; s?: { bg: string; time: TimeK; cast: CastK[]; rain?: boolean; imgs?: Partial<Record<CastK, string>>; moods?: Partial<Record<CastK, MoodK>>; prop?: string } }[];
  /** phần Con tin họ Nghiêm: các vụ án (tay sai bốc lúc đầu đời, manh mối đã nhặt, đã xử chưa) */
  an?: Record<string, { tay: string; mo?: number; clues: string[]; xu?: { who: string; dung: boolean; du: boolean }; /** số lần đã dò manh mối (thẻ nhỏ) trong vụ */ cd?: number; /** manh mối có được qua tay kẻ thù */ tu?: string[]; /** trong số đó, manh mối giả */ gia?: string[] }>;
  /** bàn cờ mối nguy */
  riv?: Record<RivalK, RivalState>;
  /** kẻ thù chính của chương đang chơi (thẻ của họ ra dày hơn) */
  focus?: RivalK[];
  /** các ngã rẽ đã đi qua, mỗi cái giữ một bản để quay lại chọn lại */
  marks?: Mark[];
  /** tuổi và chỗ của thẻ trước, để viết câu nối cảnh */
  prev?: { age: number; place: string; card: string };
  /** đang ở giữa sự kiện nhiều hồi: thẻ mở đầu là ngã rẽ lớn, khủng hoảng hay thẻ nhỏ, và đang ở hồi thứ mấy */
  chain?: { kind: 'big' | 'crisis' | 'small'; hoi: number };
}
