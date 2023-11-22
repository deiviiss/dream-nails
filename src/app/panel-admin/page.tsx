'use client'
import { type NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsFillSearchHeartFill } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { FormCreateCustomer } from '../salon-services/customers/FormCustomer'
import Modal from '@/app/ui/Modal'
import { useAppointments } from '@/context/AppointmentsContext'
import { useCustomers } from '@/context/CustomersContext'

const AdminPage: NextPage = () => {
  const [openModal, setOpenModal] = useState(false)

  const { customers, loadCustomers } = useCustomers()

  const { appointments, loadAppointments, loadCancelledAppointments, cancelledAppointments } = useAppointments()

  const handleClickModal = (): void => {
    setOpenModal(true)
  }

  useEffect(() => {
    // loadCustomers()
    loadAppointments()
    loadCancelledAppointments()
  }, [])

  return (
    <main className='flex flex-col items-center justify-center mx-auto gap-y-6 py-4 px-2 w-full max-w-lg mt-[150.5px]'>

      <header className="w-full flex justify-between">
        <h1 className='text-base text-left font-medium'>
          Panel de administrador
        </h1>
        <button className='px-2' onClick={async () => { await loadCustomers() }}><GrUpdate></GrUpdate></button>
      </header>

      <section className="flex flex-col items-center w-full">
        <header className="w-full flex justify-between">
          <h1 className='text-xl text-left font-medium'>
            Clientes
          </h1>
          <h1 className='text-xl text-left font-medium px-2'>
            {customers?.length}
          </h1>
        </header>

        {/*
            //! Convertir en componente Buscador de clientes
            */}
        <div className='flex justify-center w-full gap-x-4 mx-2 my-5 px-3'>
          <input type="search" name="search-customer" placeholder='Escribe el nombre o teléfono de un cliente' className='w-full py-1 px-2 focus:outline focus:outline-secondary rounded-lg' />
          <button type="button" className='text-white bg-primary rounded-lg p-2 hover:opacity-75'><BsFillSearchHeartFill /></button>
        </div>

        <div className='flex w-full justify-center my-5 gap-6'>
          <button type="button" onClick={handleClickModal} className='min-w-[115px] text-white bg-primary rounded-lg p-2 hover:opacity-75'>
            Agregar Cliente
          </button>
          <button type="button" className='min-w-[115px] text-white bg-primary rounded-lg p-2 hover:opacity-75'>
            <Link href={'/panel-admin/appointments'}>Agendar Cita</Link>
          </button>
        </div>

        <article className=" flex flex-col justify-between items-end w-full my-5">
          <div className='w-full flex justify-between items-center'>
            <p className='text-xl text-left font-medium'>
              Citas agendadas
            </p>
            <p className='text-xl text-left font-medium px-2'>
              {appointments?.length}
            </p>
          </div>

          <div className='w-full flex justify-between items-center'>
            <p className='text-xl text-left font-medium'>
              Citas completadas
            </p >
            <p className='text-xl text-left font-medium px-2'>
              3
            </p>
          </div>

          <div className='w-full flex justify-between items-center'>
            <p className='text-xl text-left font-medium'>
              Citas canceladas
            </p >
            <p className='text-xl text-left font-medium px-2'>
              {cancelledAppointments?.length}
            </p>
          </div>

        </article >

      </section>

      <div className='w-full rounded border-2 border-primary'></div>

      <section className="flex flex-col items-center w-full">

        <article className=" flex items-end w-full my-5">
          <p className='text-xl text-left font-medium w-72'>
            Próxima cita
          </p>

          <div className="w-full border-dashed border-zinc-400 border-[1.9px]"></div>

          <div className='flex flex-col w-72 items-end'>
            <p>23/Oct/2020</p>
            <p> Fulana Reyes</p>
          </div>
        </article >

        <div className="flex justify-center w-full gap-x-4 my-5">
          <button type="button" className='min-w-[115px] text-white bg-primary rounded-lg p-2 hover:opacity-75'><Link href={'/panel-admin/customers'}>Clientes</Link></button>
          <button type="button" className='min-w-[115px] text-white bg-primary rounded-lg p-2 hover:opacity-75'><Link href={'/panel-admin/appointments'}>Citas</Link></button>
        </div>

      </section>

      <Modal open={openModal} setOpen={setOpenModal} title='Nuevo cliente' >
        <FormCreateCustomer open={openModal} setOpen={setOpenModal} />
      </Modal >
    </main>
  )
}

export default AdminPage
