import { unstable_noStore as noStore } from 'next/cache'
import { notFound } from 'next/navigation'

import { type CategoryForm } from '@/interfaces/Category'
import {
  type ExpenseForm,
  type ExpenseWithCategory
} from '@/interfaces/Expenses'
import { prisma } from '@/libs/prisma'

const ITEMS_PER_PAGE = 6

export async function fetchFilteredExpenses(
  query: string,
  currentPage: number
): Promise<ExpenseWithCategory[]> {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { method: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        Category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: [
        { expense_date: 'desc' },
        { created_at: 'desc' }
      ],
      take: ITEMS_PER_PAGE, // Establece el límite aquí
      skip: offset // Aplicas el offset para la paginación
    })

    return expenses
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch expenses.')
  }
}

export async function fetchAmountExpenses(
  query: string
): Promise<number> {
  noStore()

  try {
    const expensesAmount = await prisma.expense.aggregate({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { method: { contains: query, mode: 'insensitive' } }
        ]
      },
      _sum: {
        amount: true
      }
    })
    const totalAmount = expensesAmount._sum.amount || 0

    return totalAmount
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch expenses.')
  }
}

export async function fetchCreditExpenses(
  query: string
): Promise<number> {
  noStore()

  try {
    const creditExpensesTotal = await prisma.expense.aggregate({
      where: {
        method: { contains: 'credit', mode: 'insensitive' }
      },
      _sum: {
        amount: true
      }
    })

    const totalCreditExpenses = creditExpensesTotal._sum.amount || 0

    return totalCreditExpenses
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total credit expenses.')
  }
}

export async function fetchExpensesPages(query: string): Promise<number> {
  noStore()
  try {
    const count = await prisma.expense.count({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } }
        ]
      }
    })

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE)

    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of expenses.')
  }
}

export async function fetchCategoriesToForm(): Promise<CategoryForm[]> {
  noStore()
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true
      }
    })

    return categories
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch categories.')
  }
}

export async function fetchExpenseById(id: number): Promise<ExpenseForm> {
  noStore()
  try {
    const expense = await prisma.expense.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        amount: true,
        expense_date: true,
        category_id: true,
        method: true
      }
    })

    if (expense === null) {
      notFound()
    }

    return expense
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch expense.')
  }
}
