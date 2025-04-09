import { type Metadata } from 'next'
import { Suspense } from 'react'

import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { CreateCategory } from '@/components/monedex/categories/buttons'
import CategoriesTable from '@/components/monedex/categories/table'
import Pagination from '@/components/monedex/pagination'
import Search from '@/components/monedex/search'

import { fetchCategoriesPages } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Categorías de gastos'
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function ExpensesPage(props: {
  searchParams: SearchParams
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams

  const query = String(searchParams.query) || ''

  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchCategoriesPages(query)

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Categorías', href: '/monedex/categories', active: true }]}
      />
      <div className='my-3 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Buscar categoría...' />
        <div className='hidden md:block'>
          <CreateCategory />
        </div>
      </div>

      <div className='flex flex-col gap-2'>

        <Suspense key={`${query}${currentPage}`} fallback='Loading'>
          <CategoriesTable query={query} currentPage={currentPage} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
