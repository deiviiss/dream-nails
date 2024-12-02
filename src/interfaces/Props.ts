import { type User, type SalonService } from '@prisma/client'

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

export interface SalonServiceContextType {
  salonServices: SalonService[]
  loadSalonServices: () => Promise<void>
}
