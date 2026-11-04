/**
 * Đường dân nữ (g_dan): người cũ ở cửa Tây. Xem research_notes/duong_dan.md.
 * Khoan, trai làng Mai Đông từng hẹn chờ bạn, đi lính để được đứng gần cung.
 * Cờ riêng tiền tố dn_: dn_khoan (Khoan còn ở kinh), dn_tai_mat (Khoan làm tai mắt ở cửa Tây).
 */
import type { Card, Ending } from '../types';

export const ORIGIN_DAN: Card[] = [
  /* Chặng 2: gặp lại */
  {
    id: 'd2_linh',
    big: true,
    chapter: [2],
    after: 'b2_vu',
    when: { flags: ['g_dan'], not: ['nu_y'] },
    place: 'vien',
    time: 'chieu',
    cast: ['me', 'tuong'],
    mood: 'so',
    moods: { tuong: 'buon' },
    where: 'ở cửa Tây',
    who: 'tuong',
    whoName: 'Khoan, lính canh cửa Tây',
    title: 'Người lính cửa Tây',
    text: ['Đi qua cửa Tây, bạn nghe tiếng gọi rất khẽ: "Diệp ơi." Người lính canh là Khoan, trai làng Mai Đông từng hẹn chờ bạn hết mùa chè.', '"Anh xin đi lính chỉ để được đứng gần chỗ em. Em bảo đi, anh đi."'],
    omen: 'Ở trong cung, một người đàn ông biết tên cúng cơm của bạn là một con dao.',
    choices: [
      { t: 'Quay mặt đi, coi như không quen', fx: { d: { duc: 6, muu: -2 } }, note: 'Hôm sau Khoan xin đổi sang canh cửa Bắc. Bạn không hỏi vì sao.' },
      { t: 'Nhận lại gói chè mẹ gửi nhờ anh, hẹn không gặp nữa', fx: { d: { the: 4, sac: 2 }, flag: ['dn_khoan'] }, note: 'Gói chè còn thơm. Khoan vẫn đứng cửa Tây, mỗi lần bạn đi qua đều cúi đầu thật thấp.' },
      { t: 'Nhờ anh làm tai mắt, ai ra vào cửa Tây thì báo', fx: { d: { muu: 8 }, flag: ['dn_khoan', 'dn_tai_mat'] }, note: 'Từ đó, tên cung nữ nào lén ra cửa Tây đều đến tai bạn trước tối.', risk: { p: 0.3, fail: { d: { muu: 4, an: -6, thucphi: -6 }, flag: ['dn_khoan', 'dn_tai_mat'] }, failNote: 'Thái giám Phúc thấy hai người đứng nói chuyện. Hắn không nói gì, chỉ ghi một dòng vào sổ.' } },
    ],
  },

  /* Chặng 3: chiếc khăn thêu */
  {
    id: 'd2_khan',
    big: true,
    chapter: [3],
    after: 'b3_thai',
    when: { flags: ['g_dan', 'dn_khoan'], not: ['say_thai', 'nu_y'] },
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'thucphi', 'thaihau'],
    mood: 'so',
    moods: { thucphi: 'dac', thaihau: 'gian' },
    lead: 'Người cũ đứng gác cửa Tây, bạn tưởng không ai để ý.',
    who: 'thucphi',
    title: 'Chiếc khăn trong áo lính',
    text: ['Thục phi dâng lên Thái hậu một chiếc khăn thêu tên bạn, nói tìm thấy trong áo một tên lính cửa Tây.', '"Đứa bé trong bụng cô ấy là máu ai, xin Thái hậu cho tra cho rõ."'],
    omen: 'Từ ngày có người cũ đứng cửa Tây, đã có người chờ bạn mang thai.',
    choices: [
      { t: 'Xin tra sổ đến thăm, ngày nào Hoàng thượng đến viện mình', fx: { d: { duc: 6, thaihau: 8, thucphi: -12 }, flag: ['thu_thucphi'] }, note: 'Sổ khớp từng đêm. Thái hậu phẩy tay, nhưng vẫn cho người canh cửa Tây gắt hơn.', risk: { p: 0.4, fail: { d: { an: -12, thaihau: -10, vua: -6 } }, failNote: 'Sổ khớp, nhưng Hoàng thượng đã nghe chuyện. Mấy tháng liền ngài không sang viện bạn.' } },
      { t: 'Để Khoan tự nhận là trộm khăn, giữ yên cho mẹ con mình', fx: { d: { duc: -6, muu: 4, tuong: 10 }, unflag: ['dn_khoan', 'dn_tai_mat'] }, note: 'Khoan bị đánh tám mươi trượng, đày ra biên dưới cờ tướng Lê Trực. Anh không kêu một tiếng, không nhìn về phía bạn.' },
      { t: 'Gọi Khoan ra làm chứng: chính cung nữ bên Thục phi nhét khăn vào áo anh', need: { flags: ['dn_tai_mat'] }, lockHint: 'Cần nhờ Khoan làm tai mắt', fx: { d: { thucphi: -20, thaihau: 10, muu: 8 }, flag: ['thang_thucphi', 'thu_thucphi'] }, note: 'Khoan nói ra tên, ngày, giờ. Cung nữ kia quỳ xuống trước khi bị hỏi đến câu thứ hai.' },
      { t: 'Chỉ đường thêu: kiểu mũi kinh thành, không phải mũi Mai Đông', need: { num: { muu: [50, 100] } }, lockHint: 'Cần Mưu từ 50', fx: { d: { muu: 6, thaihau: 6, thucphi: -10, duc: 4 } }, note: 'Bạn thêu ba mũi ngay trước điện cho Thái hậu xem. Không ai nhắc chiếc khăn ấy nữa.' },
    ],
  },

  /* Chặng 5: con thuyền ở bến sông */
  {
    id: 'd2_thuyen',
    big: true,
    chapter: [5],
    before: 'b5_bang',
    when: { flags: ['g_dan', 'dn_khoan'] },
    place: 'vien',
    time: 'dem',
    cast: ['me', 'tuong'],
    mood: 'lo',
    lead: 'Từ ngày gặp lại ở cửa Tây, Khoan chưa một lần rời kinh.',
    where: 'ở hành lang tối gần điện Hoàng thượng',
    who: 'tuong',
    whoName: 'Khoan, đội trưởng cấm quân',
    title: 'Con thuyền ở bến sông',
    text: ['Hoàng thượng đang hấp hối. Khoan, nay là đội trưởng cấm quân, đứng chờ bạn ở hành lang tối.', '"Đêm nay sẽ có biến. Anh có một con thuyền ở bến sông, đủ chỗ cho em."'],
    omen: 'Một người lính cũ biết đường ra bến, thì người khác cũng biết.',
    choices: [
      { t: 'Theo anh ra bến, bỏ lại hết', fx: { end: 'e_dan_thuyen' }, note: 'Thuyền rời bến lúc trống canh tư. Bạn không ngoái lại.', risk: { p: 0.35, fail: { end: 'd_dan_ben' }, failNote: 'Bến sông đã có đuốc chờ sẵn.' } },
      { t: 'Ở lại, nhờ anh giữ cửa Tây đêm nay', fx: { d: { the: 8, tuong: 6, duc: 2 } }, note: 'Khoan quỳ một gối: "Còn anh đứng đây, cửa Tây không mở cho ai." Bạn ngồi bên giường vua đến sáng.' },
      { t: 'Sai người bắt Khoan, giữ mình sạch tiếng', fx: { d: { duc: -6, muu: 8, thaihau: 6 }, unflag: ['dn_khoan', 'dn_tai_mat'] }, note: 'Khoan bị giải đi, không chống cự. Anh chỉ nhờ lính đưa lại cho bạn một gói chè cũ, mốc meo.' },
      { t: 'Nhờ anh dò xem đêm nay ai định mở cửa Tây', need: { flags: ['dn_tai_mat'] }, lockHint: 'Cần nhờ Khoan làm tai mắt', fx: { d: { muu: 10, thucphi: -15 }, flag: ['thang_thucphi'] }, note: 'Canh hai, Khoan bắt được người của Thục phi cầm chìa khóa giả. Bạn giữ chuyện ấy trong tay áo.' },
    ],
  },
];

export const ENDINGS_DAN: Ending[] = [
  { id: 'e_dan_thuyen', name: 'Thuyền về bến cũ', desc: 'Đêm vua băng, sổ cung ghi một phi tần chết đuối. Ở một làng chè xa kinh, có đôi vợ chồng già hái chè đến cuối đời, không ai biết người vợ từng là ai.' },
  { id: 'd_dan_ben', name: 'Bến sông canh tư', desc: 'Cấm quân chờ sẵn ở bến. Hai người bị xử chung một ngày, tội tư thông. Năm ấy, mẹ ở Mai Đông đốt hết chè trong nhà.', dead: true },
];
