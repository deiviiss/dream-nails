'use client'
import { type NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'

import { type Props } from '../interfaces/Props'
import { SalonServicesProvider } from '@/context/SalonServicesContext'

const Providers: NextPage<Props> = ({ children }: Props) => {
  return (
    <SessionProvider>

      <SalonServicesProvider>
        {children}
      </SalonServicesProvider>

    </SessionProvider>
  )
}

export default Providers
