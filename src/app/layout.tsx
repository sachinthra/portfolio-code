import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sachinthra.github.io'),
  title: {
    default: 'Sachinthra N V — Software Engineer',
    template: '%s | Sachinthra N V',
  },
  description:
    'Portfolio of Sachinthra N V — SDE-2 at HPE specializing in cloud solutions, backend development, and IoT projects.',
  keywords: [
    'Sachinthra N V', 'Cloud Developer', 'Software Engineer', 'HPE', 'Portfolio',
    'Go', 'Python', 'Robotics', 'IoT', 'React', 'DevOps', 'Raspberry Pi',
  ],
  authors: [{ name: 'Sachinthra N V' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Sachinthra N V',
    title: 'Sachinthra N V — Software Engineer | Cloud & IoT',
    description: 'SDE-2 at HPE. Building cloud-native solutions, self-hosted infrastructure, and IoT systems with Go, Python, Docker & Kubernetes.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@sachinthra',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sachinthra N V',
    url: 'https://sachinthra.github.io',
    jobTitle: 'Software Development Engineer II',
    worksFor: { '@type': 'Organization', name: 'Hewlett Packard Enterprise' },
    sameAs: [
      'https://github.com/sachinthra',
      'https://linkedin.com/in/sachinthra/',
      'https://x.com/Sachinthra',
    ],
    knowsAbout: ['Cloud Computing', 'Go', 'Python', 'Docker', 'Kubernetes', 'IoT', 'Raspberry Pi'],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
