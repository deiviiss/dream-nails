import { unstable_noStore } from 'next/cache'
import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 10

export async function getTotalPlacesPages(query: string): Promise<number> {
  unstable_noStore()
  try {
    const count = await prisma.place.count({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } }
            ]
          }
        ]
      }
    })

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE)

    return totalPages
  } catch (error) {
    throw new Error('Failed to fetch total number of places.')
  }
}
