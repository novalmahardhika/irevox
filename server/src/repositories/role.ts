import prisma from '../../prisma/db'

export function getRoleByName(roleName: string) {
  return prisma.role.findFirst({
    where: {
      name: roleName,
    },
  })
}

export function getRoleById(id: string) {
  return prisma.role.findUnique({
    where: {
      id,
    },
  })
}

export function getListRole() {
  return prisma.role.findMany()
}
