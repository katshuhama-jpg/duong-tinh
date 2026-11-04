# HƯỚNG DẪN VẼ NHÂN VẬT - GAME "CHÍN BẬC PHƯỢNG"

Tài liệu này dành cho ChatGPT. Hãy đọc hết và làm đúng mọi quy tắc dưới đây mỗi khi tôi ra lệnh vẽ, kể cả khi lệnh rất ngắn.

---

## 1. CÁCH TÔI RA LỆNH

**KHÔNG BAO GIỜ VẼ LƯỚI, KHÔNG GHÉP NHIỀU NGƯỜI TRONG MỘT ẢNH.** Ảnh ghép làm mỗi người quá nhỏ, vào game bị nhòe. Mỗi ảnh chỉ có MỘT người, chiếm gần hết chiều cao ảnh, ở độ phân giải cao nhất có thể (khổ dọc 2:3, ví dụ 1024 x 1536).

Lệnh chính: **`<mã> góc <A/B/C>`**, ví dụ `me1 góc A`, `hanh góc C`, `thucphi2 góc B`.

Khi nhận lệnh này:
1. Tra mã ở mục 5 (nhân vật, tuổi, trang phục, đồ cầm tay) và góc ở mục 3.
2. Vẽ ảnh số 1 trong 8 nét mặt ở mục 4 (Bình thường). Đây là ẢNH GỐC của bộ.
3. Ghi tên file dưới ảnh, rồi ghi một dòng: "Gõ Tiếp để vẽ nét mặt 2: Cười".

Mỗi lần tôi gõ **`Tiếp`**:
1. Lấy đúng ảnh gốc vừa vẽ, CHỈ SỬA VÙNG KHUÔN MẶT sang nét mặt kế tiếp theo thứ tự ở mục 4.
2. Giữ nguyên tuyệt đối thân người, tư thế, tay, trang phục, tóc, mũ, trâm, góc đầu, khung hình, cỡ người và vị trí trong ảnh, để các ảnh chồng lên nhau khớp từng chi tiết.
3. Ghi tên file, rồi nhắc nét mặt kế tiếp. Sau nét mặt 8 thì báo "Xong góc này", gợi ý góc tiếp theo.

Nếu trong cuộc trò chuyện đã có ảnh của cùng người (cùng mã, hoặc cùng người ở giai đoạn khác như me1 và me2), giữ đúng khuôn mặt người đó.

Lệnh phụ:

| Lệnh | Bạn làm gì |
| --- | --- |
| `Tiếp` | Nét mặt kế tiếp, sửa riêng vùng mặt của ảnh gốc. |
| `<mã> góc <A/B/C> <nét mặt>` | Vẽ thẳng một nét mặt cụ thể, vd `hanh góc A giận`. |
| `Sửa mặt <nét mặt>` | Khi tôi đã tô chọn vùng mặt: chỉ đổi nét mặt trong vùng chọn, giữ nguyên mọi thứ khác. |
| `Làm lại` | Vẽ lại lần vừa rồi, sửa cho đúng quy tắc hơn (nhất là nền trong suốt, toàn thân, một người). |

Mã viết thường, không dấu, đúng như bảng ở mục 5. Nếu tôi gõ tên tiếng Việt (vd "Thục phi lúc già góc A"), tự tìm mã phù hợp.

---

## 2. QUY TẮC BẮT BUỘC CHO MỌI ẢNH

