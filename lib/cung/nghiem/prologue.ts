/**
 * Chín khung Hưng Bình: kể chín năm trước khi nữ chính vào cung, mỗi năm một khung tranh.
 * Mỗi khung giấu một chi tiết (không nói thành chữ). Xem kinh thánh mục 1.
 * Và lời kể trước các sự kiện lớn của phần Nghiêm.
 */
import type { Life } from '../types';
type Tale = NonNullable<Life['tales']>[number];

const K = 'Hưng Bình';
export const NG_PROLOGUE: Tale[] = [
  {
    kicker: `${K} năm thứ nhất`,
    t: 'Ngai mới',
    s: { bg: 'trieu', time: 'ngay', cast: ['vua', 'thaisu', 'cha'], imgs: { vua: 'vua_hb0', thaisu: 'thaisu0', cha: 'cha0' }, moods: { vua: 'lo', thaisu: 'binh', cha: 'binh' }, prop: 'hopan' },
    lines: ['Tiên đế băng hà. Vua mới mười sáu tuổi, áo tang trắng còn khoác ngoài long bào.', 'Ấn ngọc nằm trong tay Thái sư. Ở hàng quan cuối điện, có một ông Thị lang Bộ Hình đứng rất thẳng.'],
  },
  {
    kicker: `${K} năm thứ hai`,
    t: 'Chị vào cung',
    s: { bg: 'congphu', time: 'ngay', cast: ['thanh', 'me', 'nhumau'], imgs: { thanh: 'thanh', me: 'hn0' }, moods: { thanh: 'vui', me: 'buon', nhumau: 'buon' } },
    lines: ['Chị vào cung năm chị mười tám. Chị ngoái lại một lần trước khi bước lên kiệu.', 'Em đứng sau lưng nhũ mẫu ở cổng phủ đến khi kiệu khuất.'],
  },
  {
    kicker: `${K} năm thứ ba, năm Tân Dậu`,
    t: 'Đêm mưa',
    s: { bg: 'hanh', time: 'dem', cast: [], rain: true, prop: 'bocta' },
    lines: ['Năm Tân Dậu, Hoàng hậu sinh Hoàng trưởng tử. Cả kinh thành đốt pháo ba ngày.', 'Đêm ấy mưa rất to. Không ai nhớ ai đã đi qua hành lang cung Hoàng hậu lúc canh tư.'],
  },
  {
    kicker: `${K} năm thứ tư`,
    t: 'Lễ thôi nôi',
    s: { bg: 'dien', time: 'ngay', cast: ['thaihau', 'hoanghau', 'thanh'], imgs: { thaihau: 'thaihau_l0', hoanghau: 'hoanghau_l0', thanh: 'thanh' }, moods: { thaihau: 'vui', hoanghau: 'buon', thanh: 'lo' } },
    lines: ['Hoàng trưởng tử thôi nôi. Thái hậu bế cháu không rời tay.', 'Cả điện cười nói. Chị đứng ở cuối hàng phi tần, không cười.'],
  },
  {
    kicker: `${K} năm thứ năm`,
    t: 'Thư chị',
    s: { bg: 'phonghoc', time: 'dem', cast: ['me'], imgs: { me: 'hn0' }, moods: { me: 'binh' } },
    lines: ['Thư chị gửi về mỗi mùa một lá. Lá nào cũng nói trong cung vui.', 'Có một lá có dòng bị bôi mực rất đậm. Em soi đèn mãi mà không đọc ra.'],
  },
  {
    kicker: `${K} năm thứ sáu`,
    t: 'Hồ sen',
    s: { bg: 'vuon', time: 'chieu', cast: ['thanh', 'huu', 'dao'], imgs: { thanh: 'thanh2', huu: 'huu0' }, moods: { thanh: 'buon', huu: 'vui' } },
    lines: ['Chị lên Chiêu nghi. Người trong cung bảo chị hiền, chỉ hay ngồi một mình bên hồ sen.', 'Hoàng trưởng tử hay chạy sang chơi, vừa chạy vừa hát một câu ru lạ tai.'],
  },
  {
    kicker: `${K} năm thứ bảy`,
    t: 'Ông Nghiêm sắt',
    s: { bg: 'trieu', time: 'ngay', cast: ['cha', 'thaisu'], imgs: { cha: 'cha0', thaisu: 'thaisu0' }, moods: { cha: 'gian', thaisu: 'dac' } },
    lines: ['Cha quỳ giữa triều, giơ cao tờ sớ hặc Thái sư. Cả triều cúi đầu, chỉ cha ngẩng.', 'Từ đó người ta gọi cha là ông Nghiêm sắt. Sau rèm, có một người đã ghi nhớ tên cha.'],
  },
  {
    kicker: `${K} năm thứ tám`,
    t: 'Lá thư cuối',
    s: { bg: 'thuphong', time: 'dem', cast: ['cha', 'mo'], imgs: { cha: 'cha' }, moods: { cha: 'buon' }, prop: 'giay' },
    lines: ['Năm ấy chị gửi về lá thư cuối. Cha đọc dưới đèn rất lâu, rồi viết trả lời bằng một nét bút.', 'Một tháng sau, sổ cung ghi chị mất vì bệnh. Hai mươi bốn tuổi.'],
  },
  {
    kicker: `${K} năm thứ chín`,
    t: 'Viện của chị',
    s: { bg: 'vienchi', time: 'chieu', cast: ['me', 'nhumau'], imgs: { me: 'hn1' }, moods: { me: 'lo', nhumau: 'so' } },
    lines: ['Năm sau, cha dâng em vào cung, thay chỗ chị.', 'Người ta xếp em ở đúng viện cũ của chị. Như thể chưa từng có ai chết ở đây.'],
  },
];

/** lời kể trước các sự kiện lớn (theo id thẻ) */
export const NG_TALES: Record<string, { t: string; lines: string[]; s?: Tale['s'] }> = {
  n1_an: {
    t: 'Lệ xét chuyện trong cung',
    s: { bg: 'chaisau', time: 'ngay', cast: [] },
    lines: [
      'Trong cung, người chết không ra công đường. Chưởng sự nội vụ ghi một dòng vào sổ, ma ma khám xác, rồi chuyện khép lại trước bữa trưa.',
      'Nhưng phi tần có bậc được quyền trình lên một tờ, xin xét lại. Tờ trình ấy có thể cứu một cái tên, cũng có thể đưa người trình vào chỗ chết.',
      'Bạn là con gái ông quan Bộ Hình. Cả hậu cung đang chờ xem bạn có trình hay không.',
    ],
  },
  n1_xu: {
    t: 'Tờ trình',
    s: { bg: 'vienchi', time: 'dem', cast: [] },
    lines: [
      'Cha dạy: án không đủ chứng thì đừng xử, vì người bị oan sẽ chết một lần, còn người xử oan sẽ chết nhiều lần.',
      'Cha cũng dạy: trong cung, kẻ thủ ác không chờ công đường. Nếu bạn gọi tên mà không giữ được tên ấy, đêm nay họ sẽ đến tìm bạn.',
    ],
  },
};
