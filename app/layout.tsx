import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import ClientSessionProvider from '@/components/ClientSessionProvider';

export const metadata: Metadata = {
  title: 'MongoDB Starter Kit',
  description: 'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
  metadataBase: new URL('https://mongodb.vercel.app'),
  openGraph: {
    title: 'MongoDB Starter Kit',
    description: 'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
    url: 'https://mongodb.vercel.app',
    siteName: 'MongoDB Starter Kit',
    images: [
      {
        url: 'https://assets.vercel.com/image/upload/v1654626375/twitter-cards/mongo-integration-starter.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MongoDB Starter Kit',
    description: 'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
    creator: '@StevenTey',
    images: ['https://assets.vercel.com/image/upload/v1654626375/twitter-cards/mongo-integration-starter.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#7b46f6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}