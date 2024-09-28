import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(8),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().email(),
  password: z.string().trim().min(8),
})

export type RegisterSchema = z.infer<typeof registerSchema>

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
  phoneNumber: z.optional(z.string()),
})

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>
