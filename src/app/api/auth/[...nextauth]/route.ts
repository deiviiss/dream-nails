import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/libs/prisma'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter password' }
      },
      async authorize(credentials?: Record<'email' | 'password', string>) {
        if (credentials == null) throw new Error('Invalid credentials')

        const userFound = await prisma.user.findFirst({
          where: {
            email: credentials?.email
          }
        })

        if (userFound == null) throw new Error('Invalid credentials')

        const passwordMatch = await bcrypt.compare(credentials.password, userFound.password)
        if (!passwordMatch) throw new Error('Invalid credentials')

        return {
          id: userFound.id.toString(),
          name: userFound.name,
          email: userFound.email
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
    async redirect({ url, baseUrl }) {
      // if user signout redirect to home
      if (url === '/logout') {
        return '/'
      }

      // if not, use site URL
      return baseUrl
    }
  },
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }
