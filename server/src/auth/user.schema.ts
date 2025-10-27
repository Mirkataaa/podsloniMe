import { z } from 'zod';
import { UserRole } from './user.entity';

export const createUserSchema = z.object({
  email: z.email(),
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(64, { message: 'Password must be at most 64 characters long' }),

  role: z.enum(UserRole).optional().default(UserRole.USER),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
