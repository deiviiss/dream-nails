'use client'

import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/helpers'
interface UnbudgetedExpense {
  id: number
  name: string
  amount: number
  expense_date: Date
}

interface UnbudgetedCategory {
  categoryId: number
  categoryName: string
  total: number
  expenses: UnbudgetedExpense[]
}

export default function SelectableUnbudgetedCards({ categories }: { categories: UnbudgetedCategory[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const toggle = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selected = categories.filter(c => selectedIds.has(c.categoryId))
  const total = selected.reduce((s, c) => s + c.total, 0)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => {
          const isSelected = selectedIds.has(cat.categoryId)
          return (
            <div
              key={cat.categoryId}
              onClick={() => { toggle(cat.categoryId) }}
              className={`relative cursor-pointer rounded-xl h-fit p-0 ${isSelected ? 'ring-2 ring-red-500' : ''}`}
            >
              {/* selection badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">
                  <FiCheck className="h-3 w-3" />
                </div>
              )}

              <div className="p-0">
                <Card className="border rounded-xl w-full mx-auto h-64 flex flex-col overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-monedex-secondary">{cat.categoryName}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto space-y-3">
                    <div className="text-2xl font-bold text-red-600">{formatCurrency(cat.total)}</div>
                    <div className="text-xs text-muted-foreground">
                      {cat.expenses.length} transacción{cat.expenses.length !== 1 ? 'es' : ''}
                    </div>

                    {/* Expenses list: only name + amount, limited height */}
                    <div className="mt-3 pt-3 border-t">
                      <div className="space-y-2 max-h-36 overflow-y-auto text-xs">
                        {cat.expenses.map((expense) => (
                          <div key={expense.id} className="flex items-center justify-between">
                            <div className="flex-1 pr-4">
                              <span className="font-medium truncate block">{expense.name}</span>
                            </div>
                            <div className="font-semibold text-red-600 whitespace-nowrap">
                              {formatCurrency(expense.amount)}
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute bottom-0 left-0 right-0 h-7 pointer-events-none bg-gradient-to-t from-white to-transparent" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        })}
      </div>

      {selectedIds.size > 0 && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-20 mb-4 w-[90%] md:w-auto rounded-md bg-white p-4 border shadow-md">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-medium text-red-700">{selectedIds.size} {selectedIds.size === 1 ? 'categoría seleccionada' : 'categorías seleccionadas'}</p>
              <p className="text-lg font-bold text-red-600">{formatCurrency(total)}</p>
            </div>
            <button className="text-sm text-muted-foreground underline" onClick={() => { setSelectedIds(new Set()) }}>Limpiar selección</button>
          </div>
        </div>
      )}
    </div>
  )
}
