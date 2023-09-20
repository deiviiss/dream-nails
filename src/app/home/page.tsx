import { type NextPage } from 'next'
import Link from 'next/link'

const HomePage: NextPage = () => {
  return (
    <main className='flex flex-col items-center justify-center max-w-[70ch] h-[calc(100vh-4rem)] mx-auto'>
      <div className=' bg-neutral-950 flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded'>
        <h1 className='text-center text-2xl font-bold mb-4'>
          Main page of the application.
        </h1>
        <Link href='/profile'>Profile</Link>
      </div>
    </main>
  )
}

export default HomePage
