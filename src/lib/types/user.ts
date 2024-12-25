import { z } from 'zod'

export const UserProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark']).default('dark'),
    notifications: z.boolean().default(true)
  }).optional()
})
export type UserProfile = z.infer<typeof UserProfileSchema>