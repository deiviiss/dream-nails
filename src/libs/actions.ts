'use server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from './prisma'

import { getUserSessionServer } from '@/actions'
import { type StateResponseCategory, type StateCategory } from '@/interfaces/Category'
import { type StateExpense } from '@/interfaces/Expense'
import {
  type DatabaseErrorResponse,
  type SuccessResponse,
  type ValidationErrorResponse
} from '@/interfaces/Responses'

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
  method: z.enum(['credit', 'cash'], {
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
  const { name, amount, categoryId, expenseDate, method, expenseMonth } =
    validatedFields.data

  try {
    await prisma.expense.create({
      data: {
        name,
        amount,
        category_id: Number(categoryId),
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
  const { name, amount, categoryId, expenseDate, method, expenseMonth } =
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
        expense_month: expenseMonth,
        method,
        with_relation: formatWithRelation(formData.get('withRelation'))
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
    message: 'Por favor escriba una descrición.'
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
    description: formData.get('description')
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo crear la categoria.'
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
    await prisma.category.create({
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
  // let categoryDateValue: FormDataEntryValue | null | Date =
  //   formData.get('expenseDate')

  // if (expenseDateValue !== null && expenseDateValue !== '') {
  //   expenseDateValue = new Date(expenseDateValue.toString())
  // }

  const validatedFields = UpdateCategory.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo actualiazar la categoria.'
    }
  }

  // Prepare data for insertion into the database
  const { name, description } =
    validatedFields.data

  try {
    await prisma.category.update({
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

export async function deleteCategory(
  id: number
): Promise<StateResponseCategory> {
  try {
    await prisma.category.delete({
      where: {
        id
      }
    })

    revalidatePath('/monedex/categories')

    return { message: 'Deleted category.' }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        errors: 'Categoria con gastos asociados. No se puede eliminar.',
        message: 'Categoria con gastos asociados. No se puede eliminar.'
      }
    }
    return {
      message: 'Database Error: Failed to Delete category.'
    }
  }
}