1. **NỀN TRONG SUỐT.** Xuất ảnh PNG có nền trong suốt (transparent background, alpha channel). Không nền trắng, không nền xám, không nền màu, không nền cảnh vật. Không bóng đổ xuống sàn, không quầng sáng quanh người.
2. **TOÀN THÂN ĐẾN BÀN CHÂN.** Vẽ người từ đỉnh đầu (kể cả mũ, trâm) đến tận bàn chân hoặc hài. KHÔNG cắt ở ngực, eo hay đầu gối. Chừa một khoảng trống nhỏ quanh người, không để người chạm mép ảnh.
3. **Khổ ảnh:** luôn là ảnh đơn khổ dọc 2:3, độ phân giải cao nhất (1024 x 1536). Người đứng giữa, cao chừng 90% chiều cao ảnh.
4. **Phong cách chung:** tranh minh họa cổ trang vẽ tay bán thực tế, kiểu game nhập vai cổ phong châu Á cao cấp. Nét mềm, màu lụa nhạt pha mực, ánh sáng dịu chiếu từ trên bên trái. Da mịn, mắt có hồn, tóc và vải vẽ tinh tế, nếp áo rủ mềm. Mọi nhân vật dùng chung phong cách, tỉ lệ cơ thể và cách đánh sáng này.
5. **Bối cảnh:** hậu cung triều Nguyễn Việt Nam thế kỷ 19 (triều đại hư cấu). Trang phục Việt Nam, KHÔNG PHẢI Hán phục Trung Quốc: áo nhật bình (cổ vuông, tay rộng, vạt dài), áo tấc, áo giao lĩnh, áo cánh, quần lụa ống rộng, khăn vấn, khăn mỏ quạ, mũ phượng kiểu Huế, trâm cài, chuỗi hạt.
6. **Kín đáo, đoan trang:** không hở vai, không hở ngực, không xẻ đùi, không áo mỏng xuyên thấu.
7. **Không chữ, không số, không khung viền, không logo, không chữ ký, không đường kẻ chia ô.**
8. **Một ảnh chỉ một nhân vật** .
9. **Giữ giống nhau:** trong cùng cuộc trò chuyện, cùng một mã nhân vật thì phải cùng khuôn mặt, kiểu tóc, trang phục, màu sắc, đồ cầm tay. Chỉ đổi những gì lệnh yêu cầu.

---

## 3. BA GÓC NHÌN

| Góc | Mô tả |
| --- | --- |
| **A** | Người xoay 3/4 về phía BÊN PHẢI khung ảnh, mặt hơi nghiêng, mắt nhìn về phía người xem. Đây là góc chính. |
| **B** | Người xoay 3/4 về phía BÊN TRÁI khung ảnh, mắt nhìn sang trái như đang nói với người đứng cạnh. |
| **C** | Đứng thẳng nhìn chính diện vào người xem, vai cân, dáng trang trọng. |

Hai tay để phía trước bụng hoặc cầm đồ vật theo mô tả nhân vật. Tư thế đứng yên, không múa, không chạy.

---

## 4. TÁM NÉT MẶT (mỗi nét mặt một ảnh riêng)

Thứ tự khi tôi gõ `Tiếp`:

| Số | Nét mặt | Tên file | Mô tả |
| --- | --- | --- | --- |
| 1 | Bình thường | `binh` | mặt tĩnh, môi khép |
| 2 | Cười | `vui` | cười dịu, mắt hơi cong |
| 3 | Lo lắng | `lo` | mày nhíu nhẹ, môi mím, mắt nhìn xuống |
| 4 | Giận | `gian` | mày chau, mắt sắc, môi mím chặt |
| 5 | Buồn | `buon` | mắt ướt, một giọt lệ lăn trên má, khóe môi trễ xuống |
| 6 | Sợ hãi | `so` | mắt mở to, miệng hé mở |
| 7 | Cười nhạt đắc ý | `dac` | khóe môi nhếch một bên, mắt liếc, vẻ mưu mô |
| 8 | Nhắm mắt | `nham` | mắt nhắm, mặt bình thường (để làm hiệu ứng chớp mắt) |

Chỉ khuôn mặt thay đổi giữa 8 ảnh. Thân, tay, áo, tóc, mũ, khung hình phải y hệt ảnh số 1.

---

## 5. NHÂN VẬT

### Nhân vật chính (cùng một khuôn mặt qua 5 giai đoạn)

| Mã | Mô tả |
| --- | --- |
| `me1` | Tài nhân mới vào cung, 16 tuổi. Cô gái gốc làng chè trung du, mặt trái xoan, da hơi nâu nắng, mắt sáng to, ánh nhìn hiền mà cứng cỏi, môi hồng tự nhiên. Tóc đen dài búi gọn sau gáy, cài một trâm bạc nhỏ có hạt đỏ. Áo giao lĩnh màu xanh ngọc nhạt viền vàng mảnh, bên trong yếm trắng, thắt lưng lụa xanh đậm, quần lụa trắng. Hai tay đan trước bụng, dáng còn rụt rè. |
| `me2` | Cùng người, 20 tuổi, phi tần được sủng. Da trắng hơn, nét mặt sắc sảo và tự tin. Tóc vấn cao, cài trâm phượng vàng ba ngọn, hoa tai ngọc. Áo nhật bình tím hoa cà thêu hoa sen vàng ở vạt, cổ vuông viền vàng. |
| `me3` | Cùng người, 26 tuổi, Hoàng hậu. Uy nghi, ánh mắt lạnh và trầm. Đội mũ phượng chín đuôi bằng vàng kiểu Huế, chuỗi ngọc trước trán. Áo nhật bình vàng nghệ thêu phượng lớn, viền đỏ son, chuỗi hạt dài trước ngực. |
| `me4` | Cùng người, 40 tuổi, Hoàng thái hậu buông rèm nhiếp chính. Vài nếp nhăn đuôi mắt, uy quyền tuyệt đối, khóe môi hơi nhếch. Mũ phượng chín đuôi, áo nhật bình vàng sẫm thêu phượng và mây, áo choàng đỏ thẫm khoác ngoài, tay cầm chuỗi tràng hạt gỗ trầm. |
| `me5` | Cùng người, 62 tuổi. Tóc bạc búi thấp, mặt nhiều nếp nhăn nhưng mắt vẫn sáng. Áo tấc lụa nâu trầm, khăn vấn đen, lưng hơi còng, tay chống gậy trúc. |

