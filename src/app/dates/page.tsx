import { type NextPage } from 'next'
import Link from 'next/link'
import { IoLogoWhatsapp } from 'react-icons/io'

const DatesPage: NextPage = () => {
  return (

    <div className="flex flex-col items-center justify-center pt-[150.5px] bg-primary-gradient">

      <main className='flex flex-col items-center justify-start gap-y-6 py-4 text-white h-screen'>
        <header className="flex justify-center p-3 ">
          <h1 className='text-2xl font-bold'>No hay citas disponibles :(</h1>
        </header>

        <p>Para mayor información contáctanos.</p>
        <Link target='_blank' href={'https://wa.me/529812099475'}>
          <div className="flex justify-center items-center gap-2">
            <p>Mándame un </p><IoLogoWhatsapp></IoLogoWhatsapp>
          </div>
        </Link>

      </main>
    </div>

  )
}

export default DatesPage
