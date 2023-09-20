import { type User } from '@prisma/client'

export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>
