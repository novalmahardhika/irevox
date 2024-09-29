import {
  PayloadUpdateUserType,
  PayloadUserType,
} from '../middlewares/validations/user'
import * as userRepository from '../repositories/user'
import { ApplicationError } from '../utils/error'

export async function getListUser() {
  try {
    const users = await userRepository.getListUser()

    return users
  } catch (error) {
    throw new ApplicationError('Internal server error', 500)
  }
}

export async function getUserById(id: string) {
  try {
    const user = await userRepository.getUserById(id)

    return user
  } catch (error) {
    throw new ApplicationError('Internal server error', 500)
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await userRepository.getUserEmail(email)

    return user
  } catch (error) {
    throw new ApplicationError('Internal server error', 500)
  }
}

export async function createUser(payload: PayloadUserType) {
  try {
    const user = await userRepository.createUser(payload)

    return user
  } catch (error) {
    console.log(error)

    throw new ApplicationError('Internal server error', 500)
  }
}

export async function updateUser(id: string, payload: PayloadUpdateUserType) {
  try {
    const user = await userRepository.updateUser(id, payload)

    return user
  } catch (error) {
    console.log(error)

    throw new ApplicationError('Internal server error', 500)
  }
}

export async function updateUserAdmin(id: string, payload: PayloadUserType) {
  try {
    const user = await userRepository.updateUserByAdmin(id, payload)

    return user
  } catch (error) {
    console.log(error)

    throw new ApplicationError('Internal server error', 500)
  }
}

export async function deleteUser(id: string) {
  try {
    const user = await userRepository.deleteUser(id)

    return user
  } catch (error) {
    throw new ApplicationError('Internal server error', 500)
  }
}
