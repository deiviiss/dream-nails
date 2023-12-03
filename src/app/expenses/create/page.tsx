import { type NextPage } from 'next'

import Breadcrumbs from '@/app/ui/Breadcrumbs'
import Form from '@/app/ui/expenses/create-form'
import { fetchCategoriesToForm } from '@/libs/data'

const Page: NextPage = async () => {
  const categories = await fetchCategoriesToForm()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gastos', href: '/expenses' },
          {
            label: 'Crear Gasto',
            href: '/expenses/create',
            active: true
          }
        ]}
      />
      <Form categories={categories} />
    </main>
  )
}

export default Page
