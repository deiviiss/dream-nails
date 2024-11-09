import bcrypt from 'bcryptjs'

interface SeedUser {
  email: string
  name: string
  password: string
  role: 'admin' | 'user'
}

interface SeedData {
  users: SeedUser[]
}

export const initialData: SeedData = {
  users: [
    {
      email: 'dreamnails@hotmail.com',
      name: 'Dream Nails',
      password: bcrypt.hashSync('userseed'),
      role: 'admin'
      // phoneNumber: '+5219811250049'
    }
  ]
}
