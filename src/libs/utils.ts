import { type SalonService } from '@prisma/client'
import { type GroupedServices } from '@/interfaces/Props'

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'es-MX'
): string => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}

export const formatDateToYYYYMMDD = (date: Date): string => {
  const currentDate = new Date(date)
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatMethod = (methodStr: string): string => {
  if (methodStr === 'credit') {
    return 'Crédito'
  }
  if (methodStr === 'cash') {
    return 'Efectivo'
  }
  return 'Por definir'
}

export const groupServicesByCategory = (
  salonServices: SalonService[]
): GroupedServices => {
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

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  })
}
