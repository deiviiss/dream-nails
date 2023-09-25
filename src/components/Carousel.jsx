import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import SlideButtons from '../components/SlidesButtons'

const Carousel = ({ children: slides, autoSlide = false, autoSlideInterval = 4000 }) => {
  const [curr, setCurr] = useState(0)

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    let slideInterval
    if (autoSlide) {
      slideInterval = setInterval(() => {
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
      }, autoSlideInterval)
    }
    return () => clearInterval(slideInterval)
  }, [autoSlide, autoSlideInterval, slides.length])

  return (
    <>
      <div className='relative bg-[#6343AE] overflow-hidden'>
        <div className='flex transition-transform ease-out duration-500' style={{ transform: `translateX(-${curr * 100}%)` }}>
          {slides}
        </div>

        <div className='hidden absolute inset-0 sm:flex items-center justify-between px-4 '>
          <button onClick={prev} className='px-4 py-2 bg-transparent text-white border-none cursor-pointer transition duration-200 ease-out hover:text-purple-700 absolute top-1/2 left-3 transform -translate-y-1/2'>
            <IoIosArrowBack size={24} />
          </button>
          <button onClick={next} className='px-4 py-2 bg-transparent text-white border-none cursor-pointer transition duration-200 ease-out hover:text-purple-700 absolute top-1/2 right-3 transform -translate-y-1/2'>
            <IoIosArrowForward size={24} />
          </button>
        </div>

        <div className="hidden">
          <SlideButtons slides={slides} curr={curr} setCurr={setCurr} />
        </div>

      </div>
    </>
  )
}

Carousel.propTypes = {
  children: PropTypes.array,
  autoSlide: PropTypes.bool,
  autoSlideInterval: PropTypes.number
}

export default Carousel
