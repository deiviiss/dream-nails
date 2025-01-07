import Link from 'next/link'
import { TbListDetails } from 'react-icons/tb'
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
    <div className='flex flex-col items-center justify-between gap-1 py-2'>

      {expensesByCategory.map((expense) => (
        <div
          key={expense.expense_category_id}
          className='mb-2 w-full rounded-md bg-white p-4'
        >
          {/* title card */}
          <div className='flex items-center justify-between border-b pb-4'>
            <h1>{expense.category?.name}</h1>

            {/*  buttons details */}
            <Link href={`/monedex/categories/expenses?query=${expense.expense_category_id}&month=${month}`}>
              <TbListDetails />
            </Link>

          </div>
          {/* body card */}
          <div className='flex w-full items-center border-b py-5'>
            <div className='flex w-1/2 flex-col'>
              <p className='text-xs'>Total</p>
              <p className='font-medium'>
                {formatCurrency(expense._sum.amount ?? 0)}
              </p>
            </div>
            <div className='flex w-1/2 flex-col'>
              <p className='text-xs'>Transacciones</p>
              <p className="font-medium">
                {expense._count ?? 0}
              </p>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  )
}
