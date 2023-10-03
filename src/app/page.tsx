import { type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { slides } from '../../public/slides'
import Carousel from '@/components/Carousel'
import Hero from '@/components/Hero'

const HomePage: NextPage = () => {
  const title = '... porque no hay una sensación mejor que un nuevo juego de uñas.'
  const urlImg = 'url("/hero.jpg")'

  return (
    <main >

      <Hero title={title} urlImg={urlImg}></Hero>

      {/* slogan */}
      <section className='mb-14'>
        <div className="px-4 py-10">

          <header className='mb-8'>
            <h1 className='text-center text-3xl font-semibold'>Haz que unas uñas preciosas formen parte de tu vida.</h1>
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
      <section className='mb-14'>

        <div className=" w-full h-auto">
          <Image src="/services.png" alt="servicios" width={256} height={144} className='w-full'></Image>
        </div>

        <div className="px-4 py-10">

          <header className='mb-8'>
            <h2 className='text-xl text-gray'>Déjanos mimarte.</h2>
            <h1 className='text-3xl font-semibold'>Servicios</h1>
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

          <footer className='flex flex-col items-center justify-center'>
            <button className='w-52 h-16 mt-1 p-2 font-normal border border-primary rounded transition-transform duration-300 ease-in-out transform hover:border-white hover:bg-primary hover:text-white'>
              <Link href={'/services'}>
                VER TODOS LOS SERVICIOS
              </Link>
            </button>
          </footer>
        </div>
      </section>

      {/* De prueba */}
      <Carousel slides={slides} autoSlide={true} autoSlideInterval={4000} />

      <section className='flex flex-col items-center px-4 my-3 mt-6'>
        <h1 className='font-black text-2xl'>
          ¡Bienvenidos a nuestro oasis de belleza!
        </h1>

        <p className='max-w-[820px] py-5'>En nuestro encantador salón, fusionamos arte y estilo para brindarte una experiencia de cuidado personalizada que dejará huella. Especializados en manicure y pedicure, te invitamos a sumergirte en un mundo de colores y creatividad mientras mimamos tus manos y pies.</p>

        <p className='max-w-[820px] py-5'>Pero eso no es todo: nuestro equipo de expertos estilistas también se dedica a transformar cabellos en lienzos vivientes. Desde cortes vanguardistas hasta tintes y mechas que deslumbran, cada servicio es una obra maestra única que refleja tu personalidad y esencia.</p>
      </section>
      {/* De prueba */}

    </main>
  )
}

export default HomePage
