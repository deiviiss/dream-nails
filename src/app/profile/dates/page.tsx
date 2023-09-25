import { type NextPage } from 'next'

const GaleryPage: NextPage = () => {
  return (
    <main className='flex flex-col items-center justify-center gap-y-6 py-4'>
      <header className="flex justify-center p-3">
        <h1 className='text-2xl font-bold'>Citas agendadas</h1>
      </header>

      <section className="flex flex-col items-center w-full">
        <div className='bg-primary flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded max-w-md'>
          <p>
            Aquí ira la información de las citas agendadas por el cliente.
          </p>
        </div>
      </section>
    </main>
  )
}

export default GaleryPage
