import e, { NextFunction, Request, Response } from 'express'
import * as userService from '../services/user'
import { ApplicationError } from '../utils/error'

export async function checkUserExist(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params

  try {
    const user = await userService.getUserById(id)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.locals.user = user

    next()
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }

    res.status(500).json({ message: 'Internal server error' })
    return
  }
}
