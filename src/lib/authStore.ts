// lib/authStore.ts
import { create } from 'zustand';

interface User {
  username: string;
  userId?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  
  setUser: (user) => set({ user, isLoading: false }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      set({ user: null, isLoading: false });
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user on error
      set({ user: null, isLoading: false });
    }
  },
  
  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        set({ user: userData, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ user: null, isLoading: false });
    }
  },
}));