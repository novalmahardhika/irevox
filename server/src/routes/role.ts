import { Router } from 'express'
import * as roleController from '../controllers/role'

const router = Router()

router.get('/', roleController.getListRole)

export default router
