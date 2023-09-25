'use client'
import { type NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import { type Props } from '../interfaces/Props'
import { SalonServicesProvider } from '@/context/SalonServicesContext'
import { UsersProvider } from '@/context/UsersContext'

const Providers: NextPage<Props> = ({ children }: Props) => {
  return (
    <SessionProvider>
      <UsersProvider>
        <SalonServicesProvider>
          {children}
        </SalonServicesProvider>
      </UsersProvider>
    </SessionProvider>
  )
}

export default Providers
