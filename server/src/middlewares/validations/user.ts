import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { formatZodError } from '../../utils/error'

const userSchema = z.object({
  roleId: z.string().uuid(),
  name: z.string().trim(),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().optional(),
})

export type PayloadUserType = z.infer<typeof userSchema>

export function checkUserPayload(
  req: Request<unknown, unknown, PayloadUserType>,
  res: Response,
  next: NextFunction
) {
  const body = req.body

  const validate = userSchema.safeParse(body)

  if (!validate.success) {
    res.status(400).json({ message: formatZodError(validate.error) })
    return
  }

  next()
}

const userUpdateSchema = z.object({
  roleId: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).optional(),
  phoneNumber: z.string().optional(),
})

export function checkUpdateUserPayload(
  req: Request<unknown, unknown, PayloadUserType>,
  res: Response,
  next: NextFunction
) {
  const body = req.body

  const validate = userUpdateSchema.safeParse(body)

  if (!validate.success) {
    res.status(400).json({ message: formatZodError(validate.error) })
    return
  }

  next()
}
