/**
 * Phần Nghiêm: khi thủ phạm thật là người thân cận của nàng.
 * Muốn xử đúng thì phải tự tay ký án người của mình, và mất luôn một đầu mối.
 * Bộ máy đặt cờ lv_tay (Lụa Vàng bị mua, rồi chính nàng là tay sai của vụ) và lv_bi_bat_<vụ> khi xử đúng.
 * Khi tay sai là Lụa Vàng, bộ máy bỏ thẻ lời khai chung (an2_khai, an3_khai): thẻ ở đây kể lời khai và đặt cờ thay.
 * Ký án mà chưa hỏi gói rễ từ đâu (lv_cam) thì không lật được Thái y qua đường này.
 * Thẻ người thân cận ở chương 4-7 (Lụa Vàng chưa bị bắt, Uyển Như vụ 5, nhũ mẫu, Thái y) nằm ở than47.ts.
 */
import type { Card } from '../types';
const P = 'nghiem' as const;
const G = 'g_quan';

export const NG_THAN: Card[] = [
  {
    id: 'ng_lv_bat2',
    part: P,
    urgent: true,
    chapter: [2],
    when: { flags: [G, 'lv_bi_bat_an2'] },
    place: 'phong',
    img: 'vienchi',
    time: 'dem',
    cast: ['me', 'luavang'],
    mood: 'buon',
    moods: { luavang: 'buon' },
    who: 'luavang',
    lead: 'Trước khi giải đi, người ta cho bạn nói với nó một lần.',
    title: 'Con dao trong tay áo người nhà',
    text: ['Lụa Vàng quỳ, tóc rũ xuống mặt: "Họ bảo cạo một dòng thì xóa nợ. Con không biết dòng ấy là của ai."', '"Nương nương không cho con tiền. Con chỉ còn đường ấy."'],
    omen: 'Người đứng gần nhất cũng là người cầm dao gần nhất.',
    choices: [
      { t: 'Ký tờ án, để nó bị đuổi khỏi cung', fx: { d: { duc: -2, muu: 4, hanh: -40 }, flag: ['di_luavang', 'lv_ky_an', 'cuu_tainhan', 'n2_khep'] }, note: 'Bạn ký, tay không run. Tài nhân viện Đông được thả. Đến cổng Tây nó còn quay lại vái một vái, và từ đêm ấy viện bạn không còn ai thức khuya cùng.' },
      { t: 'Hỏi lần cuối: ai đưa dao', fx: { d: { muu: 3, hiem: 6, hanh: -40 }, flag: ['di_luavang', 'biet_kiem', 'bai_kiem', 'biet_ban_goc', 'su3', 'lv_ky_an', 'cuu_tainhan', 'n2_khep'] }, note: '"Người ở chiếu bạc bên kho sổ. Ông ấy nói chưởng sự giữ bản gốc, cả một rương sổ cũ có vết cạo." Nó bị giải đi khi trời chưa sáng. Bạn giữ lời khai ấy làm con bài với Kiệm.' },
      { t: 'Xin cho nó ở lại làm tì ở viện Hoán Y', need: { num: { an: [20, 100] } }, lockHint: 'Cần Ân sủng từ 20 để xin', fx: { d: { an: -10, duc: 4, hanh: -20 }, flag: ['di_luavang', 'lv_hoany', 'cuu_tainhan', 'n2_khep'] }, note: 'Ân của bạn đổi được cho nó một chỗ giặt áo. Tài nhân viện Đông được thả. Nó sống, nhưng không còn là người của viện bạn nữa.' },
    ],
  },
  {
    id: 'ng_lv_bat3',
    part: P,
    urgent: true,
    chapter: [3],
    when: { flags: [G, 'lv_bi_bat_an3'] },
    place: 'phong',
    img: 'lanh',
    time: 'dem',
    cast: ['me', 'luavang'],
    mood: 'buon',
    moods: { luavang: 'so' },
    who: 'luavang',
    lead: 'Mưu hại long thai là tội chém. Người ta chỉ cho bạn vào ngục một khắc.',
    title: 'Gói rễ thuốc trong vạt áo',
    text: ['Lụa Vàng run đến không nói thành tiếng: "Họ bảo chỉ làm nương nương mệt vài hôm. Con không biết nó giết được người."', '"Con xin nương nương, đừng để người ta bêu đầu con ở chợ."'],
    omen: 'Người đứng gần nhất cũng là người cầm dao gần nhất.',
    choices: [
      { t: 'Ký án, để luật đi đúng đường của nó', fx: { d: { duc: -4, muu: 4, hanh: -60 }, flag: ['chet_luavang', 'lv_ky_an', 'n3_khep', 'lv_cam'] }, note: 'Bạn ký. Sáng hôm sau trời rất trong. Bạn không ra chợ, nhưng cả cung nghe tiếng trống. Gói rễ ấy từ đâu ra, giờ không còn ai kể.' },
      { t: 'Xin ban cho nó dải lụa trắng, chết giữ toàn thây', need: { num: { an: [20, 100] } }, lockHint: 'Cần Ân sủng từ 20 để xin', fx: { d: { an: -12, duc: 3, hanh: -60 }, flag: ['chet_luavang', 'lv_lua', 'n3_khep', 'lv_cam'] }, note: 'Hoàng thượng chuẩn. Nó chết trong ngục, mặt hướng về phía viện bạn. Bạn giữ lại chiếc trâm gỗ của nó, và câu hỏi chưa kịp hỏi.' },
      { t: 'Hỏi lần cuối: gói rễ ấy từ đâu', fx: { d: { muu: 4, hiem: 8, hanh: -60 }, flag: ['chet_luavang', 'biet_thaiy', 'bai_thaiy', 'lv_ky_an', 'n3_khep'] }, note: '"Từ phòng thuốc. Thái y đưa, mắt ông còn sợ hơn con." Bạn ra khỏi ngục, mang theo một cái tên nặng hơn tên nó, và một lời khai đủ để Thái y phải cúi đầu.' },
    ],
  },
];
