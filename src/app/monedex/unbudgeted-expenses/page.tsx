import { type Metadata } from 'next'
import { TbCurrencyDollar } from 'react-icons/tb'
import { getUnbudgetedExpenses } from '@/actions/monedex/budget/get-unbudgeted-expenses'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { UnbudgetedExpensesSection } from '@/components/monedex/budget/UnbudgetedExpensesSection'
import FilterMonth from '@/components/monedex/filter-month'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/helpers'

export const metadata: Metadata = {
  title: 'Gastos sin Presupuesto'
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function UnbudgetedExpensesPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const month = Number(searchParams.month) || Number(currentMonth)
  const year = Number(searchParams.year) || currentYear

  const { unbudgetedExpenses, totalUnbudgeted } = await getUnbudgetedExpenses({ month, year })

  return (
    <section className="container mx-auto space-y-6">
      <Breadcrumbs
        breadcrumbs={[{ label: 'Gastos sin Presupuesto', href: '/monedex/unbudgeted-expenses', active: true }]}
      />

      <div className='flex flex-col gap-2 text-monedex-secondary'>
        <FilterMonth />
      </div>

      {/* Total Unbudgeted Expenses Card */}
      <Card className="border rounded-xl bg-red-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Gastos Sin Presupuesto</CardTitle>
          <TbCurrencyDollar className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-600">{formatCurrency(totalUnbudgeted || 0)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {unbudgetedExpenses?.length || 0} categorías sin presupuesto
          </p>
        </CardContent>
      </Card>

      {/* Unbudgeted Expenses */}
      <UnbudgetedExpensesSection
        categories={unbudgetedExpenses || []}
        total={totalUnbudgeted || 0}
      />
    </section>
  )
}
