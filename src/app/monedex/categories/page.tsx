import { Suspense } from 'react'

import Breadcrumbs from '@/app/ui/monedex/breadcrumbs'
import { CreateCategory } from '@/app/ui/monedex/categories/buttons'
import CategoriesTable from '@/app/ui/monedex/categories/table'
import Pagination from '@/app/ui/monedex/pagination'
import Search from '@/app/ui/monedex/search'

import { fetchCategoriesPages } from '@/libs/data'

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

  const totalPages = await fetchCategoriesPages(query)

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Categorias', href: '/monedex/categories', active: true }]}
      />
      <div className='my-3 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Buscar categoria...' />
        <CreateCategory />
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
