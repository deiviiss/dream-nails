import CategoriesTotalTable from '@/app/ui/monedex/categories/table-total'
import FilterMonth from '@/app/ui/monedex/filter-month'
import TotalCredit from '@/app/ui/monedex/total-credit'
import TotalAllExpenses from '@/app/ui/monedex/total-general'

export default async function HomePage({
  searchParams
}: {
  searchParams?: {
    query?: string
    month?: number
    page?: string
  }
}): Promise<JSX.Element> {
  const query = searchParams?.query || ''
  const currentMonth = new Date().getMonth() + 1
  const month = searchParams?.month || Number(currentMonth)

  return (
    <main>
      <div className='flex items-center justify-between gap-1 py-2'>
        <TotalAllExpenses query={query} month={month} />

        <TotalCredit month={month} />
      </div>

      <div className='flex flex-col gap-2'>
        <FilterMonth />
      </div>

      <CategoriesTotalTable month={month} />

    </main>
  )
}
