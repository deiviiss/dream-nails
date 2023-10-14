import { type DefaultSession, type DefaultUser } from 'next-auth'
import { type JWT, type DefaultJWT } from 'next-auth/jwt'
console.log('JWT', JWT)
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession
  }
  interface User extends DefaultUser {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string
  }
}
