export interface CategoryForm {
  id: number
  name: string
}

export interface StateCategory {
  errors?: Record<string, string[]>
  message?: string | null
}

export interface StateResponseCategory {
  errors?: string | null
  message?: string | null
}
