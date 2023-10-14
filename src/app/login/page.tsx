'use client'
import { type NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, redirect } from 'next/navigation'
import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
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
      redirect('/profile')
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
      router.push('/profile')
      router.refresh()
    }
  }

  const handleSubmitGoogle = async (): Promise<void> => {
    const res = await signIn('google', {
      callbackUrl: '/profile',
      redirect: false
    })

    // ? res llega como undefined ¿Por qué?

    if ((res?.error) != null) {
      setError(res.error)
      return
    }

    if ((res?.ok) ?? false) {
      router.push('/profile')
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
        <p className='my-4 font-black'>ó</p>
        <button className='flex items-center gap-x-2 p-3 bg-white rounded-lg border-[1px] border-primary text-black hover:opacity-75' onClick={handleSubmitGoogle}>
          <FcGoogle></FcGoogle>
          Continuar con Google</button>
        <p className='pt-5 p-0 text-sm'>No tienes cuenta <Link href={'/register'} className='hover:underline'>¡crea una!</Link></p>
      </div>
    </main>
  )
}
export default LoginPage
