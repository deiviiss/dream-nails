'use client'
import { type NextPage } from 'next'
import Hero from '@/components/Hero'

const ServicesPage: NextPage = () => {
  const title = 'SOBRE NOSOTROS'
  const urlImg = 'url("./hero.jpg")'

  return (

    <>
      <Hero title={title} urlImg={urlImg}></Hero>

      <main className='flex flex-col items-center justify-center gap-y-2 py-4'>
        <header className="flex flex-col items-center justify-center p-3 text-black">
          <h1 className='text-2xl font-bold text-center'>Acerca de Nosotros</h1>
          <p>Actualmente en construcción</p>
        </header>

        <section className='px-4 my-3'>
          <p className='max-w-[820px] py-2'>¡Gracias por visitar nuestra página Acerca de Nosotros! Estamos trabajando arduamente para brindarte información detallada sobre nuestra empresa y nuestra historia.</p>
          <p className='max-w-[820px] py-2'>
            En este momento, estamos recopilando datos importantes y creando un contenido informativo que te ayudará a conocernos mejor. Queremos asegurarnos de que tengas una visión completa de quiénes somos y qué hacemos.
          </p>
          <p className='max-w-[820px] py-2'>
            Te pedimos paciencia mientras perfeccionamos esta sección. Nuestro objetivo es proporcionarte una experiencia informativa y atractiva. Estamos emocionados por compartir nuestra historia contigo.
          </p>
          <p className='max-w-[820px] py-2'>
            Mantente atento, pronto revelaremos nuestra página Acerca de Nosotros completamente renovada. Mientras tanto, no dudes en explorar otras áreas de nuestro sitio web y descubrir lo que tenemos para ofrecer. ¡Estamos seguros de que encontrarás muchas cosas interesantes aquí!
          </p>
          <p className='max-w-[820px] py-2'>
            Agradecemos tu comprensión y paciencia mientras trabajamos en mejorar esta sección. Esperamos que disfrutes explorando nuestra historia y nuestros valores en el futuro cercano. ¡Estén atentos!
          </p>
        </section>
      </main>

    </>

  )
}

export default ServicesPage
