import { Request, Response } from 'express'
import { ApplicationError } from '../utils/error'
import * as roleService from '../services/role'

export async function getListRole(req: Request, res: Response) {
  try {
    const data = await roleService.getListRole()

    res.status(500).json({ message: 'Get list role successfully', data })
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({ message: error.message })
      return
    }

    res.status(500).json({ message: 'Internal server error' })
    return
  }
}
