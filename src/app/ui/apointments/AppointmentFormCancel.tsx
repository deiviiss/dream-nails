'use client'
import { AxiosError } from 'axios'
import { useState, type ChangeEvent, type FormEvent } from 'react'

import { useAppointments } from '@/context/AppointmentsContext'
import {
  type AppointmentCustomer,
  type createCancelledAppointment
} from '@/interfaces/Appointment'

interface AppointmentFormProps {
  appointment: AppointmentCustomer
  open: boolean
  setOpen: (open: boolean) => void
}

export const AppointmentForm = ({
  setOpen,
  open,
  appointment
}: AppointmentFormProps): JSX.Element => {
  const [error, setError] = useState('')
  const { cancelAppointment } = useAppointments()

  const [cancelledAppointmentData, setCancelledAppointmentData] =
    useState<createCancelledAppointment>({
      details: '',
      cancelled_by: appointment.Customer.name,
      customer_id: appointment.customer_id,
      appointment_id: appointment.id
    })

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setCancelledAppointmentData((prevAppointmentData) => ({
      ...prevAppointmentData,
      [name]: value
    }))
  }

  const handleCancelAppointment = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    try {
      const rta = await cancelAppointment(
        appointment.id,
        cancelledAppointmentData
      )
      // //! changed with toast
      alert(rta)
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

  const isDisabled = cancelledAppointmentData.details === ''

  return (
    <div className='flex flex-col items-center justify-center w-full px-4 mt-7 pb-6'>
      {error.length > 0 && (
        <div className='bg-red-500 text-white p-2 mb-2 rounded'>{error}</div>
      )}

      <form
        onSubmit={handleCancelAppointment}
        className='flex flex-col justify-center items-center w-full pb-0 gap-y-4'
      >
        <input
          type='text'
          placeholder='Observaciones del cliente'
          name='details'
          value={cancelledAppointmentData.details}
          onChange={handleChange}
          className='px-4 py-2 block mb-2 w-full rounded-sm outline-none focus:ring-2 focus:ring-secondary'
        />

        <button
          className='px-4 py-2 rounded-md transition-all duration-200 border-[1px] border-primary bg-white hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isDisabled}
        >
          Cancelar cita
        </button>
      </form>
    </div>
  )
}
