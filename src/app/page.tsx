import { type NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <main className='px-2'>
      <header className="flex justify-center p-6">
        <h1 className='animate-shake animate-infinite animate-duration-300 animate-delay-300 animate-ease-out animate-alternate animate-fill-backwards text-3xl font-semibold'>Esta es la página de inicio</h1>
      </header>

      <div className="text-center px-2">
        <p>Aqui se mostraran el carrousel de imagens y se llenara con información como si de una landing page se tratase.</p>
      </div>

    </main>
  )
}

export default HomePage
