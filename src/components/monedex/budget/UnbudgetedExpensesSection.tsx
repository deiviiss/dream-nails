'use client'

import SelectableUnbudgetedCards from './SelectableUnbudgetedCards'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UnbudgetedExpense {
  id: number
  name: string
  amount: number
  expense_date: Date
}

interface UnbudgetedExpensesCategory {
  categoryId: number
  categoryName: string
  total: number
  expenses: UnbudgetedExpense[]
}

interface UnbudgetedExpensesSectionProps {
  categories: UnbudgetedExpensesCategory[]
  total: number
}

export function UnbudgetedExpensesSection({
  categories,
  total
}: UnbudgetedExpensesSectionProps) {
  if (categories.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-monedex-light">Gastos Sin Presupuesto</h2>
          <h2 className="text-lg font-semibold text-monedex-light">0</h2>
        </div>
        <Card className="border rounded-xl">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No hay gastos sin presupuesto en este período</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-monedex-light">Gastos Sin Presupuesto</h2>
        <h2 className="text-lg font-semibold text-monedex-light">{categories.length} categorías</h2>
      </div>

      {/* Summary Cards by Category */}
      {/* Selectable summary cards by category (red) */}
      <SelectableUnbudgetedCards categories={categories} />

      {/* Detailed Table View */}
      <Card className="border rounded-xl mt-6">
        <CardHeader>
          <CardTitle className="text-base">Detalle de Gastos Sin Presupuesto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Categoría</th>
                  <th className="text-left py-2 px-2">Gasto</th>
                  <th className="text-left py-2 px-2">Fecha</th>
                  <th className="text-right py-2 px-2">Monto</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) =>
                  category.expenses.map((expense, idx) => (
                    <tr key={expense.id} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                      <td className="py-2 px-2">{category.categoryName}</td>
                      <td className="py-2 px-2">{expense.name}</td>
                      <td className="py-2 px-2">{new Date(expense.expense_date).toLocaleDateString('es-ES')}</td>
                      <td className="py-2 px-2 text-right font-semibold text-red-600">${expense.amount.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr className="border-t">
                  <td className="py-2 px-2 font-semibold">Total</td>
                  <td />
                  <td />
                  <td className="py-2 px-2 text-right font-semibold text-red-600">${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
