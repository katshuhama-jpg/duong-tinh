import type { EndArt } from './types';

/** tranh và lời dẫn riêng cho từng kết cục (màn "Mở khóa kết cục") */
export const ENDING_ART: Record<string, EndArt> = {
  // ---- deep_arcs ----
  d_ar_cua_sau: {
    place: 'vien',
    time: 'dem',
    cast: ['hanh'],
    mood: 'so',
    motif: 'den',
    story:
      'Đêm ấy chuông điện Càn Nguyên gõ liền ba hồi báo vua trở bệnh nặng. Cửa sau viện {ho} thị vẫn để hé, ngọn đèn lồng treo ở hiên chưa ai thổi tắt. Sáng ra người ta bàn tán về thích khách từ ngoài thành vào. Chỉ thị nữ Hạnh biết then cửa do ai rút, và nàng sống đến già mà không dám đi qua cổng ấy thêm lần nào.',
  },
  d_ar_kieu_nga: {
    place: 'phong',
    time: 'chieu',
    cast: ['cungnu'],
    mood: 'buon',
    motif: 'lua',
    story:
      'Năm mười tám tuổi, {ho} thị đứng ra nhận tội thay người nằm chiếu bên. Thái hậu cho một dải lụa trắng và một buổi chiều để từ biệt. Bà cắt một lọn tóc, gói trong khăn tay, nhét vào tay Kiều Nga mà không nói gì. Nhiều năm sau, đến đúng ngày ấy, người ta lại nghe bài hò hái chè vọng ra từ dãy phòng cung nữ.',
  },
  e_ar_hai_ba: {
    place: 'vuon',
    time: 'chieu',
    cast: ['me', 'thucphi'],
    moods: { me: 'vui', thucphi: 'gian' },
    motif: 'hoa',
    story:
      'Về già, {ho} thị dọn gian bên cạnh cho người đàn bà từng muốn mình chết. Sáng nào hai bà cũng cãi nhau xem nên tráng ấm hai lần hay ba lần. Chiều xuống, mỗi người thả một bông sen giấy xuống hồ, rồi ngồi nhìn hoa trôi đến tối. Chiếc trâm phượng năm nào nằm trong rương của ai, đến lúc nhắm mắt không bà nào hỏi.',
  },
  e_ar_nghia_mau: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'hoanghau', 'con'],
    mood: 'vui',
    motif: 'sach',
    story:
      'Chữ đầu tiên {ho} thị biết viết là do Hoàng hậu cầm tay dạy, trên một tờ giấy dó đã ố vàng. Về sau chính Hoàng hậu bế con bà, dạy nó đọc Hiếu kinh. Hai bà cùng ngồi một chiếu nghe con giảng sách, cùng già đi trong một cung. Năm hai bà lần lượt mất, vua mặc tang phục như nhau, quỳ trước hai bài vị đặt ngang hàng.',
  },
  e_ar_doi_che: {
    place: 'nui',
    time: 'chieu',
    cast: ['me'],
    mood: 'buon',
    motif: 'chieu',
    story:
      'Tờ chiếu viết bằng nét chữ con mình, lời lẽ cung kính không chê được chỗ nào. {ho} thị về lại đồi chè ở {que}, có lính canh ở cổng và lương hưu gửi đều mỗi quý. Bà tự tay hái chè, sao chè, gửi lên kinh mỗi mùa xuân một gói. Chưa năm nào có thư hồi âm, nhưng năm nào bà cũng gửi.',
  },
  // ---- deep_events ----
  e_ev_ruong: {
    place: 'lang',
    time: 'ngay',
    cast: ['me'],
    mood: 'vui',
    motif: 'aonau',
    story:
      'Cuối đời, bà gấp áo thêu cất vào rương, mặc áo vải ra ruộng ven kinh cấy mấy sào. Trẻ con trong làng gọi bà là "bà phi lúa", bà cười, không cãi. Mùa gặt nào bà cũng để lại một góc ruộng cho người mót. Năm bà mất, cả làng gặt sớm một hôm, mang nắm lúa đầu mùa đặt lên mộ.',
  },
  d_ev_chay: {
    place: 'vien',
    time: 'dem',
    cast: ['cungnu'],
    mood: 'buon',
    motif: 'lua_chay',
    story:
      'Gió mùa hanh thổi lửa từ kho củi sang dãy phòng cung nữ chỉ trong một khắc. {ho} thị trùm chăn ướt chạy vào, kéo được một cô bé ra đến bậc thềm thì xà nhà sập xuống. Cô bé tên Sen sống đến tám mươi tuổi. Năm nào đến ngày ấy, bà Sen tóc bạc lại ra nền viện cũ, thắp ba nén nhang và đứng đến khi nhang tàn.',
  },
  d_ev_dich: {
    place: 'phong',
    time: 'dem',
    cast: ['cungnu'],
    mood: 'lo',
    motif: 'chen',
    story:
      'Mùa thổ tả năm ấy, viện bệnh nằm kín người, không ai dám đến gần. {ho} thị vẫn ngày ngày bưng cháo, lau mặt cho từng cung nữ. Đến khi chính bà nằm xuống, bát cháo cuối cùng còn đổ dở bên chiếu. Sổ cung chép chung một dòng với ba mươi người khác, không ghi bậc, chỉ ghi một chữ "bệnh".',
  },
  // ---- ENDINGS (world.ts) ----
  e_mau_nghi: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'con'],
    mood: 'binh',
    motif: 'rem',
    story:
      'Con lên ngôi khi còn nhỏ, {ho} thị ngồi sau tấm rèm trúc nghe triều chính. Bà không giết ai, không đày ai, chỉ hỏi kỹ từng tờ sớ rồi để con tự quyết. Năm con hai mươi tuổi, bà cho cuốn rèm lên, lui về cung sau trồng cúc. Sử chép về bà vỏn vẹn một dòng: hiền và tỉnh.',
  },
  e_nhiep_mau: {
    place: 'dien',
    time: 'chieu',
    cast: ['me', 'quan'],
    moods: { me: 'dac', quan: 'so' },
    motif: 'ngai',
    story:
      'Hậu cung không ai còn dám đứng thẳng, triều đình thì quỳ đúng như bà muốn. Dưới tay {ho} thị, kho lúa đầy, biên ải yên, thuế nhẹ hơn ba đời trước. Nhưng ngoài kinh có những nấm mộ không bia, và tên từng người nằm đó đều có trong sổ của bà. Đời sau khen bà giỏi trị nước, rồi đọc tiếp những trang không ai muốn đọc.',
  },
  e_thai_phi: {
    place: 'vuon',
    time: 'ngay',
    cast: ['me', 'con', 'hoanghau'],
    moods: { me: 'binh', con: 'vui', hoanghau: 'dac' },
    motif: 'hoa',
    story:
      'Ngày con lên ngôi, {ho} thị lùi lại một bước, để đích mẫu đứng chỗ cao nhất. Bà nhận tước Hoàng thái phi, dọn sang một cung nhỏ có vườn mai. Người tranh thì lần lượt mất trước, người lui thì ngồi lại uống trà. Bà sống qua ba đời vua, là người cuối cùng còn nhớ hậu cung năm bà mới vào.',
  },
  e_hoang_quy_phi: {
    place: 'dien',
    time: 'chieu',
    cast: ['me', 'vua'],
    mood: 'dac',
    motif: 'chieu',
    story:
      'Tờ chiếu sắc phong Hoàng quý phi được đọc giữa sân, trước mặt cả hậu cung. Từ đó {ho} thị đứng đầu sáu viện, chỉ cách ngai vua đúng một khoảng sân lát gạch. Không có con lên ngôi, nhưng không phi tần nào dám bước qua bà mà không cúi đầu. Bia mộ khắc đủ tước hiệu, dài hơn bia của nhiều hoàng hậu.',
  },
  e_hien_phi: {
    place: 'phong',
    time: 'chieu',
    cast: ['me', 'con'],
    mood: 'vui',
    motif: 'noi',
    story:
      'Cả đời {ho} thị không tranh với ai một chiếc ghế, một lời khen. Về già, viện của bà lúc nào cũng có tiếng trẻ con, cháu nội cháu ngoại chạy quanh chiếc nôi tre. Chiều chiều bà ngồi bên cửa sổ dạy cháu gái thêu đóa sen, kim nào cũng xỏ chỉ sẵn. Bà mất trong giấc ngủ trưa, bức thêu còn dở một cánh hoa.',
  },
  e_lang_le: {
    place: 'vien',
    time: 'chieu',
    cast: ['me'],
    mood: 'buon',
    motif: 'rem',
    story:
      'Như phần đông phi tần, {ho} thị được hầu vua một lần năm mười chín tuổi, rồi thôi. Rèm trúc trước viện buông suốt mấy chục năm, bụi bám thành lớp. Bà đếm mùa bằng hoa trong sân, đếm năm bằng tóc bạc trên lược. Đến khi mất, sổ cung chỉ ghi họ và một bậc thấp, không ai nhớ mặt.',
  },
  e_cau_mua: {
    place: 'lang',
    time: 'ngay',
    cast: ['me'],
    mood: 'vui',
    motif: 'sach',
    story:
      'Năm hạn hán, vua cho trăm cung nữ về quê "giải trừ âm khí", {ho} thị được về {que}. Bà lấy một ông đồ nghèo trong làng, chồng dạy chữ, vợ dạy con gái làng thêu. Mưa đến đúng mùa năm sau, người làng nói tại có bà về. Bà chỉ cười, cất chiếc khăn thêu phượng cuối cùng vào đáy hòm sách của chồng.',
  },
  e_di_tu: {
    place: 'chua',
    time: 'chieu',
    cast: ['me', 'su'],
    mood: 'binh',
    motif: 'chuong',
    story:
      'Ngày xuống tóc ở chùa Vân Tịch, {ho} thị gấp chiếc áo thêu lần cuối, đặt lên bàn thờ Phật. Từ đó bà quét sân, gánh nước, tụng kinh như mọi ni cô khác. Chiều nào tiếng chuông cũng vọng xuống tận kinh thành. Bà nói tiếng chuông ấy nghe rõ hơn mọi chiếu chỉ bà từng quỳ nhận.',
  },
  e_lay_tuong: {
    place: 'nui',
    time: 'chieu',
    cast: ['me', 'tuong'],
    mood: 'vui',
    motif: 'co',
    story:
      'Được ban gả cho tướng Lê Trực, {ho} thị theo chồng lên biên ải, nơi gió thổi rách cờ mỗi mùa đông. Bà học cưỡi ngựa, học nấu cháo cho lính bị thương, học ngủ giữa tiếng trống canh. Hai vợ chồng có ba đứa con, đứa nào cũng sinh ra dưới lá cờ đồn. Về già bà nói nửa sau đời gió to, nhưng lòng nhẹ hơn hồi ở trong cung.',
  },
  e_trao_ngoi: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'tuong', 'con'],
    moods: { me: 'binh', tuong: 'lo', con: 'so' },
    motif: 'ngai',
    story:
      'Giặc đã đến chân thành, vua nhỏ ôm chân mẹ, không cầm nổi thanh gươm. {ho} thị mở cửa điện, đặt chiếc áo bào vào tay tướng Lê Trực trước mặt bách quan. Nước được giữ, ngai đổi họ, sử chép lời khen lẫn lời chê. Bà sống những năm cuối trong một phủ nhỏ, con trai được phong vương, và không ai còn bắt nó cầm gươm.',
  },
  e_sung_phi: {
    place: 'lang_mo',
    time: 'chieu',
    cast: [],
    mood: 'buon',
    motif: 'mo',
    story:
      'Từ {goc}, {ho} thị lên đến chỗ không phi tần nào cùng thời với tới. Một tháng sau mọi thứ sụp như bức tường đất gặp mưa. Lăng nhỏ ngoài thành không ghi tên, chỉ có một bát nhang đất. Thỉnh thoảng có người đi qua thấy bó hoa dại đặt sẵn, không biết ai mang đến.',
  },
  d_doc: {
    place: 'phong',
    time: 'chieu',
    cast: [],
    mood: 'so',
    motif: 'chen',
    story:
      'Chén chè hạt sen được bưng đến lúc trời vừa sập tối, kèm một câu chúc rất ngọt. {ho} thị ăn hết, khen chè nấu khéo, rồi thấy tay mình run lên. Đến khi nhận ra vị đắng dưới đáy chén thì đã muộn. Chiếc chén sứ lăn xuống chân giường, sáng ra người ta dọn đi trước khi thái y đến.',
  },
  d_phe: {
    place: 'vien',
    time: 'dem',
    cast: [],
    mood: 'buon',
    motif: 'lua',
    story:
      'Chiếu phế đọc buổi sáng, chiếu ban chết đến lúc lên đèn. Thái giám đặt trước mặt {ho} thị một khay sơn, trên khay là ba thước lụa trắng gấp vuông vức. Bà xin một chén nước, chải lại tóc, rồi bảo người hầu ra ngoài. Sáng hôm sau viện cũ bị niêm phong, tên bà bị gạch khỏi sổ bằng một nét mực son.',
  },
  d_san: {
    place: 'phong',
    time: 'dem',
    cast: ['con', 'cungnu'],
    mood: 'buon',
    motif: 'noi',
    story:
      'Cơn đau kéo dài từ chiều đến gần sáng, bà mụ thay ba chậu nước nóng. Đứa trẻ cất tiếng khóc thì {ho} thị chỉ kịp nhìn nó một lần. Chiếc nôi tre bà tự tay lót vải vẫn đặt cạnh giường, người ru con là một cung nữ khác. Như bao người đàn bà trong cung và ngoài cung, bà không được thấy con biết đi.',
  },
  d_binh_bien: {
    place: 'dien',
    time: 'dem',
    cast: ['con'],
    mood: 'so',
    motif: 'lua_chay',
    story:
      'Kẻ thua năm nào quay lại vào một đêm không trăng, mang theo trăm người và một mối thù đã ủ chín. Đuốc cháy đỏ sân rồng, cửa điện bị phá từ phía sau. {ho} thị đứng chắn trước con, không kịp nói hết một câu. Sáng ra quan văn dẹp xong loạn, chỉ còn tìm được chiếc khăn bà quàng đêm ấy.',
  },
  d_gieng: {
    place: 'vuon',
    time: 'ngay',
    cast: ['cungnu'],
    mood: 'so',
    motif: 'gieng',
    story:
      'Giếng sau viện vốn chỉ để tưới hoa, thành giếng phủ rêu. Sáng ấy một cung nữ ra múc nước, vớt lên một chiếc hài thêu chỉ vàng của {ho} thị. Không ai thấy gì, không ai nghe gì, sổ cung ghi "trượt chân". Mùa sau người ta lấp giếng, trồng lên đó một cây quế.',
  },
  e_giam_quoc: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'quan'],
    mood: 'binh',
    motif: 'chieu',
    story:
      'Một năm vua ra trận, ấn giám quốc nằm trong tay {ho} thị. Bà chưa từng ngồi sau rèm, chưa từng là mẹ vua, nhưng mỗi sáng đều ngồi duyệt sớ đến trưa. Lúa được mùa, giặc cỏ yên, kho không thiếu một đấu. Vua về, bà trả ấn ngay trong ngày, còn dân thì nhớ tên bà hơn nhớ tên trận thắng.',
  },
  d_tran_mac: {
    place: 'nui',
    time: 'chieu',
    cast: ['tuong'],
    mood: 'buon',
    motif: 'kiem',
    story:
      'Phi tần mặc giáp ra trận, sử quan không biết chép vào mục nào. {ho} thị ngã ngựa ở một khe núi, thanh kiếm còn nắm chặt trong tay. Tướng Lê Trực mang về kinh một chiếc trâm phượng dính bùn, đặt lên án thư trước mặt vua. Vua nhìn rất lâu, rồi cho chép tên bà vào mục tướng sĩ tử trận.',
  },
  // ---- routesVN ----
  e_chi_vua: {
    place: 'lang',
    time: 'chieu',
    cast: ['me'],
    mood: 'binh',
    motif: 'ngai',
    story:
      'Họ {ho} lên ngôi, em trai bà mặc áo vàng ngồi chỗ của một họ khác. {ho} thị được phong trưởng công chúa, nhưng xin về {que} sống. Bà sống đủ lâu để thấy triều ấy chỉ kéo dài bảy năm, chiếc ngai đổi chủ lần nữa. Bà chết già trong căn nhà cũ của {me}, không ai đến bắt.',
  },
  d_bac_hanh: {
    place: 'nui',
    time: 'chieu',
    cast: [],
    mood: 'buon',
    motif: 'co',
    story:
      'Giặc giải cả nhà họ {ho} lên phương bắc, cờ giặc đi trước, xe tù đi sau. Suốt đường đi qua mấy dãy núi, {ho} thị chỉ ngồi quay mặt về phía nam. Bà mất ở một trạm dọc đường, chưa đến được biên giới. Người ta chôn bà bên vệ đường, mộ quay về hướng {que}.',
  },
  e_nhac_mau: {
    place: 'nui',
    time: 'ngay',
    cast: ['me', 'tuong'],
    moods: { me: 'binh', tuong: 'vui' },
    motif: 'mo',
    story:
      'Họ cũ mất ngôi trong một đám cưới không ai khóc. {ho} thị theo con gái ra biên ải, làm mẹ vợ của người dựng triều mới. Bà sống đến bảy mươi tuổi, được kính trọng, được nuôi đủ. Chỉ có mỗi năm đến ngày giỗ tiên đế, bà phải dâng sớ xin phép một triều khác để được thắp một nén nhang.',
  },
  d_vuon_que: {
    place: 'vuon',
    time: 'ngay',
    cast: [],
    mood: 'buon',
    motif: 'hoa',
    story:
      'Vua băng hà giữa vườn Quế, người đứng gần nhất là {ho} thị. Án xử trong một buổi sáng, cả họ ra pháp trường cùng ngày, hoa quế rụng vàng lối đi. Hai mươi năm sau có chiếu minh oan dán ở cổng thành. Không còn ai họ {ho} đến nhận, tờ chiếu bay mất trong một trận gió.',
  },
  e_an_oan: {
    place: 'lang',
    time: 'chieu',
    cast: ['me'],
    mood: 'binh',
    motif: 'chieu',
    story:
      'Sống qua án giết vua mà mình không làm, {ho} thị đổi tên, dạy chữ ở một làng ven sông. Học trò lớn lên, đi thi, không ai biết cô giáo từng là phi tần. Ngày chiếu minh oan dán ở đình làng, bà đứng đọc từ đầu đến cuối cùng mọi người. Đọc xong bà về nhà nấu cơm, vì đã quen sống như một người không tên.',
  },
  e_thuyen_ve: {
    place: 'bien',
    time: 'ngay',
    cast: ['me', 'hanh'],
    mood: 'lo',
    motif: 'thuyen',
    story:
      'Giữa khói hương lễ chiêu hồn, một chiếc thuyền mang cờ Phượng Thành áp mạn, kéo {ho} thị lên. Về đến nước, triều đình không biết nên xếp bà là hoàng hậu nước người hay con tin trở về. Bà xin dựng một am nhỏ trên núi, cùng Hạnh trồng rau, nhặt củi. Chiều nào bà cũng ra mỏm đá nhìn về phía biển nam.',
  },
  e_hau_nuoc_nam: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'con', 'ngoai'],
    moods: { me: 'binh', con: 'vui', ngoai: 'binh' },
    motif: 'sach',
    story:
      'Giàn củi được tháo xuống, {ho} thị ở lại xứ người, sinh một hoàng tử đặt tên theo tiếng hai nước. Bà dạy con đọc sách bằng cả hai thứ chữ, kể cho nó nghe về {que}. Con lên ngôi, trả lại hai châu đất cho nước cũ của mẹ. Sử hai nước chép chuyện ấy hai kiểu khác nhau, nhưng đều ghi tên bà.',
  },
  d_gian_hoa: {
    place: 'bien',
    time: 'chieu',
    cast: [],
    mood: 'buon',
    motif: 'lua_chay',
    story:
      'Giàn hỏa dựng trên bãi cát, lửa cháy từ chiều đến nửa đêm. Khói bay về phía bắc ba ngày, qua cả biển. Ở {que}, {me} thấy một cánh chim lạ đậu trên mái nhà, không chịu bay đi. Người nhà lập bài vị cho {ho} thị, không có xác, chỉ có một vốc cát ai đó mang về.',
  },
  // ---- routesCN ----
  e_nu_y: {
    place: 'dien',
    time: 'dem',
    cast: ['me', 'vua'],
    mood: 'binh',
    motif: 'sach',
    story:
      'Không làm phi, không có con lên ngôi, {ho} thị là người duy nhất vua cho đặt tay lên mạch mình. Đêm nào điện cũng còn đèn, bà ngồi chép từng phương thuốc vào sổ. Vua mất trước bà ba năm, câu cuối cùng là hỏi bà thang mai đã sắc chưa. Sách thuốc bà viết được chép lại nhiều đời, đề tên thật chứ không đề bậc.',
  },
  e_ba_lang: {
    place: 'lang',
    time: 'ngay',
    cast: ['me'],
    mood: 'vui',
    motif: 'sach',
    story:
      'Mãn hạn xuất cung, {ho} thị mở một gian thuốc nhỏ ở chợ ngoài thành. Người nghèo đến khám thì bà lấy nửa giá, trẻ con thì không lấy. Không ai biết bà từng bắt mạch cho vua, chỉ biết thuốc bà rẻ và hay. Cuốn sổ ghi bệnh dày như viên gạch, sau này học trò bà giữ làm của gia truyền.',
  },
  d_thuoc_sai: {
    place: 'phong',
    time: 'dem',
    cast: [],
    mood: 'so',
    motif: 'chen',
    story:
      'Một nữ y dám kê thuốc cho vua, cả viện thái y không ai vui. Đêm ấy thang thuốc của {ho} thị sắc đủ ba bát còn một, vua uống xong thì trở nặng. Có người thêm vào một vị hay tự bà sai, không ai còn muốn biết. Chén thuốc đổ trên nền gạch, người ta lau sạch trước khi bà bị giải đi.',
  },
  e_nu_quan: {
    place: 'vien',
    time: 'ngay',
    cast: ['me', 'cungnu'],
    moods: { me: 'binh', cungnu: 'so' },
    motif: 'sach',
    story:
      'Từ chùa về cung trong áo nữ quan, tóc chưa kịp dài, {ho} thị nhận giữ sổ hậu cung. Mấy chục năm, bà biết từng cuộn lụa, từng hũ muối trong kho. Vua đổi mấy đời, phi tần thay mấy lượt, chùm chìa khóa vẫn ở thắt lưng bà. Ngày bà mất, người ta tìm mãi mới thấy một chìa không mở được kho nào.',
  },
  e_nu_de: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'con', 'quan'],
    moods: { me: 'dac', quan: 'so' },
    motif: 'rem',
    story:
      'Từ {goc} lên ngồi sau tấm rèm trúc, {ho} thị chưa một ngày ngồi ngai, mà ba đời vua nhỏ đều đọc chiếu theo lời bà. Bà trị nước nghiêm, ít cười, nhớ tên từng quan huyện. Lúc mất, bà dặn đừng ghi công vào bia, chỉ ghi một dòng: người ngồi sau rèm.',
  },
  d_thoai_vi: {
    place: 'dien',
    time: 'dem',
    cast: ['con'],
    mood: 'gian',
    motif: 'chen',
    story:
      'Buông rèm được mười lăm năm, {ho} thị thức dậy giữa đêm vì tiếng giáp sắt quanh điện. Đứa trẻ năm nào bà đặt lên ngai đã thành người, đứng trước rèm xin bà trả ấn. Trên án đã có chén rượu tiễn rót sẵn. Bà trao ấn, uống cạn, và nói một câu mà sử quan không được phép chép.',
  },
  d_tram_ngua: {
    place: 'lang',
    time: 'chieu',
    cast: ['vua'],
    mood: 'buon',
    motif: 'lua',
    story:
      'Ở trạm Ngựa Trắng, lính không chịu đi tiếp nếu sủng phi còn sống. {ho} thị tự bước ra, chỉ xin buộc dải lụa vào cành gạo đầu trạm. Hoàng thượng quay mặt đi khi dải lụa thắt lại. Mùa sau gốc gạo ra hoa đỏ như chưa từng có chuyện gì, người qua đường chẳng ai biết.',
  },
  e_vuot_bien: {
    place: 'bien',
    time: 'chieu',
    cast: ['me'],
    mood: 'binh',
    motif: 'thuyen',
    story:
      'Sáng ấy lính được xem một tấm vải phủ, còn {ho} thị đã ở trên thuyền, tóc cắt ngắn, áo vải nâu. Sử chép bà chết ở trạm Ngựa Trắng. Ở một thương cảng nước Sa Hải, có bà chủ hàng chè nói giọng kinh, khách hỏi gì cũng trả lời ngắn. Chiều chiều bà ra bến nhìn thuyền về phía bắc, rồi đóng cửa hàng sớm.',
  },
  e_hoa_gao: {
    place: 'lang',
    time: 'ngay',
    cast: ['me', 'tuong'],
    mood: 'buon',
    motif: 'hoa',
    story:
      'Bà quỳ trước lính, gọi tên làng từng người, và cả trạm hạ giáo. {ho} thị sống qua trạm Ngựa Trắng, nhưng vua không bao giờ nhìn thẳng vào bà nữa. Không ai gọi bà là sủng phi, bà cũng không tiếc. Mỗi mùa hoa gạo, bà ra đầu trạm thắp hương cho những người lính đã tha mình, hoa rụng đỏ cả vai áo.',
  },
  d_ban_thuoc: {
    place: 'vien',
    time: 'ngay',
    cast: ['con'],
    mood: 'buon',
    motif: 'chen',
    story:
      'Chén thuốc ban ra được đặt trên khay vàng, đứa con quỳ ngoài sân xin mãi không được vào. {ho} thị uống cạn, úp chén xuống khay, nhìn ra sân lần cuối. Đứa con lớn lên thành người, có quyền rồi việc đầu tiên là dựng cho mẹ một ngôi miếu. Miếu có hương có đèn, chỉ không dám ghi tên.',
  },
  e_lac_mai: {
    place: 'vuon',
    time: 'ngay',
    cast: ['me'],
    mood: 'binh',
    motif: 'aonau',
    story:
      'Tên bị xóa khỏi sổ phi tần, {ho} thị dọn về viện Lạc Mai ở góc thành. Bà mặc áo nâu, cuốc đất, trồng rau cải và bí, mùa nào thức nấy. Cung nữ mới vào không biết bà là ai, chỉ thấy rau bà trồng xanh nhất hậu cung. Hai mươi năm sau bà mất, luống cải còn chưa kịp hái.',
  },
  e_me_ruot: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'con'],
    moods: { me: 'buon', con: 'buon' },
    motif: 'mo',
    story:
      'Mấy chục năm, {ho} thị làm "dì" của chính con mình, đứng sau Thái hậu cũ trong mọi buổi lễ. Ngày vua biết sự thật, nó quỳ trước bà gọi một tiếng mẹ. Bà đỡ con dậy, rồi xin đặt bài vị Thái hậu cũ cao hơn bài vị của mình một bậc. Nhang trên hai bàn thờ ấy, năm nào cũng do một tay vua thắp.',
  },
  e_mo_trong: {
    place: 'lang_mo',
    time: 'chieu',
    cast: ['con'],
    mood: 'buon',
    motif: 'mo',
    story:
      '{ho} thị giữ lời đến hơi thở cuối, chưa một lần nói con là con mình. Ba năm sau, vua đọc được giấy tờ cũ, cho mở nắp quan tài. Trong đó, mẹ ôm một góc khăn thêu chữ {ho}, đúng chiếc khăn quấn nó ngày mới sinh. Vua quỳ bên mộ đến tối, không cho ai thắp đèn.',
  },
  e_doi_lai: {
    place: 'dien',
    time: 'chieu',
    cast: ['me', 'con', 'quan'],
    moods: { me: 'dac', con: 'binh', quan: 'so' },
    motif: 'chieu',
    story:
      'Được gọi một tiếng mẹ, {ho} thị đòi lại cả ba mươi năm. Tháng sau, họ Tôn bị đuổi khỏi kinh, bài vị Thái hậu cũ bị dời ra chùa. Sử khen vua hiếu, và chép kỹ từng ngày họ Tôn rời kinh. Bà sống thêm mười năm trong cung chính, đêm nào cũng ngủ ngon.',
  },
  e_nu_su: {
    place: 'phong',
    time: 'dem',
    cast: ['me'],
    mood: 'binh',
    motif: 'sach',
    story:
      'Đêm nào {ho} thị cũng ngồi bên đèn, chép đời từng phi tần vào một cuốn sổ bìa gỗ. Bà chép cả những người chết trẻ, những người không ai nhớ tên, những người bị gạch khỏi sổ. Về sau loạn lạc, cung điện cháy, văn thư mất hết. Cuốn sổ ấy là thứ duy nhất còn lại của cả hậu cung Khánh Vân.',
  },
  e_sua_chieu: {
    place: 'phong',
    time: 'dem',
    cast: ['me'],
    mood: 'dac',
    motif: 'chieu',
    story:
      'Đêm tiên đế băng hà, di chiếu nằm trên án, mực còn ướt. {ho} thị sửa đúng một chữ, rồi cuộn lại, buộc dây như cũ. Sáng ra, phe nắm cấm quân lên ngôi, cả kinh thành không đổ một giọt máu. Cuốn sử bà chép suốt ba mươi năm sau sạch như nước, chỉ thiếu đúng một đêm.',
  },
  d_chieu_cuoi: {
    place: 'dien',
    time: 'dem',
    cast: [],
    mood: 'so',
    motif: 'kiem',
    story:
      'Bà cầm bản thảo đúng từng lời tiên đế, đi qua sân điện giữa đêm. Người thắng đứng chờ trên thềm, không cần đọc lời ấy. Chỉ một nhát kiếm, bản thảo rơi xuống bậc đá. Sáng ra, di chiếu được đọc với một chữ khác, và tên {ho} thị không có trong sử.',
  },
  // ---- origin_quan ----
  e_q_tra_ngoc: {
    place: 'nui',
    time: 'ngay',
    cast: ['me'],
    mood: 'vui',
    motif: 'hoa',
    story:
      'Ra khỏi cung trước khi kịp thành con tin, {ho} thị về phủ cũ trong tiếng xì xào. Cha không nhìn mặt con gái ba năm, bữa nào cũng ăn riêng. Rồi một ngày ông gả bà cho một tri phủ hiền ở miền núi. Mùa xuân, hoa mơ trên đồi rụng trắng sân phủ, và bà thấy mình chưa bao giờ ở gần trời như thế.',
  },
  d_q_tru_di: {
    place: 'vien',
    time: 'ngay',
    cast: [],
    mood: 'buon',
    motif: 'chieu',
    story:
      'Ấn trên bức thư có thể giả, nhưng tờ chiếu tru di thì thật. Một buổi sáng, phủ Thượng thư bị vây, cả nhà ra pháp trường. Tên {ho} thị bị gạch khỏi sổ cùng ngày với tên cha. Vài năm sau phủ cũ thành bãi cỏ, trẻ con chăn trâu không biết nơi ấy từng có người ở.',
  },
  e_q_phuc_vi: {
    place: 'vien',
    time: 'ngay',
    cast: ['me', 'vua'],
    moods: { me: 'binh', vua: 'vui' },
    motif: 'rem',
    story:
      'Bị đẩy ra viện Lạc Mai, {ho} thị qua mấy mùa đông không than, không chăn đủ. Rồi một sáng kiệu tám người đến đón bà về, rèm kiệu thêu phượng. Bà sống đến già trong cung chính, tước vị đủ cả. Có người hỏi về những mùa đông ở góc thành, bà chỉ cuốn rèm lên, bảo hôm nay trời ấm.',
  },
  e_q_ngoai_thich: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'quan', 'con'],
    moods: { me: 'lo', quan: 'dac', con: 'so' },
    motif: 'ngai',
    story:
      'Cha khoác áo tía, rồi khoác áo vàng, ngồi lên chiếc ngai đáng lẽ là của con bà. {ho} thị được tôn làm công chúa nhà mình, còn con trai bị phong vương, đưa ra phủ ngoài. Bà sống đầy đủ, nhưng ít nói. Sử đời sau chép bà là người mẹ đã trao ngai của con cho nhà ngoại.',
  },
  // ---- origin_cung ----
  e_thuong_cung: {
    place: 'vien',
    time: 'ngay',
    cast: ['me', 'cungnu'],
    mood: 'vui',
    motif: 'aonau',
    story:
      'Không lên được giường rồng, {ho} thị lên được ghế cai viện Hoán Y. Bà nhớ mùi nước tro, nhớ từng vết nứt trên tay mình năm mười ba tuổi. Dưới tay bà, không cung nữ nào phải quỳ sân đá, áo gấp nào sai thì bà gấp lại cùng. Tóc bạc trắng, bà vẫn tự tay gấp tấm áo đầu tiên mỗi sáng.',
  },
  e_vo_linh: {
    place: 'lang',
    time: 'ngay',
    cast: ['me', 'con'],
    mood: 'vui',
    motif: 'noi',
    story:
      'Ngày mãn hạn, anh lính canh họ Tạ đứng chờ ở cổng sau với một cái nón mới. {ho} thị theo anh về một làng ven sông, dựng nhà ba gian. Tay bà vẫn nứt nẻ như hồi giặt áo trong cung, nhưng là giặt áo cho con mình. Chiếc nôi tre treo dưới mái hiên đưa qua bốn đứa trẻ.',
  },
  e_mieu_cung_nu: {
    place: 'chua',
    time: 'chieu',
    cast: ['me', 'cungnu'],
    mood: 'binh',
    motif: 'den',
    story:
      'Bà đi từ chậu nước tro lên đến chỗ cao, rồi quay về tìm tên những người cũ. {ho} thị dựng một miếu nhỏ cạnh viện Hoán Y, thờ các cung nữ chết không ai nhận. Đêm rằm nào cũng có người đến thắp đèn, thả hoa đăng trên mương nước. Miếu ấy còn khói hương lâu hơn mọi chiếu chỉ của triều đại.',
  },
  d_ao_chay: {
    place: 'vien',
    time: 'ngay',
    cast: ['cungnu'],
    mood: 'dac',
    motif: 'lua_chay',
    story:
      'Một lỗ cháy bằng đồng xu trên long bào, ngay trước ngày đại lễ. {ho} thị nói ra người cầm bàn là, nhưng lời một cung nga không nặng bằng lời Thượng cung. Án xử trong ba ngày. Người đặt hòn than sống thêm ba mươi năm, và chưa bao giờ phải giặt một tấm áo nào nữa.',
  },
  // ---- origin_chua ----
  e_phuc_quoc: {
    place: 'dien',
    time: 'ngay',
    cast: ['me', 'con'],
    moods: { me: 'dac', con: 'binh' },
    motif: 'co',
    story:
      'Một đêm mở cửa tây, {ho} thị bế con ra trước cờ Hưng. Trời sáng, lá cờ cũ bay trên điện chầu, quốc hiệu đổi lại, và con bà mang họ ông ngoại. Bà sống đến già trong cung của triều mình. Sử triều sau chép bà là người phục quốc, sử triều trước chép bà là con dâu phản phúc.',
  },
  e_hai_dong: {
    place: 'chua',
    time: 'ngay',
    cast: ['me', 'con'],
    mood: 'binh',
    motif: 'mo',
    story:
      '{ho} thị xin vua dựng miếu thờ vua Hưng cạnh miếu tổ, hai miếu chung một sân. Ngày giỗ, con cháu hai họ lạy cùng một chiếu, nghe bà kể chuyện cả hai bên. Mối thù ba đời tắt đi trong khói hương, không cần thêm một lưỡi đao nào. Lúc bà mất, người ta không biết đặt bài vị bà về miếu nào, nên đặt ở giữa sân.',
  },
  e_chua_xa: {
    place: 'chua',
    time: 'chieu',
    cast: ['me'],
    mood: 'buon',
    motif: 'chuong',
    story:
      'Rời cung, {ho} thị xuống tóc ở chùa Lũng Vân, nơi cha bà mất. Bà giữ hương cho một triều đã tắt, chiều nào cũng thỉnh chuông trước bài vị cha. Thỉnh thoảng có người núi Thạch Lĩnh ghé qua, để lại một bó củi rồi đi, không nói câu nào. Bà biết họ là ai, và không bao giờ hỏi tên.',
  },
  d_mat_thu: {
    place: 'phong',
    time: 'dem',
    cast: [],
    mood: 'so',
    motif: 'sach',
    story:
      'Một dòng chữ khâu trong ruột gối, gửi ra ngoài cung cho tàn quân. Một đêm cửa viện bị đạp tung, gối bị xé, lá thư nằm trên tay Thái hậu. {ho} thị nhận hết tội, xin tha cho nhũ mẫu. Mộ bà không ghi tên, chỉ khắc một con chim lạc mà người ngoài không hiểu nghĩa.',
  },
  // ---- origin_dan ----
  e_dan_thuyen: {
    place: 'bien',
    time: 'dem',
    cast: ['me'],
    mood: 'vui',
    motif: 'trang',
    story:
      'Đêm vua băng hà, thuyền rời bến lúc trống canh tư dưới một vầng trăng lớn, {ho} thị không ngoái lại. Sổ cung ghi một phi tần chết đuối. Ở một làng chè xa kinh, có đôi vợ chồng già hái chè đến cuối đời. Người vợ hát rất hay, nhưng không ai trong làng biết bà từng là ai.',
  },
  d_dan_ben: {
    place: 'bien',
    time: 'dem',
    cast: [],
    mood: 'so',
    motif: 'thuyen',
    story:
      'Bến sông canh tư đã có đuốc chờ sẵn, chiếc thuyền con buộc ở cọc không kịp tháo dây. Cấm quân giải hai người về kinh ngay trong đêm. {ho} thị và người ấy bị xử chung một ngày, tội tư thông. Năm ấy, mẹ ở Mai Đông đốt hết chè trong nhà, khói bay cả một sườn đồi.',
  },
  // ---- feud ----
  d_fd_lanh_cung: {
    place: 'vien',
    time: 'dem',
    cast: [],
    mood: 'buon',
    motif: 'trang',
    story:
      'Bị giam vào lãnh cung vì tội vu cáo trung cung, {ho} thị qua những đêm trăng lạnh như nước. Than không về, chăn không về, cửa chỉ mở để đưa một bát cơm nguội. Bà lấy móng tay khắc ngày lên vách, đến vạch thứ chín mươi thì dừng. Tháng Chạp người ta mở cửa, thì đã muộn.',
  },
  d_fd_ngo_mon: {
    place: 'dien',
    time: 'ngay',
    cast: ['quan'],
    mood: 'buon',
    motif: 'chieu',
    story:
      'Trăm quan quỳ ngoài cửa Ngọ ba ngày, dâng sớ xin tha cho {ho} thị. Ngày thứ tư, cửa mở, nhưng người bước ra cầm chiếu ban chết. Chiếu được đọc to trước mặt họ, từng chữ một. Quan Thái phó gục đầu xuống đá, tờ sớ cuối cùng còn nắm trong tay.',
  },
  d_fd_kieu_binh: {
    place: 'vien',
    time: 'dem',
    cast: ['tuong'],
    mood: 'gian',
    motif: 'lua_chay',
    story:
      'Kiêu binh tràn qua cổng viện, đuốc ném lên mái, lửa sáng cả cửa Tây. Quân giữ thành đứng ngoài hào, không ai có lệnh, tướng Lê Trực đến thì đã muộn. {ho} thị ngồi lại trong viện, không chạy. Sáng ra chỉ còn tường gạch đen và một chiếc trâm nằm giữa tro.',
  },
};
