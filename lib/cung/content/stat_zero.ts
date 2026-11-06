import type { Card, NumK } from '../types';
/**
 * Chỉ số chạm đáy: lần đầu có một cảnh cảnh báo để gỡ (phải trả giá), lần sau thì đời khép lại.
 * Ân sủng về 0: bị lãng quên. Đức về 0: tiếng ác, bị phế. Thế về 0: không ai chống lưng, vào lãnh cung.
 * Mưu về 0: ngây thơ, uống phải chén độc. Sắc về 0: tàn phai, khoác áo nâu.
 */
export const ZERO_END: Partial<Record<NumK, string>> = { an: 'e_lang_le', duc: 'd_phe', the: 'd_fd_lanh_cung', muu: 'd_doc', sac: 'e_di_tu' };

const ALLCH = [1, 2, 3, 4, 5, 6, 7];
export const ZERO_CARDS: Card[] = [
  {
    id: 'w0_an',
    step: true,
    chapter: ALLCH,
    place: 'vien',
    time: 'chieu',
    cast: ['me', 'hanh'],
    mood: 'buon',
    moods: { hanh: 'lo' },
    who: 'hanh',
    title: 'Ngọn đèn không còn đỏ',
    text: ['Đã mấy mùa, đèn đỏ không một lần dừng trước cửa viện bạn. Phúc đi ngang cũng không ghé.', 'Hạnh nói nhỏ: "Người trong cung bắt đầu quên tên viện mình rồi, chủ nhân ạ. Quên thêm một năm nữa là không ai nhớ lại."'],
    omen: 'Trong cung, bị quên còn lâu hơn bị ghét.',
    choices: [
      { t: 'Bán trâm, nhờ Phúc đặt lại thẻ hàng trên', need: { num: { tien: [8, 99999] } }, lockHint: 'Cần 8 quan', fx: { d: { an: 18, tien: -8, duc: -3 } }, note: 'Phúc nhận tiền, không hứa gì. Nửa tháng sau, đèn đỏ treo trước cửa viện bạn một đêm. Một đêm thôi, nhưng cả hậu cung lại nhớ ra bạn.' },
      { t: 'Thức ba đêm thêu tấm bình phong mừng thọ Thái hậu', fx: { d: { an: 12, sac: -6, thaihau: 6 } }, note: 'Thái hậu khen đường kim, đem tấm bình phong đặt trong điện. Hoàng thượng hỏi ai thêu. Mắt bạn mờ đi mất một chút.' },
      { t: 'Thôi, đóng cửa viện, sống những ngày còn lại cho yên', fx: { end: 'e_lang_le' }, note: 'Bạn bảo Hạnh tháo luôn móc treo đèn trước cửa.' },
    ],
  },
  {
    id: 'w0_duc',
    step: true,
    chapter: ALLCH,
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'thaihau'],
    mood: 'so',
    moods: { thaihau: 'gian' },
    who: 'thaihau',
    title: 'Lời đồn đến tai Thái hậu',
    text: ['Cả hậu cung đồn bạn ác: hại người, bức tử cung nữ, cười trên đám tang người khác. Lời đồn đã đến cung Thái hậu.', 'Thái hậu không cho ngồi: "Ta cho ngươi một lần nói. Nói xong thì ta mới quyết."'],
    omen: 'Một người ác thì cung chịu được. Một người bị cả cung gọi là ác thì không.',
    choices: [
      { t: 'Xin lên chùa Vân Tịch chép kinh trăm ngày sám hối', fx: { d: { duc: 18, an: -8, the: -4 }, years: 0.5 }, note: 'Trăm ngày ở chùa, tay bạn thâm mực. Lúc về, lời đồn đã nhạt, nhưng chỗ của bạn trong cung cũng nhạt theo.' },
      { t: 'Đem hết của riêng ra phát chẩn cho dân đói ngoài cửa thành', need: { num: { tien: [10, 99999] } }, lockHint: 'Cần 10 quan', fx: { d: { duc: 20, tien: -10 } }, note: 'Dân ngoài cửa Tây gọi bạn là "bà phi phát gạo". Lời đồn trong cung không át nổi lời khen ngoài chợ.' },
      { t: 'Không thèm giải thích', fx: { end: 'd_phe' }, note: 'Thái hậu phất tay. Chiều ấy, có người mang đến một khay gỗ phủ lụa trắng.' },
    ],
  },
  {
    id: 'w0_the',
    step: true,
    chapter: ALLCH,
    place: 'phong',
    time: 'dem',
    cast: ['me', 'hanh'],
    mood: 'so',
    moods: { hanh: 'so' },
    who: 'hanh',
    title: 'Không còn ai đứng sau',
    text: ['Người quen trong cung lần lượt quay mặt. Than sưởi của viện bạn bị cắt nửa, gạo thì mốc.', 'Hạnh vừa nghe được: có người đang soạn sẵn một tội danh, chỉ chờ ngày dâng lên.'],
    omen: 'Không ai chống lưng thì tội nào cũng vừa người.',
    choices: [
      { t: 'Viết thư về nhà xin cha mẹ gom tiền nhờ quan làng nói giúp', fx: { d: { the: 15, tien: -5 } }, note: 'Ba tháng sau có một viên quan nhỏ trong Bộ Lễ ghé thăm viện bạn, mang theo lời hỏi thăm của người quê. Từ đó gạo trắng trở lại.' },
      { t: 'Quỳ trước cửa cung Hoàng hậu xin được nương tựa', fx: { d: { the: 14, duc: -4, hoanghau: 10 } }, note: 'Bạn quỳ đến lúc trời tối. Tào công công ra dắt bạn vào. Từ đêm ấy bạn là người của cung Ngọc Khuê, muốn hay không.' },
      { t: 'Ngồi đợi, đến đâu thì đến', fx: { end: 'd_fd_lanh_cung' }, note: 'Tội danh dâng lên vào một sáng mùa đông. Không ai đứng ra nói giúp bạn một lời.' },
    ],
  },
  {
    id: 'w0_muu',
    step: true,
    chapter: ALLCH,
    place: 'phong',
    time: 'chieu',
    cast: ['me', 'hanh'],
    mood: 'lo',
    moods: { hanh: 'lo' },
    who: 'hanh',
    title: 'Ai cũng là người tốt',
    text: ['Bạn tin hết mọi người: ai tặng gì cũng nhận, ai rủ gì cũng đi. Hạnh nhìn chén chè sen người viện bên vừa gửi sang.', '"Chủ nhân, chén này... chủ nhân có định uống không?"'],
    omen: 'Ngọt quá. Đến lúc nhận ra thì đã muộn.',
    choices: [
      { t: 'Đổ chè cho con mèo hoang thử trước', fx: { d: { muu: 16, duc: -2 } }, note: 'Con mèo liếm mấy ngụm, đến tối thì nằm im. Từ đó bạn nhìn mọi món quà bằng con mắt khác.' },
      { t: 'Xin ma ma Trịnh dạy cách giữ mình trong cung', fx: { d: { muu: 14, tien: -3 } }, note: 'Ma ma dạy bạn ba điều: không ăn đồ người khác gửi, không đi một mình sau giờ Dậu, và không tin người khóc trước mặt mình.' },
      { t: 'Uống, người ta có ý tốt mà', fx: { end: 'd_doc' }, note: 'Chè ngọt lắm.' },
    ],
  },
  {
    id: 'w0_sac',
    step: true,
    chapter: ALLCH,
    place: 'phong',
    time: 'ngay',
    cast: ['me', 'hanh'],
    mood: 'buon',
    moods: { hanh: 'buon' },
    who: 'hanh',
    title: 'Gương đồng',
    text: ['Gương đồng soi ra một người khác: mắt quầng, da xám, tóc rụng từng nắm.', 'Hạnh cất gương đi: "Chủ nhân ốm lâu quá rồi. Người trong cung nhìn mặt mà đối xử, chủ nhân biết mà."'],
    omen: 'Hoa trong cung tàn nhanh hơn hoa ngoài đồng.',
    choices: [
      { t: 'Mời thái y kê thuốc bổ, nghỉ ngơi một mùa', need: { num: { tien: [6, 99999] } }, lockHint: 'Cần 6 quan', fx: { d: { sac: 18, tien: -6, an: -4 }, years: 0.5 }, note: 'Một mùa uống thuốc, ăn cháo, ngủ sớm. Má hồng lại, nhưng đèn đỏ cũng đã quen dừng ở viện khác.' },
      { t: 'Học cách điểm trang của người giáo phường', fx: { d: { sac: 14, duc: -4 } }, note: 'Phấn dày hơn, son đậm hơn. Có người chê lẳng lơ, nhưng ai đi qua cũng ngoái lại.' },
      { t: 'Xin lên chùa, không soi gương nữa', fx: { end: 'e_di_tu' }, note: 'Bạn để lại gương đồng cho Hạnh.' },
    ],
  },
];