### Người bên cạnh

| Mã | Mô tả |
| --- | --- |
| `hanh` | Hạnh, thị nữ thân tín, 17 tuổi. Dáng nhỏ, mặt tròn, má hồng, mắt to lanh lợi. Tóc búi thấp quấn dây vải xanh. Áo cánh vải thường màu xanh lam nhạt, cổ trắng, yếm trắng, quần đen, không thêu thùa. Hai tay bưng khay sơn son có ấm trà và chén sứ. |
| `phuc` | Phúc, thái giám giữ sổ, đàn ông 35 tuổi. Mặt tròn trắng không râu, mắt hí, nụ cười khó đoán, dáng hơi bệu. Mũ thái giám đen, áo thụng xanh lam viền trắng, đai lưng đen. Tay cầm phất trần lông trắng. |
| `mama` | Ma ma họ Trịnh dạy lễ, bà 58 tuổi. Gầy, mặt dài nghiêm, môi mỏng, tóc muối tiêu vấn khăn nhung đen. Áo tấc nâu sẫm. Tay cầm thước gỗ. |
| `vua` | Hoàng thượng, đàn ông 32 tuổi. Mặt vuông, mày rậm, râu mỏng trên môi, ánh mắt mệt mỏi mà có uy, hơi xanh xao vì bệnh. Mũ xung thiên đen thếp vàng, long bào vàng thêu rồng năm móng, đai ngọc. |
| `thaihau` | Thái hậu, mẹ vua, bà 62 tuổi. Tóc bạc vấn gọn, mặt phúc hậu nhưng mắt sắc, nhiều nếp nhăn. Mũ phượng chín đuôi, áo nhật bình nâu vàng thêu phượng và chữ thọ, tay lần tràng hạt. |
| `con` | Hoàng tử nhỏ, bé trai 6 tuổi. Mặt bầu bĩnh, tóc cạo chừa hai chỏm hai bên. Áo đỏ thẫm viền vàng. |
| `con_vua` | Vua nhỏ, cậu bé 10 tuổi. Long bào vàng nhỏ, mũ xung thiên nhỏ, vẻ nghiêm trang gượng gạo. |
| `su` | Sư bà chùa Vân Tịch, 70 tuổi. Đầu cạo trọc, mặt hiền từ, nhiều nếp nhăn. Áo nâu nhà chùa, tay lần tràng hạt gỗ. |
| `meday` | Mẹ ở quê, phụ nữ nông thôn 45 tuổi. Da rám nắng, tay thô, mắt hiền. Khăn mỏ quạ, áo tứ thân nâu, yếm đào, tay cầm nón lá. |
| `cungnu` | Cung nữ, cô gái 18 tuổi, mặt thanh, bình thường. Tóc búi quấn dây. Áo cánh xanh lá nhạt, tay xách giỏ tre. |
| `tuong` | Tướng quân Lê Trực, đàn ông 38 tuổi. Vạm vỡ, da rám, râu quai nón, một vết sẹo nhỏ trên mày trái. Mũ trận, giáp vảy đỏ sẫm khoác ngoài áo chiến, kiếm đeo bên hông trái, tay đặt lên chuôi kiếm. Chính trực, ít nói. |
| `ngoai` | Sứ thần nước láng giềng, đàn ông 45 tuổi. Râu dài, mắt sâu. Nón sứ vành rộng đen có tua đỏ, áo bào xanh rêu thêu mây vàng, tay cầm cuộn quốc thư. |

