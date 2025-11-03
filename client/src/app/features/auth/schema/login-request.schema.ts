import z from 'zod';

export const loginUserSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .max(20, 'Password must be at most 20 characters long'),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
