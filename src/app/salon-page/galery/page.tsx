import { type NextPage } from 'next'
import { getPaginationImages } from '@/actions/dream-nails'
import { GaleryImages } from '@/components/dream-nails'
import Hero from '@/components/dream-nails/Hero'

const GalleryPage: NextPage = async () => {
  const title = 'NUESTRA GALERÍA'
  const urlImg = 'url("/hero.jpeg")'

  const { images } = await getPaginationImages({ page: 1 })

  return (
    <>
      <Hero title={title} urlImg={urlImg} />

      <GaleryImages images={images} />
    </>
  )
}

export default GalleryPage
