import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppProviders from '@/providers/AppProviders';
import { ConditionalNavbar } from '@/components/ConditionalNavbar';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'AI Fitness Coach - Transform Your Body',
  description: 'AI-powered fitness and nutrition coaching',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AppProviders>
          <ConditionalNavbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
