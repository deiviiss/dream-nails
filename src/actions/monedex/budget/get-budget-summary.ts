'use server'

import { unstable_noStore } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Budget summary retrieved successfully',
  error: 'Error getting budget summary'
}

interface BudgetSummaryParams {
  month: number
  year?: number
}

export const getBudgetSummary = async ({
  month,
  year
}: BudgetSummaryParams) => {
  unstable_noStore()
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.error
    }
  }

  const startDateBalance = new Date('2024-12-01')
  const currentYear = year || new Date().getFullYear()

  try {
    // Get all budget categories for the user
    const budgetCategories = await prisma.budgetCategory.findMany({
      where: {
        // Note: We need to add user_id to BudgetCategory model for multi-user support
        // For now, we'll get all categories
      },
      select: {
        id: true,
        name: true,
        amount: true
      }
    })

    if (budgetCategories.length === 0) {
      return {
        ok: true,
        message: messages.success,
        budgetCategories: [],
        globalSummary: {
          totalBudget: 0,
          totalPaid: 0,
          totalPending: 0,
          balanceTotal: 0
        }
      }
    }

    // Get expenses for the specified month to calculate paid amounts
    const startDateExpensesBadge = new Date(currentYear, month - 1, 1)
    const endDateExpensesBadge = new Date(currentYear, month, 0, 23, 59, 59)

    // Get expenses of the month (for know how much was paid)
    const expenses = await prisma.expense.findMany({
      where: {
        expense_date: {
          gte: startDateExpensesBadge,
          lte: endDateExpensesBadge
        }
      },
      select: {
        amount: true,
        expense_category_id: true
      }
    })

    const walletSummaryDb = await prisma.wallet.findMany({
      select: {
        id: true,
        name: true,
        balance: true,
        physical: true,
        type: true,
        incomes: {
          where: {
            income_date: {
              gte: startDateBalance
            }
          },
          select: {
            amount: true
          }
        },
        expenses: {
          where: {
            expense_date: {
              gte: startDateBalance
            }
          },
          select: {
            amount: true
          }
        }
      }
    })

    // Calculate total
    let totalIncomeGlobal = 0
    let totalExpensesGlobal = 0

    walletSummaryDb.forEach(wallet => {
      const totalIncome = wallet.incomes.reduce((sum, i) => sum + i.amount, 0)
      const totalExpenses = wallet.expenses.reduce((sum, e) => sum + e.amount, 0)
      totalIncomeGlobal += totalIncome
      totalExpensesGlobal += totalExpenses
    })

    const balanceTotal = totalIncomeGlobal - totalExpensesGlobal

    // Calculate budget vs actual for each category
    const budgetCategoriesWithCalculations = budgetCategories.map(category => {
      // Filter expenses for that category
      const paidAmount = expenses
        .filter(e => e.expense_category_id === category.id)
        .reduce((sum, e) => sum + e.amount, 0)

      const difference = category.amount - paidAmount
      const differencePercentage = category.amount > 0 ? (difference / category.amount) * 100 : 0

      return {
        id: category.id,
        name: category.name,
        budgetAmount: category.amount,
        paidAmount,
        difference,
        differencePercentage
      }
    })

    // Calculate global summary
    const totalBudget = budgetCategories.reduce((total, category) => total + category.amount, 0)
    const totalPaid = budgetCategoriesWithCalculations.reduce((total, category) => total + category.paidAmount, 0)
    const totalPending = totalBudget - totalPaid

    const globalSummary = {
      totalBudget,
      totalPaid,
      totalPending,
      balanceTotal
    }

    return {
      ok: true,
      message: messages.success,
      budgetCategories: budgetCategoriesWithCalculations,
      globalSummary
    }
  } catch (error) {
    console.error('Error getting budget summary:', error)
    return {
      ok: false,
      message: messages.error
    }
  }
}
