'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const placeSchema = z.object({
  id: z.number().optional().nullable(),
  name: z
    .string({
      required_error: 'El nombre es requerido.',
      message: 'El nombre es requerido.'
    })
    .min(3, {
      message: 'El nombre debe tener al menos 3 caracteres.'
    })
    .max(100, {
      message: 'El nombre debe tener máximo 100 caracteres.'
    }),
  description: z
    .string({
      required_error: 'La descripción es requerida.',
      message: 'La descripción es requerida.'
    })
    .min(3, {
      message: 'La descripción debe tener al menos 3 caracteres.'
    })
    .max(50, {
      message: 'La descripción debe tener máximo 50 caracteres.'
    })
})

const messages = {
  placeCreateSuccess: 'Place created successfully',
  placeUpdateSuccess: 'Place updated successfully',
  placeError: 'Error creating/updating place'
}

export const createUpdatePlace = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const dataToValidate = {
    ...data,
    id: data.id ? Number(data.id) : undefined
  }

  const placeParsed = placeSchema.safeParse(dataToValidate)

  if (!placeParsed.success) {
    return {
      ok: false,
      message: messages.placeError
    }
  }

  const { description, name, id } = placeParsed.data

  try {
    // Update place
    if (id) {
      const place = await prisma.place.update({
        where: {
          id
        },
        data: {
          name,
          description
        }
      })

      revalidatePath(`/monedex/places/${id}`)

      return {
        ok: true,
        message: messages.placeUpdateSuccess,
        place
      }
    }

    // Create place
    const place = await prisma.place.create({
      data: {
        name,
        description
      }
    })

    revalidatePath('/monedex/places/')

    return {
      ok: true,
      message: messages.placeCreateSuccess,
      place
    }
  } catch (error) {
    return {
      ok: false,
      message: messages.placeError
    }
  }
}
