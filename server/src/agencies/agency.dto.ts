import z from 'zod';

export const createAgencySchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Agency must be at least 4 characters long' })
    .max(50, { message: 'Agency must be at most 20 characters long' }),
  description: z
    .string()
    .max(500, { message: 'Description must be at most 20 characters long' })
    .optional(),
  phone: z
    .string()
    .regex(/^[0-9+\- ]{6,20}$/, { message: 'Invalid phone number' })
    .optional(),
  email: z.email({ message: 'Invalid email address' }).optional(),
  logo: z.url({ message: 'Invalid url' }).optional(),
  commissionCut: z.number().min(0).max(100).default(15).optional(),
  isApproved: z.boolean().optional(),
});

export type CreateAgencyDto = z.infer<typeof createAgencySchema>;

// PATCH DTO
export const updateAgencySchema = createAgencySchema.partial();

export type UpdateAgencyDto = z.infer<typeof updateAgencySchema>;
