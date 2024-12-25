'use server'

import { revalidatePath } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  categoryCreateSuccess: 'Category created successfully',
  categoryUpdateSuccess: 'Category updated successfully',
  categoryError: 'Error creating/updating category'
}

export const deleteCategoryById = async (id: number) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.categoryError
    }
  }

  try {
    await prisma.expenseCategory.delete({
      where: { id }
    })

    revalidatePath('/monedex/categories')

    return {
      ok: true,
      message: messages.categoryCreateSuccess
    }
  } catch (error) {
    return {
      ok: false,
      message: messages.categoryError
    }
  }
}
