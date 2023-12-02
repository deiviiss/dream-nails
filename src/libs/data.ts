import { unstable_noStore as noStore } from 'next/cache'
import { notFound } from 'next/navigation'

import { type CategoryForm } from '@/interfaces/Category'
import {
  type ExpenseForm,
  type ExpenseWithCategoryAndPlace
} from '@/interfaces/Expenses'
import { type PlaceForm } from '@/interfaces/Place'
import { prisma } from '@/libs/prisma'

const ITEMS_PER_PAGE = 6

export async function fetchFilteredExpenses(
  query: string,
  currentPage: number
): Promise<ExpenseWithCategoryAndPlace[]> {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { method: { contains: query, mode: 'insensitive' } },
          { amount: { equals: Number(query) } }
        ]
      },
      include: {
        Category: {
          select: {
            id: true,
            name: true
          }
        },
        Place: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        expense_date: 'desc'
      },
      take: ITEMS_PER_PAGE, // Establece el límite aquí
      skip: offset // Aplicas el offset para la paginación
    })
    return expenses
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch expenses.')
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

export async function fetchPlacesToForm(): Promise<PlaceForm[]> {
  noStore()
  try {
    const places = await prisma.place.findMany({
      select: {
        id: true,
        name: true
      }
    })
    return places
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch places.')
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
        place_id: true,
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
