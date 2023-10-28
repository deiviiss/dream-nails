import { type Customer } from '@prisma/client'

export type CreateCustomer = Omit<Customer, 'id' | 'user_id' | 'created_at' | 'updated_at'>

export type UpdateCustomer = Omit<Customer, 'user_id' | 'created_at' | 'updated_at'>

export type SignUpCustomer = Omit<Customer, 'id' | 'role' | 'created_at' | 'updated_at'>
