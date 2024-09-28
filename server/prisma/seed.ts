import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import prisma from './db'
import chalk from 'chalk'

async function seederRole() {
  const roles = ['ADMIN', 'USER']

  await Promise.all(
    roles.map((role) =>
      prisma.role.upsert({
        where: {
          name: role,
        },
        update: {},
        create: {
          name: role,
        },
      })
    )
  )

  console.log(chalk.greenBright('Roles seeded successfully!'))
}

async function seederAdmin() {
  const users = [
    {
      name: 'admin',
      email: 'admin@admin.com',
      phoneNumber: '+61081234567',
    },
    {
      name: 'nvl',
      email: 'nvl@gmail.com',
      phoneNumber: '+61081234568',
    },
  ]

  const encryptPassword = await bcrypt.hash('admin12345', 10)

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: {
          email: user.email,
        },
        update: {},
        create: {
          name: user.name,
          email: user.email,
          password: encryptPassword,
          role: {
            connect: {
              name: 'ADMIN',
            },
          },
        },
      })
    )
  )

  console.log(chalk.greenBright('Admins seeded successfully!'))
}

async function seederUser() {
  const users = []

  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    })
  }

  const encryptPassword = await bcrypt.hash('user12345', 10)

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: {
          email: user.email,
        },
        update: {},
        create: {
          name: user.name,
          email: user.email,
          password: encryptPassword,
          role: {
            connect: {
              name: 'USER',
            },
          },
        },
      })
    )
  )

  console.log(chalk.greenBright('Users seeded successfully!'))
}

async function main() {
  try {
    await seederRole()
    await seederUser()
    await seederAdmin()

    await prisma.$disconnect()
  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

main()
