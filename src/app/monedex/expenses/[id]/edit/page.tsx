import { notFound } from 'next/navigation'

import Breadcrumbs from '@/components/monedex/breadcrumbs'
import Form from '@/components/monedex/expenses/edit-form'
import {
  fetchExpenseById,
  fetchCategoriesToForm,
  fetchPlaces
} from '@/lib/data'

type Params = Promise<{ id: string }>

export default async function Page(props: {
  params: Params
}): Promise<JSX.Element> {
  const params = await props.params
  const id = Number(params.id)

  const [expense, categories, places] = await Promise.all([
    fetchExpenseById(id),
    fetchCategoriesToForm(),
    fetchPlaces()
  ])

  if (expense == null || categories == null) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gastos', href: '/monedex/expenses' },
          {
            label: 'Editar Expense',
            href: `/monedex/expenses/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form expense={expense} categories={categories} places={places} />
    </main>
  )
}
