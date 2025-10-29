// components/ClientProvider.tsx
'use client';

import { useEffect } from 'react';
import useStore from '@/store/store.js';
import Navbar from '@/components/Navbar';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializeSession = useStore((state) => state.initializeSession);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  // Initialize session from cookies/localStorage on mount
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      {children}
    </>
  );
}