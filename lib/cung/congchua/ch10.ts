/**
 * Phần Công chúa triều trước - Chương 10: Chín bậc (Hưng Bình năm 24, nàng 30 tuổi).
 * Khép đời. Hai kết đỉnh, kết giết oan, rồi kết của từng đường. Chương của người cha mở sau đỉnh sáng.
 * Thẻ xếp theo thứ tự xét: thẻ nào đủ điều kiện trước thì khép đời trước.
 */
import type { Card } from '../types';

const P = 'congchua' as const;
type X = Omit<Card, 'part' | 'chapter'>;
const S = (x: X): Card => ({ part: P, chapter: [10], urgent: true, ...x });
const T = (x: X): Card => ({ part: P, chapter: [10], step: true, ...x });
const CLUES = ['m1', 'm2', 'm3', 'm4', 'm5'];

/** thẻ khép đời: một cảnh, một lựa chọn */
const khep = (id: string, when: Card['when'], place: Card['place'], img: string, where: string, cast: Card['cast'], title: string, text: string[], t: string, end: string, note: string): Card =>
  S({ id, when, beat: 'cang', place, img, where, time: 'dem', cast, title, text, choices: [{ t, fx: { end }, note }] });

/** đỉnh sáng: điều kiện chung */
const DINH = { flags: ['m5', 'vu_chung', 'tha_qp'], not: ['giet_oan', 'chet_vuhoe', 'xin_tam', 'tinh_cam'], some: [3, CLUES] as [number, string[]], num: { chen: [0, 1] as [number, number] } };

const dinh = (id: string, d: string, k: string): Card =>
  S({
    id,
    when: { ...DINH, flags: [...DINH.flags, d, k] },
    big: true,
    beat: 'cang',
    place: 'vien',
    img: 'cong',
    where: 'ở cửa tây',
    time: 'ngay',
    cast: ['me', 'vuhoe'],
    who: 'me',
    lead: 'Hưng Bình năm thứ hai mươi tư.',
    title: 'Người làm chứng',
    text: ['Hai đạo quân còn đứng hai bên cửa tây. Bạn không hạ Ôn Tùng bằng chén trà. Bạn đưa ra trước mặt lính của ông: bà vú không biết chữ, trang sổ của Quế, và những người còn nhớ mùa đông năm ấy.', 'Rồi bạn mở bức tượng gỗ ở hậu liêu Lũng Vân. Trong ruột tượng có một lá thư, nét chữ của cha.'],
    choices: [{ t: 'Đọc lá thư trước hai đạo quân', fx: { next: 'k10_cha1' }, note: 'Bạn mở thư. Trước khi đọc, bạn nhắm mắt lại. Bạn muốn biết cha đã ngồi thế nào khi viết.' }],
    omen: 'Bà vú không biết chữ. Trà để mười tám năm thì đã thành bụi.',
  });

/** chương của người cha: không lựa chọn nào đổi được kết */
const cha = (id: string, next: string | undefined, title: string, text: string[], choices: { t: string; note: string }[]): Card =>
  T({
    id,
    place: 'chua',
    img: 'haulieu',
    where: 'ở hậu liêu chùa Lũng Vân',
    time: 'dem',
    cast: ['thuande'],
    who: 'thuande',
    title,
    text,
    choices: choices.map((c) => ({ t: c.t, fx: next ? { next } : { end: 'cc_mot_chieu' }, note: c.note })),
  });

