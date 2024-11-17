import CategorysDetailsTable from '@/components/monedex/categories/table-details'

export default async function CategoryExpensesPage({
  searchParams
}: {
  searchParams?: {
    query?: string
    month?: number
  }
}): Promise<JSX.Element> {
  const query = searchParams?.query || ''
  const currentMonth = new Date().getMonth() + 1
  const month = Number(searchParams?.month) || Number(currentMonth)

  return (
    <main>
      <CategorysDetailsTable query={query} month={month} />
    </main>
  )
}
