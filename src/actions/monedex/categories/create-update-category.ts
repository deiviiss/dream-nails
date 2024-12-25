'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const categorySchema = z.object({
  id: z.number().optional().nullable(),
  name: z
    .string({
      required_error: 'El nombre es requerido.',
      message: 'El nombre es requerido.'
    })
    .min(3, {
      message: 'El nombre debe tener al menos 3 caracteres.'
    })
    .max(100, {
      message: 'El nombre debe tener máximo 100 caracteres.'
    }),
  description: z
    .string({
      required_error: 'La descripción es requerida.',
      message: 'La descripción es requerida.'
    })
    .min(3, {
      message: 'La descripción debe tener al menos 3 caracteres.'
    })
    .max(50, {
      message: 'La descripción debe tener máximo 50 caracteres.'
    }),
  categoryType: z
    .enum(['expense', 'income'], {
      invalid_type_error: 'El tipo de categoría es requerido.',
      message: 'El tipo de categoría es requerido.'
    })
})

const messages = {
  categoryCreateSuccess: 'Category created successfully',
  categoryUpdateSuccess: 'Category updated successfully',
  categoryError: 'Error creating/updating category'
}

export const createUpdateCategory = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const dataToValidate = {
    ...data,
    id: data.id ? Number(data.id) : undefined
  }

  const categoryParsed = categorySchema.safeParse(dataToValidate)

  if (!categoryParsed.success) {
    return {
      ok: false,
      message: messages.categoryError
    }
  }

  const { description, name, id, categoryType } = categoryParsed.data

  try {
    // Category Expense
    if (categoryType === 'expense') {
      // Update category expense
      if (id) {
        const category = await prisma.expenseCategory.update({
          where: {
            id
          },
          data: {
            name,
            description
          }
        })

        revalidatePath(`/monedex/categories/${id}`)

        return {
          ok: true,
          message: messages.categoryUpdateSuccess,
          category
        }
      }

      // Create category expense
      const category = await prisma.expenseCategory.create({
        data: {
          name,
          description
        }
      })

      revalidatePath('/monedex/categories/')

      return {
        ok: true,
        message: messages.categoryCreateSuccess,
        category
      }
    }

    // Update category income
    if (id) {
      const category = await prisma.incomeCategory.update({
        where: {
          id
        },
        data: {
          name,
          description
        }
      })

      revalidatePath(`/monedex/categories/${id}`)

      return {
        ok: true,
        message: messages.categoryUpdateSuccess,
        category
      }
    }

    // Create category income
    const category = await prisma.incomeCategory.create({
      data: {
        name,
        description
      }
    })

    revalidatePath('/monedex/categories/')

    return {
      ok: true,
      message: messages.categoryCreateSuccess,
      category
    }
  } catch (error) {
    return {
      ok: false,
      message: messages.categoryError
    }
  }
}
