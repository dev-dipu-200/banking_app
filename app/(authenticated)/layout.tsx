// app/(authenticated)/layout.tsx
'use client';
import UserSidebar from '@/components/UserSidebar';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Sidebar – client component (uses usePathname) */}
      <UserSidebar />

      {/* Main content area with proper margin for sidebar */}
      <main className="pt-16 min-h-screen md:pl-64 transition-all duration-300">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
