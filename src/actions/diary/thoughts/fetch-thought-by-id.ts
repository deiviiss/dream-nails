'use server'

import prisma from '@/lib/prisma'

export const fetchThoughtById = async (id: number) => {
  try {
    const thoughtDB = await prisma.thought.findUnique({
      where: { id },
      include: {
        emotion: {
          select: {
            id: true,
            name: true
          }
        },
        user: true
      }
    })

    if (!thoughtDB) {
      return {
        ok: false,
        message: 'No se encontró el pensamiento',
        thought: null
      }
    }

    const thought = {
      id: thoughtDB.id,
      thought: thoughtDB.thought,
      createdAt: thoughtDB.createdAt,
      emotionId: thoughtDB.emotionId,
      emotion: thoughtDB.emotion,
      userId: thoughtDB.userId,
      user: thoughtDB.user
    }

    return {
      ok: true,
      message: 'Pensamiento encontrado',
      thought
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}
