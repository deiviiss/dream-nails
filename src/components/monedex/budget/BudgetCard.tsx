'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { createUpdateBudgetCategory } from '@/actions/monedex/budget/create-update-budget-category'
import { deleteBudgetCategory } from '@/actions/monedex/budget/delete-budget-category'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface BudgetCardProps {
  id: number
  name: string
  budgetAmount: number
  paidAmount: number
  difference: number
  differencePercentage: number
  expenseCategoryId: number
}

export function BudgetCard({
  id,
  name,
  budgetAmount,
  paidAmount,
  difference,
  differencePercentage,
  expenseCategoryId
}: BudgetCardProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editData, setEditData] = useState({
    name,
    budgetAmount: budgetAmount.toString(),
    expenseCategoryId
  })

  const isOverBudget = difference < 0
  const isPositive = difference >= 0

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({
      name,
      budgetAmount: budgetAmount.toString(),
      expenseCategoryId
    })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditData({
      name,
      budgetAmount: budgetAmount.toString(),
      expenseCategoryId
    })
  }

  const handleSaveEdit = async () => {
    if (!editData.name.trim() || !editData.budgetAmount) {
      toast.error('Por favor complete todos los campos')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createUpdateBudgetCategory({
        id,
        name: editData.name.trim(),
        amount: parseFloat(editData.budgetAmount),
        expense_category_id: editData.expenseCategoryId
      })

      if (result.ok) {
        toast.success('Categoría actualizada correctamente')
        setIsEditing(false)
        router.refresh() // Refresh the page data
      } else {
        toast.error(result.message || 'Error al actualizar la categoría')
      }
    } catch (error) {
      toast.error('Error inesperado al actualizar la categoría')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Está seguro de que desea eliminar esta categoría de presupuesto?')) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await deleteBudgetCategory(id)

      if (result.ok) {
        toast.success('Categoría eliminada correctamente')
        router.refresh() // Refresh the page data
      } else {
        toast.error(result.message || 'Error al eliminar la categoría')
      }
    } catch (error) {
      toast.error('Error inesperado al eliminar la categoría')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Card className="border rounded-xl w-full mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {isEditing
            ? (
              <Input
                value={editData.name}
                onChange={(e) => { handleInputChange('name', e.target.value) }}
                disabled={isSubmitting}
                className="text-base font-semibold text-monedex-secondary"
                placeholder="Nombre de la categoría"
              />)
            : (
              <CardTitle className="text-base font-semibold text-monedex-secondary">
                {name}
              </CardTitle>)}

          <div className="flex gap-1">
            {isEditing
              ? (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSaveEdit}
                    disabled={isSubmitting}
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <FiCheck className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                    className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                  >
                    <FiX className="h-4 w-4" />
                  </Button>
                </>)
              : (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEdit}
                    disabled={isSubmitting}
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </Button>
                </>)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Presupuesto asignado</span>
          {isEditing
            ? (
              <Input
                type="number"
                step="0.01"
                min="0"
                value={editData.budgetAmount}
                onChange={(e) => { handleInputChange('budgetAmount', e.target.value) }}
                disabled={isSubmitting}
                className="w-24 text-sm font-medium text-right"
                placeholder="0.00"
              />)
            : (
              <span className="text-sm font-medium">${budgetAmount.toFixed(2)}</span>)}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Cantidad pagada</span>
          <span className="text-sm font-medium text-green-600">${paidAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-sm text-muted-foreground">Diferencia</span>
          <div className="flex items-center gap-2">
            <span className={cn(
              'text-sm font-semibold',
              isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              ${difference.toFixed(2)}
            </span>
            <div className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-full text-xs',
              isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            )}>
              <span>
                {isPositive ? '↗' : '↘'}
              </span>
              <span>{Math.abs(differencePercentage).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {isOverBudget && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600 text-center">
              ⚠️ Sobrepasado en ${(Math.abs(difference)).toFixed(2)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
