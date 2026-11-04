# HƯỚNG DẪN VẼ NHÂN VẬT - GAME "CHÍN BẬC PHƯỢNG"

Tài liệu này dành cho ChatGPT. Hãy đọc hết và làm đúng mọi quy tắc dưới đây mỗi khi tôi ra lệnh vẽ, kể cả khi lệnh rất ngắn.

---

## 1. CÁCH TÔI RA LỆNH

**MỖI ẢNH MỘT NGƯỜI, NHIỀU ẢNH MỘT LƯỢT.** Một lệnh ra 8 ảnh riêng (8 nét mặt), không ghép vào một ảnh. Người chiếm gần hết chiều cao ảnh, độ phân giải cao nhất có thể (2K).

Lệnh chính: **`<mã> góc <A/B/C>`**, ví dụ `me1 góc A`, `hanh góc C`, `thucphi2 góc B`.

Khi nhận lệnh này, trong MỘT LƯỢT trả lời, hãy tạo **8 ảnh riêng biệt** (dùng chế độ tạo nhiều ảnh từ một lệnh, giữ nhân vật đồng nhất giữa các ảnh):
1. Tra mã ở mục 5 (nhân vật, tuổi, trang phục, đồ cầm tay) và góc ở mục 3.
2. Ảnh 1 đến 8 là 8 nét mặt ở mục 4, đúng thứ tự. Mỗi ảnh là MỘT người, toàn thân tới bàn chân, khổ dọc 2:3, chất lượng cao nhất, độ phân giải cao nhất có thể (2K, khoảng 1365 x 2048; tối thiểu 1024 x 1536).
3. Tám ảnh phải giống nhau tuyệt đối về thân người, tư thế, tay, trang phục, tóc, mũ, trâm, góc đầu, khung hình, cỡ người, vị trí trong ảnh. Chỉ khuôn mặt thay đổi.
4. Ghi tên file dưới từng ảnh (mục 6).
5. Nếu không tạo được 8 ảnh trong một lượt, tạo ảnh 1 trước rồi ghi "Gõ Tiếp để vẽ nét mặt 2: Cười"; mỗi lần tôi gõ `Tiếp`, chỉ sửa vùng mặt của ảnh 1 sang nét mặt kế tiếp.

**Tuyệt đối không ghép nhiều người vào một ảnh (không lưới, không sprite sheet).** Ảnh ghép làm mặt quá nhỏ, vào game bị nhòe.

Nếu trong cuộc trò chuyện đã có ảnh của cùng người (cùng mã, hoặc cùng người ở giai đoạn khác như me1 và me2), giữ đúng khuôn mặt người đó.

Lệnh phụ:

| Lệnh | Bạn làm gì |
| --- | --- |
| `Tiếp` | Khi chưa đủ 8 ảnh: nét mặt kế tiếp, sửa riêng vùng mặt của ảnh 1. Khi đã đủ 8: chuyển sang góc kế tiếp (A, rồi B, rồi C). |
| `<mã> đủ bộ` | Làm trọn một nhân vật: góc A (8 ảnh), rồi góc B (8 ảnh), rồi góc C (8 ảnh), mỗi lượt một góc; tôi gõ `Tiếp` để sang góc kế. Luôn ghi rõ đang ở góc nào. |
| `<mã gốc> đủ tuổi` | Làm mọi giai đoạn tuổi của cùng một người (vd `hanh đủ tuổi` = `hanh`, `hanh2`, `hanh3`), mỗi giai đoạn đủ bộ như trên, theo thứ tự trẻ trước già sau, giữ cùng khuôn mặt. |
| `nhóm <1/2/3/4> đủ bộ` | Làm lần lượt mọi mã trong nhóm đó ở mục 5, theo thứ tự trong bảng, mỗi mã đủ bộ. Khi xong một mã, báo "Xong <mã>, tiếp theo là <mã kế>". |
| `Đang ở đâu?` | Nhắc lại đang làm mã nào, góc nào, nét mặt số mấy, còn bao nhiêu ảnh. |
| `<mã> góc <A/B/C> <nét mặt>` | Vẽ thẳng một nét mặt cụ thể, vd `hanh góc A giận`. |
| `Sửa mặt <nét mặt>` | Khi tôi đã tô chọn vùng mặt: chỉ đổi nét mặt trong vùng chọn, giữ nguyên mọi thứ khác. |
| `Làm lại` | Vẽ lại lần vừa rồi, sửa cho đúng quy tắc hơn (nhất là nền trong suốt, toàn thân, một người). |

