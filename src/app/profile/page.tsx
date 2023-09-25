'use client'

import { type NextPage } from 'next'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

const ProfilePage: NextPage = () => {
  // nextAuth
  const { data: session } = useSession()

  return (
    <main className='flex flex-col items-center justify-center gap-y-6 py-4'>
      <header className="flex justify-center p-3">
        <h1 className='text-2xl text-center font-bold'>
          Esta es la pagina que contendra la información del cliente.
        </h1>
      </header>

      <div className="flex items-center gap-3">
        <button type="button" className='bg-secondary rounded p-2 hover:bg-highlight'><Link href={'/profile/visits'}>Mis visitas</Link></button>
        <button type="button" className='bg-secondary rounded p-2 hover:bg-highlight'><Link href={'/profile/dates'}>Mis citas</Link></button>
      </div>

      <section className="flex flex-col items-center w-full">
        <div className='bg-primary flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded max-w-md'>
          {
            (session != null) &&
            <>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <p className='font-bold'>Nombre:</p>
                  <p>{session.user?.name}</p>
                </div>

                <div className='flex gap-2'>
                  <p className='font-bold'>Correo eléctronico:</p>
                  <p>{session.user?.email}</p>
                </div>
              </div>
              <button className=' bg-red-800 px-2 py-3 rounded-md hover:bg-red-500' onClick={async () => { await signOut() }}>Cerrar sesión</button>
            </>
          }
        </div>
      </section>
    </main>
  )
}

export default ProfilePage
