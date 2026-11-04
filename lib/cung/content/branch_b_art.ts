import type { EndArt } from '../types';

/** tranh và lời dẫn cho kết cục nhánh rẽ chặng 4-7 (branch_b.ts) */
export const BRANCH_B_ART: Record<string, EndArt> = {
  // ---- 1. b4_lap ----
  e_nb_lang_chai: {
    place: 'bien',
    time: 'chieu',
    cast: ['me', 'con'],
    mood: 'vui',
    motif: 'thuyen',
    story:
      'Ở làng chài phương nam có một người đàn bà vá lưới giỏi nhất bãi, nói giọng hơi lạ. Con trai bà mười hai tuổi đã theo thuyền ra khơi, mười tám tuổi lấy vợ trong làng. Trong kinh, sử chép Đông cung về tay Hoàng tử Nghĩa mà không ai tranh. Bà mất năm bảy mươi, con cháu chôn bà trên đồi cát, mặt nhìn ra biển.',
  },
  e_nb_cao_thi: {
    place: 'phong',
    time: 'dem',
    cast: ['me'],
    mood: 'buon',
    motif: 'den',
    story:
      'Người ta tin bà khi bà nói con đã chết đuối, vì không ai nghĩ một người mẹ lại nói dối như thế. Lãnh cung lạnh, cửa sổ chỉ nhìn được một góc trời. Mỗi năm đến rằm tháng Bảy, bà thắp một ngọn đèn đặt trên bậu cửa. Ở làng chài xa kia, có một người đánh cá cũng thả một ngọn đèn ra biển, không biết vì sao mình làm thế.',
  },
  // ---- 2. b4_bien ----
  e_nb_me_linh: {
    place: 'nui',
    time: 'ngay',
    cast: ['me', 'tuong'],
    mood: 'binh',
    moods: { tuong: 'vui' },
    motif: 'noi',
    story:
      'Sổ cung chép bà ốm chết trong viện, quan tài nhẹ bẫng đưa ra lăng. Ở đồn biên ải, có một người đàn bà tóc ngắn nấu cháo, băng vết thương và dạy lính viết thư về nhà. Lính gọi bà là mẹ, kể cả những người tóc đã bạc. Lê Trực giữ khe núi ấy thêm ba năm, giặc không qua được lần nào.',
  },
  d_nb_vong_lau: {
    place: 'nui',
    time: 'dem',
    cast: ['tuong'],
    mood: 'buon',
    motif: 'co',
    story:
      'Sáng ra giặc rút qua sông, lá cờ trên vọng lâu vẫn đứng. Lê Trực trèo lên, gỡ cán cờ khỏi đôi tay đã cứng lại. Người lính tóc ngắn được chôn cùng lính trong đồn, bia chỉ ghi một chữ "binh". Hai mươi năm sau, khi đã về hưu, tướng già mới dám đục thêm tên thật lên tấm bia ấy.',
  },
  // ---- 3. cb_dc ----
  e_nb_ong_lang: {
    place: 'lang',
    time: 'chieu',
    cast: ['me', 'vua'],
    mood: 'vui',
    motif: 'chieu',
    story:
      'Trong Thái miếu có bài vị của một ông vua băng giữa canh ba. Ở làng ven sông có ông lão ngày ngày ngồi câu bên bờ ao, chẳng bao giờ được con cá nào to. Vợ ông nấu cơm, phơi thuốc cho ông lang, thỉnh thoảng hát một bài hò không ai trong làng biết. Ông sống thêm mười hai năm, mất trong giấc ngủ trưa, tay vẫn cầm cần câu.',
  },
  e_nb_ve_kinh: {
    place: 'vien',
    time: 'ngay',
    cast: ['me'],
    mood: 'buon',
    motif: 'rem',
    story:
      'Lính gác cửa Ngọ Môn chưa từng thấy mặt vua, chỉ thấy một ông lão gầy và một người đàn bà áo vải. Triều đình đã có vua mới, không ai muốn nhận một người đã có bài vị. Ông bị giải đi trong đêm, không ai nói đi đâu. Bà bị nhốt vào lãnh cung, sống đến già, đến chết vẫn gọi ông là "chàng".',
  },
  // ---- 4. b5_bang2 ----
  d_nb_tuan_canh: {
    place: 'vien',
    time: 'dem',
    cast: ['hanh'],
    mood: 'buon',
    motif: 'den',
    story:
      'Bà cầm đèn lồng đi ngược về phía tiếng mõ, vừa đi vừa hỏi đường như người lạc. Hạnh nằm úp sau bụi tre ngoài tường, nghe tiếng đèn rơi xuống đá. Sáng ra sổ cung chép một phi tần cũ trẫm mình dưới giếng. Hạnh sống thêm bốn mươi năm ở một làng xa, năm nào cũng thắp nhang cho một người không có mộ.',
  },
  e_nb_quan_che: {
    place: 'bien',
    time: 'chieu',
    cast: ['me', 'hanh'],
    mood: 'vui',
    motif: 'noi',
    story:
      'Quán chè bên bến chợ có hai bà chủ không rõ quê, một người nấu, một người rao. Khách đi buôn kể nhau rằng chè ở đó ngọt mà không gắt, ăn xong thấy nhẹ người. Có người bảo bà nấu chè trông giống một phi tần trong kinh, bà chỉ cười, múc thêm cho một thìa. Hai bà già đi cùng nhau, mộ đặt cạnh nhau trên gò sau bến.',
  },
  // ---- 5. cb_phe ----
  e_nb_vua_muoi: {
    place: 'bien',
    time: 'ngay',
    cast: ['me', 'con'],
    mood: 'vui',
    motif: 'chieu',
    story:
      'Tờ chiếu rước về kinh nằm trong rương, không ai mở lại lần nào. Con bà cào muối, đắp đê, dạy trẻ trong vùng đọc chữ. Dân mấy làng muối gọi ông là "ông hoàng muối", nửa đùa nửa thật. Bà sống đến tám mươi, trước khi mất còn dặn con: "Ngai ở kinh thì nặng, muối ở đây thì mặn, con chọn đúng rồi."',
  },
  d_nb_don_duong: {
    place: 'lang',
    time: 'dem',
    cast: ['me', 'con'],
    mood: 'buon',
    motif: 'chen',
    story:
      'Đoàn rước dừng ở trạm thứ ba, có người mang ra một vò rượu "mừng điện hạ hồi kinh". Con bà rót cho mẹ trước, theo lễ. Sáng ra, lính trạm báo về kinh hai người nhiễm dịch dọc đường. Ngai vàng về tay một ông hoàng khác, và sử chỉ chép một dòng ngắn.',
  },
  // ---- 6. b6_tau ----
  e_nb_sinh_tu: {
    place: 'dien',
    time: 'chieu',
    cast: ['me', 'quan'],
    mood: 'buon',
    moods: { quan: 'dac' },
    motif: 'rem',
    story:
      'Bà về đến kinh thì chiếc ghế sau rèm đã có người khác ngồi, Thái phó tâu rằng "nương nương đi xa, việc nước không thể chờ". Bà lui về một cung nhỏ, sống yên ổn mà không còn ai tâu việc. Ở phương nam, dân lập sinh từ thờ bà khi bà còn sống. Bà xin về thăm ba lần, lần nào chiếu cũng bảo đường xa.',
  },
  d_nb_lang_dich: {
    place: 'lang',
    time: 'dem',
    cast: ['phuc', 'cungnu'],
    mood: 'buon',
    motif: 'den',
    story:
      'Mười chín ngày bà nấu cháo, lau mặt, đắp chiếu cho người chết. Đến ngày thứ hai mươi, làng không còn ai ho, và bà cũng nằm xuống trên chiếc chõng tre. Phúc khóc như trẻ con, xin chôn bà ngay dưới gốc gạo đầu làng. Bé gái năm ấy lớn lên, mỗi mùa hoa gạo lại quét sạch lá quanh mộ.',
  },
  // ---- 7. cb_su ----
  e_nb_hau_sa_hai: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'ngoai'],
    mood: 'binh',
    moods: { ngoai: 'vui' },
    motif: 'ngai',
    story:
      'Bà sang biển làm con tin, rồi làm hoàng hậu nước người theo tục Sa Hải. Vua già mất sau sáu năm, bà ngồi sau rèm dạy con chồng trị nước. Ba mươi năm, thuyền buôn hai nước đi lại không một lần giương cung. Thư bà gửi về cho con mỗi năm một lá, lá nào cũng mở đầu bằng "Mẹ vẫn khỏe".',
  },
  e_nb_con_tin: {
    place: 'bien',
    time: 'chieu',
    cast: ['me', 'con'],
    mood: 'buon',
    moods: { con: 'binh' },
    motif: 'thuyen',
    story:
      'Mười năm ở Sa Hải, bà học được tiếng nước người, đếm từng con thuyền về bến. Ngày về, con bà đứng đón trên bến, áo long bào chỉnh tề. Nó cúi chào bà rất đúng lễ, như chào một vị khách quý. Bà sống thêm hai mươi năm trong cung, được kính trọng, và không ai gọi bà là mẹ nữa.',
  },
  // ---- 8. b6_phan ----
  d_nb_chen_chung: {
    place: 'dien',
    time: 'dem',
    cast: ['con', 'nghia'],
    mood: 'buon',
    moods: { nghia: 'so' },
    motif: 'chen',
    story:
      'Hai chén rượu rót từ cùng một bình, bà đã bỏ thuốc vào bình từ trước khi rút then cửa. Nghĩa ngã xuống trước, tay còn đặt trên chiếc ấn ngọc. Bà ngồi lại, sửa tóc cho thẳng, rồi gục đầu lên án. Sáng ra quân binh biến tan như khói, vua con vẫn ngồi trên ngai, chưa hiểu vì sao mẹ không dậy.',
  },
  e_nb_san_chua: {
    place: 'chua',
    time: 'chieu',
    cast: ['me', 'su'],
    mood: 'buon',
    moods: { su: 'binh' },
    motif: 'chuong',
    story:
      'Hoàng tử Nghĩa giữ lời thề đến hết đời, không một lần lên núi. Con bà thành sư, giỏi kinh, hiền và lặng, gọi bà là "thí chủ" như gọi mọi người khác. Bà quét lá sân chùa ba mươi năm, chưa từng nghe con gọi một tiếng mẹ. Ngày bà mất, chính con bà gõ chuông, chuông vọng xuống kinh thành rất lâu.',
  },
  // ---- 9. b7_cuoi ----
  e_nb_bat_che: {
    place: 'phong',
    time: 'dem',
    cast: ['me', 'hanh'],
    mood: 'buon',
    moods: { hanh: 'vui' },
    motif: 'chen',
    story:
      'Hai bà già về kịp giờ đóng cổng, lính gác giả như không thấy. Tối ấy Hạnh cười suốt, kể đi kể lại bát chè đậu đen ngoài chợ. Mùa đông năm đó Hạnh mất, nhẹ như ngủ. Bà giữ lại cái bát sành mẻ miệng Hạnh mang về, đặt trên án thư cho đến ngày bà nhắm mắt.',
  },
  e_nb_sang_song: {
    place: 'chua',
    time: 'chieu',
    cast: ['me', 'hanh'],
    mood: 'vui',
    motif: 'hoa',
    story:
      'Trong cung người ta tìm hai bà già suốt một tháng, rồi chép vào sổ là "đi lễ chùa, lạc đường". Bên kia núi có ngôi chùa nhỏ với một cây đại già, sư trụ trì nhận hai bà vãi không hỏi tên. Sáng hai bà quét sân, chiều ngồi nhặt hoa đại rơi. Không ai biết bà từng là ai, và bà thấy thế là đủ.',
  },
  // ---- 10. cb_tu ----
  e_nb_khai_hoan: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'con', 'tuong'],
    mood: 'vui',
    motif: 'kiem',
    story:
      'Quân về kinh qua cửa Bắc, dân đứng kín hai bên đường xem người đàn bà tóc bạc mặc giáp. Con bà xuống ngựa trước, đỡ mẹ xuống sau, trước mặt cả triều. Từ đó, việc gì nó cũng nghe mẹ nói hết câu rồi mới quyết. Bộ giáp cũ treo trong điện, đời sau gọi là "giáp Thái hậu".',
  },
  d_nb_khe_nui: {
    place: 'nui',
    time: 'chieu',
    cast: ['con', 'tuong'],
    mood: 'buon',
    motif: 'kiem',
    story:
      'Bà phi lên trước con, mũi tên dành cho vua cắm vào ngực bà. Con bà thoát khỏi khe núi, quay lại đánh tan quân Sa Hải ngay chiều ấy. Nó tự tay khâm liệm mẹ trong bộ giáp cũ, không cho ai chạm vào. Cả đời sau, vua không thân chinh thêm lần nào, và năm nào cũng lên khe núi ấy thắp nhang.',
  },
};
