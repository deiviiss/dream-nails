import { type WalletType } from '@prisma/client'

export interface WalletSummary {
  id: string
  name: string
  balance: number
  totalIncome: number
  totalExpenses: number
  type: WalletType
  change: {
    value: number
    label: string
  }
}

/** Lightweight wallet shape used to populate form selectors (expense / income forms). */
export interface WalletOption {
  id: number
  name: string
  type: WalletType
}
