'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/helpers'

interface IncomeCategory {
  categoryId: number
  categoryName: string
  total: number
}

interface IncomeByCategoryProps {
  incomeByCategory: IncomeCategory[]
  totalIncome: number
}

export default function IncomeByCategorySection({ incomeByCategory, totalIncome }: IncomeByCategoryProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const selectedCategories = incomeByCategory.filter((cat) => selectedIds.has(cat.categoryId))
  const totalSelected = selectedCategories.length
  const totalAmount = selectedCategories.reduce((sum, cat) => sum + cat.total, 0)

  return (
    <div className="space-y-4 relative pb-20">
      {/* Selection summary */}
      {totalSelected > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 mx-4 mb-4 md:mx-auto md:max-w-2xl rounded-md bg-blue-50 p-4 border border-blue-200 shadow-md">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-blue-900">
                {totalSelected} {totalSelected === 1 ? 'categoría seleccionada' : 'categorías seleccionadas'}
              </p>
              <p className="text-lg font-bold text-blue-900">{formatCurrency(totalAmount)}</p>
            </div>
            <Button
              variant="link"
              onClick={() => { setSelectedIds(new Set()) }}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Limpiar selección
            </Button>
          </div>
        </div>
      )}

      {incomeByCategory.length > 0 && (
        <Card className="border rounded-xl bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Resumen Total de Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
            <div className="text-sm text-muted-foreground">
              {incomeByCategory.length} {incomeByCategory.length === 1 ? 'categoría' : 'categorías'}
            </div>
          </CardContent>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {incomeByCategory.map((category) => {
          const isSelected = selectedIds.has(category.categoryId)
          return (
            <Card
              key={category.categoryId}
              onClick={() => { toggleSelection(category.categoryId) }}
              className={`border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-2 border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className={`text-base ${isSelected ? 'text-blue-700' : 'text-monedex-primary'}`}>{category.categoryName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className={`text-2xl font-bold ${isSelected ? 'text-blue-600' : 'text-green-600'}`}>{formatCurrency(category.total)}</div>
                <div className="text-xs text-muted-foreground">Total por categoría</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
