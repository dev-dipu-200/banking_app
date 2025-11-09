// contexts/ThemeContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeName, defaultTheme } from '@/config/themes';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    // Get saved theme from localStorage or use default
    const savedTheme = (localStorage.getItem('theme') as ThemeName) || defaultTheme;

    // Apply theme immediately to avoid flash
    applyTheme(savedTheme);
    setTheme(savedTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: ThemeName) => {
    const root = document.documentElement;

    // Remove all possible theme classes
    root.classList.remove('light', 'dark', 'orange', 'purple', 'green');

    // Add new theme class
    root.classList.add(newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme);

    // Update meta theme color for mobile browsers
    updateMetaThemeColor(newTheme);
  };

  const updateMetaThemeColor = (themeName: ThemeName) => {
    const colors: Record<ThemeName, string> = {
      light: '#ffffff',
      dark: '#0f172a',
      orange: '#fff7ed',
      purple: '#faf5ff',
      green: '#f0fdf4',
    };

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', colors[themeName]);
  };

  const handleSetTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
