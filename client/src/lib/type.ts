type Basetype = {
  createdAt: Date
  updatedAt: Date
}

export type User = Basetype & {
  id: string
  name: string
  email: string
  roleId: string
  phoneNumber: string
  password: string
}

export type UserDetail = {
  id: string
  name: string
  email: string
  phoneNumber: string
  role: {
    id: string
    name: string
  }
}

export type Role = Basetype & {
  id: string
  name: string
}
