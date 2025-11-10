// components/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useStore from '@/store/store.js';
import { useToast } from '@/components/ToastProvider';

export default function AdminSidebar() {
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

  const navItems = [
    {
      label: 'Admin Home',
      href: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      label: 'Accounts',
      href: '/admin/accounts',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      label: 'Reports',
      href: '/admin/reports',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
  ];

  return (
    <aside
      className="w-64 shadow-2xl border-r h-screen sticky top-16 flex flex-col"
      style={{
        background: `linear-gradient(to bottom, var(--card-bg), var(--background))`,
        borderColor: 'var(--card-border)',
      }}
    >
      {/* Sidebar Header */}
      <div
        className="p-6 border-b"
        style={{
          background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
          borderColor: 'var(--card-border)',
        }}
      >
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

      {/* Navigation */}
      <nav className="mt-4 p-3 space-y-2 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105"
              style={
                isActive
                  ? {
                      background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      transform: 'scale(1.05)',
                    }
                  : { color: 'var(--text-primary)' }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
              {isActive && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button at bottom */}
      <div
        className="p-3 border-t"
        style={{ borderColor: 'var(--card-border)' }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all shadow-lg transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
