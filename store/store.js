// store/store.js
'use client';

import { create } from 'zustand';

const useStore = create((set, get) => ({
  formData: {},
  isAuthenticated: false,
  userRole: null,
  userId: null,
  authToken: null,

  setFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  resetFormData: () =>
    set({ formData: {} }),

  login: (token, role, userId) => {
    set({
      isAuthenticated: true,
      userRole: role,
      userId,
      authToken: token,
    });
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_role', role);
    localStorage.setItem('user_id', userId);
  },

  logout: () => {
    set({
      isAuthenticated: false,
      userRole: null,
      userId: null,
      authToken: null,
    });
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');

    // Clear cookies as well
    if (typeof document !== 'undefined') {
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

      // Redirect to home page
      window.location.href = '/';
    }
  },

  updateSession: (token, role, userId) => {
    set({
      isAuthenticated: !!token,
      userRole: role,
      userId,
      authToken: token,
    });
  },

  initializeSession: () => {
    if (typeof window === 'undefined') return;

    // Try to get from cookies first
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    let token = getCookie('auth_token');
    let role = getCookie('user_role');
    let userId = getCookie('user_id');

    // Fall back to localStorage if cookies not found
    if (!token) {
      token = localStorage.getItem('auth_token');
      role = localStorage.getItem('user_role');
      userId = localStorage.getItem('user_id');

      // If found in localStorage, sync to cookies
      if (token) {
        document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Strict`;
        document.cookie = `user_role=${role}; path=/; max-age=86400; SameSite=Strict`;
        document.cookie = `user_id=${userId}; path=/; max-age=86400; SameSite=Strict`;
      }
    }

    if (token) {
      get().updateSession(token, role, userId);
    }
  },
}));

export default useStore;