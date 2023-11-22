import { type SalonService } from '@prisma/client'
import { type GroupedServices } from '@/interfaces/Props'

export const formatDateToYYYYMMDD = (date: Date): string => {
  const currentDate = new Date(date)
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const groupServicesByCategory = (salonServices: SalonService[]): GroupedServices => {
  const groupedServices: GroupedServices = {}

  salonServices.forEach((service) => {
    const category = service.category
    if (typeof groupedServices[category] === 'undefined') {
      groupedServices[category] = []
    }
    groupedServices[category].push(service)
  })

  return groupedServices
}
