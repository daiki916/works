import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '元店長だいき｜飲食店専門のホームページ制作',
  description:
    'のれんを掛けてきた元店長が、飲食店のホームページをつくります。',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
