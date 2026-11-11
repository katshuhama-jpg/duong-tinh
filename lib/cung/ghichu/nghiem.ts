/** Ghi chú cuối chương phần Con tin họ Nghiêm. */
import type { Cond } from '../types';
import type { GhiChu } from './types';

const g = (chapter: number, id: string, when: Cond, w: number, title: string, text: string[]): GhiChu => ({
  id: `gc_nghiem_${chapter}_${id}`,
  part: 'nghiem',
  chapter,
  when,
  w,
  title,
  text,
});

/*
 * Luật giữ bí mật (kinh thánh 8.0):
 * - Không nêu tên tay sai, người trung gian hay chủ mưu của một vụ khi vụ ấy chưa xử đúng (anN_thang).
 * - Thái hậu chỉ được gọi là người ra lệnh khi đã có su11, cha_noi_het, hay an7_thang.
 * - Người xử sai không nhận được ghi chú nào cho biết mình sai (dùng not: oan_anN, anN_nang, buoc_...).
 * - Chuyện về chị Thanh chỉ hé những gì đã có trong Hồ sơ chị (cờ suN).
 */
export const GHICHU_NGHIEM: GhiChu[] = [
  /* ---------------- Chương 1: Viện của chị ---------------- */
  g(1, 'govach', { flags: ['n1_vao'] }, 1, 'Bên kia vách', [
    'Ba tiếng gõ đêm đầu là của Hoa, tú nữ ở gian sau. Nó mười tám tuổi, cùng đợt tuyển với bạn, và mấy hôm trước vừa nhặt được một món đồ đẹp. Nghe người ta bảo món ấy là của người ở viện bên này, nó định đem trả.',
    'Đêm ấy nó gõ vách để hỏi xem người mới dọn vào có quen người cũ không. Nó không biết người cũ đã chết. Nó cũng không biết có người khác đang đi tìm đúng món đồ nó cầm.',
    'Canh hai có người gọi Hoa ra. Canh ba có hai bóng người đi về phía giếng. Sáng ra nó treo trên xà, chân còn đi hài. Bạn là người cuối cùng nghe tiếng nó, cách một bức vách.',
  ]),
  g(1, 'luoc', { flags: ['biet_luoc'], not: ['su1'] }, 3, 'Chiếc lược trong kẽ vách', [
    'Món đồ Hoa nhặt được là chiếc lược ngà khắc hoa mơ của chị. Từ ngày chị mất, đã có người lục viện này nhiều lần mà không thấy nó. Rồi chiếc lược lại rơi vào tay một tú nữ mới vào cung chưa được bao lâu.',
    'Hoa kể với bạn cùng phòng rằng nó định trả lược cho người ở viện bên này. Câu ấy đến tai người không nên nghe. Với họ, một con bé cầm đồ của người chết đi hỏi han khắp nơi còn nguy hơn chính chiếc lược.',
    'Họ rạch nát gối của Hoa mà không thấy gì, vì nó đã nhét lược vào kẽ vách gian sau. Con bé chết mà vẫn giữ được thứ người ta cần. Nhờ vậy chiếc lược mới đến được tay bạn.',
  ]),
  g(1, 'luoc_su1', { flags: ['su1'] }, 4, 'Nửa trang thư', [
    'Chị biết thư gửi ra khỏi cung đều đi qua tay người khác. Nên chị khoét rỗng sống chiếc lược ngà, cuộn nửa trang giấy vào trong, và viết cho một người nhận ra nét chữ của chị đến từng nét.',
    'Câu chị dặn là đừng uống gì người ta mang đến. Đêm đầu tiên bạn ở viện này, trên bàn đã có sẵn một ấm trà sen không ai nhận là mình pha.',
    'Nửa trang còn lại bị xé. Ai xé, xé lúc nào, bạn chưa biết. Bạn chỉ biết một điều chắc chắn hơn mọi dòng trong sổ cung: chị không chết vì bệnh.',
  ]),
  g(1, 'tra', { flags: ['do_tra'] }, 3, 'Ấm trà không ai pha', [
    'Ấm trà sen đêm đầu có độc. Nước trà thấm xuống đất bốc lên mùi hăng, và con vật nào liếm phải thì không qua nổi đêm ấy.',
    'Viện này khóa từ năm ngoái, chìa nằm ở nội vụ. Pha một ấm trà còn ấm rồi úp sẵn hai chén trước khi chủ mới bước vào là việc chỉ người có chìa mới làm được.',
    'Cũng đêm ấy, ở gian sau, Hoa bị gọi ra khỏi phòng. Hai việc xảy ra cách nhau một bức vách. Bạn hắt ấm trà đi, nên sáng ra bạn còn được đứng nhìn chân con bé trên xà.',
  ]),
  g(1, 'thang', { flags: ['an1_thang'] }, 5, 'Người dọn gian sau', [
    '{TAY:an1} là người gọi Hoa ra lúc canh hai và đưa nó ra giếng lúc canh ba. Người ấy được dặn một câu rất ngắn: dọn gian sau cho sạch. Con bé đã nhặt được đồ của người cũ, và hỏi han nhiều quá.',
    'Ở bờ giếng, đôi hài cỏ của người ấy ướt sũng. Hoa được treo lên xà khi chân còn đi hài, vì lúc ấy nó đã không giãy được nữa. Đôi hài ướt bị nhét dưới đống lá gầm nhà, và người ấy đi chân trần về qua sân.',
    'Người dặn câu ấy là chưởng sự Kiệm. Ông chịu phạt nửa năm lương mà vẫn cười, vì ông chưa bao giờ phải tự tay dọn chỗ nào. Còn ai dặn Kiệm, lời khai không với tới.',
  ]),
  g(1, 'gac', { flags: ['an1_gac'] }, 3, 'Chân còn đi hài', [
    'Người tự treo cổ thì giãy. Hài văng ra, ghế đổ xa. Hoa còn nguyên đôi hài trên chân, nghĩa là lúc lên xà nó đã không còn giãy được nữa.',
    'Đêm ấy có người đưa nó ra giếng lúc canh ba rồi trở về một mình. Người ấy ướt cả đôi hài cỏ, giấu chúng dưới gầm nhà, rồi đi chân trần qua sân.',
    'Bạn gác án, giữ hồ sơ trong rương. Người ấy vẫn ở trong cung, vẫn đi qua sân mỗi sáng, và biết bạn đang giữ thứ gì.',
  ]),
  g(1, 'govach2', { flags: ['go_nguoi'] }, 3, 'Dấu giày trên tro', [
    'Gian sau khóa từ hôm có án, vậy mà đêm nào cũng có ba tiếng gõ, ngừng, rồi ba tiếng nữa. Đó đúng là nhịp Hoa gõ đêm đầu. Có người đã nghe được nhịp ấy, và dùng lại nó.',
    'Người gõ có chìa gian sau. Họ không cần bạn chết. Một phi tần mới vào mà thức trắng bảy đêm, đập vách gọi tên người chết, thì nội vụ chỉ cần ghi một dòng "dưỡng bệnh" là đưa ra khỏi cung, không ai hỏi thêm.',
    'Lớp tro bạn rắc trước cửa làm hỏng việc ấy. Ma không để lại dấu giày vải của người lớn.',
  ]),
  g(1, 'khan', { flags: ['nghi_a1_khan'], not: ['oan_an1', 'an1_nang'] }, 3, 'Chiếc khăn mới tinh', [
    'Chiếc khăn lụa xanh chưa từng rơi dưới xà. Một chiếc khăn rơi trong đêm có người chết thì phải nhàu, phải dính đất. Chiếc này phẳng như vừa lấy ra khỏi rương.',
    'Loại khăn ấy chỉ cung Quý phi dùng, và đó chính là lý do nó được đặt lên bàn bạn. Án khép vào người của cháu gái Thái sư thì phe Hà mất mặt, nhà Nghiêm thêm một kẻ thù, còn người thật thì đứng ngoài.',
    'Bạn hỏi đúng một câu: sao khăn rơi mà không ai thấy. Người mang khăn đến không trả lời được, nên về rất sớm.',
  ]),
  g(1, 'thu', { flags: ['su2'] }, 2, 'Lá thư nhũ mẫu đưa', [
    'Nhũ mẫu không biết chữ. Vì thế chị chọn bà đưa thư. Người không đọc được thì không ai ép kể lại được.',
    'Trong lá thư ấy, chị xin cha mở một vụ án. Cha đọc xong thì ngồi đến sáng. Thư trả lời, nếu có, không đi qua tay nhũ mẫu.',
    'Bà kể chuyện ấy với bạn như kể chuyện vá áo. Bà không biết đó là tờ đầu tiên của một hồ sơ sẽ theo bạn suốt đời.',
  ]),
  g(1, 'balao', { flags: ['gap_balao'] }, 2, 'Chén nào cũng nhìn hai lần', [
    'Người đưa bạn gói chè là {BALAO} thị. Sáu mươi năm trước bà cũng vào cung khi còn rất trẻ, và từng ở một cái viện giống hệt viện của bạn.',
    'Câu "chén nào cũng phải nhìn hai lần" không phải câu nói cho vui. Đó là điều một người đã sống qua cả một triều trong cung để lại cho người đến sau.',
    'Bà nhìn thấy một người cũ trong mặt bạn. Gói chè ấy không có gì lạ. Lạ là ở chỗ, giữa bao nhiêu tú nữ đi qua, bà chọn đúng bạn để đưa.',
  ]),
  g(1, 'lv', { flags: ['lv_no'] }, 2, 'Mẹ ốm ở quê', [
    'Mẹ Lụa Vàng không ốm. Mười lăm quan ấy đi thẳng ra chiếu bạc sau bếp, chỗ người bên kho sổ hay ngồi.',
    'Một người hầu nợ tiền là một người hầu có thể mua. Bạn trả cho nó một lần, thì người cho nó vay biết nó sẽ còn vay lần nữa.',
    'Lụa Vàng không xấu. Nó chỉ nghèo, lanh, và đứng ở chỗ ai cũng muốn có một đôi tai: ngay trong viện của bạn.',
  ]),
  g(1, 'dem', { flags: ['an1_phancong'] }, 3, 'Ba vòng quanh viện', [
    'Tờ trình bị trả về vì không đủ chứng. Cùng lúc ấy, người đã đưa Hoa ra giếng biết thêm một điều: bạn đã đào, nhưng trong tay chưa có gì.',
    'Bóng người đi quanh viện ba vòng không phải để dọa. Họ đếm cửa, xem then nào lỏng, ai ngủ gian nào. Nắp giếng sau viện được mở sẵn từ chiều.',
    'Nếu bạn còn sống qua đêm ấy, là vì có người đứng giữa bạn và cái giếng, hoặc vì bạn giữ một thứ họ chưa dám mất.',
  ]),

  /* ---------------- Chương 2: Sổ đến thăm ---------------- */
  g(2, 'den', { flags: ['n2_hau'] }, 1, 'Một dòng mực', [
    'Kiệm ghi dòng mực ngay trước mặt bạn không phải vì lệ. Ông cho bạn thấy ai đang cầm bút.',
    'Trong cung, một đêm được gọi chỉ có thật khi nó nằm trong sổ đến thăm. Đứa trẻ sinh ra từ một đêm có trong sổ là con vua. Đứa trẻ sinh ra từ một đêm không có trong sổ thì không là con ai cả.',
    'Người giữ sổ, vì vậy, giữ cả tên của những đứa trẻ chưa ra đời. Rồi bạn đã thấy quyền ấy được dùng thế nào, ở trang tháng Tư của Tài nhân viện Đông.',
  ]),
  g(2, 'vua', { flags: ['vua_hoi_hau'] }, 2, 'Câu hỏi đêm đầu', [
    'Hoàng thượng chỉ nhớ một gương mặt. Ở lễ thôi nôi của Hựu, cả điện cười, chỉ có một phi tần không cười. Người ấy là chị bạn.',
    'Ngài không hỏi vì đã nghi Hoàng hậu điều gì. Ngài hỏi vì quanh ngài ai cũng là người của ai đó, và ngài muốn biết có ai từng nhìn thấy điều ngài không thấy.',
    'Câu hỏi ấy lọt ra khỏi tẩm điện nhanh hơn bạn nghĩ. Từ sáng hôm sau, đã có người muốn biết bạn trả lời thế nào.',
  ]),
  g(2, 'su3', { flags: ['su3'], not: ['su4'] }, 4, 'Trang tháng Ba', [
    'Vết cạo ở tháng Ba năm Tân Dậu và vết cạo ở tháng Tư của Tài nhân giống nhau như hai nét của cùng một bàn tay. Cách nhau bảy năm, cùng một loại sổ, cùng một người giữ.',
    'Năm Tân Dậu cũng là năm Hoàng trưởng tử ra đời, năm cả kinh thành đốt pháo ba ngày. Có một đêm năm ấy, ai đó đã được gọi, và ai đó muốn đêm ấy chưa từng có.',
    'Bạn chưa biết đêm bị cạo là của ai. Nhưng người cầm dao năm ấy và người cầm dao năm nay dùng chung một cách giấu.',
  ]),
  g(2, 'dao', { flags: ['su3', 'su4'] }, 5, 'Hai vết trên hai cuốn sổ', [
    'Cùng một năm Tân Dậu, sổ đến thăm mất một đêm tháng Ba, còn sổ cung nữ mất một cái tên. Cái tên ấy là Đào, cung nữ hầu trà, đang có tháng.',
    'Một cung nữ hầu trà có thai thì người ta sẽ hỏi cha đứa bé là ai. Nếu đêm vua gọi nàng còn trong sổ, câu trả lời nằm sẵn ở đó. Người ta cạo đêm ấy đi, rồi gạch tên nàng bằng mực son, không ghi ngày xuất cung, không ghi quê quán.',
    'Đào không chết trong sổ. Nàng chỉ biến mất khỏi sổ. Hai chuyện ấy khác nhau, và bạn sẽ còn nhớ điều đó rất lâu.',
  ]),
  g(2, 'thang', { flags: ['an2_thang'], not: ['lv_bi_bat_an2'] }, 5, 'Rương sổ của chưởng sự', [
    '{TAY:an2} là người cạo dòng mồng bảy tháng Tư rồi chép đè ngày khác. Dao do người khác đưa, thỏi mực nâu cũng do người khác cấp. Người đưa chỉ cần một bàn tay không biết dòng mình cạo là của ai.',
    'Người đưa dao là Kiệm. Ông không bao giờ tự cạo. Ông giữ bản gốc, và giữ cả một rương sổ cũ, trang nào cũng có một vết cạo được ông nhớ kỹ. Với ông, mỗi vết cạo là một món nợ của ai đó.',
    'Ai bảo Kiệm cạo trang của Tài nhân, lời khai không nói. Kiệm chịu phạt một năm lương mà vẫn cười, vì cái rương ấy vẫn còn nguyên.',
  ]),
  g(2, 'lvbat', { flags: ['lv_bi_bat_an2'] }, 5, 'Món nợ được xóa', [
    'Lụa Vàng bị mua từ trước khi có trang sổ tháng Tư. Người cho nó vay không đòi tiền. Họ đòi một việc nhỏ: cạo một dòng, chép đè một ngày.',
    'Nó không biết dòng ấy là của ai. Nó chỉ biết làm xong thì xóa nợ. Người bên chiếu bạc biết rõ một điều: người hầu nghèo trong một viện đang đào chuyện cũ là bàn tay rẻ nhất trong cung.',
    'Đến lúc bị giải đi, nó vẫn nghĩ mình chỉ cạo một dòng mực. Nó không biết dòng mực ấy suýt đưa một người đàn bà có thai vào lãnh cung.',
  ]),
  g(2, 'giay', { flags: ['biet_giay_lv', 'an2_thang'], not: ['lv_tay'] }, 4, 'Đôi giày vải mới', [
    'Đôi giày vải mới của Lụa Vàng là quà của người bên kho sổ, tặng trước hôm có vết giày trên tro. Người ta cần một vết giày rõ từng đường chỉ, và cần nó khớp với chân một người trong viện bạn.',
    'Nếu bạn gọi tên Lụa Vàng, án sẽ khép ngay, gọn như một tờ trình mẫu. Bạn mất người hầu, viện không còn ai chạy việc, và kho sổ yên trở lại.',
    'Bạn không gọi. Lụa Vàng đến giờ vẫn không biết đôi giày nó khoe hôm ấy suýt đưa nó lên sợi dây ở sân sau nội vụ.',
  ]),
  g(2, 'thuoc', { flags: ['cat_thuoc'] }, 2, 'Gốc cây vẫn xanh', [
    'Thang thuốc bổ ma ma mang sang là thuốc bổ thật. Bạn đổ vào gốc cây, sáng ra cây vẫn xanh.',
    'Ma ma đứng chờ bạn uống xong mới về, vì đó mới là việc bà được sai: xem con gái nhà Nghiêm có uống thứ người ta đưa hay không. Người chịu uống là người còn tin. Người xin để tối mới uống là người đã biết sợ.',
    'Hôm ấy bạn chọn sợ, và người đứng chờ ở cửa đã thấy.',
  ]),
  g(2, 'tang', { flags: ['biet_tang_gia'] }, 4, 'Đám tang không có người chết', [
    'Bà nội vẫn khỏe. Tin tang là cha dựng lên, tờ sớ xin cho con về giữ tang ba năm là cha tự viết, và cỗ kiệu ở cổng Bắc là cha cho đợi từ sáng.',
    'Cha đọc thư bạn và hiểu bạn đang đi về đâu. Một người cha không biết gì thì không cần dựng cả một đám tang để kéo con ra khỏi cung.',
    'Bạn quay vào. Ba hôm sau, sớ của cha được rút lại với lý do bà cụ đã khỏe. Đó là lần thứ hai cha không giữ được một đứa con gái ở ngoài bức tường ấy.',
  ]),
  g(2, 'ts', { flags: ['ban_ts'] }, 3, 'Túi bạc của phủ Thái sư', [
    'Thái sư không biết gì chắc về nhà Lương. Ông chỉ ngửi thấy có chuyện, như người già ngửi thấy trời sắp mưa.',
    'Ông cần một người đọc được sổ và đứng được gần cung chính. Con gái nhà Nghiêm, giỏi chép sổ, lại có một người chị chết không rõ vì sao, là người ông nhắm từ ngày bạn vào cung.',
    'Túi bạc đầu tiên là để mua chuyện vặt. Túi thứ hai, nếu có, là để mua cả người.',
  ]),
  g(2, 'nhanchung', { flags: ['chet_nhanchung1'] }, 4, 'Người dậy sớm nhất dãy nhà', [
    'Cung nữ gánh nước ra giếng từ canh tư mỗi ngày. Đêm có án, nếu có ai ra giếng lúc canh ba, nó là người có thể đã thấy.',
    'Bạn gác án để giữ manh mối. Người kia cũng hiểu chữ "gác" theo cách của họ: án chưa khép thì người biết chuyện còn là mối lo. Chiều hôm trước có người ghé dãy gian sau, hỏi thăm từng người. Hỏi thăm cũng là một cách đếm xem ai còn nhớ.',
    'Sổ ghi: trượt chân. Hồ sơ trong rương bạn vẫn còn nguyên giấy, chỉ là bớt đi một người có thể đứng ra nói.',
  ]),
  g(2, 'quetsan', { flags: ['chet_quetsan'] }, 4, 'Nắm rêu bờ giếng', [
    'Án gian sau khép bằng chữ "tự vẫn", và người làm việc ấy yên tâm. Nhưng yên tâm không có nghĩa là quên. Cô bé quét sân viện bạn mỗi sáng đều đi qua những chỗ người khác không nhìn.',
    'Nắm rêu trong tay nó là rêu bờ giếng. Nó đã bám vào thành giếng đến hơi thở cuối. Người trượt chân thì không nắm chặt như thế.',
    'Sổ nội vụ ghi một chữ quen: trượt chân. Ở viện này, sổ ghi gì thì người ta coi như thế.',
  ]),

  /* ---------------- Chương 3: Thai ---------------- */
  g(3, 'run', { flags: ['co_thai'] }, 1, 'Chiếc khăn rơi', [
    'Thái y Thẩm làm rơi khăn vì ông biết sau câu chúc mừng sẽ là gì. Trong cung, mỗi cái thai của phi tần là một câu hỏi gửi lên ghế Đông cung, và có người không muốn câu hỏi ấy mang họ Nghiêm.',
    'Ông là người sẽ kê đơn an thai cho bạn. Ông cũng là người có vợ và hai đứa nhỏ ở ngoài thành, nhà ở đâu thì người cần biết đều biết.',
    'Hôm ấy chưa ai gọi ông đi đâu. Nhưng ông đã biết mình sẽ bị gọi.',
  ]),
  g(3, 'khongthai', { flags: ['g_quan'], not: ['co_thai'] }, 1, 'Một năm không có tin vui', [
    'Năm ấy viện bạn không có tin vui, và cũng vì thế mà không có chén thuốc nào lạ được bưng tới.',
    'Ở cung trên có người không muốn một đứa trẻ họ Nghiêm lớn lên gần ghế Đông cung. Một phi tần họ Nghiêm chưa có con thì chưa đáng để ai phải bận tay.',
    'Người ta để yên viện của bạn không phải vì quên. Người ta chỉ đang chờ xem bạn có thành mối lo hay không.',
  ]),
  g(3, 'thang', { flags: ['an3_thang'], not: ['lv_bi_bat_an3'] }, 5, 'Gói rễ tím', [
    '{TAY:an3} bỏ mấy lát rễ tím vào lò sau canh hai, đúng như được dặn. Gói rễ ấy do Thái y Thẩm đưa, và ông đưa trong khi tay còn run hơn người nhận.',
    'Thẩm không muốn hại bạn. Ông bị người ở cung trên bắt kê thêm một vị, vì ở đó có người không muốn một đứa trẻ họ Nghiêm lớn lên gần ghế Đông cung.',
    'Lời khai dừng ở hai chữ "cung trên". Trong tay bạn có một cái tên ở giữa là Thẩm, và một khoảng trống ở trên cùng.',
  ]),
  g(3, 'lv', { flags: ['lv_bi_bat_an3'] }, 5, 'Từ phòng thuốc', [
    'Lụa Vàng bị mua từ lâu trước chén thuốc thứ mười hai. Người mua không cần nó trung thành. Họ chỉ cần nó đứng gần lò thuốc của bạn.',
    'Gói rễ đi từ phòng thuốc, qua tay Thái y, rồi mới tới tay nó. Thái y đưa mà mắt còn sợ hơn nó. Người ta bảo nó chỉ làm nương nương mệt vài hôm, và nó tin, vì nó cần tin như thế.',
    'Phía trên Thái y là ai, Lụa Vàng không biết. Người ta cũng chẳng bao giờ cho một con bé hầu biết điều ấy.',
  ]),
  g(3, 'su5', { flags: ['su5'] }, 3, 'Đêm trực', [
    'Nhũ mẫu kể năm Tân Dậu chị thôi cười, chị bảo là trực đêm mệt. Đêm trực ấy là đêm Hoàng hậu sinh nở. Chị ngồi bên giường, nắm tay Hoàng hậu suốt đêm.',
    'Hoàng hậu lỡ lời vì bàn tay đặt trên bụng bạn làm bà nhớ lại. Rồi bà rụt tay về, và cho đóng hết cửa sổ dù trời không có gió.',
    'Người sợ gió lùa thì đóng một cửa. Đóng hết cửa là sợ có người đứng nghe.',
  ]),
  g(3, 'mo', { flags: ['su6', 'su7'] }, 5, 'Nấm đất không bia', [
    'Dòng mực nhòe trong sổ thuốc viết: "Hoàng hậu trở dạ. Con... mất." Nấm đất sau hòn non bộ không có bia, cỏ được nhổ sạch, và đêm rằm nào Hoàng hậu cũng ra thắp hương. Hai mảnh ấy là một: đứa con Hoàng hậu sinh năm Tân Dậu nằm dưới nấm đất.',
    'Vậy mà năm Tân Dậu, cả kinh thành đốt pháo ba ngày mừng Hoàng trưởng tử. Đứa trẻ Thái hậu bế không rời tay ở lễ thôi nôi là ai, sổ thuốc không ghi.',
    'Giờ bạn hiểu vì sao Thái y Thẩm đứng chắn trước giá sổ. Ông là người đỡ đẻ đêm ấy, và là người viết dòng mực nhòe.',
  ]),
  g(3, 'su6', { flags: ['su6'], not: ['su7'] }, 3, 'Dòng mực nhòe', [
    'Năm Tân Dậu, người đỡ đẻ cho Hoàng hậu là Thái y Thẩm. Dòng ông viết đêm ấy chỉ có mấy chữ, mực nhòe như bị nước rơi vào.',
    '"Con... mất." Không ghi trai hay gái, không ghi giờ. Trong khi đó, sử cung chép năm ấy Hoàng hậu sinh Hoàng trưởng tử khỏe mạnh.',
    'Ông gấp sổ trước khi bạn đọc hết, vì ông biết hai dòng ấy không thể cùng đúng.',
  ]),
  g(3, 'su7', { flags: ['su7'], not: ['su6'] }, 3, 'Đêm rằm', [
    'Hoàng hậu thắp hương ở nấm đất sau hòn non bộ đã nhiều năm, đi lối quen trong bóng tối. Không bia, không tên, cỏ nhổ sạch. Người ta không thắp hương ngần ấy năm cho một con chim hay con mèo.',
    'Đó là mộ một đứa trẻ. Một đứa trẻ không có tên trong sổ, nên cũng không có tên trên bia.',
    'Trong cung, đứa con duy nhất người ta biết Hoàng hậu từng sinh là Hoàng trưởng tử Hựu. Và Hựu thì vẫn sống.',
  ]),
  g(3, 'cuu', { flags: ['cuu_thaiy'] }, 3, 'Vợ con ở ngoài thành', [
    'Vợ và hai đứa nhỏ của Thái y Thẩm sống trong một ngõ hẹp ngoài thành. Người bắt ông kê thêm vị thuốc không cần giam họ. Chỉ cần cho ông biết có người đứng ở đầu ngõ.',
    'Bạn đưa họ đi rồi, sợi dây ấy đứt. Từ nay ông không còn gì để người ta cầm.',
    'Một Thái y không còn bị nắm thóp là một bàn tay không ai mượn được nữa. Bạn chưa biết, nhiều năm sau, điều đó sẽ cứu ai.',
  ]),
  g(3, 'nm', { flags: ['chet_nhumau'] }, 5, 'Ngụm thuốc của nhũ mẫu', [
    'Từ hôm bạn có thai, nhũ mẫu nếm trước mọi chén. Bà biết thế là đem mình ra đổi. Bà chỉ không nói ra.',
    'Năm chị vào cung, bà ở lại phủ, không theo được. Lần này bà theo bạn vào tận viện, ngồi canh trước cửa, và giành lấy chén thuốc trước khi bạn kịp chạm.',
    'Chén thứ hai đêm ấy dành cho bạn và đứa bé. Bà uống thay một ngụm lớn, đủ để biết nó đắng thế nào, và đủ để không dậy nữa.',
  ]),
  g(3, 'un', { flags: ['n3_un_vu'], not: ['buoc_un3'] }, 2, 'Tờ tố của Uyển Như', [
    'Uyển Như không biết ai bỏ thuốc vào lò. Nàng tố bạn vì một món nợ cũ giữa hai người, không vì chén thuốc.',
    'Câu "nhà Nghiêm xét được cả người vô tội" nàng đã nghĩ sẵn từ lâu, chỉ chờ đúng lúc nói trước mặt Thái hậu.',
    'Hai con tin tố nhau thì phe nào cũng được lợi, trừ hai con tin.',
  ]),
  g(3, 'huu', { flags: ['nghe_ru'] }, 2, 'Câu ru lạ tai', [
    'Câu ru Hựu hát không phải giọng kinh thành. Trong cung không ai dạy nó câu ấy, và chính nó cũng không nhớ mình học ở đâu.',
    'Một đứa trẻ không tự nghĩ ra câu ru. Phải có người hát cho nó nghe, nhiều lần, từ lúc nó còn chưa biết nhớ.',
    'Ma ma chạy tới bế nó đi, vì bà cũng đã nghe câu ấy, và biết không nên để ai khác nghe.',
  ]),

  /* ---------------- Chương 4: Hai đứa trẻ ---------------- */
  g(4, 'thu', { flags: ['mo_an4'] }, 1, 'Hòn đá ném xuống ao', [
    'Lá thư dưới cửa Đông cung không cần đúng. Người viết nó không định chứng minh điều gì. Họ chỉ ném một hòn đá xuống ao, rồi đứng xem con cá nào giật mình.',
    'Vì thế lá thư được nhét đúng lúc triều bàn lập Đông cung, đúng chỗ cả hậu cung đọc nó trước Hoàng hậu. Ai tái mặt, ai đóng cửa, ai vội đi tìm người viết, người viết đều ghi lại.',
    'Bạn nhận lời đọc giúp Hoàng hậu. Từ lúc ấy, bạn cũng thành một con cá trong ao.',
  ]),
  g(4, 'thang', { flags: ['an4_thang'] }, 5, 'Người muốn xem nhà Lương giật mình', [
    '{TAY:an4} nhét thư lúc đổi phiên, nhận bạc và mẫu thư từ quản sự phủ Thái sư. Thái sư không biết gì chắc về Hựu. Ông chỉ ngửi thấy nhà Lương có chỗ hở, và muốn biết chỗ hở ấy rộng tới đâu.',
    'Mùi trầm trên lá thư là mùi người ta cố tình ướp vào, để ai đọc cũng nghĩ tới cung chính. Hòn đá ném đi, không trúng thì cũng làm đục nước.',
    'Vụ này là của phủ Thái sư, từ đầu đến cuối. Nếu bạn có một sợi chỉ nối các hồ sơ cũ với nhau, sợi chỉ ấy không chạy qua đây.',
  ]),
  g(4, 'huong', { flags: ['nghi_a4_huong'], not: ['buoc_mh'] }, 3, 'Mùi trầm quá đậm', [
    'Thư không tên mà thơm mùi trầm Kỳ Nam thì chỉ có hai khả năng: người viết sơ ý, hoặc người viết muốn nó thơm. Người sơ ý không ướp đậm đến thế.',
    'Phủ lớn nào cũng mua được trầm Kỳ Nam. Nhưng chỉ cung chính đốt nó hằng ngày, nên ai ngửi cũng nghĩ ngay tới Hoàng hậu. Cung nữ giữ hương nói trơn tru, không vấp chữ nào, vì đã có người dạy trước.',
    'Bạn hỏi thêm một câu về chuyện ngoài phố. Câu hỏi ấy giữ cho một ma ma vô can khỏi sợi dây ở sân sau.',
  ]),
  g(4, 'ru', { flags: ['su8'], not: ['su4'] }, 3, 'Chiếc khóa và nốt ruồi', [
    'Câu ru, chiếc khóa trường mệnh bằng ngọc, nốt ruồi nhỏ ở đuôi mắt phải. Ba thứ ấy Hựu mang theo từ lúc chào đời, và không thứ nào giống nhà Lương.',
    'Lúc sốt mê, nó gọi một tiếng "mẹ" không giống tiếng gọi mẫu hậu. Trẻ con sốt thì gọi người đầu tiên nó nhớ, kể cả khi nó không biết mình còn nhớ.',
    'Câu ru ấy phải đến từ một vùng quê nào đó. Bạn chưa biết vùng nào, và chưa biết ai đã hát nó lần đầu.',
  ]),
  g(4, 'dao', { flags: ['su4', 'su8'] }, 5, 'Tên bị gạch bằng mực son', [
    'Năm Tân Dậu, sổ cung nữ gạch tên một người hầu trà tên Đào, đang có tháng. Cũng năm ấy, Hoàng trưởng tử ra đời, mang theo một câu ru giọng quê, một chiếc khóa ngọc, và một nốt ruồi không ai trong cung có.',
    'Một cung nữ hầu trà không có nhiều thứ để cho con. Một câu ru là thứ nàng có. Một chiếc khóa trường mệnh là thứ nàng có thể buộc vội vào cổ đứa bé trong một đêm.',
    'Bạn đặt hai mảnh ấy cạnh nhau, và chúng khớp như hai nửa của một chiếc khóa. Cái tên bị gạch không ghi ngày xuất cung, cũng không ghi còn hay mất.',
  ]),
  g(4, 'im', { flags: ['su9'] }, 5, 'Một chữ', [
    'Lá thư cuối chị gửi về phủ, cha đọc rồi giữ lại trong ngăn kéo. Mặt sau, cha viết một chữ, nét bút rất đậm, như người viết sợ tay mình run: "Im."',
    'Chữ ấy vừa là lệnh, vừa là lời van. Cha bảo chị im, vì cha biết nếu chị nói ra thì ai sẽ nghe, và ai sẽ ra tay.',
    'Chị mất cũng trong năm ấy. Cha giữ chữ "Im" từ đó đến giờ, ngay trong căn phòng ông vẫn ngồi đọc án mỗi ngày.',
  ]),
  g(4, 'venha', { flags: ['n4_venha'], not: ['su9'] }, 1, 'Thư phòng của cha', [
    'Cha dặn đừng vào thư phòng khi cha vắng. Hồi nhỏ bạn ngồi chép sổ cho cha trong chính căn phòng ấy, chưa bao giờ bị cấm.',
    'Một người không có gì phải giấu thì không cần cấm con gái mình bước qua cửa. Trong ngăn kéo bàn cha có một thứ ông đã cất từ năm chị mất, và điều ông sợ nhất là bạn đọc được nó.',
    'Ông đặt tay lên đầu bạn một lúc rồi rụt về. Có những người thương con bằng cách không cho con biết.',
  ]),
  g(4, 'hh', { flags: ['chet_hoanghau', 'buoc_mh'] }, 4, 'Lá thư tròn câu', [
    'Hoàng hậu thắt cổ, để lại một lá thư nhận hết: lời đồn là do bà, vì bệnh mà nói bậy. Nét chữ run, nhưng câu nào cũng tròn.',
    'Một lá thư như thế không viết trong một đêm. Có lẽ từ năm Tân Dậu, bà đã biết có ngày phải dùng tới nó, và đã sửa từng câu trong đầu suốt bao năm.',
    'Khi triều đòi xét huyết thống Hựu, bà chỉ còn một cách khiến người ta thôi xét: cho họ một người nhận tội, và người ấy đã chết. Bà chọn chính mình.',
  ]),
  g(4, 'hhtu', { flags: ['hh_tu'] }, 3, 'Tờ xin xuất gia', [
    'Hoàng hậu Lương Thục Nghi làm mẹ Hựu mười mấy năm, chưa ngày nào thôi sợ một câu Hựu có thể hỏi: mẹ là ai. Đêm rằm nào bà cũng thắp hương cho một đứa trẻ khác, đứa không có tên.',
    'Ra chùa, bà không phải đứng giữa hai đứa trẻ ấy nữa. Bà thương Hựu thật, chỉ là không còn sức giữ một bí mật lớn hơn chính mình.',
    'Bạn giúp bà dâng tờ xin. Ghế chính cung để trống từ hôm ấy, và có nhiều người bắt đầu đếm xem ai sẽ ngồi vào.',
  ]),

  /* ---------------- Chương 5: Ba ngày ---------------- */
  g(5, 'vua', { flags: ['chet_vua'] }, 1, 'Một lần nói thật', [
    'Hoàng thượng lên ngôi năm mười sáu tuổi, khi ấn ngọc còn nằm trong tay Thái sư. Suốt đời ngài không biết quanh mình ai là người của ai.',
    'Vì thế câu cuối ngài hỏi bạn là xin một lần nói thật. Không phải lời trăng trối, không phải di chiếu. Chỉ là một người sắp đi muốn biết có ai trong cung từng không nói dối mình.',
    'Ngài đi trước khi trời sáng. Câu bạn đã nói, hay đã không nói, ngài mang theo.',
  ]),
  g(5, 'benh', { flags: ['vua_benh', 'an5_thang'] }, 5, 'Không ai bưng chén ấy', [
    'Hoàng thượng ho ra máu từ mùa đông. Ngài cấm ghi bệnh vào tấu, vì sợ Thái sư biết thì triều chia đôi trước cả khi ngài đi. Chén thuốc đêm cuối chỉ để ngài bớt đau mà ngủ.',
    'Không ai đầu độc ngài. Muốn đưa thêm thứ gì vào thuốc ngự, người ta cần một Thái y chịu kê đơn. Từ năm bạn mang thai, Thái y Thẩm đã ra khỏi bàn tay từng nắm thóp ông, bằng cách này hay cách khác, nên ở thái y viện không còn ai để mượn.',
    'Bạn gọi đúng tên bệnh, và không ai phải chết thay. Chén thuốc ở lò năm ấy đã định trước chén thuốc đêm nay.',
  ]),
  g(5, 'doc', { flags: ['an5_thang'], not: ['vua_benh'] }, 5, 'Gói bột trắng', [
    '{TAY:an5} bỏ gói bột trắng vào chén thuốc sau canh hai, theo lời dặn kèm đơn Thái y Thẩm kê đêm ấy. Chén thuốc đi vòng lối sau, đổi tay hai lần, để không ai nhớ được ai là người cuối cùng cầm nó.',
    'Thẩm vẫn bị nắm thóp như năm nào, vì chưa ai gỡ sợi dây trói ông. Một Thái y còn bị nắm thóp thì kê được cho cả vua.',
    'Phía trên Thẩm là người ở cung trên. Lời khai của kẻ bỏ thuốc chỉ dừng ở đó.',
  ]),
  g(5, 'su11', { flags: ['su11'] }, 6, 'Ba bàn tay năm Hưng Bình thứ tám', [
    'Thái y Thẩm nhìn trang sổ Kiệm bán, và không còn gì để chối. Năm Hưng Bình thứ tám, Thái hậu Lương ra lệnh. Thẩm kê một đơn thuốc cho Chiêu nghi họ Nghiêm. Kiệm bưng chén sang viện chị.',
    'Chén thuốc ấy đến vào một đêm như mọi đêm. Chị đã định nói ra một điều về năm Tân Dậu. Người ở cung Thái hậu biết trước khi chị kịp mở miệng.',
    'Mười hôm sau đám tang, cha bạn vào cung Thái hậu lúc nửa đêm. Một tháng sau, cha nhận ấn Thượng thư. Giờ bạn biết cả hai đêm ấy nối vào nhau thế nào.',
  ]),
  g(5, 'su10', { flags: ['su10'], not: ['su11'] }, 4, 'Từ canh ba đến canh năm', [
    'Mười hôm sau đám tang chị, cha vào cung Thái hậu giữa đêm và ra lúc gần sáng. Không ai ghi hai người nói gì. Chỉ có dòng mực trong sổ ra vào cung, và tờ chiếu một tháng sau trao ấn Thượng thư cho cha.',
    'Kiệm giữ trang sổ ấy hơn mười năm. Ông không bán sớm hơn, vì chưa đến lúc một trang sổ ấy đáng giá bằng một mạng người.',
    'Bạn chưa biết đêm ấy là một cuộc mặc cả hay một lời đe. Bạn chỉ biết từ sau đêm ấy, cha im.',
  ]),
  g(5, 'un', { flags: ['un_bi_bat_an5'] }, 5, 'Nước cờ tự đi', [
    'Ma ma Tạ vào được phòng thuốc ngự là nhờ Uyển Như. Nàng muốn có một người của mình đứng gần Hoàng thượng, và từng nói đùa rằng đó là chỗ người ta chết vì bệnh dễ nhất.',
    'Khi có người ở cung trên dặn ma ma Tạ bỏ thêm thứ gì vào chén thuốc, bà về thưa với Uyển Như. Nàng không ngăn. Hoàng thượng đi trong tay nhà Lương thì nhà Lương mang tội, còn con nàng có đường lên ngai.',
    'Nàng không bỏ thuốc. Nàng chỉ không nói. Cả đời nàng là con cờ của ông chú, và lần ấy nàng muốn tự đi một nước.',
  ]),
  g(5, 'ng', { flags: ['hoi_cha_ng'], not: ['buoc_ng'] }, 3, 'Người nhà Nghiêm trong tẩm điện', [
    'Người theo hầu Hoàng thượng mang họ Nghiêm là người cha gửi vào. Cha bảo để trông chừng Hoàng thượng cho con. Thật ra ông gửi vào một đôi mắt, để có chuyện gì thì ông là người biết sớm nhất.',
    'Người ấy không bưng chén thuốc nào. Nhưng nếu bạn gọi tên người ấy trước linh cữu, cả nhà Nghiêm sẽ đứng chung một tờ án giết vua.',
    'Cha hiểu điều đó hơn ai hết. Nên trong ba ngày ấy, thư cha chỉ dặn: đừng gọi tên ai.',
  ]),
  g(5, 'thuchieu', { flags: ['thu_chieu'] }, 4, 'Bốn chữ trên mép tấu', [
    '"Cho phép xét lại." Hoàng thượng viết bốn chữ ấy mà không hỏi xét án nào. Ngài không cần biết. Ngài chỉ cần tin người cầm tờ giấy.',
    'Chữ của vua đã băng hà vẫn là chữ của vua. Không ai trong triều dám xé nó. Tờ giấy ấy mỏng, nhưng là thứ duy nhất trong rương của bạn mà không ai được phép cãi.',
  ]),
  g(5, 'lv', { flags: ['lv_lo'] }, 4, 'Gói than sau bếp', [
    'Lụa Vàng không xin than. Gói nàng nhận từ tay ma ma cung trên là tiền công của một việc đã làm từ nhiều năm: báo tin trong viện bạn lên trên.',
    'Người ta mua nàng từ những ngày đầu, bằng nợ, bằng sợ, bằng những lời hứa không ai giữ. Nàng hầu bạn thật, cười thật, và báo tin cũng thật. Trong cung, ba việc ấy không loại trừ nhau.',
  ]),
  g(5, 'an', { flags: ['nghi_a5_an'], not: ['buoc_ts'] }, 3, 'Dấu ấn còn tươi', [
    'Gói thuốc gói giấy dầu đã ngả màu, mà dấu ấn phủ Thái sư trên đó đỏ tươi như vừa đóng. Giấy cũ, ấn mới. Ai đó đã lấy một gói thuốc cũ và đóng thêm cái ấn họ cần.',
    'Trước linh cữu, tên Thái sư là cái tên dễ gọi nhất. Ông có lý do, có quyền, và có cả một phe đủ sức nổi loạn nếu bị gọi tên. Người làm gói thuốc ấy biết rõ cả ba điều.',
    'Gọi tên ông thì kinh thành có lửa. Bạn không gọi.',
  ]),

  /* ---------------- Chương 6: Cha ---------------- */
  g(6, 'to', { flags: ['mo_an6'] }, 1, 'Tờ sớ không hỏi', [
    'Tờ sớ không hỏi cha có biết không, vì cả triều đã đoán được câu trả lời. Điều triều đình cần là một cái tên cho tội ấy, và người phải gọi tên là bạn.',
    'Luật có bốn cách gọi một sự im lặng. Cách nào cũng đổi một thứ lấy một thứ: cha chết giữ thể diện thì con mang tội tố cha, con sạch tội thì cha chết như kẻ phản.',
    'Người ta chờ bạn không phải để biết sự thật. Người ta chờ xem con gái ông Nghiêm xử cha theo luật cha dạy thế nào.',
  ]),
  g(6, 'thang', { flags: ['an6_thang'] }, 5, 'Hai đứa con còn lại', [
    'Cha biết từ năm Tân Dậu. Ông biết thêm một lần nữa khi đọc lá thư cuối của chị. Cả hai lần, ông chọn im.',
    'Ông tự nhủ im để giữ hai đứa con còn lại. Một trong hai đứa ấy vào cung thay chỗ chị, ở đúng viện của chị, rồi lớn lên giỏi đọc án như ông. Đó là điều ông sợ nhất suốt từng ấy năm.',
    'Bạn gọi đúng tên tội của cha. Ông tháo đai quan như đặt xuống một gánh nặng, vì cuối cùng có người nói ra điều ông không dám nói.',
  ]),
  g(6, 'noihet', { flags: ['cha_noi_het'] }, 6, 'Thanh nghỉ rồi', [
    'Mười hôm sau đám tang chị, cha vào cung Thái hậu giữa đêm. Bà không giải thích gì, chỉ nói một câu: "Thanh nghỉ rồi. Ông còn hai đứa con."',
    'Câu ấy vừa là lời báo, vừa là lời đe, vừa là cái giá. Một tháng sau cha nhận ấn Thượng thư Bộ Hình, người đứng đầu việc xét án trong nước, trừ án của chính con gái mình.',
    'Năm sau, cha dâng bạn vào cung. Có lẽ ông coi đó là một lời hứa gửi lên cung trên: nhà Nghiêm vẫn ngoan. Ông không ngờ người ta xếp bạn vào đúng viện của chị.',
  ]),
  g(6, 'bienai', { flags: ['nghi_a6_an'], not: ['goi_dong'] }, 3, 'Giấy mới, năm cũ', [
    'Tờ biên nhận vàng của nhà Lương có tên cha, mà giấy còn mới, mực còn mùi. Vàng trả từ hai mươi năm trước thì giấy phải ngả màu từ lâu.',
    'Người làm tờ giấy ấy không cần cha bạn có tội gì. Họ cần ông chết với tội đồng mưu phản nghịch, vì tội ấy kéo theo cả nhà Lương, những người họ muốn hạ từ đầu.',
    'Một tờ giấy giả không làm cha bạn vô tội. Nhưng nó không được phép là thứ đưa ông ra cửa Nam.',
  ]),
  g(6, 'nm', { flags: ['that_a6_nm'] }, 3, 'Lời nói dối của nhũ mẫu', [
    'Nhũ mẫu bảo cha bị ép mà im. Bà nói câu ấy trước khi bạn kịp hỏi, vì bà đã tập nói nó từ lâu.',
    'Không ai ép cha cả. Đêm có thư chị, ông ngồi trong thư phòng đến sáng, rồi tự tay viết chữ "Im". Nhũ mẫu đứng ngoài cửa suốt đêm ấy, và thấy hết.',
    'Bà nói dối để giữ cho ông chút thể diện trước mặt con gái. Bà thương cả hai cha con, mà không biết nên thương bên nào hơn.',
  ]),
  g(6, 'kiem', { flags: ['khai_kiem'] }, 5, 'Món nợ hai nhà', [
    'Năm xưa cha bạn xử một án lớn, nhà Kiệm nằm trong số bị liên lụy. Đàn bà bị sung làm nô, con trai nhỏ bị thiến rồi đưa vào cung. Kiệm là một trong những đứa trẻ ấy.',
    'Ông lớn lên trong cung, giữ sổ, và nhớ từng người họ Nghiêm. Năm Hưng Bình thứ tám, ông bưng chén thuốc sang viện Chiêu nghi họ Nghiêm mà không run tay. Người sai ông ở cung trên. Còn bàn tay không run là của riêng ông.',
    'Bạn trả lại ngôi nhà, và ông khai. Với Kiệm, đó không phải hối hận. Đó là một món nợ hai nhà, cuối cùng đã tính xong.',
  ]),
  g(6, 'thaiy', { flags: ['khai_thaiy'] }, 5, 'Đơn thuốc ông biết là gì', [
    'Năm Hưng Bình thứ tám, người ở cung trên bắt Thái y Thẩm kê một đơn cho Chiêu nghi họ Nghiêm. Ông biết đó là thuốc gì ngay từ vị đầu tiên. Ông vẫn kê, vì vợ con ông ở ngoài thành.',
    'Từ đó, mỗi lần bắt mạch cho em gái chị, tay ông lại run. Bạn đã thấy cái run ấy từ những năm đầu, mà mãi đến giờ mới biết nó từ đâu.',
  ]),
  g(6, 'su11', { flags: ['n6_su11'] }, 6, 'Ô người đứng sau', [
    'Đặt các lời khai cạnh nhau, câu chuyện chỉ còn một cách đọc. Thái hậu Lương ra lệnh. Thái y Thẩm kê đơn. Kiệm bưng chén.',
    'Ba người, ba lý do. Thái hậu giữ ngôi chính cung cho nhà Lương và giữ yên một triều đang chia đôi. Thẩm sợ cho vợ con. Kiệm nhớ một món nợ với nhà Nghiêm.',
    'Còn người thứ tư, người biết mà im, là cha. Ô "người đứng sau" trong hồ sơ chị đã có tên. Ô bên cạnh nó, bạn phải tự đặt tên.',
  ]),
  g(6, 'tutan', { flags: ['cha_tutan', 'cha_noi_het'] }, 4, 'Chén thuốc của cha', [
    'Khay triều đình ban có ba món: dải lụa, chén thuốc, thanh gươm. Cha nhìn cả ba rất lâu.',
    'Ông biết chị đã đi bằng đường nào. Hơn hai mươi năm ông im về chén thuốc ấy. Đến cuối, ông kể hết cho đứa con còn lại, rồi chọn đi đúng con đường của đứa con đã mất.',
  ]),
  g(6, 'hh', { flags: ['n6_hh', 'chet_hoanghau'] }, 3, 'Cây trâm trên bàn', [
    'Bà Lương Thục Nghi đặt cây trâm lên bàn như đặt lại một món nợ. Án của cha bạn sẽ lôi đêm Tân Dậu ra công đường, và lời đồn năm nào sẽ sống lại. Bà không để nó sống.',
    'Tờ di thư chỉ một dòng, nhận lời đồn là của mình, nhận Hựu là con mình. Bà chết để hai câu ấy thành câu cuối cùng người ta được nói về Hựu.',
    'Sáng ra cả cung để tang, và không ai còn dám hỏi Hựu giống ai.',
  ]),
  g(6, 'nguc', { flags: ['cha_nguc', 'chet_cha'] }, 2, 'Một chữ trong sổ ngục', [
    'Sổ ngục ghi cha mất vì bệnh. Hơn hai mươi năm trước, sổ cung cũng ghi chị mất vì bệnh. Hai người trong một nhà, cùng một chữ.',
    'Chữ "bệnh" trong cung này đã nhiều lần đứng thay cho những chữ khác. Lần này có đúng là bệnh không, không ai cho bạn khám để biết.',
  ]),

  /* ---------------- Chương 7: Sổ án cuối (hiện ở màn kết cục) ---------------- */
  g(7, 'che', { flags: ['n7_che'] }, 1, 'Gói chè buộc lạt', [
    'Người gói gói chè ấy đã mất từ nhiều năm, và dặn đúng năm con gái út nhà Nghiêm tóc bạc mới được đưa. Bà ấy biết một hồ sơ như thế không khép được khi người ta còn trẻ.',
    'Ở triều trước, bà {BALAO} đã thấy một đêm giống những gì người đến sau sẽ phải lần theo: một cái viện, một người không được nói, và những chén trà phải nhìn hai lần.',
    'Bà sống qua đêm ấy, mang nó theo suốt đời, và gói nó vào một nắm chè. Sáu mươi năm sau, bà chỉ mong chuyện ấy dừng lại ở đời này.',
  ]),
  g(7, 'thang', { flags: ['an7_thang'] }, 6, 'Đêm chị bị gọi đi', [
    'Đêm mưa năm Tân Dậu, con của Hoàng hậu mất, và một đứa bé khác được bế qua cửa cung chính để nằm vào chỗ ấy. Thái hậu Lương ra lệnh tráo. Chị là người trực đêm, và là người bế đứa bé qua cửa.',
    'Năm Hưng Bình thứ tám, triều bàn lập đứa bé ấy làm Đông cung. Chị không chịu nổi. Chị viết thư về xin cha mở án, nhận về một chữ "Im", và vẫn định nói.',
    'Thái hậu Lương biết trước khi chị kịp mở miệng. Bà cho Thanh nghỉ. Thái y Thẩm kê đơn, Kiệm bưng chén sang viện chị như bưng mọi chén khác. Sổ cung ghi: bệnh.',
    'Bà Lương không ghét chị. Bà đặt chị lên một bàn cân, một bên là nhà Lương và một triều đang chia đôi, bên kia là một phi tần hai mươi tư tuổi. Bà thấy chị nhẹ hơn.',
  ]),
  g(7, 'khan', { flags: ['su12'] }, 5, 'Chiếc khăn màu chàm', [
    'Chiếc khăn quấn trẻ con màu chàm thêu chữ "Đào" là khăn đêm Tân Dậu. Người mẹ thêu tên mình vào góc khăn, quấn con, rồi đứa bé được bế đi, và khăn ở lại.',
    'Chị giữ chiếc khăn ấy suốt năm năm. Đêm chị bị gọi đi, thị nữ Mơ ôm nó chạy ra cửa sau, rồi xuống tóc ở một ngôi chùa ven biển, chờ một người cầm chiếc lược ngà của chị đến hỏi.',
    'Người thêu chữ ấy chưa chết. Nàng chỉ biến mất khỏi sổ, như cái tên bị gạch bằng mực son.',
  ]),
  g(7, 'cha', { flags: ['n7_cha'] }, 4, 'Tờ giấy trong tay cha', [
    'Cha mất năm chín mươi sáu tuổi, ra đi lúc gà gáy, tay còn nắm một tờ giấy gấp tư người nhà không ai dám gỡ. Trên đó chỉ có tên chị, viết đi viết lại, nét run dần về cuối.',
    'Người cả đời không nói về chị, những năm cuối chỉ còn viết tên chị. Ông không xin ai tha. Ông chỉ không quên.',
  ]),
  g(7, 'sot', { flags: ['n7_sot'] }, 4, 'Ô trống trên tờ án', [
    'Người bà gọi tên đã nhúng tay thật vào cái chết của chị, và không chối. Nhưng người ấy chỉ làm theo lời dặn.',
    'Người ở cung trên chưa bao giờ phải tự tay làm gì. Chỉ cần một câu nói, là có người bưng chén, có người kê đơn, có người ghi sổ.',
    'Tờ án khép với một ô trống ở trên cùng. Bà mang ô trống ấy theo đến cuối đời, như một chiếc chìa khóa không tra được vào ổ nào.',
  ]),
  g(7, 'ru', { flags: ['kc_n_106'] }, 4, 'Người hát nối câu sau', [
    'Bên kia tường vườn ngự là dãy nhà của những cung nữ già, những người đã làm việc trong cung từ thời tiên đế còn trẻ.',
    'Câu ru ấy không phải giọng kinh thành. Cả cung chỉ có một đứa trẻ từng hát nó, và đứa trẻ ấy không biết mình học ở đâu.',
    'Người hát nối câu sau thì biết. Bà ấy không bước sang, cũng không gọi. Có những người đã quen sống ở phía bên kia một bức tường.',
  ]),
  g(7, 'chai', { flags: ['kc_n_105'] }, 4, 'Bà già giặt áo ở gian sau', [
    'Bà già giặt áo ở gian sau hát đúng câu Hựu hát năm lên chín. Bà hát rất khẽ, đủ cho một người ngồi sát vách nghe, không đủ cho ai khác.',
    'Mấy chục năm qua, bà giặt áo cho những người không bao giờ hỏi tên mình. Trong cung này, người sống lâu nhất thường là người không ai để ý.',
    'Bà chưa bao giờ gõ cửa. Có lẽ bà cũng đang chờ một người gõ trước.',
  ]),
  g(7, 'khoa', { flags: ['huu_khoa', 'su4', 'su8'] }, 4, 'Người buộc chiếc khóa', [
    'Hựu đeo chiếc khóa trường mệnh từ lúc đỏ hỏn. Người ta bảo mẹ ông buộc, và ông chưa bao giờ hỏi mẹ nào.',
    'Một chiếc khóa trường mệnh buộc vào cổ đứa bé trong đêm đầu tiên là lời cầu của một người mẹ không biết mình còn được gặp con hay không. Người buộc nó chỉ có một đêm làm mẹ, và chỉ kịp làm đúng một việc ấy.',
    'Năm mươi năm nay, ông chưa tháo nó ra lần nào.',
  ]),
  g(7, 'thaihau', { flags: ['an7_thang', 'n7_thg', 'chet_thaihau'] }, 4, 'Chín mươi tư năm', [
    'Bà Lương sống đến chín mươi tư tuổi, vẫn hiền như ngày con gái út nhà Nghiêm vào ra mắt. Suốt từng ấy năm, bà chưa nói sai một chữ nào về chị, vì bà chưa bao giờ nói gì về chị.',
    'Đêm Tân Dậu bà cho tráo một đứa trẻ để giữ ngôi cho nhà Lương. Năm Hưng Bình thứ tám bà cho Thanh nghỉ để giữ đêm Tân Dậu. Hai mệnh lệnh ấy bà mang suốt mấy chục năm, sau những hộp sâm buộc lụa vàng.',
    'Lúc cuối, bà muốn gọi đủ tên chị một lần. Có người ngồi nghe, có người đứng ngoài rèm. Tên chị thì vẫn được gọi.',
  ]),
  g(7, 'balao', { flags: ['thu_balao'] }, 2, 'Hai đêm', [
    'Mảnh giấy lót đáy gói chè là chữ của một người đã ở trong cung từ triều trước. Bà ấy từng thấy một đêm mưa, một cái viện, một người không được nói.',
    'Sáu mươi năm sau, đêm ấy lặp lại, chỉ đổi tên người. Bà ấy đã thấy đêm thứ nhất. Mảnh giấy là cách bà nhờ người khác đừng để có đêm thứ hai.',
    'Bà gói chè cho đúng người, và chờ đúng năm. Người đã sống lâu trong cung biết có những điều chỉ đọc được khi tóc đã bạc.',
  ]),
];
