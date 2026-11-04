/**
 * Nhánh rẽ ngõ cụt chặng 1-3. Tiền tố na_.
 * Mỗi nhánh mọc từ một ngã rẽ có sẵn (lựa chọn gắn thêm qua BRANCH_A_CHOICES),
 * đi 2-3 cảnh rồi khép đời ở một kết cục riêng. Người chơi quay lại ngã rẽ để đi tiếp đường chính.
 *  1. b1_tra    Trèo tường trốn về quê ngay đêm đầu
 *  2. b1_hoi    Xin đi hòa thân sang nước Vân Đảo
 *  3. b2_den    Rủ Hoàng thượng vi hành chợ đêm
 *  4. b2_vu     Bẻ gãy trâm phượng, vào lãnh cung
 *  5. b2_sung   Xóa tên khỏi sổ, xin làm nữ sử giữ kho sách
 *  6. b3_thai   Hất bát thuốc, trốn khỏi cung giữ thai
 *  7. b3_sinh   Tráo hoàng tử với con gái cung nữ
 *  8. b3_mat    Bưng bát cặn sang bắt Thục phi uống
 *  9. ca_gieng  Đưa tro Lựu về quê
 * 10. ca_thu    Nhận lá thư, nói nốt câu thứ hai với Hoàng hậu
 */
import type { Card, Choice, Ending } from '../types';

export const BRANCH_A_CHOICES: Record<string, Choice[]> = {
  b1_tra: [
    {
      t: 'Hắt chén trà ra sân, đêm nay trèo tường trốn về {que}',
      fx: { next: 'na_tron_tuong', d: { duc: -2 } },
      note: 'Ma ma Trịnh tát bạn một cái rồi khóa trái cửa. Canh ba, bạn buộc dải thắt lưng vào song cửa sổ, tụt xuống sân.',
    },
  ],
  b1_hoi: [
    {
      t: 'Quỳ xuống: "Nghe nói sứ Vân Đảo đòi công chúa hòa thân, thần nữ xin đi thay."',
      fx: { next: 'na_dao_vua' },
      note: 'Cả hồ nín thở. Ở hàng ghế khách, sứ thần nước Vân Đảo đặt chén rượu xuống, nhìn bạn từ đầu đến chân.',
    },
  ],
  b2_den: [
    {
      t: 'Xin ngài đêm nay cởi áo rồng, cùng mình ra chợ đêm ngoài thành',
      fx: { next: 'na_vi_pho', d: { vua: 4 } },
      note: 'Hoàng thượng nhìn bạn rất lâu rồi bật cười. Canh một, hai người mặc áo vải lách qua cửa Tây, chỉ có Phúc theo sau.',
    },
  ],
  b2_vu: [
    {
      t: 'Giật lấy trâm phượng, bẻ gãy đôi ngay trước mặt Thái hậu',
      fx: { next: 'na_lanh_cua', d: { thaihau: -10 } },
      note: 'Tiếng vàng gãy khô khốc. Thục phi thét lên, Thái hậu đứng bật dậy: "Lôi ra lãnh cung!"',
    },
  ],
  b2_sung: [
    {
      t: 'Bảo Phúc xóa hẳn tên mình khỏi sổ, rồi xin sang làm nữ sử giữ kho sách',
      fx: { next: 'na_kho_xin' },
      note: 'Phúc đánh rơi cây bút. Ba hôm sau, bạn quỳ trước cung Thái hậu với một tờ đơn tự tay viết.',
    },
  ],
  b3_thai: [
    {
      t: 'Hất đổ bát thuốc, đêm nay cùng Hạnh trốn khỏi cung giữ lấy giọt máu này',
      need: { num: { hanh: [30, 100] } },
      lockHint: 'Cần Hạnh từ 30',
      fx: { next: 'na_bung_cong' },
      note: 'Bát thuốc vỡ tan dưới thềm, cung nữ kia chạy biến. Đêm ấy Hạnh gói hai bộ áo vải, búi tóc bạn lên như đàn bà nhà quê.',
    },
  ],
  b3_sinh: [
    {
      t: 'Dặn Hạnh: nếu là con trai, đem tráo ngay với bé gái cung nữ Mận vừa sinh',
      need: { num: { hanh: [30, 100] } },
      lockHint: 'Cần Hạnh từ 30',
      fx: { next: 'na_doi_trao' },
      note: 'Gà gáy, một hoàng tử chào đời. Hạnh bọc nó trong khăn cũ lẻn ra dãy phòng cung nữ, lúc về ôm theo một bé gái đỏ hỏn.',
    },
  ],
  b3_mat: [
    {
      t: 'Bưng bát thuốc sang thẳng viện Thục phi, bắt nàng uống phần cặn còn lại',
      fx: { next: 'na_tra_vien' },
      note: 'Hạnh không cản được. Bạn đi chân trần qua ba dãy hành lang, cửa viện Thục phi không ai dám chặn.',
    },
  ],
  ca_gieng: [
    {
      t: 'Xin ma ma cho mình đưa tro cốt Lựu về quê nó, đi ngay hôm nay',
      fx: { next: 'na_tro_duong', d: { duc: -2 } },
      note: 'Cả sân sững sờ. Ma ma Trịnh nhìn bạn rất lâu: "Được. Nhưng đi rồi thì khỏi về."',
    },
  ],
  ca_thu: [
    {
      t: 'Ngẩng lên: "Thần thiếp viết. Còn muốn viết thêm một câu nữa."',
      fx: { next: 'na_thu_hau' },
      note: 'Phúc đánh rơi khay mực. Hoàng hậu phẩy tay cho tất cả lui ra, chỉ giữ bạn lại.',
    },
  ],
};

