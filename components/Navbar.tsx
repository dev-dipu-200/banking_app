// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import useStore from '@/store/store.js';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useToast } from '@/components/ToastProvider';

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
  const toast = useToast();

  const handleLogout = () => {
    toast.info('Logging you out...', 'Goodbye');
    setTimeout(() => {
      logout();
      toast.success('You have been logged out successfully', 'Logged Out');
    }, 500);
  };

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
    // { label: 'Dashboard', href: '/dashboard', isPrivate: true },
    { label: 'Profile', href: '/profile', isPrivate: true },
    { label: 'Contact', href: '/contact', isPrivate: false },
  ];

  return (
    <nav
      className="shadow-lg fixed top-0 left-0 right-0 z-50"
      style={{
        background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
      }}
    >
      {/* Desktop Header */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-white hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold">Banking App</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems
              .filter((item) => !item.isPrivate || isAuthenticated)
              .map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {item.label}
                  </Link>

                  {item.subMenu && (
                    <div
                      className="absolute hidden group-hover:block shadow-2xl rounded-xl mt-2 w-52 z-20 overflow-hidden"
                      style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                      }}
                    >
                      {item.subMenu
                        .filter((sub) => !sub.isPrivate || isAuthenticated)
                        .map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block px-4 py-3 text-sm transition-all hover:opacity-80"
                            style={{ color: 'var(--text-primary)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--hover)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Logout Button (Desktop) */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 text-sm font-semibold bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all"
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
        <div
          className="fixed inset-0 top-16 z-50 overflow-y-auto md:hidden"
          style={{
            background: `linear-gradient(135deg, var(--background), var(--card-bg))`,
          }}
        >
          <div className="p-4 space-y-2">
            {menuItems
              .filter((item) => !item.isPrivate || isAuthenticated)
              .map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-2.5 text-base font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.label}
                    </Link>
                    {item.subMenu && (
                      <button
                        onClick={() => toggleSubMenu(item.label)}
                        className="px-3"
                        style={{ color: 'var(--text-secondary)' }}
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
                            className="block px-4 py-2 text-sm transition-all"
                            style={{ color: 'var(--text-secondary)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--hover)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
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
                  handleLogout();
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