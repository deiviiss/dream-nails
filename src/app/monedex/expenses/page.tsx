import { type Metadata } from 'next'
import { Suspense } from 'react'

import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { CreateExpense } from '@/components/monedex/expenses/buttons'
import ExpensesTable from '@/components/monedex/expenses/table'
import FilterMounth from '@/components/monedex/filter-month'
import Pagination from '@/components/monedex/pagination'
import Search from '@/components/monedex/search'
import TotalAllExpenses from '@/components/monedex/total-general'
import { fetchExpensesPages } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Gastos'
}

export default async function ExpensesPage({
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

  const totalPages = await fetchExpensesPages(query, Number(month), Number(year))

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Gastos', href: '/monedex/expenses', active: true }]}
      />
      <div className='my-3 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Buscar gastos...' />
        <CreateExpense />
      </div>

      <div className='flex flex-col gap-2'>
        <FilterMounth />
      </div>

      <div className='flex flex-col gap-2'>

        <TotalAllExpenses query={query} month={month} year={year} />

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
