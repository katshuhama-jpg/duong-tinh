/** Sổ kết cục phần Cung nga giặt áo. Lời kết gọi Đào là "nàng" (chỉ gọi "bà" khi nói về tuổi già). */
import type { Ending, EndArt } from '../types';

export const CN_ENDINGS: Ending[] = [
  { id: 'cn_ao_me', tier: 100, tone: 'vien', name: 'Chiếc áo mẹ giặt', desc: 'Nàng không ghi tên ai, không bán ai, không mang con đi. Mười năm sau, một lệnh tuyển viết bằng nét tay Thái hậu cho nàng trở về viện giặt, và chiếc áo lễ đội mũ của Hoàng trưởng tử qua tay nàng. Cậu cúi chào nàng lâu hơn mọi người, và không biết vì sao.' },
  { id: 'cn_cam_so', tier: 95, tone: 'buon', name: 'Người cầm sổ', desc: 'Nàng hạ được Quế, giữ được cuốn sổ, và ép được cả Thái hậu một lần. Ngày Hựu đội mũ, nàng đứng ngoài phố, và mọi cái tên trong danh sách khách mời đều đã nằm trong sổ nàng. Chiếc áo lễ hôm ấy do người khác giặt. Cuốn sổ trong tay nàng nặng hơn nàng từng nghĩ.' },
  { id: 'cn_chua_bien', tier: 70, tone: 'vien', name: 'Cùng Mơ ra chùa biển', desc: 'Nàng sống những năm còn lại cạnh Mơ ở ngôi chùa lăng ngoài biển. Mơ giữ chiếc khăn thêu chỉ đỏ trong rương kinh, chờ một ngày đưa nó cho đúng người. Nàng không hỏi ngày ấy là ngày nào.' },
  { id: 'cn_quan_nuoc', tier: 65, tone: 'vien', name: 'Quán nước bến sông', desc: 'Lục chèo đò, nàng bán chè ở đúng cái bến năm xưa. Mỗi sáng có xe giặt từ cung ra, và nàng đọc vết trên những chiếc áo đi ngang mà không nói với ai.' },
  { id: 'cn_dua_tin', tier: 55, tone: 'buon', name: 'Người đưa tin hằng năm', desc: 'Nàng giặt thuê đến khi tay không còn vắt nổi. Mỗi năm một lần, Thái y Thẩm dúi vào tay nàng ba chữ: "Còn sống, khỏe." Nàng giữ tất cả các mẩu giấy ấy trong một chiếc hộp, xếp theo năm.' },
  { id: 'cn_cong', tier: 50, tone: 'buon', name: 'Đứng ngoài cổng', desc: 'Dịp lễ nào nàng cũng đứng ở cổng cung, giữa đám đông, nhìn đoàn rước đi qua. Có năm nàng thấy một vạt áo vàng, có năm không thấy gì. Người canh cổng quen mặt nàng, nhưng không ai biết nàng chờ ai.' },
  { id: 'cn_tra_nguoi', tier: 45, tone: 'buon', name: 'Trà gừng nguội', desc: 'Nàng nghe tin Cúc, người bị đẩy xuống viện giặt thay nàng năm ấy, đã mất trong một mùa rét. Từ đó nàng không pha trà gừng nữa, kể cả khi đau bụng.' },
  { id: 'cn_be_nham', tier: 40, tone: 'buon', name: 'Bế nhầm đứa', desc: 'Một canh giờ ấy, nàng ôm nhầm con của người khác ra bến. Nàng sống tiếp, mang theo hai đứa trẻ trong đầu: một đứa nàng sinh ra mà không bế được, một đứa nàng bế mà không phải con mình.' },
  { id: 'cn_con_hen', tier: 60, tone: 'vien', name: 'Con của Hến', desc: 'Nàng đi tìm trang đất đỏ ngoài thành, tìm người đàn bà tên Hến, và kể cho chị nghe về đứa bé chị đã bán đi. Hai người mẹ ngồi với nhau đến tối. Không ai được con về, nhưng có một người biết con mình còn sống.' },
  { id: 'cn_ban_thanh', tier: 30, tone: 'buon', name: 'Bán Thanh lấy một cái tên', desc: 'Tờ giấy của Quế giữ cho tên nàng sạch khỏi mọi danh sách. Nàng sống đủ lâu để thấy nó ố vàng. Sáng nào nàng cũng nhớ tiếng chuông hôm ấy, và chiếc lược ngà.' },
  { id: 'cn_thuyen', tier: 25, tone: 'buon', name: 'Thuyền về bờ cũ', desc: 'Thuyền ra đến giữa sông thì bờ bên kia đã có người chờ. Hoàng trưởng tử về cung trước bữa trưa, như chưa từng rời đi. Nàng bị đưa ra cung, và tên nàng bị xóa khỏi cả bản gốc.' },
  { id: 'cn_loi_muon', tier: 15, tone: 'buon', name: 'Lời nói muộn một cánh cửa', desc: 'Nàng nói ra trước ngự giá điều đáng lẽ nói từ ba năm trước. Kiệm bước lên một bước, và câu ấy không bao giờ đến được tai vua. Đêm ấy nàng bị đưa vào lãnh cung, sống ở đó đến già, không ai đến hỏi một lời.' },
  { id: 'cn_het', tier: 10, dead: true, name: 'Tiếng hét giữa sương', desc: 'Nàng hét cho cả bến nghe, cho lính nghe, cho vua nghe. Người ta bảo một cung nga viện giặt đã phát điên vì mất con. Không ai tin, và sương tan trước khi có ai kịp nhớ nàng đã nói gì.' },
  { id: 'cn_1', tier: 8, tone: 'buon', name: 'Mất con trong im lặng', desc: 'Nàng tin lời bà đỡ, và giặt áo cho cả cung đến khi tóc bạc. Người ta gọi nàng là Đào, rồi bà Đào, rồi không gọi nữa. Sử chép: "Cung nga Đào, hầu trà, mất tích sau đêm Tân Dậu. Không có thẻ."' },
];

