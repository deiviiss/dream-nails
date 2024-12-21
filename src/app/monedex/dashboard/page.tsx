import { CategoryInsights } from '@/components/monedex/dashboard/category-insights'
import { DashboardHeader } from '@/components/monedex/dashboard/dashboard-header'
import { ExpenseCategoryPieChart } from '@/components/monedex/dashboard/expense-category-pie-chart'
import { ExpenseIncomeChart } from '@/components/monedex/dashboard/expense-income-chart'
import { ExpenseManagement } from '@/components/monedex/dashboard/expense-management'
import { IncomeInsights } from '@/components/monedex/dashboard/income-insights'
import { SummaryCard } from '@/components/monedex/dashboard/summary-card'
import { TopExpensesBarChart } from '@/components/monedex/dashboard/top-expenses-bar-chart'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
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
    </div>
  )
}
