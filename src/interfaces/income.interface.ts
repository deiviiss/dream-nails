export interface Income {
  id: number
  name: string
  amount: number
  method: string
  incomeDate: Date
  incomeMonth: number
  incomeCategoryId: number
  incomeCategory: IncomeCategory
  userId: number
}

export interface IncomeCategory {
  id: number
  name: string
}