Mã viết thường, không dấu, đúng như bảng ở mục 5. Nếu tôi gõ tên tiếng Việt (vd "Thục phi lúc già góc A"), tự tìm mã phù hợp.

---

## 2. QUY TẮC BẮT BUỘC CHO MỌI ẢNH

1. **NỀN TRONG SUỐT.** Xuất ảnh PNG có nền trong suốt (transparent background, alpha channel). Không nền trắng, không nền xám, không nền màu, không nền cảnh vật. Không bóng đổ xuống sàn, không quầng sáng quanh người.
2. **TOÀN THÂN ĐẾN BÀN CHÂN.** Vẽ người từ đỉnh đầu (kể cả mũ, trâm) đến tận bàn chân hoặc hài. KHÔNG cắt ở ngực, eo hay đầu gối. Chừa một khoảng trống nhỏ quanh người, không để người chạm mép ảnh.
3. **Khổ ảnh:** luôn là ảnh đơn khổ dọc 2:3, chất lượng cao nhất, độ phân giải cao nhất có thể (2K, khoảng 1365 x 2048; tối thiểu 1024 x 1536). Người đứng giữa, cao chừng 90% chiều cao ảnh.
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

## 5. NHÂN VẬT (ĐỦ MỌI ĐỘ TUỔI)

Đời trong game kéo dài từ năm nhân vật chính 16 tuổi đến khoảng 65 tuổi, qua 7 chương: 1 Nhập cung, 2 Được gọi, 3 Mang thai, 4 Ngôi Đông cung, 5 Vua băng, 6 Buông rèm, 7 Tuổi già. Mỗi người có một hoặc nhiều giai đoạn tuổi. **Các mã cùng tên gốc (vd `hanh`, `hanh2`, `hanh3`) là CÙNG MỘT NGƯỜI**: giữ nguyên khuôn mặt, dáng xương mặt, màu mắt, chỉ đổi tuổi, tóc, trang phục như mô tả. Nên vẽ giai đoạn đầu trước rồi dùng làm mẫu cho các giai đoạn sau.

Tổng cộng 57 mã cho đường dân nữ (nhóm 1-3), thêm 12 mã cho 3 đường vào cung còn lại (nhóm 4). Thứ tự nên làm: nhóm 1, rồi nhóm 2, rồi nhóm 3, nhóm 4 làm sau cùng.

### Nhóm 1: nhân vật chính và người thân cận (làm trước)

