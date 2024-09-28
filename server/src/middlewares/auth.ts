import { NextFunction, Request, Response } from 'express'
import * as authService from '../services/auth'
import * as userService from '../services/user'
import { ApplicationError } from '../utils/error'
import type { User } from '@prisma/client'

export type UserWithRole = Pick<
  User,
  'id' | 'email' | 'name' | 'password' | 'phoneNumber'
> & {
  role: {
    id: string
    name: string
  }
}

export async function authorize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const verifyToken = authService.verifyToken(token)

    const user = await userService.getUserById(verifyToken.id)

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    res.locals.auth = user

    next()
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export function isAdmin(
  _req: Request,
  res: Response<unknown, { auth: UserWithRole }>,
  next: NextFunction
) {
  const { name } = res.locals.auth.role

  if (name !== 'ADMIN') {
    res.status(403).json({ message: 'Only admin can access this route' })
    return
  }

  next()
}
