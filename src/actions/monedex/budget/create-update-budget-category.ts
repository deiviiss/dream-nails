'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Budget category saved successfully',
  error: 'Error saving budget category',
  notFound: 'Budget category not found'
}

const budgetCategorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  amount: z.number().min(0, 'Amount must be positive'),
  expense_category_id: z.number().min(1, 'Expense category is required')
})

interface BudgetCategoryFormData {
  id?: number
  name: string
  amount: number
  expense_category_id: number
}

export const createUpdateBudgetCategory = async (data: BudgetCategoryFormData) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.error
    }
  }

  try {
    // Validate the data
    const validatedData = budgetCategorySchema.parse(data)

    // Check if we're updating or creating
    if (validatedData.id) {
      // Update existing category
      const existingCategory = await prisma.budgetCategory.findFirst({
        where: {
          id: validatedData.id
          // Note: We should add user_id to BudgetCategory for multi-user support
        }
      })

      if (!existingCategory) {
        return {
          ok: false,
          message: messages.notFound
        }
      }

      const updatedCategory = await (prisma.budgetCategory).update({
        where: { id: validatedData.id },
        data: {
          name: validatedData.name,
          amount: validatedData.amount,
          expense_category_id: validatedData.expense_category_id
        }
      })

      revalidatePath('/monedex/budget')

      return {
        ok: true,
        message: messages.success,
        budgetCategory: updatedCategory
      }
    } else {
      // Create new category
      const newCategory = await (prisma.budgetCategory).create({
        data: {
          name: validatedData.name,
          amount: validatedData.amount,
          expense_category_id: validatedData.expense_category_id
        }
      })

      revalidatePath('/monedex/budget')

      return {
        ok: true,
        message: messages.success,
        budgetCategory: newCategory
      }
    }
  } catch (error) {
    console.error('Error saving budget category:', error)

    if (error instanceof z.ZodError) {
      return {
        ok: false,
        message: 'Validation error: ' + error.errors.map(e => e.message).join(', ')
      }
    }

    return {
      ok: false,
      message: messages.error
    }
  }
}
