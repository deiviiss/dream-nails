import { unstable_noStore as noStore } from 'next/cache'
import { notFound } from 'next/navigation'
import { type Category } from '@/interfaces/Category'
import {
  type ExpenseWithCategoryAndUserAndPlace,
  type ExpenseForm
} from '@/interfaces/Expense'
import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 10

// EXPENSES
export async function fetchFilteredExpenses(
  query: string,
  currentPage: number,
  month: number,
  year?: number
): Promise<ExpenseWithCategoryAndUserAndPlace[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const currentMonth = month || new Date().getMonth() + 1
  const currentYear = year || new Date().getFullYear()

  const startDate = new Date(Date.UTC(currentYear, currentMonth - 1, 1)) // First day of the month
  const endDate = new Date(Date.UTC(currentYear, currentMonth, 0, 23, 59, 59)) // Last day of the month

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        expense_month: { equals: Number(month) },
        expense_date: { gte: startDate, lt: endDate },
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
      take: ITEMS_PER_PAGE, // Set limit here
      skip: offset // Apply offset for pagination
    })

    return expenses
  } catch (error) {
    throw new Error('Failed to fetch filtered expenses.')
  }
}

export async function fetchAmountExpenses(
  query: string,
  month: number,
  year?: number
): Promise<number> {
  noStore()
  try {
    const currentYear = year || new Date().getFullYear()
    const currentMonth = month || new Date().getMonth() + 1

    const startDate = new Date(currentYear, currentMonth - 1, 1) // First day of the month
    const endDate = new Date(currentYear, currentMonth, 0) // Last day of the month

    const expensesAmount = await prisma.expense.aggregate({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { method: { contains: query, mode: 'insensitive' } },
              { expense_category: { name: { contains: query, mode: 'insensitive' } } }
            ]
          },
          { expense_month: { equals: Number(currentMonth) } },
          { expense_date: { gte: startDate, lt: endDate } }
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
  month: number,
  year?: number
): Promise<number> {
  noStore()
  try {
    const currentMonth = month || new Date().getMonth() + 1
    const currentYear = year || new Date().getFullYear()

    const startDate = new Date(currentYear, currentMonth - 1, 1) // First day of the month
    const endDate = new Date(currentYear, currentMonth, 0) // Last day of the month

    const creditExpensesTotal = await prisma.expense.aggregate({
      where: {
        AND: [
          { expense_month: { equals: Number(month) } },
          { expense_date: { gte: startDate, lt: endDate } },
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

export async function fetchExpensesPages(query: string, month: number, year?: number): Promise<number> {
  noStore()
  try {
    const currentMonth = month || new Date().getMonth() + 1
    const currentYear = year || new Date().getFullYear()

    const startDate = new Date(currentYear, currentMonth - 1, 1) // First day of the month
    const endDate = new Date(currentYear, currentMonth, 0) // Last day of the month

    const count = await prisma.expense.count({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { method: { contains: query, mode: 'insensitive' } },
              { expense_category: { name: { contains: query, mode: 'insensitive' } } }
            ]
          },
          { expense_month: { equals: Number(currentMonth) } },
          { expense_date: { gte: startDate, lt: endDate } }
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
        expense_category_id: true,
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
      },
      orderBy: {
        name: 'asc'
      }
    })

    return places
  } catch (error) {
    throw new Error('Failed to fetch places.')
  }
}

// CATEGORIES

export async function fetchCategoriesToForm(): Promise<Category[]> {
  noStore()
  try {
    const categoriesDb = await prisma.expenseCategory.findMany({
      select: {
        id: true,
        name: true,
        description: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    const categories = categoriesDb.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description || '',
      categoryType: 'expense' as 'expense'
    }))

    return categories
  } catch (error) {
    throw new Error('Failed to fetch categories.')
  }
}

export async function fetchTotalAmountByCategory(
  month: number,
  year?: number
) {
  try {
    const currentMonth = month || new Date().getMonth() + 1
    const currentYear = year || new Date().getFullYear()

    const startDate = new Date(currentYear, currentMonth - 1, 1) // First day of the month
    const endDate = new Date(currentYear, currentMonth, 0) // Last day of the month

    // Firts we get the sums of expenses by category
    const groupedExpenses = await prisma.expense.groupBy({
      where: {
        expense_month: { equals: Number(month) },
        expense_date: { gte: startDate, lt: endDate }
      },
      by: [
        'expense_category_id'
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
        const category = await prisma.expenseCategory.findUnique({
          where: {
            id: groupedExpense.expense_category_id
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

export async function fetchExpenseByCategory(id: number, month: number, year?: number) {
  noStore()
  try {
    const currentMonth = month || new Date().getMonth() + 1
    const currentYear = year || new Date().getFullYear()

    const startDate = new Date(currentYear, currentMonth - 1, 1) // First day of the month
    const endDate = new Date(currentYear, currentMonth, 0) // Last day of the month

    const expensesByCategory = await prisma.expense.findMany({
      where: {
        expense_category_id: id,
        expense_month: month,
        expense_date: { gte: startDate, lt: endDate }
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
    const count = await prisma.expenseCategory.count({
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
    const expenses = await prisma.expenseCategory.findMany({
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
    const categoryDB = await prisma.expenseCategory.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })

    if (categoryDB === null) {
      notFound()
    }

    const category = {
      ...categoryDB,
      categoryType: 'expense' as 'expense',
      description: categoryDB.description || ''
    }

    return category
  } catch (error) {
    throw new Error('Failed to fetch category by id.')
  }
}
