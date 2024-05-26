import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      name: string
      email: string
      role: string
    } & DefaultSession['user']
  }
}
