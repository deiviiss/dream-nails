import { Suspense } from 'react'

import Breadcrumbs from '@/app/ui/monedex/breadcrumbs'
import { CreateExpense } from '@/app/ui/monedex/expenses/buttons'
import ExpensesTable from '@/app/ui/monedex/expenses/table'
import TotalAllExpenses from '@/app/ui/monedex/expenses/total-general'
import Pagination from '@/app/ui/monedex/pagination'
import Search from '@/app/ui/monedex/search'

import { fetchExpensesPages } from '@/libs/data'

export default async function ExpensesPage({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}): Promise<JSX.Element> {
  const query = searchParams?.query || ''

  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchExpensesPages(query)

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

        <TotalAllExpenses query={query} />

        <Suspense key={`${query}${currentPage}`} fallback='Loading'>
          <ExpensesTable query={query} currentPage={currentPage} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
