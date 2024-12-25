import { DeleteExpense, ReconciledExpense, UpdateExpense } from './buttons'
import { Spinner } from '@/components/ui/spinner'
import { fetchFilteredExpenses } from '@/lib/data'
import { formatDateToLocal, formatMethod, formatCurrency, formatWithRelation } from '@/lib/helpers'

export default async function ExpensesTable({
  query,
  currentPage,
  month,
  year
}: {
  query: string
  month: number
  year?: number
  currentPage: number
}): Promise<JSX.Element> {
  const currentYear = year || new Date().getFullYear()

  const expenses = await fetchFilteredExpenses(query, currentPage, month, currentYear)

  if (expenses.length === 0) {
    return (
      <Spinner name='gastos' color='text-monedex-light' />
    )
  }

  return (
    <div className='w-full'>
      <div className='flow-root'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0'>
              <div className='md:hidden'>
                {expenses?.map((expense) => (
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

                      {/*  buttons delete - update - reconciled */}
                      <div className='flex justify-end gap-2'>
                        <ReconciledExpense id={expense.id} reconciled={expense.is_reconciled} />
                        <UpdateExpense id={expense.id} />
                        <DeleteExpense id={expense.id} />
                      </div>
                    </div>
                    {/* body card */}
                    <div className='grid grid-cols-2 col-span-2 gap-2 border-b py-5'>

                      <div className='flex w-1/2 flex-col'>
                        <p className='text-xs'>Fecha</p>
                        <p className='font-medium'>
                          {expense.expense_date.toISOString().split('T')[0]}
                        </p>
                      </div>

                      <div className='flex w-1/2 flex-col'>
                        <p className='text-xs'>Categoría</p>
                        <p className='font-medium'>{expense.expense_category.name}</p>
                      </div>

                      <div className='flex w-1/2 flex-col'>
                        <p className='text-xs'>Método</p>
                        <p className='font-medium'>
                          {formatMethod(expense.method)}
                        </p>
                      </div>

                      <div className='flex w-1/2 flex-col'>
                        <p className='text-xs'>Con relación</p>
                        <p className='font-medium'>
                          {formatWithRelation(expense.with_relation)}
                        </p>
                      </div>

                      <div className='flex w-1/2 flex-col'>
                        <p className='text-xs'>Lugar</p>
                        <p className='font-medium'>{expense.place.name}</p>
                      </div>
                    </div>

                    <div className='py-2'>Creado por {expense.user.name}</div>

                  </div>
                ))}
              </div>
              <table className='hidden min-w-full rounded-md text-gray-900 md:table'>
                <thead className='rounded-md bg-gray-50 text-left text-sm font-normal'>
                  <tr>
                    <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                      Gasto
                    </th>
                    <th scope='col' className='px-3 py-5 font-medium'>
                      Cantidad
                    </th>
                    <th scope='col' className='px-3 py-5 font-medium'>
                      Método
                    </th>
                    <th scope='col' className='px-3 py-5 font-medium'>
                      Categoria
                    </th>
                    <th scope='col' className='px-4 py-5 font-medium'>
                      Fecha
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200 text-gray-900'>
                  {expenses.map((expense) => (
                    <tr key={expense.id} className='group'>
                      <td className='whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6'>
                        <div className='flex items-center gap-3'>
                          <p>{expense.name}</p>
                        </div>
                      </td>
                      <td className='whitespace-nowrap bg-white px-4 py-5 text-sm'>
                        {expense.amount}
                      </td>
                      <td className='whitespace-nowrap bg-white px-4 py-5 text-sm'>
                        {expense.method}
                      </td>
                      <td className='whitespace-nowrap bg-white px-4 py-5 text-sm'>
                        {expense.expense_category.name}
                      </td>
                      <td className='whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md'>
                        {formatDateToLocal(
                          expense.expense_date.toISOString(),
                          'es-Mx'
                        )}
                      </td>
                      <td>
                        <div className='flex justify-end gap-2'>
                          {/* <UpdateCustomer id={customer.id} />
                        <DeleteCustomer id={customer.id} /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
