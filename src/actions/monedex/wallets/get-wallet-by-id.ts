'use server'

import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Wallet get successfully',
  error: 'Error getting wallet'
}

export const getWalletById = async (id: number) => {
  try {
    const user = await getUserSessionServer()

    if (!user) {
      return {
        ok: false,
        message: messages.error
      }
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!wallet) {
      return {
        ok: false,
        message: messages.error
      }
    }

    return {
      ok: true,
      message: messages.success,
      wallet
    }
  } catch (error) {
    return {
      ok: false,
      message: messages.error
    }
  }
}
