import { type Metadata } from 'next'
import { Suspense } from 'react'

import { searchGlobalExpenses } from '@/actions/monedex/expenses/search-global-expenses'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import GlobalExpensesTable from '@/components/monedex/expenses/global-table'
import FilterMonth from '@/components/monedex/filter-month'
import GlobalTotalExpenses from '@/components/monedex/global-total-expenses'
import Pagination from '@/components/monedex/pagination'
import Search from '@/components/monedex/search'

export const metadata: Metadata = {
  title: 'Buscar Gastos Global'
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function SearchExpensesPage(props: {
  searchParams: SearchParams
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams
  const query = String(searchParams.query || '')
  const currentPage = Number(searchParams?.page) || 1

  // Get pagination info
  const result = await searchGlobalExpenses({ query, currentPage })
  const totalPages = result.ok && result.data ? result.data.totalPages : 1

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Buscar Gastos', href: '/monedex/search-expenses', active: true }]}
      />
      <div className='my-3 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Buscar gastos globalmente...' />
      </div>

      <div className='flex flex-col gap-2'>
        <FilterMonth />
      </div>

      <GlobalTotalExpenses query={query} currentPage={currentPage} />

      <div className='flex flex-col gap-2'>
        <Suspense key={`${query}${currentPage}`} fallback='Loading'>
          <GlobalExpensesTable query={query} currentPage={currentPage} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
