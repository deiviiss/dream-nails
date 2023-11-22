import { type Customer, type Appointment, type CancelledAppointment, type AppointmentService } from '@prisma/client'
import { type Message } from '@/interfaces/Props'

export type CreateAppointment = Omit<Appointment, 'id' | 'is_active' | 'created_at' | 'updated_at'>

export interface CreateAppointmentService extends CreateAppointment {
  Service: AppointmentService[]
}

export type UpdateAppointment = Omit<Appointment, 'created_at' | 'updated_at'>

export interface AppointmentCustomer extends Appointment {
  Customer: Customer
}

export type createCancelledAppointment = Omit<CancelledAppointment, 'id' | 'created_at' | 'updated_at'>

export interface AppointmentsContextType {
  appointments: AppointmentCustomer[]
  loadAppointments: () => Promise<void>
  getOneAppointment: (id: number) => Promise<Appointment>
  createAppointment: (params: CreateAppointment) => Promise<Message>
  cancelAppointment: (id: number, parama: createCancelledAppointment) => Promise<Message>
  updateAppointment: (id: number, appointment: UpdateAppointment) => Promise<Message>
  cancelledAppointments: CancelledAppointment[]
  loadCancelledAppointments: () => Promise<void>
}
