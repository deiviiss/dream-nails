'use server'

import { signIn } from '@/auth'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    })

    return 'SuccessSignin'
  } catch (error) {
    return 'CredentialsInvalid'
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false })

    return { ok: true, message: 'Inicio de sesión exitoso' }
  } catch (error) {
    return { ok: false, message: 'No se pudo iniciar sesión' }
  }
}
