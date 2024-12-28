import { type NextPage } from 'next'

import { redirect } from 'next/navigation'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import Form from '@/components/monedex/expenses/create-form'
import { fetchCategoriesToForm, fetchPlaces } from '@/lib/data'

const Page: NextPage = async () => {
  const [categories, places] = await Promise.all([
    fetchCategoriesToForm(),
    fetchPlaces()
  ])

  if (categories.length === 0 || places.length === 0) {
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
      <Form categories={categories} places={places} />
    </main>
  )
}

export default Page
