'use server'

import { unstable_noStore } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Expense categories retrieved successfully',
  error: 'Error getting expense categories'
}

export const getExpenseCategories = async () => {
  unstable_noStore()
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.error
    }
  }

  try {
    const expenseCategories = await prisma.expenseCategory.findMany({
      select: {
        id: true,
        name: true,
        description: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return {
      ok: true,
      message: messages.success,
      expenseCategories
    }
  } catch (error) {
    console.error('Error getting expense categories:', error)
    return {
      ok: false,
      message: messages.error
    }
  }
}
