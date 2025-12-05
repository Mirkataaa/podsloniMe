import type { User } from './user.types';

export interface AuthState {
  token: string | null;
  user: User | null;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isBroker: () => boolean;
}
