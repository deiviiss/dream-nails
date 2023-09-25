import { type SalonService } from '@prisma/client'

export type CreateSalonService = Omit<SalonService, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateSalonService = Omit<SalonService, 'id' | 'createdAt' | 'updatedAt'>
