import CategorysDetailsTable from '@/components/monedex/categories/table-details'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function CategoryExpensesPage(props: {
  searchParams: SearchParams
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams

  const query = String(searchParams.query) || ''
  const currentMonth = new Date().getMonth() + 1
  const month = Number(searchParams.month) || Number(currentMonth)

  return (
    <main>
      <CategorysDetailsTable query={query} month={month} />
    </main>
  )
}
