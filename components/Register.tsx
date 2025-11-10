'use client';

import { useState } from 'react';
import { useToast } from '@/components/ToastProvider';

interface Field {
  id: string;
  label: string;
  type: string;
}

interface RegisterProps {
  width?: string;
  size?: 'sm' | 'md' | 'lg';
  fields?: Field[];
}

export default function Register({
  width = "400px",
  size = "md",
  fields = [
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "password" },
    { id: "confirmPassword", label: "Confirm Password", type: "password" },
    { id: "type", label: "Account Type", type: "text" },
    { id: "phone", label: "Phone Number", type: "tel" },
  ]
}: RegisterProps) {
  const toast = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', 'Validation Error');
      return;
    }

    // Validate required fields
    const requiredFields = ['email', 'password', 'confirmPassword', 'type', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.warning('Please fill in all required fields', 'Incomplete Form');
      return;
    }

    // Show warning that registration is not yet implemented
    toast.warning('Registration functionality is currently in development. Please use the login form with demo credentials.', 'Coming Soon');
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'password':
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'tel':
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex items-center justify-center font-sans">
      <form
        onSubmit={handleSubmit}
        style={{ width }}
        className={`p-8 rounded-2xl shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm w-full ${sizeClasses[size] || sizeClasses.md} border border-gray-200 dark:border-gray-700`}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Join us and start managing your finances
          </p>
        </div>

        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                htmlFor={field.id}
              >
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.type}
                  id={field.id}
                  value={formData[field.id] || ''}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getFieldIcon(field.type)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-[1.02] hover:shadow-xl"
        >
          Create Account
        </button>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
            Registration is currently in development. Please use the login form with demo credentials.
          </p>
        </div>
      </form>
    </div>
  );
}