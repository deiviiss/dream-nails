import { type Metadata } from 'next'
import { Suspense } from 'react'

import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { CreateExpense } from '@/components/monedex/expenses/buttons'
import ExpensesTable from '@/components/monedex/expenses/table'
import FilterMonth from '@/components/monedex/filter-month'
import Pagination from '@/components/monedex/pagination'
import Search from '@/components/monedex/search'
import TotalAllExpenses from '@/components/monedex/total-general'
import { fetchExpensesPages } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Gastos'
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function ExpensesPage(props: {
  searchParams: SearchParams
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams
  const query = String(searchParams.query || '')
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const month = Number(searchParams.month || currentMonth)
  const year = Number(searchParams.year || currentYear)

  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchExpensesPages(query, Number(month), Number(year))

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Gastos', href: '/monedex/expenses', active: true }]}
      />
      <div className='my-3 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Buscar gastos...' />
        <div className='hidden md:block'>
          <CreateExpense />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <FilterMonth />
      </div>

      <TotalAllExpenses query={query} month={month} year={year} />

      <div className='flex flex-col gap-2'>

        <Suspense key={`${query}${currentPage}`} fallback='Loading'>
          <ExpensesTable query={query} currentPage={currentPage} month={month} year={year} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
