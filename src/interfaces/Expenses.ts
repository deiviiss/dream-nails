import { type Expense } from '@prisma/client'

export interface StateExpense {
  errors?: {
    name?: string[]
    amount?: string[]
    method?: string[]
    expenseDate?: string[]
    categoryId?: string[]
    placeId?: string[]
    userId?: string[]
  }
  message?: string | null
}

export interface ExpenseWithCategoryAndPlace extends Expense {
  Category: {
    id: number
    name: string
  }
  Place: {
    id: number
    name: string
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
}
