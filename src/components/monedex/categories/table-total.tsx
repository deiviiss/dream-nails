import Link from 'next/link'
import { TbListDetails } from 'react-icons/tb'
import SelectableCategoryCards from './selectable-category-cards'
import { Spinner } from '@/components/ui/spinner'
import { fetchTotalAmountByCategory } from '@/lib/data'
import { formatCurrency } from '@/lib/helpers'

export default async function CategoriesTotalTable({
  month,
  year
}: {
  month: number
  year: number
}): Promise<JSX.Element> {
  const expensesByCategory = await fetchTotalAmountByCategory(month, year)

  if (expensesByCategory.length === 0) {
    return (
      <Spinner name='gastos por categoría' color='text-monedex-light' />
    )
  }

  return (
    <div className='w-full py-2'>
      {/* Mobile view with selection functionality */}
      <div className='md:hidden'>
        <SelectableCategoryCards expensesByCategory={expensesByCategory} month={month} />
      </div>

      {/* Desktop view with static cards (no selection) */}
      <div className='hidden md:flex md:flex-col md:gap-3'>
        {expensesByCategory.map((expense) => (
          <div
            key={expense.expense_category_id}
            className='group relative overflow-hidden rounded-xl bg-white p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300'
          >
            <div className="absolute top-0 left-0 h-full w-1 bg-gray-100 group-hover:bg-blue-400 transition-colors" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                  {expense.category?.name}
                </h3>
                <div className="mt-2 flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold capitalize tracking-wider text-gray-400">Total</span>
                    <span className="text-base font-semibold text-gray-900">{formatCurrency(expense._sum.amount ?? 0)}</span>
                  </div>
                  <div className="flex flex-col border-l border-gray-100 pl-6">
                    <span className="text-[10px] font-bold capitalize tracking-wider text-gray-400">Transacciones</span>
                    <span className="text-base font-semibold text-gray-900">{expense._count ?? 0}</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/monedex/categories/expenses?query=${expense.expense_category_id}&month=${month}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                <TbListDetails className="h-5 w-5" />
                2              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
