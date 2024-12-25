'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
import prisma from '@/lib/prisma'

const incomeSchema = z.object({
  id: z.number().optional().nullable(),
  name: z
    .string({
      required_error: 'El nombre es requerido.'
    })
    .min(3, {
      message: 'El nombre debe tener al menos 3 caracteres.'
    })
    .max(100, {
      message: 'El nombre debe tener máximo 100 caracteres.'
    }),
  amount: z
    .coerce.number({
      required_error: 'La cantidad es requerida.',
      invalid_type_error: 'La cantidad es requerida.'
    }).gt(0, {
      message: 'Por favor ingrese una cantidad mayor que $0.'
    }),
  method: z
    .enum(['cash', 'transfer'], {
      required_error: 'El método de ingreso es requerido.'
    }),
  incomeDate: z
    .date({
      required_error: 'La fecha del ingreso es requerida',
      invalid_type_error: 'Por favor ingresa una fecha valida.'
    }),
  incomeCategoryId: z
    .number({
      required_error: 'La categoría del ingreso es requerida.'
    })
    .int({
      message: 'La categoría del ingreso debe ser un número entero.'
    })
    .min(1, {
      message: 'La categoría del ingreso debe ser mayor o igual a 1.'
    })
})

const messages = {
  incomeCreateSuccess: 'Income created successfully',
  incomeUpdateSuccess: 'Income updated successfully',
  incomeError: 'Error creating/updating income'
}

export const createUpdateIncome = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const dataToValidate = {
    ...data,
    id: data.id ? Number(data.id) : undefined,
    incomeCategoryId: data.incomeCategoryId ? Number(data.incomeCategoryId) : undefined,
    incomeDate: data.incomeDate ? new Date(String(data.incomeDate)) : undefined
  }

  const incomeParsed = incomeSchema.safeParse(dataToValidate)

  if (!incomeParsed.success) {
    return {
      ok: false,
      message: messages.incomeError
    }
  }

  // check user
  const userSession = await getUserSessionServer()
  const email = userSession?.email
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (user === null) {
    return {
      message: 'Credentials no valid'
    }
  }

  const { amount, incomeCategoryId, incomeDate, method, name, id } = incomeParsed.data

  try {
    // Update income
    if (id) {
      const income = await prisma.income.update({
        where: {
          id
        },
        data: {
          name,
          amount,
          method,
          income_date: incomeDate,
          income_category_id: incomeCategoryId,
          user_id: user.id
        }
      })

      revalidatePath(`/monedex/incomes/${id}`)

      return {
        ok: true,
        message: messages.incomeUpdateSuccess,
        income
      }
    }

    // Create income
    const income = await prisma.income.create({
      data: {
        name,
        amount,
        method,
        income_date: incomeDate,
        income_category_id: incomeCategoryId,
        user_id: user.id
      }
    })

    revalidatePath('/monedex/incomes/')

    return {
      ok: true,
      message: messages.incomeCreateSuccess,
      income
    }
  } catch (error) {
    return {
      ok: false,
      message: messages.incomeError
    }
  }
}
