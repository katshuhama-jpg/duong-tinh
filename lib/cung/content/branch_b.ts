/**
 * Nhánh rẽ ngõ cụt chặng 4-7 (Ngôi Đông cung, Vua băng hà, Buông rèm, Tuổi già). Tiền tố nb_.
 * Mỗi nhánh mọc từ một ngã rẽ có sẵn (gắn thêm 1 lựa chọn qua BRANCH_B_CHOICES),
 * đi 2-3 cảnh rồi khép đời ở một kết cục riêng (branch: true).
 *  1. b4_lap   -> nb_lap_*   Bế con trốn khỏi cung, sống ở làng chài
 *  2. b4_bien  -> nb_bien_*  Cắt tóc theo tướng Lê Trực ra biên ải
 *  3. cb_dc    -> nb_dc_*    Thái y bị mua chuộc, lén đưa vua ra ngoài thành chữa
 *  4. b5_bang2 -> nb_tron_*  Trốn khỏi cung cùng Hạnh, mở quán ở bến chợ
 *  5. cb_phe   -> nb_phe_*   Tự đọc sớ phế con, đổi lấy đất phong ruộng muối
 *  6. b6_tau   -> nb_tau_*   Tự theo xe thóc về phương nam phát chẩn
 *  7. cb_su    -> nb_su_*    Theo sứ thần sang nước Sa Hải
 *  8. b6_phan  -> nb_phan_*  Trao ấn cho Hoàng tử Nghĩa đêm binh biến
 *  9. b7_cuoi  -> nb_cuoi_*  Hai bà già trốn ra chợ phiên
 * 10. cb_tu    -> nb_tu_*    Mặc giáp theo con ra trận
 * Chặng 5-7 không có vua sống; nhánh chặng 6 đòi cờ nhiep.
 */
import type { Card, Choice, Ending } from '../types';

const REM_HINT = 'Cần đang buông rèm';

export const BRANCH_B_CHOICES: Record<string, Choice[]> = {
  b4_lap: [
    { t: 'Đêm nay bế con trốn khỏi cung, để ngôi lại cho Nghĩa, kẻo con chết vì cái ngôi ấy', fx: { next: 'nb_lap_tron' }, note: 'Bạn mặc áo vải cung nữ, bế con qua cửa Tây lúc đổi gác. Không ai ngờ có người tự bỏ ngôi Đông cung.' },
  ],
  b4_bien: [
    { t: 'Cắt tóc, mặc áo lính, theo tướng quân ra biên ải', fx: { next: 'nb_bien_ai', d: { tuong: 6 } }, note: 'Lê Trực sững người, rồi tháo thanh đoản kiếm trao cho bạn. Sáng ra bạn lẫn vào đoàn thân binh của ông ra cửa Bắc, còn Phúc chép vào sổ cung là bạn ốm nặng, đóng cửa viện không tiếp ai.' },
  ],
  cb_dc: [
    { t: 'Thuốc thái y càng uống càng nặng: lén đưa Hoàng thượng ra ngoài thành chữa', fx: { next: 'nb_dc_cong', d: { vua: 6 } }, note: 'Bạn kể ra ba thang thuốc đổi màu, và tên thái y nào cũng từng ra vào phủ Thái phó. Hoàng thượng nhìn bạn rất lâu, rồi gật đầu. Phúc lấy hai bộ áo thái giám trùm lên vai vua.' },
  ],
  b5_bang2: [
    {
      t: 'Đêm nay trốn khỏi cung cùng Hạnh',
      need: { num: { hanh: [30, 100] }, not: ['hanh_phan'] },
      lockHint: 'Cần Hạnh từ 30',
      fx: { next: 'nb_tron_tuong', d: { hanh: 6 } },
      note: 'Thục phi cười nhạt khi bạn cúi đầu lui ra. Về đến viện, Hạnh đã gói sẵn hai tay nải.',
    },
  ],
  cb_phe: [
    { t: 'Tự đọc sớ xin phế con, đổi lấy một đất phong thật xa', fx: { next: 'nb_phe_so', d: { quan: 4 } }, note: 'Bạn bước khỏi bình phong, cầm tờ giấy trắng mà đọc như đã thuộc. Quan Bộ Lễ há miệng, không nói được câu nào.' },
  ],
  b6_tau: [
    {
      t: 'Sợ thóc bị bớt dọc đường: cởi áo bào, tự mình theo xe thóc về phương nam',
      need: { flags: ['nhiep'] },
      lockHint: REM_HINT,
      fx: { next: 'nb_tau_nam', d: { duc: 4, quan: -4 } },
      note: 'Thái phó can đến ba lần. Sáng ra mười xe thóc lăn bánh, bạn ngồi xe đầu, áo vải như vợ người đánh xe.',
    },
  ],
  cb_su: [
    {
      t: 'Theo sứ thần về nước Sa Hải, đổi lấy mười năm hòa',
      need: { flags: ['nhiep'] },
      lockHint: REM_HINT,
      fx: { next: 'nb_su_thuyen', d: { the: 4, quan: -6 } },
      note: 'Cả điện xôn xao. Sứ thần im rất lâu, rồi lần đầu tiên chắp tay cúi đầu.',
    },
  ],
  b6_phan: [
    {
      t: 'Mở cửa điện, tự tay trao ấn cho Hoàng tử Nghĩa',
      need: { flags: ['nhiep'] },
      lockHint: REM_HINT,
      fx: { next: 'nb_phan_an' },
      note: 'Bạn bảo con ngồi yên, tự tay rút then cửa điện. Đuốc ngoài sân dạt ra hai bên, nhường lối cho một người mặc giáp.',
    },
  ],
  b7_cuoi: [
    {
      t: 'Rủ Hạnh cải trang, trốn ra chợ phiên ngoài thành',
      need: { not: ['hanh_phan'] },
      lockHint: 'Cần Hạnh còn một lòng',
      fx: { next: 'nb_cuoi_cho' },
      note: 'Hạnh tròn mắt, rồi bật cười như hồi mười tám tuổi. Hai bà già mượn áo nâu của người quét sân, ra cửa Tây lúc đổi gác.',
    },
  ],
  cb_tu: [
    { t: 'Không cản được thì đi cùng: mặc giáp, theo con ra trận', fx: { next: 'nb_tu_giap', d: { the: 4 } }, note: 'Con bạn sững người, rồi bật cười: "Mẹ còn cầm nổi giáo không?" Ba hôm sau, đoàn quân ra cửa Bắc có thêm một người đàn bà tóc bạc.' },
  ],
};

