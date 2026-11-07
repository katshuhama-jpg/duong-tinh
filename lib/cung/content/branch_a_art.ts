import type { EndArt } from '../types';

/** tranh và lời dẫn cho kết cục nhánh rẽ chặng 1-3 (branch_a.ts) */
export const BRANCH_A_ART: Record<string, EndArt> = {
  e_na_ve_lang: {
    place: 'lang',
    time: 'ngay',
    cast: ['me', 'meday'],
    mood: 'vui',
    moods: { meday: 'buon' },
    motif: 'thuyen',
    story:
      'Chiếc đò muối thả bà xuống một bến lạ, bà đi bộ thêm mười ngày mới về tới {que}. {me} nhìn con gái đen nhẻm, chân rớm máu, ôm lấy mà không dám hỏi. Bà lấy tên khác, lên đồi hái chè như chưa từng đi đâu. Mỗi lần có quan về làng đọc chiếu, bà lại lặng lẽ kéo nón xuống thấp hơn.',
  },
  d_na_song_dem: {
    place: 'bien',
    time: 'dem',
    cast: ['me'],
    mood: 'so',
    motif: 'den',
    story:
      'Bà trèo qua được bức tường cao nhất kinh thành, nhưng không biết con sông ngoài thành sâu đến đâu. Giữa dòng, chiếc áo cung nặng nước kéo bà xuống. Trên bờ, đuốc của lính tuần soi mãi mà không thấy gì. Sổ cung chỉ ghi một dòng: tú nữ mới vào, mất tích đêm đầu.',
  },
  e_na_hau_dao: {
    place: 'bien',
    time: 'ngay',
    cast: ['me', 'ngoai'],
    mood: 'vui',
    moods: { ngoai: 'vui' },
    motif: 'thuyen',
    story:
      'Sau đêm bão, bà dạt vào bờ Vân Đảo, tay vẫn ôm hộp ấn hòa thân ướt sũng mà còn nguyên niêm. Vua Vân Đảo chân trần lội ra đón, cười bảo chưa thấy công chúa nào về nhà chồng ướt như thế. Bà mang hạt chè giấu trong áo gieo lên đồi đảo, dạy dân hái và sao. Nhiều đời sau, thuyền buôn ghé Vân Đảo vẫn được mời một chén "chè bà Nam".',
  },
  d_na_bien_bao: {
    place: 'bien',
    time: 'dem',
    cast: ['me'],
    mood: 'buon',
    motif: 'thuyen',
    story:
      'Bà nhường chỗ trên thuyền con cho mười thị nữ, rồi ngồi lại trong khoang thuyền rồng đốt một nén hương. Gần sáng, con sóng thứ chín ập tới. Mười cô gái dạt vào đảo hoang, sống sót và về nước sau hai năm. Cô nào cũng kể y như nhau về một công chúa đứng ở mũi thuyền, không hề khóc.',
  },
  d_na_do_dao: {
    place: 'bien',
    time: 'dem',
    cast: ['me', 'vua'],
    mood: 'buon',
    moods: { vua: 'buon' },
    motif: 'den',
    story:
      'Lưỡi dao thứ nhất đâm vào bà, lưỡi thứ hai không kịp, vì cả chợ đêm đã ùa tới. Hoàng thượng ôm bà ngồi giữa hàng bánh đúc, áo vải ướt đẫm. Ngài truy phong bà làm phi, rồi cấm hẳn chợ đêm bến sông. Người bán bánh đúc năm ấy về sau kể mãi, rằng ông vua ngồi khóc như một anh thư sinh.',
  },
  e_na_hang_chieu: {
    place: 'bien',
    time: 'chieu',
    cast: ['me', 'vua'],
    mood: 'vui',
    motif: 'chieu',
    story:
      'Chiếc ngọc bội chìm xuống sông, và một ông vua biến mất khỏi sử sách. Triều đình chép ngài băng hà vì bạo bệnh, lập em ngài lên thay. Ở một làng ven biển có đôi vợ chồng dệt chiếu, ông chồng viết chữ đẹp lạ thường. Chiều chiều họ ngồi ngoài bãi cãi nhau xem chiếu nào bán được giá hơn.',
  },
  e_na_quan_che: {
    place: 'lang',
    time: 'chieu',
    cast: ['me'],
    mood: 'buon',
    motif: 'chen',
    bg: 'cong',
    where: 'ở quán chè ngoài cửa Tây',
    story:
      'Bà mở một quán chè ngay ngoài cổng thành, đối diện cửa Tây. Năm đầu có người mặc áo vải ghé ba lần, ngồi rất lâu, uống rất ít. Năm sau thì một lần, rồi không thấy nữa. Bà vẫn bày sẵn một chén úp ở góc bàn, đến khi tóc bạc trắng.',
  },
  e_na_tuong_vang: {
    place: 'phong',
    time: 'dem',
    cast: ['me'],
    mood: 'buon',
    motif: 'den',
    bg: 'lanh',
    where: 'trong lãnh cung',
    story:
      'Bà Hiền phi mất trong một đêm mưa phùn, tay còn nắm tay bà. Chiếc chìa khóa gỉ nằm dưới gối, mãi không ai dùng đến. Năm này qua năm khác, bà ngồi đúng chỗ người cũ từng ngồi, chải tóc cho con búp bê rơm. Người mới bị đưa vào lãnh cung đều tưởng bà là Hiền phi đời trước.',
  },
  e_na_chua_mua: {
    place: 'chua',
    time: 'ngay',
    cast: ['me', 'su'],
    mood: 'vui',
    moods: { su: 'binh' },
    motif: 'chuong',
    story:
      'Hai người đến chùa Vân Tịch đúng lúc chuông sớm. Sư bà nhìn hai mái tóc ướt, một bạc một xanh, không hỏi gì mà cho xuống tóc luôn trong buổi ấy. Bà Hiền phi sống thêm sáu năm, ngày nào cũng ra quét sân. Lúc mất, bà gọi người trẻ là con, và người trẻ thưa mẹ.',
  },
  d_na_but_sat: {
    place: 'phong',
    time: 'dem',
    cast: ['me'],
    mood: 'so',
    motif: 'sach',
    bg: 'thu',
    story:
      'Bà chép trang sử ấy trong ba đêm, nét chữ không run một nét. Đêm thứ tư, có người vào kho sách, cầm theo dải lụa trắng của Thái hậu. Trang sử bị xé, cuốn sổ bị đốt. Nhưng người học trò mài mực cho bà đã thuộc lòng từng chữ, và về già đọc lại cho cháu chắt nghe.',
  },
  e_na_nu_su: {
    place: 'phong',
    time: 'ngay',
    cast: ['me'],
    mood: 'buon',
    motif: 'sach',
    bg: 'thu',
    story:
      'Bà giữ kho sách bốn mươi năm, đến khi trong cung không ai còn nhớ bà từng có đèn đỏ treo trước cửa. Chính sử bà chép cẩn thận, không sai một ngày. Trăm năm sau, thợ sửa kho đục một mảng vách vôi trộn nước chè. Cuốn sổ rơi ra, mở đúng trang đầu, nét chữ một người đàn bà.',
  },
  e_na_lang_chai: {
    place: 'bien',
    time: 'chieu',
    cast: ['me', 'con'],
    mood: 'vui',
    motif: 'thuyen',
    story:
      'Cả làng chài cùng nói dối một lời, và lính đi qua chỉ thấy một mẹ góa ngồi vá lưới. Con trai bà lớn lên đen nhẻm, bơi giỏi nhất làng, lặn một hơi xuống tận đáy sông. Có năm vua đi tuần qua bến, nó đứng lẫn trong đám trẻ con xem thuyền rồng. Bà kéo nó về nhà sớm, mà không nói vì sao.',
  },
  d_na_bung_tra: {
    place: 'bien',
    time: 'ngay',
    cast: ['me', 'con'],
    mood: 'buon',
    motif: 'noi',
    story:
      'Viên đội đón lấy đứa bé bằng cả hai tay, đặt vào kiệu son như đặt một món đồ ngự dụng. Bà đứng bên bờ sông nhìn chiếc kiệu đi khuất, rồi tự bước tới chỗ sợi dây. Đứa bé lớn lên trong cung, được dạy rằng mẹ nó mất lúc sinh. Nó tin, vì chẳng ai còn lại để kể khác đi.',
  },
  d_na_nhan_con: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'quan', 'thucphi'],
    mood: 'buon',
    moods: { quan: 'so', thucphi: 'dac' },
    motif: 'ngai',
    bg: 'trieu',
    story:
      'Bà bước ra giữa sân điện, chỉ vào nốt ruồi son sau gáy trạng nguyên. Thục phi từ sau rèm nói đúng hai chữ: "Khi quân." Trạng nguyên được tha vì không biết gì, còn bà thì không. Về già, ông quan ấy vẫn thắp hương cho một bà phi lạ mặt, mà không hiểu vì sao lòng mình nặng thế.',
  },
  e_na_chen_trang: {
    place: 'phong',
    time: 'chieu',
    cast: ['quan'],
    mood: 'binh',
    where: 'trong dinh quan Thượng thư',
    motif: 'chen',
    story:
      'Con trai bà làm đến Thượng thư, xử án thanh liêm, dân trong kinh gọi là quan Mận. Cả đời ông không biết mình sinh ra trong cung. Năm nào cũng vào ngày xướng danh, có một thái giám mang sang dinh ông một chén chè, bảo là của một bà phi già. Ông uống cạn, cúi đầu tạ ơn về phía hậu cung.',
  },
  e_na_dien_cung: {
    place: 'phong',
    time: 'chieu',
    cast: ['me'],
    mood: 'buon',
    motif: 'chen',
    bg: 'lanh',
    where: 'trong viện Tây',
    story:
      'Người ta bảo bà mất con nên hóa điên, rồi nhốt bà ở viện Tây. Ngày nào bà cũng lấy nước giếng rửa một cái bát không, rửa đến khi trắng bệch. Thục phi thỉnh thoảng đi qua cửa, đứng nhìn một lúc. Có lần nàng dừng lại rất lâu, nhưng rồi vẫn đi.',
  },
  e_na_hai_ni: {
    place: 'chua',
    time: 'chieu',
    cast: ['me', 'thucphi'],
    mood: 'vui',
    moods: { thucphi: 'binh' },
    motif: 'hoa',
    story:
      'Hai người đàn bà cùng mất con, cùng xuống tóc một ngày ở chùa Vân Tịch. Họ nhận nuôi trẻ mồ côi chân núi, mỗi người một dãy giường. Có đứa hỏi hai sư bà quen nhau từ bao giờ, cả hai cùng đáp: từ một cái bát. Rồi họ cười, và không ai giải thích thêm.',
  },
  d_na_hai_bat: {
    place: 'vien',
    time: 'ngay',
    cast: ['hanh'],
    mood: 'buon',
    motif: 'den',
    story:
      'Hai người bàn đến sáng, rồi chờ thêm ba tháng cho chắc. Người kia không chờ lâu như thế. Cùng một buổi sáng, hai viện cách nhau ba dãy hành lang cùng treo đèn trắng. Hạnh là người duy nhất biết đêm ấy hai chủ nhân đã nói gì, và cả đời nó không kể với ai.',
  },
  e_na_con_luu: {
    place: 'lang',
    time: 'chieu',
    cast: ['me', 'meday'],
    mood: 'vui',
    moods: { meday: 'vui' },
    motif: 'aonau',
    story:
      'Chiếc áo nâu của Lựu hơi rộng, mẹ Lựu sửa lại trong một buổi tối. Bà ở lại làng ấy, cấy lúa, nuôi tằm, cả làng gọi bằng tên Lựu, bà cũng thưa. Mộ Lựu đắp sau vườn, mùa nào cũng có hoa bí vàng. Anh trai Lựu dựng thêm một gian bếp, từ đó nhà ba người ăn chung một mâm.',
  },
  e_na_trong_oan: {
    place: 'bien',
    time: 'dem',
    cast: ['me'],
    mood: 'buon',
    motif: 'trang',
    story:
      'Dùi trống chỉ kịp chạm mặt da một lần thì lính đã ập tới. Bà bị đánh ba mươi roi, đày ra trại muối ven biển. Ba mươi năm cào muối, đêm nào bà cũng kể chuyện Lựu cho người nằm bên. Đến khi bà mất, cả trại muối đều biết tên một cung nữ chết giếng mà họ chưa từng gặp.',
  },
  e_na_but_hau: {
    place: 'phong',
    time: 'dem',
    cast: ['me', 'hoanghau'],
    mood: 'binh',
    moods: { hoanghau: 'vui' },
    motif: 'sach',
    bg: 'thu',
    where: 'trong thư phòng Hoàng hậu',
    story:
      'Đèn đỏ không bao giờ treo trước cửa viện bà, mà bà cũng không chờ. Đêm nào bà cũng ngồi trong thư phòng Hoàng hậu, viết những lá thư không gửi. Ba mươi năm, bà là người duy nhất Hoàng hậu nói thật. Năm Hoàng hậu mất, trong quan tài có một xấp thư, toàn nét chữ của bà.',
  },
  d_na_thu_yem: {
    place: 'phong',
    time: 'dem',
    cast: ['me', 'hoanghau'],
    mood: 'so',
    moods: { hoanghau: 'buon' },
    motif: 'den',
    bg: 'thu',
    story:
      'Lá thư đi qua tay ba người trước khi đến thư phòng Hoàng thượng. Lúc mở ra, trong phong bì là một hình nhân giấy viết ngày sinh của ngài. Bà bị xử tội trù yểm ngay trong tháng. Hoàng hậu không cứu được, chỉ giữ lại bản nháp lá thư thật, đến chết vẫn cất trong ngực áo.',
  },
};
