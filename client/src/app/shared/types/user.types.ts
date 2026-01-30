import type { Agency } from './agency.types';

export type Role = 'user' | 'broker' | 'admin';

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  isApproved: boolean;
  agency?: Agency;
  // add agency & timestaps laters
}
