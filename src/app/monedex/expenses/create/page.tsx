import { type NextPage } from 'next'

import Breadcrumbs from '@/components/monedex/breadcrumbs'
import Form from '@/components/monedex/expenses/create-form'
import { fetchCategoriesToForm, fetchPlaces } from '@/lib/data'

const Page: NextPage = async () => {
  const categories = await fetchCategoriesToForm()
  const places = await fetchPlaces()

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
      <Form categories={categories} places={places} />
    </main>
  )
}

export default Page
