import Image from 'next/image'
import { getPaginationImages } from '@/actions/dream-nails'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export async function CarouselGaleryHome() {
  const { images } = await getPaginationImages({ page: 1 })

  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className="w-full max-w-3xl mx-auto"
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={image.url}
                    alt={`Imagen ${image.id}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
