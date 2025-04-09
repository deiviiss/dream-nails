import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/monedex/breadcrumbs'
import { CategoryForm } from '@/components/monedex/categories/category-form'
import {
  fetchCategoryById
} from '@/lib/data'

type Params = Promise<{ id: string }>

export default async function Page(props: {
  params: Params
}): Promise<JSX.Element> {
  const params = await props.params
  const id = Number(params.id)

  const category = await fetchCategoryById(id)

  if (category == null) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categorías', href: '/monedex/categories' },
          {
            label: 'Editar Categoría',
            href: `/monedex/categories/${id}/edit`,
            active: true
          }
        ]}
      />
      <CategoryForm category={category} />
    </main>
  )
}