| Mã | Tuổi | Chương | Mô tả |
| --- | --- | --- | --- |
| `me1` | 16 | 1-2 | Tài nhân mới vào cung. Cô gái gốc làng chè trung du, mặt trái xoan, da hơi nâu nắng, mắt sáng to, ánh nhìn hiền mà cứng cỏi, môi hồng tự nhiên. Tóc đen dài búi gọn sau gáy, cài một trâm bạc nhỏ có hạt đỏ. Áo giao lĩnh xanh ngọc nhạt viền vàng mảnh, yếm trắng, thắt lưng lụa xanh đậm, quần lụa trắng, hài vải. Hai tay đan trước bụng, dáng còn rụt rè. |
| `me2` | 20 | 2-3 | Cùng người, phi tần được sủng. Da trắng hơn, nét mặt sắc sảo, tự tin. Tóc vấn cao, trâm phượng vàng ba ngọn, hoa tai ngọc. Áo nhật bình tím hoa cà thêu hoa sen vàng ở vạt, cổ vuông viền vàng. |
| `me3` | 28 | 3-5 | Cùng người, phi cao bậc hoặc Hoàng hậu. Uy nghi, ánh mắt lạnh và trầm. Mũ phượng chín đuôi bằng vàng kiểu Huế, chuỗi ngọc trước trán. Áo nhật bình vàng nghệ thêu phượng lớn, viền đỏ son, chuỗi hạt dài. |
| `me4` | 42 | 5-6 | Cùng người, Hoàng thái hậu buông rèm nhiếp chính. Vài nếp nhăn đuôi mắt, uy quyền tuyệt đối, khóe môi hơi nhếch. Mũ phượng chín đuôi, áo nhật bình vàng sẫm thêu phượng và mây, áo choàng đỏ thẫm, tay cầm chuỗi tràng hạt gỗ trầm. |
| `me5` | 62 | 7 | Cùng người, tuổi già. Tóc bạc búi thấp, mặt nhiều nếp nhăn nhưng mắt vẫn sáng. Áo tấc lụa nâu trầm, khăn vấn đen, lưng hơi còng, tay chống gậy trúc. |
| `hanh` | 17 | 1-3 | Hạnh, thị nữ thân tín. Dáng nhỏ, mặt tròn, má hồng, mắt to lanh lợi. Tóc búi thấp quấn dây vải xanh. Áo cánh vải thường màu xanh lam nhạt, cổ trắng, yếm trắng, quần đen, không thêu. Hai tay bưng khay sơn son có ấm trà và chén sứ. |
| `hanh2` | 35 | 4-6 | Hạnh trưởng thành: mặt bớt tròn, điềm đạm, khăn vấn nâu, áo tấc xanh lam sẫm, vẫn bưng khay trà. |
| `hanh3` | 60 | 7 | Hạnh già: tóc bạc trắng búi thấp, lưng còng, áo nâu, tay chống gậy, nụ cười hiền móm mém. |
| `phuc` | 30 | 1-4 | Phúc, thái giám giữ sổ. Mặt tròn trắng không râu, mắt hí, nụ cười khó đoán, dáng hơi bệu. Mũ thái giám đen, áo thụng xanh lam viền trắng, đai lưng đen, tay cầm phất trần lông trắng. |
| `phuc2` | 50 | 5-7 | Phúc lên chưởng sự: béo hơn, mặt nhiều nếp, mũ thái giám có hạt ngọc, áo thụng xanh đậm thêu mây, vẫn phất trần. |
| `vua` | 30 | 1-3 | Hoàng thượng. Mặt vuông, mày rậm, râu mỏng trên môi, ánh mắt mệt mỏi mà có uy. Mũ xung thiên đen thếp vàng, long bào vàng thêu rồng năm móng, đai ngọc. |
| `vua2` | 40 | 4-5 | Hoàng thượng ốm nặng: gầy, má hóp, mặt tái, long bào vàng khoác ngoài áo lụa trắng, không đội mũ, tóc búi, tay cầm khăn tay có vết máu nhỏ. |
| `con` | 6 | 3-4 | Hoàng tử nhỏ: bé trai bầu bĩnh, mắt giống mẹ, tóc cạo chừa hai chỏm, áo đỏ thẫm viền vàng. |
| `con2` | 14 | 4-5 | Hoàng tử thiếu niên (Đông cung): khăn vấn vàng nhỏ, áo bào đỏ viền vàng, cầm quyển sách, dáng nghiêm. |
| `con_vua` | 10 | 5-6 | Con lên ngôi còn nhỏ: long bào vàng nhỏ, mũ xung thiên nhỏ, vẻ nghiêm trang gượng gạo. |
| `con3` | 24 | 6-7 | Con là vua trưởng thành: long bào vàng, mũ xung thiên, đôi mắt giống mẹ, vẻ cứng cỏi. |
| `con4` | 42 | 7 | Con là vua trung niên: râu mỏng, long bào vàng sẫm, ánh mắt trầm. |
| `congchua` | 8 | 3-6 | Con gái nhỏ (công chúa): bé gái tóc để trái đào, áo hồng viền vàng, cầm con diều giấy. |
| `congchua2` | 18 | 6-7 | Công chúa lớn: thiếu nữ dịu dàng giống mẹ, áo nhật bình hồng phấn, trâm ngọc. |

