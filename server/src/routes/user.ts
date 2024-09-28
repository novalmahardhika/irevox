import { Router } from 'express'
import * as authMiddleware from '../middlewares/auth'
import * as userController from '../controllers/user'
import * as userMiddleware from '../middlewares/user'
import * as userValidation from '../middlewares/validations/user'
import * as commonValidation from '../middlewares/validations/common'

const router = Router()

router.get(
  '/',
  authMiddleware.authorize,
  authMiddleware.isAdmin,
  userController.getListUser
)

router.get(
  '/:id',
  authMiddleware.authorize,
  commonValidation.checkUUID,
  userMiddleware.checkUserExist,
  userController.getUserById
)

router.post(
  '/',
  authMiddleware.authorize,
  authMiddleware.isAdmin,
  userValidation.checkUserPayload,
  userMiddleware.checkRoleId,
  userController.createUser
)

router.put(
  '/:id',
  authMiddleware.authorize,
  authMiddleware.isAdmin,
  commonValidation.checkUUID,
  userValidation.checkUpdateUserPayload,
  userMiddleware.checkUserExist,
  userMiddleware.checkRoleId,
  userController.updateUser
)

router.delete(
  '/:id',
  authMiddleware.authorize,
  authMiddleware.isAdmin,
  commonValidation.checkUUID,
  userMiddleware.checkUserExist,
  userController.deleteUser
)

export default router
