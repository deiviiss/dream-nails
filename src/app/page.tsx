import { type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'

const HomePage: NextPage = () => {
  const title = 'LA MAGIA OCURRE CUANDO AMAS LO QUE HACES'
  const urlImg = 'url("/hero.jpeg")'

  return (
    <main>

      <Hero title={title} urlImg={urlImg}></Hero>

      {/* slogan */}
      <section className='flex flex-col gap-4 items-center mb-10 p-5 lg:flex-row text-center'>
        <div className="py-10 max-w-[800px] mx-auto">

          <header className='mb-8'>
            <h1 className='text-3xl font-semibold text-black'>Haz que unas uñas preciosas formen parte de tu vida</h1>
          </header>

          <article className='mb-12'>
            <p>
              En Dream Nails brindamos atención a los detalles, a las puntas de tus uñas. Dream Nails del equipo Dream.
            </p>
          </article>

          <footer className='flex flex-col items-center justify-center'>
            <button className='w-40 h-16 mt-1 p-2 font-normal border border-primary rounded transition-transform duration-300 ease-in-out transform hover:border-white hover:bg-primary hover:text-white'>
              <Link href={'/dates'}>
                ¡AGENDA AHORA!
              </Link>
            </button>
          </footer>
        </div>
      </section>

      {/* services */}
      <section className='flex flex-col gap-4 items-center mb-12 p-5 lg:flex-row '>
        {/* image */}
        <div className="relative w-auto max-w-[700px] h-full border-2 border-secondary p-4">
          <Image src="/services.jpg" alt="servicios" width={736} height={920} className='w-full'></Image>
          <div className='w-40  sm:w-60 md:w-80 lg:w-60 border-2 border-secondary p-4 absolute -bottom-4 -left-7'>
            <Image src="/services2.jpg" alt="servicios" width={256} height={144} className='w-full'></Image>
          </div>
        </div>
        {/* body */}
        <div className="py-10 max-w-[800px] mx-auto">

          <header className='mb-8'>
            <h2 className='text-xl text-cuartiary'>Déjanos mimarte.</h2>
            <h1 className='text-3xl font-semibold text-black'>Servicios</h1>
          </header>

          <article className='mb-12'>
            <p className=' mb-10'>
              Nuestros equipos, capacitados por expertos, brindan tratamientos superiores de belleza y uñas, y nuestros salones bellamente diseñados le ofrecen un espacio para relajarse y disfrutar:
            </p>
            <ul className='list-disc px-4'>
              <li className='pb-3'>Manicure. </li>
              <li className='pb-3'>Pedicure.</li>
              <li className='pb-3'>Arte de uñas.</li>
              <li className='pb-3'>Todo lo relacionado con la belleza.</li>
            </ul>
          </article>

          <footer className='flex flex-col items-start justify-center'>
            <button className='w-52 h-16 mt-1 p-2 font-normal border border-primary rounded transition-transform duration-300 ease-in-out transform hover:border-white hover:bg-primary hover:text-white'>
              <Link href={'/services'}>
                VER TODOS LOS SERVICIOS
              </Link>
            </button>
          </footer>
        </div>
      </section>

    </main>
  )
}

export default HomePage