### Nhóm 2: mối nguy và vây cánh

| Mã | Tuổi | Chương | Mô tả |
| --- | --- | --- | --- |
| `thucphi` | 26 | 1-3 | Thục phi, sủng phi đẹp sắc sảo nhất hậu cung. Mắt phượng dài, phấn mắt tím nhạt, môi đỏ thắm, nụ cười quyến rũ mà lạnh. Mũ năm phượng vàng, áo nhật bình tím thẫm thêu phượng vàng, tay cầm quạt lụa vẽ mẫu đơn. |
| `thucphi2` | 40 | 4-6 | Thục phi trung niên, giờ tranh ngôi cho con: vẫn đẹp nhưng sắc lạnh, vài nếp nhăn đuôi mắt, mũ năm phượng, áo nhật bình tím than. |
| `thucphi3` | 58 | 7 | Thục phi già sau khi mất thế: tóc bạc, áo vải xám hoặc áo nâu tu hành, chống gậy, ánh mắt vẫn kiêu. |
| `xuanlan` | 24 | 1-4 | Xuân Lan, cung nữ thân tín của Thục phi. Gầy, mặt sắc, mắt xếch lạnh, môi mím. Tóc búi chặt, áo cánh tím than viền trắng, tay bưng khay có bát thuốc. |
| `xuanlan2` | 40 | 5-7 | Xuân Lan trung niên: mặt hằn nếp, khăn vấn tím than, ánh mắt càng lạnh. |
| `hoanghau` | 32 | 1-3 | Hoàng hậu: đoan trang, mặt đầy đặn, nụ cười mực thước nhưng ánh mắt tính toán. Mũ phượng chín đuôi, áo nhật bình vàng nghệ viền đỏ son thêu phượng, chuỗi ngọc trước ngực. |
| `hoanghau2` | 46 | 4-5 | Hoàng hậu trung niên: đầy đặn hơn, nét mặt mệt mỏi, áo nhật bình vàng sẫm. |
| `hoanghau3` | 60 | 6-7 | Bà sau khi bị phế hoặc lui về: tóc bạc, áo nâu sồng, không mũ phượng, tay lần tràng hạt. |
| `tao` | 50 | 1-4 | Tào công công, chưởng sự thái giám cung Hoàng hậu. Béo, mặt phệ trắng bệch không râu, mắt nhỏ như sợi chỉ, nụ cười nịnh. Mũ thái giám đen có hạt ngọc, áo thụng đỏ sẫm, tay cầm phất trần và cuốn sổ bìa lam. |
| `tao2` | 65 | 5-6 | Tào công công già: tóc bạc dưới mũ, lưng còng, mặt nhăn nheo, vẫn ôm sổ. |
| `ninh` | 17 | 1-2 | Ninh mỹ nhân, cùng đợt tuyển với nhân vật chính. Mặt ngây thơ dễ thương nhưng mắt hay liếc. Tóc búi cài hoa lụa hồng, áo giao lĩnh xanh lá non thêu hoa nhỏ, tay cầm quạt giấy. |
| `ninh2` | 24 | 3-4 | Ninh khi đã thành thù: nét mặt sắc hơn, tóc vấn cao, trâm bạc, áo nhật bình xanh lục đậm. |
| `hienphi` | 28 | 2-4 | Hiền phi họ Mạc, con nhà võ tướng. Mặt hiền dịu, nụ cười luôn nhẹ, đôi mắt sâu không đoán được. Mũ ba phượng, áo nhật bình xanh rêu thêu trúc, tay lần chuỗi hạt. |
| `hienphi2` | 42 | 5-6 | Hiền phi trung niên: vẫn hiền mà lạnh hơn, áo nhật bình xanh rêu sẫm, mũ ba phượng. |
| `mac` | 52 | 2-5 | Mạc tướng quân, cha Hiền phi, giữ cấm quân. Vạm vỡ, râu tóc muối tiêu, mắt dữ. Mũ trận đen, giáp xanh rêu sẫm, tay đặt trên chuôi đao. |
| `mac2` | 64 | 6 | Mạc tướng quân già: râu tóc bạc trắng, mặc tang phục trắng khoác ngoài giáp (đòi báo thù cho con gái). |
| `uyentan` | 19 | 2-4 | Uyển tần, vũ nữ giáo phường được vua đưa vào cung. Đẹp rực rỡ, dáng thon, mắt long lanh đầy tham vọng. Tóc búi cao cài nhiều trâm nhỏ, áo giao lĩnh đỏ son kín đáo, dải lụa mỏng vắt qua hai vai, tay cầm quạt múa. |
| `uyentan2` | 30 | 5 | Uyển tần khi đã thất sủng hoặc trong lãnh cung: áo đỏ bạc màu, tóc xõa một nửa, mắt trũng mà vẫn đẹp. |
| `letan` | 15 | 3-4 | Lệ tần, cháu gái Thái phó. Đẹp như búp bê, da trắng sứ, ánh mắt kiêu kỳ. Mũ một phượng nhỏ, áo nhật bình hồng đào thêu bướm. |
| `letan2` | 25 | 5 | Lệ tần trưởng thành: sắc sảo, áo nhật bình hồng đậm, mũ ba phượng. |
| `quan` | 58 | 1-5 | Thái phó Tôn, quyền thần. Gầy, râu dê bạc dài, mắt hẹp đầy mưu tính. Mũ cánh chuồn đen, áo thụng xanh đậm có bổ tử thêu hạc trước ngực, tay cầm hốt ngà. |
| `quan2` | 72 | 6-7 | Thái phó Tôn già: râu tóc bạc trắng, lưng còng, vẫn áo thụng xanh và hốt ngà, ánh mắt chưa tắt. |
| `nghia0` | 8 | 2-3 | Hoàng tử Nghĩa lúc nhỏ, con Thục phi: cậu bé kiêu kỳ, áo đỏ thẫm, tóc để chỏm, cầm kiếm gỗ. |
| `nghia` | 20 | 4-6 | Hoàng tử Nghĩa đã lớn: đẹp trai giống mẹ, mắt sắc kiêu ngạo. Khăn vấn vàng, áo bào đỏ thẫm thêu rồng bốn móng, kiếm đeo bên hông. |
| `nghia2` | 30 | 6-7 | Nghĩa khi mặc giáp khởi binh hoặc khi bị đày: giáp đen ngoài áo đỏ, râu lún phún, mắt đầy hận. |

