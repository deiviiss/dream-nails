'use client'
import { type NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react'
import { useRouter, redirect } from 'next/navigation'
import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react'
import { type SignUpUser } from '@/interfaces/User'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [userData, setUserData] = useState<SignUpUser>({
    email: '',
    password: ''
  })

  // ? Se muestra el login aunque haya sesión
  const { data: session } = useSession()
  useEffect(() => {
    if (session !== null) {
      redirect('/panel-admin')
    }
  }, [session, router])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }))
  }

  const handleSubmitCredentials = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
      router.push('/panel-admin')
      router.refresh()
    }
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
          <div className='bg-red-500 text-white p-2 mb-2 rounded'>
            {error}
          </div>
        }

        <form onSubmit={handleSubmitCredentials} className='flex flex-col justify-center items-center px-7 pt-8 pb-0 gap-y-4'>
          <h1 className='text-center text-2xl font-bold mb-2'>
            Inicio de sesión
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
          <button className='px-4 py-2 rounded-md transition-all duration-200 border-[1px] border-primary bg-white hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed' disabled={isDisabled}>Iniciar sesión</button>
        </form>
      </div>
    </main>
  )
}
export default LoginPage
