import { Request, Response } from 'express'
import * as userService from '../services/user'
import * as authService from '../services/auth'
import { ApplicationError } from '../utils/error'
import { User } from '@prisma/client'
import { PayloadUserType } from '../middlewares/validations/user'
import { UserWithRole } from '../middlewares/auth'

export async function getListUser(req: Request, res: Response) {
  try {
    const data = await userService.getListUser()

    res.status(200).json({ message: 'Get list user successfully', data })
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }

    res.status(500).json({ message: 'Internal server error' })
    return
  }
}

export async function getUserById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params
  try {
    const data = await userService.getUserById(id)

    if (!data) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json({ message: 'Get user successfully', data })
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }

    res.status(500).json({ message: 'Internal server error' })
    return
  }
}

export async function createUser(
  req: Request<unknown, unknown, PayloadUserType>,
  res: Response
) {
  const body = req.body
  try {
    const emailExist = await userService.getUserByEmail(body.email)

    if (emailExist) {
      res.status(409).json({ message: 'Email already exist' })
      return
    }

    const encryptedPassword = await authService.generatePassword(body.password)

    const payload = {
      ...body,
      password: encryptedPassword,
    }

    const data = await userService.createUser(payload)

    res.status(200).json({ message: 'Created user successfully', data })
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }

    res.status(500).json({ message: 'Internal server error' })
    return
  }
}

export async function updateUser(
  req: Request<{ id: string }, unknown, PayloadUserType>,
  res: Response<unknown, { user: User; auth: UserWithRole }>
) {
  const { id } = req.params
  const body = req.body

  try {
    const emailExist = await userService.getUserByEmail(body.email)

    if (emailExist && emailExist.id !== id) {
      res.status(409).json({ message: 'Email already exist' })
      return
    }

    let payload = {
      ...body,
    }

    if (body.password) {
      const encryptedPassword = await authService.generatePassword(
        body.password
      )

      payload = { ...body, password: encryptedPassword }
    }

    const data = await userService.updateUser(id, payload)

    res.status(200).json({ message: 'Updated user successfully', data })
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }

    res.status(500).json({ message: 'Internal server error' })
    return
  }
}

export async function deleteUser(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params
  try {
    await userService.deleteUser(id)

    res.status(200).json({ message: 'Deleted user successfully' })
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }

    res.status(500).json({ message: 'Internal server error' })
    return
  }
}
