// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import ClientProvider from '@/components/ClientProvider';

export const metadata: Metadata = {
  title: 'Banking App',
  description: 'Secure banking platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full min-h-screen" suppressHydrationWarning>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}