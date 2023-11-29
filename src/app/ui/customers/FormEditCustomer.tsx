'use client'
import { type Customer } from '@prisma/client'
import { AxiosError } from 'axios'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useCustomers } from '@/context/CustomersContext'

interface FormCustomerProps {
  customer: Customer
  setOpen: (open: boolean) => void
  setCustomer: (customer: Customer) => void
}

export const FormEditCustomer = ({
  setOpen,
  customer,
  setCustomer
}: FormCustomerProps): JSX.Element => {
  const [error, setError] = useState('')
  const { updateCustomer } = useCustomers()
  const [customerData, setCustomerData] = useState<Customer>(customer)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setCustomerData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }))
  }

  const handleUpdateCustomer = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    if (customerData !== customer) {
      try {
        await updateCustomer(customer.id, customerData)
        //! changed with toast
        setCustomer(customerData)
        alert('Cliente actualizado')
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

    if (customerData === customer) {
      setOpen(false)
      //! changed with toast
      alert('No se realizaron cambios')
    }
  }

  const isDisabled = customerData.name === '' || customerData.phone === ''

  return (
    <div className='flex flex-col items-center justify-center w-full px-4 mt-7 pb-6'>
      {error.length > 0 && (
        <div className='bg-red-500 text-white p-2 mb-2 rounded'>{error}</div>
      )}

      <form
        onSubmit={handleUpdateCustomer}
        className='flex flex-col justify-center items-center w-full pb-0 gap-y-4'
      >
        <input
          type='text'
          placeholder='Nombre del cliente'
          name='name'
          value={customerData.name}
          onChange={handleChange}
          className='px-4 py-2 block mb-2 w-full rounded-sm outline-none focus:ring-2 focus:ring-secondary'
        />
        <input
          type='phone'
          name='phone'
          placeholder='999-999-9999'
          value={customerData.phone}
          onChange={handleChange}
          className='px-4 py-2 block mb-2 w-full rounded-sm outline-none focus:ring-2 focus:ring-secondary'
        />
        <button
          className='px-4 py-2 rounded-md transition-all duration-200 border-[1px] border-primary bg-white hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isDisabled}
        >
          Actualizar cliente
        </button>
      </form>
    </div>
  )
}
