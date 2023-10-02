import Link from 'next/link'

export const Footer = (): JSX.Element => {
  return (
    <footer className="flex justify-center items-center w-full text-white p-5 mt-10 bg-primary shadow-[0_-3px_5px_0px_rgba(0,0,0,0.3)]">
      <div className='flex flex-col justify-around items-center gap-3 w-full max-w-[600px] sm:flex-row'>
        <Link className='hover:underline' href={'/terms'}>Términos y condiciones</Link>
        <Link className='hover:underline' href={'/privacy'}>Política de Privacidad</Link>
        <Link className='hover:underline' href={'/reservation-policy'}>Política de Reserva y Cancelación</Link>
      </div>
    </footer>
  )
}
