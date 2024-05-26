'use server'

import { signIn } from '@/auth.config'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log('formData:', { ...Object.fromEntries(formData) })
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    })

    return 'SuccessSignin'
  } catch (error) {
    console.error('error:', JSON.stringify(error, null, 2))
    return 'CredentialsInvalid'
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false })

    return { ok: true }
  } catch (error) {
    return { ok: false, message: 'No se pudo iniciar sesión' }
  }
}
