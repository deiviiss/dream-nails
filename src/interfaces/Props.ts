import { type User, type SalonService, type Customer } from '@prisma/client'
import { type CreateCustomer, type UpdateCustomer } from './Customer'
import { type CreateUser, type UpdateUser } from './User'

export interface Props {
  children: React.ReactNode
}

export interface Params {
  id: number
}

export interface Message {
  message: string
}

export interface ListPrices {
  title: string
  services: SalonService[]
}

export type GroupedServices = Record<string, SalonService[]>

export interface UsersContextType {
  users: User[]
  loadUsers: () => Promise<void>
  createUser: (params: CreateUser) => Promise<void>
  deleteUser: (id: number) => Promise<number>
  updateUser: (id: number, user: UpdateUser) => Promise<number>
}

export interface CustomersContextType {
  customers: Customer[]
  loadCustomers: () => Promise<void>
  getOneCustomer: (id: number) => Promise<Customer>
  createCustomer: (params: CreateCustomer) => Promise<Message>
  deleteCustomer: (id: number) => Promise<number>
  updateCustomer: (id: number, customer: UpdateCustomer) => Promise<Message>
}

export interface SalonServiceContextType {
  salonServices: SalonService[]
  loadSalonServices: () => Promise<void>
}
