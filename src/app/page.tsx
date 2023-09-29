import { type NextPage } from 'next'
import { slides } from '../../public/slides'
import Carousel from '@/components/Carousel'

const HomePage: NextPage = () => {
  return (
    <main >
      <Carousel slides={slides} autoSlide={true} autoSlideInterval={4000} />

      <section className='flex flex-col items-center px-4 my-3 mt-6'>
        <h1 className='font-black text-2xl'>
          ¡Bienvenidos a nuestro oasis de belleza!
        </h1>

        <p className='max-w-[820px] py-5'>En nuestro encantador salón, fusionamos arte y estilo para brindarte una experiencia de cuidado personalizada que dejará huella. Especializados en manicure y pedicure, te invitamos a sumergirte en un mundo de colores y creatividad mientras mimamos tus manos y pies.</p>

        <p className='max-w-[820px] py-5'>Pero eso no es todo: nuestro equipo de expertos estilistas también se dedica a transformar cabellos en lienzos vivientes. Desde cortes vanguardistas hasta tintes y mechas que deslumbran, cada servicio es una obra maestra única que refleja tu personalidad y esencia.</p>
      </section>

    </main>
  )
}

export default HomePage
