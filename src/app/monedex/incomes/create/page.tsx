import { redirect } from 'next/navigation'
import { fetchIncomeCategoriesToForm } from '@/actions/monedex/incomes/fetch-income-categories-to-form'
import { getWalletsForForm } from '@/actions/monedex/wallets/get-wallets-for-form'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { IncomeForm } from '@/components/monedex/incomes/income-form'

export default async function CreateIncomePage() {
  const [categories, walletsResult] = await Promise.all([
    fetchIncomeCategoriesToForm(),
    getWalletsForForm()
  ])

  if (categories.length === 0) {
    redirect('/monedex/incomes')
  }

  // Redirect if the user has no wallets — a wallet is required to record an income
  if (!walletsResult.ok || walletsResult.wallets.length === 0) {
    redirect('/monedex/wallets')
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Ingresos', href: '/monedex/incomes' },
          {
            label: 'Crear Ingreso',
            href: '/monedex/incomes/create',
            active: true
          }
        ]}
      />
      <IncomeForm income={null} categories={categories} wallets={walletsResult.wallets} />
    </main>
  )
}
