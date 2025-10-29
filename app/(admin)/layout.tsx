// app/(admin)/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Admin Home', href: '/admin' },
    { label: 'Reports', href: '/admin/reports' },
    { label: 'Users', href: '/admin/users' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* <Navbar isAuthenticated={true} /> */}

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen sticky top-0">
          <div className="p-4">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Admin Panel</h2>
          </div>
          <nav className="mt-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}