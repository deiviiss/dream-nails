'use server'

import { type Place } from '@/interfaces/Place'
import prisma from '@/lib/prisma'

interface Response {
  ok: boolean
  message: string
  place: Place | null
}

const messages = {
  placeCreateSuccess: 'Place created successfully',
  placeUpdateSuccess: 'Place updated successfully',
  placeError: 'Error creating/updating place'
}

export const getPlaceById = async (id: number): Promise<Response> => {
  try {
    const placeDB = await prisma.place.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        description: true
      }
    })

    if (!placeDB) {
      return {
        ok: false,
        message: messages.placeError,
        place: null
      }
    }

    const place: Place = {
      ...placeDB,
      description: placeDB.description || ''
    }

    return {
      ok: true,
      message: 'Ingreso encontrado',
      place
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
