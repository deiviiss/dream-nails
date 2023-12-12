import CategorysDetailsTable from '@/app/ui/monedex/expenses/table-categories-details'

export default async function CategoryDetailsPage({
  searchParams
}: {
  searchParams?: {
    query?: string
  }
}): Promise<JSX.Element> {
  const query = searchParams?.query || ''

  return (
    <main>
      <CategorysDetailsTable query={query} />
    </main>
  )
}
