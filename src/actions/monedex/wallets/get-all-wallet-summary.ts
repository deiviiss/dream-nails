'use server'

import { unstable_noStore } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Wallet summary get successfully',
  error: 'Error getting wallet summary'
}

interface WalletSummaryParams {
  month: number
  year?: number
}

export const getAllWalletsSummary = async ({
  month,
  year
}: WalletSummaryParams) => {
  unstable_noStore()
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.error
    }
  }

  // const currentMonth = month || new Date().getMonth() + 1
  // const currentYear = year || new Date().getFullYear()

  // const startDate = new Date(currentYear, currentMonth - 1, 1)
  // const endDate = new Date(currentYear, currentMonth, 0)
  const startDate = new Date('2024-12-01')

  try {
    const walletSummaryDb = await prisma.wallet.findMany({
      select: {
        id: true,
        name: true,
        balance: true,
        type: true,
        incomes: {
          where: {
            income_date: {
              gte: startDate
            }
          },
          select: {
            amount: true
          }
        },
        expenses: {
          where: {
            expense_date: {
              gte: startDate
            }
          },
          select: {
            amount: true
          }
        }
      }
    })

    if (walletSummaryDb.length === 0) {
      return {
        ok: false,
        message: messages.error
      }
    }

    let totalIncomeGlobal = 0
    let totalExpensesGlobal = 0

    const walletsSummary = walletSummaryDb.map(wallet => {
      // calculate total income and expenses
      const totalIncome = wallet.incomes.reduce((total, income) => total + income.amount, 0)
      const totalExpenses = wallet.expenses.reduce((total, expense) => total + expense.amount, 0)

      totalIncomeGlobal += totalIncome
      totalExpensesGlobal += totalExpenses

      // Calculate change in balance
      const balance = totalIncome - totalExpenses
      const changeValue = totalExpenses > 0 ? ((totalIncome - totalExpenses) / totalExpenses) * 100 : 0
      const changeLabel = 'Balance financiero'

      return {
        id: wallet.id,
        name: wallet.name,
        balance,
        totalIncome,
        totalExpenses,
        type: wallet.type,
        change: {
          value: changeValue,
          label: changeLabel
        }
      }
    })

    const globalChangeValue = totalExpensesGlobal > 0
      ? ((totalIncomeGlobal - totalExpensesGlobal) / totalExpensesGlobal) * 100
      : 0
    const globalChangeLabel = 'Balance total'
    const globalSummary = {
      totalIncome: totalIncomeGlobal,
      totalExpenses: totalExpensesGlobal,
      totalBalance: totalIncomeGlobal - totalExpensesGlobal,
      change: {
        value: globalChangeValue,
        label: globalChangeLabel
      }
    }

    return {
      ok: true,
      message: messages.success,
      walletsSummary,
      globalSummary
    }
  } catch (error) {
    return {
      ok: false,
      message: messages.error
    }
  }
}
