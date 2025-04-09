'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { login } from '@/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  email: z.string({
    required_error: 'El correo electrónico es requerido',
    message: 'Correo electrónico no válido'
  }).email({
    message: 'Correo electrónico no válido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida',
    message: 'Contraseña no válida'
  }).min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
})

const LoginPage: NextPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const searchParams = useSearchParams()
  // const [state, dispatch] = useFormState(authenticate, undefined)
  const redirectTo = searchParams.get('redirectTo') || '/monedex'

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const defaultValuesForm = {
    email: '',
    password: ''
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: defaultValuesForm,
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true)

    const { email, password } = values

    const { ok, message } = await login(email, password)

    if (!ok) {
      setError(message)
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    window.location.replace(redirectTo)
    // router.push(redirectTo)
  }

  return (
    <main
      className='pb-10 pt-[150.5px] flex items-center justify-center w-full text-black
      '
    >

      <Card
        className='flex flex-col items-center justify-center max-w-lg px-4 mt-7 pb-6 border-2 border-secondary bg-white rounded-lg'

      >
        {error.length > 0 && (
          <div className='bg-red-500 text-white p-2 mb-2 rounded'>{error}</div>
        )}

        <Form {...form}>
          <form
            className='flex flex-col justify-center items-center px-7 pt-8 pb-0 gap-y-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >

            <CardHeader className='text-center text-2xl font-bold mb-2'>
              Inicio de sesión
            </CardHeader>

            <CardContent

              className='text-center text-sm text-gray-500 mb-4'
            >

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder='email' {...field} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Contraseña' {...field} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full'
                >
                  {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                </Button>

              </CardFooter>

              {/* <input
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
                disabled={isSubmitting}
                className='px-4 py-2 rounded-md transition-all duration-200 border-[1px] border-primary bg-white hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Iniciar sesión
              </button> */}
            </CardContent>
          </form>
        </Form>

      </Card>
    </main>
  )
}

export default LoginPage
