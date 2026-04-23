import type { Metadata } from 'next';
import './globals.css';
import 'lenis/dist/lenis.css';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { IntroGate } from '@/components/providers/IntroGate';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { AnalyticsTracker } from '@/components/providers/AnalyticsTracker';

export const metadata: Metadata = {
  metadataBase: new URL('https://webcraftstudio.com'),
  title: {
    default: 'Webcraft Studio — Global Digital Experience Agency',
    template: '%s | Webcraft Studio',
  },
  description:
    'We engineer premium digital experiences for global brands. High-converting websites, immersive UI, and scalable web systems for startups and enterprises worldwide.',
  keywords: [
    'web design agency for startups',
    'high converting websites',
    'modern web design studio',
    'premium web development',
    'digital experience agency',
    'Next.js development',
    'UI/UX design agency',
  ],
  authors: [{ name: 'Webcraft Studio' }],
  creator: 'Webcraft Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://webcraftstudio.com',
    siteName: 'Webcraft Studio',
    title: 'Webcraft Studio — Global Digital Experience Agency',
    description:
      'We engineer premium digital experiences for global brands. High-converting websites, immersive UI, and scalable web systems.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Webcraft Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webcraft Studio',
    description: 'We engineer premium digital experiences for global brands.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="noise-overlay">
        <LenisProvider>
          <CustomCursor />
          <AnalyticsTracker />
          <IntroGate>
            <PageTransition>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </PageTransition>
          </IntroGate>
        </LenisProvider>
      </body>
    </html>
  );
}
