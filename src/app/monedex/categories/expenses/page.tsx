import CategorysDetailsTable from '@/app/ui/monedex/categories/table-details'

export default async function CategoryExpensesPage({
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
