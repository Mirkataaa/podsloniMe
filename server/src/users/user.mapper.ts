import { User } from './user.entity';

export function toUserDto(user: User) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    isApproved: user.isApproved,
  };
}
