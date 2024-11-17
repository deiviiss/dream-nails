import { DeleteExpense, UpdateExpense } from '@/components/monedex/expenses/buttons'
import { fetchExpenseByCategory } from '@/lib/data'
import { formatMethod, formatCurrency } from '@/lib/helpers'

export default async function CategorysDetailsTable({
  query,
  month
}: {
  query: string
  month: number
}): Promise<JSX.Element> {
  const expensesByCategory = await fetchExpenseByCategory(Number(query), month)

  return (
    <div className='flex flex-col items-center justify-between gap-1 py-2'>

      {expensesByCategory.map((expense) => (
        <div
          key={expense.id}
          className='mb-2 w-full rounded-md bg-white p-4'
        >
          {/* title card */}
          <div className='flex items-center justify-between border-b pb-4'>
            <div>
              <h1>{expense.name}</h1>
              <h2 className='text-sm text-gray-500'>
                {formatCurrency(expense.amount)}
              </h2>
            </div>

            {/*  buttons delete - update */}
            <div className='flex justify-end gap-2'>
              <UpdateExpense id={expense.id} />
              <DeleteExpense id={expense.id} />
            </div>
          </div>
          {/* body card */}
          <div className='flex w-full items-center justify-between border-b py-5'>
            <div className='flex w-1/2 flex-col'>
              <p className='text-xs'>Fecha</p>
              <p className='font-medium'>
                {expense.expense_date.toISOString().split('T')[0]}
              </p>
            </div>
            <div className='flex w-1/2 flex-col'>
              <p className='text-xs'>Método</p>
              <p className="font-medium">
                {formatMethod(expense.method)}
              </p>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  )
}
