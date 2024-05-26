import { unstable_noStore as noStore } from 'next/cache'
import { notFound } from 'next/navigation'
import { type CategoryForm } from '@/interfaces/Category'
import {
  type ExpenseWithCategoryAndUserAndPlace,
  type ExpenseForm
} from '@/interfaces/Expense'
import prisma from '@/libs/prisma'

const ITEMS_PER_PAGE = 20

// EXPENSES
export async function fetchFilteredExpenses(
  query: string,
  currentPage: number,
  month: number
): Promise<ExpenseWithCategoryAndUserAndPlace[]> {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        expense_month: { equals: Number(month) },
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { method: { contains: query, mode: 'insensitive' } },
              { category: { name: { contains: query, mode: 'insensitive' } } }
            ]
          }
        ]
      },
      include: {
        category: {
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
      take: ITEMS_PER_PAGE, // Establece el límite aquí
      skip: offset // Aplicas el offset para la paginación
    })

    return expenses
  } catch (error) {
    throw new Error('Failed to fetch filtered expenses.')
  }
}

export async function fetchAmountExpenses(
  query: string,
  month: number
): Promise<number> {
  noStore()
  try {
    const expensesAmount = await prisma.expense.aggregate({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { method: { contains: query, mode: 'insensitive' } },
              { category: { name: { contains: query, mode: 'insensitive' } } }
            ]
          },
          { expense_month: { equals: Number(month) } }
        ]
      },
      _sum: {
        amount: true
      }
    })
    const totalAmount = expensesAmount._sum.amount || 0

    return totalAmount
  } catch (error) {
    throw new Error('Failed to fetch expenses.')
  }
}

export async function fetchCreditExpenses(
  month: number
): Promise<number> {
  noStore()
  try {
    const creditExpensesTotal = await prisma.expense.aggregate({
      where: {

        AND: [
          { expense_month: { equals: Number(month) } },
          {
            OR: [
              { method: { contains: 'credit', mode: 'insensitive' } }
            ]
          }
        ]
      },
      _sum: {
        amount: true
      }
    })

    const totalCreditExpenses = creditExpensesTotal._sum.amount || 0

    return totalCreditExpenses
  } catch (error) {
    throw new Error('Failed to fetch total credit expenses.')
  }
}

export async function fetchExpensesPages(query: string, month: number): Promise<number> {
  noStore()
  try {
    const count = await prisma.expense.count({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { method: { contains: query, mode: 'insensitive' } },
              { category: { name: { contains: query, mode: 'insensitive' } } }
            ]
          },
          { expense_month: { equals: Number(month) } }
        ]
      }
    })

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE)

    return totalPages
  } catch (error) {
    throw new Error('Failed to fetch total number of expenses.')
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
        method: true,
        with_relation: true,
        is_reconciled: true
      }
    })

    if (expense === null) {
      notFound()
    }

    return expense
  } catch (error) {
    throw new Error('Failed to fetch expense.')
  }
}

// PLACES
export async function fetchPlaces(): Promise<Array<{
  id: number
  name: string
}>> {
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
    throw new Error('Failed to fetch places.')
  }
}

// CATEGORIES

export async function fetchCategoriesToForm(): Promise<CategoryForm[]> {
  noStore()
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return categories
  } catch (error) {
    throw new Error('Failed to fetch categories.')
  }
}

export async function fetchTotalAmountByCategory(
  month: number
) {
  noStore()

  try {
    // Firts we get the sums of expenses by category
    const groupedExpenses = await prisma.expense.groupBy({
      where: {
        expense_month: { equals: Number(month) }
      },
      by: [
        'category_id'
      ],
      _sum: {
        amount: true
      },
      _count: true,
      orderBy: [{
        _sum: {
          amount: 'desc'
        }
      }]
    }
    )

    // Then, we obtain the categories for those sums
    const groupedExpensesWithCategoryName = await Promise.all(
      groupedExpenses.map(async (groupedExpense) => {
        const category = await prisma.category.findUnique({
          where: {
            id: groupedExpense.category_id
          },
          select: {
            name: true
          }
        })

        return {
          ...groupedExpense,
          category
        }
      })
    )

    // Finally we return the result
    return groupedExpensesWithCategoryName
  } catch (error) {
    throw new Error('Failed to fetch total amount by category.')
  }
}

export async function fetchExpenseByCategory(id: number, month: number) {
  noStore()
  try {
    const expensesByCategory = await prisma.expense.findMany({
      where: {
        category_id: id,
        expense_month: month
      },
      select: {
        id: true,
        name: true,
        amount: true,
        expense_date: true,
        method: true
      },
      orderBy: [
        { expense_date: 'desc' },
        { created_at: 'desc' }
      ]
    })

    if (expensesByCategory === null) {
      notFound()
    }
    return expensesByCategory
  } catch (error) {
    throw new Error('Failed to fetch expensesByCategory.')
  }
}

export async function fetchCategoriesPages(query: string): Promise<number> {
  noStore()
  try {
    const count = await prisma.category.count({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } }
        ]
      }
    })

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE)

    return totalPages
  } catch (error) {
    throw new Error('Failed to fetch total number of categories.')
  }
}

export async function fetchFilteredCategories(
  query: string,
  currentPage: number
) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const expenses = await prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } }
        ]
      },
      orderBy: [
        { name: 'asc' },
        { created_at: 'desc' }
      ],
      take: ITEMS_PER_PAGE, // Establece el límite aquí
      skip: offset // Aplicas el offset para la paginación
    })

    return expenses
  } catch (error) {
    throw new Error('Failed to fetch filtered expenses.')
  }
}

export async function fetchCategoryById(id: number) {
  noStore()
  try {
    const category = await prisma.category.findFirst({
      where: {
        id
      }
    })

    if (category === null) {
      notFound()
    }

    return category
  } catch (error) {
    throw new Error('Failed to fetch category by id.')
  }
}
