import { notFound } from 'next/navigation'

import Breadcrumbs from '@/app/ui/monedex/breadcrumbs'
import Form from '@/app/ui/monedex/expenses/edit-form'
import {
  fetchExpenseById,
  fetchCategoriesToForm,
  fetchPlaces
} from '@/libs/data'

export default async function Page({
  params
}: {
  params: { id: number }
}): Promise<JSX.Element> {
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
