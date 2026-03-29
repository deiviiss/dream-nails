'use client'

import Link from 'next/link'
import { useState } from 'react'
import { TbListDetails } from 'react-icons/tb'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/helpers'

interface CategoryExpenseSummary {
  expense_category_id: number
  _sum: {
    amount: number | null
  }
  _count: number
  category: {
    name: string
  } | null
}

export default function SelectableCategoryCards({
  expensesByCategory,
  month
}: {
  expensesByCategory: CategoryExpenseSummary[]
  month: number
}) {
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

  const selectedCategories = expensesByCategory.filter((item) => selectedIds.has(item.expense_category_id))
  const totalSelected = selectedCategories.length
  const totalAmount = selectedCategories.reduce((sum, item) => sum + (item._sum.amount ?? 0), 0)

  return (
    <div className="relative w-full">
      {/* Selection summary */}
      {totalSelected > 0 && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[90%] -translate-x-1/2 rounded-xl bg-blue-600/95 p-4 text-white shadow-2xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-normal text-blue-100 tracking-wider">
                {totalSelected} {totalSelected === 1 ? 'Categoría seleccionada' : 'Categorías seleccionadas'}
              </span>
              <span className="text-xl font-medium tracking-tight">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { setSelectedIds(new Set()) }}
              className="bg-white/20 text-white hover:bg-white/30 border-none px-4 rounded-full transition-colors"
            >
              Limpiar
            </Button>
          </div>
        </div>
      )}

      {/* Category cards */}
      <div className="flex flex-col gap-3">
        {expensesByCategory.map((expense) => {
          const isSelected = selectedIds.has(expense.expense_category_id)
          return (
            <div
              key={expense.expense_category_id}
              onClick={() => { toggleSelection(expense.expense_category_id) }}
              className={`group relative overflow-hidden rounded-2xl p-5 cursor-pointer transition-all duration-300 ${isSelected
                ? 'bg-blue-50 border-2 border-blue-500 shadow-lg ring-4 ring-blue-500/10'
                : 'bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md'
                }`}
            >
              {/* Category Icon/Color Indicator if exists, here we use a subtle left border or indicator */}
              <div className={`absolute top-0 left-0 h-full w-1.5 transition-colors ${isSelected ? 'bg-blue-500' : 'bg-gray-100 group-hover:bg-blue-200'}`} />

              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className={`text-base font-medium transition-colors ${isSelected ? 'text-blue-900' : 'text-gray-900 group-hover:text-blue-700'}`}>
                    {expense.category?.name}
                  </h3>

                  <Link
                    href={`/monedex/categories/expenses?query=${expense.expense_category_id}&month=${month}`}
                    onClick={(e) => { e.stopPropagation() }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${isSelected
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                  >
                    <TbListDetails className="h-5 w-5" />
                  </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className={`text-[11px] font-medium capitalize tracking-widest ${isSelected ? 'text-blue-600/70' : 'text-gray-400'}`}>
                      Total
                    </span>
                    <span className={`text-base font-medium tracking-tight ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                      {formatCurrency(expense._sum.amount ?? 0)}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className={`text-[11px] font-medium capitalize tracking-widest ${isSelected ? 'text-blue-600/70' : 'text-gray-400'}`}>
                      Transacciones
                    </span>
                    <span className={`text-base font-medium tracking-tight ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                      {expense._count ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
