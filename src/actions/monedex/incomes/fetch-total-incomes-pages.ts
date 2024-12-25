import { unstable_noStore } from 'next/cache'
import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 10

export async function fetchTotalIcomesPages(query: string, month: number, year?: number): Promise<number> {
  unstable_noStore()
  try {
    const currentMonth = month || new Date().getMonth() + 1
    const currentYear = year || new Date().getFullYear()

    const startDate = new Date(currentYear, currentMonth - 1, 1) // First day of the month
    const endDate = new Date(currentYear, currentMonth, 0) // Last day of the month

    const count = await prisma.income.count({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { method: { contains: query, mode: 'insensitive' } },
              { income_category: { name: { contains: query, mode: 'insensitive' } } }
            ]
          },
          { income_month: { equals: Number(currentMonth) } },
          { income_date: { gte: startDate, lt: endDate } }
        ]
      }
    })

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE)

    return totalPages
  } catch (error) {
    throw new Error('Failed to fetch total number of incomes.')
  }
}
