import { type Expense } from '@prisma/client'

export interface StateExpense {
  errors?: {
    name?: string[]
    amount?: string[]
    method?: string[]
    expenseDate?: string[]
    categoryId?: string[]
    userId?: string[]
    placeId?: string[]
  }
  message?: string | null
}

export interface ExpenseWithCategory extends Expense {
  category: {
    id: number
    name: string
  }
}

export interface ExpenseWithCategoryAndUserAndPlace extends ExpenseWithCategory {
  user: {
    email: string
    name: string | null
  }
  place: {
    name: string | null
  }
}

export interface ExpenseForm {
  id: number
  name: string
  amount: number
  expense_date: Date
  category_id: number
  place_id: number
  method: string
  is_reconciled: boolean
}
