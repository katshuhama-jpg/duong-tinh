# Viết thẻ cho game cung đấu "Phượng Thành" (tên tạm)

Đọc `lib/cung/types.ts` (kiểu `Card`, `Choice`, `Fx`, `Cond`) và `lib/cung/world.ts` (bậc, chặng, tên người) trước.

## Bối cảnh
- Triều đại hư cấu, niên hiệu **Khánh Vân**, kinh thành **Phượng Thành**. Không dùng tên người, tên cung điện, tên làng có thật (không Ỷ Lan, Thượng Dương, Thổ Lỗi, Diên Thọ, Đoan Trang, Thăng Long, Huế...).
- Nhân vật chính: người chơi là "bạn" (ngôi thứ hai), vào cung năm 18 tuổi theo một trong bốn đường (xem mục "Bốn đường vào cung"). Mạch gốc là đường dân nữ: **Diệp**, cô gái làng Mai Đông (hư cấu), nhà làm chè, gặp vua khi vua đi lễ chùa Vân Tịch cầu tự.
- Người quanh mình (khóa `CastK`):
  - `vua`: Hoàng thượng, ngoài 30, hiền nhưng nhu, sức yếu, mãi chưa có con với hoàng hậu.
  - `thaihau`: Thái hậu, mẹ vua, nghiêm, trọng lễ.
  - `hoanghau`: Hoàng hậu họ Tôn, con nhà quyền thần (Thái phó Tôn), không có con. Lạnh, kiêu, nhưng không ác hẳn.
  - `thucphi`: Thục phi họ Vũ, đối thủ chính, đã có con trai trưởng là **Hoàng tử Nghĩa**; sắc sảo, giỏi mua chuộc.
  - `hanh`: thị nữ Hạnh, theo hầu bạn, trung thành nếu được đối tốt.
  - `phuc`: thái giám Phúc, giữ sổ ghi ngày vua đến các viện và lo treo đèn trước cửa người được gọi. Tham tiền.
  - `mama`: ma ma họ Trịnh dạy lễ ở viện Nghi Lễ.
  - `quan`: Thái phó Tôn (cha hoàng hậu) và phe quan văn.
  - `tuong`: Tướng quân Lê Trực, trấn biên.
  - `su`: sư bà chùa Vân Tịch.  `meday`: mẹ đẻ ở quê.  `cungnu`: một cung nữ khác.  `con`: con của bạn.
- Chỗ (`PlaceK`): `vien` sân viện, `phong` trong phòng, `vuon` vườn ngự có hồ sen, `dien` điện chầu, `chua` chùa, `lang` làng quê, `lang_mo` lăng mộ.

## Bốn đường vào cung
Xem `lib/cung/origins.ts`. Mỗi đời có đúng một cờ đường `g_*`, đặt từ lúc vào cung.

| Cờ | Đường | {ho} | {goc} | {que} | {me} | Vào bậc | Cờ kèm |
|---|---|---|---|---|---|---|---|
| `g_dan` | Dân nữ được tuyển (mạch gốc) | Diệp | gái làng chè | làng Mai Đông | mẹ | Tài nhân chưa nhập giai | |
| `g_quan` | Con quan dâng vào | Đoàn | con gái quan Thượng thư | phủ Thượng thư họ Đoàn | cha | Mỹ nhân | |
| `g_cung` | Cung nga giặt áo | Lương | cung nữ giặt áo | viện Hoán Y | bà Tư giặt áo | cung nga, không phẩm | `cung_nga` (gỡ khi được nâng lên Tài nhân) |
| `g_chua` | Công chúa triều trước | Lạc | công chúa triều Hưng cũ | cố đô Hưng Thành | nhũ mẫu | Tiệp dư | `nghi_ky` |

