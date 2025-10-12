import SelectableExpenseCards from '@/components/monedex/selectable-expense-cards'
import { fetchFilteredExpenses } from '@/lib/data'
import { formatDateToLocal } from '@/lib/helpers'

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
      <div className="flex h-32 w-full items-center justify-center">
        <p className="text-gray-500">No se encontraron gastos</p>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className='flow-root'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0'>
              <div className='md:hidden'>
                <SelectableExpenseCards expenses={expenses} />
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
                      Categoría
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
                        </div>b
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
