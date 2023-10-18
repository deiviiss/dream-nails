'use client'
import { useSession, signOut } from 'next-auth/react'

const LoginButton = (): JSX.Element => {
  // nextAuth
  const { data: session } = useSession()
  return (
    <>
      {
        (session != null) &&
        <>
          <button className='w-full bg-primary h-10 p-0 font-xs text-white underline cursor-pointer' onClick={async () => { await signOut() }}>Cerrar sesión</button>
        </>
      }
    </>
  )
}

export default LoginButton
