import { type NextPage } from 'next'
import Link from 'next/link'
import Hero from '@/app/ui/Hero'

const GalleryPage: NextPage = () => {
  const title = 'NUESTRA GALERÍA'
  const urlImg = 'url("./hero.jpeg")'

  return (
    <>
      <Hero title={title} urlImg={urlImg} />

      <main className='flex flex-col items-center justify-center py-4'>
        <header className="p-3 text-center text-black">
          <h1 className='text-2xl font-bold'>¡Bienvenidos a nuestra galería de uñas!</h1>
          <p>Explora nuestros servicios, diseños y temporadas</p>
        </header>

        <section className='px-4 my-3 max-w-[820px]'>
          <p className='py-2'>
            Estamos trabajando en crear una experiencia visual excepcional que muestre nuestros servicios de uñas, diseños creativos y las últimas tendencias de temporada.
          </p>
          <p className='py-2'>
            Mientras tanto, síguenos en nuestras redes sociales para recibir actualizaciones exclusivas y estar al tanto de nuestras novedades.
          </p>
          <div className='mt-4 text-secondary'>
            <Link target='_blank' href='https://www.facebook.com/profile.php?id=100095532879449&mibextid=ZbWKwL' className='hover:underline mr-4'>Facebook</Link>
            <Link target='_blank' href='https://instagram.com/dream.nails.vale?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==' className='hover:underline mr-4'>Instagram</Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default GalleryPage
