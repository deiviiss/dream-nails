'use client'
import { type NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import { UsersProvider } from '@/context/UserContext'

interface Props {
  children: React.ReactNode
}

const Providers: NextPage<Props> = ({ children }: Props) => {
  return (
    <SessionProvider>
      <UsersProvider>
        {children}
      </UsersProvider>
    </SessionProvider>
  )
}

export default Providers
