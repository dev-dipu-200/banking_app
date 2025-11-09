'use client'
import { useState } from 'react';
import Login from "@/components/Login";
import Register from "@/components/Register";

export default function Home() {
  const [activeForm, setActiveForm] = useState('login');

  return (
    <div
      className="min-h-screen flex flex-col font-sans relative overflow-hidden"
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

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-in">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Welcome Back!
          </h1>
          <p className="text-lg max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Your trusted partner for secure banking and financial management
          </p>
        </div>

        {/* Form Toggle Buttons */}
        <div
          className="flex space-x-3 mb-8 p-1.5 rounded-xl shadow-lg"
          style={{ background: 'var(--card-bg)' }}
        >
          <button
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            style={
              activeForm === 'login'
                ? {
                    background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
                    color: 'white',
                    transform: 'scale(1.05)',
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
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            style={
              activeForm === 'register'
                ? {
                    background: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
                    color: 'white',
                    transform: 'scale(1.05)',
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
        <div className="w-full max-w-md animate-fade-in">
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