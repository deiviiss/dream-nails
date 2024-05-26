import { type User } from '@prisma/client'

export type CreateUser = Omit<User, 'id' | 'created_at' | 'updated_at'>

export type UpdateUser = Omit<User, 'password' | 'created_at' | 'updated_at'>

export type SignUpUser = Omit<User, 'id' | 'role' | 'created_at' | 'updated_at' | 'name'>
