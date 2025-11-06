import { z } from 'zod';
import { UserRole } from './user.entity';
import { createAgencySchema } from 'src/agencies/agency.dto';

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
  createNewAgency: z.boolean().optional(),
  agencyId: z.string().optional(),
  agency: createAgencySchema.optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' }),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;

export class LoginReponseDto {
  accessToken: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: UserRole;
    isApproved: boolean;
  };
}
