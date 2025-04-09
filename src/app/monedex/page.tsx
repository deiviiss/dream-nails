import CategoriesTotalTable from '@/components/monedex/categories/table-total'
import FilterMonth from '@/components/monedex/filter-month'
import TotalCredit from '@/components/monedex/total-credit'
import TotalAllExpenses from '@/components/monedex/total-general'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function HomePage(props: { searchParams: SearchParams }): Promise<JSX.Element> {
  const searchParams = await props.searchParams
  const query = String(searchParams.query || '')
  const currentMonth = new Date().getMonth() + 1
  const month = Number(searchParams.month || currentMonth)
  const year = Number(searchParams.year || new Date().getFullYear())

  return (

    <main>
      <div className='flex items-center justify-between gap-1 py-2'>
        <TotalAllExpenses query={query} month={month} year={year} />

        <TotalCredit month={month} year={year} />
      </div>
      <div className='flex flex-col gap-2'>
        <FilterMonth />
      </div>

      <CategoriesTotalTable month={month} year={year} />

    </main>
  )
}
