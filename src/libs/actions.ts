'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { prisma } from './prisma'

import { type StateExpense } from '@/interfaces/Expenses'
import {
  type DatabaseErrorResponse,
  type SuccessResponse,
  type ValidationErrorResponse
} from '@/interfaces/Responses'

const FormExpenseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: 'Por favor escriba un nombre.'
  }),
  amount: z.coerce.number().gt(0, {
    message: 'Por favor ingrese una cantidad mayor que $0.'
  }),
  method: z.enum(['credit', 'cash'], {
    invalid_type_error: 'Seleccione un método de pago.'
  }),
  expenseDate: z.date({
    invalid_type_error: 'Por favor ingresa una fecha valida.'
  }),
  categoryId: z.string({
    invalid_type_error: 'Por favor seleccione una categoria.'
  })
})

const CreateExpenseSchema = FormExpenseSchema.omit({ id: true })
const UpdateExpense = FormExpenseSchema.omit({ id: true })

export type CreateExpenseResponse =
  | SuccessResponse
  | ValidationErrorResponse
  | DatabaseErrorResponse

export type DeleteExpenseResponse = SuccessResponse | DatabaseErrorResponse

export type UpdateExpenseResponse =
  | SuccessResponse
  | DatabaseErrorResponse
  | ValidationErrorResponse

export async function createExpense(
  prevStateExpense: StateExpense,
  formData: FormData
) {
  let expenseDateValue: FormDataEntryValue | null | Date =
    formData.get('expenseDate')

  if (expenseDateValue !== null && expenseDateValue !== ''
  ) {
    expenseDateValue = new Date(expenseDateValue.toString())
  }

  const validatedFields = CreateExpenseSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
    method: formData.get('method'),
    expenseDate: expenseDateValue,
    categoryId: formData.get('categoryId')
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo crear el gasto.'
    }
  }

  // check user
  const session = await getServerSession()
  const email = session?.user.email
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

  // Prepare data for insertion into the database
  const { name, amount, categoryId, expenseDate, method } =
    validatedFields.data

  try {
    await prisma.expense.create({
      data: {
        name,
        amount,
        category_id: Number(categoryId),
        expense_date: expenseDate,
        method,
        user_id: user.id
      }
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to create expense.'
    }
  }

  revalidatePath('/monedex/expenses')
  redirect('/monedex/expenses')
}

export async function deleteExpense(
  id: number
): Promise<DeleteExpenseResponse> {
  try {
    await prisma.expense.delete({
      where: {
        id
      }
    })
    revalidatePath('/monedex/expenses')
    return { message: 'Deleted expense.' }
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete expense.'
    }
  }
}

export async function updateExpense(
  id: number,
  prevStateExpense: StateExpense,
  formData: FormData
): Promise<UpdateExpenseResponse> {
  let expenseDateValue: FormDataEntryValue | null | Date =
    formData.get('expenseDate')

  if (expenseDateValue !== null && expenseDateValue !== '') {
    expenseDateValue = new Date(expenseDateValue.toString())
  }

  const validatedFields = UpdateExpense.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
    method: formData.get('method'),
    expenseDate: expenseDateValue,
    categoryId: formData.get('categoryId')
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo actualiazar el gasto.'
    }
  }

  // Prepare data for insertion into the database
  const { name, amount, categoryId, expenseDate, method } =
    validatedFields.data

  try {
    await prisma.expense.update({
      where: {
        id
      },
      data: {
        name,
        amount,
        category_id: Number(categoryId),
        expense_date: expenseDate,
        method
      }
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update expense.'
    }
  }

  revalidatePath('/monedex/expenses')
  redirect('/monedex/expenses')
}
