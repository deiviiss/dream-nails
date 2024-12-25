'use server'

import { type Income } from '@/interfaces/income.interface'
import prisma from '@/lib/prisma'

interface Response {
  ok: boolean
  message: string
  income: Income | null
}

export const fetchIncomeById = async (id: number): Promise<Response> => {
  try {
    const incomeDB = await prisma.income.findUnique({
      where: { id: Number(id) },
      include: {
        income_category: {
          select: {
            id: true,
            name: true
          }
        },
        user: {
          select: {
            id: true
          }
        }
      }
    })

    if (!incomeDB) {
      return {
        ok: false,
        message: 'No se encontró el ingreso',
        income: null
      }
    }

    // Map income data
    const income: Income = {
      ...incomeDB,
      incomeDate: incomeDB.income_date,
      incomeMonth: incomeDB.income_month,
      incomeCategoryId: incomeDB.income_category_id,
      incomeCategory: {
        id: incomeDB.income_category.id,
        name: incomeDB.income_category.name
      },
      userId: incomeDB.user_id
    }

    return {
      ok: true,
      message: 'Ingreso encontrado',
      income
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
