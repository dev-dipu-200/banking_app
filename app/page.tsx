'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from "@/components/Login";
import Register from "@/components/Register";
import useStore from '@/store/store.js';

export default function Home() {
  const [activeForm, setActiveForm] = useState('login');
  const router = useRouter();
  const { isAuthenticated, userRole } = useStore();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && userRole) {
      if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, userRole, router]);

  return (
    <div
      className="min-h-screen font-sans relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--background) 0%, var(--card-bg) 50%, var(--background) 100%)`
      }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 animate-blob"
        style={{ background: 'var(--accent-from)' }}
      ></div>
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"
        style={{ background: 'var(--accent-to)' }}
      ></div>
      <div
        className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full filter blur-3xl opacity-15 animate-blob animation-delay-4000"
        style={{ background: 'var(--accent-from)' }}
      ></div>

      {/* Main Grid Layout: 8 columns (Hero) + 4 columns (Form) */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 relative z-10">
        {/* Left Side - Hero Section (8 columns) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-8 lg:p-12">
          <div className="max-w-3xl w-full animate-slide-in">
            {/* Logo/Icon */}
            <div className="mb-8">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform"
                style={{
                  background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`
                }}
              >
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold gradient-text mb-6 leading-tight">
              Welcome to Your Banking Hub
            </h1>

            {/* Description */}
            <p className="text-xl lg:text-2xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Your trusted partner for secure banking and financial management. Experience seamless transactions, real-time updates, and world-class security.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--card-bg)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--accent-from)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Secure Transactions</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Bank-grade encryption for all your transfers</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--card-bg)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--accent-from)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Instant Updates</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Real-time notifications for every transaction</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--card-bg)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--accent-from)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Detailed Analytics</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Track your spending with smart insights</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--card-bg)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--accent-from)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>24/7 Support</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Always here to help you</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section (4 columns) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 lg:p-12 border-l" style={{ borderColor: 'var(--card-border)' }}>
          <div className="w-full max-w-md">
            {/* Form Toggle Buttons */}
            <div
              className="flex space-x-3 mb-8 p-1.5 rounded-xl shadow-lg"
              style={{ background: 'var(--card-bg)' }}
            >
              <button
                className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                style={
                  activeForm === 'login'
                    ? {
                        background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
                        color: 'white',
                        transform: 'scale(1.02)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }
                    : { color: 'var(--text-secondary)' }
                }
                onClick={() => setActiveForm('login')}
                onMouseEnter={(e) => {
                  if (activeForm !== 'login') {
                    e.currentTarget.style.background = 'var(--hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeForm !== 'login') {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                Login
              </button>
              <button
                className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                style={
                  activeForm === 'register'
                    ? {
                        background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
                        color: 'white',
                        transform: 'scale(1.02)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }
                    : { color: 'var(--text-secondary)' }
                }
                onClick={() => setActiveForm('register')}
                onMouseEnter={(e) => {
                  if (activeForm !== 'register') {
                    e.currentTarget.style.background = 'var(--hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeForm !== 'register') {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                Register
              </button>
            </div>

            {/* Forms */}
            <div className="animate-fade-in">
              {activeForm === 'login' ? (
                <Login
                  width="100%"
                  fields={[
                    { id: "username", label: "Username", type: "text" },
                    { id: "password", label: "Password", type: "password" },
                  ]}
                />
              ) : (
                <Register
                  width="100%"
                  fields={[
                    { id: "username", label: "Username", type: "text" },
                    { id: "password", label: "Password", type: "password" },
                    { id: "confirmPassword", label: "Confirm Password", type: "password" },
                    { id: "type", label: "Account Type", type: "text" },
                    { id: "phone", label: "Phone Number", type: "tel" },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}