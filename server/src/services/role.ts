import { ApplicationError } from '../utils/error'
import * as roleRepository from '../repositories/role'

export async function getRoleByName(roleName: string) {
  try {
    const role = await roleRepository.getRoleByName(roleName)

    return role
  } catch (error) {
    throw new ApplicationError('Internal server error', 500)
  }
}

export async function getRoleById(id: string) {
  try {
    const role = await roleRepository.getRoleById(id)

    return role
  } catch (error) {
    throw new ApplicationError('Internal server error', 500)
  }
}
