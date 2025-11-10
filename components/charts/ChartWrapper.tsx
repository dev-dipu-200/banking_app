'use client';

import { ReactNode } from 'react';

interface ChartWrapperProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  subtitle?: string;
}

export default function ChartWrapper({
  title,
  children,
  className = '',
  icon,
  subtitle
}: ChartWrapperProps) {
  return (
    <div
      className={`group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.03), transparent 50%)',
      }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Decorative dots */}
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 opacity-60" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 opacity-60" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 opacity-60" />
        </div>
      </div>

      {/* Chart Content */}
      <div className="relative z-10 w-full min-h-[250px] flex items-center justify-center">
        {children}
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
