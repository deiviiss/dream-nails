'use client'
import { AxiosError } from 'axios'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react'
import { useUsers } from '@/context/UsersContext'
import { type CreateUser } from '@/interfaces/User'

export const FormCreateUser = (): JSX.Element => {
  const [error, setError] = useState('')
  const router = useRouter()
  const { createUser } = useUsers()
  const [userData, setUserData] = useState<CreateUser>({
    email: '',
    password: '',
    role: 'customer'
  })

  // ? Se muestra el register aunque haya sesión
  const { data: session } = useSession()
  useEffect(() => {
    if (session !== null) {
      redirect('/profile')
    }
  }, [session, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      await createUser(userData)

      const res = await signIn('credentials', {
        email: userData.email,
        password: userData.password,
        redirect: false
      })

      if ((res?.ok) ?? false) {
        router.push('/profile')
        router.refresh()
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }))
  }

  const isDisabled = (
    userData.email === '' ||
    userData.password === ''
  )

  return (
    <main className='pb-10 pt-[150.5px] flex items-center justify-center w-full text-black
      '>
      <div className='flex flex-col items-center justify-center max-w-lg px-4 mt-7 pb-6 border-2 border-secondary bg-white rounded-lg'>
        {
          (error.length > 0) &&
          <div className='bg-red-500 text-white p-2 mb-2 rounded'>{error}
          </div>
        }

        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center px-7 pt-8 pb-0 gap-y-4'>

          <h1 className=' text-2xl font-bold mb-4'>
            Registrate
          </h1>
          <input
            type="email"
            placeholder='tu-correo@mail.com'
            name='email'
            value={userData.email}
            onChange={handleChange}
            className='px-4 py-2 block mb-2 w-full rounded-sm outline-none focus:ring-2 focus:ring-secondary'
          />
          <input
            type="password"
            name="password"
            placeholder='******'
            value={userData.password}
            onChange={handleChange}
            className='px-4 py-2 block mb-2 w-full rounded-sm outline-none focus:ring-2 focus:ring-secondary'
          />

          <button type='submit' className='flex items-center gap-x-2 p-3 bg-white rounded-lg border-[1px] border-primary text-black hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed' disabled={isDisabled}
          >
            Crear cuenta
          </button>
          <p className='pt-5 p-0 text-sm'>Ya tienes cuenta <Link href={'/login'} className='hover:underline'>¡inicia sesión!</Link></p>

        </form >
      </div>
    </main >
  )
}
