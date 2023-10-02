'use client'

import { type NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

const LoginPage: NextPage = () => {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false
    })

    if ((res?.error) != null) {
      setError(res.error)

      return
    }

    if ((res?.ok) ?? false) {
      router.push('/profile')
      router.refresh()
    }
  }

  return (
    <section className="flex flex-col items-center w-full mt-[150px] py-2">
      <div className='flex flex-col items-center justify-center p-4'>
        {
          (error.length > 0) && <div className='bg-red-500 text-white p-2 mb-2 rounded'>{error}</div>
        }
        <form onSubmit={handleSubmit} className=' bg-primary flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded'>

          <h1 className='text-center text-2xl font-bold mb-4'>
            Inicio de sesión
          </h1>

          <input
            type="email"
            placeholder='hello@mail.com'
            name='email'
            className='bg-secondary px-4 py-2 block mb-2 w-full rounded-sm'
          />
          <input
            type="password"
            name="password"
            placeholder='******'
            className='bg-secondary px-4 py-2 block mb-2 w-full rounded-sm'
          />
          <button className='bg-highlight px-4 py-2 rounded-md hover:opacity-75'>Iniciar sesión</button>
        </form>
      </div>
    </section>
  )
}
export default LoginPage
