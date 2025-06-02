'use server'

import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
import prisma from '@/lib/prisma'

export async function fetchFilteredThoughtsByMonth({
  currentPage = 1,
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear()
}: {
  currentPage?: number
  month?: number
  year?: number
}) {
  const { from, to } = getDateRangeByMonth(month, year)
  const user = await getUserSessionServer()

  if (!user) {
    throw new Error('No hay sesión activa.')
  }

  const userId = user.id

  if (!userId) {
    throw new Error('No se pudo obtener el ID del usuario.')
  }

  try {
    const thoughts = await prisma.thought.findMany({
      where: {
        userId: Number(userId),
        createdAt: {
          gte: from,
          lte: to
        }
      },
      include: {
        emotion: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!thoughts) {
      return []
    }

    return thoughts
  } catch (error) {
    throw new Error('No se pudieron obtener los pensamientos filtrados.')
  }
}

function getDateRangeByMonth(month: number, year: number) {
  const from = new Date(year, month - 1, 1, 0, 0, 0)
  const to = new Date(year, month, 0, 23, 59, 59)
  return { from, to }
}
