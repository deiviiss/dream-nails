import { DeleteIncome, UpdateIncome } from './income-buttons'
import { fetchFilteredIncomes } from '@/actions/monedex/incomes/fetch-filtered-incomes'
import { Spinner } from '@/components/ui/spinner'
import { formatDateToLocal, formatMethod, formatCurrency } from '@/lib/helpers'

export default async function IncomesTable({
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

  const incomes = await fetchFilteredIncomes(query, currentPage, month, currentYear)
  console.log('incomes', incomes)
  if (incomes.length === 0) {
    return (
      <Spinner name='ingresos' color='text-monedex-light' />
    )
  }

  return (
    <div className='w-full'>
      <div className='flow-root'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0'>
              <div className='md:hidden'>
                {incomes?.map((income) => (
                  <div
                    key={income.id}
                    className='mb-2 w-full rounded-md bg-monedex-light p-4'
                  >
                    {/* title card */}
                    <div className='flex items-center justify-between border-b pb-4'>
                      <div>
                        <h1>{income.name}</h1>
                        <h2 className='text-sm text-monedex-muted'>
                          {formatCurrency(income.amount)}
                        </h2>
                      </div>

                      {/*  buttons delete - update */}
                      <div className='flex justify-end gap-2'>
                        <UpdateIncome id={income.id} />
                        <DeleteIncome id={income.id} />
                      </div>
                    </div>
                    {/* body card */}
                    <div className='grid grid-cols-2 col-span-2 gap-2 border-b py-5'>

                      <div className='flex w-1/2 flex-col'>
                        <p className='text-xs'>Fecha</p>
                        <p className='font-medium'>
                          {income.income_date.toISOString().split('T')[0]}
                        </p>
                      </div>

                      <div className='flex w-1/2 flex-col'>
                        <p className='text-xs'>Categoría</p>
                        <p className='font-medium'>{income.income_category.name}</p>
                      </div>

                      <div className='flex w-1/2 flex-col'>
                        <p className='text-xs'>Método</p>
                        <p className='font-medium'>
                          {formatMethod(income.method)}
                        </p>
                      </div>
                    </div>

                    <div className='py-2'>Creado por {income.user.name}</div>

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
                      Categoría
                    </th>
                    <th scope='col' className='px-4 py-5 font-medium'>
                      Fecha
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200 text-gray-900'>
                  {incomes.map((income) => (
                    <tr key={income.id} className='group'>
                      <td className='whitespace-nowrap py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6'>
                        <div className='flex items-center gap-3'>
                          <p>{income.name}</p>
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-4 py-5 text-sm'>
                        {income.amount}
                      </td>
                      <td className='whitespace-nowrap px-4 py-5 text-sm'>
                        {income.method}
                      </td>
                      <td className='whitespace-nowrap px-4 py-5 text-sm'>
                        {income.income_category.name}
                      </td>
                      <td className='whitespace-nowrap px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md'>
                        {formatDateToLocal(
                          income.income_date.toISOString(),
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
