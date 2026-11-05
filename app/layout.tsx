import type { Metadata, Viewport } from 'next';
import './globals.css';

const NAME = 'Chín Bậc Phượng';
const DESC = 'Game cung đấu đọc và bấm: một cô gái làng chè vào cung, leo chín bậc hậu cung, sinh con, tranh ngôi, buông rèm. Triều đại hư cấu, khung hậu cung theo sử Việt, tranh kiểu Hàng Trống.';

export const metadata: Metadata = {
  metadataBase: new URL('https://loveslines.vercel.app'),
  title: { default: NAME, template: `%s · ${NAME}` },
  description: DESC,
  applicationName: NAME,
  keywords: ['game cung đấu', 'hậu cung', 'game lịch sử Việt', 'tranh Hàng Trống', NAME],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: NAME, title: NAME, description: DESC, locale: 'vi_VN' },
  twitter: { card: 'summary', title: NAME, description: DESC },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2a1d14',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Water+Brush&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Be+Vietnam+Pro:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
