import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(8),
})

export const registerSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().email(),
  password: z.string().trim().min(8),
})

export const userSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().email(),
  password: z.string().trim().min(8),
  phoneNumber: z.optional(z.string()),
  role: z.string(),
})

export const userUpdateSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().email(),
  // password: z.string().trim().min(8),
  phoneNumber: z.optional(z.string()),
  // roleId: z.optional(z.string()),
})
