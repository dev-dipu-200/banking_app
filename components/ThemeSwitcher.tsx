// components/ThemeSwitcher.tsx
'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { themeList } from '@/config/themes';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  let theme, setTheme;

  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    setTheme = themeContext.setTheme;
  } catch (e) {
    // If ThemeProvider is not available, don't render anything
    return null;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  const currentTheme = themeList.find(t => t.value === theme) || themeList[0];

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {/* Theme Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
        style={{
          background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
          color: 'white',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
        aria-label="Change theme"
      >
        <span className="text-xl">{currentTheme.icon}</span>
        <span className="hidden md:block text-sm font-semibold">{currentTheme.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div
            className="absolute right-0 mt-3 w-72 rounded-2xl shadow-2xl z-50 overflow-hidden animate-scale-in"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3"
              style={{
                background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
                color: 'white',
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider">Choose Theme</h3>
                <span className="text-xs opacity-80">{themeList.length} themes</span>
              </div>
            </div>

            {/* Theme Options */}
            <div className="p-3 space-y-2">
              {themeList.map((t) => {
                const isActive = theme === t.value;
                return (
                  <button
                    key={t.value}
                    onClick={() => {
                      setTheme(t.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'shadow-lg transform scale-105'
                        : 'hover:scale-102'
                    }`}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${t.colors.accentFrom}, ${t.colors.accentTo})`
                        : 'var(--hover)',
                      color: isActive ? 'white' : 'var(--text-primary)',
                      border: `2px solid ${isActive ? 'transparent' : 'var(--border)'}`,
                    }}
                  >
                    {/* Theme Icon */}
                    <div className="flex-shrink-0">
                      <span className="text-3xl">{t.icon}</span>
                    </div>

                    {/* Theme Info */}
                    <div className="flex-1 text-left">
                      <p className="font-bold text-base">{t.name}</p>
                      <p
                        className="text-xs mt-0.5"
                        style={{
                          color: isActive ? 'rgba(255, 255, 255, 0.85)' : 'var(--text-secondary)',
                        }}
                      >
                        {t.description}
                      </p>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Preview Dots */}
                    {!isActive && (
                      <div className="flex space-x-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: t.colors.accentFrom }}
                        />
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: t.colors.accentTo }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div
              className="px-4 py-3 text-center border-t"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--background)',
              }}
            >
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Theme changes are saved automatically
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
