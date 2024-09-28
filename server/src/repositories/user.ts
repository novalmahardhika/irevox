import prisma from '../../prisma/db'
import { PayloadUserType } from '../middlewares/validations/user'

export function getListUser() {
  return prisma.user.findMany()
}

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
}

export function getUserEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
}

export function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  })
}

export function createUser(payload: PayloadUserType) {
  return prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      roleId: payload.roleId,
      password: payload.password,
    },
  })
}

export function updateUser(id: string, payload: PayloadUserType) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      name: payload.name,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      password: payload.password,
      roleId: payload.roleId,
    },
  })
}
