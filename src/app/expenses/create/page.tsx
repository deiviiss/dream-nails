import { type NextPage } from 'next'
import Breadcrumbs from '@/app/ui/Breadcrumbs'
import Form from '@/app/ui/expenses/create-form'
import { fetchCategoriesToForm, fetchPlacesToForm } from '@/libs/data'

const Page: NextPage = async () => {
  const categories = await fetchCategoriesToForm()
  const places = await fetchPlacesToForm()

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
      <Form categories={categories} places={places} />
    </main>
  )
}

export default Page
