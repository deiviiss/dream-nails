'use client'
import { type NextPage } from 'next'
import { useEffect } from 'react'
import { ListServicesPrice } from '@/components/ListPrice'
import { ListServicesPriceAdicional } from '@/components/ListPriceAdicional'
import { useSalonService } from '@/context/SalonServicesContext'
import { type GroupedServices } from '@/interfaces/Props'

const PricesPage: NextPage = () => {
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

  return (
    <main className='flex flex-col items-center justify-center gap-y-4 py-4 w-full'>
      <header className="flex justify-center p-3">
        <h1 className='text-2xl font-bold'>Lista de precios</h1>
      </header>

      <div className="flex flex-col gap-6 px-2 w-full overflow-hidden">
        <ListServicesPrice title={titleManos} services={servicesManos}></ListServicesPrice>

        <ListServicesPrice title={titlePies} services={servicesPies}></ListServicesPrice>

        <div className="flex flex-col sm:grid grid-cols-2 gap-6 px-2 sm:gap-10 mx-auto w-full max-w-[820px]">

          <ListServicesPrice title={titleExtras} services={servicesExtra}></ListServicesPrice>

          <ListServicesPriceAdicional title={titleAdicional} services={servicesAdicional}></ListServicesPriceAdicional>

        </div>
      </div>

    </main>
  )
}

export default PricesPage
