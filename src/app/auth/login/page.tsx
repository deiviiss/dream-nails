'use client'
import { type NextPage } from 'next'
import { useSearchParams } from 'next/navigation'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import { authenticate } from '@/actions'

const LoginPage: NextPage = () => {
  const searchParams = useSearchParams()
  const [state, dispatch] = useFormState(authenticate, undefined)
  const redirectTo = searchParams.get('redirectTo') || '/monedex'

  useEffect(() => {
    if (state === 'SuccessSignin') {
      window.location.replace(redirectTo)
    }
  }, [state])

  return (
    <main
      className='pb-10 pt-[150.5px] flex items-center justify-center w-full text-black
      '
    >
      <div className='flex flex-col items-center justify-center max-w-lg px-4 mt-7 pb-6 border-2 border-secondary bg-white rounded-lg'>
        {/* {error.length > 0 && (
          <div className='bg-red-500 text-white p-2 mb-2 rounded'>{error}</div>
        )} */}

        <form
          action={dispatch}
          className='flex flex-col justify-center items-center px-7 pt-8 pb-0 gap-y-4'
        >
          <h1 className='text-center text-2xl font-bold mb-2'>
            Inicio de sesión
          </h1>

          <input
            type='email'
            placeholder='tu-correo@mail.com'
            name='email'
            className='px-4 py-2 block mb-2 w-full rounded-sm outline-none focus:ring-2 focus:ring-secondary'
          />
          <input
            type='password'
            name='password'
            placeholder='******'
            className='px-4 py-2 block mb-2 w-full rounded-sm outline-none focus:ring-2 focus:ring-secondary'
          />
          <button
            type='submit'
            className='px-4 py-2 rounded-md transition-all duration-200 border-[1px] border-primary bg-white hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </main>
  )
}
export default LoginPage
