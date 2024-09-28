import { Router } from 'express'
import * as userController from '../controllers/user'
import * as userMiddleware from '../middlewares/user'
import * as userValidation from '../middlewares/validations/user'
import * as commonValidation from '../middlewares/validations/common'

const router = Router()

router.get('/', userController.getListUser)

router.get(
  '/:id',
  commonValidation.checkUUID,
  userMiddleware.checkUserExist,
  userController.getUserById
)

router.post('/', userValidation.checkUserPayload, userController.createUser)

router.put(
  '/:id',
  commonValidation.checkUUID,
  userValidation.checkUpdateUserPayload,
  userMiddleware.checkUserExist,
  userController.updateUser
)

router.delete(
  '/:id',
  commonValidation.checkUUID,
  userMiddleware.checkUserExist,
  userController.deleteUser
)

export default router
