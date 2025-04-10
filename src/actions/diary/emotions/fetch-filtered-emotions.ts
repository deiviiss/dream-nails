'use server'

import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 10

export async function fetchFilteredEmotions(
  currentPage: number = 1
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const emotions = await prisma.emotion.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      skip: offset,
      take: ITEMS_PER_PAGE
    })

    return {
      ok: true,
      message: 'Emociones filtradas correctamente',
      emotions
    }
  } catch (error) {
    throw new Error('No se pudieron obtener las emociones filtradas.')
  }
}