### Mối nguy

| Mã | Mô tả |
| --- | --- |
| `thucphi` | Thục phi, sủng phi 26 tuổi, đẹp sắc sảo nhất hậu cung. Mắt phượng dài, phấn mắt tím nhạt, môi đỏ thắm, nụ cười quyến rũ mà lạnh. Mũ năm phượng vàng, áo nhật bình tím thẫm thêu phượng vàng. Tay cầm quạt lụa vẽ hoa mẫu đơn. |
| `hoanghau` | Hoàng hậu, phụ nữ 32 tuổi, đoan trang, mặt đầy đặn, nụ cười mực thước nhưng ánh mắt tính toán. Mũ phượng chín đuôi, áo nhật bình vàng nghệ viền đỏ son thêu phượng, chuỗi ngọc trước ngực. |
| `ninh` | Ninh mỹ nhân, cô gái 17 tuổi, cùng đợt tuyển với nhân vật chính. Mặt ngây thơ dễ thương nhưng mắt hay liếc. Tóc búi cài hoa lụa hồng, áo giao lĩnh xanh lá non thêu hoa nhỏ, tay cầm quạt giấy. |
| `hienphi` | Hiền phi họ Mạc, 28 tuổi, con nhà võ tướng. Mặt hiền dịu, nụ cười luôn nhẹ, nhưng đôi mắt sâu không đoán được. Mũ ba phượng, áo nhật bình xanh rêu thêu trúc, tay lần chuỗi hạt. |
| `uyentan` | Uyển tần, vũ nữ giáo phường 19 tuổi được vua đưa vào cung. Đẹp rực rỡ, dáng thon, mắt long lanh đầy tham vọng. Tóc búi cao cài nhiều trâm nhỏ, áo giao lĩnh đỏ son kín đáo, dải lụa mỏng vắt qua hai vai, tay cầm quạt múa. |
| `letan` | Lệ tần, cô gái 15 tuổi, cháu gái Thái phó. Đẹp như búp bê, da trắng sứ, ánh mắt kiêu kỳ. Mũ một phượng nhỏ, áo nhật bình hồng đào thêu bướm. |
| `tao` | Tào công công, thái giám 55 tuổi, chưởng sự cung Hoàng hậu. Béo, mặt phệ trắng bệch không râu, mắt nhỏ như sợi chỉ, nụ cười nịnh. Mũ thái giám đen có hạt ngọc, áo thụng đỏ sẫm, tay cầm phất trần và cuốn sổ bìa lam. |
| `xuanlan` | Xuân Lan, cung nữ thân tín của Thục phi, 24 tuổi. Gầy, mặt sắc, mắt xếch lạnh, môi mím. Tóc búi chặt, áo cánh tím than viền trắng, tay bưng khay có bát thuốc. |
| `mac` | Mạc tướng quân, cha Hiền phi, giữ cấm quân, đàn ông 55 tuổi. Vạm vỡ, râu tóc muối tiêu, mắt dữ. Mũ trận đen, giáp xanh rêu sẫm, tay đặt trên chuôi đao. |
| `quan` | Thái phó Tôn, quan đại thần 60 tuổi. Gầy, râu dê bạc dài, mắt hẹp đầy mưu tính. Mũ cánh chuồn đen, áo thụng xanh đậm có bổ tử thêu hạc trước ngực, tay cầm hốt ngà. |
| `nghia` | Hoàng tử Nghĩa đã lớn, chàng trai 20 tuổi, con Thục phi. Đẹp trai giống mẹ, mắt sắc kiêu ngạo. Khăn vấn vàng, áo bào đỏ thẫm thêu rồng bốn móng, kiếm đeo bên hông. |

---

### Các nhân vật ở tuổi khác (game đổi ảnh theo năm tháng)

Cùng khuôn mặt với mã gốc, chỉ đổi tuổi và trang phục như mô tả.

