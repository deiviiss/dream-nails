import { type NextPage } from 'next'
import Link from 'next/link'

const GaleryPage: NextPage = () => {
  return (
    <main className='flex flex-col items-center justify-center gap-y-6 py-4 mt-[150px]'>
      <header className="flex justify-center p-3">
        <h1 className='text-2xl font-bold'>Citas agendadas</h1>
      </header>

      <section className="flex flex-col items-center w-full">
        <div className='bg-primary flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded max-w-md'>
          <p>
            Aún no has programado ninguna cita con nosotros, pero estamos listos para atenderte cuando lo desees.
          </p>

          <button type="button" className='bg-secondary rounded-md p-2 hover:bg-highlight'><Link href={'/dates'}>Reservar cita</Link></button>
        </div>
      </section>
    </main>
  )
}

export default GaleryPage
