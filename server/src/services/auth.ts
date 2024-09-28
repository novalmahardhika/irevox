import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ApplicationError } from '../utils/error'

export async function generatePassword(password: string) {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10)

    return encryptedPassword
  } catch (error) {
    throw new ApplicationError('Error while generate password', 500)
  }
}

export async function comparePassword(
  currentPassword: string,
  inputPassword: string
) {
  try {
    const isMatch = await bcrypt.compare(currentPassword, inputPassword)

    return isMatch
  } catch (error) {
    throw new ApplicationError('Error comparing password', 500)
  }
}

export function signJwt(userId: string) {
  const token = jwt.sign({ id: userId }, 'secret')

  return token
}

type VerifiedToken = JwtPayload & {
  id: string
}

export function verifyToken(token: string) {
  try {
    const verifyData = jwt.verify(token, 'secret') as VerifiedToken

    return verifyData
  } catch (error) {
    throw new ApplicationError('Invalid token', 401)
  }
}
