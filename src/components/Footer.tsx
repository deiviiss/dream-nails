import Link from 'next/link'

export const Footer = (): JSX.Element => {
  return (
    <footer className="flex justify-center items-center w-full text-white text-xl gap-3 p-5 mt-10 bg-[#AED2D8] shadow-[0_-3px_5px_0px_rgba(0,0,0,0.3)]">
      <Link href={'/'}>Terminos y condiciones</Link>
      <Link href={'/'}>Politicas de Privacidad</Link>
      <Link href={'/'}>Ayuda</Link>
    </footer>
  )
}