export const BRANCH_B: Card[] = [
  /* ================= 1. b4_lap: bế con trốn khỏi cung ================= */
  {
    id: 'nb_lap_tron',
    step: true,
    chapter: [4],
    place: 'bien',
    time: 'dem',
    cast: ['me', 'con'],
    mood: 'lo',
    moods: { con: 'so' },
    where: 'ở bến sông ngoài thành',
    who: 'con',
    title: 'Con đò cuối',
    text: ['Bến sông chỉ còn một con đò, ông lái nhìn đôi hài thêu dưới vạt áo bạn rất lâu.', 'Con bạn kéo tay áo: "Mẹ ơi, mình đi đâu, có về nữa không?"'],
    choices: [
      { t: 'Thả đôi hài thêu trôi sông, cho người ta tưởng hai mẹ con chết đuối', fx: { next: 'nb_lap_cho', years: 3, d: { muu: 2 } }, note: 'Đò xuôi về phương nam ba ngày ba đêm. Bạn đi chân đất lên một làng chài, nơi không ai biết mặt.' },
      { t: 'Tháo đôi hoa tai vàng trả tiền đò, dặn ông quên mặt mình', fx: { next: 'nb_lap_cho', years: 3, d: { duc: 2 } }, note: 'Ông lái cầm đôi hoa tai, gật đầu không nói. Ở làng chài phương nam, ba năm không ai hỏi bạn từ đâu tới.' },
    ],
  },
  {
    id: 'nb_lap_cho',
    step: true,
    chapter: [4],
    place: 'lang',
    time: 'chieu',
    cast: ['me', 'tuong', 'con'],
    mood: 'so',
    moods: { tuong: 'gian', con: 'binh' },
    where: 'ở một làng chài phương nam',
    who: 'tuong',
    whoName: 'Lính triều đình',
    title: 'Tờ cáo thị',
    text: ['Con bạn giờ đen nhẻm, biết vá lưới, gọi bạn là "u" như trẻ trong làng.', 'Một toán lính xuống làng dán cáo thị: "Tìm người đàn bà và đứa trẻ trốn khỏi cung. Ai giấu thì chém."'],
    choices: [
      { t: 'Xé cáo thị, nhờ cả làng giấu hai mẹ con', fx: { end: 'e_nb_lang_chai' }, note: 'Trưởng làng gom hết cáo thị đem nhóm bếp. Lính qua làng ba lần, lần nào cũng chỉ thấy người vá lưới.' },
      { t: 'Gửi con cho nhà hàng xóm, một mình ra trình diện', fx: { end: 'e_nb_cao_thi' }, note: 'Bạn nói đứa trẻ đã chết đuối. Lính trói bạn giải về kinh, con bạn đứng nhìn sau một tấm lưới.' },
    ],
  },

  /* ================= 2. b4_bien: theo tướng quân ra biên ải ================= */
  {
    id: 'nb_bien_ai',
    step: true,
    chapter: [4],
    place: 'nui',
    time: 'dem',
    cast: ['me', 'tuong'],
    mood: 'lo',
    moods: { tuong: 'gian' },
    where: 'ở đồn biên ải',
    who: 'tuong',
    title: 'Đồn cuối cùng',
    text: ['Gió rít qua vách nứa, lính trong đồn đói đến xanh mặt.', 'Lê Trực đặt mũ trụ xuống: "Đêm nay giặc đánh. Nương nương ở trong đồn, đừng ra."'],
    choices: [
      { t: 'Cầm cung lên vọng lâu cùng lính', fx: { next: 'nb_bien_tran', d: { tuong: 4 } }, note: 'Lính nhìn người lính mới tóc ngắn, tay nhỏ, không ai hỏi. Một ông lính già chia cho bạn nửa ống tên.' },
      { t: 'Ở lại trong đồn nấu cháo, băng bó cho thương binh', fx: { end: 'e_nb_me_linh', years: 1 }, note: 'Đến sáng giặc lui. Trong đồn có ba mươi người còn sống nhờ bát cháo của bạn.' },
    ],
  },
  {
    id: 'nb_bien_tran',
    step: true,
    chapter: [4],
    place: 'nui',
    time: 'dem',
    cast: ['me', 'tuong'],
    mood: 'so',
    moods: { tuong: 'gian' },
    where: 'trên vọng lâu đồn biên ải',
    who: 'tuong',
    title: 'Lửa ở cổng đồn',
    text: ['Mũi tên thứ ba của bạn hạ được ngựa tướng giặc, nhưng lửa đã bén cổng đồn.', 'Lê Trực gầm lên: "Nương nương xuống đi! Cờ để thần giữ."'],
    omen: 'Người mặc áo lính thì chết như lính, không ai hỏi là phi tần.',
    choices: [
      { t: 'Không xuống, giữ lá cờ trên vọng lâu', fx: { end: 'd_nb_vong_lau' }, note: 'Lá cờ đứng đến sáng. Người ta gỡ được nó khỏi tay bạn khi giặc đã rút qua sông.' },
      { t: 'Xuống mở cổng sau, dẫn dân làng chạy vào núi', fx: { end: 'e_nb_me_linh', years: 1 }, note: 'Bạn dắt hơn trăm người già trẻ trú trong đồn lên khe núi. Lê Trực giữ đồn đến sáng, giặc không qua được.' },
    ],
  },

  /* ================= 3. cb_dc: cõng vua ra ngoài thành ================= */
  {
    id: 'nb_dc_cong',
    step: true,
    chapter: [4],
    place: 'vien',
    time: 'dem',
    cast: ['me', 'vua', 'phuc'],
    mood: 'so',
    moods: { vua: 'vui', phuc: 'lo' },
    where: 'ở cửa sau tẩm điện',
    bg: 'hanh',
    who: 'vua',
    title: 'Cửa sau tẩm điện',
    text: ['Bạn dìu Hoàng thượng qua cửa sau, bỏ lại bát thuốc thái y vừa dâng còn bốc khói.', 'Hoàng thượng thở dốc mà vẫn cười: "Bao nhiêu năm làm vua, đây là lần đầu trẫm đi bộ qua cửa này."'],
    choices: [
      { t: 'Nấp lên xe chở rau, ra thẳng làng ven sông tìm ông lang Phúc quen', fx: { next: 'nb_dc_lang', years: 0.5 }, note: 'Xe rau xóc qua cổng thành lúc gà gáy, lính chỉ xốc qua mấy bó rau. Phúc ở lại, đốt tờ di chiếu còn trống tên.' },
      { t: 'Cầm lệnh bài của Phúc ra cửa Tây, lên chùa Vân Tịch xin sư bà bắt mạch', fx: { next: 'nb_dc_lang', years: 0.5, d: { duc: 2 } }, note: 'Lính cửa Tây nhìn lệnh bài, không nhìn mặt. Sư bà bắt mạch, lắc đầu, rồi chỉ đường đến nhà một ông lang ở làng ven sông.' },
    ],
  },
  {
    id: 'nb_dc_lang',
    step: true,
    chapter: [4],
    place: 'lang',
    time: 'ngay',
    cast: ['me', 'vua'],
    mood: 'vui',
    moods: { vua: 'binh' },
    where: 'ở nhà một ông lang ngoài thành',
    who: 'vua',
    title: 'Bờ ao nhà ông lang',
    text: ['Thuốc ông lang đắng nghét, nhưng ba tháng sau Hoàng thượng đã tự ra bờ ao ngồi câu.', 'Tin từ kinh về: triều đình đã phát tang, lập vua mới. "Nàng muốn về không?"'],
    choices: [
      { t: '"Không về. Ở đây chàng chỉ là chồng thiếp."', fx: { end: 'e_nb_ong_lang' }, note: 'Ngài cười, giật cần lên một con cá rô bằng hai ngón tay.' },
      { t: '"Về đi. Thiên hạ cần chàng hơn thiếp cần."', fx: { end: 'e_nb_ve_kinh' }, note: 'Hai người đi bộ về đến cửa Ngọ Môn. Lính gác không nhận ra vị vua đã có bài vị trong Thái miếu.' },
    ],
  },

  /* ================= 4. b5_bang2: trốn khỏi cung cùng Hạnh ================= */
  {
    id: 'nb_tron_tuong',
    step: true,
    chapter: [5],
    place: 'vien',
    time: 'dem',
    cast: ['me', 'hanh'],
    mood: 'lo',
    moods: { hanh: 'so' },
    where: 'ở chân tường phía bắc',
    who: 'hanh',
    title: 'Lỗ hổng chân tường',
    text: ['Hạnh dẫn bạn tới miệng cống dưới chân tường phía bắc, song sắt gỉ mục đã bị bẻ một thanh, vừa lọt một người.', '"Nhanh lên nương nương, mõ tuần canh đến góc kia rồi."'],
    omen: 'Tường cung có lỗ hổng thì lính tuần cũng biết đường đi qua.',
    choices: [
      { t: 'Chui qua trước, rồi kéo Hạnh theo', fx: { next: 'nb_tron_ben', years: 1 }, note: 'Đất cào rách áo, bạn kéo Hạnh qua đúng lúc ánh đuốc rọi tới. Hai người chạy một mạch ra bến chợ.' },
      { t: 'Đẩy Hạnh qua trước, mình quay lại đánh lạc lính tuần', fx: { end: 'd_nb_tuan_canh' }, note: 'Bạn cầm đèn lồng đi ngược về phía lính tuần, cất tiếng hỏi đường. Sau lưng, Hạnh đã lọt ra ngoài.' },
    ],
  },
  {
    id: 'nb_tron_ben',
    step: true,
    chapter: [5],
    place: 'bien',
    time: 'ngay',
    cast: ['me', 'hanh'],
    mood: 'vui',
    where: 'ở bến chợ ven sông',
    who: 'hanh',
    title: 'Gian lều bên bến',
    text: ['Hai người bán đôi hoa tai cuối cùng, thuê được một gian lều sát bến chợ.', 'Hạnh hỏi: "Mình bán chè hay bán bánh, chị?" Lần đầu tiên nó không gọi bạn là nương nương.'],
    choices: [
      { t: '"Bán chè sen. Chị nấu, em rao."', fx: { end: 'e_nb_quan_che' }, note: 'Nồi chè đầu tiên khê đáy, hai người ngồi ăn hết rồi cười đến chảy nước mắt.' },
      { t: '"Chè trôi nước. Em nấu, chị rao."', fx: { end: 'e_nb_quan_che' }, note: 'Viên chè Hạnh nặn tròn đều, còn bạn rao đến khản giọng. Mãi nửa tháng sau cả bến chợ mới quen giọng bà chủ mới.' },
    ],
  },

  /* ================= 5. cb_phe: tự xin phế con ================= */
  {
    id: 'nb_phe_so',
    step: true,
    chapter: [5],
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'con', 'quan'],
    mood: 'buon',
    moods: { con: 'buon', quan: 'so' },
    where: 'ở chính điện',
    who: 'con',
    title: 'Con nhìn mẹ',
    text: ['Cả điện lặng đi. Con bạn rời hàng đầu, bước tới nắm vạt áo bạn.', '"Mẹ không cần con làm vua nữa ạ?"'],
    choices: [
      { t: '"Mẹ cần con sống." Xin đất phong ven biển, càng xa càng tốt', fx: { next: 'nb_phe_dat', years: 10 }, note: 'Thái phó Tôn chuẩn ngay trong buổi. Hai mẹ con ra khỏi kinh với ba xe đồ và một lá cờ thân vương.' },
      { t: 'Không đáp, dắt tay con đi thẳng ra cửa điện', fx: { next: 'nb_phe_dat', years: 10, d: { muu: 2 } }, note: 'Không ai cản. Chiếu phế và chiếu phong đất đến cùng một ngày.' },
    ],
  },
  {
    id: 'nb_phe_dat',
    step: true,
    chapter: [5],
    place: 'bien',
    time: 'chieu',
    cast: ['me', 'con', 'quan'],
    mood: 'lo',
    moods: { con: 'binh', quan: 'dac' },
    where: 'ở đất phong ven biển',
    who: 'quan',
    whoName: 'Sứ giả trong kinh',
    title: 'Sứ giả ở ruộng muối',
    text: ['Mười năm, con bạn đã thành người đàn ông đen sạm, cùng dân cào muối trên ruộng.', 'Sứ giả trong kinh quỳ trên bờ ruộng: "Vua mới băng hà không con. Triều đình xin rước điện hạ về."'],
    omen: 'Ngôi vua đã trả đi thì người ta không mời về bằng lòng tốt.',
    choices: [
      { t: '"Con đừng về. Muối ở đây mặn, nhưng không có độc."', fx: { end: 'e_nb_vua_muoi' }, note: 'Con bạn cúi nhìn đôi tay nứt nẻ, rồi bảo sứ giả mang chiếu về.' },
      { t: '"Về đi con. Mẹ đi cùng."', fx: { end: 'd_nb_don_duong' }, note: 'Đoàn rước đến trạm thứ ba thì dừng. Có người mang ra một vò rượu đón đường.' },
    ],
  },

  /* ================= 6. b6_tau: về phương nam phát chẩn ================= */
  {
    id: 'nb_tau_nam',
    step: true,
    chapter: [6],
    place: 'lang',
    time: 'ngay',
    cast: ['me', 'phuc'],
    mood: 'buon',
    moods: { phuc: 'lo' },
    where: 'ở một làng đói phương nam',
    who: 'phuc',
    title: 'Làng không còn sức quỳ',
    text: ['Dân ra đón xe thóc, không ai còn sức quỳ. Phúc vừa phát vừa ghi sổ, tay run.', '"Nương nương, làng bên có dịch. Quan huyện đã rào đường, không cho ai qua."'],
    choices: [
      { t: 'Dỡ rào, chở nửa số thóc sang làng bên', fx: { next: 'nb_tau_dich', d: { duc: 4 } }, note: 'Bạn bảo lính dỡ rào. Quan huyện đứng nhìn, không dám cản, cũng không dám theo.' },
      { t: 'Phát hết thóc ở đây, rồi về kinh', fx: { end: 'e_nb_sinh_tu', years: 1 }, note: 'Bạn phát đến bao thóc cuối cùng, rồi lên xe không ngoái lại.' },
    ],
  },
  {
    id: 'nb_tau_dich',
    step: true,
    chapter: [6],
    place: 'lang',
    time: 'dem',
    cast: ['me', 'cungnu', 'phuc'],
    mood: 'lo',
    moods: { cungnu: 'buon', phuc: 'so' },
    where: 'trong làng có dịch',
    who: 'cungnu',
    whoName: 'Bé gái trong làng',
    title: 'Ngọn đèn dầu',
    text: ['Làng bên chỉ còn tiếng ho và vài ngọn đèn dầu leo lét.', 'Một bé gái kéo vạt áo bạn: "Bà ơi, mẹ con ngủ mãi không dậy."'],
    omen: 'Dịch không biết ai là người ngồi sau rèm.',
    choices: [
      { t: 'Ở lại nấu cháo, lau mặt cho từng người', fx: { end: 'd_nb_lang_dich' }, note: 'Bạn ở lại mười chín ngày. Đến ngày thứ hai mươi, làng không còn ai ho nữa, và bạn cũng nằm xuống.' },
      { t: 'Bế bé gái lên xe, về kinh xin thái y', fx: { end: 'e_nb_sinh_tu', years: 1 }, note: 'Xe chạy suốt đêm. Bé gái ngủ trong lòng bạn, tay vẫn nắm vạt áo.' },
    ],
  },

  /* ================= 7. cb_su: sang nước Sa Hải ================= */
  {
    id: 'nb_su_thuyen',
    step: true,
    chapter: [6],
    place: 'bien',
    time: 'dem',
    cast: ['me', 'ngoai'],
    mood: 'lo',
    moods: { ngoai: 'binh' },
    where: 'trên thuyền sứ ra biển',
    who: 'ngoai',
    whoName: 'Sứ thần nước Sa Hải',
    title: 'Thuyền rời bến',
    text: ['Thuyền sứ rời bến lúc nước ròng, đèn kinh thành nhỏ dần sau lưng.', 'Sứ thần hai tay dâng chén rượu: "Vua tôi muốn gặp người đàn bà dám bước ra khỏi rèm."'],
    choices: [
      { t: 'Uống cạn chén, hỏi chuyện nước Sa Hải', fx: { next: 'nb_su_cung', years: 0.5, d: { muu: 2 } }, note: 'Sứ thần kể suốt đêm: mùa mưa, chợ cá, mấy người con của vua già tranh nhau. Bạn nghe không sót chữ nào.' },
      { t: 'Đổ chén rượu xuống biển: "Ta đi làm con tin, không làm khách."', fx: { next: 'nb_su_cung', years: 0.5, d: { the: 2 } }, note: 'Sứ thần nhìn chén không, rồi bật cười. Suốt chuyến đi không ai trên thuyền dám ngồi cao hơn bạn.' },
    ],
  },
  {
    id: 'nb_su_cung',
    step: true,
    chapter: [6],
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'ngoai'],
    mood: 'lo',
    moods: { ngoai: 'vui' },
    where: 'ở triều đình nước Sa Hải',
    bg: 'trieu',
    who: 'ngoai',
    whoName: 'Vua nước Sa Hải',
    title: 'Tấm bản đồ hai nước',
    text: ['Vua Sa Hải đã già, chống gậy, trải trước mặt bạn tấm bản đồ hai nước.', '"Mười năm hòa thì ngắn quá. Bà ở lại làm hoàng hậu của ta, hai nước thành một nhà."'],
    choices: [
      { t: 'Nhận lời, làm hoàng hậu nước người', fx: { end: 'e_nb_hau_sa_hai' }, note: 'Lễ cưới làm theo tục Sa Hải. Bạn viết thư về cho con, nét chữ không run.' },
      { t: 'Từ chối, chỉ xin làm con tin cho đủ mười năm', fx: { end: 'e_nb_con_tin', years: 10 }, note: 'Vua già gật đầu, cuộn bản đồ lại. Mỗi năm ông sai người đến hỏi lại một lần, lần nào bạn cũng lắc đầu.' },
    ],
  },

  /* ================= 8. b6_phan: trao ấn cho Nghĩa ================= */
  {
    id: 'nb_phan_an',
    step: true,
    chapter: [6],
    place: 'dien',
    time: 'dem',
    cast: ['me', 'nghia', 'con'],
    mood: 'lo',
    moods: { nghia: 'dac', con: 'so' },
    where: 'ở điện Hoàng thượng',
    who: 'nghia',
    title: 'Chiếc ấn ngọc trên án',
    text: ['Hoàng tử Nghĩa bước vào, giáp còn dính máu. Bạn đẩy chiếc ấn ngọc về phía hắn.', '"Dì muốn đổi lấy gì?" Hắn cười, chưa đưa tay ra.'],
    omen: 'Một lời thề lúc nửa đêm cũng chỉ nặng bằng một chén rượu.',
    choices: [
      { t: '"Mạng con ta. Ngươi thề trước bài vị tiên đế."', fx: { next: 'nb_phan_the', years: 5 }, note: 'Nghĩa quỳ trước bài vị, thề ba lần. Sáng hôm sau hắn lên ngôi, còn vua con được đưa lên chùa Vân Tịch.' },
      { t: 'Rót hai chén rượu: "Uống với ta một chén, rồi ấn là của ngươi."', fx: { end: 'd_nb_chen_chung' }, note: 'Nghĩa nhìn bạn rất lâu, rồi cạn chén. Bạn cạn chén của mình, chậm hơn hắn một hơi thở.' },
    ],
  },
  {
    id: 'nb_phan_the',
    step: true,
    chapter: [6],
    place: 'chua',
    time: 'ngay',
    cast: ['me', 'quan', 'con'],
    mood: 'lo',
    moods: { quan: 'lo', con: 'binh' },
    where: 'ở sân chùa Vân Tịch',
    who: 'quan',
    whoName: 'Một cựu thần',
    title: 'Người khách lên chùa',
    text: ['Năm năm, con bạn đã thành chú tiểu, sáng gánh nước, tối tụng kinh. Bạn quét sân chùa.', 'Một cựu thần lén lên núi, quỳ trước con bạn: "Lòng người còn nhớ bệ hạ. Xin bệ hạ xuống núi."'],
    choices: [
      { t: 'Cầm chổi đuổi ông ta xuống núi', fx: { end: 'e_nb_san_chua' }, note: 'Ông già vừa chạy vừa ngoái lại. Con bạn đứng nhìn theo, không nói gì, rồi lại đi gánh nước.' },
      { t: 'Đứng lặng, để con tự trả lời', fx: { end: 'e_nb_san_chua' }, note: 'Con bạn chắp tay: "Bần tăng không biết bệ hạ nào cả." Bạn quay đi, quét tiếp đống lá.' },
    ],
  },

  /* ================= 9. b7_cuoi: hai bà già trốn ra chợ phiên ================= */
  {
    id: 'nb_cuoi_cho',
    step: true,
    chapter: [7],
    place: 'lang',
    time: 'ngay',
    cast: ['me', 'hanh'],
    mood: 'vui',
    where: 'ở chợ phiên ngoài thành',
    who: 'hanh',
    title: 'Bát chè đậu đen',
    text: ['Hai bà già áo nâu chen giữa chợ phiên, không ai nhận ra ai.', 'Hạnh mua hai bát chè đậu đen: "Ngày nhập cung em hứa đãi chị một bát. Nợ mấy chục năm rồi."'],
    choices: [
      { t: 'Ăn xong thì về, cho kịp giờ đóng cổng', fx: { end: 'e_nb_bat_che' }, note: 'Hai người về đến cửa Tây khi trống vừa điểm. Lính gác cúi đầu, giả như không thấy hai bà già áo nâu.' },
      { t: '"Không về nữa, Hạnh ạ."', fx: { next: 'nb_cuoi_do' }, note: 'Hạnh đặt bát chè xuống, nhìn bạn rất lâu. Rồi nó trả tiền, đứng dậy trước.' },
    ],
  },
  {
    id: 'nb_cuoi_do',
    step: true,
    chapter: [7],
    place: 'bien',
    time: 'chieu',
    cast: ['me', 'hanh'],
    mood: 'binh',
    moods: { hanh: 'lo' },
    where: 'ở bến đò cuối chợ',
    who: 'hanh',
    title: 'Chuyến đò cuối',
    text: ['Bến chỉ còn một chuyến đò. Phía sau, chuông thành gõ báo đóng cổng.', '"Sang sông rồi, mình đi đâu hả chị?"'],
    choices: [
      { t: '"Đi đến đâu thì ở đó."', fx: { end: 'e_nb_sang_song' }, note: 'Đò rời bến, tiếng chuông thành nhỏ dần rồi tắt hẳn. Ba tháng sau, hai người dừng chân ở một ngôi chùa nhỏ bên kia núi.' },
      { t: '"Đi tìm một ngôi chùa nhỏ có cây đại."', fx: { end: 'e_nb_sang_song' }, note: 'Ông lái đò bảo bên kia núi có một ngôi như thế. Hai bà già nhìn nhau cười.' },
    ],
  },

  /* ================= 10. cb_tu: mặc giáp theo con ra trận ================= */
  {
    id: 'nb_tu_giap',
    step: true,
    chapter: [7],
    place: 'nui',
    time: 'ngay',
    cast: ['me', 'con', 'tuong'],
    mood: 'lo',
    moods: { con: 'gian', tuong: 'lo' },
    where: 'ở doanh trại sát biên giới Sa Hải',
    who: 'tuong',
    whoName: 'Trinh sát',
    title: 'Khe núi trước mặt',
    text: ['Bộ giáp cũ của tướng Lê Trực rộng thùng thình trên vai bạn.', 'Trinh sát phi về: "Quân Sa Hải phục sẵn ở khe núi, mà bệ hạ vẫn muốn đi thẳng!"'],
    choices: [
      { t: 'Kéo cương ngựa con lại, bắt đi vòng qua sông', fx: { end: 'e_nb_khai_hoan', years: 1 }, note: 'Con giận tím mặt, nhưng nghe. Quân đi vòng, đánh úp sau lưng toán phục binh.' },
      { t: 'Phi ngựa lên trước con, vào khe núi', fx: { next: 'nb_tu_khe' }, note: 'Bạn thúc ngựa vượt qua con. Sau lưng, nó gọi một tiếng rồi phi theo.' },
    ],
  },
  {
    id: 'nb_tu_khe',
    step: true,
    chapter: [7],
    place: 'nui',
    time: 'chieu',
    cast: ['me', 'con'],
    mood: 'so',
    moods: { con: 'so' },
    where: 'trong khe núi biên giới',
    who: 'con',
    title: 'Mưa tên',
    text: ['Tên bắn xuống như mưa, ngựa bạn khuỵu xuống. Con bạn quay ngựa lại.', '"Mẹ!" Nó gọi y như hồi bảy tuổi.'],
    omen: 'Người mẹ phi lên trước con thì đỡ mũi tên thay con.',
    choices: [
      { t: 'Quát con chạy đi, đừng quay lại', fx: { end: 'd_nb_khe_nui' }, note: 'Con bạn khóc, rồi quay ngựa. Mũi tên thứ hai không còn ai đỡ cho bạn.' },
      {
        t: 'Nắm tay con, nhảy lên lưng ngựa nó',
        fx: { end: 'e_nb_khai_hoan', years: 1 },
        note: 'Con ngựa chở hai mẹ con lao ra khỏi khe. Quân sau ùa tới, giặc tan.',
        risk: { p: 0.5, fail: { end: 'd_nb_khe_nui' }, failNote: 'Mũi tên cắm vào lưng bạn khi tay vừa chạm tay con.' },
      },
    ],
  },
];

