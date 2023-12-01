import { type Customer } from '@prisma/client'
import { type ChangeEvent, useState, useEffect } from 'react'

import { useCustomers } from '@/context/CustomersContext'

interface CustomerSearchProps {
  setSelectedCustomer: (customer: Customer) => void
}

export const CustomerSearch = ({
  setSelectedCustomer
}: CustomerSearchProps): JSX.Element => {
  const { customers, loadCustomers } = useCustomers()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm)
  )

  useEffect(() => {
    loadCustomers()
  }, [loadCustomers])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = e.target.value.toLowerCase()
    setSearchTerm(searchTerm)
  }

  const handleResultClick = (customer: Customer): void => {
    setSelectedCustomer(customer)
    setSearchTerm('')
  }

  return (
    <div className='w-full'>
      <input
        type='text'
        name='search-customer'
        placeholder='Buscar cliente...'
        value={searchTerm}
        onChange={handleSearch}
        className='w-full py-1 px-2 focus:outline focus:outline-secondary rounded-lg'
      />
      {searchTerm !== '' && filteredCustomers.length > 0 && (
        <ul className='w-full bg-slate-50 p-1 border border-secondary border-t-0 rounded-lg'>
          {filteredCustomers.map((customer) => (
            <li
              key={customer.id}
              onClick={() => {
                handleResultClick(customer)
              }}
              className='px-1'
            >
              {customer.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
