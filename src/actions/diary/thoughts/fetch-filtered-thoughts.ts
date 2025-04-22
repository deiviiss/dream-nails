'use server'

import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 100

export async function fetchFilteredThoughts(
  query: string = '',
  currentPage: number = 1
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const thoughts = await prisma.thought.findMany({
      where: {
        thought: {
          contains: query,
          mode: 'insensitive'
        }
      },
      include: {
        emotion: {
          select: {
            id: true,
            name: true
          }
        },
        user: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: offset,
      take: ITEMS_PER_PAGE
    })

    return thoughts
  } catch (error) {
    throw new Error('No se pudieron obtener los pensamientos filtrados.')
  }
}
