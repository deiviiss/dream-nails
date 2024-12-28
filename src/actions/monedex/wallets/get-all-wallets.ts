'use server'

import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Wallet get successfully',
  error: 'Error getting wallet'
}

export const getAllWallets = async () => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: messages.error
    }
  }

  try {
    const wallets = await prisma.wallet.findMany()

    if (!wallets) {
      return {
        ok: false,
        message: messages.error
      }
    }

    return {
      ok: true,
      message: messages.success,
      wallets
    }
  } catch (error) {
    return {
      ok: false,
      message: messages.error
    }
  }
}
