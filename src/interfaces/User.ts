export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  created_at: Date
  updated_at: Date
}

export type CreateUser = Omit<User, 'id' | 'created_at' | 'updated_at'>

export type UpdateUser = Omit<User, 'password' | 'created_at' | 'updated_at'>

export type SignUpUser = Omit<User, 'id' | 'role' | 'created_at' | 'updated_at' | 'name'>
