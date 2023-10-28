'use client'
import { type Customer } from '@prisma/client'
import { AxiosError } from 'axios'
import { type NextPage } from 'next'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormEditCustomer } from '@/components/FormEditCustomer'
import Modal from '@/components/Modal'
import { useCustomers } from '@/context/CustomersContext'

const CustomerEditPage: NextPage = () => {
  const params = useParams()
  const router = useRouter()
  const { getOneCustomer, deleteCustomer } = useCustomers()

  const [openModal, setOpenModal] = useState(false)
  const [customer, setCustomer] = useState<Customer>()

  useEffect(() => {
    const getCustomer = async (): Promise<void> => {
      const customer = await getOneCustomer(Number(params.id))

      if (customer != null) {
        setCustomer(customer)
      }
    }

    getCustomer()
  }, [])

  const handleDeleteCustomer = async (id: number): Promise<void> => {
    try {
      await deleteCustomer(id)
      alert('Cliente eliminado')
      router.push('/panel-admin/customers')
    } catch (error) {
      console.log('error', error)
      if (error instanceof AxiosError) {
        console.log('error', error?.response?.data)
        throw new Error(error?.response?.data)
      }
    }
  }

  return (
    <>
      {
        (customer != null) &&
        <main className='flex flex-col items-center justify-center mx-auto gap-y-6 py-4 px-2 w-full max-w-lg mt-[150.5px]'>
          <header className="w-full flex flex-col justify-between">
            <div className='flex justify-between'>
              <h1 className='text-base text-left font-medium'>
                Datos del cliente
              </h1>
              <h1 className='text-base text-left font-medium'>
                Próxima cita
              </h1>
            </div>
            <div className='flex justify-between px-2'>
              <h1 className='text-xl text-left font-medium'>
                {customer?.name}
              </h1>
              <h1 className='text-xl text-left font-medium'>
                23-Oct-2023
              </h1>
            </div>
          </header>

          <section className='flex flex-col justify-between p-4 w-full mx-auto'>

            <article className='flex justify-between p-0'>
              <p>Cumpleaños:</p>
              <p>07-Oct-23</p>
            </article>

            <article className='flex justify-between p-0'>
              <p>Teléfono:</p>
              <p>{customer?.phone}</p>
            </article>

            <article className='flex justify-between p-0'>
              <p>Correo:</p>
              <p>david.hilera@hotmail.com</p>
            </article>

            <article className='flex justify-between p-0'>
              <p>Estilos preferido:</p>
              <p>Rojo Fuego</p>
            </article>

          </section>

          <div className='w-full rounded border-2 border-primary'></div>

          <section className='flex flex-col justify-between p-4 w-full mx-auto'>

            <article className='flex justify-between p-0'>
              <p>Visitas</p>
              <p>23</p>
            </article >

            <article className="flex justify-between p-0">
              <p>Citas agendadas</p>
              <p>3</p>
            </article>

            <article className="flex justify-between p-0">
              <p>Servicios completados</p>
              <p>3</p>
            </article>

            <article className="flex justify-between p-0">
              <p>Feedback completados
              </p>
              <p>3</p>
            </article>
          </section>

          <div className='flex w-full justify-center my-5 gap-6'>
            <button onClick={async () => {
              if (confirm('¿Estás seguro que deseas eliminar este cliente?')) { //! change to toast
                await handleDeleteCustomer(customer.id)
              }
            }} type="button" className='min-w-[115px] text-white bg-primary rounded-lg p-2 hover:opacity-75'>
              Borrar cliente
            </button>
            <button type="button" onClick={() => { setOpenModal(true) }} className='min-w-[115px] text-white bg-primary rounded-lg p-2 hover:opacity-75'>
              Editar cliente
            </button>
          </div>
          <Modal open={openModal} setOpen={setOpenModal} title='Editar cliente' >
            <FormEditCustomer customer={customer} setOpen={setOpenModal} setCustomer={setCustomer} />
          </Modal >
        </main >
      }
    </>
  )
}
export default CustomerEditPage
