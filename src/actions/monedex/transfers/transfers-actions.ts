'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const TransferSchema = z.object({
  id: z.number().optional().nullable(),
  amount: z.coerce.number().gt(0, {
    message: 'Por favor ingrese una cantidad mayor que $0.'
  }),
  description: z.string().optional().nullable(),
  fromWalletId: z.coerce.number().int().gt(0, {
    message: 'Por favor seleccione la cartera de origen.'
  }),
  toWalletId: z.coerce.number().int().gt(0, {
    message: 'Por favor seleccione la cartera de destino.'
  }),
  transferDate: z.coerce.date({
    invalid_type_error: 'Por favor ingrese una fecha válida.'
  })
})

const messages = {
  success: 'Transferencia creada con éxito.',
  successUpdate: 'Transferencia actualizada con éxito.',
  error: 'Error en la transferencia.',
  sameWallet: 'La cartera de origen y destino no pueden ser la misma.',
  notFound: 'Cartera no encontrada.'
}

export async function createUpdateTransfer(formData: FormData) {
  const data = Object.fromEntries(formData)

  const validatedFields = TransferSchema.safeParse({
    id: data.id ? Number(data.id) : undefined,
    amount: data.amount,
    description: data.description,
    fromWalletId: data.fromWalletId,
    toWalletId: data.toWalletId,
    transferDate: data.transferDate ? new Date(String(data.transferDate)) : new Date()
  })

  if (!validatedFields.success) {
    return {
      ok: false,
      message: 'Campos inválidos. No se pudo realizar la transferencia.',
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const user = await getUserSessionServer()
  if (!user) {
    return {
      ok: false,
      message: 'No autorizado.'
    }
  }

  const dbUser = await prisma.user.findFirst({
    where: { email: user.email }
  })
  if (!dbUser) {
    return {
      ok: false,
      message: 'Usuario no encontrado.'
    }
  }

  const { id, amount, description, fromWalletId, toWalletId, transferDate } = validatedFields.data

  if (fromWalletId === toWalletId) {
    return {
      ok: false,
      message: messages.sameWallet
    }
  }

  try {
    // Check if wallets exist
    const fromWallet = await prisma.wallet.findUnique({ where: { id: fromWalletId } })
    const toWallet = await prisma.wallet.findUnique({ where: { id: toWalletId } })

    if (!fromWallet || !toWallet) {
      return {
        ok: false,
        message: messages.notFound
      }
    }

    if (id) {
      // Update existing transfer
      const oldTransfer = await prisma.transfer.findUnique({ where: { id } })
      if (!oldTransfer) {
        return { ok: false, message: 'Transferencia no encontrada.' }
      }

      // Revert old transfer balances
      // Old source wallet gets amount back (+), old destination wallet loses amount (-)
      await prisma.wallet.update({
        where: { id: oldTransfer.from_wallet_id },
        data: { balance: { increment: oldTransfer.amount } }
      })
      await prisma.wallet.update({
        where: { id: oldTransfer.to_wallet_id },
        data: { balance: { decrement: oldTransfer.amount } }
      })

      // Apply new transfer balances
      // New source wallet loses amount (-), new destination wallet gets amount (+)
      await prisma.wallet.update({
        where: { id: fromWalletId },
        data: { balance: { decrement: amount } }
      })
      await prisma.wallet.update({
        where: { id: toWalletId },
        data: { balance: { increment: amount } }
      })

      // Update transfer record
      await prisma.transfer.update({
        where: { id },
        data: {
          amount,
          description,
          from_wallet_id: fromWalletId,
          to_wallet_id: toWalletId,
          transfer_date: transferDate
        }
      })

      revalidatePath('/monedex/transfers')
      revalidatePath('/monedex/dashboard')

      return {
        ok: true,
        message: messages.successUpdate
      }
    } else {
      // Create new transfer
      // Source wallet balance decreases
      await prisma.wallet.update({
        where: { id: fromWalletId },
        data: { balance: { decrement: amount } }
      })

      // Destination wallet balance increases
      await prisma.wallet.update({
        where: { id: toWalletId },
        data: { balance: { increment: amount } }
      })

      // Create transfer record
      await prisma.transfer.create({
        data: {
          amount,
          description,
          from_wallet_id: fromWalletId,
          to_wallet_id: toWalletId,
          transfer_date: transferDate,
          user_id: dbUser.id
        }
      })

      revalidatePath('/monedex/transfers')
      revalidatePath('/monedex/dashboard')

      return {
        ok: true,
        message: messages.success
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return {
      ok: false,
      message: messages.error
    }
  }
}

export async function deleteTransfer(id: number) {
  const user = await getUserSessionServer()
  if (!user) {
    return { ok: false, message: 'No autorizado.' }
  }

  try {
    const transfer = await prisma.transfer.findUnique({
      where: { id }
    })

    if (!transfer) {
      return { ok: false, message: 'Transferencia no encontrada.' }
    }

    // Revert balances
    // Source wallet balance increases (+)
    await prisma.wallet.update({
      where: { id: transfer.from_wallet_id },
      data: { balance: { increment: transfer.amount } }
    })

    // Destination wallet balance decreases (-)
    await prisma.wallet.update({
      where: { id: transfer.to_wallet_id },
      data: { balance: { decrement: transfer.amount } }
    })

    // Delete record
    await prisma.transfer.delete({
      where: { id }
    })

    revalidatePath('/monedex/transfers')
    revalidatePath('/monedex/dashboard')

    return {
      ok: true,
      message: 'Transferencia eliminada con éxito.'
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return {
      ok: false,
      message: 'Error al eliminar la transferencia.'
    }
  }
}

export async function getTransfers(currentPage: number = 1, limit: number = 10) {
  const user = await getUserSessionServer()
  if (!user) {
    return { ok: false, message: 'No autorizado.', transfers: [], totalPages: 0 }
  }

  const offset = (currentPage - 1) * limit

  try {
    const count = await prisma.transfer.count()
    const transfers = await prisma.transfer.findMany({
      orderBy: { transfer_date: 'desc' },
      take: limit,
      skip: offset,
      include: {
        fromWallet: { select: { id: true, name: true } },
        toWallet: { select: { id: true, name: true } }
      }
    })

    const totalPages = Math.ceil(count / limit)

    return {
      ok: true,
      transfers,
      totalPages
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return {
      ok: false,
      message: 'Error al obtener las transferencias.',
      transfers: [],
      totalPages: 0
    }
  }
}
