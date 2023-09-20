import { type User } from '@prisma/client'
import { type UpdateUser, type CreateUser } from './User'

export interface Props {
  children: React.ReactNode
}

export interface Params {
  id: number
}

export interface UsersContextType {
  users: User[]
  loadUsers: () => Promise<void>
  createUser: (params: CreateUser) => Promise<void>
  deleteUser: (id: number) => Promise<number>
  updateUser: (id: number, user: UpdateUser) => Promise<number>
}
