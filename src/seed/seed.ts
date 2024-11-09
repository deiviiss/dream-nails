import bcrypt from 'bcryptjs'

interface SeedUser {
  email: string
  name: string
  password: string
  role: 'admin' | 'user'
}

interface Image {
  url: string
}

interface SeedData {
  users: SeedUser[]
  images: Image[]
}

export const initialData: SeedData = {
  images: [
    { url: '/services.jpg' },
    { url: '/services2.jpg' },
    { url: '/services3.jpg' },
    { url: '/services21.jpg' }
  ],
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
