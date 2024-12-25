import { type NextPage } from 'next'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { CategoryForm } from '@/components/monedex/categories/category-form'

const Page: NextPage = async () => {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categorías', href: '/monedex/categories' },
          {
            label: 'Crear Categoría',
            href: '/monedex/categories/create',
            active: true
          }
        ]}
      />

      <CategoryForm category={null} />
    </main>
  )
}

export default Page
