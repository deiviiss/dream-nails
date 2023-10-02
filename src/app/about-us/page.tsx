'use client'
import { type NextPage } from 'next'
import { useEffect } from 'react'
import Hero from '@/components/Hero'
import { useSalonService } from '@/context/SalonServicesContext'
import { type GroupedServices } from '@/interfaces/Props'

const ServicesPage: NextPage = () => {
  const { salonServices, loadSalonServices } = useSalonService()

  useEffect(() => {
    loadSalonServices()
  }, [])

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

  const title = 'SOBRE NOSOTROS'
  const urlImg = 'url("./hero.jpg")'

  return (

    <>
      <Hero title={title} urlImg={urlImg}></Hero>

      <main className='flex flex-col items-center justify-center gap-y-4 py-4 w-full'>
        <header className="flex justify-center p-3">
          <h1 className='text-2xl font-bold'>Información de la founder</h1>
        </header>

        <div className="flex flex-col gap-6 px-2 w-full overflow-hidden">

        </div>

      </main>
    </>

  )
}

export default ServicesPage
