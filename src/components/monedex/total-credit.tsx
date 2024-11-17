import { fetchCreditExpenses } from '@/lib/data'
import { formatCurrency } from '@/lib/helpers'

export default async function TotalCredit({
  month
}: {
  month: number
}): Promise<JSX.Element> {
  const totalCredit = await fetchCreditExpenses(month)

  return (
    <div className='flex w-full py-2'>
      <h1>Crédito usado: {formatCurrency(totalCredit)}</h1>
    </div>
  )
}
