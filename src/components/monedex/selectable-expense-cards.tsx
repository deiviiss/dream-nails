'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { DeleteExpense, ReconciledExpense, UpdateExpense } from '@/components/monedex/expenses/buttons'
import { type ExpenseWithCategoryAndUserAndPlace } from '@/interfaces/Expense'
import { formatCurrency, formatMethod, formatWithRelation } from '@/lib/helpers'

export default function SelectableExpenseCards({ expenses }: { expenses: ExpenseWithCategoryAndUserAndPlace[] }) {
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

  const selectedExpenses = expenses.filter((expense) => selectedIds.has(expense.id))
  const totalSelected = selectedExpenses.length
  const totalAmount = selectedExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="relative h-full overflow-y-auto">
      {/* Selection summary */}
      {totalSelected > 0 && (
        <div className="fixed bottom-0 z-10 mb-4 rounded-md bg-blue-50 p-4 border border-blue-200 shadow-md ">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-blue-900">
                {totalSelected} {totalSelected === 1 ? 'gasto seleccionado' : 'gastos seleccionados'}
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

      {/* Expense cards */}
      {expenses?.map((expense) => {
        const isSelected = selectedIds.has(expense.id)
        return (
          <div
            key={expense.id}
            onClick={() => { toggleSelection(expense.id) }}
            className={`mb-2 w-full rounded-md bg-white p-4 cursor-pointer transition-all ${isSelected ? 'border-2 border-blue-500 bg-blue-50' : 'border border-gray-200 hover:border-gray-300'
              }`}
          >
            {/* title card */}
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h1 className={isSelected ? 'font-semibold' : ''}>{expense.name}</h1>
                <h2 className={`text-sm ${isSelected ? 'text-blue-700 font-medium' : 'text-gray-500'}`}>
                  {formatCurrency(expense.amount)}
                </h2>
              </div>

              {/* buttons delete - update - reconciled */}
              <div className="flex justify-end gap-2" onClick={(e) => { e.stopPropagation() }}>
                <ReconciledExpense id={expense.id} reconciled={expense.is_reconciled} />
                <UpdateExpense id={expense.id} />
                <DeleteExpense id={expense.id} />
              </div>
            </div>

            {/* body card */}
            <div className="grid grid-cols-2 col-span-2 gap-2 border-b py-5">
              <div className="flex w-1/2 flex-col">
                <p className="text-xs">Fecha</p>
                <p className="font-medium">{expense.expense_date.toISOString().split('T')[0]}</p>
              </div>

              <div className="flex w-1/2 flex-col">
                <p className="text-xs">Categoría</p>
                <p className="font-medium">{expense.expense_category.name}</p>
              </div>

              <div className="flex w-1/2 flex-col">
                <p className="text-xs">Método</p>
                <p className="font-medium">{formatMethod(expense.method)}</p>
              </div>

              <div className="flex w-1/2 flex-col">
                <p className="text-xs">Con relación</p>
                <p className="font-medium">{formatWithRelation(expense.with_relation)}</p>
              </div>

              <div className="flex w-1/2 flex-col">
                <p className="text-xs">Lugar</p>
                <p className="font-medium">{expense.place.name}</p>
              </div>
            </div>

            <div className="py-2">Creado por {expense.user.name}</div>
          </div>
        )
      })}
    </div>
  )
}
