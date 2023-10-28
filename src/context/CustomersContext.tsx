'use client'
import { type Customer } from '@prisma/client'
import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { type CreateCustomer, type UpdateCustomer } from '@/interfaces/Customer'
import { type Props, type CustomersContextType, type Message } from '@/interfaces/Props'

const CustomersContext = createContext<CustomersContextType>(
  {
    customers: [],
    loadCustomers: async () => { },
    // ? Estos son los valores por defecto cuando se crea el contexto, ¿Cómo lo defino? Lo tuve que implementar aquí y en el provider
    getOneCustomer: async (id: number) => {
      const res = await axios.get<{ customer: Customer }>(`/api/customers/${id}`)
      const customer = res.data.customer

      return customer
    },
    createCustomer: async (customer: CreateCustomer) => {
      return { message: '' }
    },
    updateCustomer: async (id: number, customer: UpdateCustomer) => {
      return { message: '' }
    },
    deleteCustomer: async (id: number) => { return id }
  }
)

export const useCustomers = (): CustomersContextType => {
  const context = useContext(CustomersContext)

  if (context === null) {
    throw new Error('useCustomers must be used within a CustomersProviders')
  }

  return context
}

export const CustomersProvider = ({ children }: Props): JSX.Element => {
  const [customers, setCustomers] = useState<Customer[]>([])

  const loadCustomers = async (): Promise<void> => {
    const res = await axios.get('/api/customers')
    const customers = res.data

    setCustomers(customers)
  }

  const createCustomer = async (customer: CreateCustomer): Promise<Message> => {
    console.log('creating customer...')
    const response = await axios.post('api/customers/', {
      name: customer.name,
      phone: customer.phone
    })

    const message = response.data.message

    return message
  }

  const getOneCustomer = async (id: number): Promise<Customer> => {
    console.log('get one customer...')
    const res = await axios.get<{ customer: Customer }>(`/api/customers/${id}`)
    const customer = res.data.customer

    return customer
  }

  const deleteCustomer = async (id: number): Promise<number> => {
    console.log('delete customer...')
    const res = await axios.delete(`/api/customers/${id}`)

    if (res.status === 200) {
      setCustomers(customers.filter(customer => customer.id !== id))
      return id
    }

    //! handle error
    return id
  }

  const updateCustomer = async (id: number, customer: UpdateCustomer): Promise<Message> => {
    console.log('update customer...')
    const res = await axios.put(`/api/customers/${id}`, { customer })

    if (res.status === 200) {
      setCustomers(customers.filter(customer => customer.id !== id))
      console.log('res.data.message', res.data.message)
      return res.data.message
    }
    console.log('status is not 200', res.data.message)
    return res.data.message
  }

  return (
    <CustomersContext.Provider value={{ customers, loadCustomers, getOneCustomer, createCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CustomersContext.Provider>
  )
}
