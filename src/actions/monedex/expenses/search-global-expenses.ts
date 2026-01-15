'use server'

import { unstable_noStore } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import { type ExpenseWithCategoryAndUserAndPlace } from '@/interfaces/Expense'
import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 10

const messages = {
  success: 'Global expenses search completed successfully',
  error: 'Error searching global expenses'
}

interface SearchGlobalExpensesParams {
  query: string
  currentPage: number
}

interface SearchGlobalExpensesResult {
  expenses: ExpenseWithCategoryAndUserAndPlace[]
  totalAmount: number
  totalCount: number
  totalPages: number
}

export const searchGlobalExpenses = async ({
  query,
  currentPage
}: SearchGlobalExpensesParams): Promise<{ ok: boolean, message: string, data?: SearchGlobalExpensesResult }> => {
  unstable_noStore()
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.error
    }
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    // Get filtered expenses
    const expenses = await prisma.expense.findMany({
      where: {
        // user_id: userId, // Ensure only user's expenses
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { method: { contains: query, mode: 'insensitive' } },
              { expense_category: { name: { contains: query, mode: 'insensitive' } } }
            ]
          }
        ]
      },
      include: {
        expense_category: {
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
        },
        place: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        { expense_date: 'desc' },
        { created_at: 'desc' }
      ],
      take: ITEMS_PER_PAGE,
      skip: offset
    })

    // Get total count for pagination
    const totalCount = await prisma.expense.count({
      where: {
        // user_id: userId,
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { method: { contains: query, mode: 'insensitive' } },
              { expense_category: { name: { contains: query, mode: 'insensitive' } } }
            ]
          }
        ]
      }
    })

    // Get total amount
    const totalAmountResult = await prisma.expense.aggregate({
      where: {
        // user_id: userId,
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { method: { contains: query, mode: 'insensitive' } },
              { expense_category: { name: { contains: query, mode: 'insensitive' } } }
            ]
          }
        ]
      },
      _sum: {
        amount: true
      }
    })

    const totalAmount = totalAmountResult._sum?.amount ?? 0
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return {
      ok: true,
      message: messages.success,
      data: {
        expenses,
        totalAmount,
        totalCount,
        totalPages
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error searching global expenses:', error)
    return {
      ok: false,
      message: messages.error
    }
  }
}
