'use server'

import { unstable_noStore } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

/**
 * Returns a lightweight list of wallets for use in form selectors.
 * Only includes id, name, and type — no balance or financial data.
 */
export const getWalletsForForm = async () => {
  unstable_noStore()
  const user = await getUserSessionServer()

  if (!user) {
    return { ok: false as const, message: 'Unauthorized', wallets: [] }
  }

  try {
    const wallets = await prisma.wallet.findMany({
      select: {
        id: true,
        name: true,
        type: true
      },
      orderBy: { name: 'asc' }
    })

    return { ok: true as const, wallets }
  } catch {
    return { ok: false as const, message: 'Error fetching wallets', wallets: [] }
  }
}
