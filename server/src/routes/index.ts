import { Router } from 'express'
import authRouter from './auth'
import userRouter from './user'
import roleRouter from './role'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/roles', roleRouter)

export default router
