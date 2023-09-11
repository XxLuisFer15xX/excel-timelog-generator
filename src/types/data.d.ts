export type Module = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export type Action = 'users' | 'permission'

export interface Permission {
  id: string
  module: Module
  action: Action
}

export interface Role {
  _id: string
  description: string
  type: string
  permissions: Permission[]
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  photo: string
  idRole: string
  role: Role
}
