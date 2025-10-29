// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import useStore from '@/store/store.js';

interface MenuItem {
  label: string;
  href: string;
  isPrivate: boolean;
  subMenu?: MenuItem[];
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  // Zustand store
  const { isAuthenticated, userRole, logout } = useStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleSubMenu = (label: string) =>
    setOpenSubMenu((prev) => (prev === label ? null : label));

  const menuItems: MenuItem[] = [
    { label: 'Home', href: '/', isPrivate: false },
    {
      label: 'Services',
      href: '#',
      isPrivate: false,
      subMenu: [
        { label: 'Checking Account', href: '/services/checking', isPrivate: false },
        { label: 'Savings Account', href: '/services/savings', isPrivate: false },
      ],
    },
    { label: 'Dashboard', href: '/dashboard', isPrivate: true },
    { label: 'Profile', href: '/profile', isPrivate: true },
    { label: 'Contact', href: '/contact', isPrivate: false },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md relative">
      {/* Desktop Header */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            Banking App
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems
              .filter((item) => !item.isPrivate || isAuthenticated)
              .map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    {item.label}
                  </Link>

                  {item.subMenu && (
                    <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md mt-2 w-48 z-20">
                      {item.subMenu
                        .filter((sub) => !sub.isPrivate || isAuthenticated)
                        .map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                          >
                            {sub.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}

            {/* Logout Button (Desktop) */}
            {isAuthenticated && (
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-zinc-600 dark:text-zinc-300 hover:text-blue-500"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-gray-800 z-50 overflow-y-auto md:hidden">
          <div className="p-4 space-y-2">
            {menuItems
              .filter((item) => !item.isPrivate || isAuthenticated)
              .map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-2.5 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-500"
                    >
                      {item.label}
                    </Link>
                    {item.subMenu && (
                      <button
                        onClick={() => toggleSubMenu(item.label)}
                        className="px-3 text-zinc-600 dark:text-zinc-400"
                      >
                        {openSubMenu === item.label ? '−' : '+'}
                      </button>
                    )}
                  </div>

                  {item.subMenu && openSubMenu === item.label && (
                    <div className="pl-6 space-y-1 mt-1">
                      {item.subMenu
                        .filter((sub) => !sub.isPrivate || isAuthenticated)
                        .map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                          >
                            {sub.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}

            {/* Logout Button (Mobile) */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 text-base font-medium text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}