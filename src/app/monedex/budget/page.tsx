import { RiMoneyDollarCircleLine, RiWalletLine, RiTimeLine } from 'react-icons/ri'
import { getBudgetSummary } from '@/actions/monedex/budget/get-budget-summary'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { BudgetCard } from '@/components/monedex/budget/BudgetCard'
import FilterMonth from '@/components/monedex/filter-month'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function BudgetPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const month = Number(searchParams.month) || Number(currentMonth)
  const year = Number(searchParams.year) || currentYear

  const { budgetCategories, globalSummary } = await getBudgetSummary({ month, year })

  if (!budgetCategories || !globalSummary) {
    return <div>Error loading budget data</div>
  }

  return (
    <section className="container mx-auto space-y-6">
      <Breadcrumbs
        breadcrumbs={[{ label: 'Presupuesto', href: '/monedex/budget', active: true }]}
      />

      <div className='flex flex-col gap-2 text-monedex-secondary'>
        <FilterMonth />
      </div>

      {/* Global Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance Total</CardTitle>
            <RiMoneyDollarCircleLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${globalSummary.balanceTotal.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="border rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presupuesto Total</CardTitle>
            <RiWalletLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${globalSummary.totalBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Suma de todas las categorías
            </p>
          </CardContent>
        </Card>

        <Card className="border rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
            <RiMoneyDollarCircleLine className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${globalSummary.totalPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Gastos del mes
            </p>
          </CardContent>
        </Card>

        <Card className="border rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendiente</CardTitle>
            <RiTimeLine className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${globalSummary.totalPending.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Presupuesto - Pagado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-monedex-light">Categorías de Presupuesto</h2>

        {budgetCategories.length === 0
          ? (
            <Card className="border rounded-xl">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No hay categorías de presupuesto configuradas</p>
              </CardContent>
            </Card>)
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {budgetCategories.map((category) => (
                <BudgetCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  budgetAmount={category.budgetAmount}
                  paidAmount={category.paidAmount}
                  difference={category.difference}
                  differencePercentage={category.differencePercentage}
                />
              ))}
            </div>)}
      </div>
    </section>
  )
}
