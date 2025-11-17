import { type Metadata } from 'next'
import { fetchTotalIcomesPages } from '@/actions/monedex/incomes/fetch-total-incomes-pages'
import { getIncomeByCategory } from '@/actions/monedex/incomes/get-income-by-category'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import FilterMonth from '@/components/monedex/filter-month'
import { CreateIncome } from '@/components/monedex/incomes/income-buttons'
import IncomeByCategorySection from '@/components/monedex/incomes/income-by-category'
import IncomesTable from '@/components/monedex/incomes/income-table'
import Pagination from '@/components/monedex/pagination'
import Search from '@/components/monedex/search'

export const metadata: Metadata = {
  title: 'Ingresos'
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function IncomesPage(props: {
  searchParams: SearchParams
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams
  const query = String(searchParams.query || '')
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const month = Number(searchParams.month || currentMonth)
  const year = Number(searchParams.year || currentYear)

  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchTotalIcomesPages(query, Number(month), Number(year))
  const { incomeByCategory, totalIncome } = await getIncomeByCategory(Number(month), Number(year))

  return (
    <main className='container mx-auto space-y-6'>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Ingresos', href: '/monedex/incomes', active: true }]}
      />

      <div className='flex flex-col gap-2'>
        <FilterMonth />
      </div>

      <IncomeByCategorySection incomeByCategory={incomeByCategory} totalIncome={totalIncome} />

      <div className='my-3 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Buscar gastos...' />
        <div className='hidden md:block'>
          <CreateIncome />
        </div>
      </div>

      <div className='flex flex-col gap-2 pt-5'>

        <IncomesTable query={query} currentPage={currentPage} month={month} year={year} />

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
