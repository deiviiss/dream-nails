'use server'

import prisma from '@/lib/prisma'

export async function getIncomeByCategory(month: number, year: number) {
  try {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)

    const incomeByCategory = await prisma.income.groupBy({
      by: ['income_category_id'],
      where: {
        income_month: month,
        income_date: {
          gte: startDate,
          lt: endDate
        }
      },
      _sum: {
        amount: true
      },
      orderBy: {
        _sum: {
          amount: 'desc'
        }
      }
    })

    // Get category names
    const categoryIds = incomeByCategory.map(item => item.income_category_id)
    const categories = await prisma.incomeCategory.findMany({
      where: {
        id: {
          in: categoryIds
        }
      }
    })

    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]))

    const result = incomeByCategory.map(item => ({
      categoryId: item.income_category_id,
      categoryName: categoryMap.get(item.income_category_id) || 'Unknown',
      total: item._sum.amount || 0
    }))

    const totalIncome = result.reduce((sum, item) => sum + item.total, 0)

    return {
      incomeByCategory: result,
      totalIncome
    }
  } catch (error) {
    throw new Error('Failed to fetch income by category.')
  }
}
