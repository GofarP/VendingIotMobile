import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, AuthData } from '../types/auth';
import { SecureStorage } from '../services/secureStorage';
import { authService } from '../services/authService';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      auth: null,
      isAuthenticated: false,

      loginAction: (data: AuthData) => set({ 
        auth: data, 
        isAuthenticated: true 
      }),

     logout: async () => {
        const currentAuth = get().auth;

        if (currentAuth?.refreshToken) {
          await authService.logout(currentAuth.refreshToken);
        }

        set({ 
          auth: null, 
          isAuthenticated: false 
        });
      },

      hasPermission: (permission: string) => {
        const permissions = get().auth?.permissions || [];
        return permissions.includes(permission);
      },
    }),
    {
      name: 'vending-auth-storage',
      storage: createJSONStorage(() => SecureStorage),
    }
  )
);