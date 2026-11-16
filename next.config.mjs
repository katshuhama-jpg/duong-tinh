/** @type {import('next').NextConfig} */
// Ảnh, nhạc trong public/ để trình duyệt giữ 1 ngày (dùng bản cũ thêm tối đa 7 ngày trong lúc tải lại ngầm).
// Trước đây là max-age=0: mỗi lần mở màn, trình duyệt hỏi lại Vercel cho từng ảnh, đẩy số request lên rất cao.
const ASSET_CACHE = [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }];

const nextConfig = {
  reactStrictMode: true,
  // mã bản build: trình duyệt so với máy chủ để biết đã có bản mới
  env: { NEXT_PUBLIC_BUILD: process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now()) },
  async headers() {
    return ['bg', 'nv', 'nhac', 'prop'].map((dir) => ({ source: `/${dir}/:path*`, headers: ASSET_CACHE }));
  },
};

export default nextConfig;
