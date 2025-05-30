'use client'
import { type NextPage } from 'next'
import { useEffect } from 'react'

import Hero from '@/components/dream-nails/Hero'
import { useSalonService } from '@/context/SalonServicesContext'
import { type GroupedServices } from '@/interfaces/Props'

const ServicesPage: NextPage = () => {
  const { salonServices, loadSalonServices } = useSalonService()

  useEffect(() => {
    loadSalonServices()
  }, [loadSalonServices])

  // Objeto para almacenar los servicios agrupados por categoría
  const groupedServices: GroupedServices = {}

  // Itera sobre los servicios y agrupa por categoría
  salonServices.forEach((service) => {
    const category = service.category
    if (typeof groupedServices[category] === 'undefined') {
      groupedServices[category] = []
    }
    groupedServices[category].push(service)
  })

  // Ahora tienes los servicios agrupados por categoría en groupedServices
  const titlePies = 'Belleza de Pies'
  const servicesPies = groupedServices.pies

  const titleManos = 'Belleza de Manos'
  const servicesManos = groupedServices.manos

  const titleExtras = 'Extras'
  const servicesExtra = groupedServices.extras

  const titleAdicional = 'Adicional'
  const servicesAdicional = groupedServices.adicionales

  const title = 'SERVICIOS'
  const urlImg = 'url("/services.jpg")'

  return (
    <>
      <Hero title={title} urlImg={urlImg}></Hero>

      <main className='flex flex-col items-center justify-center gap-y-4 py-4 w-full text-black pt-10'>
        <div className='flex flex-col gap-6 px-2 w-full overflow-hidden  max-w-[820px]'>
          <div className='flex flex-col'>
            <h1 className='py-1 font-semibold'>{titleManos}</h1>
            {servicesManos?.map((service) => {
              return (
                <div key={service.id}>
                  <h1>{service.name}</h1>
                </div>
              )
            })}
          </div>

          <div className='flex flex-col'>
            <h1 className='py-1 font-semibold'>{titlePies}</h1>
            {servicesPies?.map((service) => {
              return (
                <div key={service.id}>
                  <h1>{service.name}</h1>
                </div>
              )
            })}
          </div>

          <div className='flex flex-col'>
            <h1 className='py-1 font-semibold'>{titleExtras}</h1>
            {servicesExtra?.map((service) => {
              return (
                <div key={service.id}>
                  <h1>{service.name}</h1>
                </div>
              )
            })}
          </div>

          <div className='flex flex-col'>
            <h1 className='py-1 font-semibold'>{titleAdicional}</h1>
            {servicesAdicional?.map((service) => {
              return (
                <div key={service.id}>
                  <h1>{service.name}</h1>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default ServicesPage
