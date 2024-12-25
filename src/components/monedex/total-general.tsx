import { fetchAmountExpenses } from '@/lib/data'
import { formatCurrency } from '@/lib/helpers'

export default async function TotalAllExpenses({
  query,
  month,
  year
}: {
  query: string
  month: number
  year: number
}): Promise<JSX.Element> {
  const totalAmount = await fetchAmountExpenses(query, month, year)

  return (
    <div className='flex w-full py-5 text-monedex-light'>
      <h1>Total gastado: {formatCurrency(totalAmount)}</h1>
    </div>
  )
}
