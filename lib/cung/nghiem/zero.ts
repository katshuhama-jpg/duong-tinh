/**
 * Phần Nghiêm: cảnh cảnh báo khi chỉ số chạm đáy (Hiểm chạm đỉnh). Lần sau chạm nữa thì khép đời.
 * Engine gán thẻ này trực tiếp, không qua lọc người đã chết/đã đi, nên chỉ có nữ chính trong cảnh và chữ không nhắc ai khác.
 */
import type { Card } from '../types';
const z = (k: string, title: string, text: string[], a: string, an: string, fx: Card['choices'][number]['fx'], b: string, bn: string, fx2: Card['choices'][number]['fx']): Card => ({
  id: `w0n_${k}`,
  part: 'nghiem',
  step: true,
  chapter: [1, 2, 3, 4, 5, 6, 7],
  place: 'phong',
  img: 'vienchi',
  time: 'dem',
  cast: ['me'],
  mood: 'so',
  title,
  text,
  choices: [
    { t: a, fx, note: an },
    { t: b, fx: fx2, note: bn },
  ],
});
export const NG_ZERO: Card[] = [
  z('an', 'Viện bị quên', ['Ba tháng không ai nhắc tên bạn. Ở các viện khác, người ta đã quên có viện này.', 'Bạn biết: lần sau mà bị quên nữa thì quên luôn.'], 'Thêu một túi hương gửi lên Hoàng thượng', 'Túi hương được nhận. Chưa ai gọi, nhưng tên bạn đã có lại trong sổ.', { d: { an: 12 } }, 'Thôi, không cần ai nhớ', 'Bạn chọn yên lặng. Lần sau, sẽ không có lần cảnh báo nào nữa.', { d: { an: 4, duc: 2 } }),
  z('duc', 'Tiếng xấu', ['Cả hậu cung bảo con gái ông Nghiêm vô lễ, hay xét nét người khác.', 'Ma ma dạy lễ đã ghi tên bạn vào sổ răn.'], 'Lên chùa trong cung chép kinh ba ngày', 'Ba ngày chép kinh, tiếng xấu nhạt đi một chút.', { d: { duc: 12, an: -3 } }, 'Mặc kệ họ nói', 'Họ không nói nữa. Họ bắt đầu viết sớ.', { d: { duc: 3 } }),
  z('the', 'Không còn ai đứng sau', ['Phủ Nghiêm không gửi gì vào nữa. Người hầu bắt đầu xin đổi viện.', 'Bạn nghe họ thì thầm sau rèm: nhà Nghiêm bỏ con gái rồi.'], 'Viết thư xin lỗi cha', 'Cha gửi vào một rương lụa, không một chữ. Nhưng người ta thấy rương ấy.', { d: { the: 12, cha: 5 } }, 'Tự đứng một mình', 'Bạn đứng một mình. Trong cung, đứng một mình thì ngã rất nhanh.', { d: { the: 3, muu: 2 } }),
  z('muu', 'Mắt mờ', ['Bạn không còn biết ai đang nói gì về mình. Tin nào đến tai, bạn cũng không phân được thật giả.', 'Đêm qua có người thử mở cửa sổ viện bạn.'], 'Bỏ tiền mua tai mắt', 'Hai cung nữ ở chái sau nhận tiền của bạn. Từ nay bạn lại có tai.', { d: { muu: 12, tien: -20 } }, 'Đóng cửa, không ra ngoài', 'Bạn đóng cửa. Người ta vẫn có chìa.', { d: { muu: 3 } }),
  z('sac', 'Tiều tụy', ['Gương đồng của chị soi ra một khuôn mặt hốc hác. Ma ma bảo phi tần mà tiều tụy là bất kính.', 'Người ta đã bàn đưa bạn ra chùa trong cung.'], 'Nghỉ ngơi, ăn uống lại', 'Hai tháng sau má bạn hồng lại một chút.', { d: { sac: 12, muu: -2 } }, 'Không cần đẹp nữa', 'Bạn không cần. Nhưng sổ cung thì cần.', { d: { sac: 3 } }),
  z('hiem', 'Họ đã biết', ['Có ai đó để lại trên gối bạn một sợi dây buộc rèm, thắt sẵn nút.', 'Bạn đào sâu quá rồi. Họ biết hết rồi.'], 'Dừng tay, đốt hết giấy tờ đã ghi', 'Bạn đốt sạch. Người ta thấy khói, và tạm yên lòng.', { d: { hiem: -40, muu: -5 } }, 'Không dừng', 'Bạn giữ sợi dây lại. Lần sau, họ sẽ không để lại lời cảnh báo nữa.', { d: { hiem: -10, muu: 3 } }),
];
