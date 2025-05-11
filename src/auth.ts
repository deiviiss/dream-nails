import bcrypt from 'bcryptjs'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import prisma from '@/lib/prisma'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register-user'
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user
      }
      return token
    },
    session({ session, token }) {
      // TODO: fix type any
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      session.user = token.data as any
      return session
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        const user = await prisma.user.findFirst({
          where: {
            email: email.toLowerCase()
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            password: true
          }
        })

        if (!user) return null

        const userPassword: string = user.password || ''

        if (!bcrypt.compareSync(password, userPassword)) return null

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    })
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
