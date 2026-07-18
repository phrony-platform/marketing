import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import { GoogleAnalytics } from '@/components/google-analytics';
import { SiteJsonLd } from '@/components/site-json-ld';
import { heroDescription } from '@/lib/hero-title';
import { PHRONY_DOCS_ORIGIN } from '@/lib/project-urls';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(PHRONY_DOCS_ORIGIN),
  title: {
    default: 'Phrony',
    template: '%s · Phrony',
  },
  description: heroDescription,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: 'Phrony',
    title: 'Phrony',
    description: heroDescription,
    url: PHRONY_DOCS_ORIGIN,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phrony',
    description: heroDescription,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <SiteJsonLd />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
