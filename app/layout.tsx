// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Banking App',
  description: 'Secure banking platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Replace with real auth (cookies, context, etc.)
  const isAuthenticated = false;

  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-zinc-50 dark:bg-gray-600" cz-shortcut-listen="true">
        <Navbar isAuthenticated={isAuthenticated} />
        {children}
      </body>
    </html>
  );
}