export const BRANCH_A: Card[] = [
  /* ================= 1. Trốn về quê (b1_tra) ================= */
  {
    id: 'na_tron_tuong',
    step: true,
    chapter: [1],
    place: 'vien',
    time: 'dem',
    where: 'dưới chân tường sau viện',
    cast: ['me', 'phuc'],
    mood: 'so',
    moods: { phuc: 'lo' },
    who: 'phuc',
    title: 'Mái tường canh ba',
    text: ['Bạn vừa bám được lên mái tường thì một ngọn đèn lồng rọi thẳng lên mặt.', 'Thái giám Phúc ngước nhìn, giọng rất khẽ: "Nhảy ra ngoài là bụi tre và lính tuần. Ở trong thì còn ma ma Trịnh."'],
    choices: [
      { t: 'Nhảy xuống phía ngoài', fx: { next: 'na_tron_song' }, note: 'Bạn rơi vào bụi tre, trầy cả hai tay. Sau lưng, Phúc cầm đèn quay đi như không thấy gì.' },
      { t: 'Tháo chiếc vòng bạc của {me}, dúi cho Phúc xin lối cống nước', fx: { next: 'na_tron_song', d: { phuc: 6 } }, note: 'Phúc cầm vòng, dẫn bạn đến miệng cống cửa Tây. Bạn chui qua lớp nước đen ngòm, ra tới ngoài thành.' },
    ],
  },
  {
    id: 'na_tron_song',
    step: true,
    chapter: [1],
    place: 'bien',
    time: 'dem',
    where: 'ở bến sông ngoài thành',
    cast: ['me'],
    mood: 'so',
    title: 'Chiếc đò muối',
    text: ['Bến sông tối om, chỉ còn một chiếc đò chở muối sắp nhổ sào.', 'Phía cổng thành, đuốc đã sáng thành hàng, có tiếng chó sủa.'],
    omen: 'Tường cung cao, nhưng nước sông ngoài thành còn sâu hơn.',
    choices: [
      { t: 'Nhảy lên đò muối, nằm giữa các bao muối', fx: { end: 'e_na_ve_lang', years: 1 }, note: 'Ông lái đò ném tấm chiếu che lên người bạn, không hỏi một câu. Gà gáy, đò đã xuôi qua ba khúc quanh.' },
      { t: 'Lội sông sang bờ bên kia cho mất dấu', fx: { end: 'd_na_song_dem' }, note: 'Giữa dòng, nước kéo chân bạn xuống. Ngọn đuốc cuối cùng bạn thấy là ở trên bờ.' },
    ],
  },

  /* ================= 2. Hòa thân sang Vân Đảo (b1_hoi) ================= */
  {
    id: 'na_dao_vua',
    step: true,
    chapter: [1],
    place: 'vuon',
    time: 'dem',
    cast: ['me', 'vua', 'ngoai'],
    mood: 'lo',
    moods: { vua: 'gian', ngoai: 'dac' },
    who: 'vua',
    title: 'Ba tháng đường biển',
    text: ['Hoàng thượng đứng lặng, đèn hoa trôi dạt cả vào chân cầu.', '"Nàng có biết Vân Đảo cách đây ba tháng đường biển, đi rồi không có ngày về không?"'],
    choices: [
      { t: 'Thưa biết, và vẫn xin đi một mình', fx: { next: 'na_dao_thuyen', d: { duc: 4 } }, note: 'Ba hôm sau có chiếu nhận bạn làm nghĩa nữ của Thái hậu, phong công chúa. Thục phi là người đầu tiên sang chúc mừng.' },
      { t: 'Thưa biết, chỉ xin cho Hạnh theo cùng', need: { num: { hanh: [30, 100] } }, lockHint: 'Cần Hạnh từ 30', fx: { next: 'na_dao_thuyen', flag: ['na_dao_hanh'], d: { hanh: 6 } }, note: 'Hạnh nghe tin thì khóc một trận, rồi lặng lẽ đi gói hành lý cho cả hai.' },
    ],
  },
  {
    id: 'na_dao_thuyen',
    step: true,
    chapter: [1],
    place: 'bien',
    time: 'dem',
    where: 'trên thuyền rồng giữa biển',
    cast: ['me', 'ngoai'],
    mood: 'so',
    moods: { ngoai: 'lo' },
    who: 'ngoai',
    whoName: 'Sứ thần nước Vân Đảo',
    title: 'Đêm thứ bốn mươi',
    text: ['Đêm thứ bốn mươi, bão nổi, cột buồm gãy làm đôi.', 'Sứ thần ướt sũng: "Công chúa, thuyền con chỉ chở được mười người. Vào đảo hoang, hay ở lại chờ bão tan?"'],
    omen: 'Ba tháng đường biển, và đó là một lời cảnh báo.',
    choices: [
      { t: 'Ở lại thuyền lớn cùng các thị nữ', fx: { end: 'd_na_bien_bao' }, note: 'Bạn nhường chỗ trên thuyền con. Gần sáng, con sóng thứ chín đến.' },
      { t: 'Xuống thuyền con, ôm theo hộp ấn hòa thân', fx: { end: 'e_na_hau_dao', years: 1 }, note: 'Thuyền con dạt vào bờ Vân Đảo sau hai ngày. Người đầu tiên lội ra đón là một thanh niên chân trần, về sau bạn mới biết là vua.' },
      { t: 'Buộc dây vào người Hạnh, nó bơi giỏi từ nhỏ, cùng bơi vào đảo', need: { flags: ['na_dao_hanh'] }, lockHint: 'Cần đã mang Hạnh theo', fx: { end: 'e_na_hau_dao', years: 1, d: { hanh: 10 } }, note: 'Hạnh kéo bạn qua ba lớp sóng. Hai người nằm thở trên cát, cười như hai đứa trẻ làng.' },
    ],
  },

  /* ================= 3. Vi hành chợ đêm (b2_den) ================= */
  {
    id: 'na_vi_pho',
    step: true,
    chapter: [2],
    place: 'bien',
    time: 'dem',
    where: 'ở chợ đêm bến sông ngoài thành',
    cast: ['me', 'vua', 'phuc'],
    mood: 'vui',
    moods: { phuc: 'lo' },
    who: 'phuc',
    title: 'Chợ đêm bến sông',
    text: ['Hoàng thượng đứng ăn bát bánh đúc giữa chợ, cười như một anh thư sinh trọ học.', 'Phúc kéo áo bạn: "Có ba người đi theo từ cửa Tây, tay giấu trong áo."'],
    omen: 'Ra khỏi cửa Tây thì ngài chỉ còn là một người đàn ông, và bạn là người duy nhất đứng cạnh.',
    choices: [
      { t: 'Đứng chắn trước ngài, hô to "có cướp"', fx: { end: 'd_na_do_dao' }, note: 'Lưỡi dao thứ nhất đâm vào bạn. Lưỡi thứ hai không kịp, vì cả chợ đã ùa tới.' },
      { t: 'Kéo ngài lẩn vào đám hát chèo', fx: { next: 'na_vi_cheo' }, note: 'Hai người chui qua gầm sân khấu, quỳ sau tấm chiếu thờ của phường chèo.' },
    ],
  },
  {
    id: 'na_vi_cheo',
    step: true,
    chapter: [2],
    place: 'bien',
    time: 'dem',
    where: 'sau chiếu chèo ở bến sông',
    cast: ['me', 'vua'],
    mood: 'lo',
    moods: { vua: 'vui' },
    who: 'vua',
    title: 'Sau tấm chiếu chèo',
    text: ['Ba kẻ kia lướt qua không thấy. Hoàng thượng thở ra, nắm lấy tay bạn.', '"Giá trẫm chỉ là anh hàng chiếu ngoài chợ này, nàng có ở lại với trẫm không?"'],
    choices: [
      { t: 'Thưa có. Rồi kéo ngài xuống đò, xuôi về phía biển', fx: { end: 'e_na_hang_chieu', years: 1 }, note: 'Ngài cười, cởi ngọc bội ném xuống sông. Phúc đứng trên bến, nhìn con đò đi mất trong sương.' },
      { t: 'Đưa ngài về đến cửa Tây, còn mình ở lại ngoài này', fx: { end: 'e_na_quan_che', years: 1 }, note: 'Ngài quay lại ba lần mới chịu đi. Bạn đứng ngoài cổng thành đến lúc đèn lồng tắt hết.' },
    ],
  },

  /* ================= 4. Lãnh cung (b2_vu) ================= */
  {
    id: 'na_lanh_cua',
    step: true,
    chapter: [2],
    place: 'phong',
    time: 'chieu',
    bg: 'lanh',
    where: 'trong lãnh cung',
    cast: ['me', 'cungnu'],
    mood: 'buon',
    moods: { cungnu: 'binh' },
    who: 'cungnu',
    whoName: 'Hiền phi đời trước',
    title: 'Người trong lãnh cung',
    text: ['Lãnh cung dột nát, chỉ có một bà già tóc bạc ngồi chải tóc cho con búp bê rơm.', '"Ta là Hiền phi đời trước. Con bẻ cái gì mà vào đến đây?"'],
    choices: [
      { t: 'Kể hết chuyện chiếc trâm phượng', fx: { next: 'na_lanh_dong' }, note: 'Bà cười móm mém: "Trâm của ta cũng bị lục ra như thế, bốn mươi năm trước."' },
      { t: 'Ngồi xuống chải tóc cho bà, không nói gì', fx: { next: 'na_lanh_dong', d: { duc: 2 } }, note: 'Bà để yên cho bạn chải. Từ hôm ấy, bữa cháo nào bà cũng chia cho bạn một nửa.' },
    ],
  },
  {
    id: 'na_lanh_dong',
    step: true,
    chapter: [2],
    place: 'phong',
    time: 'dem',
    bg: 'lanh',
    where: 'trong lãnh cung',
    cast: ['me', 'cungnu'],
    mood: 'lo',
    moods: { cungnu: 'buon' },
    who: 'cungnu',
    whoName: 'Hiền phi đời trước',
    title: 'Chiếc chìa khóa gỉ',
    text: ['Mùa rét, bà Hiền phi ho ra máu, dúi vào tay bạn một chiếc chìa khóa gỉ.', '"Cửa sau lãnh cung thông ra đường lên chùa Vân Tịch. Ta giữ bốn mươi năm mà không dám đi."'],
    choices: [
      { t: 'Ở lại chăm bà đến hơi thở cuối', fx: { end: 'e_na_tuong_vang', years: 2 }, note: 'Bà mất vào một đêm mưa phùn, tay vẫn nắm tay bạn. Chiếc chìa khóa nằm dưới gối đến mục.' },
      { t: 'Cõng bà ra cửa sau, đi ngay trong đêm mưa rét', fx: { end: 'e_na_chua_mua', years: 1 }, note: 'Ổ khóa kêu một tiếng rồi bung. Hai người đi đến gà gáy thì nghe tiếng chuông chùa.' },
    ],
  },

  /* ================= 5. Nữ sử giữ kho sách (b2_sung) ================= */
  {
    id: 'na_kho_xin',
    step: true,
    chapter: [2],
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'thaihau'],
    mood: 'lo',
    moods: { thaihau: 'binh' },
    who: 'thaihau',
    title: 'Tờ đơn xin vào kho sách',
    text: ['Thái hậu đọc tờ đơn hai lần: "Được vua thương mà xin vào kho sách, ta mới thấy lần đầu."', '"Vào đó rồi thì không có đường ra hậu cung nữa. Con nghĩ kỹ chưa?"'],
    choices: [
      { t: 'Thưa đã nghĩ kỹ, chỉ xin được giữ sách', fx: { next: 'na_kho_so', d: { duc: 4 } }, note: 'Thái hậu đóng ấn. Đêm ấy đèn đỏ treo trước viện bạn lần cuối, rồi Phúc tháo xuống.' },
      { t: 'Xin được chép sử, không chỉ giữ kho', fx: { next: 'na_kho_so', d: { muu: 4 } }, note: 'Thái hậu nhíu mày, rồi gật: "Chép thì chép. Nhưng chép gì, ta sẽ đọc."' },
    ],
  },
  {
    id: 'na_kho_so',
    step: true,
    chapter: [2],
    place: 'phong',
    time: 'dem',
    bg: 'thu',
    where: 'trong kho sách Quốc sử viện',
    cast: ['me'],
    mood: 'so',
    title: 'Cuốn sổ đóng đinh',
    text: ['Năm thứ mười trong kho sách, bạn tìm thấy một cuốn sổ bị đóng đinh dưới đáy rương.', 'Trong ấy chép rõ: mẹ đẻ của Hoàng thượng không phải Thái hậu, mà là một cung nữ chết năm ngài lên ba.'],
    omen: 'Thái hậu đã nói trước: chép gì, bà sẽ đọc.',
    choices: [
      { t: 'Chép nó vào chính sử, không bỏ một chữ', fx: { end: 'd_na_but_sat', years: 10 }, note: 'Bạn chép xong trong ba đêm. Đêm thứ tư, kho sách có người đến, cầm theo dải lụa trắng.' },
      { t: 'Chép lại một bản, trát vào vách kho, để trăm năm sau', fx: { end: 'e_na_nu_su', years: 10 }, note: 'Bạn trộn vôi với nước chè, trát kín vách. Cuốn sổ cũ thì bạn đóng đinh lại như chưa từng mở.' },
    ],
  },

  /* ================= 6. Trốn khỏi cung giữ thai (b3_thai) ================= */
  {
    id: 'na_bung_cong',
    step: true,
    chapter: [3],
    place: 'vien',
    time: 'dem',
    where: 'ở cửa Tây lúc đổi gác',
    cast: ['me', 'hanh'],
    mood: 'so',
    moods: { hanh: 'lo' },
    who: 'hanh',
    title: 'Cửa Tây canh tư',
    text: ['Cửa Tây đổi gác lúc canh tư, khe cửa vừa đủ một người lách qua.', 'Hạnh nắm tay bạn: "Nương nương đi trước. Lính quay lại thì nô tì kéo chúng đi chỗ khác."'],
    choices: [
      { t: 'Kéo Hạnh đi cùng, sống chết có nhau', fx: { next: 'na_bung_lang', flag: ['na_bung_hanh'] }, note: 'Hai người chạy dọc bờ sông đến sáng, giày rách cả hai đôi.' },
      { t: 'Để Hạnh ở lại đánh lạc hướng', fx: { next: 'na_bung_lang', d: { hanh: -10 } }, note: 'Sau lưng bạn có tiếng Hạnh hét lên rồi tắt. Bạn không ngoảnh lại, vì không dám.' },
    ],
  },
  {
    id: 'na_bung_lang',
    step: true,
    chapter: [3],
    place: 'lang',
    time: 'chieu',
    where: 'ở một làng chài ven sông',
    cast: ['me', 'con'],
    mood: 'lo',
    moods: { con: 'binh' },
    title: 'Làng chài ven sông',
    text: ['Bạn sinh con trong một túp lều làng chài, đứa bé khóc to át cả tiếng sóng.', 'Ba tháng sau, lính đi dọc sông hỏi về "một người đàn bà trốn khỏi kinh, bụng mang dạ chửa".'],
    omen: 'Giọt máu này là của Hoàng thượng, và Hoàng thượng không bao giờ bỏ quên thứ gì của mình.',
    choices: [
      { t: 'Ở lại, nhận làm vợ góa của người chài vừa chết đuối', fx: { end: 'e_na_lang_chai', years: 1 }, note: 'Cả làng chài cùng nói dối một lời. Lính đi qua, chỉ thấy một mẹ góa ngồi vá lưới.' },
      { t: 'Bế con ra trình diện, xin tha cho đứa bé', fx: { end: 'd_na_bung_tra', years: 1 }, note: 'Viên đội nhận lấy đứa bé bằng cả hai tay, rất cẩn thận. Với bạn thì hắn chỉ cần một sợi dây.' },
    ],
  },

  /* ================= 7. Tráo con (b3_sinh) ================= */
  {
    id: 'na_doi_trao',
    step: true,
    chapter: [3],
    place: 'phong',
    time: 'dem',
    cast: ['me', 'hanh', 'con'],
    mood: 'lo',
    moods: { hanh: 'so', con: 'binh' },
    who: 'hanh',
    title: 'Bé gái trong tay',
    text: ['Bé gái trong tay bạn ngủ ngoan, không biết mình vừa thành công chúa.', 'Hạnh quỳ bên giường: "Mận xin đưa hoàng tử về quê, nuôi như con đẻ. Nương nương có muốn gặp lần cuối không?"'],
    choices: [
      { t: 'Không gặp, chỉ dặn Mận đừng bao giờ cho nó biết', fx: { next: 'na_doi_hat', years: 1 }, note: 'Hạnh đi rồi, bạn mới khóc. Bé gái trong tay cũng khóc theo, như biết.' },
      { t: 'Gặp, cởi chuỗi hạt gỗ của {me} đeo vào cổ con', fx: { next: 'na_doi_hat', years: 1 }, note: 'Đứa bé nắm lấy ngón tay bạn rất chặt. Bạn gỡ ra từng ngón một.' },
    ],
  },
  {
    id: 'na_doi_hat',
    step: true,
    chapter: [3],
    place: 'dien',
    time: 'ngay',
    bg: 'trieu',
    where: 'ở sân điện ngày xướng danh',
    cast: ['me', 'quan', 'thucphi'],
    mood: 'so',
    moods: { quan: 'binh', thucphi: 'dac' },
    title: 'Ngày xướng danh',
    text: ['Mười tám năm sau, tân khoa trạng nguyên quỳ giữa sân điện, sau gáy có nốt ruồi son giống hệt bạn.', 'Thục phi đứng sau rèm, cũng đang nhìn cái nốt ruồi ấy.'],
    omen: 'Thục phi không cần biết thật giả, chỉ cần thấy bạn nhìn ai lâu hơn một nhịp.',
    choices: [
      { t: 'Bước ra trước sân điện nhận con', fx: { end: 'd_na_nhan_con', years: 18 }, note: 'Cả triều lặng đi. Trạng nguyên ngẩng lên nhìn bạn, không hiểu gì cả.' },
      { t: 'Quay mặt đi, chỉ sai người mang sang cho trạng nguyên một chén chè', fx: { end: 'e_na_chen_trang', years: 18 }, note: 'Trạng nguyên uống cạn, cúi đầu tạ ơn một bà phi lạ mặt. Thục phi buông rèm xuống.' },
    ],
  },

  /* ================= 8. Bát cặn ở viện Thục phi (b3_mat) ================= */
  {
    id: 'na_tra_vien',
    step: true,
    chapter: [3],
    place: 'phong',
    time: 'chieu',
    where: 'trong viện Thục phi',
    cast: ['me', 'thucphi', 'hanh'],
    mood: 'gian',
    moods: { thucphi: 'dac', hanh: 'so' },
    who: 'thucphi',
    title: 'Bát cặn đỏ',
    text: ['Thục phi nhìn cái bát, không gọi người, chỉ cười khan.', '"Uống thì uống. Nhưng em có muốn biết, năm ta mười bảy tuổi, bát đầu tiên ai đưa cho ta không?"'],
    choices: [
      { t: 'Bóp miệng nàng, đổ cặn thuốc vào', fx: { end: 'e_na_dien_cung', years: 1 }, note: 'Thục phi nhổ hết ra, rồi cười to. Đến khi người ta lôi bạn đi, nàng vẫn còn cười.' },
      { t: 'Đặt cái bát xuống, ngồi nghe', fx: { next: 'na_tra_ke' }, note: 'Thục phi đuổi hết cung nữ ra, cả Hạnh. Nàng tự tay đóng cửa, rót hai chén trà.' },
    ],
  },
  {
    id: 'na_tra_ke',
    step: true,
    chapter: [3],
    place: 'phong',
    time: 'dem',
    where: 'trong viện Thục phi',
    cast: ['me', 'thucphi'],
    mood: 'buon',
    moods: { thucphi: 'buon' },
    who: 'thucphi',
    title: 'Hai cái bát',
    text: ['Thục phi kể đến canh ba: năm mười bảy tuổi, nàng cũng mất một đứa con vì một bát thuốc như thế.', '"Người đưa bát ấy giờ ngồi ở chỗ cao nhất hậu cung. Em với ta, ai cũng chỉ là cái bát trong tay người khác."'],
    omen: 'Hai người đàn bà cùng mất con mà ngồi chung một phòng, thì cả hậu cung đều biết trước sáng.',
    choices: [
      { t: 'Cùng nàng xin lên chùa Vân Tịch, bỏ hết', fx: { end: 'e_na_hai_ni', years: 1 }, note: 'Sáng ra, hai người cùng quỳ trước cung Thái hậu, tóc đã xõa. Không ai hiểu chuyện gì đã xảy ra trong đêm.' },
      { t: 'Nắm tay nàng: "Vậy thì cùng nhau đòi món nợ ấy."', fx: { end: 'd_na_hai_bat', years: 1 }, note: 'Hai người bàn đến sáng, rồi chờ thêm ba tháng. Người kia không chờ.' },
    ],
  },

  /* ================= 9. Đưa tro Lựu về quê (ca_gieng) ================= */
  {
    id: 'na_tro_duong',
    step: true,
    chapter: [1],
    place: 'nui',
    time: 'chieu',
    cast: ['me'],
    mood: 'lo',
    title: 'Ngã ba đèo',
    text: ['Ba ngày đường núi, hũ tro Lựu buộc trước ngực, bạn mới biết mình không còn là người trong cung.', 'Đến ngã ba đèo, có hai người đàn ông bịt mặt đứng chờ, hỏi đúng tên Lựu.'],
    choices: [
      { t: 'Mở hũ tro cho họ xem: "Nó chỉ còn chừng này thôi."', fx: { next: 'na_tro_lang' }, note: 'Một người kéo khăn bịt mặt xuống, mắt đỏ hoe. Đó là anh trai Lựu, đã chờ ở đèo ba tháng.' },
      { t: 'Ôm hũ tro chạy tắt vào rừng', fx: { next: 'na_tro_lang', d: { muu: 2 } }, note: 'Bạn chạy đến tối, lạc ra đúng một con suối có bến tre. Bên kia suối là làng của Lựu.' },
    ],
  },
  {
    id: 'na_tro_lang',
    step: true,
    chapter: [1],
    place: 'lang',
    time: 'chieu',
    where: 'ở làng của Lựu',
    cast: ['me', 'meday'],
    mood: 'buon',
    moods: { meday: 'buon' },
    who: 'meday',
    whoName: 'Mẹ Lựu',
    title: 'Mẹ Lựu',
    text: ['Mẹ Lựu ôm hũ tro, không khóc, chỉ xoa mãi miệng hũ như xoa đầu con.', '"Con ở lại làm con bà nhé. Trong cung không ai đợi con đâu."'],
    choices: [
      { t: 'Ở lại, thay Lựu làm con bà', fx: { end: 'e_na_con_luu', years: 1 }, note: 'Bạn cởi áo cung nữ, mặc áo nâu của Lựu để lại. Áo hơi rộng, bà bảo mai sửa.' },
      { t: 'Quay về kinh, đánh trống kêu oan cho Lựu', fx: { end: 'e_na_trong_oan', years: 1 }, note: 'Bạn đi bộ mười ngày về kinh. Dùi trống vừa chạm mặt da thì lính đã ập tới.' },
    ],
  },

  /* ================= 10. Câu thứ hai với Hoàng hậu (ca_thu) ================= */
  {
    id: 'na_thu_hau',
    step: true,
    chapter: [1, 2, 3],
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'hoanghau'],
    mood: 'so',
    moods: { hoanghau: 'binh' },
    who: 'hoanghau',
    title: 'Cửa đóng lại',
    text: ['Cửa đóng lại, Hoàng hậu tự tay rót trà cho bạn.', '"Câu thứ hai là gì? Nói đi, ở đây không ai chép."'],
    choices: [
      { t: '"Hoàng hậu nghiêm, vì Hoàng hậu cũng sợ."', fx: { next: 'na_thu_dem', d: { hoanghau: 8 } }, note: 'Hoàng hậu lặng đi rất lâu, chén trà nguội trong tay. Rồi người bảo bạn tối nay sang.' },
      { t: '"Thần thiếp nhớ nhà. Chỉ thế thôi."', fx: { next: 'na_thu_dem', d: { hoanghau: 4 } }, note: 'Hoàng hậu cười, lần đầu bạn thấy người cười. "Ta cũng thế. Tối nay sang đây."' },
    ],
  },
  {
    id: 'na_thu_dem',
    step: true,
    chapter: [1, 2, 3],
    place: 'phong',
    time: 'dem',
    bg: 'thu',
    where: 'trong thư phòng Hoàng hậu',
    cast: ['me', 'hoanghau'],
    mood: 'binh',
    moods: { hoanghau: 'buon' },
    who: 'hoanghau',
    title: 'Lá thư không gửi',
    text: ['Từ hôm ấy, đêm nào Hoàng hậu cũng gọi bạn sang đọc thư cho người nghe, thư của chính người, chưa bao giờ gửi.', '"Đêm nay ngươi viết hộ ta một lá. Gửi mẹ ta, mất đã hai mươi năm."'],
    omen: 'Thư không gửi thì không ai đọc được, trừ khi có người mang nó đi.',
    choices: [
      { t: 'Viết, rồi xin ở lại bên người làm nữ quan suốt đời', fx: { end: 'e_na_but_hau', years: 2 }, note: 'Hoàng hậu không đáp, chỉ đẩy nghiên mực sang phía bạn. Từ đó, nghiên mực ấy không về lại chỗ cũ.' },
      { t: 'Viết, rồi lén đưa lá thư ấy cho Hoàng thượng đọc', fx: { end: 'd_na_thu_yem', years: 1 }, note: 'Lá thư đi qua tay ba người trước khi tới thư phòng. Đến nơi, trong phong bì là một hình nhân bằng giấy.' },
    ],
  },
];

