import { getTransfers } from '@/actions/monedex/transfers/transfers-actions'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { Card, CardContent } from '@/components/ui/card'

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

      <div className="space-y-4">
        {transfers.map((t) => (
          <Card key={t.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-medium">{t.description || 'Sin descripción'}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(t.transfer_date).toLocaleDateString()} • De {t.fromWallet?.name} a {t.toWallet?.name}
                  </span>
                </div>
                <div className="text-lg font-semibold">${t.amount}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
