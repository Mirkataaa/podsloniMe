import z from 'zod';

export const createUserSchema = z.object({
  email: z.email(),
  username: z
    .string()
    .min(4, 'Username must be at least 4 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(64, 'Password must be at most 64 characters long'),

  role: z.enum(['user', 'broker', 'admin']).default('user'),

  agencyName: z.string().optional(),
  agencyId: z.string().optional(),
  createNewAgency: z.boolean().optional(),
  description: z.string().optional(),
  phone: z.string().optional(),
  emailAgency: z.email().optional(),
  logo: z.string().optional(),
  commissionCut: z.coerce.number().optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
