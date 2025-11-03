export type Role = 'user' | 'broker' | 'admin';

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  isApproved: boolean;
  // add agency & timestaps laters
}