### Nhóm 3: nhân vật phụ

| Mã | Tuổi | Chương | Mô tả |
| --- | --- | --- | --- |
| `mama` | 58 | 1-2 | Ma ma họ Trịnh dạy lễ. Gầy, mặt dài nghiêm, môi mỏng, tóc muối tiêu vấn khăn nhung đen. Áo tấc nâu sẫm, tay cầm thước gỗ. |
| `thaihau` | 60 | 1-5 | Thái hậu, mẹ vua. Tóc bạc vấn gọn, mặt phúc hậu nhưng mắt sắc, nhiều nếp nhăn. Mũ phượng chín đuôi, áo nhật bình nâu vàng thêu phượng và chữ thọ, tay lần tràng hạt. |
| `thaihau2` | 72 | 4-5 | Thái hậu già yếu: ngồi trên ghế, tóc bạc trắng, áo nâu vàng khoác chăn mỏng, mắt mờ mà vẫn tinh. |
| `tuong` | 36 | 2-5 | Tướng quân Lê Trực. Vạm vỡ, da rám, râu quai nón, vết sẹo nhỏ trên mày trái. Mũ trận, giáp vảy đỏ sẫm ngoài áo chiến, kiếm đeo bên hông trái, tay đặt lên chuôi kiếm. Chính trực, ít nói. |
| `tuong2` | 52 | 6-7 | Lê Trực già: râu tóc bạc, giáp cũ sờn, vẫn vạm vỡ và thẳng lưng. |
| `su` | 70 | 1-7 | Sư bà chùa Vân Tịch. Đầu cạo trọc, mặt hiền từ, nhiều nếp nhăn. Áo nâu nhà chùa, tay lần tràng hạt gỗ. |
| `meday` | 42 | 1-3 | Mẹ ở quê. Phụ nữ nông thôn, da rám nắng, tay thô, mắt hiền. Khăn mỏ quạ, áo tứ thân nâu, yếm đào, tay cầm nón lá. |
| `meday2` | 62 | 4-7 | Mẹ ở quê lúc già: tóc bạc, lưng còng, khăn mỏ quạ, chống gậy tre. |
| `cungnu` | 18 | 1-7 | Cung nữ thường. Mặt thanh, bình thường, tóc búi quấn dây, áo cánh xanh lá nhạt, tay xách giỏ tre. |
| `cungnu2` | 20 | 1-7 | Cung nữ khác để thay đổi: mặt tròn, áo cánh hồng nhạt, tay ôm chồng áo gấp. |
| `thaiy` | 50 | 1-6 | Thái y: đàn ông râu thưa, mũ ô sa đen, áo thụng xám, tay ôm hộp thuốc gỗ. |
| `ngoai` | 45 | 5-6 | Sứ thần nước láng giềng. Râu dài, mắt sâu. Nón sứ vành rộng đen có tua đỏ, áo bào xanh rêu thêu mây vàng, tay cầm cuộn quốc thư. |
| `linh` | 25 | 1-7 | Lính cấm quân: nón dấu, áo nẹp đỏ, cầm giáo. |

