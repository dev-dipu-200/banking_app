// app/(admin)/layout.tsx
'use client';

import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <div className="flex">
        {/* Admin Sidebar Component */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6" style={{ background: 'var(--background)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}