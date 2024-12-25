'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { getUserSessionServer } from '@/actions'
import { type StateCategory } from '@/interfaces/Category'
import { type StateExpense } from '@/interfaces/Expense'
import {
  type DatabaseErrorResponse,
  type SuccessResponse,
  type ValidationErrorResponse
} from '@/interfaces/Responses'
import prisma from '@/lib/prisma'

const formatWithRelation = (strRelations: FormDataEntryValue | null) => {
  if (strRelations === 'on') {
    return true
  }

  if (strRelations === null) {
    return false
  }
}

const FormExpenseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: 'Por favor escriba un nombre.'
  }),
  amount: z.coerce.number().gt(0, {
    message: 'Por favor ingrese una cantidad mayor que $0.'
  }),
  method: z.enum(['credit', 'cash', 'debit'], {
    invalid_type_error: 'Seleccione un método de pago.'
  }),
  expenseDate: z.date({
    invalid_type_error: 'Por favor ingresa una fecha valida.'
  }),
  expenseMonth: z.coerce.number().gt(0, {
    message: 'Por favor ingrese un mes valido.'
  }),
  categoryId: z.string({
    invalid_type_error: 'Por favor seleccione una categoria.'
  }),
  placeId: z.string({
    invalid_type_error: 'Por favor seleccione un lugar.'
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
  let expenseDateValue: FormDataEntryValue | null | Date = formData.get('expenseDate')

  let currentMonth = new Date().getMonth() + 1

  if (expenseDateValue !== null && expenseDateValue !== ''
  ) {
    expenseDateValue = new Date(expenseDateValue.toString())
    currentMonth = expenseDateValue.getMonth() + 1
  }

  const validatedFields = CreateExpenseSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
    method: formData.get('method'),
    expenseDate: expenseDateValue,
    expenseMonth: currentMonth,
    categoryId: formData.get('categoryId'),
    placeId: formData.get('placeId')
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo crear el gasto.'
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

  // Prepare data for insertion into the database
  const { name, amount, categoryId, expenseDate, method, expenseMonth, placeId } =
    validatedFields.data

  try {
    await prisma.expense.create({
      data: {
        name,
        amount,
        expense_category_id: Number(categoryId),
        place_id: Number(placeId),
        expense_date: expenseDate,
        method,
        expense_month: expenseMonth,
        user_id: user.id,
        with_relation: formatWithRelation(formData.get('withRelation'))
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

  let currentMonth = new Date().getMonth() + 1

  if (expenseDateValue !== null && expenseDateValue !== '') {
    expenseDateValue = new Date(expenseDateValue.toString())
    currentMonth = expenseDateValue.getMonth() + 1
  }

  const validatedFields = UpdateExpense.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
    method: formData.get('method'),
    expenseDate: expenseDateValue,
    expenseMonth: currentMonth,
    categoryId: formData.get('categoryId'),
    placeId: formData.get('placeId')
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo actualizar el gasto.'
    }
  }

  // Prepare data for insertion into the database
  const { name, amount, categoryId, expenseDate, method, expenseMonth, placeId } =
    validatedFields.data

  try {
    await prisma.expense.update({
      where: {
        id
      },
      data: {
        name,
        amount,
        expense_category_id: Number(categoryId),
        place_id: Number(placeId),
        expense_date: expenseDate,
        expense_month: expenseMonth,
        method,
        with_relation: formatWithRelation(formData.get('withRelation'))
      }
    })

    revalidatePath('/monedex/expenses')

    return { message: 'Updated expense' }
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update expense.'
    }
  }
}

export async function toggleReconciledExpense(id: number, reconciled: boolean): Promise<void> {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        is_reconciled: reconciled
      }
    })

    revalidatePath('/monedex/expenses')
  } catch (error) {
    throw new Error('Database Error: Failed to Update category.')
  }
}

// CATEGORIES

const FormCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: 'Por favor escriba un nombre.'
  }),
  description: z.string().min(1, {
    message: 'Por favor escriba una descripción.'
  }),
  categoryType: z.enum(['expense', 'income'], {
    invalid_type_error: 'Seleccione un tipo de categoría.',
    message: 'Por favor seleccione una categoría.'
  })
})

const CreateCategorySchema = FormCategorySchema.omit({ id: true })

const UpdateCategory = FormCategorySchema.omit({ id: true })

export type UpdateCategoryResponse =
  | SuccessResponse
  | DatabaseErrorResponse
  | ValidationErrorResponse

export type DeleteCategoryResponse = SuccessResponse | DatabaseErrorResponse

export async function createCategory(
  prevStateCategory: StateCategory,
  formData: FormData
) {
  const validatedFields = CreateCategorySchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    categoryType: formData.get('categoryType')
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo crear la categoría.'
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

  // Prepare data for insertion into the database
  const { name, description } =
    validatedFields.data

  try {
    await prisma.expenseCategory.create({
      data: {
        name,
        description
      }
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to create expense.'
    }
  }

  revalidatePath('/monedex/categories')
  redirect('/monedex/categories')
}

export async function updateCategory(
  id: number,
  prevStateCategory: StateCategory,
  formData: FormData
): Promise<UpdateCategoryResponse> {
  const validatedFields = UpdateCategory.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo actualizar la categoría.'
    }
  }

  // Prepare data for insertion into the database
  const { name, description } =
    validatedFields.data

  try {
    await prisma.expenseCategory.update({
      where: {
        id
      },
      data: {
        name,
        description
      }
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update category.'
    }
  }

  revalidatePath('/monedex/categories')
  redirect('/monedex/categories')
}