Quy ước:
- **Chặng 1-2 riêng mỗi đường.** Ngã rẽ lớn chặng 1-2 của mạch gốc (`b1_*`, `b2_*` trong `big.ts`) chỉ chạy với `g_dan`. Mỗi đường khác viết chặng 1-2 của mình trong `content/origin_<khóa>.ts`. Chuyện khẩn (`c_ghen`, `c_phe`) dùng chung.
- **Chặng 3-7 dùng chung.** Thẻ chung không được viết chữ chỉ đúng với một đường. Dùng token `{ho}` `{goc}` `{que}` `{me}`, engine thay theo đường (`fillText`). Đặt token giữa câu, đừng mở câu bằng token vì chữ thay vào là chữ thường. Câu nào chỉ hợp một đường (nương chè, mẹ đi chợ, em đi phu) thì gắn cả thẻ `when: { flags: ['g_dan'] }`.
- Thẻ nhỏ giả định mình đã là phi tần (học lễ, đèn đỏ, sổ đến thăm, lương viện) thì thêm `not: ['cung_nga']`.
- Thẻ riêng của một đường: `when.flags` có cờ `g_*` của đường đó, ngã rẽ lớn chen vào mạch chung bằng `after`/`before`. Tiền tố id: `d2_` dân nữ, `q` con quan, cung nga và công chúa theo file của mình. Kết cục riêng xuất `ENDINGS_<KHÓA>` rồi nối vào `ALL_ENDINGS` trong `world.ts`.
- Đường dân nữ (`origin_dan.ts`): tuyến "Người cũ ở cửa Tây", Khoan là trai làng làm lính canh. Cờ `dn_khoan` (Khoan còn ở kinh), `dn_tai_mat` (Khoan làm tai mắt). Kết cục `e_dan_thuyen`, `d_dan_ben`.

## Chặng và tuổi
1 Nhập cung (16-17) · 2 Được gọi (17-20) · 3 Mang thai (19-24) · 4 Ngôi Đông cung (22-30) · 5 Vua băng (28-36) · 6 Buông rèm (32-50, chỉ khi bạn nhiếp chính, có cờ `nhiep`) · 7 Tuổi già (45-70).

## Chỉ số (`NumK`, thang 0-100 trừ `tien` tính bằng quan)
- `duc` Đức (giữ lễ), `sac` Sắc, `the` Thế (chỗ dựa, nhà mẹ đẻ), `an` Ân sủng (nguy hiểm ở cả hai đầu: quá cao bị ghen hại, quá thấp bị quên), `muu` Mưu (tai mắt, mưu trí).
- Quan hệ: `vua`, `thaihau`, `hoanghau`, `thucphi`, `hanh`, `phuc`, `quan`, `tuong`.
- `tien`: tiền riêng (quan). Lương năm theo bậc 120-1000 quan. Một lần mua chuộc thái giám 20-80 quan.
- Mức thay đổi thường: thẻ nhỏ ±3 đến ±10; mạnh tay ±15.

## Cờ dùng chung (chỉ dùng những cờ này, hoặc cờ riêng có tiền tố `s_` cho chuyện nhỏ)
- `biet_bimat_thucphi`: bạn biết một bí mật của Thục phi (mở lựa chọn khóa ở ngã rẽ "bị vu cáo"). Chỉ 1-2 thẻ nhỏ chặng 2 đặt cờ này.
- `ket_tuong`: đã kết giao với tướng Lê Trực.  `giac`: có giặc ngoài biên (chặng 4-5).
- `han_han`: năm hạn hán.  `hanh_phan`: Hạnh đã phản bạn.  `phuc_mua`: đã mua chuộc được Phúc.
- `thu_thucphi`: Thục phi đã thành kẻ thù không đội trời chung.  `say_thai`: từng sảy thai.
- Cờ đường: `g_dan`, `g_quan`, `g_cung`, `g_chua`; `cung_nga` (còn là cung nga), `nghi_ky` (bị nghi kỵ vì là người triều cũ).
- Cờ chốt kết cục cuối đời: `kc_<id kết cục>` (cờ đặt sau cùng thắng).

### Cờ tuyến phụ đang dùng
Tuyến sử Việt (`routesVN.ts`, tiền tố `h_`):
- `h_hoa_than` nhận đi hòa thân Sa Hải; `h_mang_hanh` mang Hạnh theo.
- `h_giam_quoc` đã cầm ấn giám quốc; `h_dan_ca` dân đặt vè khen; `h_an_giam` bị thu ấn; `h_giu_viec` xin giữ việc nước sau khi vua về.
- `h_hoc_si` làm nữ học sĩ (mở án vườn Quế).
- `h_em_quan` em trai vào triều; `h_ho_diep` nhà ngoại đã đổi ngôi (tên cờ giữ chữ "diep" để không vỡ bản lưu, nội dung dùng `{ho}`); `h_diet_em` đã trừ em trai.
- `h_doi_ho` con gái lên ngôi rồi nhường cho họ Tôn; `h_ton_that` gọi tôn thất họ cũ về giữ ngôi.

