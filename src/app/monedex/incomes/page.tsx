import { type Metadata } from 'next'
import { Suspense } from 'react'
import { fetchTotalIcomesPages } from '@/actions/monedex/incomes/fetch-total-incomes-pages'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import FilterMonth from '@/components/monedex/filter-month'
import { CreateIncome } from '@/components/monedex/incomes/income-buttons'
import IncomesTable from '@/components/monedex/incomes/income-table'
import Pagination from '@/components/monedex/pagination'
import Search from '@/components/monedex/search'

export const metadata: Metadata = {
  title: 'Ingresos'
}

export default async function IncomesPage({
  searchParams
}: {
  searchParams?: {
    query?: string
    month?: number
    page?: string
    year?: number
  }
}): Promise<JSX.Element> {
  const query = searchParams?.query || ''
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const month = searchParams?.month || Number(currentMonth)
  const year = searchParams?.year || currentYear

  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchTotalIcomesPages(query, Number(month), Number(year))

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Ingresos', href: '/monedex/incomes', active: true }]}
      />
      <div className='my-3 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Buscar gastos...' />
        <div className='hidden md:block'>
          <CreateIncome />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <FilterMonth />
      </div>

      <div className='flex flex-col gap-2 pt-5'>
        <Suspense key={`${query}${currentPage}`} fallback='Loading'>
          <IncomesTable query={query} currentPage={currentPage} month={month} year={year} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
