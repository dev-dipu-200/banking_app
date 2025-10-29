// app/(user)/layout.tsx
'use client';
import UserSidebar from '@/components/UserSidebar'; 

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-gray-900">
      <div className="flex flex-1">
        {/* Sidebar – client component (uses usePathname) */}
        <UserSidebar />
        {/* Main content area */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}