import { type NextPage } from 'next'
import Link from 'next/link'

const DatesPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-start pt-[150.5px] bg-primary-gradient  h-screen">
      <main className='flex flex-col items-center justify-center gap-y-6 py-4 text-white'>
        <header className="flex justify-center p-3">
          <h1 className=' text-2xl font-bold'>
            Mis visitas
          </h1>
        </header>

        <section className="flex flex-col items-center w-full">
          <div className='bg-primary flex flex-col justify-center items-center mx-2 px-8 py-5 gap-y-4 rounded max-w-md'>
            <p>
              ¡Hola! En tu historial, no hemos registrado ninguna visita a nuestro salón todavía. Esperamos verte pronto para brindarte una experiencia de cuidado excepcional.
            </p>

            <button type="button" className='bg-secondary rounded-md p-2 hover:bg-highlight'><Link href={'/dates'}>Reservar cita</Link></button>
          </div>
        </section>
      </main>
    </div>

  )
}

export default DatesPage
