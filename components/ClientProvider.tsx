// components/ClientProvider.tsx
'use client';

import { useEffect } from 'react';
import useStore from '@/store/store.js';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/contexts/ThemeContext';

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
      <Navbar />
      {children}
    </ThemeProvider>
  );
}