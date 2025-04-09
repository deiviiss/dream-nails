'use server'

import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 10

export async function getFilteredPlaces(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  try {
    const places = await prisma.place.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } }
            ]
          }
        ]
      },
      orderBy: [
        { name: 'asc' }
      ],
      take: ITEMS_PER_PAGE, // Set limit here
      skip: offset // Apply offset for pagination
    })

    return places
  } catch (error) {
    throw new Error('Failed to fetch filtered expenses.')
  }
}