export const ENDINGS_BRANCH_B: Ending[] = [
  // 1. b4_lap
  { id: 'e_nb_lang_chai', branch: true, tier: 38, tone: 'vien', name: 'Làng chài không tên', desc: 'Bỏ ngôi Đông cung lấy một mái lều ven biển. Con bà lớn lên làm người đánh cá, cả đời không biết mình từng suýt làm vua.' },
  { id: 'e_nb_cao_thi', branch: true, tier: 26, tone: 'buon', name: 'Tờ cáo thị đầu làng', desc: 'Bà về kinh một mình, nói con đã chết đuối, rồi sống nốt đời trong lãnh cung. Ở làng chài phương nam, có người đánh cá năm nào cũng thả một ngọn đèn ra biển.' },
  // 2. b4_bien
  { id: 'e_nb_me_linh', branch: true, tier: 58, tone: 'vien', name: 'Mẹ của lính đồn', desc: 'Sổ cung chép bà ốm chết trong viện. Ở đồn biên ải, lính gọi bà là mẹ, và giặc ba năm không qua được khe núi ấy.' },
  { id: 'd_nb_vong_lau', branch: true, tier: 72, dead: true, name: 'Lá cờ trên vọng lâu', desc: 'Một người lính tóc ngắn chết trên vọng lâu, tay không rời cán cờ. Mãi sau Lê Trực mới dám khắc tên thật lên bia.' },
  // 3. cb_dc
  { id: 'e_nb_ong_lang', branch: true, tier: 44, tone: 'vien', name: 'Ông câu bên bờ ao', desc: 'Triều đình thờ một ông vua đã băng hà. Ở làng ven sông có ông lão câu cá và bà vợ nấu cơm, sống thêm mười hai năm không ai biết.' },
  { id: 'e_nb_ve_kinh', branch: true, tier: 24, tone: 'buon', name: 'Ông vua đã phát tang', desc: 'Về đến cửa Ngọ Môn, người ta bảo ông là kẻ mạo danh. Ông bị giải đi đâu không ai rõ, bà bị nhốt vào lãnh cung đến già.' },
  // 4. b5_bang2
  { id: 'd_nb_tuan_canh', branch: true, tier: 42, dead: true, name: 'Tiếng mõ canh tư', desc: 'Bà cầm đèn đi về phía lính tuần để người kia kịp ra ngoài. Sáng ra, sổ cung chép một phi tần trẫm mình dưới giếng.' },
  { id: 'e_nb_quan_che', branch: true, tier: 36, tone: 'vien', name: 'Quán chè hai chị em', desc: 'Ở bến chợ ven sông có quán chè của hai bà góa không rõ quê. Một người nấu, một người rao, khách nói chè ấy ngọt như chưa từng có ai khóc.' },
  // 5. cb_phe
  { id: 'e_nb_vua_muoi', branch: true, tier: 54, tone: 'vien', name: 'Ông hoàng ruộng muối', desc: 'Bà đổi ngôi Đông cung lấy mấy làng muối ven biển. Con bà sống đến tám mươi, cả vùng gọi ông là "ông hoàng muối".' },
  { id: 'd_nb_don_duong', branch: true, tier: 48, dead: true, name: 'Vò rượu đón đường', desc: 'Triều đình mời con bà về làm vua, rồi cho người chờ ở trạm thứ ba. Hai mẹ con chết cùng một đêm, sử chép "bệnh dịch dọc đường".' },
  // 6. b6_tau
  { id: 'e_nb_sinh_tu', branch: true, tier: 56, tone: 'buon', name: 'Sinh từ người còn sống', desc: 'Bà về kinh thì ghế sau rèm đã có người khác ngồi. Phương nam lập sinh từ thờ bà khi bà còn sống, mà bà chưa một lần được về thăm.' },
  { id: 'd_nb_lang_dich', branch: true, tier: 64, dead: true, name: 'Ngọn đèn dầu làng dịch', desc: 'Người ngồi sau rèm chết ở một làng không có tên trên bản đồ. Dân làng sống sót chôn bà dưới gốc gạo đầu làng.' },
  // 7. cb_su
  { id: 'e_nb_hau_sa_hai', branch: true, tier: 84, tone: 'vien', name: 'Hoàng hậu bên kia biển', desc: 'Bà sang biển làm con tin, rồi làm hoàng hậu nước người. Ba mươi năm hai nước không đánh nhau một trận.' },
  { id: 'e_nb_con_tin', branch: true, tier: 46, tone: 'buon', name: 'Mười năm con tin', desc: 'Bà giữ lời, ở lại đủ mười năm. Ngày về, con bà đứng trên bến, cúi chào bà như chào một vị khách quý.' },
  // 8. b6_phan
  { id: 'd_nb_chen_chung', branch: true, tier: 66, dead: true, name: 'Chén rượu chia đôi', desc: 'Bà và kẻ binh biến chết cùng một đêm, ngồi cách nhau một cái án. Sáng ra con bà vẫn ngồi trên ngai, chưa hiểu vì sao mẹ không dậy.' },
  { id: 'e_nb_san_chua', branch: true, tier: 30, tone: 'buon', name: 'Quét lá sân chùa', desc: 'Bà đổi ngai vàng lấy mạng con, rồi quét lá sân chùa đến già. Con bà thành sư, gọi bà là "thí chủ" như gọi mọi người khác.' },
  // 9. b7_cuoi
  { id: 'e_nb_bat_che', branch: true, tier: 50, tone: 'buon', name: 'Bát chè nợ mấy chục năm', desc: 'Hai bà già trốn ra chợ một buổi rồi về kịp giờ đóng cổng. Mùa đông năm ấy Hạnh mất, và đó là bát chè cuối cùng hai người ăn chung.' },
  { id: 'e_nb_sang_song', branch: true, tier: 40, tone: 'vien', name: 'Chuyến đò cuối ngày', desc: 'Cung tìm hai bà già suốt một tháng rồi thôi. Bên kia núi có ngôi chùa nhỏ, hai bà vãi sáng quét sân, chiều ngồi dưới gốc đại.' },
  // 10. cb_tu
  { id: 'e_nb_khai_hoan', branch: true, tier: 80, tone: 'vien', name: 'Hai mẹ con khải hoàn', desc: 'Bà mặc giáp theo con ra trận và cùng con về kinh. Từ đó con bà nghe mẹ nói hết câu rồi mới quyết.' },
  { id: 'd_nb_khe_nui', branch: true, tier: 76, dead: true, name: 'Mưa tên khe núi', desc: 'Bà phi lên trước con, đỡ mũi tên dành cho vua. Con bà thắng trận ấy, và cả đời không bao giờ thân chinh nữa.' },
];
