import { Request, Response } from 'express'
import * as userService from '../services/user'
import * as roleService from '../services/role'
import * as authService from '../services/auth'
import {
  PayloadAuthType,
  PayloadRegisterType,
} from '../middlewares/validations/auth'

import { ApplicationError } from '../utils/error'

export async function login(
  req: Request<unknown, unknown, PayloadAuthType>,
  res: Response
) {
  const { email, password } = req.body

  try {
    const user = await userService.getUserByEmail(email)

    if (!user) {
      res.status(404).json({ message: 'Email not found' })
      return
    }

    const isMatch = await authService.comparePassword(password, user.password)

    if (!isMatch) {
      res.status(404).json({ message: 'Please check email or password' })
      return
    }

    const token = authService.signJwt(user.id)

    const data = {
      ...user,
      token,
    }

    res.status(500).json({ message: 'Login successfully', data })
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }

    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function register(
  req: Request<unknown, unknown, PayloadRegisterType>,
  res: Response
) {
  const body = req.body

  try {
    const emailExist = await userService.getUserByEmail(body.email)

    if (emailExist) {
      res.status(409).json({ message: 'Email already exist' })
      return
    }

    const role = await roleService.getRoleByName('USER')

    if (!role) {
      res.status(404).json({ message: 'Role not found' })
      return
    }

    const encryptedPassword = await authService.generatePassword(body.password)

    const payload = {
      ...body,
      password: encryptedPassword,
      roleId: role.id,
    }

    const data = await userService.createUser(payload)

    res.status(201).json({ message: 'Register successfully', data })
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }

    res.status(500).json({ message: 'Internal server error' })
  }
}
