import { create } from 'zustand';
import type { User } from '../../../shared/types/user.types';
import { devtools, persist } from 'zustand/middleware';
import type { AuthState } from '../../../shared/types/auth.types';

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        user: null,

        isLoginModalOpen: false,
        openLoginModal: () => set({ isLoginModalOpen: true }),
        closeLoginModal: () => set({ isLoginModalOpen: false }),

        setAuth: (token: string, user: User) => {
          set({ token, user });
        },

        logout: () => {
          set({ token: null, user: null });
        },

        isAdmin: () => get().user?.role === 'admin',
        isBroker: () => get().user?.role === 'broker',
      }),
      {
        name: 'auth',
        partialize: (state) => ({ token: state.token, user: state.user }),
      },
    ),
  ),
);
