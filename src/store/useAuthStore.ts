import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, AuthData } from '../types/auth';
import { SecureStorage } from '../services/secureStorage';
import { authService } from '../services/authService';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      auth: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

      loginAction: (data: AuthData) => set({
        auth: data,
        isAuthenticated: true
      }),

      logout: async () => {
        const currentAuth = get().auth;

        try {
          if (currentAuth?.refreshToken) {
            await authService.logout(currentAuth.refreshToken);
          }
        } catch (error) {
          console.error("Logout API failed", error);
        } finally {
          set({
            auth: null,
            isAuthenticated: false
          });
        }
      },

      hasPermission: (permission: string) => {
        const permissions = get().auth?.permissions || [];
        return permissions.includes(permission);
      },
    }),
    {
      name:'vending-auth-storage',
      storage:createJSONStorage(()=>SecureStorage),
      onRehydrateStorage:()=>(state)=>{
        state?.setHasHydrated(true);
      }
    }
  )
)