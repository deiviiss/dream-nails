export interface SuccessResponse {
  message: string
}

export interface ValidationErrorResponse {
  errors: Record<string, string[]>
  message: string
}

export interface DatabaseErrorResponse {
  message: string
}