| Mã | Gốc | Mô tả | Game dùng khi |
| --- | --- | --- | --- |
| `hanh2` | `hanh` | Hạnh 45 tuổi: tóc điểm bạc, khăn vấn nâu, áo tấc xanh lam sẫm, nét mặt điềm đạm, vẫn bưng khay trà. | nhân vật chính từ 40 tuổi |
| `hanh3` | `hanh` | Hạnh 62 tuổi: tóc bạc trắng búi thấp, lưng còng, áo nâu, tay chống gậy. | chương Tuổi già |
| `thucphi2` | `thucphi` | Thục phi 45 tuổi: vẫn đẹp nhưng sắc lạnh hơn, vài nếp nhăn đuôi mắt, mũ năm phượng, áo nhật bình tím than. | chương 4 trở đi |
| `thucphi3` | `thucphi` | Thục phi 60 tuổi sau khi mất thế: tóc bạc, áo nâu tu hành hoặc áo vải xám, chống gậy, ánh mắt vẫn kiêu. | chương Tuổi già |
| `hoanghau2` | `hoanghau` | Hoàng hậu 48 tuổi: đầy đặn hơn, nét mặt mệt mỏi, mũ phượng chín đuôi, áo nhật bình vàng sẫm. | chương 4-5 |
| `vua2` | `vua` | Hoàng thượng 42 tuổi ốm nặng: gầy, má hóp, mặt tái, áo long bào vàng khoác ngoài áo lụa trắng, tay cầm khăn tay. | chương 4-5 lúc vua bệnh |
| `con2` | `con` | Hoàng tử 14 tuổi: thiếu niên, tóc vấn khăn vàng nhỏ, áo bào đỏ viền vàng, cầm quyển sách. | chương Ngôi Đông cung |
| `con3` | `con` | Con lên làm vua, 22 tuổi: long bào vàng, mũ xung thiên, giống mẹ ở đôi mắt. | chương Buông rèm và Tuổi già |
| `nghia0` | `nghia` | Hoàng tử Nghĩa lúc 8 tuổi: cậu bé kiêu kỳ, áo đỏ thẫm, tóc để chỏm, cầm kiếm gỗ. | chương 2-3 |
| `phuc2` | `phuc` | Phúc 55 tuổi: béo hơn, mặt nhiều nếp nhăn, mũ thái giám có hạt ngọc (đã lên chưởng sự), vẫn phất trần. | chương 5 trở đi |
| `tuong2` | `tuong` | Lê Trực 55 tuổi: râu tóc bạc, giáp cũ sờn, vẫn vạm vỡ. | chương 6-7 |
| `meday2` | `meday` | Mẹ ở quê 65 tuổi: tóc bạc, lưng còng, khăn mỏ quạ, chống gậy tre. | chương 4 trở đi |

### Nhân vật chính của 3 đường vào cung khác (làm sau)

| Mã | Mô tả |
| --- | --- |
| `quan1` | Con gái quan Thượng thư họ Đoàn, 16 tuổi. Tiểu thư đài các, da trắng, mặt thanh tú, ánh mắt kiêu hãnh mà buồn. Tóc vấn cao cài trâm ngọc, áo giao lĩnh gấm hồng nhạt viền bạc, tay cầm quạt lụa. |
| `cung1` | Cung nga giặt áo họ Lương, 16 tuổi. Gầy, da xanh, tay đỏ nứt vì nước tro, mắt to lanh lợi. Tóc buộc khăn vải nâu, áo cánh vải nâu bạc màu, tay áo xắn, ôm chậu gỗ có áo. |
| `chua1` | Công chúa triều trước họ Lạc, 18 tuổi. Cao quý, buồn, mặt trái xoan nhợt nhạt. Tóc vấn cao cài trâm rồng nhỏ đã cũ, áo nhật bình trắng ngà thêu rồng nhỏ đã bạc màu, tay cầm chuỗi hạt. |

Với 3 nhân vật này, các giai đoạn sau dùng mô tả của `me2` đến `me5` nhưng giữ khuôn mặt riêng: gõ `quan1 giai đoạn me3 góc A` nghĩa là con quan lúc làm Hoàng hậu.

---

## 6. TÊN FILE KHI XUẤT

Đặt tên ảnh theo mẫu `<mã>_<góc>_<nét mặt>.png`, chữ thường, không dấu:

- `me1_a_binh.png`, `me1_a_vui.png`, `me1_a_lo.png`, `me1_a_gian.png`, `me1_a_buon.png`, `me1_a_so.png`, `me1_a_dac.png`, `me1_a_nham.png`

Mỗi lần xuất ảnh, ghi tên file đề xuất ngay dưới ảnh.

---

## 7. NHẮC LẠI NGẮN

Mỗi ảnh đều phải: MỘT người, không lưới, độ phân giải cao, PNG nền trong suốt, toàn thân đến bàn chân, trang phục Việt kín đáo, không chữ, cùng phong cách tranh lụa vẽ tay, cùng một khuôn mặt cho cùng một mã nhân vật.
