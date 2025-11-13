'use client'

import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { BudgetCard } from './BudgetCard'
import { formatCurrency } from '@/lib/helpers'

interface BudgetCategoryItem {
  id: number
  name: string
  budgetAmount: number
  paidAmount: number
  difference: number
  differencePercentage: number
  expenseCategoryId: number
}

export default function SelectableBudgetCards({ categories, field = 'budgetAmount' }: { categories: BudgetCategoryItem[], field?: 'budgetAmount' | 'paidAmount' | 'difference' }) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const toggle = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selected = categories.filter(c => selectedIds.has(c.id))
  const total = selected.reduce((s, c) => s + (c as any)[field], 0)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => {
          const isSelected = selectedIds.has(cat.id)
          return (
            <div
              key={cat.id}
              onClick={(e) => { toggle(cat.id) }}
              className={`relative cursor-pointer p-0 ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
            >
              {/* selection badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                  <FiCheck className="h-3 w-3" />
                </div>
              )}

              <div className="p-0">
                <BudgetCard
                  id={cat.id}
                  name={cat.name}
                  budgetAmount={cat.budgetAmount}
                  paidAmount={cat.paidAmount}
                  difference={cat.difference}
                  differencePercentage={cat.differencePercentage}
                  expenseCategoryId={cat.expenseCategoryId}
                />
              </div>
            </div>
          )
        })}
      </div>

      {selectedIds.size > 0 && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-20 mb-4 w-[90%] md:w-auto rounded-md bg-white p-4 border shadow-md">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-medium">{selectedIds.size} {selectedIds.size === 1 ? 'categoría seleccionada' : 'categorías seleccionadas'}</p>
              <p className="text-lg font-bold">{formatCurrency(total)}</p>
            </div>
            <button className="text-sm text-muted-foreground underline" onClick={() => { setSelectedIds(new Set()) }}>Limpiar selección</button>
          </div>
        </div>
      )}
    </div>
  )
}
