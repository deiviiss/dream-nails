import Link from 'next/link'

const LoginButton = (): JSX.Element => {
  return (
    <Link href={'/login'}>
      <button className='w-full bg-primary h-10 p-0 font-xs text-white underline cursor-pointer'>
        Iniciar Sesión
      </button>
    </Link>
  )
}

export default LoginButton
