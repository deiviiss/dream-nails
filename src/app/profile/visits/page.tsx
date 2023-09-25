import { type NextPage } from 'next'

const DatosPage: NextPage = () => {
  return (
    <main className='flex flex-col items-center justify-center gap-y-6 py-4'>
      <header className="flex justify-center p-3">
        <h1 className=' text-2xl font-bold'>
          Mis visitas
        </h1>
      </header>

      <section className="flex flex-col items-center w-full">
        <div className='bg-primary flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded max-w-md'>
          Aqui iran las visitas que el cliente ha realizado.
        </div>
      </section>

    </main>
  )
}

export default DatosPage
