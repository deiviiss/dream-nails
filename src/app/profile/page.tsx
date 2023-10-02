'use client'

import { type NextPage } from 'next'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

const ProfilePage: NextPage = () => {
  // nextAuth
  const { data: session } = useSession()

  return (

    <>
      <div className="flex flex-col items-center justify-center w-auto h-screen bg-primary">

        <main className='flex flex-col items-center justify-center gap-y-6 py-4'>
          <header className="flex justify-center p-3">
            <h1 className='text-2xl text-center font-bold text-white'>
              Bienvenido a tu perfil
            </h1>
          </header>

          <div className="flex items-center gap-3">
            <button type="button" className='bg-secondary text-white rounded p-2 hover:bg-highlight'><Link href={'/profile/visits'}>Mis visitas</Link></button>
            <button type="button" className='bg-secondary text-white rounded p-2 hover:bg-highlight'><Link href={'/profile/dates'}>Mis citas</Link></button>
          </div>

          <section className="flex flex-col items-center w-full text-white">
            <div className='bg-secondary flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded max-w-md'>
              {
                (session != null) &&
                <>
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                      <p className='font-bold'>Correo eléctronico:</p>
                      <p>{session.user?.email}</p>
                    </div>
                  </div>
                  <button className=' bg-highlight px-2 py-3 rounded-md hover:opacity-75' onClick={async () => { await signOut() }}>Cerrar sesión</button>
                </>
              }
            </div>
          </section>
        </main>
      </div>
    </>

  )
}

export default ProfilePage
