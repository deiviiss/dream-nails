'use server'

import { revalidatePath } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Budget category deleted successfully',
  error: 'Error deleting budget category',
  notFound: 'Budget category not found'
}

export const deleteBudgetCategory = async (id: number) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.error
    }
  }

  try {
    // Check if the category exists
    const existingCategory = await prisma.budgetCategory.findFirst({
      where: {
        id
        // Note: We should add user_id to BudgetCategory for multi-user support
      }
    })

    if (!existingCategory) {
      return {
        ok: false,
        message: messages.notFound
      }
    }

    // Delete the category
    await prisma.budgetCategory.delete({
      where: { id }
    })

    revalidatePath('/monedex/budget')

    return {
      ok: true,
      message: messages.success
    }
  } catch (error) {
    console.error('Error deleting budget category:', error)
    return {
      ok: false,
      message: messages.error
    }
  }
}
