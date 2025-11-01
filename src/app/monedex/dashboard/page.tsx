import { getAllWalletsSummary } from '@/actions/monedex/wallets/get-all-wallet-summary'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { MetricCard } from '@/components/monedex/wallets/MetricCard'
import { PhysicalAmountModal } from '@/components/monedex/wallets/physical-amount-modal'
type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function DashboardPage(props: {
  searchParams: SearchParams
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const month = Number(searchParams.month) || Number(currentMonth)
  const year = Number(searchParams.year) || currentYear

  const { walletsSummary, globalSummary } = await getAllWalletsSummary({ month, year })

  if (!walletsSummary || !globalSummary) {
    return <div>Wallet not found</div>
  }

  const wallets = walletsSummary.map(wallet => {
    return {
      id: wallet.id,
      name: wallet.name,
      balance: wallet.balance
    }
  })

  return (
    <section className="container mx-auto space-y-6">
      <div className='flex justify-between items-center'>
        <Breadcrumbs
          breadcrumbs={[{ label: 'Wallets', href: '/monedex/wallets', active: true }]}
        />

        {/* <div className='flex flex-col gap-2 w-full text-monedex-secondary'>
          <FilterMonth /> */}
        {/* </div> */}

        {/* Physical Amount Modal Trigger */}
        <div>
          <PhysicalAmountModal wallets={wallets} />
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 ">
        <MetricCard title="Total" balance={globalSummary.totalBalance} change={{ value: globalSummary.change.value, label: globalSummary.change.label }} difference={globalSummary.difference} differencePercentage={globalSummary.differencePercentage} physicalAmount={globalSummary.physical} type="total" />
        {
          walletsSummary.map((wallet) => (
            <div key={wallet.id}>
              <MetricCard title={wallet.name} balance={wallet.balance} change={wallet.change} type={wallet.type} difference={wallet.difference} physicalAmount={wallet.physical} differencePercentage={wallet.differencePercentage} />
            </div>
          ))
        }
      </div>

    </section>
  )
}
