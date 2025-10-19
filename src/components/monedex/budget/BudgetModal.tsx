'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { BudgetCategoryForm } from './BudgetCategoryForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface BudgetModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function BudgetModal({ open, onOpenChange }: BudgetModalProps) {
  const router = useRouter()

  const handleSuccess = () => {
    onOpenChange?.(false)
    router.refresh() // Refresh the page data after successful creation
  }

  // Handle escape key and outside click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange?.(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      return () => { document.removeEventListener('keydown', handleEscape) }
    }
  }, [open, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] text-start">
        <DialogHeader>
          <DialogTitle>Crear nueva categoría de presupuesto</DialogTitle>
          <DialogDescription>
            Agregue una nueva categoría para organizar sus presupuestos mensuales.
          </DialogDescription>
        </DialogHeader>
        <BudgetCategoryForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
