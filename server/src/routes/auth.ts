import { Router } from 'express'
import * as authController from '../controllers/auth'
import * as authValidation from '../middlewares/validations/auth'

const router = Router()

router.post('/login', authValidation.checkAuthPayload, authController.login)

router.post(
  '/register',
  authValidation.checkAuthRegisterPayload,
  authController.register
)

export default router
