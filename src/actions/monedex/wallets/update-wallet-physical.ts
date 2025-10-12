'use server'

import { getUserSessionServer } from '@/actions'
import { type UpdateWalletPhysical } from '@/interfaces/wallet-physical.interface'
import prisma from '@/lib/prisma'

const messages = {
  success: 'Wallet physical amount updated successfully',
  error: 'Error updating wallet physical amount',
  notFound: 'Wallet not found',
  unauthorized: 'You do not have permission to update this wallet'
}

export const updateWalletPhysical = async (data: UpdateWalletPhysical) => {
  try {
    const user = await getUserSessionServer()

    if (!user) {
      return {
        ok: false,
        message: messages.error
      }
    }

    // Validate that the wallet belongs to the current user
    const wallet = await prisma.wallet.findFirst({
      where: {
        id: data.walletId
        // user_id: user.id
      }
    })

    if (!wallet) {
      return {
        ok: false,
        message: messages.notFound
      }
    }

    // Validate that physicalAmount is a positive number
    if (data.physicalAmount < 0) {
      return {
        ok: false,
        message: 'Physical amount must be a positive number'
      }
    }

    // Update only the physical field
    const updatedWallet = await prisma.wallet.update({
      where: { id: data.walletId },
      data: { physical: data.physicalAmount }
    })

    return {
      ok: true,
      message: messages.success,
      wallet: updatedWallet
    }
  } catch (error) {
    console.error('Error updating wallet physical amount:', error)
    return {
      ok: false,
      message: messages.error
    }
  }
}
