import { fetchCreditExpenses } from '@/libs/data'
import { formatCurrency } from '@/libs/utils'

export default async function TotalCredit({
  query
}: {
  query: string
}): Promise<JSX.Element> {
  const totalCredit = await fetchCreditExpenses(query)

  return (
    <div className='w-full'>
      <div className='mt-6 flow-root text-end'>
        <h1>Crédito usado: {formatCurrency(totalCredit)}</h1>
      </div>
    </div>
  )
}
