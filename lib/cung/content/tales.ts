/**
 * Lời kể: trang kể chuyện hiện trước một sự kiện lớn, như người dẫn truyện lật sang hồi mới.
 * Nói cái người chơi chưa biết (lệ cung, chuyện cũ, ai đang tính gì), để sự kiện có bối cảnh.
 * Mỗi lời kể 3-4 câu, giọng kể chuyện, xưng "bạn". Chỉ hiện một lần mỗi đời.
 */
export interface Tale {
  t: string;
  lines: string[];
}

export const TALES: Record<string, Tale> = {
  // ---- mở đầu ----
  op_cong: {
    t: 'Phượng Thành',
    lines: [
      'Phượng Thành có chín lớp cửa. Người thường đi cửa Ngọ, quan đi cửa Đông, còn con gái được tuyển vào hậu cung thì đi cửa Tây, cánh cửa chỉ mở một nửa.',
      'Người trong cung bảo đó là lệ cũ: cửa Tây mở một cánh, để người vào biết mình chưa phải là ai.',
      'Khóa tuyển năm ấy có hai mươi bảy người. Ba mươi năm sau, chỉ một người còn ngồi được ở chỗ cao nhất.',
    ],
  },
  b1_tra: {
    t: 'Lệ chén trà',
    lines: [
      'Hậu cung có một lệ không ai ghi vào sổ: người mới vào, đêm đầu sẽ có một chén trà.',
      'Chén trà ấy có khi là lời chào, có khi là lời thử, có khi là lời từ biệt. Uống hay không, uống thế nào, cả hậu cung sẽ biết trước sáng mai.',
      'Năm trước, một tú nữ họ Đỗ uống cạn chén trà đầu tiên. Ba tháng sau nàng câm, được cho về quê.',
    ],
  },
  b1_hoi: {
    t: 'Rằm tháng Bảy',
    lines: [
      'Rằm tháng Bảy, Hoàng thượng ra hồ sen thả đèn cầu cho người đã khuất. Đó là đêm duy nhất trong năm người mới được đứng gần ngài.',
      'Các phi tần cũ biết vậy, nên đêm ấy họ cũng có mặt đông đủ, áo đẹp hơn cả ngày Tết.',
      'Có người nói Hoàng thượng chỉ nhìn đèn, không nhìn người. Nhưng năm nay, ngài dừng lại.',
    ],
  },
  // ---- chương hai ----
  b2_den: {
    t: 'Ngọn đèn đỏ',
    lines: [
      'Mỗi tối, thái giám phòng Kính Sự bưng khay thẻ bài vào điện. Hoàng thượng lật thẻ nào, đèn đỏ treo trước cửa viện ấy.',
      'Đèn treo một đêm thì cả hậu cung bàn tán ba ngày. Treo ba đêm thì có người bắt đầu đếm.',
      'Từ ngày vào cung, đây là lần đầu chiếc đèn ấy dừng trước cửa bạn.',
    ],
  },
  b2_quen: {
    t: 'Những người không được gọi',
    lines: [
      'Hậu cung có hơn ba trăm người, mà một năm chỉ có ba trăm sáu mươi đêm.',
      'Người không được gọi thì già đi trong viện mình, thêu những tấm khăn không ai dùng, đợi những đêm không bao giờ đến.',
      'Năm ấy trời hạn. Triều đình bàn chuyện cho bớt cung nữ về quê cho đỡ tốn gạo, và cũng cho đỡ oán khí.',
    ],
  },
  b2_vu: {
    t: 'Chiếc trâm và cái hộp',
    lines: [
      'Trong cung, muốn hại một người không cần thuốc độc. Chỉ cần một món đồ nằm sai chỗ.',
      'Đồ ngự ban đều có sổ. Mất một chiếc trâm là chuyện lớn, tìm thấy nó trong hộp người khác là chuyện chết người.',
      'Sáng nay Thục phi báo mất trâm phượng. Đến trưa, người của bà đã đứng ở cửa cung Thái hậu.',
    ],
  },
  b2_sung: {
    t: 'Cuốn sổ của phòng Kính Sự',
    lines: [
      'Phòng Kính Sự ghi từng đêm Hoàng thượng ngủ ở đâu. Cuốn sổ ấy là bằng chứng khi ai có thai, và là vũ khí khi ai bị nghi.',
      'Người giữ sổ không có quyền gì, nhưng ai cũng phải nể. Một dòng viết thêm, một dòng bỏ đi, là đổi được số phận một người.',
      'Tháng này, tên bạn xuất hiện trong sổ nhiều hơn ai hết. Có người đã để ý.',
    ],
  },
  // ---- chương ba ----
  b3_thai: {
    t: 'Tin vui trong cung',
    lines: [
      'Trong cung, có con là có chỗ đứng. Người có con trai thì được lên bậc, được thêm người hầu, và được thêm kẻ thù.',
      'Mười năm qua, hậu cung chỉ có một hoàng tử sống qua tuổi lên ba: Nghĩa, con Thục phi.',
      'Tin bạn có thai lan đi trong một buổi sáng. Đến chiều, đã có người bưng thuốc sang.',
    ],
  },
  b3_sinh: {
    t: 'Cửa sinh, cửa tử',
    lines: [
      'Người xưa nói đàn bà đi đẻ là một chân trong quan tài. Trong cung, quan tài ấy còn có người đóng đinh sẵn.',
      'Bà đỡ, thái y, người nấu nước, người giữ cửa, ai cũng có thể là người của ai đó.',
      'Đêm ấy mưa to, đường từ viện bạn sang Thái y viện ngập đến đầu gối.',
    ],
  },
  b3_mat: {
    t: 'Sau mất mát',
    lines: [
      'Trong cung, mất một đứa con không ai để tang. Người ta chỉ nói thai yếu, trời không cho, rồi thôi.',
      'Nhưng người mất con thì nhớ. Nhớ ai bưng thuốc sang, nhớ ai đứng ngoài cửa, nhớ ai cười trong yến tối hôm ấy.',
      'Hạnh đã giữ lại một thứ mà lẽ ra phải được đổ đi.',
    ],
  },
  // ---- chương bốn ----
  b4_lap: {
    t: 'Chiếc ghế ở Đông cung',
    lines: [
      'Theo lệ, con trưởng được lập làm Đông cung. Nhưng lệ là do người viết, và người viết thì có thể viết lại.',
      'Nhà Thục phi có ba người làm quan trong triều. Nhà bạn thì không có ai.',
      'Hoàng thượng ho nhiều hơn mỗi mùa đông. Triều đình biết thời gian không còn nhiều, nên ai cũng muốn chọn phe trước.',
    ],
  },
  b4_khong: {
    t: 'Người đàn bà không con trai',
    lines: [
      'Trong cung, người không có con trai thì sống nhờ ân sủng. Ân sủng thì như nước, đổ vào đâu là chảy đi đó.',
      'Khi vua băng, phi tần không con sẽ lên chùa hoặc về lãnh cung. Ai cũng biết, mà không ai nói ra.',
      'Hoàng hậu cũng không có con. Lần đầu tiên, bà nhìn bạn như nhìn một người cùng thuyền.',
    ],
  },
  b4_bien: {
    t: 'Tin dữ từ biên ải',
    lines: [
      'Biên giới phía bắc yên được mười năm. Mùa thu năm ấy, giặc tràn qua ba đồn trong một đêm.',
      'Kho Thái thương nằm trong tay người của Thái phó Tôn. Lương ra biên chậm nửa tháng thì lính đói, chậm một tháng thì lính bỏ đồn.',
      'Tướng Lê Trực về kinh xin lương, đứng ngoài cửa triều ba ngày không ai tiếp. Ngày thứ tư, ông tìm đến hậu cung.',
    ],
  },
  // ---- chương năm ----
  b5_bang: {
    t: 'Mặt trời lặn',
    lines: [
      'Mùa đông năm ấy, Hoàng thượng không ra khỏi tẩm điện. Thái y đổi ba lần, thuốc đổi bảy thang.',
      'Ngoài cửa tẩm điện, người đứng chờ mỗi ngày một đông. Ai cũng hỏi thăm sức khỏe ngài, mà ai cũng đang nghĩ đến chuyện sau.',
      'Canh ba đêm ấy, chuông ở điện Kính Thiên đánh chín tiếng.',
    ],
  },
  b5_sung: {
    t: 'Lời trăn trối',
    lines: [
      'Lời vua lúc lâm chung nặng hơn mọi tờ chiếu. Nhưng lời ấy có thành chiếu được hay không, còn tùy ai đứng bên giường.',
      'Thái phó Tôn giữ ấn, Thục phi giữ con trưởng, Hoàng hậu giữ lễ. Còn bạn chỉ giữ được bàn tay đang lạnh dần của ngài.',
      'Ngoài cửa, có người đang nghe từng chữ.',
    ],
  },
  b5_bang2: {
    t: 'Ngai vàng đổi chủ',
    lines: [
      'Vua mới lên ngôi thì hậu cung cũ phải dọn chỗ. Người có công được ở lại, người có thù thì chờ ngày xét.',
      'Thục phi đợi ngày này hai mươi năm. Bà đã đếm từng người từng làm bà mất mặt.',
      'Tên bạn nằm ở gần đầu danh sách ấy.',
    ],
  },
  // ---- chương sáu ----
  b6_tau: {
    t: 'Năm hạn',
    lines: [
      'Ba năm liền mất mùa ở phía nam. Dân bán ruộng, rồi bán con, rồi bỏ làng đi.',
      'Kho Thái thương nói còn đủ gạo. Sổ của tướng Lê Trực nói kho hụt ba vạn thạch. Hai cuốn sổ, chỉ một cuốn là thật.',
      'Tấu chương đặt trước rèm. Lần này, người phải đặt bút là bạn.',
    ],
  },
  b6_phan: {
    t: 'Đêm dài nhất',
    lines: [
      'Hoàng tử Nghĩa chưa bao giờ quên chiếc ghế ở Đông cung từng suýt là của mình. Thục phi vẫn gửi thư cho con mỗi tháng.',
      'Những năm ấy, Nghĩa học cách cầm quân, và học thuộc tên những ai trong cấm quân từng nhận ơn mẹ mình.',
      'Đêm nay, cửa Tây không đóng.',
    ],
  },
  // ---- chương bảy ----
  b7_cuoi: {
    t: 'Ba mươi năm',
    lines: [
      'Ba mươi năm trước, bạn đi qua cửa Tây với một cái tay nải. Ba mươi năm sau, nhiều cánh cửa trong cung đã mở theo lời bạn.',
      'Người cũ lần lượt đi. Có người bạn đã tiễn bằng nước mắt, có người bạn đã tiễn bằng một tờ chiếu.',
      'Chỉ còn Hạnh. Chiều nay, hai người ra ngồi bên hồ sen cũ.',
    ],
  },
};
