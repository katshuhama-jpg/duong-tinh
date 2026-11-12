/**
 * Phần Cung nga giặt áo - Chương 7: Bờ bên kia (một năm sau khi ra cung, Hưng Bình năm 9, Đào 24 tuổi; kết đỉnh ở HB18, Đào 33, Hựu 15).
 * Hai lối vào (thẻ mở màn theo cờ): nhan_nham (bế nhầm đứa mang tên Hựu, con Hến) hoặc tra_con (trả con ở bến).
 * Kết đỉnh "Chiếc áo mẹ giặt" (đường Nợ) cần: trả con, nhận đúng, tin Hoàng hậu, tha Mơ; không bán Thanh, không ghi tên ai,
 *   không nói với vua hay đổ cho Cúc ở chương 4, Tuất còn sống, không mở sổ Quế; chọn im lặng chờ mười năm.
 * Kết đỉnh "Người cầm sổ" (đường Hạ) cần: trả con, nhận đúng, đã mở sổ Quế ở bến (tức là đã hạ Quế và đứng bậc 4 trở lên); chọn chờ mười năm.
 * Mồi sang Phần 4: "Tiếng giáo ngoài cổng", và (đường Hạ) tên một vị công chúa triều trước trong sổ.
 */
import type { Card } from '../types';

const P = 'cungnga' as const;
type Step = Omit<Card, 'part' | 'chapter'>;
const c = (x: Step): Card => ({ part: P, chapter: [7], step: true, ...x });
const go = (next: string) => ({ next });

/** điều kiện kết đỉnh "Chiếc áo mẹ giặt" */
const AO_ME = {
  flags: ['tra_con', 'nhan_dung', 'tin_hh', 'tha_mo'],
  not: ['ban_thanh', 'ghi_ten', 'vua_nhac', 'noi_vua', 'chi_cuc', 'tuat_chet', 'mo_so_que'],
};

