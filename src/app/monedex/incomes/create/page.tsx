import { redirect } from 'next/navigation'
import { fetchIncomeCategoriesToForm } from '@/actions/monedex/incomes/fetch-income-categories-to-form'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { IncomeForm } from '@/components/monedex/incomes/income-form'

export default async function CreateIncomePage() {
  const categories = await fetchIncomeCategoriesToForm()

  // fetch categories

  if (categories.length === 0) {
    redirect('/monedex/incomes')
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
      <IncomeForm income={null} categories={categories} />
    </main>
  )
}
