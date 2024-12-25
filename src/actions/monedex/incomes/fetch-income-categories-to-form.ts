'use server'

import { unstable_noStore } from 'next/cache'
import { type IncomeCategory } from '@/interfaces/income.interface'
import prisma from '@/lib/prisma'

export async function fetchIncomeCategoriesToForm(): Promise<IncomeCategory[]> {
  unstable_noStore()
  try {
    const categories = await prisma.incomeCategory.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return categories
  } catch (error) {
    throw new Error('Failed to fetch categories.')
  }
}
