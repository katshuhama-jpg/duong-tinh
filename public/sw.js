// 28/11 (giảm tiền CDN Vercel): ảnh tĩnh của game có một bản sao ở kho công khai "tinh" trên Supabase, thư mục ll/.
// Khi BAT = true, yêu cầu ảnh tới /bg, /nv, /prop được lấy từ Supabase; hỏng vì bất cứ lý do gì thì lấy lại từ Vercel như cũ.
// KHÔNG cache trang hay dữ liệu. Nhạc không đi qua đây: lib/cung/music.ts trỏ thẳng sang kho.
// Muốn tắt: đặt BAT = false rồi đẩy lên. Thêm hay sửa ảnh trong public/ thì phải đẩy lại lên kho cho khớp.
const BAT = true;
const KHO = 'https://qncopjgvtjubfqnklbxj.supabase.co/storage/v1/object/public/tinh/ll';
const THU_MUC = /^\/(bg|nv|prop)\//;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (!BAT) return;
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== self.location.origin || !THU_MUC.test(u.pathname)) return;
  e.respondWith(
    fetch(KHO + u.pathname, { mode: 'cors', credentials: 'omit' })
      .then((x) => (x.ok ? x : fetch(r)))
      .catch(() => fetch(r)),
  );
});
