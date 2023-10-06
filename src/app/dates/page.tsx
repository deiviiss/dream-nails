import { type NextPage } from 'next'
import Link from 'next/link'
import { IoLogoWhatsapp } from 'react-icons/io'

const DatesPage: NextPage = () => {
  return (

    <main className='py-4 pt-[150.5px]'>
      <section className="flex flex-col items-center justify-center gap-y-6 p-4 min-h-[200px]">
        <header className="flex justify-center p-3 ">
          <h1 className='text-2xl font-bold'>No hay citas disponibles :(</h1>
        </header>

        <p>Para mayor información contáctanos.</p>
        <Link target='_blank' href={'https://wa.me/529812099475'}>
          <div className="flex justify-center items-center gap-2">
            <p>Mándame un </p><IoLogoWhatsapp></IoLogoWhatsapp>
          </div>
        </Link>
      </section>
    </main>

  )
}

export default DatesPage
