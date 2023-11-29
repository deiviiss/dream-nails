'use client'
import { type NextPage } from 'next'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { AppointmentCard } from '@/app/ui/apointments/AppointmentCard'
import { AppointmentFormCreate } from '@/app/ui/apointments/AppointmentFormCreate'
import Modal from '@/app/ui/Modal'
import { useAppointments } from '@/context/AppointmentsContext'
import { type AppointmentCustomer } from '@/interfaces/Appointment'

const AppointmentsPage: NextPage = () => {
  const { appointments, loadAppointments } = useAppointments()

  const [openModalAddAppointment, setOpenModalAddAppointment] = useState(false)

  useEffect(() => {
    // renders only once
    const fetchData = async () => {
      loadAppointments()
    }

    fetchData()
  }, [loadAppointments])

  const handleClickAddAppointment = (): void => {
    setOpenModalAddAppointment(true)
  }

  return (
    <main className='flex flex-col items-center justify-center mx-auto gap-y-6 py-4 px-2 w-full max-w-lg mt-[150.5px]'>
      <header className='w-full flex justify-between'>
        <h1 className='text-base text-left font-medium'>Listado de citas</h1>
        <button className='px-2' onClick={handleClickAddAppointment}>
          <AiOutlinePlus></AiOutlinePlus>
        </button>
      </header>

      <section className='w-full flex flex-col gap-y-5'>
        <header className='w-full flex justify-between'>
          <h1 className='text-xl text-left font-medium'>Citas</h1>
          <h1 className='text-xl text-left font-medium px-2'>
            {appointments?.length}
          </h1>
        </header>

        {appointments?.map((appointment: AppointmentCustomer) => {
          return (
            <AppointmentCard appointment={appointment} key={appointment.id} />
          )
        })}

        {appointments.length === 0 && (
          <article className='max-w-2xl mx-auto'>
            <h1 className='text-center'>No hay citas agendadas.</h1>
          </article>
        )}
      </section>

      <Modal
        open={openModalAddAppointment}
        setOpen={setOpenModalAddAppointment}
        title='Agendar cita'
      >
        <AppointmentFormCreate
          setOpen={setOpenModalAddAppointment}
        ></AppointmentFormCreate>
      </Modal>
    </main>
  )
}

export default AppointmentsPage
