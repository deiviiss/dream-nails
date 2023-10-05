'use client'
import { type NextPage } from 'next'
import Hero from '@/components/Hero'

const ServicesPage: NextPage = () => {
  const title = 'SOBRE NOSOTROS'
  const urlImg = 'url("./hero.jpg")'

  return (

    <>
      <Hero title={title} urlImg={urlImg}></Hero>

      <main className='flex flex-col items-center justify-center gap-y-4 py-4 w-full'>
        <header className="flex justify-center p-3 text-black">
          <h1 className='text-2xl font-bold'>Información de la founder</h1>
        </header>

        <div className="flex flex-col gap-6 px-2 w-full overflow-hidden">

        </div>

      </main>
    </>

  )
}

export default ServicesPage
