'use server'

import { unstable_noStore } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Unbudgeted expenses retrieved successfully',
  error: 'Error getting unbudgeted expenses'
}

interface UnbudgetedExpensesParams {
  month: number
  year?: number
}

interface UnbudgetedExpensesByCategory {
  categoryId: number
  categoryName: string
  total: number
  expenses: Array<{
    id: number
    name: string
    amount: number
    expense_date: Date
  }>
}

export const getUnbudgetedExpenses = async ({
  month,
  year
}: UnbudgetedExpensesParams) => {
  unstable_noStore()
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.error
    }
  }

  const currentYear = year || new Date().getFullYear()
  const startDate = new Date(currentYear, month - 1, 1)
  const endDate = new Date(currentYear, month, 0, 23, 59, 59)

  try {
    // First, get all expense categories that have budget categories assigned
    const budgetedCategories = await prisma.budgetCategory.findMany({
      select: {
        expense_category_id: true
      }
    })

    const budgetedCategoryIds = budgetedCategories.map(bc => bc.expense_category_id)

    // Get all expenses whose expense_category is NOT in a budget category
    // These are expenses without budget coverage
    const unbudgetedExpenses = await prisma.expense.findMany({
      where: {
        expense_date: {
          gte: startDate,
          lte: endDate
        },
        expense_category_id: {
          notIn: budgetedCategoryIds
        }
      },
      include: {
        expense_category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        expense_date: 'desc'
      }
    })

    // Group by expense category
    const groupedByCategory = unbudgetedExpenses.reduce<Record<number, UnbudgetedExpensesByCategory>>((acc, expense) => {
      const categoryId = expense.expense_category.id
      const categoryName = expense.expense_category.name

      if (!acc[categoryId]) {
        acc[categoryId] = {
          categoryId,
          categoryName,
          total: 0,
          expenses: []
        }
      }

      acc[categoryId].total += expense.amount
      acc[categoryId].expenses.push({
        id: expense.id,
        name: expense.name,
        amount: expense.amount,
        expense_date: expense.expense_date
      })

      return acc
    }, {})

    const categoriesArray = Object.values(groupedByCategory)
    const totalUnbudgeted = categoriesArray.reduce((sum, cat) => sum + cat.total, 0)

    return {
      ok: true,
      message: messages.success,
      unbudgetedExpenses: categoriesArray,
      totalUnbudgeted
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting unbudgeted expenses:', error)
    return {
      ok: false,
      message: messages.error
    }
  }
}
