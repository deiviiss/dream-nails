import { fetchAmountExpenses } from '@/libs/data'
import { formatCurrency } from '@/libs/utils'

export default async function TotalAllExpenses({
  query
}: {
  query: string
}): Promise<JSX.Element> {
  const totalAmount = await fetchAmountExpenses(query)

  return (
    <div className='w-full'>
      <div className='mt-6 flow-root text-end'>
        <h1>Total gastado: {formatCurrency(totalAmount)}</h1>
      </div>
    </div>
  )
}
