import { getUserSessionServer } from '@/actions'
import { getAllWalletsSummary } from '@/actions/monedex/wallets/get-all-wallet-summary'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { MetricCard } from '@/components/monedex/wallets/MetricCard'
import { PhysicalAmountModal } from '@/components/monedex/wallets/physical-amount-modal'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function DashboardPage(props: { searchParams: SearchParams }): Promise<JSX.Element> {
  const searchParams = await props.searchParams
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const month = Number(searchParams.month) || Number(currentMonth)
  const year = Number(searchParams.year) || currentYear

  const user = await getUserSessionServer()
  const isAdmin = user?.role === 'admin'

  const { walletsSummary, globalSummary } = await getAllWalletsSummary({ month, year })

  if (!walletsSummary || !globalSummary) {
    return <div>Wallet not found</div>
  }

  const wallets = walletsSummary.map(w => ({
    id: w.id,
    name: w.name,
    balance: w.balance,
    excludeFromBalance: w.excludeFromBalance,
    change: w.change,
    difference: w.difference,
    differencePercentage: w.differencePercentage,
    physical: w.physical,
    type: w.type
  }))

  return (
    <section className="container mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center">
        <Breadcrumbs breadcrumbs={[{ label: 'Wallets', href: '/monedex/wallets', active: true }]} />
        {/* Physical Amount Modal Trigger - Admin only */}
        {isAdmin && (
          <div>
            <PhysicalAmountModal wallets={wallets} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Total"
          balance={globalSummary.totalBalance}
          change={globalSummary.change}
          difference={globalSummary.difference}
          differencePercentage={globalSummary.differencePercentage}
          physicalAmount={globalSummary.physical}
          type="total"
        />
        {walletsSummary.map(wallet => (
          <MetricCard
            key={wallet.id}
            title={wallet.name}
            balance={wallet.balance}
            change={wallet.change}
            difference={wallet.difference}
            differencePercentage={wallet.differencePercentage}
            physicalAmount={wallet.physical}
            type={wallet.type}
            excludeFromBalance={wallet.excludeFromBalance}
          />
        ))}
      </div>
    </section>
  )
}
