import { IoChevronDownOutline } from 'react-icons/io5'

const Hero = ({
  title,
  urlImg
}: {
  title: string
  urlImg: string
}): JSX.Element => {
  return (
    <section className='relative'>
      {/* darkening layer */}
      <div className='absolute inset-0 bg-[rgba(0,0,0,0.6)]'></div>

      {/* content with background image */}
      <div
        className='flex flex-col items-end justify-end w-auto h-screen bg-no-repeat bg-center bg-cover'
        style={{ backgroundImage: urlImg }}
      >
        <header className='absolute bottom-20 w-full flex flex-col items-center justify-center px-16 gap-y-5'>
          <h1 className='text-white text-center font-semibold text-2xl animate-fade-up'>
            {title}
          </h1>
          <IoChevronDownOutline className='w-7 h-7 text-white animate-bounce' />
        </header>
      </div>
    </section>
  )
}

export default Hero
