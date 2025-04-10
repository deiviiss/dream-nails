export interface User {
  id: number
  name: string
  email: string
  password: string
  role: string
  created_at: Date
  updated_at: Date | null
}

export type CreateUser = Omit<User, 'id' | 'created_at' | 'updated_at'>

export type UpdateUser = Omit<User, 'password' | 'created_at' | 'updated_at'>

export type SignUpUser = Omit<User, 'id' | 'role' | 'created_at' | 'updated_at' | 'name'>
