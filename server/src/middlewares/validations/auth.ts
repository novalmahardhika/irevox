import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { formatZodError } from '../../utils/error'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type PayloadAuthType = z.infer<typeof authSchema>

export function checkAuthPayload(
  req: Request<unknown, unknown, PayloadAuthType>,
  res: Response,
  next: NextFunction
) {
  const body = req.body

  const validate = authSchema.safeParse(body)

  if (!validate.success) {
    res.status(400).json({ message: formatZodError(validate.error) })
    return
  }

  next()
}

const registerSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

export type PayloadRegisterType = z.infer<typeof registerSchema>

export function checkAuthRegisterPayload(
  req: Request<unknown, unknown, PayloadRegisterType>,
  res: Response,
  next: NextFunction
) {
  const body = req.body

  const validate = registerSchema.safeParse(body)

  if (!validate.success) {
    res.status(400).json({ message: formatZodError(validate.error) })
    return
  }

  next()
}
