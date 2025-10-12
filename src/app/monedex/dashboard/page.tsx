import { IoWalletOutline } from 'react-icons/io5'
import { getAllWalletsSummary } from '@/actions/monedex/wallets/get-all-wallet-summary'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { CategoryInsights } from '@/components/monedex/dashboard/category-insights'
import { DashboardHeader } from '@/components/monedex/dashboard/dashboard-header'
import { ExpenseCategoryPieChart } from '@/components/monedex/dashboard/expense-category-pie-chart'
import { ExpenseIncomeChart } from '@/components/monedex/dashboard/expense-income-chart'
import { ExpenseManagement } from '@/components/monedex/dashboard/expense-management'
import { IncomeInsights } from '@/components/monedex/dashboard/income-insights'
import { SummaryCard } from '@/components/monedex/dashboard/summary-card'
import { TopExpensesBarChart } from '@/components/monedex/dashboard/top-expenses-bar-chart'
import FilterMonth from '@/components/monedex/filter-month'
import { MetricCard } from '@/components/monedex/wallets/MetricCard'
import { PhysicalAmountModal } from '@/components/monedex/wallets/physical-amount-modal'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

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
    <section className="container mx-auto p-4 space-y-6">
      <Breadcrumbs
        breadcrumbs={[{ label: 'Wallets', href: '/monedex/wallets', active: true }]}
      />

      <div className='flex flex-col gap-2 text-monedex-secondary'>
        <FilterMonth />
      </div>

      {/* Physical Amount Modal Trigger */}
      <div className="flex justify-end">
        <PhysicalAmountModal wallets={wallets} />
      </div>

      <>
        {/* Desktop view */}
        <div className="hidden md:grid md:grid-cols-2 gap-4">
          <MetricCard title="Total" balance={globalSummary.totalBalance} change={{ value: globalSummary.change.value, label: globalSummary.change.label }} difference={globalSummary.difference} differencePercentage={globalSummary.differencePercentage} physicalAmount={globalSummary.physical} type="total" />
          {
            walletsSummary.map((wallet) => (
              <div key={wallet.id}>
                <MetricCard title={wallet.name} balance={wallet.balance} change={wallet.change} type={wallet.type} difference={wallet.difference} physicalAmount={wallet.physical} differencePercentage={wallet.differencePercentage} />
              </div>
            ))
          }
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              <CarouselItem key="total" className='pl-4 basis-[calc(100%-2rem)] first-letter'>
                <MetricCard title="Total" balance={globalSummary.totalBalance} change={{ value: globalSummary.change.value, label: globalSummary.change.label }} difference={globalSummary.difference} differencePercentage={globalSummary.differencePercentage} physicalAmount={globalSummary.physical} type="total" />
              </CarouselItem>

              {
                walletsSummary.map((wallet) => (
                  <CarouselItem key={wallet.id} className='pl-4 basis-[calc(100%-2rem)] first-letter'>
                    <MetricCard title={wallet.name} balance={wallet.balance} change={wallet.change} type={wallet.type} difference={wallet.difference} physicalAmount={wallet.physical} differencePercentage={wallet.differencePercentage} />
                  </CarouselItem>
                ))
              }
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-monedex-accent hover:bg-monedex-tertiary hover:text-monedex-light" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-monedex-accent hover:bg-monedex-tertiary hover:text-monedex-light" />
          </Carousel>
        </div>
      </>

      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard />
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <ExpenseIncomeChart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExpenseCategoryPieChart />
        <TopExpensesBarChart />
      </div>
      <CategoryInsights />
      <ExpenseManagement />
      <IncomeInsights />

      {/* Physical vs Digital Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-monedex-secondary">Physical vs Digital Balance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder cards - will be populated with real data once Prisma client is regenerated */}
          <div className="col-span-full text-center py-8 text-muted-foreground">
            <IoWalletOutline className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Physical vs Digital comparison will be displayed here</p>
            <p className="text-sm">Update wallet physical amounts to see the comparison</p>
          </div>
        </div>
      </div>
    </section>
  )
}
