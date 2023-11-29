import { type NextPage } from 'next'
import Link from 'next/link'

const GaleryPage: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-start pt-[150.5px] bg-primary-gradient'>
      <main className='flex flex-col items-center justify-start gap-y-6 py-4 text-white h-screen'>
        <header className='flex justify-center p-3'>
          <h1 className='text-2xl font-bold'>Citas agendadas</h1>
        </header>

        <section className='flex flex-col items-center w-full'>
          <div className='bg-primary flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded max-w-md'>
            <p>
              Aún no has programado ninguna cita con nosotros, pero estamos
              listos para atenderte cuando lo desees.
            </p>

            <button
              type='button'
              className='bg-secondary rounded-md p-2 hover:bg-highlight'
            >
              <Link target='_blank' href={'https://wa.me/529812099475'}>
                Reservar cita
              </Link>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default GaleryPage
