export interface Category {
  id: number
  name: string
  description: string
  categoryType: 'expense' | 'income'
}

export interface StateCategory {
  errors?: Record<string, string[]>
  message?: string | null
}

export interface StateResponseCategory {
  errors?: string | null
  message?: string | null
}
