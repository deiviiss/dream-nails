'use server'

import prisma from '@/lib/prisma'

export async function fetchAllEmotions() {
  try {
    const emotions = await prisma.emotion.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return {
      ok: true,
      message: 'Emociones obtenidas correctamente',
      emotions
    }
  } catch (error) {
    throw new Error('No se pudieron obtener las emociones.')
  }
}
