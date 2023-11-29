'use client'
import { type NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import { type Props } from '../interfaces/Props'
import { AppointmentsProvider } from '@/context/AppointmentsContext'
import { CustomersProvider } from '@/context/CustomersContext'
import { SalonServicesProvider } from '@/context/SalonServicesContext'
import { UsersProvider } from '@/context/UsersContext'

const Providers: NextPage<Props> = ({ children }: Props) => {
  return (
    <SessionProvider>
      <UsersProvider>
        <SalonServicesProvider>
          <CustomersProvider>
            <AppointmentsProvider>{children}</AppointmentsProvider>
          </CustomersProvider>
        </SalonServicesProvider>
      </UsersProvider>
    </SessionProvider>
  )
}

export default Providers
