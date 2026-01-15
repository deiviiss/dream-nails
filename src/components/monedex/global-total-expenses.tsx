import { searchGlobalExpenses } from '@/actions/monedex/expenses/search-global-expenses'
import { formatCurrency } from '@/lib/helpers'

export default async function GlobalTotalExpenses({
  query,
  currentPage
}: {
  query: string
  currentPage: number
}): Promise<JSX.Element> {
  const result = await searchGlobalExpenses({ query, currentPage })

  if (!result.ok || !result.data) {
    return (
      <div className='flex w-full py-5 text-monedex-light'>
        <h1>Error al cargar totales</h1>
      </div>
    )
  }

  const { totalAmount, totalCount } = result.data

  return (
    <div className='flex w-full py-5 text-monedex-light'>
      <div className='flex flex-col gap-1'>
        <h1>Total gastado: {formatCurrency(totalAmount)}</h1>
        <p className='text-sm text-monedex-light'>
          {totalCount} gasto{totalCount !== 1 ? 's' : ''} encontrado{totalCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
