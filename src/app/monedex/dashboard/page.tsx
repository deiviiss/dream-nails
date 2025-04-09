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

  return (
    <section className="container mx-auto p-4 space-y-6">
      <Breadcrumbs
        breadcrumbs={[{ label: 'Wallets', href: '/monedex/wallets', active: true }]}
      />

      <div className='flex flex-col gap-2 text-monedex-secondary'>
        <FilterMonth />
      </div>

      <>
        {/* Desktop view */}
        <div className="hidden md:grid md:grid-cols-2 gap-4">
          <MetricCard title="Total" balance={globalSummary.totalBalance} totalIncome={globalSummary.totalIncome} totalExpenses={globalSummary.totalExpenses} change={{ value: globalSummary.change.value, label: globalSummary.change.label }} type="total" />
          {
            walletsSummary.map((wallet) => (
              <div key={wallet.id}>
                <MetricCard title={wallet.name} balance={wallet.balance} totalIncome={wallet.totalIncome} totalExpenses={wallet.totalExpenses} change={wallet.change} type={wallet.type} />
              </div>
            ))
          }
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              <CarouselItem key="total" className='pl-4 basis-[calc(100%-2rem)] first-letter'>
                <MetricCard title="Total" balance={globalSummary.totalBalance} totalIncome={globalSummary.totalIncome} totalExpenses={globalSummary.totalExpenses} change={{ value: globalSummary.change.value, label: globalSummary.change.label }} type="total" />
              </CarouselItem>

              {
                walletsSummary.map((wallet) => (
                  <CarouselItem key={wallet.id} className='pl-4 basis-[calc(100%-2rem)] first-letter'>
                    <MetricCard title={wallet.name} balance={wallet.balance} totalIncome={wallet.totalIncome} totalExpenses={wallet.totalExpenses} change={wallet.change} type={wallet.type} />
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
    </section>
  )
}
