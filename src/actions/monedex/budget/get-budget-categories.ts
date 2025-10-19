'use server'

import { unstable_noStore } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Budget categories retrieved successfully',
  error: 'Error getting budget categories'
}

export const getBudgetCategories = async () => {
  unstable_noStore()
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.error
    }
  }

  try {
    const budgetCategories = await prisma.budgetCategory.findMany({
      // Note: We should add user_id to BudgetCategory for multi-user support
      // For now, we'll get all categories
      select: {
        id: true,
        name: true,
        amount: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return {
      ok: true,
      message: messages.success,
      budgetCategories
    }
  } catch (error) {
    console.error('Error getting budget categories:', error)
    return {
      ok: false,
      message: messages.error
    }
  }
}
