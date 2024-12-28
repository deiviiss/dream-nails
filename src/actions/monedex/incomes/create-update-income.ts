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
    .enum(['debit', 'cash'], {
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
    const wallet = await prisma.wallet.findFirst({
      where: {
        type: method
      },
      select: {
        id: true,
        balance: true
      }
    })

    if (!wallet) {
      return {
        ok: false,
        message: 'Wallet not found'
      }
    }

    // Update income
    if (id) {
      const oldIncome = await prisma.income.findFirst({
        where: { id },
        select: {
          amount: true,
          wallet_id: true,
          method: true
        }
      })

      if (!oldIncome) {
        return { message: 'Ingreso no encontrado.' }
      }
      // Get the new wallet according to the new method
      const newWallet = await prisma.wallet.findFirst({
        where: {
          type: method
        },
        select: {
          id: true
        }
      })

      if (!newWallet) {
        return {
          message: 'Billetera no encontrada, cree una billetera primero.'
        }
      }

      // If the method has changed, we need to update the balance of the old wallet
      if (oldIncome.method !== method) { // method has changed
        // Update the old wallet balance
        await prisma.wallet.update({
          where: { id: oldIncome.wallet_id },
          data: { balance: { decrement: oldIncome.amount } }
        })

        // Update the new wallet balance
        await prisma.wallet.update({
          where: { id: newWallet.id },
          data: { balance: { increment: amount } }
        })

        await prisma.income.update({
          where: { id },
          data: {
            name,
            amount,
            income_category_id: Number(incomeCategoryId),
            income_date: incomeDate,
            method,
            wallet_id: newWallet.id // Relation to the new wallet
          }
        })

        revalidatePath(`/monedex/incomes/${id}`)

        return { message: 'Updated income' }
      }

      // If the method has not changed, we need to update the balance of the wallet
      const newBalance = amount - oldIncome.amount // Wallet balance updated

      // Update the balance of the old wallet
      await prisma.wallet.update({
        where: { id: oldIncome.wallet_id },
        data: { balance: { increment: newBalance } }
      })

      await prisma.income.update({
        where: { id },
        data: {
          name,
          amount,
          income_category_id: Number(incomeCategoryId),
          income_date: incomeDate,
          method
        }
      })

      revalidatePath(`/monedex/incomes/${id}`)

      return {
        ok: true,
        message: messages.incomeUpdateSuccess
      }
    }

    // Create income
    const income = await prisma.income.create({
      data: {
        name,
        amount,
        method,
        wallet_id: wallet.id,
        income_date: incomeDate,
        income_category_id: incomeCategoryId,
        user_id: user.id
      }
    })

    // update wallet balance
    await prisma.wallet.update({
      where: {
        id: wallet.id
      },
      data: {
        balance: {
          increment: amount
        }
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
