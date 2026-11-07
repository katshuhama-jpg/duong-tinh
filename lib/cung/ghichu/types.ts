/** Ghi chú "Chuyện chưa ai kể": hiện cuối mỗi chương, giải nghĩa những chi tiết người chơi đã gặp. */
import type { Cond } from '../types';
export interface GhiChu {
  id: string;
  /** phần chơi: 'che' (cô gái chè) hoặc 'nghiem' (Con tin họ Nghiêm) */
  part: 'che' | 'nghiem';
  /** hiện vào cuối chương này (ghi chú chương 7 hiện ở màn kết cục) */
  chapter: number;
  /** điều kiện: chỉ hiện khi đời này đã gặp chi tiết ấy (thường là cờ do lựa chọn đặt) */
  when: Cond;
  /** ưu tiên khi một chương có nhiều ghi chú (lớn hơn hiện trước). Mặc định 1 */
  w?: number;
  title: string;
  /** 2-4 đoạn văn xuôi ngắn, giọng người kể chuyện */
  text: string[];
}
