'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { createUpdateBudgetCategory } from '@/actions/monedex/budget/create-update-budget-category'
import { getExpenseCategories } from '@/actions/monedex/budget/get-expense-categories'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface BudgetCategoryFormProps {
  onSuccess?: () => void
}

export function BudgetCategoryForm({ onSuccess }: BudgetCategoryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expenseCategories, setExpenseCategories] = useState<Array<{ id: number, name: string, description: string | null }>>([])
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    expense_category_id: ''
  })

  // Load expense categories on component mount
  useEffect(() => {
    const loadExpenseCategories = async () => {
      try {
        const result = await getExpenseCategories()
        if (result.ok && result.expenseCategories) {
          setExpenseCategories(result.expenseCategories)
        }
      } catch (error) {
        console.error('Error loading expense categories:', error)
      }
    }
    loadExpenseCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.amount || !formData.expense_category_id) {
      toast.error('Por favor complete todos los campos')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createUpdateBudgetCategory({
        name: formData.name.trim(),
        amount: parseFloat(formData.amount),
        expense_category_id: parseInt(formData.expense_category_id)
      })

      if (result.ok) {
        toast.success('Categoría de presupuesto creada correctamente')
        setFormData({ name: '', amount: '', expense_category_id: '' })
        router.refresh() // Refresh the page data
        onSuccess?.()
      } else {
        toast.error(result.message || 'Error al crear la categoría')
      }
    } catch (error) {
      toast.error('Error inesperado al crear la categoría')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-monedex-primary">Nueva Categoría de Presupuesto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre de la categoría</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ej: Despensa, Transporte"
              value={formData.name}
              onChange={(e) => { handleChange('name', e.target.value) }}
              disabled={isSubmitting}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="expense_category">Categoría de gasto</Label>
            <Select
              value={formData.expense_category_id}
              onValueChange={(value) => { handleChange('expense_category_id', value) }}
              disabled={isSubmitting}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona una categoría de gasto" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount">Monto asignado ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => { handleChange('amount', e.target.value) }}
              disabled={isSubmitting}
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-monedex-tertiary hover:bg-monedex-tertiary/90 text-monedex-light"
          >
            {isSubmitting ? 'Creando...' : 'Crear Categoría'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
