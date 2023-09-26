import Link from 'next/link'
import { CiMail, CiPhone, CiInstagram, CiFacebook } from 'react-icons/ci'

const Topbar = (): JSX.Element => {
  return (
    <>
      <nav className='w-full bg-primary shadow-[0_3px_5px_0px_rgba(0,0,0,0.3)] text-lg text-secondary font-bold p-2' >
        <div className=' sm:grid grid-cols-2 md:flex md:mx-auto md:justify-center md:gap-8'>
          <Link href={'mailto:dreamnails.beauty@hotmail.com'}>
            <div className="flex justify-center items-center">
              <CiMail></CiMail><p className='px-1'>dreamnails.beauty@hotmail.com</p>
            </div>
          </Link>

          <div className="flex items-center justify-center gap-2">
            <Link target='_blank' href={'https://www.instagram.com/dream.nails.vale/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D'}>
              <CiInstagram></CiInstagram>
            </Link>
            <Link target='_blank' href={'https://www.facebook.com/people/Dream-Nails/100095532879449/?mibextid=ZbWKwL'}>
              <CiFacebook></CiFacebook>
            </Link>
          </div>

          <Link href={'tel:+529812099475'}>
            <div className="flex justify-center items-center">
              <CiPhone></CiPhone><p>981-209-9475</p>
            </div>
          </Link>

          <p className='text-center'>
            Lunes - Sábado 10:00 hrs - 20:00 hrs
          </p>
        </div>
      </nav>
    </>
  )
}

export default Topbar
