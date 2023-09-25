'use client'
import { type SalonService } from '@prisma/client'
import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { type Props, type SalonServiceContextType } from '@/interfaces/Props'

const SalonServiceContext = createContext<SalonServiceContextType>(
  {
    salonServices: [],
    loadSalonServices: async () => { }
  })

export const useSalonService = (): SalonServiceContextType => {
  const context = useContext(SalonServiceContext)

  if (context === null) {
    throw new Error('useSalonService must be used within a SalonServicesProviders')
  }

  return context
}

export const SalonServicesProvider = ({ children }: Props): JSX.Element => {
  const [salonServices, setSalonService] = useState<SalonService[]>([])

  const loadSalonServices = async (): Promise<void> => {
    console.log('load SalonServices...')
    const res = await axios.get('/api/salon-services')
    const salonService = res.data

    setSalonService(salonService)
  }

  return (
    <SalonServiceContext.Provider value={{ salonServices, loadSalonServices }}>
      {children}
    </SalonServiceContext.Provider>
  )
}
