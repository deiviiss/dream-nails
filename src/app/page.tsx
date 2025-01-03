import { type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { ButtonContactWhatsApp } from '@/components/dream-nails'
import { CarouselGaleryHome } from '@/components/dream-nails/CarrouselGaleryHome'
import { Footer } from '@/components/dream-nails/Footer'
import Hero from '@/components/dream-nails/Hero'
import Navbar from '@/components/dream-nails/Navbar'
import { Button } from '@/components/ui/button'

const HomePage: NextPage = async () => {
  const title = 'LA MAGIA OCURRE CUANDO AMAS LO QUE HACES'
  const urlImg = 'url("/hero.jpeg")'

  return (
    <>
      <Navbar />
      <main>
        <Hero title={title} urlImg={urlImg}></Hero>

        {/* slogan */}
        <section className='flex flex-col gap-4 items-center mb-9 p-5 lg:flex-row text-center'>
          <div className='py-10 max-w-[800px] mx-auto'>
            <header className='mb-8'>
              <h1 className='text-3xl font-semibold text-black'>
                Haz que unas uñas preciosas formen parte de tu vida
              </h1>
            </header>

            <article className='mb-12'>
              <p>
                En Dream Nails brindamos atención a los detalles, a las puntas
                de tus uñas. Dream Nails del equipo Dream.
              </p>
            </article>

            <footer className='flex flex-col items-center justify-center'>
              <button className='w-40 h-16 mt-1 p-2 font-normal border border-primary rounded transition-transform duration-300 ease-in-out transform hover:border-white hover:bg-primary hover:text-white'>
                <Link target='_blank' href={'https://wa.me/529812099475'}>
                  ¡AGENDA AHORA!
                </Link>
              </button>
            </footer>
          </div>
        </section>

        {/* services */}
        <section className='flex flex-col gap-4 items-center mb-8 p-5 lg:flex-row' id='services'>
          <div className='flex flex-col gap-4 items-center lg:flex-row max-w-[900px] mx-auto'>
            {/* image */}
            <div className='relative w-auto max-w-[700px] h-full border-2 border-secondary p-4'>
              <Image
                src='/services.jpg'
                alt='servicios'
                width={736}
                height={920}
                className='w-full'
              ></Image>
              <div className='w-40 sm:w-60 md:w-80 lg:w-60 border-2 border-secondary p-4 absolute -bottom-4 -left-7'>
                <Image
                  src='/services2.jpg'
                  alt='servicios'
                  width={256}
                  height={144}
                  className='w-full'
                ></Image>
              </div>
            </div>
            {/* body */}
            <div className='py-10 max-w-[400px] mx-auto'>
              <header className='mb-8'>
                <h2 className='text-xl text-cuartiary'>Déjanos mimarte.</h2>
                <h1 className='text-3xl font-semibold text-black'>Servicios</h1>
              </header>

              <article className='mb-12'>
                <p className=' mb-10'>
                  Nuestros equipos, capacitados por expertos, brindan tratamientos
                  superiores de belleza y uñas, y nuestros salones bellamente
                  diseñados le ofrecen un espacio para relajarse y disfrutar:
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
                  <Link href={'/salon-page/salon-services'}>Ver todos</Link>
                </button>
              </footer>
            </div>
          </div>
        </section>

        {/* location */}
        <section className='flex flex-col gap-4 items-center mb-8 p-5 lg:flex-row'>
          <div className='flex flex-col gap-4 items-center lg:flex-row max-w-[900px] mx-auto'>
            {/* image */}
            <div className='relative w-auto max-w-[700px] h-full border-2 border-secondary p-4'>
              <Image
                src='/location.jpg'
                alt='servicios'
                width={736}
                height={920}
                className='w-full'
              ></Image>
              <div className='w-40  sm:w-60 md:w-80 lg:w-60 border-2 border-secondary p-4 absolute -bottom-4 -left-7'>
                <Image
                  src='/services3.jpg'
                  alt='servicios'
                  width={256}
                  height={144}
                  className='w-full'
                ></Image>
              </div>
            </div>
            {/* body */}
            <div className='py-10 max-w-[400px] mx-auto'>
              <header className='mb-8'>
                <h2 className='text-xl text-cuartiary'>
                  Encuentra Dream Nails cerca de ti.
                </h2>
                <h1 className='text-3xl font-semibold text-black'>Ubicación</h1>
              </header>

              <article className='mb-12'>
                <p className=' mb-4'>
                  Siéntate, relájate y saborea el simple placer de realizar tu
                  manicura, pedicura o tratamiento de belleza en Dream Nails.
                </p>
                <p>
                  Nos encontramos en Calle Lic. José María Iglesias Manzana 39
                  Lote 33 Colonia Presidentes de México, CP 24088 Campeche,
                  Campeche.
                </p>
              </article>

              <footer className='flex flex-col items-start justify-center'>
                <button className='w-52 h-16 mt-1 p-2 font-normal border border-primary rounded transition-transform duration-300 ease-in-out transform hover:border-white hover:bg-primary hover:text-white'>
                  <Link
                    target='_blank'
                    href={
                      'https://www.google.com/maps/dir//Dream+Nails,+Lic.+Jos%C3%A9+Mar%C3%ADa+Iglesias+Manzana+39+Lote+33,+Presidentes+de+M%C3%A9xico,+24088+Campeche,+Camp./@29.6085376,-110.1568577,4z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85f83774e01f56e1:0xb8459765850d9d4c!2m2!1d-90.4864833!2d19.8611856?entry=ttu'
                    }
                  >
                    Visítanos
                  </Link>
                </button>
              </footer>
            </div>
          </div>
        </section>

        {/*  Galery */}
        <section className='flex flex-col gap-4 items-center mb-12 p-5'>
          <div className='w-full max-w-[900px] mx-auto'>
            <header className='mb-8'>
              <h1 className='text-3xl font-semibold text-black'>Galería</h1>
            </header>

            <CarouselGaleryHome />
          </div>

          <Button
            variant={'ghost'}
            asChild
            size={'lg'}
            className='mt-4 border border-primary hover:bg-primary hover:text-white'
          >
            <Link href={'/salon-page/galery'}>
              Ver todas
            </Link>
          </Button>
        </section>

        {/* instagram */}
        <section className='flex flex-col gap-4 items-center mb-10 p-5 lg:flex-row'>
          {/* body */}
          <div className='max-w-[800px] mx-auto'>
            <header className='mb-8'>
              <h1 className='text-3xl font-semibold text-black'>
                Comparte con nosotros
              </h1>
            </header>

            <footer className='flex flex-col items-center justify-center'>
              <button className='w-52 h-16 mt-1 p-2 font-normal border border-transparent border-b-primary rounded hover:border-b-tertiary'>
                <Link
                  target='_blank'
                  href={
                    'https://www.instagram.com/dream.nails.campeche/'
                  }
                >
                  @dream.nails.campeche
                </Link>
              </button>
            </footer>
          </div>
        </section>

        <ButtonContactWhatsApp name='Citas' className='fixed bottom-5 right-3 md:right-3 z-10 text-white hover:no-underline hover:text-gray-900 text-xl flex gap-1 p-2 border-secondary border bg-primary print:hidden animate-bounce'
          icon={<IoLogoWhatsapp />}
        />
        <Footer />

      </main>
    </>
  )
}

export default HomePage
