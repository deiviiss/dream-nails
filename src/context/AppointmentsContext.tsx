'use client'
import { type CancelledAppointment, type Appointment } from '@prisma/client'
import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { type AppointmentCustomer, type CreateAppointment, type UpdateAppointment, type AppointmentsContextType, type createCancelledAppointment } from '@/interfaces/Appointment'
import { type Props, type Message } from '@/interfaces/Props'

const AppointmentsContext = createContext<AppointmentsContextType>(
  {
    appointments: [],
    loadAppointments: async () => { },
    // ? Estos son los valores por defecto cuando se crea el contexto, ¿Cómo defino o declaro estos valores? Lo tuve que implementar aquí y en el provider de más abajo
    getOneAppointment: async (id: number) => {
      const res = await axios.get<{ appointment: AppointmentCustomer }>(`/api/appointments/${id}`)
      const appointment = res.data.appointment

      return appointment
    },
    createAppointment: async (appointment: CreateAppointment) => {
      return { message: '' }
    },
    updateAppointment: async (id: number, appointment: UpdateAppointment) => {
      return { message: '' }
    },
    cancelAppointment: async (id: number, cancelledAppointment: createCancelledAppointment) => {
      return { message: '' }
    },
    cancelledAppointments: [],
    loadCancelledAppointments: async () => { }
  }
)

export const useAppointments = (): AppointmentsContextType => {
  const context = useContext(AppointmentsContext)

  if (context === null) {
    throw new Error('useAppointments must be used within a AppointmentsProviders')
  }

  return context
}

export const AppointmentsProvider = ({ children }: Props): JSX.Element => {
  const [appointments, setAppointments] = useState<AppointmentCustomer[]>([])

  const [cancelledAppointments, setCancelledAppointments] = useState<CancelledAppointment[]>([])

  const loadAppointments = async (): Promise<void> => {
    try {
      console.log('loading appointments...')
      const res = await axios.get('/api/appointments')
      const appointments = res.data

      setAppointments(appointments)
    } catch (error) {
      console.log('error loading appointments in context')
      console.log('error in context request axios')
      console.log(error)
    }
  }

  const createAppointment = async (appointment: CreateAppointment): Promise<Message> => {
    console.log('creating appointment...')
    console.log('appointment in context', appointment)

    // const response = await axios.post('api/appointments/', {
    //   customer_id: appointment.customer_id,
    //   date: appointment.date,
    //   nail_status: appointment.nail_status,
    //   service: []
    // })

    // const message = response.data.message
    const message = { message: 'Hola' }
    return message
  }

  const getOneAppointment = async (id: number): Promise<Appointment> => {
    console.log('get one appointment...')
    const res = await axios.get<{ appointment: Appointment }>(`/api/appointments/${id}`)
    const appointment = res.data.appointment

    return appointment
  }

  const cancelAppointment = async (id: number, cancelledAppointment: createCancelledAppointment): Promise<Message> => {
    console.log('cancel appointment...')
    const response = await axios.post(`/api/appointments/${id}/cancelled`, cancelledAppointment)

    const message = response.data.message

    return message
  }

  const updateAppointment = async (id: number, Appointment: UpdateAppointment): Promise<Message> => {
    console.log('update Appointment...')
    const res = await axios.put(`/api/Appointments/${id}`, { Appointment })

    if (res.status === 200) {
      setAppointments(appointments.filter(appointment => appointment.id !== id))

      return res.data.message
    }

    return res.data.message
  }

  const loadCancelledAppointments = async (): Promise<void> => {
    try {
      console.log('loading cancelled appointments...')
      const res = await axios.get('/api/appointments/cancelled')
      const appointmentsCancelled = res.data
      console.log('appointmentsCancelled')
      console.log(appointmentsCancelled)

      setCancelledAppointments(appointmentsCancelled)
    } catch (error) {
      console.log('error loading appointments in context')
      console.log('error in context request axios')
      console.log(error)
    }
  }

  return (
    <AppointmentsContext.Provider value={{ appointments, loadAppointments, getOneAppointment, createAppointment, updateAppointment, cancelAppointment, loadCancelledAppointments, cancelledAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  )
}
