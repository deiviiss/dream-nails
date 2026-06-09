'use server'

import { WalletType } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const WalletSchema = z.object({
  id: z.number().optional().nullable(),
  name: z.string().min(1, { message: 'El nombre es requerido.' }).max(100),
  type: z.nativeEnum(WalletType, {
    invalid_type_error: 'Tipo de cartera inválido.'
  }),
  excludeFromBalance: z.boolean().default(false),
  physical: z.coerce.number().min(0).optional().nullable()
})

export async function createUpdateWallet(formData: FormData) {
  const data = Object.fromEntries(formData)

  const validatedFields = WalletSchema.safeParse({
    id: data.id ? Number(data.id) : undefined,
    name: data.name,
    type: data.type,
    excludeFromBalance: data.excludeFromBalance === 'on' || data.excludeFromBalance === 'true',
    physical: data.physical ? Number(data.physical) : 0
  })

  if (!validatedFields.success) {
    return {
      ok: false,
      message: 'Campos inválidos. No se pudo guardar la cartera.',
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const user = await getUserSessionServer()
  if (!user) {
    return { ok: false, message: 'No autorizado.' }
  }

  const dbUser = await prisma.user.findFirst({
    where: { email: user.email }
  })

  if (!dbUser) {
    return { ok: false, message: 'Usuario no encontrado.' }
  }

  const { id, name, type, excludeFromBalance, physical } = validatedFields.data

  try {
    if (id) {
      await prisma.wallet.update({
        where: { id },
        data: {
          name,
          type,
          excludeFromBalance,
          physical: physical ?? 0
        }
      })

      revalidatePath('/monedex/dashboard')
      return { ok: true, message: 'Cartera actualizada con éxito.' }
    } else {
      await prisma.wallet.create({
        data: {
          name,
          type,
          excludeFromBalance,
          physical: physical ?? 0,
          user_id: dbUser.id,
          balance: 0
        }
      })

      revalidatePath('/monedex/dashboard')
      return { ok: true, message: 'Cartera creada con éxito.' }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return { ok: false, message: 'Error en la base de datos al guardar la cartera.' }
  }
}
