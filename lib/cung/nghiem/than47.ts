/**
 * Phần Nghiêm, chương 4-7: khi người thân cận nhúng tay vào vụ án.
 * Không đổi chủ mưu (kinh thánh 8.0): người thân cận chỉ là kẻ biết mà để mặc, kẻ nói dối để che người khác, hay kẻ làm theo lệnh.
 * Muốn xử cho đúng thì phải tự tay hạ người của mình. Mỗi cảnh đều có điềm từ chương trước.
 *
 * - Vụ 5, Uyển Như: ma ma Tạ (người nuôi nàng, điềm ở n4_s_un_ta, n5_s_un_ta) là người dâng chén thuốc cuối.
 *   Chiều hôm ấy bà đã thưa với Uyển Như, và Uyển Như để mặc, mong Hoàng thượng đi trong tay nhà Lương.
 *   Bộ máy định lúc mở án 5 (cờ un_tay, 40% khi Uyển Như là bạn, có con, phủ Hà còn giữ ấn, không có vua_benh);
 *   xử đúng ma ma thì có cờ un_bi_bat_an5 và thẻ này bật sau lời khai chung.
 * - Vụ 6, nhũ mẫu Tần: bà nói dối để che cha (điềm ở n5_s_nm). Lời bà ở n6_c_nm #0 đặt cờ nm_doi (manh mối a6_nm giả);
 *   ép bà nói thật (cờ that_a6_nm) thì bà bỏ đi hoặc mất.
 * - Vụ 7, Thái y Thẩm đã được cứu (cuu_thaiy, thaiy_on): ông tự đến khai mình kê đơn cho chị (điềm ở n6_s_thaiy_on).
 *   Nhận lời khai thì tên ông vào tờ án, và sau khi xử bà phải ký án người mình từng cứu.
 * - Lụa Vàng là tay sai vụ 2 hoặc 3 mà chưa bị bắt (lv_tay): chương 5 bà bắt gặp nàng báo tin cho cung trên.
 */
import type { Card } from '../types';

const P = 'nghiem' as const;
const G = 'g_quan';

/* ---------- vụ 5: Uyển Như ---------- */
const UN5_KY = {
  fx: { d: { thucphi: -40, duc: 2, hiem: -4 }, flag: ['ng_un5', 'phe_un', 'un_han', 'un_bat5'] },
};
const UN5_DOT = {
  fx: { d: { duc: -8, hiem: 10, thucphi: 10 }, flag: ['ng_un5', 'un_no5'] },
};

/* ---------- vụ 7: Thái y đã được cứu ---------- */
const tyTen = (id: string, flags: string[], not: string[]): Card => ({
  id,
  part: P,
  chapter: [7],
  weight: 8,
  when: { flags: [G, 'mo_an7', ...flags], not: ['xu_an7', 'chet_thaiy', 'ty_ten_xong', 'n7_b2', ...not] },
  place: 'phong',
  img: 'thaiyvien',
  time: 'chieu',
  cast: ['me', 'thaiy'],
  mood: 'buon',
  moods: { thaiy: 'binh' },
  who: 'thaiy',
  title: 'Người mình từng cứu',
  text: ['Thái y Thẩm bảy mươi chín tuổi, chống gậy đến viện bà, tay ôm một tập đơn thuốc cũ đã ố vàng.', '"Năm ấy nương nương cứu vợ con thần. Giờ thần trả. Đơn thuốc cho Chiêu nghi Nghiêm, là thần kê."'],
  omen: 'Người mang ơn mình cũng là người mình phải gọi tên.',
  choices: [
    {
      t: 'Nhận lời khai, ghi đủ tên ông vào hồ sơ',
      fx: { clue: ['a7_thaiy'], flag: ['ty_ten', 'ty_ten_xong', 'khai_thaiy'], d: { hiem: 6 } },
      note: 'Ông ký tên dưới lời khai, nét chữ vẫn đẹp như trên đơn thuốc năm xưa: "Thần biết đó là thuốc gì. Thần kê vì sợ cho vợ con. Giờ thần không còn gì để sợ." {GIA:a7_thaiy}',
    },
    {
      t: 'Nhận lời khai, rồi đưa ông ra khỏi kinh trước khi án mở',
      fx: { clue: ['a7_thaiy'], flag: ['ty_ten_xong', 'ty_tron', 'khai_thaiy'], d: { hiem: 6, duc: -8, the: -4 } },
      note: 'Ông đi ngay trong đêm, xe không treo đèn. Lời khai ở lại, người thì không. Tông nhân phủ sẽ hỏi người khai đâu, và bà sẽ phải trả lời. {GIA:a7_thaiy}',
    },
    { t: 'Từ chối, bảo ông về hiệu thuốc', fx: { flag: ['ty_ten_xong', 'ty_tha'], d: { duc: 2 } }, note: 'Ông đứng lặng rất lâu, rồi cúi đầu về. Hồ sơ của chị thiếu đúng một tờ, tờ ông đã cầm tới tận cửa.' },
  ],
});

