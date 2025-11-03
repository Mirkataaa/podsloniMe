import z from 'zod';

export const roleEnum = z.enum(['user', 'broker', 'admin']);

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.email(),
  username: z.string(),
  role: roleEnum,
  isApproved: z.boolean(),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: userResponseSchema,
});

export type LoginReponseDto = z.infer<typeof loginResponseSchema>;
