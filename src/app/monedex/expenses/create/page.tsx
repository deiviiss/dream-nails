import { type NextPage } from 'next'

import Breadcrumbs from '@/app/ui/monedex/breadcrumbs'
import Form from '@/app/ui/monedex/expenses/create-form'
import { fetchCategoriesToForm } from '@/libs/data'

const Page: NextPage = async () => {
  const categories = await fetchCategoriesToForm()

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