export const NG_THAN47: Card[] = [
  /* ---------------- vụ 5: trang khai thứ hai của ma ma Tạ ---------------- */
  {
    id: 'ng_un_bat5',
    part: P,
    urgent: true,
    chapter: [5],
    when: { flags: [G, 'un_bi_bat_an5', 'n5_khai'], not: ['ng_un5'] },
    place: 'dien',
    img: 'thaimieu',
    time: 'dem',
    cast: ['me'],
    mood: 'so',
    who: 'me',
    lead: 'Lời khai của ma ma Tạ còn một trang chưa đọc trước linh cữu.',
    title: 'Trang khai thứ hai',
    text: ['Trước khi bị giải đi, ma ma Tạ xin nói riêng với bạn: "Chiều hôm ấy nô tì đã thưa với Quý phi. Quý phi chỉ bảo: cứ làm như người ta dặn."', '"Quý phi bảo, Hoàng thượng đi trong tay nhà Lương thì con của Quý phi mới có ngày ngồi lên ngai."'],
    omen: 'Người đứng gần nhất cũng là người cầm dao gần nhất.',
    choices: [
      { t: 'Ký tờ án, ghi đủ tên người biết mà để chén thuốc đi', ...UN5_KY, note: 'Uyển Như bị tước sách ấn, đưa vào lãnh cung ngay trong tuần tang. Đi ngang bạn, nàng nói rất khẽ: "Cô bảo tôi đừng để con thành con cờ. Cô không bảo tôi đừng tự cầm cờ."' },
      { t: 'Sang viện nàng trước, nghe nàng nói', fx: { next: 'ng_un_bat5b' }, note: 'Bạn đi qua sân trong áo tang. Cửa viện Uyển Như không cài then, như nàng biết bạn sẽ tới.' },
      { t: 'Đốt trang khai thứ hai', ...UN5_DOT, note: 'Trang khai cháy trong lò hương trước linh cữu. Ma ma Tạ bị giải đi một mình, không ngoái lại. Uyển Như không cảm ơn, nàng chỉ thôi nhìn thẳng vào mắt bạn.' },
    ],
  },
  {
    id: 'ng_un_bat5b',
    part: P,
    step: true,
    chapter: [5],
    place: 'vien',
    img: 'vien',
    time: 'dem',
    cast: ['me', 'uyennhu'],
    mood: 'buon',
    moods: { uyennhu: 'binh' },
    who: 'uyennhu',
    title: 'Một nước tự đi',
    text: ['Uyển Như không chối. Nàng ngồi thẳng lưng như ngày ra mắt: "Tôi không bỏ thuốc. Tôi chỉ không ngăn."', '"Cả đời tôi là con cờ của ông chú. Lần ấy tôi muốn tự đi một nước. Cô ký đi, tôi không trách."'],
    choices: [
      { t: 'Ký tờ án', ...UN5_KY, note: 'Bạn ký ngay trên bàn nàng, bằng nghiên mực của nàng. Uyển Như nhìn nét chữ, gật đầu: "Chữ cô vẫn đẹp." Sáng ra nàng vào lãnh cung, tà áo xanh vẫn thẳng.' },
      { t: 'Để nàng tự viết tờ nhận tội', fx: { d: { thucphi: 6, duc: 4, hiem: -2 }, flag: ['ng_un5', 'phe_un', 'un_tu_nhan', 'un_bat5'] }, note: 'Nàng viết một mạch, không sửa chữ nào, rồi đưa cho bạn: "Lần này là nước của tôi." Nàng vào lãnh cung, và không giận bạn ngày nào.' },
      { t: 'Đốt trang khai trước mặt nàng', ...UN5_DOT, note: 'Giấy cháy trên đèn của nàng. Uyển Như nhìn tro rơi xuống bàn, rồi nói: "Cô vừa cho tôi một món nợ. Tôi ghét nợ." Ma ma Tạ bị giải đi một mình.' },
    ],
  },

  /* ---------------- vụ 5: Lụa Vàng là tay sai năm nào mà chưa bị bắt ---------------- */
  {
    id: 'ng_lv_tre5',
    part: P,
    chapter: [5],
    weight: 4,
    when: { flags: [G, 'lv_tay', 'mo_an5'], not: ['xu_an5', 'chet_luavang', 'di_luavang', 'lv_ky_an', 'lv_lo'] },
    place: 'vien',
    img: 'bep',
    time: 'dem',
    cast: ['me', 'luavang'],
    mood: 'lo',
    moods: { luavang: 'so' },
    who: 'luavang',
    title: 'Gói than sau bếp',
    text: ['Đêm thứ hai, bạn thấy Lụa Vàng đứng sau bếp ngự dược với ma ma của cung trên, tay nhận một gói gì đó.', 'Thấy bạn, nàng cười rất tươi: "Em xin thêm than cho viện mình, nương nương."'],
    omen: 'Người đứng gần nhất cũng là người cầm dao gần nhất.',
    choices: [
      { t: 'Hỏi thẳng: "Năm ấy, vụ ấy, là em phải không?"', fx: { d: { hanh: -40, muu: 3, hiem: -4 }, flag: ['lv_lo', 'di_luavang'] }, note: 'Lụa Vàng quỳ xuống, gói than rơi vỡ: "Họ trả nợ cho em. Từ năm ấy em báo tin cho cung trên." Sáng ra bạn cho nàng ra khỏi cung. Viện bạn bớt một người, và bớt một đôi tai.' },
      { t: 'Giả như không thấy, từ nay chỉ nói với nàng điều mình muốn cung trên nghe', fx: { d: { muu: 4, hiem: -6 }, flag: ['lv_lo', 'lv_mon', 'lv_tin_gia'] }, note: 'Tin bạn cố ý cho Lụa Vàng nghe đi lên cung trên chỉ trong một đêm. Bạn biết thêm một điều: tai mắt người kia nằm ngay trong viện mình.' },
      { t: 'Thôi, nàng chỉ xin than', fx: { d: { hiem: 4 } }, note: 'Lụa Vàng ôm gói than về viện. Đêm ấy than cháy rất đượm, mà bạn không ngủ được.' },
    ],
  },

  /* ---------------- vụ 6: nhũ mẫu nói dối để che cha ---------------- */
  {
    id: 'ng_nm_that',
    part: P,
    chapter: [6],
    weight: 6,
    when: { flags: [G, 'mo_an6', 'nm_doi'], not: ['xu_an6', 'that_a6_nm', 'chet_nhumau', 'di_nhumau', 'nm_that_xong'] },
    place: 'phong',
    img: 'vienchi',
    time: 'dem',
    cast: ['me', 'nhumau'],
    mood: 'lo',
    moods: { nhumau: 'so' },
    who: 'me',
    title: 'Kim không xâu được chỉ',
    text: ['Bạn đọc lại lời nhũ mẫu. Bà bảo cha bị ép, mà không nói ai ép, và bà nói câu ấy trước khi bạn kịp hỏi.', 'Bà vẫn ngồi khâu ở góc viện như mọi chiều. Kim trong tay bà không xâu được chỉ.'],
    omen: 'Người thương mình nhất cũng là người nói dối mình khéo nhất.',
    choices: [
      {
        t: 'Đặt lá thư "Im" trước mặt bà, ép bà nói thật',
        need: { flags: ['co_thu_im'] },
        lockHint: 'Cần đang cầm lá thư một chữ',
        fx: { d: { hiem: 4, duc: -2 }, flag: ['that_a6_nm', 'di_nhumau', 'nm_that_xong'] },
        note: 'Bà nhìn lá thư rất lâu rồi sụp xuống: "Không ai ép ông cả. Ông ngồi đến sáng, rồi tự viết." Sáng hôm sau bà xin về quê. Bà bảo không dám nhìn mặt ông nhà nữa, cũng không dám nhìn mặt tiểu thư.',
      },
      {
        t: 'Ép bà bằng lời, ngay đêm nay',
        fx: { d: { hiem: 4, duc: -6 }, flag: ['that_a6_nm', 'chet_nhumau', 'nm_that_xong'] },
        note: 'Bà khóc mà nói thật: không ai ép ông cả, ông tự chọn im. Nói xong bà ôm ngực. Gần sáng bà đi, tay còn nắm vạt áo bạn như hồi bạn mới biết đi.',
        risk: { p: 0.5, fail: { d: { duc: -4 }, flag: ['nm_that_xong'] }, failNote: 'Bà khóc đến ngất, rồi không nói gì nữa. Lời cũ của bà vẫn nằm trong hồ sơ, như cũ.' },
      },
      { t: 'Để bà giữ lời của bà', fx: { d: { duc: 2 }, flag: ['nm_that_xong'] }, note: 'Bạn không hỏi nữa. Có những lời nói dối là cách một người già thương người khác.' },
    ],
  },

  /* ---------------- chương 6: điềm cho vụ 7, Thái y mang ơn ---------------- */
  ...[
    { id: 'ng_ty_on6_a', flags: ['cuu_thaiy'], not: [] as string[] },
    { id: 'ng_ty_on6_b', flags: ['thaiy_on'], not: ['cuu_thaiy'] },
  ].map(
    (v): Card => ({
      id: v.id,
      part: P,
      chapter: [6],
      weight: 3,
      when: { flags: [G, 'mo_an6', ...v.flags], not: ['xu_an6', 'chet_thaiy', 'o_chua', 'giu_lang', 'ng_ty_on6', ...v.not] },
      place: 'phong',
      img: 'thaiyvien',
      time: 'ngay',
      cast: ['me', 'thaiy'],
      mood: 'lo',
      moods: { thaiy: 'buon' },
      who: 'thaiy',
      title: 'Món nợ của Thái y',
      text: ['Thái y Thẩm đã ngoài năm mươi, bắt mạch cho bạn xong thì ngồi rất lâu: "Ơn nương nương năm ấy, thần trả cả đời không hết."', '"Chỉ sợ có ngày thần phải trả bằng chính cái tên của mình."'],
      choices: [
        { t: 'Hỏi: "Tên ông thì sao?"', fx: { d: { muu: 2, hiem: 2 }, flag: ['ng_ty_on6', 'ty_dieu'] }, note: '"Có một đơn thuốc năm xưa thần kê, chưa ai hỏi tới." Ông cất gối bắt mạch, tay run. "Khi nào nương nương hỏi, thần sẽ nói."' },
        { t: 'Bảo ông về hiệu thuốc nghỉ ngơi', fx: { d: { duc: 2 }, flag: ['ng_ty_on6'] }, note: 'Ông vái bạn một vái, sâu hơn lễ thường. Ra tới cửa, ông dừng lại như định nói thêm, rồi thôi.' },
      ],
    }),
  ),

  /* ---------------- vụ 7: Thái y đã được cứu tự đến khai ---------------- */
  tyTen('ng_ty_ten_a', ['cuu_thaiy'], []),
  tyTen('ng_ty_ten_b', ['thaiy_on'], ['cuu_thaiy']),
  {
    id: 'ng_ty_an',
    part: P,
    urgent: true,
    chapter: [7],
    when: { flags: [G, 'an7_thang', 'ty_ten'], not: ['ty_an_xong', 'chet_thaiy'] },
    place: 'dien',
    img: 'tamphap',
    time: 'ngay',
    cast: ['me', 'thaiy'],
    mood: 'buon',
    moods: { thaiy: 'binh' },
    who: 'me',
    lead: 'Lời khai có chữ ký của Thái y nằm trong hồ sơ, và Tông nhân phủ đọc hết.',
    title: 'Tên ông trong tờ án',
    text: ['Tông nhân phủ chép thêm một dòng: Thái y Thẩm, kê đơn thuốc giết người. Tờ án chờ chữ ký của người đứng đơn.', 'Ông quỳ dưới thềm, lưng còng, không nhìn bà. Năm ấy bà cứu vợ con ông bằng chính bàn tay đang cầm bút.'],
    choices: [
      { t: 'Ký', fx: { d: { duc: -2, hiem: -4 }, flag: ['ty_an_xong', 'chet_thaiy'] }, note: 'Án đày ra biên. Ông mất trên đường, ở một trạm ngựa không tên. Người áp giải gửi về cho bà một tập đơn thuốc, trang cuối có một dòng: "Không oán."' },
      {
        t: 'Xin giảm cho ông vì đã tự đến khai',
        need: { num: { duc: [45, 100] } },
        lockHint: 'Cần Đức từ 45: lời xin của bà phải có người tin',
        fx: { d: { duc: 2, the: -6 }, flag: ['ty_an_xong', 'ty_giam'] },
        note: 'Án giảm: đuổi về quê, cấm hành nghề thuốc. Ông vái bà ba vái ở cổng, như lần bà cứu vợ con ông năm xưa.',
        risk: { p: 0.3, fail: { d: { the: -6 }, flag: ['ty_an_xong', 'chet_thaiy'] }, failNote: 'Tông nhân phủ không giảm: kê đơn giết người thì tự khai cũng là có tội. Ông mất trong ngục trước ngày đày.' },
      },
    ],
  },
];
