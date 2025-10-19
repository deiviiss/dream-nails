'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { createUpdateBudgetCategory } from '@/actions/monedex/budget/create-update-budget-category'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface BudgetCategoryFormProps {
  onSuccess?: () => void
}

export function BudgetCategoryForm({ onSuccess }: BudgetCategoryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    amount: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.amount) {
      toast.error('Por favor complete todos los campos')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createUpdateBudgetCategory({
        name: formData.name.trim(),
        amount: parseFloat(formData.amount)
      })

      if (result.ok) {
        toast.success('Categoría de presupuesto creada correctamente')
        setFormData({ name: '', amount: '' })
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
