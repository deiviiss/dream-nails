import Link from 'next/link'

const BookNowButton = (): JSX.Element => {
  return (
    <button className='w-full h-12 p-2 font-medium border border-x-0 border-white transition-transform duration-300 ease-in-out transform hover:scale-105'>
      <Link target='_blank' href={'https://wa.me/529812099475'}>
        ¡AGENDA AHORA!
      </Link>
    </button>
  )
}

export default BookNowButton
