'use client'

import { type NextPage } from 'next'
import { useSession, signOut } from 'next-auth/react'

const ProfilePage: NextPage = () => {
  // nextAuth
  const { data: session } = useSession()

  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-y-2'>
      <h1 className=' text-2xl font-bold'>
        Profile
      </h1>
      <div className='bg-neutral-950 flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded max-w-md'>
        {
          (session != null) &&
          <>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2'>
                <p className='font-bold'>Name:</p>
                <p>{session.user?.name}</p>
              </div>

              <div className='flex gap-2'>
                <p className='font-bold'>Email:</p>
                <p>{session.user?.email}</p>
              </div>
            </div>
            <button className=' bg-red-800 px-2 py-3 rounded-md hover:bg-red-500' onClick={async () => { await signOut() }}>Sign Out</button>
          </>
        }
      </div>
    </div>
  )
}

export default ProfilePage
