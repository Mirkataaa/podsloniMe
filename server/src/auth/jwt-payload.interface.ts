import { UserRole } from 'src/users/user.entity';

export interface JwtPayload {
  email: string;
  sub: string;
  role: UserRole;
}
