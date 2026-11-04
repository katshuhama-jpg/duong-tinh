import type { EndArt } from '../types';

/** tranh và lời dẫn cho các kết cục mới của rivals_c (Ninh mỹ nhân, Hiền phi, Uyển tần) */
export const RIVALS_C_ART: Record<string, EndArt> = {
  d_rc_chieu_cu: {
    place: 'phong',
    time: 'dem',
    cast: ['ninh'],
    mood: 'buon',
    motif: 'chieu',
    story:
      'Đêm giỗ cha, {ho} thị ăn đĩa bánh gai người bạn cùng đợt tuyển mang sang. Hai người từng chung một chiếc chiếu, chia nhau nửa cái bánh đêm đầu vào cung. Ninh ngồi ôm bạn đến sáng, khóc thật, rồi tự tay vuốt mắt cho bạn. Sổ cung chép là cảm hàn. Về sau Ninh lên tới tần, nhưng không bao giờ ăn bánh gai nữa.',
  },
  d_rc_giao_mac: {
    place: 'vien',
    time: 'dem',
    cast: ['tuong', 'hienphi'],
    moods: { tuong: 'gian', hienphi: 'dac' },
    motif: 'kiem',
    story:
      'Đêm ấy cổng Tây không đóng, giáp sĩ họ Mạc đi qua sân viện {ho} thị lặng như mèo. Sáng ra người ta thấy bà nằm dưới gốc mai, áo lễ còn nguyên, sử chép là mất vì bạo bệnh. Hiền phi khóc to nhất trong đám tang, tự tay chép kinh siêu độ. Ở chùa Vân Tịch, hàng đèn không tên của nàng có thêm một ngọn.',
  },
  e_rc_lanh_cung: {
    place: 'vien',
    time: 'dem',
    cast: ['me'],
    mood: 'buon',
    motif: 'trang',
    story:
      'Chiếu giáng ghi {ho} thị tư thông với một gã thổi tiêu bà chưa từng gặp trước đêm ấy. Lãnh cung có một cây hòe già và một cái giếng cạn, bà sống ở đó gần ba mươi năm. Đêm trăng, bên kia tường lại vẳng lên đúng khúc tiêu năm nào. Bà không biết ai thổi, chỉ biết người múa theo khúc ấy đã lên tới phi.',
  },
};
