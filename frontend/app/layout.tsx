import type { Metadata } from 'next';
import { Poppins, Inter, Space_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Webcraft Studio — Premium Web Development Agency',
    template: '%s | Webcraft Studio',
  },
  description: 'We build high-converting websites and digital experiences for modern brands. Custom web development, design, and optimization.',
  keywords: ['web development', 'web design', 'Next.js', 'React', 'digital agency'],
  authors: [{ name: 'Webcraft Studio' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://webcraftstudio.com',
    siteName: 'Webcraft Studio',
    title: 'Webcraft Studio — Premium Web Development Agency',
    description: 'We build high-converting websites and digital experiences for modern brands.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webcraft Studio',
    description: 'We build high-converting websites for modern brands.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} ${spaceMono.variable} bg-gray-950 text-white antialiased font-inter`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
