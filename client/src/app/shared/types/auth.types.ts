import type { User } from './user.types';

export interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isBroker: () => boolean;
}
