import Link from 'next/link'

export const Footer = (): JSX.Element => {
  return (
    <footer className="flex justify-center items-center w-full text-primary text-xl gap-3 p-5 mt-10 bg-primary shadow-[0_-3px_5px_0px_rgba(0,0,0,0.3)]">
      <Link className='hover:underline' href={'/'}>Términos y condiciones</Link>
      <Link className='hover:underline' href={'/'}>Política de Privacidad</Link>
    </footer>
  )
}
