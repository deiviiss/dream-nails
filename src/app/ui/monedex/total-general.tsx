import { fetchAmountExpenses } from '@/libs/data'
import { formatCurrency } from '@/libs/utils'

export default async function TotalAllExpenses({
  query,
  month
}: {
  query: string
  month: number
}): Promise<JSX.Element> {
  const totalAmount = await fetchAmountExpenses(query, month)

  return (
    <div className='flex w-full py-2'>
      <h1>Total gastado: {formatCurrency(totalAmount)}</h1>
    </div>
  )
}
