import { getTransfers } from '@/actions/monedex/transfers/transfers-actions'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import SelectableTransferCards from '@/components/monedex/transfers/selectable-transfer-cards'

export default async function TransfersPage() {
  const { ok, transfers, message } = await getTransfers()

  if (!ok) {
    return <div className="p-4 text-red-600">{message || 'Error al obtener transferencias'}</div>
  }

  return (
    <section className="container mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumbs breadcrumbs={[{ label: 'Transferencias', href: '/monedex/transfers', active: true }]} />
      </div>

      <SelectableTransferCards transfers={transfers as any} />
    </section>
  )
}
