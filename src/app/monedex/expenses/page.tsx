import { type Metadata } from 'next'
import { Suspense } from 'react'

import Breadcrumbs from '@/app/ui/monedex/breadcrumbs'
import { CreateExpense } from '@/app/ui/monedex/expenses/buttons'
import ExpensesTable from '@/app/ui/monedex/expenses/table'
import FilterMounth from '@/app/ui/monedex/filter-month'
import Pagination from '@/app/ui/monedex/pagination'
import Search from '@/app/ui/monedex/search'
import TotalAllExpenses from '@/app/ui/monedex/total-general'
import { fetchExpensesPages } from '@/libs/data'

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
  }
}): Promise<JSX.Element> {
  const query = searchParams?.query || ''
  const currentMonth = new Date().getMonth() + 1
  const month = searchParams?.month || Number(currentMonth)

  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchExpensesPages(query, Number(month))

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

        <TotalAllExpenses query={query} month={month} />

        <Suspense key={`${query}${currentPage}`} fallback='Loading'>
          <ExpensesTable query={query} currentPage={currentPage} month={month} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