### Nhóm 4: nhân vật chính của 3 đường vào cung khác (làm sau cùng)

Mỗi đường có khuôn mặt riêng. Giai đoạn sau dùng trang phục như `me2` đến `me5` nhưng giữ mặt riêng của đường đó.

| Mã | Tuổi | Mô tả |
| --- | --- | --- |
| `quan1` | 16 | Con gái quan Thượng thư họ Đoàn. Tiểu thư đài các, da trắng, mặt thanh tú, ánh mắt kiêu hãnh mà buồn. Tóc vấn cao cài trâm ngọc, áo giao lĩnh gấm hồng nhạt viền bạc, tay cầm quạt lụa. |
| `quan2_me` đến `quan5_me` | 20 / 28 / 42 / 62 | Cùng người, trang phục như `me2`, `me3`, `me4`, `me5`. |
| `cung1` | 16 | Cung nga giặt áo họ Lương. Gầy, da xanh, tay đỏ nứt vì nước tro, mắt to lanh lợi. Tóc buộc khăn vải nâu, áo cánh vải nâu bạc màu, tay áo xắn, ôm chậu gỗ có áo. |
| `cung2_me` đến `cung5_me` | 20 / 28 / 42 / 62 | Cùng người, trang phục như `me2` đến `me5`. |
| `chua1` | 18 | Công chúa triều trước họ Lạc. Cao quý, buồn, mặt trái xoan nhợt nhạt. Tóc vấn cao cài trâm rồng nhỏ đã cũ, áo nhật bình trắng ngà thêu rồng nhỏ đã bạc màu, tay cầm chuỗi hạt. |
| `chua2_me` đến `chua5_me` | 20 / 28 / 42 / 62 | Cùng người, trang phục như `me2` đến `me5`. |

---

## 6. TÊN FILE KHI XUẤT

Đặt tên ảnh theo mẫu `<mã>_<góc>_<nét mặt>.png`, chữ thường, không dấu:

- `me1_a_binh.png`, `me1_a_vui.png`, `me1_a_lo.png`, `me1_a_gian.png`, `me1_a_buon.png`, `me1_a_so.png`, `me1_a_dac.png`, `me1_a_nham.png`

Mỗi lần xuất ảnh, ghi tên file đề xuất ngay dưới ảnh.

---

## 7. NHẮC LẠI NGẮN

Mỗi ảnh đều phải: MỘT người, không lưới, độ phân giải cao, PNG nền trong suốt, toàn thân đến bàn chân, trang phục Việt kín đáo, không chữ, cùng phong cách tranh lụa vẽ tay, cùng một khuôn mặt cho cùng một mã nhân vật.
