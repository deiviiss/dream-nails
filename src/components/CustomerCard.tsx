import { type Customer } from '@prisma/client'
import { useRouter } from 'next/navigation'

export const CustomerCard = ({ customer }: { customer: Customer }): JSX.Element => {
  // const { deleteCustomer } = useCustomers()
  const router = useRouter()

  // const handleDeleteCustomer = async (id: number): Promise<void> => {
  //   await deleteCustomer(id)
  // }
  return (
    <article key={customer.id} className='flex justify-between gap-x-12 border border-secondary px-6 py-4 rounded-lg max-w-xl mx-auto'>

      <section className="flex flex-col">
        <p className='text-xl font-bold' >{customer.name}</p>
        <div className="flex w-full justify-between gap-x-3">
          <p>Teléfono:</p>
          <p>{customer.phone}</p>
        </div>
      </section>

      <footer className="flex items-center">
        {/*  <button onClick={async () => {
          if (confirm('Estás seguro que quieres borrar este cliente')) { //! change to toast
            await handleDeleteCustomer(customer.id)
          }
        }}>
          <HiTrash className='text-2xl text-red-600' />
        </button>
         */}
        <button className='bg-primary text-white px-2 py-1 rounded-md hover:opacity-75' onClick={() => { router.push(`/panel-admin/customers/${String(customer.id)}`) }} >
          Detalles
        </button>
      </footer>
    </article >
  )
}
