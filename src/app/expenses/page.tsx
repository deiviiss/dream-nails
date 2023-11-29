import { Suspense } from 'react'
import Breadcrumbs from '../ui/Breadcrumbs'
import { CreateExpense } from '../ui/expenses/buttons'
import Search from '../ui/search'
import ExpensesTable from '@/app/ui/expenses/table'

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

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Gastos', href: '/expenses', active: true }]}
      />
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Buscar gastos...' />
        <CreateExpense />
      </div>
      <div className='flex flex-col gap-2'>
        <Suspense key={`${query}${currentPage}`} fallback='Loading'>
          <ExpensesTable query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  )
}
