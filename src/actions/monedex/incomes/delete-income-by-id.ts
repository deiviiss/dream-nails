'use server'

import { revalidatePath } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Income deleted successfully',
  error: 'Error deleting income'
}

export const deleteIncomeById = async (id: number) => {
  try {
    const user = await getUserSessionServer()

    if (!user) {
      return {
        ok: false,
        message: messages.error
      }
    }

    // update wallet balance
    const income = await prisma.income.findFirst({
      where: {
        id
      },
      select: {
        wallet_id: true,
        amount: true
      }
    })

    if (!income) {
      return {
        ok: false,
        message: messages.error
      }
    }

    await prisma.wallet.update({
      where: { id: income.wallet_id },
      data: {
        balance: {
          decrement: income.amount
        }
      }
    })

    // delete income
    await prisma.income.delete({
      where: { id }
    })

    revalidatePath('/monedex/incomes')

    return {
      ok: true,
      message: messages.success
    }
  } catch (error) {
    return {
      ok: false,
      message: messages.error
    }
  }
}
