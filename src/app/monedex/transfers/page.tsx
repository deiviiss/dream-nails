import { getTransfers } from '@/actions/monedex/transfers/transfers-actions'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import Pagination from '@/components/monedex/pagination'
import Search from '@/components/monedex/search'
import SelectableTransferCards from '@/components/monedex/transfers/selectable-transfer-cards'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function TransfersPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const query = String(searchParams.query || '')
  const currentPage = Number(searchParams.page) || 1

  const { ok, transfers, totalPages, message } = await getTransfers(currentPage, 10, query)

  if (!ok) {
    return <div className="p-4 text-red-600">{message || 'Error al obtener transferencias'}</div>
  }

  return (
    <section className="container mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumbs breadcrumbs={[{ label: 'Transferencias', href: '/monedex/transfers', active: true }]} />
      </div>

      <div className="my-3 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar transferencias..." />
      </div>

      <SelectableTransferCards transfers={transfers as any} />

      {totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </section>
  )
}
