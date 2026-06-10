'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
import prisma from '@/lib/prisma'

const incomeSchema = z.object({
  id: z.number().optional().nullable(),
  name: z
    .string({ required_error: 'El nombre es requerido.' })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
    .max(100, { message: 'El nombre debe tener máximo 100 caracteres.' }),
  amount: z
    .coerce.number({
      required_error: 'La cantidad es requerida.',
      invalid_type_error: 'La cantidad es requerida.'
    }).gt(0, { message: 'Por favor ingrese una cantidad mayor que $0.' }),
  // walletId replaces the old method enum — the user now selects a specific wallet
  walletId: z
    .coerce.number({
      required_error: 'La cartera es requerida.',
      invalid_type_error: 'Selecciona una cartera válida.'
    })
    .int()
    .min(1, { message: 'Selecciona una cartera.' }),
  incomeDate: z
    .date({
      required_error: 'La fecha del ingreso es requerida',
      invalid_type_error: 'Por favor ingresa una fecha valida.'
    }),
  incomeCategoryId: z
    .number({ required_error: 'La categoría del ingreso es requerida.' })
    .int({ message: 'La categoría del ingreso debe ser un número entero.' })
    .min(1, { message: 'La categoría del ingreso debe ser mayor o igual a 1.' })
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
    walletId: data.walletId ? Number(data.walletId) : undefined,
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

  // Verify the user session
  const userSession = await getUserSessionServer()
  const email = userSession?.email
  const user = await prisma.user.findFirst({ where: { email } })

  if (user === null) {
    return { ok: false, message: 'Credentials not valid' }
  }

  const { amount, incomeCategoryId, incomeDate, walletId, name, id } = incomeParsed.data

  try {
    // Fetch the selected wallet by its exact id — no longer looking up by type
    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId },
      select: { id: true, balance: true, type: true }
    })

    if (!wallet) {
      return { ok: false, message: 'Wallet not found' }
    }

    // Derive the method string from the wallet type (stored for reporting purposes)
    const method = wallet.type

    // Update existing income
    if (id) {
      const oldIncome = await prisma.income.findFirst({
        where: { id },
        select: { amount: true, wallet_id: true }
      })

      if (!oldIncome) {
        return { ok: false, message: 'Ingreso no encontrado.' }
      }

      // If the wallet changed, reverse the old wallet balance and apply to the new one
      if (oldIncome.wallet_id !== walletId) {
        // Reverse the income from the previous wallet
        await prisma.wallet.update({
          where: { id: oldIncome.wallet_id },
          data: { balance: { decrement: oldIncome.amount } }
        })

        // Apply the new amount to the selected wallet
        await prisma.wallet.update({
          where: { id: walletId },
          data: { balance: { increment: amount } }
        })

        await prisma.income.update({
          where: { id },
          data: {
            name,
            amount,
            income_category_id: Number(incomeCategoryId),
            income_date: incomeDate,
            income_month: incomeDate.getMonth() + 1,
            method,
            wallet_id: walletId
          }
        })

        revalidatePath(`/monedex/incomes/${id}`)
        return { ok: true, message: messages.incomeUpdateSuccess }
      }

      // Same wallet — adjust the balance by the difference
      const balanceDiff = amount - oldIncome.amount

      await prisma.wallet.update({
        where: { id: oldIncome.wallet_id },
        data: { balance: { increment: balanceDiff } }
      })

      await prisma.income.update({
        where: { id },
        data: {
          name,
          amount,
          income_category_id: Number(incomeCategoryId),
          income_date: incomeDate,
          income_month: incomeDate.getMonth() + 1,
          method
        }
      })

      revalidatePath(`/monedex/incomes/${id}`)
      return { ok: true, message: messages.incomeUpdateSuccess }
    }

    // Create new income
    const income = await prisma.income.create({
      data: {
        name,
        amount,
        method,
        wallet_id: walletId,
        income_date: incomeDate,
        income_month: incomeDate.getMonth() + 1,
        income_category_id: incomeCategoryId,
        user_id: user.id
      }
    })

    // Increment the wallet balance
    await prisma.wallet.update({
      where: { id: walletId },
      data: { balance: { increment: amount } }
    })

    revalidatePath('/monedex/incomes/')

    return {
      ok: true,
      message: messages.incomeCreateSuccess,
      income
    }
  } catch {
    return { ok: false, message: messages.incomeError }
  }
}
