// components/Login.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store/store.js';

interface Field {
  id: string;
  label: string;
  type: string;
}

interface LoginProps {
  width?: string;
  size?: 'sm' | 'md' | 'lg';
  fields?: Field[];
}

export default function Login({
  width = '400px',
  size = 'md',
  fields = [
    { id: 'username', label: 'Username', type: 'text' },
    { id: 'password', label: 'Password', type: 'password' },
  ],
}: LoginProps) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useStore();

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { username, password } = formData;

    // Normalize username to lowercase
    const normalizedUsername = username.trim().toLowerCase();

    // Hard‑coded users (case‑insensitive)
    const users: Record<
      string,
      { password: string; role: 'admin' | 'user'; userId: string }
    > = {
      dipu: { password: 'Dipu1234@', role: 'admin', userId: 'admin-001' },
      user: { password: 'Dipu1234@', role: 'user', userId: 'user-001' },
    };

    const user = users[normalizedUsername];

    if (!user) {
      setError('User not found');
      setIsLoading(false);
      return;
    }

    if (user.password !== password) {
      setError('Incorrect password');
      setIsLoading(false);
      return;
    }

    // Success → Login via store
    const token = `fake-jwt-${normalizedUsername}-${Date.now()}`;
    login(token, user.role, user.userId);

    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] font-sans">
      <form
        onSubmit={handleSubmit}
        style={{ width }}
        className={`p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 w-full ${sizeClasses[size] || sizeClasses.md}`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-zinc-800 dark:text-zinc-200">
          Login
        </h2>

        {fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label
              htmlFor={field.id}
              className="block text-zinc-700 dark:text-zinc-300 mb-2"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              value={formData[field.id as keyof typeof formData] || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              disabled={isLoading}
            />
          </div>
        ))}

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full py-2 rounded-lg font-medium transition-all
            ${isLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }
          `}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-4 text-xs text-center text-zinc-500 dark:text-zinc-400">
          Try: <strong>Dipu</strong> or <strong>user</strong> / <strong>Dipu1234@</strong>
        </p>
      </form>
    </div>
  );
}