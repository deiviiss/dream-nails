import { type Metadata } from 'next'
import { Suspense } from 'react'
import { getTotalPlacesPages } from '@/actions/monedex/places/get-total-places-pages'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import Pagination from '@/components/monedex/pagination'
import { CreatePlace } from '@/components/monedex/places/place-buttons'
import PlaceTable from '@/components/monedex/places/place-table'
import Search from '@/components/monedex/search'

export const metadata: Metadata = {
  title: 'Ingresos'
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function PlacesPage(props: {
  searchParams: SearchParams
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams
  const query = String(searchParams.query) || ''

  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await getTotalPlacesPages(query)

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Lugares', href: '/monedex/places', active: true }]}
      />
      <div className='my-3 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Buscar lugar...' />
        <div className='hidden md:block'>
          <CreatePlace />
        </div>
      </div>

      <div className='flex flex-col gap-2 pt-5'>
        <Suspense key={`${query}${currentPage}`} fallback='Loading'>
          <PlaceTable query={query} currentPage={currentPage} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  )
}
