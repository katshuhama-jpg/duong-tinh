/**
 * Lời kể: trang kể chuyện hiện trước một sự kiện lớn, như người dẫn truyện lật sang hồi mới.
 * Nói cái người chơi chưa biết (lệ cung, chuyện cũ, ai đang tính gì), để sự kiện có bối cảnh.
 * Mỗi lời kể 3-4 câu, giọng kể chuyện, xưng "bạn". Chỉ hiện một lần mỗi đời.
 */
import type { CastK, TimeK } from '../types';
export interface Tale {
  t: string;
  lines: string[];
  /** cảnh riêng của lời kể: nền (thư mục /bg), giờ, người trong tranh, mưa */
  s?: { bg: string; time: TimeK; cast: CastK[]; rain?: boolean };
}

export const TALES: Record<string, Tale> = {
  // ---- mở đầu ----
  op_cong: {
    s: { bg: 'cong', time: 'ngay', cast: [] },
    t: 'Phượng Thành',
    lines: [
      'Phượng Thành có chín lớp cửa. Người thường đi cửa Ngọ, quan đi cửa Đông, còn con gái được tuyển vào hậu cung thì đi cửa Tây, cánh cửa chỉ mở một nửa.',
      'Người trong cung bảo đó là lệ cũ: cửa Tây mở một cánh, để người vào biết mình chưa phải là ai.',
      'Khóa tuyển năm ấy có hai mươi bảy người. Ba mươi năm sau, chỉ một người còn ngồi được ở chỗ cao nhất.',
    ],
  },
  b1_tra: {
    s: { bg: 'phong', time: 'dem', cast: ['mama'] },
    t: 'Lệ chén trà',
    lines: [
      'Hậu cung có một lệ không ai ghi vào sổ: người mới vào, đêm đầu sẽ có một chén trà.',
      'Chén trà ấy có khi là lời chào, có khi là lời thử, có khi là lời từ biệt. Uống hay không, uống thế nào, cả hậu cung sẽ biết trước sáng mai.',
      'Năm trước, một tú nữ họ Đỗ uống cạn chén trà đầu tiên. Ba tháng sau nàng câm, được cho về quê.',
    ],
  },
  b1_hoi: {
    s: { bg: 'vuon', time: 'dem', cast: ['vua'] },
    t: 'Rằm tháng Bảy',
    lines: [
      'Rằm tháng Bảy, Hoàng thượng ra hồ sen thả đèn cầu cho người đã khuất. Đó là đêm duy nhất trong năm người mới được đứng gần ngài.',
      'Các phi tần cũ biết vậy, nên đêm ấy họ cũng có mặt đông đủ, áo đẹp hơn cả ngày Tết.',
      'Có người nói Hoàng thượng chỉ nhìn đèn, không nhìn người. Nhưng năm nay, ngài dừng lại.',
    ],
  },
  // ---- chương hai ----
  b2_den: {
    s: { bg: 'hanh', time: 'dem', cast: ['phuc'] },
    t: 'Ngọn đèn đỏ',
    lines: [
      'Mỗi tối, thái giám phòng Kính Sự bưng khay thẻ bài vào điện. Hoàng thượng lật thẻ nào, đèn đỏ treo trước cửa viện ấy.',
      'Đèn treo một đêm thì cả hậu cung bàn tán ba ngày. Treo ba đêm thì có người bắt đầu đếm.',
      'Từ ngày vào cung, đây là lần đầu chiếc đèn ấy dừng trước cửa bạn.',
    ],
  },
  b2_quen: {
    s: { bg: 'phong', time: 'chieu', cast: ['cungnu'] },
    t: 'Những người không được gọi',
    lines: [
      'Hậu cung có hơn ba trăm người, mà một năm chỉ có ba trăm sáu mươi đêm.',
      'Người không được gọi thì già đi trong viện mình, thêu những tấm khăn không ai dùng, đợi những đêm không bao giờ đến.',
      'Năm ấy trời hạn. Triều đình bàn chuyện cho bớt cung nữ về quê cho đỡ tốn gạo, và cũng cho đỡ oán khí.',
    ],
  },
  b2_vu: {
    s: { bg: 'dien', time: 'ngay', cast: ['thucphi'] },
    t: 'Chiếc trâm và cái hộp',
    lines: [
      'Trong cung, muốn hại một người không cần thuốc độc. Chỉ cần một món đồ nằm sai chỗ.',
      'Đồ ngự ban đều có sổ. Mất một chiếc trâm là chuyện lớn, tìm thấy nó trong hộp người khác là chuyện chết người.',
      'Sáng nay Thục phi báo mất trâm phượng. Đến trưa, người của bà đã đứng ở cửa cung Thái hậu.',
    ],
  },
  b2_sung: {
    s: { bg: 'thu', time: 'dem', cast: ['phuc'] },
    t: 'Cuốn sổ của phòng Kính Sự',
    lines: [
      'Phòng Kính Sự ghi từng đêm Hoàng thượng ngủ ở đâu. Cuốn sổ ấy là bằng chứng khi ai có thai, và là vũ khí khi ai bị nghi.',
      'Người giữ sổ không có quyền gì, nhưng ai cũng phải nể. Một dòng viết thêm, một dòng bỏ đi, là đổi được số phận một người.',
      'Tháng này, tên bạn xuất hiện trong sổ nhiều hơn ai hết. Có người đã để ý.',
    ],
  },
  // ---- chương ba ----
  b3_thai: {
    s: { bg: 'phong', time: 'ngay', cast: ['xuanlan'] },
    t: 'Tin vui trong cung',
    lines: [
      'Trong cung, có con là có chỗ đứng. Người có con trai thì được lên bậc, được thêm người hầu, và được thêm kẻ thù.',
      'Mười năm qua, hậu cung chỉ có một hoàng tử sống qua tuổi lên ba: Nghĩa, con Thục phi.',
      'Tin bạn có thai lan đi trong một buổi sáng. Đến chiều, đã có người bưng thuốc sang.',
    ],
  },
  b3_sinh: {
    s: { bg: 'vien', time: 'dem', cast: ['hanh'], rain: true },
    t: 'Cửa sinh, cửa tử',
    lines: [
      'Người xưa nói đàn bà đi đẻ là một chân trong quan tài. Trong cung, quan tài ấy còn có người đóng đinh sẵn.',
      'Bà đỡ, thái y, người nấu nước, người giữ cửa, ai cũng có thể là người của ai đó.',
      'Đêm ấy mưa to, đường từ viện bạn sang Thái y viện ngập đến đầu gối.',
    ],
  },
  b3_mat: {
    s: { bg: 'phong', time: 'dem', cast: ['hanh'] },
    t: 'Sau mất mát',
    lines: [
      'Trong cung, mất một đứa con không ai để tang. Người ta chỉ nói thai yếu, trời không cho, rồi thôi.',
      'Nhưng người mất con thì nhớ. Nhớ ai bưng thuốc sang, nhớ ai đứng ngoài cửa, nhớ ai cười trong yến tối hôm ấy.',
      'Hạnh đã giữ lại một thứ mà lẽ ra phải được đổ đi.',
    ],
  },
  // ---- chương bốn ----
  b4_lap: {
    s: { bg: 'trieu', time: 'ngay', cast: ['quan'] },
    t: 'Chiếc ghế ở Đông cung',
    lines: [
      'Theo lệ, con trưởng được lập làm Đông cung. Nhưng lệ là do người viết, và người viết thì có thể viết lại.',
      'Nhà Thục phi có ba người làm quan trong triều. Nhà bạn thì không có ai.',
      'Hoàng thượng ho nhiều hơn mỗi mùa đông. Triều đình biết thời gian không còn nhiều, nên ai cũng muốn chọn phe trước.',
    ],
  },
  b4_khong: {
    s: { bg: 'dien', time: 'chieu', cast: ['hoanghau'] },
    t: 'Người đàn bà không con trai',
    lines: [
      'Trong cung, người không có con trai thì sống nhờ ân sủng. Ân sủng thì như nước, đổ vào đâu là chảy đi đó.',
      'Khi vua băng hà, phi tần không con sẽ lên chùa hoặc về lãnh cung. Ai cũng biết, mà không ai nói ra.',
      'Hoàng hậu cũng không có con. Lần đầu tiên, bà nhìn bạn như nhìn một người cùng thuyền.',
    ],
  },
  b4_bien: {
    s: { bg: 'bienai', time: 'ngay', cast: ['tuong'] },
    t: 'Tin dữ từ biên ải',
    lines: [
      'Biên giới phía bắc yên được mười năm. Mùa thu năm ấy, giặc tràn qua ba đồn trong một đêm.',
      'Kho Thái thương nằm trong tay người của Thái phó Tôn. Lương ra biên chậm nửa tháng thì lính đói, chậm một tháng thì lính bỏ đồn.',
      'Tướng Lê Trực về kinh xin lương, đứng ngoài cửa triều ba ngày không ai tiếp. Ngày thứ tư, ông tìm đến hậu cung.',
    ],
  },
  // ---- chương năm ----
  b5_bang: {
    s: { bg: 'tam', time: 'dem', cast: ['vua'] },
    t: 'Mặt trời lặn',
    lines: [
      'Mùa đông năm ấy, Hoàng thượng không ra khỏi tẩm điện. Thái y đổi ba lần, thuốc đổi bảy thang.',
      'Ngoài cửa tẩm điện, người đứng chờ mỗi ngày một đông. Ai cũng hỏi thăm sức khỏe ngài, mà ai cũng đang nghĩ đến chuyện sau.',
      'Canh ba đêm ấy, chuông ở điện Kính Thiên đánh chín tiếng.',
    ],
  },
  b5_sung: {
    s: { bg: 'tam', time: 'dem', cast: ['vua', 'thucphi'] },
    t: 'Lời trăn trối',
    lines: [
      'Lời vua lúc lâm chung nặng hơn mọi tờ chiếu. Nhưng lời ấy có thành chiếu được hay không, còn tùy ai đứng bên giường.',
      'Thái phó Tôn giữ ấn, Thục phi giữ con trưởng, Hoàng hậu giữ lễ. Còn bạn chỉ giữ được bàn tay đang lạnh dần của ngài.',
      'Ngoài cửa, có người đang nghe từng chữ.',
    ],
  },
  b5_bang2: {
    s: { bg: 'trieu', time: 'chieu', cast: ['thucphi'] },
    t: 'Ngai vàng đổi chủ',
    lines: [
      'Vua mới lên ngôi thì hậu cung cũ phải dọn chỗ. Người có công được ở lại, người có thù thì chờ ngày xét.',
      'Thục phi đợi ngày này hai mươi năm. Bà đã đếm từng người từng làm bà mất mặt.',
      'Tên bạn nằm ở gần đầu danh sách ấy.',
    ],
  },
  // ---- chương sáu ----
  b6_tau: {
    s: { bg: 'donghan', time: 'ngay', cast: [] },
    t: 'Năm hạn',
    lines: [
      'Ba năm liền mất mùa ở phía nam. Dân bán ruộng, rồi bán con, rồi bỏ làng đi.',
      'Kho Thái thương nói còn đủ gạo. Sổ của tướng Lê Trực nói kho hụt ba vạn thạch. Hai cuốn sổ, chỉ một cuốn là thật.',
      'Tấu chương đặt trước rèm. Lần này, người phải đặt bút là bạn.',
    ],
  },
  b6_phan: {
    s: { bg: 'cong', time: 'dem', cast: ['nghia'] },
    t: 'Đêm dài nhất',
    lines: [
      'Hoàng tử Nghĩa chưa bao giờ quên chiếc ghế ở Đông cung từng suýt là của mình. Thục phi vẫn gửi thư cho con mỗi tháng.',
      'Những năm ấy, Nghĩa học cách cầm quân, và học thuộc tên những ai trong cấm quân từng nhận ơn mẹ mình.',
      'Đêm nay, cửa Tây không đóng.',
    ],
  },
  // ---- chương bảy ----
  b7_cuoi: {
    s: { bg: 'vuon', time: 'chieu', cast: ['hanh'] },
    t: 'Ba mươi năm',
    lines: [
      'Ba mươi năm trước, bạn đi qua cửa Tây với một cái tay nải. Ba mươi năm sau, nhiều cánh cửa trong cung đã mở theo lời bạn.',
      'Người cũ lần lượt đi. Có người bạn đã tiễn bằng nước mắt, có người bạn đã tiễn bằng một tờ chiếu.',
      'Chỉ còn Hạnh. Chiều nay, hai người ra ngồi bên hồ sen cũ.',
    ],
  },

  // ===== chương một, hai: những trò đầu tiên =====
  ca_gieng: {
    s: { bg: 'gieng', time: 'ngay', cast: [] },
    t: 'Cái giếng sau viện',
    lines: [
      'Viện Nghi Lễ có một cái giếng sau bếp, nước trong mà không ai múc. Cung nữ cũ bảo mười năm nay nó đã vớt lên bốn người.',
      'Người nào cũng được ghi là tự trầm vì nhớ nhà. Không ai hỏi vì sao người nhớ nhà lại để hài ngay ngắn trên bờ.',
      'Sáng nay giếng lại có người. Là cô gái nằm giường bên bạn.',
    ],
  },
  ca_tram: {
    s: { bg: 'vien', time: 'ngay', cast: ['xuanlan'] },
    t: 'Lệnh bài của chủ',
    lines: [
      'Cung nữ cầm lệnh bài của chủ thì được vào bất cứ viện nào dưới bậc chủ mình. Thục phi đứng thứ hai hậu cung, nghĩa là được vào gần như mọi nơi.',
      'Lục viện người khác là chuyện xấu hổ. Lục ra đồ thì là chuyện chết người. Lục không ra thì người lục cũng chẳng mất gì.',
      'Thục phi biết vậy. Bà chưa bao giờ thua một ván lục viện.',
    ],
  },
  ca_thu: {
    s: { bg: 'dien', time: 'ngay', cast: ['hoanghau'] },
    t: 'Thư nhà',
    lines: [
      'Thư người mới gửi ra ngoài phải qua viện Nghi Lễ, rồi qua cung Hoàng hậu. Ai cũng biết, mà ai cũng quên khi nhớ nhà.',
      'Hoàng hậu không cần đọc hết. Bà chỉ cần một câu than thở là đủ biết người ấy mềm hay cứng.',
      'Lá thư bạn gửi tháng trước đã không đi đến làng.',
    ],
  },
  ca_khoc: {
    s: { bg: 'vuon', time: 'ngay', cast: ['thucphi'] },
    t: 'Nước mắt của Thục phi',
    lines: [
      'Thục phi vào cung mười hai năm, chưa thua một trận nào bằng lý lẽ. Bà thắng bằng nước mắt.',
      'Bà khóc trước Thái hậu thì Thái hậu mềm lòng, khóc trước Hoàng thượng thì người kia có tội. Người bị khóc chưa kịp mở miệng đã thua nửa phần.',
      'Hôm qua ở cầu đá, bạn đã đi trước bà một bước.',
    ],
  },
  ca_ao: {
    s: { bg: 'phong', time: 'ngay', cast: ['hanh'] },
    t: 'Áo lễ',
    lines: [
      'Áo lễ ngự ban là áo của vua, không phải của người mặc. Làm hỏng áo ngự ban là bất kính, tội nhẹ thì giáng bậc, tội nặng thì ra lãnh cung.',
      'Áo được cất trong rương có khóa, chìa khóa chỉ người hầu thân cận giữ. Muốn rạch được nó, phải có người ở rất gần.',
      'Còn nửa canh giờ nữa là đánh trống chầu.',
    ],
  },
  rc_ninh_ra: {
    s: { bg: 'phong', time: 'dem', cast: ['ninh'] },
    t: 'Chị em một chiếu',
    lines: [
      'Hai người vào cung cùng một khóa thì thường thành chị em, vì chẳng còn ai khác để thương.',
      'Nhưng một khóa tuyển chỉ có vài người được gọi. Ngủ chung chiếu với nhau, ai cũng biết người kia sợ gì, thèm gì, giấu gì.',
      'Ninh biết bạn rõ hơn ai hết. Và bạn cũng vừa biết rõ Ninh.',
    ],
  },
  ft_ph_hanh: {
    s: { bg: 'gieng', time: 'chieu', cast: ['xuanlan', 'hanh'] },
    t: 'Người hầu thân',
    lines: [
      'Trong cung, muốn hại chủ thì mua người hầu. Người hầu ăn lương ít, nhà nghèo, lại đứng gần chủ hơn ai hết.',
      'Xuân Lan làm việc này đã nhiều năm. Nàng không mua bằng một lần, mà bằng từng gói bạc nhỏ, đến khi người kia không còn đường lui.',
      'Phúc nói hắn đã thấy hai lần. Hạnh chưa từng kể với bạn lần nào.',
    ],
  },
  ft_ph_gai: {
    s: { bg: 'dien', time: 'ngay', cast: ['thucphi'] },
    t: 'Đứa con trưởng',
    lines: [
      'Hoàng tử Nghĩa là con trai lớn nhất của Hoàng thượng. Thục phi giữ con như giữ ấn, ai lại gần cũng bị nhìn bằng nửa con mắt.',
      'Nhưng giữ con cũng là dùng con. Mỗi lần Nghĩa ốm, lại có một người trong hậu cung gặp họa.',
      'Đĩa bánh viện bạn biếu hôm qua, đến sáng nay đã thành chứng cứ.',
    ],
  },
  ft_xl_bay: {
    s: { bg: 'hanh', time: 'chieu', cast: ['xuanlan'] },
    t: 'Bàn tay của Thục phi',
    lines: [
      'Thục phi chưa bao giờ tự tay làm điều gì. Tay bà sạch, vì đã có Xuân Lan.',
      'Xuân Lan theo hầu từ năm mười tám tuổi, biết hết những gì chủ làm, và cũng đã làm hết những việc ấy.',
      'Muốn Thục phi ngã, trước hết phải làm cho bà mất bàn tay ấy.',
    ],
  },
  ft_xl_thuoc: {
    s: { bg: 'bep', time: 'dem', cast: ['xuanlan'] },
    t: 'Ấm thuốc bổ',
    lines: [
      'Thuốc bổ của phi tần sắc ngay trong bếp viện, mỗi ngày hai lần, ai cũng ra vào được.',
      'Người muốn hại không cần thuốc độc mạnh. Chỉ cần mỗi ngày một ít, nửa năm sau người uống sẽ yếu đi như bệnh thật.',
      'Canh tư đêm nay, Hạnh không ngủ được, nên ra bếp xem lửa.',
    ],
  },
  fh_cat: {
    s: { bg: 'hanh', time: 'ngay', cast: ['tao'] },
    t: 'Tào công công',
    lines: [
      'Tào công công vào cung năm chín tuổi, hầu Hoàng hậu từ ngày bà còn là thái tử phi. Ông không biết chữ nhiều, nhưng nhớ mặt từng người.',
      'Cuốn sổ bìa lam của ông ghi ai đến viện nào, ai tặng gì cho ai, ai khóc ở đâu. Hoàng hậu không cần ra khỏi cung vẫn biết hết.',
      'Chừng nào ông còn đó, mọi tin bạn gửi đi đều qua tay ông trước.',
    ],
  },
  fp_ninh_lat: {
    s: { bg: 'vuon', time: 'chieu', cast: ['hienphi', 'ninh'] },
    t: 'Người dạy Ninh',
    lines: [
      'Hiền phi không có con, không tranh sủng, ai gặp cũng khen hiền. Bà chỉ có một thú vui: dạy dỗ người mới.',
      'Những người được Hiền phi dạy thường lên rất nhanh, rồi ngã rất đau. Khi họ ngã, Hiền phi luôn là người đầu tiên đến an ủi.',
      'Ninh là học trò mới nhất của bà.',
    ],
  },
  rc_ut_ra: {
    s: { bg: 'vuon', time: 'dem', cast: ['uyentan'] },
    t: 'Người từ giáo phường',
    lines: [
      'Uyển tần vào cung không qua tuyển tú. Hoàng thượng xem nàng múa trong một yến tiệc, đêm ấy cho xe đón thẳng vào.',
      'Cả hậu cung khinh nàng xuất thân giáo phường, mà cũng sợ nàng: người không có gì để mất thì dám làm mọi thứ.',
      'Ai cũng nói đêm yến nay, nàng sẽ được phong phi.',
    ],
  },
  // ===== chương ba, bốn: những cuộc chiến dài =====
  ca_huong: {
    s: { bg: 'phong', time: 'ngay', cast: ['thucphi'] },
    t: 'Quà của Thục phi',
    lines: [
      'Thục phi chưa bao giờ tặng ai thứ gì mà không có lý do. Quà của bà càng đẹp, người nhận càng nên sợ.',
      'Trong cung có những mùi hương làm người ta ngủ ngon, và có những mùi hương làm thai không giữ được.',
      'Chiếc gối thêu trăm con thơm ngát cả phòng.',
    ],
  },
  ra_tp_ra: {
    s: { bg: 'thu', time: 'dem', cast: ['phuc'] },
    t: 'Ngày ra tay',
    lines: [
      'Trong cung, chứng cứ không làm ai ngã. Người ta ngã khi chứng cứ đến đúng tai, vào đúng lúc.',
      'Thục phi có Hoàng tử Nghĩa, có nhà ngoại trong triều, có hai mươi năm ân sủng. Đánh trượt một lần, người ngã sẽ là bạn.',
      'Đêm nay, Phúc trải hết những gì đã gom được lên bàn.',
    ],
  },
  ra_hh_ra: {
    s: { bg: 'dien', time: 'ngay', cast: ['hoanghau'] },
    t: 'Mẫu nghi thiên hạ',
    lines: [
      'Hoàng hậu không con, không sủng, nhưng có lễ. Bà là mẫu nghi thiên hạ, tên ghi trong tông phả, cả triều đình phải lạy.',
      'Phế một Hoàng hậu thì phải có tội thật lớn, và phải có người dám tâu. Một trăm năm qua, chỉ có hai lần.',
      'Bà còn ngồi ở cung Ngọc Khuê ngày nào, ngôi hậu không bao giờ là của bạn.',
    ],
  },
  fh_chung: {
    s: { bg: 'chua', time: 'chieu', cast: ['su'] },
    t: 'Lương tần năm ấy',
    lines: [
      'Mười năm trước, trong cung có một Lương tần sinh được hoàng tử. Đứa bé mất sau ba ngày, Lương tần mất sau ba tháng.',
      'Người ta nói hai mẹ con yếu bóng vía. Bà vú hầu Hoàng hậu năm ấy bị đuổi khỏi cung ngay sau đám tang.',
      'Hạnh vừa tìm ra bà vú ấy, ở nhờ một am nhỏ dưới chùa Vân Tịch.',
    ],
  },
  rb_lt_ra: {
    s: { bg: 'phong', time: 'ngay', cast: ['letan'] },
    t: 'Cháu gái nhà Tôn',
    lines: [
      'Lệ tần vào cung đúng lúc bạn mang thai. Không ai tin đó là chuyện tình cờ.',
      'Nhà họ Tôn có người trong triều, có người trong Thái y viện, và giờ có người trong hậu cung. Ông Thái phó muốn một đứa cháu ngoại làm vua.',
      'Chiếc túi thơm Lệ tần tặng bạn tháng trước, Hạnh vẫn để trên bàn.',
    ],
  },
  rc_hp_ra: {
    s: { bg: 'phong', time: 'dem', cast: ['hienphi', 'thaihau'] },
    t: 'Người không để lại dấu tay',
    lines: [
      'Hiền phi chưa bao giờ bị ai nghi. Mỗi lần trong cung có chuyện, bà đều đang ở bên giường bệnh của ai đó.',
      'Sau lưng bà là cha, Mạc tướng quân, người giữ cấm quân. Đụng đến Hiền phi là đụng đến giáo của cả kinh thành.',
      'Thái hậu trở bệnh. Lại là Hiền phi ngày đêm hầu thuốc.',
    ],
  },
  fp_mac_ra: {
    s: { bg: 'cong', time: 'ngay', cast: ['mac'] },
    t: 'Giáo của nhà họ Mạc',
    lines: [
      'Cấm quân giữ chín cửa Phượng Thành. Ai giữ cấm quân thì giữ được cả vua lẫn hậu cung trong tay.',
      'Mạc tướng quân giữ chức ấy mười lăm năm. Con gái ông ngồi trong cung, ông đứng ngoài cửa, hai cha con canh nhau từ hai phía.',
      'Muốn hạ Hiền phi, phải hạ được cha bà trước.',
    ],
  },
  cb_dau: {
    s: { bg: 'phong', time: 'dem', cast: ['con'] },
    t: 'Bệnh của trẻ con',
    lines: [
      'Trẻ con trong cung chết vì bệnh nhiều hơn chết vì dao. Bệnh thì không ai phải chịu tội.',
      'Thái y Lục là người duy nhất bạn còn tin trong Thái y viện. Ông đã bắt mạch cho con từ ngày nó còn trong bụng.',
      'Đêm nay, ông bắt mạch rất lâu.',
    ],
  },
  cb_dc: {
    s: { bg: 'tam', time: 'dem', cast: ['vua', 'phuc'] },
    t: 'Di chiếu',
    lines: [
      'Vua băng hà mà không có di chiếu thì ngai vàng thuộc về người giữ được ấn và cửa cung đêm ấy.',
      'Hoàng thượng biết điều đó. Ngài cũng biết trong số người đứng quanh giường mình, không ai không có phe.',
      'Đêm nay, ngài cho tất cả ra ngoài, trừ bạn và Phúc.',
    ],
  },
  ft_qc: {
    s: { bg: 'thu', time: 'dem', cast: ['phuc'] },
    t: 'Mẹ con một thuyền',
    lines: [
      'Thục phi đã thôi tranh sủng từ lâu. Giờ bà tranh cho con: ngôi Đông cung, rồi ngai vàng.',
      'Mẹ con bà là một thuyền. Đánh mẹ thì con phải ra mặt, đánh con thì mẹ phải ra tay. Muốn thắng, phải đánh cả hai cùng lúc.',
      'Mọi thứ cần có, Phúc đã gom đủ.',
    ],
  },
  fh_qc: {
    s: { bg: 'thaimieu', time: 'ngay', cast: ['hoanghau'] },
    t: 'Lễ tế Thái miếu',
    lines: [
      'Rằm tháng Bảy tế Thái miếu là lễ lớn nhất của tông thất. Hoàng hậu dẫn các hoàng tử ra lạy tổ, với tư cách mẹ đích của tất cả.',
      'Trước tổ tiên, ai là mẹ đích thì người ấy là mẹ của vua sau này. Mẹ đẻ chỉ đứng ở hàng sau.',
      'Lễ năm nay, Hoàng hậu muốn dắt tay con bạn.',
    ],
  },
  fp_qc: {
    s: { bg: 'thu', time: 'dem', cast: [] },
    t: 'Bắt người hiền',
    lines: [
      'Gom hết lời khai, bạn thấy mọi việc đều có tay người khác: Ninh, cung nữ, thái y. Không việc nào có tay Hiền phi.',
      'Người như vậy không bắt được bằng chứng cứ. Chỉ bắt được khi chính họ ra tay.',
      'Muốn Hiền phi ra tay, phải cho bà một thứ bà không thể không lấy.',
    ],
  },
  // ===== chương năm trở đi: triều đình =====
  cb_phe: {
    s: { bg: 'trieu', time: 'ngay', cast: ['quan'] },
    t: 'Tờ sớ đổi Đông cung',
    lines: [
      'Vua hôn mê ba tháng. Triều đình không ai dám nói chuyện sau này, nhưng ai cũng đang làm.',
      'Đông cung đã lập thì khó đổi. Muốn đổi phải có cớ, mà cớ dễ nhất là nói Đông cung còn nhỏ, mẹ Đông cung xuất thân thấp.',
      'Hôm nay, Bộ Lễ dâng sớ.',
    ],
  },
  rb_tp_ra: {
    s: { bg: 'phu', time: 'ngay', cast: ['quan'] },
    t: 'Cây cổ thụ',
    lines: [
      'Thái phó Tôn làm quan ba đời vua. Môn sinh của ông ngồi khắp sáu bộ, kho Thái thương, cả Thái y viện.',
      'Người ta nói Thái phó là cây cổ thụ: chặt thân thì rễ còn, đào rễ thì thân đổ đè lên người đào.',
      'Giờ trên bàn bạn có sổ kho hụt, thư mua quan, và tên những người khách đến phủ ông lúc nửa đêm.',
    ],
  },
  rb_ng_ra: {
    s: { bg: 'cong', time: 'dem', cast: ['nghia'] },
    t: 'Trăm tử sĩ',
    lines: [
      'Nghĩa không có ngôi Đông cung, nhưng có lòng của những người từng nhận ơn mẹ hắn.',
      'Trăm tử sĩ không phải là nhiều. Nhưng đủ để mở một cánh cửa, nếu bên trong có người chờ.',
      'Phúc báo trang trại sát cửa Tây đêm nào cũng sáng đèn.',
    ],
  },
  cb_gia: {
    s: { bg: 'phu', time: 'chieu', cast: ['quan'] },
    t: 'Nhà họ Tôn muốn gì',
    lines: [
      'Vua con còn nhỏ, ai nuôi dạy vua là người nắm ngai. Thái phó Tôn muốn là người ấy.',
      'Cách chắc nhất để một nhà ở bên vua mãi mãi là gả con gái cho vua. Nhà họ Tôn đã làm vậy hai lần, với hai đời vua trước.',
      'Hôm nay, ông dâng lên một bức họa.',
    ],
  },
  cb_su: {
    s: { bg: 'trieu', time: 'ngay', cast: ['ngoai'] },
    t: 'Nước Sa Hải',
    lines: [
      'Sa Hải là nước nhỏ ở phía nam, sống bằng biển và buôn bán. Ba mươi năm qua, họ chưa từng dám đòi gì.',
      'Nhưng họ nghe tin vua băng hà, vua mới còn nhỏ, và người cầm quyền là một người đàn bà ngồi sau rèm.',
      'Sứ thần của họ hôm nay không quỳ.',
    ],
  },
  cb_kieu: {
    s: { bg: 'cong', time: 'dem', cast: [] },
    t: 'Lương của lính',
    lines: [
      'Lính túc vệ giữ cửa cung, sống bằng lương nhà nước. Ba tháng không có lương, họ bắt đầu nghe người khác nói.',
      'Có người đã nói với họ rằng tiền lương bị giữ lại vì đàn bà sau rèm tiêu hoang.',
      'Đêm nay, tiếng khiên gõ vang ngoài cửa cung.',
    ],
  },
  rb_nd: {
    s: { bg: 'sanrong', time: 'ngay', cast: [] },
    t: 'Điềm phượng',
    lines: [
      'Trong sách xưa, phượng đậu là điềm trời chọn người cầm quyền. Người tin thì quỳ, người không tin thì đếm xem ai quỳ trước.',
      'Bá quan biết vậy. Kẻ thật lòng muốn bạn nhiếp chính trọn đời, kẻ muốn đẩy bạn lên cao để có cớ kéo xuống.',
      'Sáng nay, có chim phượng đậu trên nóc điện chầu.',
    ],
  },
  cb_tu: {
    s: { bg: 'trieu', time: 'ngay', cast: ['con'] },
    t: 'Vua đã lớn',
    lines: [
      'Hai mươi năm ngồi sau rèm, bạn dạy con chữ nhẫn trước chữ trị. Giờ con đã lớn, và con muốn tự quyết.',
      'Một ông vua trẻ muốn chứng tỏ mình thì không cần lý do. Chỉ cần một kẻ thù.',
      'Sáng nay, con ném tờ sớ can gián xuống thềm.',
    ],
  },
  cb_no: {
    s: { bg: 'cong', time: 'chieu', cast: ['thucphi'] },
    t: 'Người cũ',
    lines: [
      'Ba mươi năm, những người từng là kẻ thù đều già đi như nhau.',
      'Có người đã chết, có người ở chùa, có người còn đó, chỉ chờ một lần đến đòi món nợ cũ.',
      'Chiều nay, có một bà già chống gậy đứng trước cửa cung.',
    ],
  },
};