Tuyến sử Trung - Hàn (`routesCN.ts`, tiền tố `t_`):
- `t_ngu_duoc` được giữ lại Ngự dược phòng (cùng `nu_y`).
- `t_ac_ve` từ chùa về cung giữ sổ, rồi giữ tấu chương.
- `t_chay_tay` có người nhà bỏ trốn theo giặc trên đường chạy về Tây.
- `t_yem_bua` đã nhờ bà đồng chôn hình nhân; `t_bi_to` bị tố yểm bùa.
- `t_mr_khan` đã gửi con chiếc khăn thêu chữ `{ho}` (tuyến mẹ ruột).
- `t_nu_su` làm nữ sử; `t_but_cong` chép sử theo ý vua.

## Viết thẻ nhỏ
- Mỗi thẻ: `chapter` (1 hay vài chặng), `place`, `time`, `cast` (1-3 người, `me` luôn đứng đầu nếu có mặt), `who` (người nói), `title` ngắn (2-5 chữ), `text` **tối đa 2 câu ngắn**, đúng **2 lựa chọn**, mỗi lựa chọn có `note` một câu kể hệ quả.
- Lựa chọn phải là **đánh đổi thật**: không có cái nào tốt hẳn. Một bên lợi chỗ này hại chỗ kia.
- Có thể dùng `when` để giới hạn (`rankMin`, `num: { an: [0, 30] }`, `flags`, `not`...), `risk` cho lựa chọn may rủi, `need` + `lockHint` cho lựa chọn cần điều kiện (thẻ nhỏ vẫn chỉ 2 lựa chọn tổng).
- Thẻ nhỏ **không** đặt `end` (không kết thúc đời), không đổi `chapter`.
- Có thẻ êm (thêu thùa, Tết, nhớ nhà, mẹ gửi thư, cung nữ già kể chuyện), có thẻ căng (tin đồn, quà tặng có ý đồ, sổ thị tẩm bị sửa, thị nữ bị mua chuộc). Khoảng 1/3 êm, 2/3 căng.
- Đúng thời: không áo dài, không "lật thẻ bài", không "lãnh cung" (gọi là "viện Lạc Mai ngoài góc thành"), không đồ Tây. Đồ vật hợp: trầu cau, trà sen, hộp sơn mài, quạt giấy, khăn lụa, trâm cài, đèn lồng, sổ đến thăm, chiếu chỉ, hương trầm, đàn nguyệt, cờ tướng, bánh phu thê, chè hạt sen.
- Giọng văn: ngôi thứ hai "bạn", câu ngắn, kịch tính kiểu phim ngắn cung đấu nhưng chữ Việt tự nhiên. Dùng "-" không dùng "—". Không emoji, không icon.
- Lời thoại trong ngoặc kép, xưng hô cung đình: "Hoàng thượng", "thần thiếp", "nương nương", "bản cung", "nô tỳ", "cô" (người trên gọi người dưới).

## Định dạng file
Một file TypeScript xuất mảng:

```ts
import type { Card } from '../types';
export const CARDS_A: Card[] = [
  {
    id: 's_quatbui',
    chapter: [1, 2],
    place: 'vien',
    time: 'chieu',
    cast: ['me', 'cungnu'],
    who: 'cungnu',
    title: 'Chiếc quạt giấy',
    text: ['Một cung nữ lạ dúi vào tay bạn chiếc quạt giấy vẽ hoa sen.', '"Thục phi nương nương thấy cô nóng, ban cho."'],
    choices: [
      { t: 'Nhận, cảm tạ nương nương', fx: { d: { thucphi: 5, duc: 3 } }, note: 'Tối ấy mở quạt ra mới thấy mặt sau vẽ một con rắn nhỏ.' },
      { t: 'Từ chối, nói mình không quen dùng quạt', fx: { d: { thucphi: -8, muu: 4 } }, note: 'Cung nữ cúi đầu đi, ngoái lại một lần.' },
    ],
  },
];
```

Kiểm tra: `npx tsc --noEmit -p .` phải không lỗi.
