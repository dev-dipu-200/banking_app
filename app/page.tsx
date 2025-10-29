'use client'
import { useState } from 'react';
import Login from "@/components/Login";
import Register from "@/components/Register";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [activeForm, setActiveForm] = useState('login');

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans dark:bg-gray-600">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-200 text-center mb-8">
          Welcome to Banking App!
        </h1>
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${activeForm === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-zinc-800 dark:bg-gray-700 dark:text-zinc-200'} hover:bg-blue-600 hover:text-white transition-colors`}
            onClick={() => setActiveForm('login')}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${activeForm === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-zinc-800 dark:bg-gray-700 dark:text-zinc-200'} hover:bg-blue-600 hover:text-white transition-colors`}
            onClick={() => setActiveForm('register')}
          >
            Register
          </button>
        </div>
        {activeForm === 'login' ? (
          <Login
            width="400px"
            fields={[
              { id: "username", label: "Username", type: "text" },
              { id: "password", label: "Password", type: "password" },
            ]}
          />
        ) : (
          <Register
            width="500px"
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
  );
}