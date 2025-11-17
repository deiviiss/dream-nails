'use client'

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
  return (
    <div className="space-y-4">

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
        {incomeByCategory.map((category) => (
          <Card key={category.categoryId} className="border rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-monedex-primary">{category.categoryName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(category.total)}</div>
              <div className="text-xs text-muted-foreground">Total por categoría</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
