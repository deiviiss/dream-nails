'use client'
import { type Customer } from '@prisma/client'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { GrUpdate } from 'react-icons/gr'

import { CustomerCard } from '../../ui/customers/CustomerCard'
import { useCustomers } from '@/context/CustomersContext'

const CustomersPage: NextPage = () => {
  const { data: session } = useSession()

  const { customers, loadCustomers } = useCustomers()

  useEffect(() => {
    if (
      session != null &&
      (session.user.role === 'admin' || session.user.role === 'stylist')
    ) {
      loadCustomers()
    }
  }, [session, loadCustomers])

  return (
    <main className='flex flex-col items-center justify-center mx-auto gap-y-6 py-4 px-2 w-full max-w-lg mt-[150.5px]'>
      <header className='w-full flex justify-between'>
        <h1 className='text-base text-left font-medium'>Listado de clientes</h1>
        <button className='px-2'>
          <GrUpdate></GrUpdate>
        </button>
      </header>

      <section className='w-full flex flex-col gap-y-5'>
        <header className='w-full flex justify-between'>
          <h1 className='text-xl text-left font-medium'>
            Clientes{customers.length}
          </h1>
          <h1 className='text-xl text-left font-medium px-2'>
            {customers.length}
          </h1>
        </header>

        {customers.map((customer: Customer) => {
          return <CustomerCard customer={customer} key={customer.id} />
        })}
      </section>
    </main>
  )
}

export default CustomersPage
