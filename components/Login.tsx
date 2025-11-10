// components/Login.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store/store.js';
import { useToast } from '@/components/ToastProvider';

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
  const toast = useToast();

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
      toast.error('User not found. Please check your username.', 'Login Failed');
      setIsLoading(false);
      return;
    }

    if (user.password !== password) {
      setError('Incorrect password');
      toast.error('Incorrect password. Please try again.', 'Login Failed');
      setIsLoading(false);
      return;
    }

    // Success → Login via store
    const token = `fake-jwt-${normalizedUsername}-${Date.now()}`;
    login(token, user.role, user.userId);

    // Set cookies for middleware
    document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Strict`;
    document.cookie = `user_role=${user.role}; path=/; max-age=86400; SameSite=Strict`;
    document.cookie = `user_id=${user.userId}; path=/; max-age=86400; SameSite=Strict`;

    // Show success toast
    toast.success(
      `Welcome ${normalizedUsername}! Redirecting to ${user.role === 'admin' ? 'admin panel' : 'dashboard'}...`,
      'Login Successful'
    );

    // Redirect based on role
    setTimeout(() => {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center font-sans">
      <form
        onSubmit={handleSubmit}
        style={{ width }}
        className={`p-8 rounded-2xl shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm w-full ${sizeClasses[size] || sizeClasses.md} border border-gray-200 dark:border-gray-700`}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sign In
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        {fields.map((field) => (
          <div key={field.id} className="mb-5">
            <label
              htmlFor={field.id}
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              {field.label}
            </label>
            <div className="relative">
              <input
                type={field.type}
                id={field.id}
                value={formData[field.id as keyof typeof formData] || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
                required
                disabled={isLoading}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
              {field.type === 'password' && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              )}
              {field.type === 'text' && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg
            ${isLoading
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:scale-[1.02] hover:shadow-xl'
            }
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Demo Credentials:</span><br />
            <span className="font-mono">Dipu</span> or <span className="font-mono">user</span> / <span className="font-mono">Dipu1234@</span>
          </p>
        </div>
      </form>
    </div>
  );
}