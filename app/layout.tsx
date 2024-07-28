import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/layout';

export const metadata = {
  title: 'MongoDB Starter',
  description: 'MongoDB Starter for Next.js 14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
}