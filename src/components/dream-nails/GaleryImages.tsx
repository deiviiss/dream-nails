'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface ImageProps {
  images: Array<{
    id: number
    url: string
    title?: string
    description?: string
  }>
}

const mosaicPattern = [
  { span: 'col-span-2 row-span-2', width: 600, height: 600 },
  { span: 'col-span-1 row-span-1', width: 300, height: 300 },
  { span: 'col-span-1 row-span-2', width: 300, height: 600 },
  { span: 'col-span-1 row-span-1', width: 300, height: 300 }
]

export function GaleryImages({ images }: ImageProps): JSX.Element {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex !== null ? (prevIndex - 1 + images.length) % images.length : null
    )
  }

  const goToNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex !== null ? (prevIndex + 1) % images.length : null
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {
          images.map((image, index) => {
            const { span, width, height } = mosaicPattern[index % mosaicPattern.length]

            return (
              <div key={image.id} className={`${span} cursor-pointer`} onClick={() => { openModal(index) }}>
                <Image
                  src={image.url}
                  alt={`Image ${image.id}`}
                  width={width}
                  height={height}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )
          })
        }
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={closeModal}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
          <DialogClose className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-primary hover:text-white transition-opacity z-10">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader className='hidden'>
            <DialogTitle>
            </DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          {selectedImageIndex !== null && (
            <div className='flex flex-col bg-primary/50'>
              <div className="relative w-full h-[90vh]">
                <Image
                  src={images[selectedImageIndex].url}
                  alt={`Full size image ${images[selectedImageIndex].id}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-primary hover:text-white transition-opacity"
                  onClick={goToPrevious}
                >
                  <IoChevronBack className="h-6 w-6" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-primary hover:text-white transition-opacity"
                  onClick={goToNext}
                >
                  <IoChevronForward className="h-6 w-6" />
                  <span className="sr-only">Next image</span>
                </Button>
              </div>
              {/* <div className='max-w-md flex flex-col mx-auto h-full items-start justify-start p-10'>
                <h1 className='font-semibold text-xl'>Acrílicas / Cortas: # 2 y 3</h1>
                <p>Se utiliza una tecnica especial Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero omnis, obcaecati consequuntur tempora repellat dignissimos nostrum magnam a perspiciatis similique illum quidem corporis alias accusantium at ducimus, aspernatur dolorem hic.</p>
              </div> */}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
