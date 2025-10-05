import { type NextPage } from 'next'

import { redirect } from 'next/navigation'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import Form from '@/components/monedex/expenses/create-form'
import { fetchCategoriesToForm } from '@/lib/data'

const Page: NextPage = async () => {
  const [categories] = await Promise.all([
    fetchCategoriesToForm()
  ])

  if (categories.length === 0) {
    redirect('/monedex/expenses')
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gastos', href: '/monedex/expenses' },
          {
            label: 'Crear Gasto',
            href: '/monedex/expenses/create',
            active: true
          }
        ]}
      />
      <Form categories={categories} />
    </main>
  )
}

export default Page
