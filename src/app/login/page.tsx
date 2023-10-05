'use client'
import { type NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { FcGoogle } from 'react-icons/fc'

const LoginPage: NextPage = () => {
  const [error, setError] = useState('')
  const router = useRouter()

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
      callbackUrl: 'http://localhost:3000/profile',
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
    <>
      <div className="flex flex-col items-center justify-center pt-[150.5px] bg-primary-gradient">

        <div className="flex items-center justify-center py-5 w-full">
          <div className='flex flex-col items-center justify-center max-w-lg p-4 pb-6 border-2 bg-secondary-gradient rounded-lg'>

            {
              (error.length > 0) &&
              <div className='bg-red-500 text-white p-2 mb-2 rounded'>
                {error}
              </div>
            }

            <form onSubmit={handleSubmitCredentials} className='flex flex-col justify-center items-center p-8 pb-0 gap-y-4'>
              <h1 className='text-center text-2xl font-bold mb-4'>
                Inicio de sesión
              </h1>

              <input
                type="email"
                placeholder='tu-correo@mail.com'
                name='email'
                className='px-4 py-2 block mb-2 w-full rounded-sm'
              />
              <input
                type="password"
                name="password"
                placeholder='******'
                className='px-4 py-2 block mb-2 w-full rounded-sm'
              />
              <button className='px-4 py-2 rounded-md  bg-primary-gradient text-white hover:opacity-75'>Iniciar sesión</button>
            </form>
            <p className='my-4 font-black'>ó</p>
            <button className='flex items-center gap-x-2 p-3 bg-white rounded-lg text-black hover:opacity-75' onClick={handleSubmitGoogle}>
              <FcGoogle></FcGoogle>
              Continuar con Google</button>
          </div>
        </div>

      </div>
    </>

  )
}
export default LoginPage
