import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const lineSeedsSansTh = localFont({
  src: [
    {
      path: '../../public/fonts/LINESeedSansTH_W_Th.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LINESeedSansTH_W_Rg.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LINESeedSansTH_W_Bd.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LINESeedSansTH_W_XBd.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'e-Workpermit : Line Register',
  description: 'e-Workpermit : ระบบอนุญาตทำงานของคนต่างด้าวทางอิเล็กทรอนิกส์',
};

const RootLayout: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <html lang="en">
    <body className={`${lineSeedsSansTh.className}`}>{children}</body>
  </html>
);

export default RootLayout;
