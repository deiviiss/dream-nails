import TotalCredit from '@/app/ui/monedex/expenses/total-credit'
import TotalAllExpenses from '@/app/ui/monedex/expenses/total-general'
import { fetchTotalAmountByCategory } from '@/libs/data'
import { formatCurrency } from '@/libs/utils'

export default async function HomePage({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}): Promise<JSX.Element> {
  const query = searchParams?.query || ''
  const categories = await fetchTotalAmountByCategory(query)

  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[{ label: 'Resume de gastos', href: '/monedex', active: true }]}
      /> */}
      <div className='flex items-center justify-between gap-1 py-2'>
        <TotalAllExpenses query={query} />

        <TotalCredit query={query} />
      </div>

      <div>
        {
          categories.map((category) => (
            <div key={category.category_id} className='flex gap-2'>
              <h2>{category.Category?.name}</h2>
              <p>{formatCurrency(category._sum.amount ? category._sum.amount : 0)}</p>
            </div>
          ))

        }
      </div>

    </main>
  )
}
