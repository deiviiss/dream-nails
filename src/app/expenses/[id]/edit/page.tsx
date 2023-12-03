import { notFound } from 'next/navigation'

import Breadcrumbs from '@/app/ui/Breadcrumbs'
import Form from '@/app/ui/expenses/edit-form'
import {
  fetchExpenseById,
  fetchCategoriesToForm
} from '@/libs/data'

export default async function Page({
  params
}: {
  params: { id: number }
}): Promise<JSX.Element> {
  const id = Number(params.id)

  const [expense, categories] = await Promise.all([
    fetchExpenseById(id),
    fetchCategoriesToForm()
  ])

  if (expense == null || categories == null) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gastos', href: '/expenses' },
          {
            label: 'Editar Expense',
            href: `/expenses/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form expense={expense} categories={categories} />
    </main>
  )
}
