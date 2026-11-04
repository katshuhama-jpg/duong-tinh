# Chín Bậc Phượng

Game cung đấu đọc và bấm trên web di động. Một cô gái làng chè vào cung năm 16 tuổi, leo chín bậc hậu cung, sinh con, tranh ngôi Đông cung, có thể buông rèm nhiếp chính, và sống đến cuối đời (hoặc chết giữa chừng, rồi quay lại ngã rẽ gần nhất).

- Triều đại, nhân vật, tên cung điện hư cấu (niên hiệu Khánh Vân, kinh thành Phượng Thành). Khung chín bậc, lương, lễ nghi mô phỏng hậu cung nhà Nguyễn; mạch chuyện mượn khung các vụ cung đấu có thật trong sử Việt.
- Giao diện tranh Hàng Trống trên nền lụa, có chuyển động (đèn lồng, hoa rơi, chiếu chỉ mở, dấu son).
- Next.js 16, React 19. Lưu đời chơi: trình duyệt (chơi thử) hoặc Supabase (tài khoản).

## Cấu trúc
- `lib/cung/engine.ts`: bộ máy một đời (rút thẻ, hệ quả, năm tháng, lương, chặng, kết cục).
- `lib/cung/content/`: ngã rẽ lớn (`big.ts`) và thẻ nhỏ (`smallA.ts`, `smallB.ts`). Luật viết thẻ: `lib/cung/CONTENT.md`.
- `components/cung/Scene.tsx`: tranh cảnh và nhân vật vẽ bằng SVG.
- `scripts/cung-sim.ts`: chạy thử hàng nghìn đời: `npx tsx --tsconfig tsconfig.json scripts/cung-sim.ts 2000`.