export const ENDINGS_BRANCH_A: Ending[] = [
  // 1. trốn về quê
  { id: 'e_na_ve_lang', branch: true, tier: 25, tone: 'vien', name: 'Đêm đầu đã về', desc: 'Bà rời cung ngay đêm đầu, trên một chiếc đò muối. Về {que} lấy tên khác, hái chè đến bạc đầu, không ai biết bà từng có tên trong sổ cung.' },
  { id: 'd_na_song_dem', branch: true, tier: 8, dead: true, name: 'Nước sông ngoài thành', desc: 'Trèo được qua tường cung mà không qua được một con sông. Sổ cung ghi: tú nữ mới vào, mất tích đêm đầu.' },
  // 2. Vân Đảo
  { id: 'e_na_hau_dao', branch: true, tier: 80, tone: 'vien', name: 'Hoàng hậu Vân Đảo', desc: 'Bà dạt vào một hòn đảo xa trên chiếc thuyền con, rồi thành hoàng hậu của nó. Đến giờ dân Vân Đảo vẫn trồng chè trên đồi, gọi là "chè bà Nam".' },
  { id: 'd_na_bien_bao', branch: true, tier: 25, dead: true, name: 'Con sóng thứ chín', desc: 'Công chúa hòa thân chưa đến được nơi gả. Bà nhường chỗ trên thuyền con cho mười thị nữ, rồi ở lại với chiếc thuyền rồng.' },
  // 3. vi hành
  { id: 'd_na_do_dao', branch: true, tier: 60, dead: true, name: 'Chợ đêm bến sông', desc: 'Một đêm ra chợ cùng vua, bà đỡ lưỡi dao thay ngài giữa hàng bánh đúc. Ngài truy phong bà làm phi, và cấm hẳn chợ đêm ấy.' },
  { id: 'e_na_hang_chieu', branch: true, tier: 50, tone: 'vien', name: 'Vợ anh hàng chiếu', desc: 'Một đêm vi hành, nhà vua không về nữa. Triều đình chép ngài băng vì bạo bệnh, còn ở một làng ven biển có đôi vợ chồng bán chiếu cười rất to.' },
  { id: 'e_na_quan_che', branch: true, tier: 20, tone: 'buon', name: 'Quán chè cửa Tây', desc: 'Bà ở lại ngoài cổng thành, mở một quán chè. Năm đầu có người áo vải ghé ba lần, năm sau một lần, rồi không thấy nữa.' },
  // 4. lãnh cung
  { id: 'e_na_tuong_vang', branch: true, tier: 10, tone: 'buon', name: 'Chải tóc búp bê rơm', desc: 'Bẻ một chiếc trâm, đổi lấy cả đời trong lãnh cung. Bà già đi đúng như người bà từng chăm, đến cả cách chải tóc cho con búp bê rơm.' },
  { id: 'e_na_chua_mua', branch: true, tier: 30, tone: 'vien', name: 'Cửa sau lãnh cung', desc: 'Bà cõng một Hiền phi bị quên lãng ra khỏi lãnh cung trong đêm mưa rét. Hai người cùng xuống tóc ở chùa Vân Tịch, sống như hai mẹ con.' },
  // 5. kho sách
  { id: 'd_na_but_sat', branch: true, tier: 45, dead: true, name: 'Ngòi bút và dải lụa', desc: 'Bà chép đúng một sự thật vào chính sử, và chết vì nó. Trang sử ấy bị xé, nhưng người chép lại thuộc lòng.' },
  { id: 'e_na_nu_su', branch: true, tier: 40, tone: 'buon', name: 'Bức vách trong kho sách', desc: 'Bà giữ kho sách bốn mươi năm, không ai nhớ bà từng được vua thương. Trăm năm sau, thợ sửa kho đục vách, một cuốn sổ rơi ra.' },
  // 6. trốn giữ thai
  { id: 'e_na_lang_chai', branch: true, tier: 30, tone: 'vien', name: 'Mẹ góa làng chài', desc: 'Con của vua lớn lên thành một cậu bé chài lưới, đen nhẻm, bơi giỏi nhất làng. Bà chưa bao giờ kể cho nó nghe nó sinh ra ở đâu.' },
  { id: 'd_na_bung_tra', branch: true, tier: 35, dead: true, name: 'Đứa bé về cung', desc: 'Đứa bé được đón về cung bằng kiệu son, còn mẹ nó ở lại bên bờ sông. Lớn lên, nó chỉ biết mẹ mình "mất lúc sinh".' },
  // 7. tráo con
  { id: 'd_na_nhan_con', branch: true, tier: 40, dead: true, name: 'Nốt ruồi son', desc: 'Bà nhận con giữa sân điện, và Thục phi chỉ cần một câu "khi quân". Trạng nguyên được tha, nhưng cả đời không biết vì sao bà phi lạ ấy chết.' },
  { id: 'e_na_chen_trang', branch: true, tier: 45, tone: 'buon', name: 'Chén chè cho trạng nguyên', desc: 'Con trai bà làm quan to, được dân thương, và không bao giờ biết mẹ mình là ai. Mỗi năm, vào ngày xướng danh, bà lại sai người mang sang một chén chè.' },
  // 8. Thục phi
  { id: 'e_na_dien_cung', branch: true, tier: 8, tone: 'buon', name: 'Người điên viện Tây', desc: 'Người ta bảo bà đau quá hóa điên. Bà bị nhốt ở viện Tây, ngày nào cũng rửa một cái bát không.' },
  { id: 'e_na_hai_ni', branch: true, tier: 30, tone: 'vien', name: 'Hai ni cô không con', desc: 'Hai người đàn bà từng muốn giết nhau cùng xuống tóc một ngày. Ở chùa Vân Tịch, họ chăm vườn cho trẻ mồ côi, không ai nhắc chuyện cái bát.' },
  { id: 'd_na_hai_bat', branch: true, tier: 30, dead: true, name: 'Hai cái bát', desc: 'Chưa kịp đòi nợ thì người kia đã ra tay trước. Sáng ấy, hai viện cách nhau ba dãy hành lang cùng treo đèn trắng.' },
  // 9. tro Lựu
  { id: 'e_na_con_luu', branch: true, tier: 25, tone: 'vien', name: 'Thay Lựu làm con', desc: 'Bà đưa tro bạn về quê, rồi ở lại làm con của mẹ bạn. Cả làng gọi bà bằng tên Lựu, bà cũng thưa.' },
  { id: 'e_na_trong_oan', branch: true, tier: 15, tone: 'buon', name: 'Một tiếng trống', desc: 'Bà về kinh đánh trống kêu oan cho một cung nữ chết giếng, chỉ kịp gõ một tiếng. Bị đày ra trại muối, bà sống thêm ba mươi năm, chưa bao giờ thôi kể chuyện Lựu.' },
  // 10. Hoàng hậu
  { id: 'e_na_but_hau', branch: true, tier: 55, tone: 'vien', name: 'Người viết thư cho Hoàng hậu', desc: 'Bà không bao giờ được vua gọi, nhưng thành người duy nhất Hoàng hậu nói thật. Năm Hoàng hậu mất, trong quan tài có một xấp thư nét chữ của bà.' },
  { id: 'd_na_thu_yem', branch: true, tier: 20, dead: true, name: 'Hình nhân trong phong bì', desc: 'Lá thư thật của Hoàng hậu bị đánh tráo giữa đường thành một hình nhân trù yểm. Bà chết trước, Hoàng hậu khóc sau, và không ai nói được lá thư thật đã đi đâu.' },
];