export const CC_CH10: Card[] = [
  /* ----- đỉnh sáng ----- */
  dinh('k10_dinh_p', 'd_phuc', 'tung_lo'),
  dinh('k10_dinh_t', 'd_trieu', 'hau_long'),
  cha('k10_cha1', 'k10_cha2', 'Hưng Bình năm thứ hai', ['Mùa đông năm Hưng Bình thứ hai. Bạn là Thuận đế, vua cuối cùng của nhà Hưng, mất nước đã ba năm, đang ở nhờ hậu liêu một ngôi chùa trên núi.', 'Ngoài sân tuyết rơi. Con gái bạn tám tuổi đang ngủ ở phòng bên.'],
    [{ t: 'Thắp thêm một ngọn đèn', note: 'Đèn sáng thêm một chút. Bạn ngồi đọc kinh, không đọc được chữ nào.' }]),
  cha('k10_cha2', 'k10_cha3', 'Mùi trà', ['Chiều nay có người của núi đến chùa trước người của triều mới một đêm. Họ mang theo trà núi, nhờ bếp chùa pha cho bệ hạ.', 'Bạn ngửi thấy mùi trà từ bếp bay lên. Lá nhỏ, mép răng cưa. Đắng trước, ngọt sau.'],
    [{ t: 'Ngồi yên', note: 'Bạn biết mùi ấy. Bạn đã uống nó ba năm trên núi. Đêm nay nó có thêm một mùi khác.' }]),
  cha('k10_cha3', 'k10_cha4', 'Cái khay', ['Cửa mở. Con gái bạn bưng khay trà vào, hai tay run, khay nặng quá sức một đứa trẻ tám tuổi.', 'Có người đã bảo con mang vào. Có người biết bạn sẽ không từ chối con.'],
    [
      { t: 'Đỡ khay cho con', note: 'Bạn đỡ lấy khay. Tay con lạnh ngắt. Bạn xoa tay con một lúc, rồi bảo con về ngủ.' },
      { t: 'Để con tự đặt xuống', note: 'Con đặt khay xuống, không sánh một giọt, nhìn bạn chờ được khen. Bạn khen.' },
    ]),
  cha('k10_cha4', 'k10_cha5', 'Nếu không uống', ['Nếu bạn không uống, họ sẽ biết bạn biết. Rồi họ sẽ bắt con pha lần nữa, lần nữa, đến khi bạn uống.', 'Nếu bạn uống, con sẽ sống. Người của núi cần con sống để làm cờ.'],
    [{ t: 'Nhìn chén trà rất lâu', note: 'Bạn nhìn chén trà như nhìn một người quen. Rồi bạn lấy giấy bút.' }]),
  cha('k10_cha5', undefined, 'Lá thư', ['Bạn viết một lá thư, gấp nhỏ, nhét vào ruột bức tượng gỗ trên bàn thờ. Một ngày nào đó con sẽ lớn, và sẽ nhớ ra.', 'Bạn chỉ viết được một điều.'],
    [
      { t: '"Con không có lỗi."', note: 'Bạn viết xong, uống chén trà, và nằm xuống. Hai mươi hai năm sau, con gái bạn đọc dòng ấy trước hai đạo quân, rồi đọc tiếp dòng thứ hai: "Thôi đừng đánh nữa."' },
      { t: '"Thôi đừng đánh nữa."', note: 'Bạn viết xong, uống chén trà, và nằm xuống. Hai mươi hai năm sau, con gái bạn đọc dòng ấy trước hai đạo quân, và không ai trong hai đạo quân cầm giáo lên nữa.' },
      { t: '"Cha biết."', note: 'Bạn viết xong, uống chén trà, và nằm xuống. Hai mươi hai năm sau, con gái bạn đọc hai chữ ấy trước hai đạo quân, rồi khóc lần đầu tiên từ năm tám tuổi.' },
    ]),
  /* ----- đỉnh tối ----- */
  khep('k10_pha_tra', { flags: ['d_tu', 'tung_tra'], not: ['binh_trung', 'huu_tin'], num: { chen: [3, 99] }, some: [1, ['chet_vuhoe', 'duoi_hoe', 'giet_oan']] }, 'dien', 'dien', 'ở điện Hy Quang', ['me'], 'Chén trà thứ ba',
    ['Ôn Tùng đã chết bằng đúng cách cha bạn đã chết. An vương, Bình, những người khác: bạn không còn đếm.', 'Không ai còn sống để gọi tên thật của bạn.'], 'Ngồi vào sau rèm', 'cc_pha_tra', 'Đêm đầu tiên ngồi một mình trong điện, bạn nhớ ra câu Thái hậu từng nói.'),
  /* ----- giết oan ----- */
  khep('k10_xu_lam', { flags: ['giet_oan'], some: [1, ['ha_an', 'tung_lo', 'hau_long', 'hau_ep', 'day_huu', 'lay_giai', 'kha_song', 'tung_tra']] }, 'phong', 'phong', 'trong phòng', ['me'], 'Bà không biết chữ',
    ['Thắng rồi. Một đêm, khi dọn lại đồ cũ, bạn tìm thấy lá thư quê của vú Hòe. Người ta kể bà nhờ ai đọc cũng cầm ngược tờ giấy.', 'Tờ khai có chữ ký "Hòe" viết bằng nét chữ của người đã học chữ mười năm.'], 'Ngồi xuống', 'cc_xu_lam', 'Bạn ngồi xuống giữa phòng, cầm tờ khai, rất lâu.'),
  /* ----- phục quốc ----- */
  khep('k10p_kha', { flags: ['d_phuc', 'chet_onkha'] }, 'vien', 'cong', 'ở cửa tây', ['me'], 'Nốt đàn sai',
    ['Ôn Kha nằm dựa lưng vào cửa tây, cây đàn đáy bên cạnh. Ông Tùng đứng nhìn cháu, lần đầu già đúng tuổi mình.', 'Anh chết thay bạn, và không kịp nói vì sao.'], 'Ngồi xuống cạnh anh', 'cc_kha_chet', 'Bạn ngồi xuống, nhặt cây đàn, gảy một nốt. Nốt sai.'),
  khep('k10p_ha', { flags: ['d_phuc', 'ha_co'] }, 'vien', 'cong', 'ở cửa tây', ['me'], 'Lá cờ dưới đất',
    ['Lá cờ Hưng nằm dưới đất, bị ngựa giẫm qua. Quân núi tan.', 'Quân triều tìm thấy bạn đứng một mình giữa cửa tây.'], 'Giơ hai tay lên', 'cc_ha_co', 'Bạn giơ hai tay, để họ trói.'),
  S({
    id: 'k10p',
    when: { flags: ['d_phuc'] },
    big: true,
    beat: 'cang',
    place: 'dien',
    img: 'trieu',
    where: 'ở điện cũ nhà Hưng',
    time: 'ngay',
    cast: ['me', 'ontung'],
    who: 'ontung',
    title: 'Chín bậc',
    text: ['Cờ Hưng bay trên thành cũ. Chín bậc đá lên ngai, bạn đứng ở bậc dưới cùng.', 'Ôn Tùng quỳ bên thềm, như mỗi sáng.'],
    choices: [
      { t: 'Bước lên ngồi ghế của cha', need: { flags: ['kha_song'], some: [1, ['ha_an', 'tung_lo']], not: ['im_tung', 'roi_cua'] }, lockHint: 'Bạn chưa giữ được người đàn đáy, chưa hạ được ai, hoặc đêm cửa tây bạn đã im, đã rời chỗ.', fx: { end: 'cc_vuong' }, note: 'Bạn bước lên từng bậc, không vịn.' },
      { t: 'Đứng trên thành, giơ tay đúng lúc', fx: { end: 'cc_bunhin' }, note: 'Bạn đứng đó, giơ tay khi ông gật đầu.' },
      { t: 'Đánh tiếp đến người cuối cùng', fx: { end: 'cc_cuoi_lac' }, note: 'Bạn lên ngựa, đánh tiếp.' },
    ],
  }),
  /* ----- triều mới ----- */
  khep('k10t_goa', { flags: ['d_trieu', 'cuoi_an'] }, 'phong', 'phong', 'ở một viện có tên đẹp', ['me'], 'Viện có tên đẹp',
    ['Ba năm sau ngày vua về, bạn vẫn ở viện ấy. Hoàng hậu Lương có gửi đến một chậu hoa, mỗi mùa một chậu.', 'Ngoài chậu hoa, không ai đến.'], 'Tưới hoa', 'cc_goa', 'Bạn tưới hoa mỗi sáng.'),
  khep('k10t_dong', { flags: ['d_trieu', 'im_cua'] }, 'phong', 'phong', 'ở cung Hoàng hậu', ['me'], 'Chiếc trâm mới',
    ['Vua thưởng bạn một chiếc trâm ngọc mới, đẹp hơn chiếc cũ.', 'Người đàn đáy không còn đàn ở đâu nữa.'], 'Cất trâm vào hộp', 'cc_dong_cua', 'Bạn cất trâm vào hộp, cạnh mấy lá trà khô.'),
  S({
    id: 'k10t_chep',
    when: { flags: ['d_trieu', 'chep_lenh', 'hau_long'] },
    big: true,
    beat: 'cang',
    place: 'dien',
    img: 'dien',
    where: 'ở thư phòng vua',
    time: 'dem',
    cast: ['me', 'vua'],
    moods: { vua: 'buon' },
    who: 'vua',
    lead: 'Hưng Bình năm thứ hai mươi tư.',
    title: 'Bản chép',
    text: ['Vua đặt lên bàn một tờ giấy gấp tư, lấy từ đáy hộp sơn mài của bạn. Bản chép tờ lệnh chở lương, nét chữ của bạn.', '"Nàng đốt bản thật trước mặt trẫm," ông nói. "Trẫm đã tin."'],
    choices: [
      { t: '"Thiếp chép vì thiếp sợ. Bệ hạ đốt nốt đi."', need: { some: [1, ['tra_nguoi', 'vua_hien', 'nop_so_vua']] }, lockHint: 'Giữa hai người chưa từng có lúc nào đủ thật để ông tin câu này.', fx: { d: { tm: 1 } }, note: 'Ông nhìn bạn rất lâu. Rồi ông nhớ một chén trà nguội, một buổi tuyết, và đưa tờ giấy vào lò. "Trẫm cũng sợ," ông nói.' },
      { t: 'Chối', fx: { flag: ['hau_ep'], unflag: ['hau_long'] }, note: 'Ông gật đầu, gấp tờ giấy lại, đẩy về phía bạn. "Nàng giữ đi," ông nói. "Giữ thì nàng yên tâm hơn." Từ câu ấy, hai người không còn là hai người nữa. Chỉ còn là hai bên.' },
      { t: 'Im lặng', fx: { flag: ['hau_ep'], unflag: ['hau_long'] }, note: 'Ông đợi. Bạn không nói. Ông đẩy tờ giấy về phía bạn, đứng dậy, và lần đầu tiên gọi bạn bằng tước chứ không bằng tên.' },
    ],
    omen: 'Chép một bản để phòng thân là giữ lại một lý do để người kia thôi tin.',
  }),
  S({
    id: 'k10t',
    when: { flags: ['d_trieu'] },
    big: true,
    beat: 'cang',
    place: 'dien',
    img: 'trieu',
    where: 'ở điện Hy Quang',
    time: 'ngay',
    cast: ['me', 'vua'],
    who: 'vua',
    title: 'Chín bậc',
    text: ['Triều yên. Vua đứng ở bậc trên cùng, chìa tay xuống. Chín bậc đá, bạn đứng ở bậc dưới cùng.', '"Nàng lên đây," ông nói.'],
    choices: [
      { t: 'Lên, nhận ngôi hậu', need: { flags: ['hau_long'], not: ['bi_phan', 'so_ban', 'huu_han', 'roi_cua', 'doi_tung', 'bao_kha'] }, lockHint: 'Giữa bạn và ngôi ấy còn một điều chưa xong: lòng tin của ông, một dòng sổ, mười hai người lính trên đèo Gió, hoặc ánh mắt của Hựu.', fx: { end: 'cc_hoang_hau' }, note: 'Bạn bước lên, nắm tay ông.' },
      { t: 'Lên, cầm tờ lệnh trong tay áo', need: { flags: ['hau_ep'] }, lockHint: 'Bạn không giữ gì buộc được ông.', fx: { end: 'cc_hau_giay' }, note: 'Bạn bước lên, tay kia giữ chặt tay áo.' },
      { t: 'Đứng lại, xin ở cạnh ông như người thường', need: { some: [1, ['tra_nguoi', 'vua_hien', 'hau_long']] }, lockHint: 'Giữa hai người chưa có gì để giữ lại.', fx: { end: 'cc_tra_nguoi' }, note: 'Bạn đứng lại ở bậc dưới. Ông bước xuống.' },
      { t: 'Xin ra khỏi cung, đi theo tiếng đàn đáy', need: { flags: ['bao_kha'], some: [1, ['tinh_kha', 'nghe_kha', 'theo_kha']] }, lockHint: 'Bạn chưa từng cứu anh, hoặc giữa hai người chưa có gì.', fx: { end: 'cc_dua_do' }, note: 'Vua nhìn bạn rất lâu, rồi gật đầu. Ông không nói dối bạn: ông để bạn đi.' },
      { t: 'Cúi đầu, lui ra', fx: { end: 'cc_contin' }, note: 'Bạn cúi đầu và lui ra, như mười hai năm làm con tin.' },
    ],
  }),
  /* ----- tự mình ----- */
  S({
    id: 'k10u',
    when: { flags: ['d_tu'] },
    big: true,
    beat: 'cang',
    place: 'dien',
    img: 'trieu',
    where: 'ở điện Hy Quang',
    time: 'dem',
    cast: ['me'],
    mood: 'lo',
    title: 'Chín bậc',
    text: ['Điện trống. Chín bậc đá, ngai không ai ngồi. Trong tay áo bạn có trang sổ, có chiếc khăn, có những cái tên.', 'Bạn có thể ngồi ở đâu cũng được. Chỉ là không thể ngồi ở hai chỗ.'],
    choices: [
      { t: 'Đưa Hựu lên ngai, mình ngồi sau rèm', need: { flags: ['day_huu'], some: [1, ['day_danh', 'tra_an', 'bay_an', 'tung_tra', 'dong_nui', 'lui_nui']], not: ['huu_han', 'roi_cua'] }, lockHint: 'Bạn chưa có dây buộc Hựu, chưa hạ được ai, hoặc Hựu đã thôi gọi bạn là cô.', fx: { end: 'cc_sau_rem' }, note: 'Bạn buông rèm xuống.' },
      { t: 'Để cả ba bên tiếp tục chờ', need: { flags: ['ba_cho'] }, lockHint: 'Không ai đang chờ bạn.', fx: { end: 'cc_ba_cuoi' }, note: 'Bạn gửi ba lá thư, mỗi lá một lời hứa.' },
      { t: 'Đốt trang sổ', need: { flags: ['m5'] }, lockHint: 'Bạn không giữ trang sổ nào.', fx: { end: 'cc_so_chay' }, note: 'Bạn đốt trang sổ trong lò hương, rồi ngồi chờ sáng.' },
      { t: 'Đưa Hựu lên ngai, rồi về viện cũ, không buông rèm', need: { flags: ['huu_tin'], some: [1, ['day_danh', 'tra_an', 'bay_an', 'tung_tra', 'dong_nui', 'lui_nui']], not: ['huu_han'] }, lockHint: 'Hựu chưa từng gọi bạn là cô, hoặc bạn chưa hạ được ai.', fx: { end: 'cc_co_vua' }, note: 'Bạn đưa cậu lên bậc thứ chín, rồi đi xuống.' },
      { t: 'Mở cửa lầu, trả ngai cho người từng nhắn bạn một chữ', need: { flags: ['vua_cuoi'] }, lockHint: 'Bạn chưa từng nhận lời ông.', fx: { end: 'cc_tra_nguoi' }, note: 'Bạn mở cửa, đưa ông chìa khóa điện.' },
      { t: 'Bỏ điện, đi theo tiếng đàn đáy ngoài tường', need: { flags: ['kha_cuoi', 'tung_song'], not: ['chet_onkha'] }, lockHint: 'Bạn chưa nhận lời núi, hoặc ông của anh không còn.', fx: { end: 'cc_dua_do' }, note: 'Bạn đi ra cửa tây, lần này không ai giữ.' },
      { t: 'Ngồi lại một mình', fx: { end: 'cc_mot_minh' }, note: 'Bạn ngồi xuống bậc thứ chín.' },
    ],
  }),
  /* ----- bỏ đi ----- */
  S({
    id: 'k10d_vu',
    when: { flags: ['d_di', 'tuong_go', 'khong_tien'], not: ['chet_vuhoe'] },
    beat: 'lang',
    place: 'bien',
    img: 'bien',
    where: 'ở bến biển',
    time: 'chieu',
    cast: ['me'],
    mood: 'buon',
    title: 'Người lau tượng',
    text: ['Đêm bạn ghé hậu liêu Lũng Vân, người trông hậu liêu là một bà già tóc bạc, không biết chữ. Bà đưa bức tượng gỗ cho bạn bằng hai tay, không nói gì. Trời tối, bạn không nhìn mặt.', 'Giờ bạn mới nhớ ra đôi bàn tay ấy. Năm bạn đuổi bà đi không một đồng tiền đường, bà đã đi bộ về đó, và lau bức tượng của cha bạn mỗi sáng.'],
    choices: [
      { t: 'Gửi về Lũng Vân túi tiền đường năm ấy', fx: {}, note: 'Túi tiền quay lại sau một tháng, còn nguyên, kèm một nắm lá trà khô gói trong lá chuối. Bà không biết chữ. Bà chỉ biết gửi thứ bà có.' },
      { t: 'Không gửi gì', fx: {}, note: 'Có những món nợ trả bằng tiền thì thành ra rẻ. Bạn để nó nguyên đó.' },
    ],
  }),
  S({
    id: 'k10d',
    when: { flags: ['d_di'] },
    big: true,
    beat: 'lang',
    place: 'bien',
    img: 'bien',
    where: 'ở bến biển',
    time: 'ngay',
    cast: ['me'],
    title: 'Bến',
    text: ['Bạn đã uống thuốc giải. Ở bến có một con thuyền nhỏ, và phía sau là ngôi chùa biển.', 'Không ai ở kinh thành biết bạn đang ở đâu. Lần đầu tiên trong đời, không ai cần biết.'],
    choices: [
      { t: 'Thả ấn Hưng Thiên xuống biển', need: { flags: ['giu_an'] }, lockHint: 'Bạn không giữ chiếc ấn nào.', fx: { end: 'cc_an_bien' }, note: 'Bạn chèo ra xa, mở giỏ.' },
      { t: 'Chèo đò với anh', need: { flags: ['cuoi_kha'], not: ['chet_onkha'] }, lockHint: 'Không có ai chờ bạn ở bến.', fx: { end: 'cc_dua_do' }, note: 'Anh đỡ bạn xuống thuyền.' },
      { t: 'Xuống thuyền ra khơi', need: { not: ['chua_lo'] }, lockHint: 'Lính triều đã thấy Hựu ở chùa. Bến này có người canh.', fx: { end: 'cc_ra_khoi' }, note: 'Bạn xuống thuyền trước khi trời sáng.' },
      { t: 'Đi tiếp, để cờ rách trên núi', need: { flags: ['di_bien'] }, lockHint: 'Bạn chưa từng quay lưng với ai cần mình.', fx: { end: 'cc_co_trong' }, note: 'Bạn đi tiếp.' },
      { t: 'Quay về chùa, xuống tóc', fx: { end: 'cc_su_co' }, note: 'Bạn quay về chùa.' },
    ],
  }),
  /* ----- rơi vào tay An vương ----- */
  khep('k10a_ruou', { flags: ['d_an', 'an_doi'] }, 'dien', 'dien', 'ở điện Hy Quang', ['me', 'anvuong'], 'Chén thứ hai',
    ['An vương rót hai chén, đẩy một chén về phía bạn. "Lần trước nàng đổi chén," ông nói, giọng nhỏ nhẹ. "Lần này em đổi trước rồi."'], 'Uống', 'cc_ruou_an', 'Bạn uống.'),
  khep('k10a', { flags: ['d_an'] }, 'dien', 'dien', 'ở điện Hy Quang', ['me'], 'Bức tranh',
    ['Mỗi buổi chầu bạn vẫn đứng cạnh ngai, áo đẹp nhất, đèn sáng nhất.', 'Người cũ đã thôi nhìn lên.'], 'Đứng yên', 'cc_tranh', 'Bạn đứng yên, như mọi buổi.'),
];
