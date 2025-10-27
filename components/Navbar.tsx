'use client'
import { useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  label: string;
  href: string;
  isPrivate: boolean;
  subMenu?: MenuItem[];
}

interface NavbarProps {
  menuItems?: MenuItem[];
  isAuthenticated?: boolean;
}

export default function Navbar({
  menuItems = [
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
  ],
  isAuthenticated = false,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSubMenu = (label: string) => setOpenSubMenu(openSubMenu === label ? null : label);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md relative">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
              Banking App
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {menuItems
              .filter((item) => !item.isPrivate || (item.isPrivate && isAuthenticated))
              .map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className="text-zinc-600 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                  {item.subMenu && (
                    <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md mt-2 w-48 z-20">
                      {item.subMenu
                        .filter((subItem) => !subItem.isPrivate || (subItem.isPrivate && isAuthenticated))
                        .map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-zinc-600 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-gray-800 z-30 max-h-screen overflow-y-auto md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems
              .filter((item) => !item.isPrivate || (item.isPrivate && isAuthenticated))
              .map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center">
                    <Link
                      href={item.href}
                      className="block text-zinc-600 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.subMenu && (
                      <button
                        onClick={() => toggleSubMenu(item.label)}
                        className="text-zinc-600 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2"
                      >
                        {openSubMenu === item.label ? '-' : '+'}
                      </button>
                    )}
                  </div>
                  {item.subMenu && openSubMenu === item.label && (
                    <div className="pl-4 space-y-1">
                      {item.subMenu
                        .filter((subItem) => !subItem.isPrivate || (subItem.isPrivate && isAuthenticated))
                        .map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}