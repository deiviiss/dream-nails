'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Modal from '../Modal'
import { AppointmentForm } from '@/app/ui/apointments/AppointmentFormCancel'
import { type AppointmentCustomer } from '@/interfaces/Appointment'

interface AppointmentCardProps {
  appointment: AppointmentCustomer
}

export const AppointmentCard = ({
  appointment
}: AppointmentCardProps): JSX.Element => {
  const router = useRouter()

  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <article
        key={appointment.id}
        className='flex flex-col sm:flex-row justify-between gap-x-12 border border-secondary px-0 py-4 rounded-lg max-w-2xl mx-auto'
      >
        <section className='flex flex-col justify-around mx-6'>
          <h1 className='text-xl font-bold capitalize'>
            {appointment.Customer.name}
          </h1>

          <div className='flex w-full justify-between gap-x-3'>
            <p>Día:</p>
            <p>
              {new Date(appointment.date).toLocaleDateString('es-Mx', {
                weekday: undefined,
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className='flex w-full justify-between gap-x-3'>
            <p>Status de la uña:</p>
            <p>{appointment.nail_status}</p>
          </div>
        </section>

        <footer className='flex sm:flex-col gap-5 justify-center mx-6 my-2 items-center'>
          <button
            className='bg-primary text-white w-full px-2 py-1 rounded-md hover:opacity-75'
            onClick={() => {
              router.push(`/panel-admin/appointments/${String(appointment.id)}`)
            }}
          >
            Editar
          </button>
          <button
            className='bg-primary text-white w-full px-2 py-1 rounded-md hover:opacity-75'
            onClick={() => {
              setOpenModal(true)
            }}
          >
            Cancelar
          </button>
        </footer>
        <Modal open={openModal} setOpen={setOpenModal} title='Motivo'>
          <AppointmentForm
            appointment={appointment}
            open={openModal}
            setOpen={setOpenModal}
            key={appointment.id}
          />
        </Modal>
      </article>
    </>
  )
}
