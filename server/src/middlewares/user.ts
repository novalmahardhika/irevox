import { NextFunction, Request, Response } from 'express'
import * as userService from '../services/user'
import * as roleService from '../services/role'
import { ApplicationError } from '../utils/error'
import { PayloadUserType } from './validations/user'

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

export async function checkRoleId(
  req: Request<{ id: string }, unknown, PayloadUserType>,
  res: Response,
  next: NextFunction
) {
  const { roleId } = req.body

  try {
    const role = await roleService.getRoleById(roleId)

    if (!role) {
      res.status(404).json({ message: 'Role not found' })
      return
    }

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
