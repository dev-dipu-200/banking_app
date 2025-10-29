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
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role');
    const userId = localStorage.getItem('user_id');
    if (token) {
      get().updateSession(token, role, userId);
    }
  },
}));

export default useStore;