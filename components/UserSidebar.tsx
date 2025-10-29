// app/(user)/UserSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function UserSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounts', href: '/accounts' },
    { label: 'Transactions', href: '/transaction' },
    { label: 'Profile', href: '/user/me' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
            My Account
          </h2>
        </div>

        <nav className="mt-2 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/user/me' && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  block w-full text-left px-4 py-2.5 text-sm font-medium
                  rounded-tr-lg rounded-br-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-green-600 hover:text-white'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}