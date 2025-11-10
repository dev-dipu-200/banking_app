// app/(admin)/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useStore from '@/store/store.js';
import { useToast } from '@/components/ToastProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useStore();
  const toast = useToast();

  const handleLogout = () => {
    toast.info('Logging you out...', 'Goodbye Admin');
    setTimeout(() => {
      logout();
      toast.success('You have been logged out successfully', 'Logged Out');
    }, 500);
  };

  const links = [
    { label: 'Admin Home', href: '/admin' },
    { label: 'Reports', href: '/admin/reports' },
    { label: 'Users', href: '/admin/users' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-2xl border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Admin Panel</h2>
                <p className="text-xs text-white/70">Management Console</p>
              </div>
            </div>
          </div>

          <nav className="mt-4 p-3 space-y-2 flex-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:scale-105'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button at bottom */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}