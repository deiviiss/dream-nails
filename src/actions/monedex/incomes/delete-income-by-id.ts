'use server'

import { revalidatePath } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  incomeCreateSuccess: 'Income created successfully',
  incomeUpdateSuccess: 'Income updated successfully',
  incomeError: 'Error creating/updating income'
}

export const deleteIncomeById = async (id: number) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.incomeError
    }
  }

  try {
    await prisma.income.delete({
      where: { id }
    })

    revalidatePath('/monedex/incomes')

    return {
      ok: true,
      message: messages.incomeCreateSuccess
    }
  } catch (error) {
    return {
      ok: false,
      message: messages.incomeError
    }
  }
}
