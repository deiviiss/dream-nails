'use client'
import { type Customer } from '@prisma/client'
import { AxiosError } from 'axios'
import { useState, type ChangeEvent, type FormEvent, useEffect } from 'react'

// import { useAppointments } from '@/context/AppointmentsContext'
import { CustomerSearch } from '../customers/CustomerSearch'
import { useSalonService } from '@/context/SalonServicesContext'
import { type CreateAppointmentService } from '@/interfaces/Appointment'
import { formatDateToYYYYMMDD, groupServicesByCategory } from '@/libs/utils'

interface AppointmentFormProps {
  setOpen: (open: boolean) => void
}

export const AppointmentFormCreate = ({
  setOpen
}: AppointmentFormProps): JSX.Element => {
  const [error, setError] = useState('')
  // const { createAppointment } = useAppointments()
  const currentDate = new Date()

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()

  const { salonServices, loadSalonServices } = useSalonService()
  const groupedSalonServices = groupServicesByCategory(salonServices)
  const titlePies = 'Belleza de Pies'
  const servicesPies = groupedSalonServices.pies
  const titleManos = 'Belleza de Manos'
  const servicesManos = groupedSalonServices.manos
  const titleAdicional = 'Adicional'
  const servicesAdicional = groupedSalonServices.adicionales

  const [appointmentData, setAppointmentData] =
    useState<CreateAppointmentService>({
      date: new Date(),
      nail_status: '',
      customer_id: 0,
      Service: []
    })

  useEffect(() => {
    loadSalonServices()
  }, [loadSalonServices])

  const handleChange = <T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>): void => {
    const { name, value } = e.target
    setAppointmentData((prevAppointmentData) => ({
      ...prevAppointmentData,
      [name]: value
    }))
  }

  const handleCreateAppointment = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      // const rta = await createAppointment(appointmentData)
      // //! changed with toast
      // alert(rta)
      setOpen(false)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    }
  }

  const isDisabled =
    // appointmentData.Service === '',
    // appointmentData.customer_id = '',
    appointmentData.nail_status === ''

  return (
    <div className='flex flex-col items-center justify-center w-full px-4 mt-7 pb-6'>
      {error.length > 0 && (
        <div className='bg-red-500 text-white p-2 mb-2 rounded'>{error}</div>
      )}

      <form
        onSubmit={handleCreateAppointment}
        className='flex flex-col justify-center items-center w-full pb-0 gap-y-4'
      >
        <fieldset className='flex flex-col gap-3 w-full'>
          <CustomerSearch setSelectedCustomer={setSelectedCustomer} />

          <div className='grid grid-cols-2 items-center'>
            <label htmlFor='customer'>Cliente:</label>
            {
              selectedCustomer !== undefined
                ? (<p>{selectedCustomer.name}</p>)
                : (<p>Por elegir</p>)
            }
          </div>

          <div className='grid grid-cols-2 items-center'>
            <label className='w-full' htmlFor='date'>
              Fecha de la cita:
            </label>
            <input
              type='date'
              name='date'
              value={formatDateToYYYYMMDD(currentDate)}
              onChange={handleChange}
              className='px-4 py-2 block mb-2 w-full rounded-md outline-none focus:ring-2 focus:ring-secondary'
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className='w-full text-left font-semibold text-lg'>
            Servicios
          </legend>

          <div className='grid grid-cols-2 p-2 gap-2 items-center justify-around w-full'>
            <label htmlFor='services_manos' className=' '>
              {titleManos}:
            </label>
            <select
              onChange={handleChange}
              className='w-full p-1 focus:outline focus:outline-secondary rounded-lg'
              name='services_manos'
            >
              <option value={0}></option>
              {servicesManos?.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className='grid grid-cols-2 p-2 gap-2 items-center justify-around w-full'>
            <label htmlFor='services_pies' className=' '>
              {titlePies}:
            </label>
            <select
              onChange={handleChange}
              className='w-full p-1 focus:outline focus:outline-secondary rounded-lg'
              name='services_pies'
            >
              <option value={0}></option>
              {servicesPies?.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className='grid grid-cols-2 p-2 gap-2 items-center justify-around w-full'>
            <label htmlFor='services_adicionales' className=' '>
              {titleAdicional}:
            </label>
            <select
              onChange={handleChange}
              className='w-full p-1 focus:outline focus:outline-secondary rounded-lg'
              name='services_adicionales'
            >
              <option value={0}></option>
              {servicesAdicional?.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className='flex flex-col items-center justify-around text-center w-full'>
          <label className='w-full text-left' htmlFor='nail_status'>
            Situación de la uña:
          </label>
          <textarea
            onChange={handleChange}
            name='nail_status'
            placeholder='Escribe una breve descripción del estado actual de las uñas.'
            className='w-full p-2 m-2'
          ></textarea>
        </fieldset>

        <button
          className='px-4 py-2 rounded-md transition-all duration-200 border-[1px] border-primary bg-white hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isDisabled}
        >
          Crear cita
        </button>
      </form>
    </div>
  )
}
