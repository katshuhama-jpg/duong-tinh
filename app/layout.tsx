import type { Metadata, Viewport } from 'next';
import './globals.css';

const DESC = 'Game pixel sống trọn một đời người: từ lúc chào đời đến lúc tóc bạc. Học gì, yêu ai, tiêu tiền thế nào, mỗi lựa chọn rẽ đời sang một lối. Không day dứt, chỉ tò mò: nếu rẽ lối khác, đời mình sẽ ra sao?';

export const metadata: Metadata = {
  metadataBase: new URL('https://loveslines.vercel.app'),
  title: { default: 'Đường Đời Rẽ Lối', template: '%s · Đường Đời Rẽ Lối' },
  description: DESC,
  applicationName: 'Đường Đời Rẽ Lối',
  keywords: ['game đời người', 'game hẹn hò', 'game tình yêu', 'pixel', 'life sim', 'Đường Đời Rẽ Lối', "Life's Altered Lines"],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Đường Đời Rẽ Lối',
    title: "Đường Đời Rẽ Lối - Life's Altered Lines",
    description: DESC,
    locale: 'vi_VN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Đường Đời Rẽ Lối - game đời người pixel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Đường Đời Rẽ Lối - Life's Altered Lines",
    description: DESC,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#211833',
};

// đặt giao diện sáng/tối trước khi vẽ để khỏi nháy màn
const THEME_JS = `try{var t=localStorage.getItem('dt.theme');if(t==='light')document.documentElement.dataset.theme='light'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_JS }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
