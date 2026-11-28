'use client';

import { useEffect } from 'react';

/** 28/11: đăng ký service worker để ảnh lấy từ kho Supabase thay vì Vercel (xem public/sw.js). Không cache trang. */
export default function SwBoot() {
  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);
  return null;
}
