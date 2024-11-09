'use server'

import prisma from '@/libs/prisma'
import { validatePageNumber } from '@/libs/validatePageNumber'

interface PaginationOptions {
  query?: string
  page?: number
  take?: number
}

interface IResponse {
  currentPage: number
  totalPages: number
  images: Array<{
    id: number
    url: string
  }>
}

export const getPaginationImages = async ({ page = 1, take = 12, query = '' }: PaginationOptions): Promise<IResponse> => {
  page = validatePageNumber(page)

  try {
    // get products
    const imagesDb = await prisma.image.findMany({
      take,
      skip: (page - 1) * take,
      orderBy: {
        created_at: 'desc'
      }
    })

    if (!imagesDb) {
      throw new Error('No images found')
    }

    const totalCount = await prisma.image.count({
    })
    const totalPages = Math.ceil(totalCount / take)

    const imagesProcessed = await Promise.all(imagesDb.map(async (image) => {
      return {
        id: image.id,
        url: image.url
      }
    }))

    return {
      currentPage: page,
      totalPages,
      images: imagesProcessed
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
