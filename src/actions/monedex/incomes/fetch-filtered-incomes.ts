'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 20

export async function fetchFilteredIncomes(
  query: string,
  currentPage: number,
  month: number,
  year?: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const currentMonth = month || new Date().getMonth() + 1
  const currentYear = year || new Date().getFullYear()

  const startDate = new Date(currentYear, currentMonth - 1, 1) // First day of the month
  const endDate = new Date(currentYear, currentMonth, 0) // Last day of the month

  try {
    const incomes = await prisma.income.findMany({
      where: {
        income_month: { equals: Number(month) },
        income_date: { gte: startDate, lt: endDate },
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { method: { contains: query, mode: 'insensitive' } },
              { income_category: { name: { contains: query, mode: 'insensitive' } } }
            ]
          }
        ]
      },
      include: {
        income_category: {
          select: {
            id: true,
            name: true
          }
        },
        user: {
          select: {
            email: true,
            name: true
          }
        }
      },
      orderBy: [
        { income_date: 'desc' },
        { created_at: 'desc' }
      ],
      take: ITEMS_PER_PAGE, // Set limit here
      skip: offset // Apply offset for pagination
    })

    revalidatePath('/monedex/incomes')
    return incomes
  } catch (error) {
    throw new Error('Failed to fetch filtered expenses.')
  }
}
