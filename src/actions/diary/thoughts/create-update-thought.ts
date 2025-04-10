'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
import prisma from '@/lib/prisma'

const thoughtSchema = z.object({
  id: z.number().optional().nullable(),
  thought: z
    .string({
      required_error: 'El pensamiento es requerido.'
    })
    .min(3, {
      message: 'El pensamiento debe tener al menos 3 caracteres.'
    })
    .max(500, {
      message: 'El pensamiento debe tener máximo 500 caracteres.'
    }),
  emotionId: z.coerce.number({
    required_error: 'La emoción es requerida.'
  }),
  createdAt: z.date({
    required_error: 'La fecha es requerida.'
  })
})

export const createUpdateThought = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const dataToValidate = {
    ...data,
    id: data.id ? Number(data.id) : undefined,
    emotionId: data.emotionId ? Number(data.emotionId) : undefined,
    createdAt: typeof data.createdAt === 'string' ? new Date(data.createdAt) : undefined
  }

  const parsed = thoughtSchema.safeParse(dataToValidate)
  console.log('parsed', parsed)
  if (!parsed.success) {
    return {
      ok: false,
      message: 'Error al validar los datos del pensamiento'
    }
  }

  const { id, thought, emotionId } = parsed.data

  const session = await getUserSessionServer()
  const user = await prisma.user.findFirst({
    where: { email: session?.email }
  })

  if (!user) {
    return { ok: false, message: 'Credentials no valid' }
  }

  try {
    if (id) {
      // Update
      await prisma.thought.update({
        where: { id },
        data: {
          thought,
          emotionId
        }
      })

      revalidatePath('/thoughts')
      return {
        ok: true,
        message: 'Pensamiento actualizado correctamente'
      }
    }

    // Create
    await prisma.thought.create({
      data: {
        thought,
        emotionId,
        userId: user.id
      }
    })

    revalidatePath('/thoughts')
    return {
      ok: true,
      message: 'Pensamiento creado correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al guardar el pensamiento'
    }
  }
}
