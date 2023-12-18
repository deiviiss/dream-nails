import CategoriesTotalTable from '@/app/ui/monedex/categories/table-total'
import TotalCredit from '@/app/ui/monedex/total-credit'
import TotalAllExpenses from '@/app/ui/monedex/total-general'

export default async function HomePage({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}): Promise<JSX.Element> {
  const query = searchParams?.query || ''

  return (
    <main>
      <div className='flex items-center justify-between gap-1 py-2'>
        <TotalAllExpenses query={query} />

        <TotalCredit query={query} />
      </div>

      <CategoriesTotalTable />

    </main>
  )
}
