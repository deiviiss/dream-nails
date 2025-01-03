import Link from 'next/link'

import AccordionFooter from './AcordionFooter'

const items = [
  {
    id: 1,
    title: 'Redes sociales',
    enlaces: [
      {
        id: 1,
        title: 'Instagram',
        url: 'https://instagram.com/dream.nails.campeche',
        target: '_blank'
      },
      {
        id: 2,
        title: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=100095532879449&mibextid=ZbWKwL',
        target: '_blank'
      }
    ]
  },
  {
    id: 2,
    title: 'Enlaces útiles',
    enlaces: [
      {
        id: 1,
        title: 'Galeria',
        url: '/salon-page/galery',
        target: undefined
      },
      {
        id: 2,
        title: 'Servicios',
        url: '/salon-page/salon-services',
        target: undefined
      }
    ]
  },
  {
    id: 3,
    title: 'Legal',
    enlaces: [
      {
        id: 1,
        title: 'Política de privacidad',
        url: '/salon-page/privacy',
        target: undefined
      },
      {
        id: 2,
        title: 'Términos y condiciones',
        url: '/salon-page/terms',
        target: undefined
      },
      {
        id: 3,
        title: 'Política de reservación',
        url: '/salon-page/reservation-policy',
        target: undefined
      }
    ]
  }
]

export const Footer = (): JSX.Element => {
  return (
    <footer className='flex flex-col gap-3 justify-center items-center w-full mt-10'>
      <h1 className=' opacity-10 tracking-[8px] text-center text-4xl'>
        DREAM NAILS
      </h1>
      <div className='hidden sm:flex items-center justify-center w-full gap-5 text-white py-7 bg-primary shadow-[0_-3px_5px_0px_rgba(0,0,0,0.3)]'>
        <Link
          className='border-b-2 border-transparent hover:border-secondary pb-0'
          href={'/salon-page/terms'}
        >
          Términos y condiciones
        </Link>
        <Link
          className='border-b-2 border-transparent hover:border-secondary pb-0'
          href={'/salon-page/privacy'}
        >
          Política de Privacidad
        </Link>
        <Link
          className='border-b-2 border-transparent hover:border-secondary pb-0'
          href={'/salon-page/reservation-policy'}
        >
          Política de Reserva y Cancelación
        </Link>
      </div>
      <div className='sm:hidden w-full text-white py-7 bg-primary shadow-[0_-3px_5px_0px_rgba(0,0,0,0.3)]'>
        <AccordionFooter items={items} />
      </div>
    </footer>
  )
}
