import { type NextPage } from 'next'

const GaleryPage: NextPage = () => {
  return (
    <main className='flex flex-col items-center justify-center gap-y-6 py-4'>
      <header className="flex justify-center p-3">
        <h1 className='animate-shake animate-infinite animate-duration-300 animate-delay-300 animate-ease-out animate-alternate animate-fill-backwards text-3xl font-bold'>Aquí ira una galeria de imágenes.</h1>
      </header>

    </main>
  )
}

export default GaleryPage
