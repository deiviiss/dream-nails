import { type NextPage } from 'next'
import { slides } from '../../public/slides'
import Carousel from '@/components/Carousel'

const HomePage: NextPage = () => {
  return (
    <main >
      <Carousel slides={slides} autoSlide={true} autoSlideInterval={4000} />

      <div className="text-center px-2">
        <p>Aqui se mostraran el carrousel de imagens y se llenara con información como si de una landing page se tratase.</p>
      </div>

    </main>
  )
}

export default HomePage
