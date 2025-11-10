// components/ClientProvider.tsx
'use client';

import { useEffect } from 'react';
import useStore from '@/store/store.js';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ToastProvider from '@/components/ToastProvider';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializeSession = useStore((state) => state.initializeSession);

  // Initialize session from cookies/localStorage on mount
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return (
    <ThemeProvider>
      <ToastProvider>
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}