export const CN_CH7: Card[] = [
  c({
    id: 'c7_nham',
    step: false,
    urgent: true,
    beat: 'hook',
    when: { flags: ['nhan_nham'] },
    place: 'lang',
    img: 'lang',
    where: 'ở một làng ven sông',
    time: 'chieu',
    cast: ['me'],
    mood: 'buon',
    lead: 'Một năm sau.',
    title: 'Hai đứa trẻ',
    text: ['Bạn ra khỏi cung dưới một cái tên khác. Người ta nói Hoàng trưởng tử vẫn khỏe, và từ mùa ấy, tối nào cũng hát nửa câu ru.', 'Còn đứa bé bạn đã bế ra bến, người ta đem về một trang ngoài thành, chỗ đất đỏ như gấu áo bà đỡ năm nào.'],
    choices: [
      { t: 'Sống với điều mình đã làm', fx: { end: 'cn_be_nham' } },
      { t: 'Đi tìm trang đất đỏ, tìm người tên Hến', fx: { end: 'cn_con_hen' } },
    ],
  }),
  c({
    id: 'c7_nam',
    step: false,
    urgent: true,
    beat: 'hook',
    when: { flags: ['tra_con'] },
    place: 'lang',
    img: 'phu',
    where: 'ở phố ngoài thành',
    time: 'chieu',
    cast: ['me'],
    lead: 'Một năm sau.',
    title: 'Ba chữ mỗi năm',
    text: ['Bạn sống ngoài cung dưới một cái tên tự đặt. Mỗi năm, vào một ngày không định trước, có người dúi vào tay bạn mẩu giấy ba chữ: "Còn sống, khỏe."', 'Có năm bạn theo người ấy về tận nhà. Đó là Thái y Thẩm. "Tôi đã ghi một dòng giả," ông nói. "Mỗi năm tôi trả một dòng thật."'],
    choices: [{ t: 'Gật đầu, không hỏi thêm', fx: go('c7_song'), note: 'Ông có vợ con ở ngoài thành. Ông cũng đang trả một món nợ, như bạn. Có lần ông kể thêm, không ai hỏi: ở một trang đất đỏ ngoài thành có một thằng bé học chữ chậm, hay cười, không biết mình từng đeo khóa ngọc.' }],
  }),
  c({
    id: 'c7_song',
    place: 'lang',
    img: 'phu',
    where: 'ở phố ngoài thành',
    time: 'chieu',
    cast: ['me'],
    title: 'Sống ở đâu',
    text: ['Bạn phải chọn sống ở đâu, sống với ai.', 'Những người còn lại với bạn sau năm năm trong cung, chỉ đếm trên một bàn tay.'],
    choices: [
      { t: 'Đến chùa biển, ở cạnh Mơ', need: { flags: ['tha_mo'] }, lockHint: 'Bạn đã không tha cho Mơ.', fx: { flag: ['song_mo'], years: 6, next: 'c7_chon' }, note: 'Mơ đã xuống tóc. Cô giữ chiếc khăn thêu chỉ đỏ trong rương kinh, và không đưa cho bạn. "Chưa đến lúc," cô nói.' },
      { t: 'Ra bến sông bán nước chè cùng Lục', need: { flags: ['luc_chon'] }, lockHint: 'Lục chưa từng chọn bạn.', fx: { flag: ['song_luc'], years: 6, next: 'c7_chon' }, note: 'Lục chèo đò, bạn bán chè. Anh chưa một lần nhắc đến những đêm anh gặp Quế, và bạn không hỏi.' },
      { t: 'Làm thuê một mình', fx: { flag: ['song_mot'], years: 6, next: 'c7_chon' }, note: 'Bạn giặt thuê cho các nhà giàu trong phố. Bạn đọc vết trên áo họ, và không nói với ai điều mình đọc được.' },
    ],
  }),
  c({
    id: 'c7_chon',
    big: true,
    place: 'lang',
    img: 'phu',
    where: 'ở phố ngoài thành',
    time: 'chieu',
    cast: ['me'],
    mood: 'lo',
    lead: 'Bảy năm sau ngày ra cung.',
    title: 'Mười hai tuổi',
    text: ['Tóc bạn có sợi bạc đầu tiên. Hựu đã mười hai, nghe nói học giỏi, ít cười.', 'Bạn có thể đi tìm con, có thể chờ, hoặc có thể sống như chưa từng có con.'],
    omen: 'Người đi tìm con thì bị người khác tìm thấy trước.',
    choices: [
      { t: 'Đứng ở cổng cung mỗi dịp lễ, nhìn từ xa', fx: { end: 'cn_cong' } },
      { t: 'Im lặng, chờ thêm vài năm', fx: { years: 3, next: 'c7_muoi' }, note: 'Bạn cất mẩu giấy ba chữ năm ấy vào hộp, và đợi.' },
      { t: 'Sống yên, không nhìn về phía cung nữa', fx: go('c7_yen'), note: 'Bạn quay lưng về phía bức tường thành. Lần này bạn không ngoái lại.' },
      { t: 'Mở chiếc hộp gỗ giữ tờ giấy của Quế', need: { flags: ['ban_thanh'] }, lockHint: 'Bạn không có tờ giấy nào phải giữ.', fx: { end: 'cn_ban_thanh' } },
    ],
  }),
  c({
    id: 'c7_yen',
    place: 'lang',
    img: 'phu',
    where: 'ở phố ngoài thành',
    time: 'chieu',
    cast: ['me'],
    title: 'Sống yên',
    text: ['Bạn cất mảnh vải thử vào đáy rương và thôi đếm năm.', 'Có những đời người kết thúc không bằng một tiếng động nào.'],
    choices: [
      { t: 'Ở lại chùa biển với Mơ', need: { flags: ['song_mo'] }, lockHint: 'Bạn không ở cạnh Mơ.', fx: { end: 'cn_chua_bien' } },
      { t: 'Ở lại bến sông với Lục', need: { flags: ['song_luc'] }, lockHint: 'Bạn không ở cạnh Lục.', fx: { end: 'cn_quan_nuoc' } },
      { t: 'Giặt thuê đến hết đời', need: { flags: ['song_mot'] }, lockHint: 'Bạn không sống một mình.', fx: { end: 'cn_dua_tin' } },
      { t: 'Nghe tin về Cúc', need: { flags: ['chi_cuc'] }, lockHint: 'Bạn không có món nợ nào với Cúc.', fx: { end: 'cn_tra_nguoi' } },
    ],
  }),
  c({
    id: 'c7_muoi',
    big: true,
    beat: 'cang',
    place: 'vien',
    img: 'cong',
    where: 'ở cổng cung',
    time: 'ngay',
    cast: ['me'],
    lead: 'Hưng Bình năm thứ mười tám.',
    title: 'Lệnh tuyển',
    text: ['Cung làm lễ đội mũ cho Hoàng trưởng tử mười lăm tuổi, và tuyển thêm người giặt áo lễ. Bạn đứng trước bàn tuyển, dưới một cái tên mới.', 'Người xem sổ nhìn dòng cuối, giật mình: có một nét chữ không phải của thư lại.'],
    omen: 'Lời của Thái hậu không bao giờ sai một chữ, nhưng chữ ấy chỉ dành cho một người.',
    choices: [
      { t: 'Nhận chiếc áo lễ về giặt', need: AO_ME, lockHint: 'Lệnh tuyển ấy không dành cho người đã ghi tên ai, bán ai, để ai chết thay, hay đã lỡ lời trước ngự giá.', fx: go('c7_ao'), note: 'Người xem sổ đứng dậy, cúi chào bạn, và tự tay đưa chiếc áo lễ.' },
      { t: 'Không vào. Đứng ngoài phố, tay cầm cuốn sổ', need: { flags: ['mo_so_que', 'nhan_dung', 'tra_con'] }, lockHint: 'Bạn không có cuốn sổ nào để cầm.', fx: go('c7_so'), note: 'Bạn rút tên khỏi bàn tuyển. Cuốn sổ trong ngực áo nặng như một viên gạch.' },
      { t: 'Rút tên, đứng ngoài cổng nhìn đoàn rước', fx: { end: 'cn_cong' } },
    ],
  }),
  c({
    id: 'c7_ao',
    beat: 'cang',
    place: 'vien',
    img: 'sangiat',
    where: 'ở sân giặt',
    time: 'ngay',
    cast: ['me', 'huu'],
    mood: 'vui',
    title: 'Chiếc áo mẹ giặt',
    text: ['Dòng cuối là nét tay Thái hậu, viết trước khi bà mất: một lệnh tuyển, chỉ cho một cái tên vào. Bà đã trả tên cho bạn, theo cách duy nhất bà có.', 'Bạn giặt chiếc áo lễ cho Hựu. Ngày đại lễ, cậu mặc nó đi ngang hàng người giặt, dừng lại, và cúi chào bạn lâu hơn mọi người.'],
    choices: [
      { t: 'Nghe cậu ngân khẽ khi đi qua', need: { flags: ['hat_ru'] }, lockHint: 'Bạn đã không hát cho cậu nghe ở bến.', fx: { end: 'cn_ao_me' }, note: 'Hai nhịp của câu ru, rất khẽ, đúng chỗ ngân. Không ai trong hàng người hiểu vì sao bạn khóc. Chiều ấy, ngoài cổng thành có tiếng giáo.' },
      { t: 'Tìm thấy cây bút nhỏ trong túi áo lễ', need: { flags: ['nguoi_giat_ao'] }, lockHint: 'Bạn đã không nói với cậu mình là ai.', fx: { end: 'cn_ao_me' }, note: 'Cậu để lại một cây bút nhỏ, như để trả lời một câu bạn chưa hỏi. Đêm ấy bạn mơ lại giấc mơ cũ: một đứa trẻ cầm bút viết lên đá, và đá không vỡ. Ngoài cổng thành có tiếng giáo.' },
      { t: 'Nhìn cậu đi khuất', need: { flags: ['om'] }, lockHint: 'Bạn đã không ôm cậu ở bến.', fx: { end: 'cn_ao_me' }, note: 'Cậu không biết vì sao mình cúi lâu như thế. Bạn biết. Chiều ấy, ngoài cổng thành có tiếng giáo.' },
    ],
  }),
  c({
    id: 'c7_so',
    beat: 'cang',
    place: 'vien',
    img: 'phu',
    where: 'ở phố ngoài cung',
    time: 'ngay',
    cast: ['me'],
    mood: 'dac',
    title: 'Người cầm sổ',
    text: ['Bạn không vào. Bạn đứng ở phố ngoài, tay cầm cuốn sổ của Quế, nay dày gấp đôi bằng nét chữ của chính bạn.', 'Một thư lại cũ dúi cho bạn bản danh sách khách mời đại lễ. Mọi cái tên trong đó đều đã nằm trong sổ bạn.'],
    choices: [{ t: 'Lật đến trang cuối', fx: { end: 'cn_cam_so' }, note: 'Trang cuối có tên một vị công chúa triều trước. Ngoài cổng thành, có tiếng giáo.' }],
  }),
];
