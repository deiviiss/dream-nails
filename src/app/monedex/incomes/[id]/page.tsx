import { redirect } from 'next/navigation'
import { fetchIncomeById } from '@/actions/monedex/incomes/fetch-income-by-id'
import { fetchIncomeCategoriesToForm } from '@/actions/monedex/incomes/fetch-income-categories-to-form'
import { getWalletsForForm } from '@/actions/monedex/wallets/get-wallets-for-form'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { IncomeForm } from '@/components/monedex/incomes/income-form'

type Params = Promise<{ id: string }>

export default async function IncomePage(props: {
  params: Params
}): Promise<JSX.Element> {
  const params = await props.params
  const id = Number(params.id)

  const [{ income }, categories, walletsResult] = await Promise.all([
    fetchIncomeById(id),
    fetchIncomeCategoriesToForm(),
    getWalletsForForm()
  ])

  if (!categories) {
    redirect('/monedex/incomes')
  }

  if (!income) {
    redirect('/monedex/incomes')
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Ingresos', href: '/monedex/incomes' },
          {
            label: 'Editar Ingreso',
            href: `/monedex/incomes/${id}`,
            active: true
          }
        ]}
      />
      <IncomeForm income={income} categories={categories} wallets={walletsResult.wallets} />
    </main>
  )
}
