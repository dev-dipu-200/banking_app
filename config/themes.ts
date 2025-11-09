// config/themes.ts
export type ThemeName = 'light' | 'dark' | 'orange' | 'purple' | 'green';

export interface ThemeConfig {
  name: string;
  value: ThemeName;
  icon: string;
  description: string;
  gradient: string;
  colors: {
    background: string;
    foreground: string;
    cardBg: string;
    cardBorder: string;
    textPrimary: string;
    textSecondary: string;
    accentFrom: string;
    accentTo: string;
    hover: string;
    border: string;
  };
}

export const themes: Record<ThemeName, ThemeConfig> = {
  light: {
    name: 'Light',
    value: 'light',
    icon: '☀️',
    description: 'Bright & Clean',
    gradient: 'from-blue-400 to-blue-500',
    colors: {
      background: '#ffffff',
      foreground: '#171717',
      cardBg: '#ffffff',
      cardBorder: '#e5e7eb',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      accentFrom: '#3b82f6',
      accentTo: '#8b5cf6',
      hover: '#f3f4f6',
      border: '#e5e7eb',
    },
  },
  dark: {
    name: 'Dark',
    value: 'dark',
    icon: '🌙',
    description: 'Easy on Eyes',
    gradient: 'from-gray-700 to-gray-900',
    colors: {
      background: '#0f172a',
      foreground: '#f1f5f9',
      cardBg: '#1e293b',
      cardBorder: '#334155',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      accentFrom: '#3b82f6',
      accentTo: '#8b5cf6',
      hover: '#334155',
      border: '#334155',
    },
  },
  orange: {
    name: 'Orange',
    value: 'orange',
    icon: '🔥',
    description: 'Warm & Vibrant',
    gradient: 'from-orange-400 to-orange-600',
    colors: {
      background: '#fff7ed',
      foreground: '#7c2d12',
      cardBg: '#ffedd5',
      cardBorder: '#fed7aa',
      textPrimary: '#9a3412',
      textSecondary: '#c2410c',
      accentFrom: '#f97316',
      accentTo: '#ea580c',
      hover: '#fed7aa',
      border: '#fdba74',
    },
  },
  purple: {
    name: 'Purple',
    value: 'purple',
    icon: '💜',
    description: 'Royal & Elegant',
    gradient: 'from-purple-400 to-purple-600',
    colors: {
      background: '#faf5ff',
      foreground: '#581c87',
      cardBg: '#f3e8ff',
      cardBorder: '#e9d5ff',
      textPrimary: '#6b21a8',
      textSecondary: '#7c3aed',
      accentFrom: '#a855f7',
      accentTo: '#7c3aed',
      hover: '#e9d5ff',
      border: '#d8b4fe',
    },
  },
  green: {
    name: 'Green',
    value: 'green',
    icon: '🌿',
    description: 'Fresh & Natural',
    gradient: 'from-green-400 to-green-600',
    colors: {
      background: '#f0fdf4',
      foreground: '#14532d',
      cardBg: '#dcfce7',
      cardBorder: '#bbf7d0',
      textPrimary: '#166534',
      textSecondary: '#15803d',
      accentFrom: '#22c55e',
      accentTo: '#16a34a',
      hover: '#bbf7d0',
      border: '#86efac',
    },
  },
};

export const themeList: ThemeConfig[] = Object.values(themes);

export const defaultTheme: ThemeName = 'light';
