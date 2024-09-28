import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { formatZodError } from '../../utils/error'

const uuidSchema = z.string().uuid()

export function checkUUID(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params

  const validate = uuidSchema.safeParse(id)

  if (!validate.success) {
    res.status(400).json({ message: formatZodError(validate.error) })
    return
  }

  next()
}
