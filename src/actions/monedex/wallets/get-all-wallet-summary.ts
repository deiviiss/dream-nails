'use server'

import { unstable_noStore } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

/** Rounds a number to 2 decimal places to avoid floating-point precision issues */
const round2 = (n: number): number => Math.round(n * 100) / 100

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
      orderBy: {
        type: 'asc'
      },
      select: {
        id: true,
        name: true,
        balance: true,
        physical: true,
        type: true,
        excludeFromBalance: true,
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
        },
        incomingTransfers: {
          where: {
            transfer_date: {
              gte: startDate
            }
          },
          select: {
            amount: true
          }
        },
        outgoingTransfers: {
          where: {
            transfer_date: {
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
    let totalPhysicalGlobal = 0
    let totalBalanceGlobal = 0

    const walletsSummary = walletSummaryDb.map(wallet => {
      // calculate total income and expenses
      const totalIncome = round2(wallet.incomes.reduce((total, income) => total + income.amount, 0))
      const totalExpenses = round2(wallet.expenses.reduce((total, expense) => total + expense.amount, 0))
      const totalIncomingTransfers = round2(wallet.incomingTransfers.reduce((total, t) => total + t.amount, 0))
      const totalOutgoingTransfers = round2(wallet.outgoingTransfers.reduce((total, t) => total + t.amount, 0))

      // Calculate change in balance
      const balance = round2(totalIncome - totalExpenses + totalIncomingTransfers - totalOutgoingTransfers)
      const physical = wallet.physical ?? 0

      if (!wallet.excludeFromBalance) {
        totalIncomeGlobal += totalIncome
        totalExpensesGlobal += totalExpenses
        totalBalanceGlobal += balance
        totalPhysicalGlobal += physical
      }

      const changeValue = totalExpenses > 0 ? ((totalIncome - totalExpenses) / totalExpenses) * 100 : 0
      const changeLabel = 'Balance financiero'
      const difference = round2((wallet.physical ?? 0) - balance)

      const differencePercentage = round2(balance !== 0 ? (difference / balance) * 100 : 0)

      return {
        id: wallet.id,
        name: wallet.name,
        balance,
        differencePercentage,
        physical,
        difference,
        type: wallet.type,
        excludeFromBalance: wallet.excludeFromBalance,
        change: {
          value: changeValue,
          label: changeLabel
        }
      }
    })

    const globalDifference = round2(totalPhysicalGlobal - totalBalanceGlobal)
    const globalDifferencePercentage =
      round2(totalBalanceGlobal !== 0 ? (globalDifference / totalBalanceGlobal) * 100 : 0)
    const globalChangeValue = round2(totalExpensesGlobal > 0
      ? ((totalIncomeGlobal - totalExpensesGlobal) / totalExpensesGlobal) * 100
      : 0)
    const globalChangeLabel = 'Balance total'
    const globalSummary = {
      totalIncome: totalIncomeGlobal,
      totalExpenses: totalExpensesGlobal,
      totalBalance: totalBalanceGlobal,
      difference: globalDifference,
      differencePercentage: globalDifferencePercentage,
      physical: totalPhysicalGlobal,
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