export const CN_ART: Record<string, EndArt> = {
  cn_1: {
    bg: 'sangiat',
    place: 'vien',
    time: 'chieu',
    cast: ['me'],
    mood: 'buon',
    motif: 'noi',
    story: 'Sáng nào nàng cũng xuống viện giặt trước khi trời rõ mặt, chỗ thấp nhất trong cung. Áo của cả cung qua tay nàng, từng chiếc một, và nàng biết hết vết trên chúng. Chỉ có một vết nàng chưa bao giờ đọc, vì nàng đã chọn không nhìn. Đến lúc người ta gọi nàng là bà, chiếc áo ấy vẫn chưa có tên chủ.',
  },
  cn_ao_me: { bg: 'sangiat', place: 'vien', time: 'ngay', cast: ['me', 'huu'], mood: 'vui', motif: 'aonau', story: 'Chiếc áo lễ qua tay nàng ba lượt nước, nước cuối cùng là nước ấm. Nàng gấp nó như gấp chiếc tã mười lăm năm trước nàng không được gấp. Ngày đại lễ, cậu thiếu niên mặc nó đi qua hàng người giặt và dừng lại. Không ai nhớ bàn tay ấy là của ai. Chỉ có chiếc áo nhớ.' },
  cn_cam_so: { bg: 'phu', place: 'vien', time: 'ngay', cast: ['me'], mood: 'dac', motif: 'sach', story: 'Nàng đứng ngoài phố, giữa tiếng trống đại lễ. Cuốn sổ trong tay nàng có tên của nửa triều đình, và tên của người đã đặt bẫy nàng ở bến năm ấy. Nàng không cần vào. Những người bên trong đã biết có một người đứng ngoài.' },
  cn_chua_bien: { bg: 'chuabien', place: 'chua', time: 'chieu', cast: ['me', 'mo'], mood: 'binh', motif: 'chuong', story: 'Tiếng chuông chùa lăng mỗi chiều lẫn vào tiếng sóng. Mơ tụng kinh, nàng quét sân, hai người ít khi nói về cung. Có những chiều Mơ mở rương kinh, nhìn chiếc khăn thêu chỉ đỏ, rồi đóng lại.' },
  cn_quan_nuoc: { bg: 'bensong', place: 'lang', time: 'chieu', cast: ['me', 'luc'], mood: 'binh', motif: 'thuyen', story: 'Quán chè có bốn chiếc ghế và một ấm gừng luôn ấm. Lục chèo đò qua lại, mỗi chuyến lại ghé uống một chén. Thỉnh thoảng có người lạ hỏi vì sao quán chỉ bán trà gừng. Nàng cười, không trả lời.' },
  cn_dua_tin: { bg: 'phu', place: 'lang', time: 'chieu', cast: ['me'], mood: 'buon', motif: 'den', story: 'Chiếc hộp gỗ đầy dần những mẩu giấy ba chữ. Năm nào giấy đến muộn, nàng thức trắng. Năm nào giấy đến sớm, nàng cũng thức trắng. Người ngoài phố chỉ biết nàng giặt sạch, và ít nói.' },
  cn_cong: { bg: 'cong', place: 'vien', time: 'ngay', cast: ['me'], mood: 'lo', motif: 'co', story: 'Cổng cung mở ba lần một năm. Nàng đến sớm, đứng ở hàng thứ ba, chỗ nhìn được mà không bị nhìn. Năm nào cũng có người hỏi nàng chờ ai. Năm nào nàng cũng nói: chờ xem đèn.' },
  cn_tra_nguoi: { bg: 'lang', place: 'lang', time: 'dem', cast: ['me'], mood: 'buon', motif: 'chen', story: 'Ấm trà gừng trên bếp nguội dần. Nàng nhớ đôi mắt Cúc hôm bị dẫn đi: không giận, chỉ hiểu. Có những món nợ không có người để trả.' },
  cn_be_nham: { bg: 'lang', place: 'lang', time: 'chieu', cast: ['me'], mood: 'buon', motif: 'gieng', story: 'Nàng sống ở một làng ven sông, nơi không ai biết nàng từng là ai. Mỗi tối nàng hát nửa câu ru cho khoảng không. Hai đứa trẻ lớn lên ở hai nơi nàng không bao giờ được đến.' },
  cn_con_hen: { bg: 'lang', place: 'lang', time: 'chieu', cast: ['me', 'hen'], mood: 'buon', motif: 'trang', story: 'Trang đất đỏ có một người đàn bà gầy tên Hến, ngày nào cũng ra đầu ngõ nhìn đường cái. Nàng ngồi xuống cạnh chị, kể từ đầu. Đến tối, chị hỏi lại một câu duy nhất: "Nó có ăn no không?"' },
  cn_ban_thanh: { bg: 'phu', place: 'lang', time: 'dem', cast: ['me'], mood: 'buon', motif: 'sach', story: 'Tờ giấy có dấu đỏ, có chữ ký, giữ cho tên nàng sạch suốt đời. Nàng cất nó trong hộp gỗ, cạnh một chiếc lược ngà mua lại ở chợ phiên, không giống chiếc kia chút nào.' },
  cn_thuyen: { bg: 'bensong', place: 'lang', time: 'ngay', cast: ['me'], mood: 'buon', motif: 'thuyen', story: 'Con thuyền về lại đúng cái cọc nó đã rời. Đứa bé được bế lên bờ, quấn chăn khô, không khóc. Nàng bị dẫn đi theo một lối khác, và không bao giờ được thấy lại con sông ấy.' },
  cn_loi_muon: { bg: 'lanh', place: 'vien', time: 'dem', cast: ['me'], mood: 'buon', motif: 'den', story: 'Lãnh cung có một ô cửa sổ nhỏ nhìn ra tường. Mỗi năm vào mùa gừng, nàng xin một củ gừng và giã nhỏ, nhưng không có ai để rót chén trà ấy. Người canh cửa đổi ba đời, không ai biết nàng từng nói gì trước ngự giá.' },
  cn_het: { bg: 'bensong', place: 'lang', time: 'ngay', cast: ['me'], mood: 'so', motif: 'trang', story: 'Tiếng hét của nàng vang qua mặt sông, rồi tan vào sương. Sử không chép một chữ nào. Chỉ có người lái đò hôm ấy kể lại rằng có một người đàn bà gọi tên một đứa trẻ, và đứa trẻ đã quay đầu.' },
};
